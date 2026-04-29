import argparse
import json
import logging
import math
import os
import sys
import time
import pandas as pd
from datetime import datetime, timedelta, timezone
from concurrent.futures import ThreadPoolExecutor, as_completed

# 프로젝트 경로 추가
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")
if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

import kis_auth as ka
from core import data_fetcher, order_executor, indicators
from core.signal import Signal, Action
from strategy.strategy_11_bonde import BondeStrategy
from telegram_notifier import send_telegram_message

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(BASE_DIR, "bonde_bot_v2.log"), encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class BondeProceduralBotV2:
    def __init__(self, env_dv="prod"):
        self.env_dv = env_dv
        self.strategy = BondeStrategy()
        self.executor = order_executor.OrderExecutor(env_dv=env_dv)
        self.watchlist_path = os.path.join(BASE_DIR, "bonde_watchlist.json")
        self.positions_path = os.path.join(BASE_DIR, "bonde_active_positions.json")
        self.active_positions = self._load_positions()
        
        # 설정값 (본데 v2.0)
        self.max_positions = 10
        self.risk_pct = 0.01  # 계좌 총 자산의 1%를 리스크 금액으로 설정
        self.last_heartbeat = 0
        self.market_status = "OK" # OK, CAUTION, STOP
        
    def _load_positions(self):
        if os.path.exists(self.positions_path):
            try:
                with open(self.positions_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except: return {}
        return {}

    def _save_positions(self):
        with open(self.positions_path, "w", encoding="utf-8") as f:
            json.dump(self.active_positions, f, ensure_ascii=False, indent=4)

    def _fetch_with_backoff(self, func, *args, max_retries=5, **kwargs):
        """1. 네트워크 회복력 보강: 지수 백오프 기반 재시도"""
        for i in range(max_retries):
            try:
                res = func(*args, **kwargs)
                if res is not None:
                    if isinstance(res, pd.DataFrame) and res.empty:
                        # 데이터가 비어있는 경우 잠시 대기 후 재시도
                        time.sleep(i + 1)
                        continue
                    return res
            except Exception as e:
                wait_time = (2 ** i) # 1, 2, 4, 8, 16초 대기
                logger.warning(f"Network Issue ({func.__name__}): {e}. Retrying in {wait_time}s...")
                time.sleep(wait_time)
        return None

    def _check_market_breadth(self):
        """2. 마켓 브레스 필터 (지수 급락 시 매수 제한)"""
        try:
            # 나스닥 QQQ와 코스닥 지수 확인
            qqq = self._fetch_with_backoff(data_fetcher.get_daily_prices, "QQQ", days=100)
            if qqq is not None and len(qqq) >= 50:
                sma50 = qqq['close'].rolling(50).mean().iloc[-1]
                curr = qqq['close'].iloc[-1]
                if curr < sma50 * 0.98:
                    self.market_status = "CAUTION"
                    logger.info("Market Status: CAUTION (QQQ below SMA50)")
                else:
                    self.market_status = "OK"
        except:
            self.market_status = "OK"

    def scan_task(self, item):
        """3. 병렬 스캔 작업 단위"""
        code = item['code']
        name = item['name']
        try:
            df = self._fetch_with_backoff(data_fetcher.get_daily_prices, code, days=150)
            if df is None or len(df) < 100: return None
            
            signal = self.strategy.check_signal(code, name, df)
            if signal and signal.action == Action.BUY:
                # ATR 계산 추가
                atr = indicators.calc_atr(df).iloc[-1]
                return {"item": item, "signal": signal, "atr": atr}
        except: return None
        return None

    def scan_and_buy(self):
        """3. 병렬 스캔 도입 및 매수 집행"""
        self._check_market_breadth()
        if self.market_status == "STOP": return

        if not os.path.exists(self.watchlist_path): return
        with open(self.watchlist_path, "r", encoding="utf-8") as f:
            watchlist = json.load(f)

        logger.info(f"[SCAN] 병렬 엔진 가동: {len(watchlist)} 종목 분석 중...")
        signals = []
        with ThreadPoolExecutor(max_workers=8) as executor:
            futures = [executor.submit(self.scan_task, item) for item in watchlist]
            for future in as_completed(futures):
                res = future.result()
                if res: signals.append(res)

        if not signals: return
        
        # 매수 집행
        acc = self._fetch_with_backoff(data_fetcher.get_deposit, self.env_dv)
        if not acc: return
        
        total_asset = acc.get('total_eval', 0)
        risk_money = total_asset * self.risk_pct
        
        for sig in signals:
            if len(self.active_positions) >= self.max_positions: break
            
            code = sig['item']['code']
            if code in self.active_positions: continue
            
            # ATR 기반 손절선 및 수량 계산 (2. 리스크 관리 고도화)
            entry_price = self._fetch_with_backoff(data_fetcher.get_current_price, code)['price']
            atr = sig['atr']
            stop_loss = entry_price - (atr * 2) # ATR의 2배수를 손절폭으로 설정
            
            # 리스크 금액에 따른 수량 계산 (Risk Amount / Unit Risk)
            unit_risk = entry_price - stop_loss
            if unit_risk <= 0: unit_risk = entry_price * 0.03
            qty = int(risk_money / unit_risk)
            
            if qty <= 0: continue

            logger.info(f"BUY EXECUTE: {sig['item']['name']} (Qty: {qty}, Stop: {stop_loss})")
            res_order = self.executor.execute_signal(sig['signal'], risk_amount=risk_money)
            
            if not res_order.empty:
                self.active_positions[code] = {
                    "name": sig['item']['name'],
                    "entry_price": entry_price,
                    "stop_price": stop_loss,
                    "atr": atr,
                    "qty": qty,
                    "entry_date": datetime.now().strftime("%Y-%m-%d"),
                    "status": "active"
                }
                self._save_positions()
                send_telegram_message(f"🟢 [Bonde BUY] {sig['item']['name']}\n- 진입가: {entry_price:,}원\n- 손절가(ATR): {stop_loss:,}원")

    def monitor_and_sell(self):
        """2. 변동성 기반 익절/손절 관리"""
        if not self.active_positions: return

        codes_to_remove = []
        for code, pos in self.active_positions.items():
            try:
                curr = self._fetch_with_backoff(data_fetcher.get_current_price, code)['price']
                if curr <= pos['stop_price']:
                    logger.info(f"STOP LOSS: {pos['name']}")
                    self.executor.execute_signal(Signal(code, pos['name'], Action.SELL, reason="ATR 기반 변동성 손절"))
                    send_telegram_message(f"🔴 [Bonde STOP] {pos['name']} 손절")
                    codes_to_remove.append(code)
                    continue

                # 본데 방식: SMA7 추세 익절
                df = self._fetch_with_backoff(data_fetcher.get_daily_prices, code, days=20)
                if df is not None and len(df) >= 7:
                    sma7 = indicators.calc_ma(df, 7).iloc[-1]
                    if curr < sma7 * 0.99:
                        logger.info(f"TREND EXIT: {pos['name']}")
                        self.executor.execute_signal(Signal(code, pos['name'], Action.SELL, reason="7일선 추세 이탈"))
                        send_telegram_message(f"🔵 [Bonde EXIT] {pos['name']} 추세 종료")
                        codes_to_remove.append(code)
            except: continue

        for c in codes_to_remove: del self.active_positions[c]
        if codes_to_remove: self._save_positions()

    def send_heartbeat(self):
        """4. 실시간 헬스체크 (1시간 보고)"""
        now = time.time()
        if now - self.last_heartbeat >= 3600:
            acc = self._fetch_with_backoff(data_fetcher.get_deposit, self.env_dv)
            balance = f"{acc.get('total_eval', 0):,}원" if acc else "조회 불가"
            msg = f"⏱ [Bonde Bot V2.0]\n- 상태: 정상 작동 중\n- 현재 자산: {balance}\n- 보유 종목: {len(self.active_positions)}개"
            send_telegram_message(msg)
            self.last_heartbeat = now

    def run_forever(self):
        logger.info("Bonde Bot V2.0 Final Version Started")
        ka.auth(svr=self.env_dv)
        
        while True:
            kst = datetime.now(timezone(timedelta(hours=9)))
            is_market_open = (kst.weekday() < 5) and (
                (9, 0) <= (kst.hour, kst.minute) <= (15, 40) or # 한국장
                (kst.hour >= 22 or kst.hour < 6) # 미국장
            )

            if is_market_open:
                if kst.minute % 10 == 0: self.scan_and_buy()
                self.monitor_and_sell()
            
            self.send_heartbeat()
            time.sleep(60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--env", default="prod")
    parser.add_argument("--once", action="store_true")
    args = parser.parse_args()

    bot = BondeProceduralBotV2(env_dv=args.env)
    if args.once:
        ka.auth(svr=bot.env_dv)
        bot.scan_and_buy()
        bot.monitor_and_sell()
    else:
        bot.run_forever()
