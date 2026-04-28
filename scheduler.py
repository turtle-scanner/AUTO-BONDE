import time
import schedule
import logging
from report_to_telegram import main as send_report
from bonde_procedural_bot import BondeProceduralBot

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def job_report():
    logging.info("Sending regular report...")
    send_report()

def job_scan():
    logging.info("Starting automated trade cycle (Scan/Buy/Sell)...")
    try:
        # 실전 계좌(prod)로 봇 초기화
        bot = BondeProceduralBot(env_dv="prod", risk_pct=0.01)
        
        # 1. 감시 및 매도 실행
        bot.monitor_and_sell()
        
        # 2. 신규 종목 스캔 및 매수 실행
        bot.scan_and_buy()
        
    except Exception as e:
        logging.error(f"Trade cycle failed: {e}")

# 스케줄 설정
# 1. 매일 정해진 시간에 보고서 전송 (사용자 퇴근 시간 16:40 포함)
schedule.every().day.at("09:00").do(job_report)
schedule.every().day.at("15:30").do(job_report) # 국내장 마감 직후
schedule.every().day.at("16:40").do(job_report) # 사용자 퇴근 시간 (요청)
schedule.every().day.at("22:30").do(job_report) # 미국장 개장 직전
schedule.every().day.at("23:30").do(job_report) 

# 2. 매 1시간마다 타점 스캔
schedule.every(1).hours.do(job_scan)

if __name__ == "__main__":
    logging.info("START: Auto report and scan scheduler started.")
    # 시작 시 한 번 실행
    job_report()
    
    while True:
        schedule.run_pending()
        time.sleep(60)
