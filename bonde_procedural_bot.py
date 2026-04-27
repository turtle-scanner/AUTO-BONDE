import sys
import os
import json
import time
import logging
import argparse
from datetime import datetime
import pandas as pd

# 프로젝트 경로 추가
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")
if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

import kis_auth as ka
from core import data_fetcher, indicators
from core.signal import Action, Signal
from core.order_executor import OrderExecutor
from strategy.strategy_11_bonde import BondeStrategy
from telegram_notifier import send_telegram_message

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class BondeProceduralBot:
    def __init__(self, env_dv="prod", risk_pct=0.01):
        """
        본데(Stockbee) 절차적 자동매매 봇
        
        Args:
            env_dv: 'prod' (실전) 또는 'vps' (모의)
            risk_pct: 매매당 리스크 비율 (0.01 = 1%)
        """
        self.env_dv = env_dv
        self.risk_pct = risk_pct
        self.strategy = BondeStrategy()
        self.executor = OrderExecutor(env_dv=env_dv)
        self.watchlist_file = "bonde_watchlist.json"
        self.positions_file = "bonde_active_positions.json"
        self.active_positions = self._load_positions()

    def _load_positions(self):
        if os.path.exists(self.positions_file):
            with open(self.positions_file, "r", encoding="utf-8") as f:
                return json.load(f)
        return {}

    def _save_positions(self):
        with open(self.positions_file, "w", encoding="utf-8") as f:
            json.dump(self.active_positions, f, ensure_ascii=False, indent=4)

    def _get_equity(self):
        """통합증거금 계좌의 국내+해외 총 자산 합산"""
        try:
            # 국내 자산 조회
            dom_info = data_fetcher.get_deposit(self.env_dv)
            dom_total = dom_info.get('total_eval', 0)
            
            # 해외 자산 조회 (원화 환산액 합산)
            for_info = data_fetcher.get_foreign_deposit(self.env_dv)
            for_total = for_info.get('krw_equiv', 0)
            
            total_equity = dom_total + for_total
            
            # 자산이 0으로 조회될 경우를 대비한 기본값 (최소 100만원 가정)
            if total_equity < 1000000:
                logger.warning(f"⚠️ 조회된 총 자산({total_equity:,}원)이 너무 적습니다. 기본값을 사용하거나 잔고를 확인하세요.")
                return max(total_equity, 10000000) # 기본 1000만원 기준
                
            return total_equity
        except Exception as e:
            logger.error(f"총 자산 합산 중 오류: {e}")
            return 10000000

    def scan_and_buy(self):
        """Watchlist를 스캔하여 새로운 진입 기회 포착"""
        logger.info("🔍 [스캔] 본데 셋업 탐색 중...")
        
        if not os.path.exists(self.watchlist_file):
            return

        with open(self.watchlist_file, "r", encoding="utf-8") as f:
            watchlist = json.load(f)

        equity = self._get_equity()
        risk_amount = equity * self.risk_pct

        # 자산 규모에 따른 최대 보유 종목 수 결정
        if equity < 10000000:       # 1,000만원 미만
            max_positions = 10
        elif equity < 50000000:     # 5,000만원 미만
            max_positions = 15
        elif equity < 100000000:    # 1억 미만
            max_positions = 20
        elif equity < 1000000000:   # 10억 미만
            max_positions = 25
        else:                       # 10억 이상
            max_positions = 30

        current_pos_count = len(self.active_positions)
        logger.info(f"📊 현재 자산: {equity:,}원 | 리스크(1%): {risk_amount:,}원 | 보유 한도: {current_pos_count}/{max_positions}")

        if current_pos_count >= max_positions:
            logger.info(f"⚠️ 보유 종목 한도 초과 ({current_pos_count}/{max_positions}). 스캔을 건너뜁니다.")
            return

        # 시장 환경 체크 (Market Filter)
        market_ok = True
        try:
            m_df = data_fetcher.get_daily_prices("QQQ", days=250, env_dv=self.env_dv) # 나스닥 100 ETF (QQQ)
            if not m_df.empty and len(m_df) >= 200:
                m_sma50 = indicators.calc_ma(m_df, 50).iloc[-1]
                m_sma200 = indicators.calc_ma(m_df, 200).iloc[-1]
                m_curr = m_df['close'].iloc[-1]
                
                # 1. 지수 이평선 필터
                if m_curr < m_sma50 or m_curr < m_sma200:
                    logger.warning(f"⚠️ [지수 필터] QQQ({m_curr:.2f})가 이평선 아래에 있음. 매매 중단.")
                    market_ok = False
                
                # 2. 시장 폭(Market Breadth) 필터: 와치리스트 중 50일선 위 종목 비율
                above_50ma_count = 0
                sample_size = min(len(watchlist), 30) # 상위 30개 종목 샘플링
                for item in watchlist[:sample_size]:
                    w_df = data_fetcher.get_daily_prices(item['code'], days=60, env_dv=self.env_dv)
                    if not w_df.empty and len(w_df) >= 50:
                        w_sma50 = indicators.calc_ma(w_df, 50).iloc[-1]
                        if w_df['close'].iloc[-1] > w_sma50:
                            above_50ma_count += 1
                    time.sleep(0.05) # TPS 보호
                
                breadth_pct = (above_50ma_count / sample_size) * 100
                logger.info(f"📊 시장 폭(Breadth): {breadth_pct:.1f}% ({above_50ma_count}/{sample_size})")
                
                if breadth_pct < 40: # 40% 미만이면 시장이 극도로 불안정함
                    logger.warning(f"⚠️ [시장 폭 필터] 상승 종목 비중이 너무 낮음({breadth_pct:.1f}%). 매매 중단.")
                    market_ok = False
        except Exception as e:
            logger.warning(f"⚠️ 시장 필터 계산 중 오류({e}). 보수적으로 진행합니다.")

        # 1단계: 모든 종목 스캔하여 신호 수집
        buy_signals = []
        for i, item in enumerate(watchlist):
            code = item['code']
            name = item.get('name', code)
            
            if i % 20 == 0:
                logger.info(f"🔍 스캔 진행 중... ({i}/{len(watchlist)})")
            
            if code in self.active_positions:
                continue

            # 시장이 안 좋으면 신규 매수 수집 중단
            if not market_ok:
                continue

            try:
                time.sleep(0.1) # TPS 제한 방지
                signal = self.strategy.generate_signal(code, name)
                
                if signal.action == Action.BUY:
                    # RS 점수 추출 (reason 문자열에서 파싱)
                    try:
                        rs_score = float(signal.reason.split("RS: ")[1].split(" | ")[0])
                    except:
                        rs_score = 0.0
                    
                    buy_signals.append({
                        "signal": signal,
                        "rs_score": rs_score,
                        "code": code,
                        "name": name
                    })
                    logger.info(f"✨ 신호 포착: {name} (RS: {rs_score})")

            except Exception as e:
                logger.error(f"❌ {name} 스캔 중 오류: {e}")

        # 2단계: RS 점수 순으로 내림차순 정렬
        buy_signals.sort(key=lambda x: x['rs_score'], reverse=True)
        
        # 3단계: 정렬된 순서대로 매수 집행
        for item in buy_signals:
            if len(self.active_positions) >= max_positions:
                break
                
            code = item['code']
            name = item['name']
            signal = item['signal']
            
            try:
                price_info = data_fetcher.get_current_price(code, self.env_dv)
                entry_price = float(price_info.get('price', 0))
                if entry_price <= 0: continue
                
                lod_stop = float(signal.stop_loss) if hasattr(signal, 'stop_loss') and signal.stop_loss else entry_price * 0.97
                
                # 리스크 기반 수량 계산
                price_risk = entry_price - lod_stop
                if price_risk <= 0: price_risk = entry_price * 0.03
                
                qty = int(math.floor(risk_amount / price_risk))
                if qty <= 0: continue

                logger.info(f"🔥 [매수 집행] {name} (RS: {item['rs_score']}) | 진입가: {entry_price} | 손절가: {lod_stop}")
                
                res = self.executor.execute_signal(signal, risk_amount=risk_amount)
                
                if not res.empty:
                    self.active_positions[code] = {
                        "name": name,
                        "entry_price": entry_price,
                        "stop_price": lod_stop,
                        "qty": qty,
                        "entry_date": datetime.now().strftime("%Y-%m-%d"),
                        "status": "active"
                    }
                    self._save_positions()
                    send_telegram_message(f"🚀 *[본데 진입]* {name}\n• RS 점수: {item['rs_score']}\n• 수량: {qty}주\n• 진입가: {entry_price}\n• 손절가: {lod_stop}")
            
            except Exception as e:
                logger.error(f"❌ {name} 매수 처리 중 오류: {e}")

    def monitor_and_sell(self):
        """보유 종목 모니터링 및 본데 원칙(분할 매도 & SMA 7) 매도"""
        if not self.active_positions:
            return

        codes_to_remove = []
        now = datetime.now()
        
        for code, pos in self.active_positions.items():
            try:
                price_info = data_fetcher.get_current_price(code, self.env_dv)
                curr_price = float(price_info.get('price', 0))
                if curr_price == 0: continue

                profit_rate = (curr_price - pos['entry_price']) / pos['entry_price'] * 100
                entry_dt = datetime.strptime(pos['entry_date'], "%Y-%m-%d")
                days_held = (now - entry_dt).days

                # 1. 본데 LOD 손절 (실시간 이탈 시)
                if curr_price <= pos['stop_price']:
                    logger.info(f"💥 [손절] {pos['name']} | LOD 손절선 이탈")
                    signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="본데 LOD 손절선 이탈")
                    self.executor.execute_signal(signal)
                    codes_to_remove.append(code)
                    send_telegram_message(f"💥 *[본데 손절]* {pos['name']}\n• 현재가: {curr_price:,}\n• 손절가(LOD): {pos['stop_price']:,}\n• 수익률: {profit_rate:.2f}%")
                    continue

                # 2. 본데 분할 매도 (20% 수익 시 절반 매도)
                if profit_rate >= 20.0 and pos.get('status') == "active":
                    half_qty = int(pos['qty'] / 2)
                    if half_qty > 0:
                        logger.info(f"💰 [분할 매도] {pos['name']} | 20% 수익 달성! 절반 매도.")
                        signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="20% 수익 분할 매도", quantity=half_qty)
                        self.executor.execute_signal(signal)
                        pos['qty'] -= half_qty
                        pos['status'] = "partial_sold"
                        pos['stop_price'] = pos['entry_price'] * 1.05 # 본전 위로 상향 (Free trade)
                        self._save_positions()
                        send_telegram_message(f"💰 *[본데 분할익절]* {pos['name']}\n• 현재가: {curr_price:,}\n• 수익률: {profit_rate:.2f}%\n• 결과: 물량 50% 매도 후 추세 추종")
                        continue

                # 3. 본데 추세 익절 (7일선 하향 돌파 시 - 남은 물량 전량 매도)
                df = data_fetcher.get_daily_prices(code, days=20, env_dv=self.env_dv)
                if not df.empty and len(df) >= 7:
                    sma7 = indicators.calc_ma(df, 7).iloc[-1]
                    if curr_price < sma7 * 0.99:
                        logger.info(f"✨ [전량 익절] {pos['name']} | 7일선 이탈로 추세 종료.")
                        signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="7일선 이탈 추세 종료")
                        self.executor.execute_signal(signal)
                        codes_to_remove.append(code)
                        send_telegram_message(f"✨ *[본데 추세종료]* {pos['name']}\n• 현재가: {curr_price:,}\n• 7일선: {sma7:.2f}\n• 최종 수익률: {profit_rate:.2f}%")
                        continue

            except Exception as e:
                logger.error(f"❌ {pos['name']} 모니터링 중 오류: {e}")

        for code in codes_to_remove:
            if code in self.active_positions:
                del self.active_positions[code]
        if codes_to_remove:
            self._save_positions()

    def run_forever(self):
        logger.info("🟢 본데 기계적 자동매매 엔진 가동 (24시간 모니터링 모드)")
        ka.auth(svr=self.env_dv, product="01")
        
        while True:
            # GitHub Action 서버 시차(UTC) 대응: UTC 시간에 9시간을 더해 KST 기준 시간 생성
            from datetime import timedelta, timezone
            now = datetime.now(timezone(timedelta(hours=9)))
            
            # 시장 개장 여부 확인 (KST 기준)
            is_kr_open = (now.weekday() < 5) and (9, 0) <= (now.hour, now.minute) <= (15, 30)
            # 미국장 (서머타임 미적용 기준 23:30~06:00, 적용 기준 22:30~05:00)
            # 여기서는 넉넉하게 22:00 ~ 06:00 사이로 설정합니다.
            is_us_open = (now.weekday() < 5 or (now.weekday() == 5 and now.hour < 6)) and \
                         ((now.hour >= 22) or (now.hour < 6))
            
            is_market_open = is_kr_open or is_us_open

            if is_market_open:
                if now.minute % 10 == 0: # 10분마다 스캔
                    self.scan_and_buy()
                self.monitor_and_sell() # 1분마다 감시
            else:
                logger.info(f"💤 현재 시각 {now.strftime('%H:%M')}: 장외 시간이므로 엔진을 안전하게 종료합니다.")
                break # 장 종료 시 루프 탈출 (GitHub Action 등에서 효율적)
            
            time.sleep(60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="본데(Bonde) 자동매매 봇")
    parser.add_argument("--once", action="store_true", help="1회만 스캔 및 감시 후 종료")
    parser.add_argument("--env", default="prod", choices=["prod", "vps"], help="매매 환경 (prod/vps)")
    args = parser.parse_args()

    bot = BondeProceduralBot(env_dv=args.env)
    
    if args.once:
        logger.info("🏃 1회성 실행 모드 시작")
        ka.auth(svr=bot.env_dv, product="01")
        bot.scan_and_buy()
        bot.monitor_and_sell()
        logger.info("🏁 1회성 실행 완료 및 종료")
    else:
        bot.run_forever()
