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
        # 나스닥(QQQ 또는 ^IXIC)이 50일선 위에 있는지 확인 (본데의 핵심 규칙)
        market_ok = True
        try:
            m_df = data_fetcher.get_daily_prices("COMP", days=100, env_dv=self.env_dv) # 나스닥 지수
            if not m_df.empty and len(m_df) >= 50:
                m_sma50 = indicators.calc_ma(m_df, 50).iloc[-1]
                m_curr = m_df['close'].iloc[-1]
                if m_curr < m_sma50:
                    logger.warning(f"⚠️ [시장 필터] 지수({m_curr:.2f})가 50일선({m_sma50:.2f}) 아래에 있습니다. 보수적 운용 (매수 중단).")
                    market_ok = False
        except:
            logger.warning("⚠️ 지수 데이터 조회 실패. 필터 없이 진행합니다.")

        for i, item in enumerate(watchlist):
            code = item['code']
            name = item.get('name', code)
            
            # TPS 제한 방지를 위한 지연 (0.1초)
            time.sleep(0.1)
            
            if i % 10 == 0:
                logger.info(f"🔍 스캔 진행 중... ({i}/{len(watchlist)}) [{code}] {name}")
            
            if code in self.active_positions:
                continue

            # 시장이 안 좋으면 매수 건너뜀
            if not market_ok:
                continue

            try:
                signal = self.strategy.generate_signal(code, name)
                
                if signal.action == Action.BUY:
                    price_info = data_fetcher.get_current_price(code, self.env_dv)
                    entry_price = float(price_info.get('price', 0))
                    
                    # 본데 원칙: 진입 당일의 최저가(LOD)를 손절선으로 설정
                    lod_stop = float(signal.stop_loss) if hasattr(signal, 'stop_loss') and signal.stop_loss else entry_price * 0.97
                    
                    # 리스크 기반 수량 계산 (1% Risk)
                    price_risk = entry_price - lod_stop
                    if price_risk <= 0: price_risk = entry_price * 0.03
                    
                    qty = int(math.floor(risk_amount / price_risk))
                    if qty <= 0: continue

                    logger.info(f"🔥 [매수] {name} | 진입가: {entry_price:,} | 본데 손절가(LOD): {lod_stop:,}")
                    
                    # 신규 필드 적용하여 주문
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
                        send_telegram_message(f"🚀 *[본데 진입]* {name}\n• 수량: {qty}주\n• 진입가: {entry_price:,}\n• 손절가(LOD): {lod_stop:,}")

            except Exception as e:
                logger.error(f"❌ {name} 스캔 중 오류: {e}")

    def monitor_and_sell(self):
        """보유 종목 모니터링 및 본데 원칙(LOD & SMA 7) 매도"""
        if not self.active_positions:
            return

        codes_to_remove = []
        now = datetime.now()
        
        for code, pos in self.active_positions.items():
            try:
                price_info = data_fetcher.get_current_price(code, self.env_dv)
                curr_price = float(price_info.get('price', 0))
                if curr_price == 0: continue

                # 최고가 갱신 기록 (Trailing을 위해)
                if curr_price > pos.get('high_after_entry', 0):
                    pos['high_after_entry'] = curr_price

                profit_rate = (curr_price - pos['entry_price']) / pos['entry_price'] * 100
                entry_dt = datetime.strptime(pos['entry_date'], "%Y-%m-%d")
                days_held = (now - entry_dt).days

                # 1. 본데 LOD 손절 (실시간 이탈 시)
                if curr_price <= pos['stop_price']:
                    logger.info(f"💥 [손절] {pos['name']} | 현재가({curr_price:,}) <= LOD({pos['stop_price']:,})")
                    signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="본데 LOD 손절선 이탈")
                    self.executor.execute_signal(signal)
                    codes_to_remove.append(code)
                    send_telegram_message(f"💥 *[본데 손절]* {pos['name']}\n• 현재가: {curr_price:,}\n• 손절가(LOD): {pos['stop_price']:,}\n• 수익률: {profit_rate:.2f}%")
                    continue

                # 2. 본데 추세 익절 (7일선 하향 돌파 시)
                # 데이터 조회를 통해 SMA 7 확인
                df = data_fetcher.get_daily_prices(code, days=20, env_dv=self.env_dv)
                if not df.empty and len(df) >= 7:
                    sma7 = indicators.calc_ma(df, 7).iloc[-1]
                    # 본데 원칙: 종가 기준으로 7일선을 깨면 매매 종료 (추세 반전)
                    if curr_price < sma7 * 0.99: # 1% 마진을 두어 노이즈 제거
                        logger.info(f"💰 [익절/추세종료] {pos['name']} | 7일선({sma7:.2f}) 하향 돌파")
                        signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="7일선 추세 종료")
                        self.executor.execute_signal(signal)
                        codes_to_remove.append(code)
                        send_telegram_message(f"💰 *[본데 추세익절]* {pos['name']}\n• 현재가: {curr_price:,}\n• 7일선: {sma7:.2f}\n• 수익률: {profit_rate:.2f}%")
                        continue
                
                # 3. 수익 보호 규칙: 3일 내 20% 상승 시 손절선을 본전 위로 상향
                if days_held <= 3 and profit_rate >= 20.0 and pos.get('status') == "active":
                    new_stop = pos['entry_price'] * 1.05 # 본전 + 5% 수익 확보
                    pos['stop_price'] = new_stop
                    pos['status'] = "protected"
                    self._save_positions()
                    logger.info(f"🛡️ [보호] {pos['name']} | 급등 달성! 손절선을 {new_stop:,}원으로 상향 조정")
                    send_telegram_message(f"🛡️ *[본데 보호]* {pos['name']}\n• 급등 달성\n• 수익 보호선 설정: {new_stop:,}원")

            except Exception as e:
                logger.error(f"❌ {pos['name']} 모니터링 중 오류: {e}")

        for code in codes_to_remove:
            del self.active_positions[code]
        if codes_to_remove:
            self._save_positions()

        for code in codes_to_remove:
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
