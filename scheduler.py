import time
import schedule
import logging
from report_to_telegram import main as send_report
from run_bonde_trading import run_bonde_trading

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def job_report():
    logging.info("Sending regular report...")
    send_report()

def job_scan():
    logging.info("Scanning for Bonde setups...")
    run_bonde_trading()

# 스케줄 설정
# 1. 매일 오전 9시, 오후 4시, 오후 11시(미국장)에 보고서 전송
schedule.every().day.at("09:00").do(job_report)
schedule.every().day.at("16:00").do(job_report)
schedule.every().day.at("23:00").do(job_report)

# 2. 매 1시간마다 타점 스캔
schedule.every(1).hours.do(job_scan)

if __name__ == "__main__":
    logging.info("START: Auto report and scan scheduler started.")
    # 시작 시 한 번 실행
    job_report()
    
    while True:
        schedule.run_pending()
        time.sleep(60)
