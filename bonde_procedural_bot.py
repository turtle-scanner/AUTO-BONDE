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
from strategy.strategy_11_bonde import AdvancedBondeStrategy
from telegram_notifier import send_telegram_message

# 로깅 설정
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(os.path.join(BASE_DIR, "bonde_bot_v3.log"), encoding='utf-8'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class BondeProceduralBotV3:
    def __init__(self, env_dv="prod"):
        self.env_dv = env_dv
        self.strategy = AdvancedBondeStrategy()
        self.executor = order_executor.OrderExecutor(env_dv=env_dv)
        self.watchlist_path = os.path.join(BASE_DIR, "bonde_watchlist.json")
        self.positions_path = os.path.join(BASE_DIR, "bonde_active_positions.json")
        self.pending_path = os.path.join(BASE_DIR, "bonde_pending_orders.json")
        self.history_path = os.path.join(BASE_DIR, "bonde_trade_history.json")
        
        self.active_positions = self._load_positions()
        self.trade_history = self._load_history()
        
        # 설정값 (본데 v3.0)
        self.max_positions = 10
        self.last_heartbeat = 0
        self.market_status = "OK"
        
    def _load_positions(self):
        if os.path.exists(self.positions_path):
            try:
                with open(self.positions_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except: return {}
        return {}

    def _load_history(self):
        if os.path.exists(self.history_path):
            try:
                with open(self.history_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            except: return []
        return []

    def _save_positions(self):
        with open(self.positions_path, "w", encoding="utf-8") as f:
            json.dump(self.active_positions, f, ensure_ascii=False, indent=4)

    def _calculate_exposure(self):
        """본데의 Progressive Exposure: 연승 시 비중 확대, 연패 시 비중 축소"""
        if not self.trade_history: return 0.01 # 기본 1%
        
        recent_trades = self.trade_history[-5:] # 최근 5회 매매
        wins = sum(1 for t in recent_trades if t.get('profit_rate', 0) > 0)
        
        if wins >= 4: return 0.02 # 연승 중이면 2% 공격적 투자
        if wins <= 1: return 0.005 # 연패 중이면 0.5% 보수적 투자
        return 0.01

    def _fetch_with_backoff(self, func, *args, max_retries=5, **kwargs):
        for i in range(max_retries):
            try:
                res = func(*args, **kwargs)
                if res is not None:
                    if isinstance(res, pd.DataFrame) and res.empty:
                        time.sleep(1)
                        continue
                    return res
            except Exception as e:
                time.sleep(2 ** i)
        return None

    def scan_task(self, item):
        code = item['code']
        name = item['name']
        try:
            df = self._fetch_with_backoff(data_fetcher.get_daily_prices, code, days=150)
            if df is None or len(df) < 100: return None
            
            signal = self.strategy.check_signal(code, name, df)
            if signal and signal.action == Action.BUY:
                atr = indicators.calc_atr(df).iloc[-1]
                return {"item": item, "signal": signal, "atr": atr}
        except: return None
        return None

    def scan_and_buy(self):
        if not os.path.exists(self.watchlist_path): return
        with open(self.watchlist_path, "r", encoding="utf-8") as f:
            watchlist = json.load(f)

        # 1. 공격성(Exposure) 계산
        risk_pct = self._calculate_exposure()
        logger.info(f"[EXPOSURE] 현재 리스크 비중: {risk_pct*100}%")

        # 2. 병렬 스캔
        signals = []
        with ThreadPoolExecutor(max_workers=8) as executor:
            futures = [executor.submit(self.scan_task, item) for item in watchlist]
            for future in as_completed(futures):
                res = future.result()
                if res: signals.append(res)

        if not signals: return
        
        acc = self._fetch_with_backoff(data_fetcher.get_deposit, self.env_dv)
        if not acc: return
        total_asset = acc.get('total_eval', 0)
        risk_money = total_asset * risk_pct
        
        for sig in signals:
            if len(self.active_positions) >= self.max_positions: break
            code = sig['item']['code']
            if code in self.active_positions: continue
            
            price_info = self._fetch_with_backoff(data_fetcher.get_current_price, code)
            entry_price = float(price_info.get('price', 0))
            if entry_price == 0: continue
            
            atr = sig['atr']
            stop_loss = entry_price - (atr * 2)
            
            # 수량 계산
            unit_risk = entry_price - stop_loss
            if unit_risk <= 0: unit_risk = entry_price * 0.03
            qty = int(risk_money / unit_risk)
            
            if qty <= 0: continue

            res_order = self.executor.execute_signal(sig['signal'], risk_amount=risk_money)
            if not res_order.empty:
                self.active_positions[code] = {
                    "name": sig['item']['name'],
                    "entry_price": entry_price,
                    "stop_price": stop_loss,
                    "atr": atr,
                    "qty": qty,
                    "entry_date": datetime.now().strftime("%Y-%m-%d"),
                    "reason": sig['signal'].reason,
                    "status": "active"
                }
                self._save_positions()
                send_telegram_message(f"🚀 [Advanced Bonde BUY]\n종목: {sig['item']['name']}\n진입가: {entry_price:,}원\n이유: {sig['signal'].reason}")

    def sync_positions(self):
        """실제 계좌 잔고(국내/해외)와 봇의 관리 종목을 동기화합니다."""
        try:
            # 1. 국내/해외 잔고 통합 조회
            kr_holdings = data_fetcher.get_holdings(self.env_dv)
            us_holdings = data_fetcher.get_foreign_holdings(self.env_dv)
            
            # DataFrame 통합
            all_holdings = []
            if not kr_holdings.empty: all_holdings.append(kr_holdings)
            if not us_holdings.empty: all_holdings.append(us_holdings)
            
            if not all_holdings:
                if self.active_positions:
                    logger.info("[SYNC] 계좌에 보유 종목이 없어 관리 목록을 초기화합니다.")
                    self.active_positions = {}
                    self._save_positions()
                return

            holdings_df = pd.concat(all_holdings, ignore_index=True)
            real_codes = set(holdings_df['stock_code'].tolist())
            managed_codes = set(self.active_positions.keys())

            # 2. 제거된 종목 처리 (매도 완료)
            for code in managed_codes - real_codes:
                logger.info(f"[SYNC] {self.active_positions[code]['name']} ({code}) 종목이 계좌에 없어 관리 목록에서 제거합니다.")
                del self.active_positions[code]

            # 3. 추가/업데이트 처리
            for _, row in holdings_df.iterrows():
                code = row['stock_code']
                qty = int(float(row['quantity']))
                avg_price = float(row['avg_price'])
                name = row['stock_name']

                if code in self.active_positions:
                    if self.active_positions[code]['qty'] != qty:
                        logger.info(f"[SYNC] {name} ({code}) 수량 변경: {self.active_positions[code]['qty']} -> {qty}")
                        self.active_positions[code]['qty'] = qty
                else:
                    logger.info(f"[SYNC] 새로운 보유 종목 발견: {name} ({code}). 관리 목록에 추가합니다.")
                    
                    # ATR 기반 손절가 자동 설정 (국내/해외 자동 판별)
                    df = self._fetch_with_backoff(data_fetcher.get_daily_prices, code, days=30)
                    atr = indicators.calc_atr(df).iloc[-1] if df is not None and not df.empty else avg_price * 0.05
                    stop_loss = avg_price - (atr * 2)

                    self.active_positions[code] = {
                        "name": name,
                        "entry_price": avg_price,
                        "stop_price": stop_loss,
                        "atr": atr,
                        "qty": qty,
                        "entry_date": datetime.now().strftime("%Y-%m-%d"),
                        "reason": "Account Sync (Manual Buy or Prior Session)",
                        "status": "active"
                    }
            
            self._save_positions()
        except Exception as e:
            logger.error(f"[SYNC] 계좌 동기화 중 오류 발생: {e}")

    def monitor_and_sell(self):
        # 0. 계좌와 동기화
        self.sync_positions()
        
        if not self.active_positions: return
        codes_to_remove = []
        for code, pos in self.active_positions.items():
            try:
                price_info = self._fetch_with_backoff(data_fetcher.get_current_price, code)
                curr = float(price_info.get('price', 0))
                if curr == 0: continue

                # 1. ATR 기반 손절
                if curr <= pos['stop_price']:
                    self.executor.execute_signal(Signal(code, pos['name'], Action.SELL, reason="ATR 손절"))
                    send_telegram_message(f"🔴 [STOP] {pos['name']} 손절가 터치")
                    codes_to_remove.append(code)
                    continue

                # 2. 본데 방식 SMA7 추세 이탈
                df = self._fetch_with_backoff(data_fetcher.get_daily_prices, code, days=20)
                if df is not None and len(df) >= 7:
                    sma7 = indicators.calc_ma(df, 7).iloc[-1]
                    if curr < sma7 * 0.995:
                        self.executor.execute_signal(Signal(code, pos['name'], Action.SELL, reason="7일선 이탈"))
                        send_telegram_message(f"🔵 [EXIT] {pos['name']} 추세 종료 매도")
                        codes_to_remove.append(code)
            except: continue

        for c in codes_to_remove: del self.active_positions[c]
        if codes_to_remove: self._save_positions()

    def _process_pending_orders(self):
        if not os.path.exists(self.pending_path): return
        try:
            with open(self.pending_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            pending = data.get("pending_orders", [])
            for order in pending:
                sig = Signal(order['code'], order['name'], Action.BUY, strength=1.0, reason=order['reason'], quantity=order['qty'])
                self.executor.execute_signal(sig)
            os.remove(self.pending_path)
        except: pass

    def run_forever(self):
        logger.info("Bonde Bot V3.0 Advanced Started")
        ka.auth(svr=self.env_dv)
        self._process_pending_orders()
        while True:
            kst = datetime.now(timezone(timedelta(hours=9)))
            is_market_open = (kst.weekday() < 5) and ((9,0)<=(kst.hour, kst.minute)<=(15,40) or kst.hour >= 22 or kst.hour < 6)
            if is_market_open:
                if kst.minute % 15 == 0: self.scan_and_buy()
                self.monitor_and_sell()
            time.sleep(60)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--env", default="prod")
    parser.add_argument("--once", action="store_true")
    args = parser.parse_args()
    bot = BondeProceduralBotV3(env_dv=args.env)
    if args.once:
        ka.auth(svr=bot.env_dv)
        bot.scan_and_buy()
        bot.monitor_and_sell()
    else: bot.run_forever()
