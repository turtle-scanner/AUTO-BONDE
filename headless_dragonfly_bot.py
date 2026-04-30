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
    "TELEGRAM_CHAT_ID": "7998778160",
    "GEMINI_API_KEY": "YOUR_GEMINI_KEY" 
}

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.FileHandler("dragonfly.log"), logging.StreamHandler()]
)

# --- [3. 통합 관리 봇 클래스 (V2.0 업그레이드 버전)] ---
class BondeUltimateBot:
    def __init__(self):
        auth(svr="prod")
        self.auth_env = getTREnv()
        
        self.executor = OrderExecutor(self.auth_env)
        self.risk_mgr = RiskManager(self.auth_env)
        self.pos_mgr = PositionManager(self.auth_env)
        self.strategy = BondeStrategy(self.auth_env)
        
        self.market_condition = "NORMAL" # NORMAL, CAUTION, PANIC
        logging.info("🦅 본데 얼티밋 V2.0 엔진 업그레이드 완료")

    def send_telegram(self, icon, message):
        url = f"https://api.telegram.org/bot{CONFIG['TELEGRAM_TOKEN']}/sendMessage"
        payload = {"chat_id": CONFIG['TELEGRAM_CHAT_ID'], "text": f"{icon} {message}"}
        try: requests.post(url, json=payload, timeout=5)
        except: pass

    def check_market_breadth(self, market="KOR"):
        """시장 심도 체크: 지수가 이평선 아래면 매매 강도 조절"""
        # (실제 구현: KIS API 지수 데이터 연동)
        self.market_condition = "NORMAL"
        logging.info(f"현재 시장 심도: {self.market_condition}")

    def manage_exits(self):
        """본데의 핵심: 3일 타임 스탑 & 4% 트레일링 스탑"""
        try:
            positions = self.pos_mgr.get_current_positions()
            for pos in positions:
                buy_date = datetime.strptime(pos['buy_date'], '%Y-%m-%d')
                hold_days = (datetime.now() - buy_date).days
                profit_rt = float(pos['profit_rt'])

                # 1. 타임 스탑: 3일 지났는데 수익이 2% 미만이면 정리
                if hold_days >= 3 and profit_rt < 2.0:
                    self.send_telegram("⏳", f"타임 스탑: {pos['name']} (기회비용 확보 매도)")
                    self.executor.sell_market(pos['code'], pos['qty'])

                # 2. 트레일링 스탑 체크
                if self.risk_mgr.check_trailing_stop(pos):
                    self.send_telegram("💰", f"트레일링 스탑: {pos['name']} 수익 확정")
                    self.executor.sell_market(pos['code'], pos['qty'])
        except Exception as e:
            logging.error(f"청산 관리 중 오류: {e}")

    def send_account_report(self):
        try:
            status = self.pos_mgr.get_detailed_account_status()
            report = f"📊 [본데 리포트] {datetime.now().strftime('%m/%d %H:%M')}\n"
            report += f"💰 자산: {status.get('total_amt', 0):,}원\n"
            report += f"📈 수익: {status.get('daily_profit_rt', 0)}%\n"
            report += f"🌡️ 시장온도: {self.market_condition}\n"
            
            stocks_info = ""
            for s in status.get('stocks', []):
                stocks_info += f"• {s['name']}: {s['profit_rt']}%\n"
            
            if stocks_info: report += f"\n📜 보유종목:\n{stocks_info}"
            
            self.send_telegram("📈", report)
        except Exception as e:
            logging.error(f"리포트 생성 실패: {e}")

    def run_trade_cycle(self, market="KOR"):
        self.check_market_breadth(market)
        
        if self.market_condition == "PANIC":
            self.manage_exits()
            return

        self.manage_exits()
        logging.info(f"{market} 사이클 실행 완료")

# --- [4. 메인 실행부] ---
def main():
    bot = BondeUltimateBot()
    bot.send_telegram("🚀", "본데 얼티밋 V2.0 업그레이드 버전 가동!")

    flags = {"kr_morning": False, "kr_report": False, "us_morning": False}

    while True:
        now = datetime.now()
        cur = now.strftime("%H:%M")
        
        if now.weekday() >= 5: # 주말
            time.sleep(3600); continue

        if cur == "08:30" and not flags["kr_morning"]:
            bot.send_telegram("🇰🇷", "시장 개장 전 심도 체크 중..."); flags["kr_morning"] = True
        
        if "09:00" <= cur < "15:30":
            bot.run_trade_cycle("KOR")

        if cur == "16:50" and not flags["kr_report"]:
            bot.send_account_report(); flags["kr_report"] = True

        if "22:30" <= cur or cur < "05:00":
            bot.run_trade_cycle("USA")

        if cur == "06:00":
            flags = {k: False for k in flags}

        time.sleep(60)

if __name__ == "__main__":
    main()
