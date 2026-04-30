import time
import logging
import requests
import pandas as pd
from datetime import datetime, timedelta
import os

# --- [1. KIS API 및 프로젝트 모듈 연결] ---
from strategy_builder.kis_auth import auth, getTREnv
from strategy_builder.core.order_executor import OrderExecutor
from strategy_builder.core.risk_manager import RiskManager
from strategy_builder.core.position_manager import PositionManager
from strategy_builder.strategy.bonde_strategy import BondeStrategy

# --- [2. 설정 정보] ---
CONFIG = {
    "TELEGRAM_TOKEN": "8713555022:AAFu6WjY6HUpaw2eyYSBSZSrIhiTFex9uho",
    "TELEGRAM_CHAT_ID": "7998778160"
}

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler("dragonfly.log"), logging.StreamHandler()]
)

# --- [3. 통합 관리 봇 클래스 (V2.1 매매 결산 업그레이드)] ---
class BondeUltimateBot:
    def __init__(self):
        auth(svr="prod")
        self.auth_env = getTREnv()
        
        self.executor = OrderExecutor(self.auth_env)
        self.risk_mgr = RiskManager(self.auth_env)
        self.pos_mgr = PositionManager(self.auth_env)
        self.strategy = BondeStrategy(self.auth_env)
        
        # 일일 매매 기록 저장용
        self.daily_trades = [] 
        self.market_condition = "NORMAL"
        logging.info("🦅 본데 얼티밋 V2.1 결산 리포트 엔진 업그레이드 완료")

    def send_telegram(self, icon, message):
        url = f"https://api.telegram.org/bot{CONFIG['TELEGRAM_TOKEN']}/sendMessage"
        payload = {"chat_id": CONFIG['TELEGRAM_CHAT_ID'], "text": f"{icon} {message}"}
        try: requests.post(url, json=payload, timeout=5)
        except: pass

    # [업그레이드: 새벽 6시 매매 결산 리포트]
    def send_daily_summary(self):
        try:
            status = self.pos_mgr.get_detailed_account_status()
            report = f"🌅 [일일 매매 결산 리포트] {datetime.now().strftime('%Y-%m-%d')}\n"
            report += f"💰 최종 평가자산: {status.get('total_amt', 0):,}원\n"
            report += f"📈 누적 수익률: {status.get('daily_profit_rt', 0)}%\n\n"
            
            report += "📝 [오늘의 매매 내역]\n"
            if not self.daily_trades:
                report += "- 오늘은 매매 내역이 없습니다."
            else:
                for trade in self.daily_trades:
                    report += f"• [{trade['type']}] {trade['name']}: {trade['qty']}주 ({trade['price']:,}원)\n"
            
            self.send_telegram("📅", report)
            # 리포트 발송 후 매매 기록 초기화
            self.daily_trades = [] 
        except Exception as e:
            logging.error(f"결산 리포트 생성 실패: {e}")

    # 매매 실행 시 기록 남기기 (가상 메서드 예시)
    def record_trade(self, t_type, name, qty, price):
        self.daily_trades.append({
            "type": t_type, "name": name, "qty": qty, "price": price
        })

    def manage_exits(self):
        """본데의 핵심: 3일 타임 스탑 & 4% 트레일링 스탑"""
        try:
            positions = self.pos_mgr.get_current_positions()
            for pos in positions:
                buy_date = datetime.strptime(pos['buy_date'], '%Y-%m-%d')
                hold_days = (datetime.now() - buy_date).days
                profit_rt = float(pos['profit_rt'])

                if hold_days >= 3 and profit_rt < 2.0:
                    self.send_telegram("⏳", f"타임 스탑 매도: {pos['name']}")
                    self.executor.sell_market(pos['code'], pos['qty'])
                    self.record_trade("매도", pos['name'], pos['qty'], pos['current_price'])

                if self.risk_mgr.check_trailing_stop(pos):
                    self.send_telegram("💰", f"수익 확정 매도: {pos['name']}")
                    self.executor.sell_market(pos['code'], pos['qty'])
                    self.record_trade("매도", pos['name'], pos['qty'], pos['current_price'])
        except Exception as e:
            logging.error(f"청산 관리 중 오류: {e}")

    def send_account_report(self, title="국내 주식 마감 리포트"):
        status = self.pos_mgr.get_detailed_account_status()
        report = f"📊 [{title}]\n"
        report += f"💰 자산: {status.get('total_amt', 0):,}원\n"
        report += f"📈 수익: {status.get('daily_profit_rt', 0)}%\n"
        self.send_telegram("📈", report)

    def run_trade_cycle(self, market="KOR"):
        self.manage_exits()
        logging.info(f"{market} 사이클 실행 완료")

# --- [4. 메인 실행부] ---
def main():
    bot = BondeUltimateBot()
    bot.send_telegram("🚀", "본데 얼티밋 V2.1 결산 시스템 가동!")

    flags = {"kr_morning": False, "kr_report": False, "us_morning": False, "daily_summary": False}

    while True:
        now = datetime.now()
        cur = now.strftime("%H:%M")
        
        if now.weekday() >= 5: time.sleep(3600); continue

        # [08:30] 국내 아침 브리핑
        if cur == "08:30" and not flags["kr_morning"]:
            bot.send_telegram("🇰🇷", "시장 개장 전 브리핑..."); flags["kr_morning"] = True
        
        # [09:00 ~ 15:30] 국내 주식 매매
        if "09:00" <= cur < "15:30":
            bot.run_trade_cycle("KOR")

        # [16:50] 국내 마감 리포트
        if cur == "16:50" and not flags["kr_report"]:
            bot.send_account_report("국내 주식 마감 리포트"); flags["kr_report"] = True

        # [22:30 ~ 05:00] 미국 주식 매매
        if "22:30" <= cur or cur < "05:00":
            bot.run_trade_cycle("USA")

        # [06:00] ★새벽 결산 리포트 (추가된 기능)
        if cur == "06:00" and not flags["daily_summary"]:
            bot.send_daily_summary()
            flags["daily_summary"] = True

        if cur == "07:00": # 아침 7시에 플래그 초기화
            flags = {k: False for k in flags}

        time.sleep(60)

if __name__ == "__main__":
    main()
