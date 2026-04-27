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

        for i, item in enumerate(watchlist):
            code = item['code']
            name = item.get('name', code)
            
            # TPS 제한 방지를 위한 지연 (0.1초)
            time.sleep(0.1)
            
            if i % 10 == 0:
                logger.info(f"🔍 스캔 진행 중... ({i}/{len(watchlist)}) [{code}] {name}")
            
            if code in self.active_positions:
                continue

            try:
                signal = self.strategy.generate_signal(code, name)
                
                if signal.action == Action.BUY:
                    price_info = data_fetcher.get_current_price(code, self.env_dv)
                    entry_price = price_info.get('price', 0)
                    
                    # 사용자의 기계적 손절선: -3% 또는 LOD 중 더 타이트한 것 사용 가능
                    # 여기서는 사용자 요청에 따라 명시적인 -3%를 기본으로 하되, LOD도 참고
                    hard_stop_price = entry_price * 0.97 
                    
                    # 리스크 기반 수량 계산
                    price_risk = entry_price - hard_stop_price
                    qty = int(risk_amount / price_risk) if price_risk > 0 else 0
                    
                    if qty <= 0: continue

                    logger.info(f"🔥 [매수] {name} | 진입가: {entry_price:,} | 손절선(-3%): {hard_stop_price:,}")
                    signal.quantity = qty
                    signal.strength = 1.0
                    
                    # 매수 (현금만 지원, 리스크 금액 전달)
                    res = self.executor.execute_signal(signal, risk_amount=risk_amount)
                    
                    if not res.empty:
                        self.active_positions[code] = {
                            "name": name,
                            "entry_price": entry_price,
                            "stop_price": hard_stop_price,
                            "qty": qty,
                            "entry_date": datetime.now().strftime("%Y-%m-%d"),
                            "high_after_entry": entry_price,
                            "status": "active"
                        }
                        self._save_positions()
                        send_telegram_message(f"🚀 *[본데 진입]* {name}\n• 수량: {qty}주\n• 진입가: {entry_price:,}\n• 손절가(-3%): {hard_stop_price:,}")

            except Exception as e:
                logger.error(f"❌ {name} 스캔 중 오류: {e}")

    def monitor_and_sell(self):
        """보유 종목 모니터링 및 매도 (손절 -3%, 익절 +21%, 3일 내 20% 규칙)"""
        if not self.active_positions:
            return

        codes_to_remove = []
        now = datetime.now()
        
        for code, pos in self.active_positions.items():
            try:
                price_info = data_fetcher.get_current_price(code, self.env_dv)
                curr_price = price_info.get('price', 0)
                if curr_price == 0: continue

                # 최고가 갱신 기록
                if curr_price > pos.get('high_after_entry', 0):
                    pos['high_after_entry'] = curr_price

                profit_rate = (curr_price - pos['entry_price']) / pos['entry_price'] * 100
                entry_dt = datetime.strptime(pos['entry_date'], "%Y-%m-%d")
                days_held = (now - entry_dt).days

                # 1. 기계적 손절 (-3% 이탈)
                if curr_price <= pos['stop_price']:
                    logger.info(f"💥 [손절] {pos['name']} | 현재가({curr_price:,}) <= 손절가({pos['stop_price']:,})")
                    signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="-3% 손절선 이탈")
                    self.executor.execute_signal(signal)
                    codes_to_remove.append(code)
                    send_telegram_message(f"💥 *[본데 손절]* {pos['name']}\n• 현재가: {curr_price:,}\n• 손절가: {pos['stop_price']:,}\n• 수익률: {profit_rate:.2f}%")
                    continue

                # 2. 기계적 익절 (+21% 도달)
                if profit_rate >= 21.0:
                    logger.info(f"✨ [익절] {pos['name']} | 목표 수익률(+21%) 도달!")
                    signal = Signal(code, pos['name'], Action.SELL, strength=1.0, reason="+21% 익절 달성")
                    self.executor.execute_signal(signal)
                    codes_to_remove.append(code)
                    send_telegram_message(f"✨ *[본데 익절]* {pos['name']}\n• 현재가: {curr_price:,}\n• 수익률: {profit_rate:.2f}% (목표 달성)")
                    continue

                # 3. 특수 규칙: 3일 내 20% 상승 시 손절선 재설정
                if days_held <= 3 and profit_rate >= 20.0 and pos.get('status') == "active":
                    # 손절선을 현재가의 -3% 지점으로 상향 조정 (수익 보존)
                    new_stop = curr_price * 0.97
                    pos['stop_price'] = new_stop
                    pos['status'] = "protected"
                    self._save_positions()
                    logger.info(f"🛡️ [보호] {pos['name']} | 3일 내 20% 상승! 손절선을 {new_stop:,}원으로 상향 조정")
                    send_telegram_message(f"🛡️ *[본데 보호]* {pos['name']}\n• 3일 내 20% 상승 달성\n• 손절선 상향 조정: {new_stop:,}원")

            except Exception as e:
                logger.error(f"❌ {pos['name']} 모니터링 중 오류: {e}")

        for code in codes_to_remove:
            del self.active_positions[code]
        if codes_to_remove:
            self._save_positions()

    def run_forever(self):
        logger.info("🟢 본데 기계적 자동매매 엔진 가동 (24시간 모니터링 모드)")
        ka.auth(svr=self.env_dv, product="01")
        
        while True:
            now = datetime.now()
            # 시장 개장 여부 확인
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
