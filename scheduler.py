import time
import schedule
import logging
from report_to_telegram import main as send_report
from bonde_procedural_bot import BondeProceduralBotV3 as BondeProceduralBot

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

def job_report():
    logging.info("Sending regular report...")
    send_report()

def job_scan():
    logging.info("Starting automated trade cycle (Scan/Buy/Sell)...")
    try:
        # 실전 계좌(prod)로 봇 초기화
        bot = BondeProceduralBot(env_dv="prod")
        
        # 1. 감시 및 매도 실행
        bot.monitor_and_sell()
        
        # 2. 신규 종목 스캔 및 매수 실행
        bot.scan_and_buy()
        
    except Exception as e:
        logging.error(f"Trade cycle failed: {e}")

def job_monitor():
    """보유 종목 실시간 감시 (매우 빠른 주기)"""
    try:
        bot = BondeProceduralBot(env_dv="prod")
        bot.monitor_and_sell()
    except Exception as e:
        logging.error(f"Monitor job failed: {e}")

# 스케줄 설정
# 1. 정기 보고서 (9:00, 15:30, 16:40, 22:30, 23:30)
schedule.every().day.at("09:00").do(job_report)
schedule.every().day.at("15:30").do(job_report)
schedule.every().day.at("16:40").do(job_report)
schedule.every().day.at("22:30").do(job_report)
schedule.every().day.at("23:30").do(job_report)

# 2. 실시간 감시 (1분 간격 - 엔비디아 등 즉시 대응용)
schedule.every(1).minutes.do(job_monitor)

# 3. 15분 단위 집중 리포트 및 스캔 (개장 초기 대응용)
schedule.every(15).minutes.do(job_report)
schedule.every(15).minutes.do(job_scan)

# 4. 정기 매매 사이클 (1시간 간격 - 전체 스캔용)
schedule.every(1).hours.do(job_scan)
from secretary_service import (
    send_daily_briefing, 
    send_counseling_problem, 
    send_theory_summary,
    send_pedagogy_problem,
    send_pedagogy_summary
)

# ... (기존 코드 생략)

# 5. 비서 서비스 (뉴스, 날씨, 공부)
schedule.every().day.at("08:30").do(send_daily_briefing) # 아침 브리핑

# 9시부터 23시까지 순환 학습 (상담문제 -> 교육학문제 -> 상담이론 -> 교육학이론)
study_tasks = [
    send_counseling_problem,
    send_pedagogy_problem,
    send_theory_summary,
    send_pedagogy_summary
]

for hour in range(9, 24):
    time_str = f"{hour:02d}:00"
    task = study_tasks[(hour - 9) % len(study_tasks)]
    schedule.every().day.at(time_str).do(task)

from notebook_exporter import export_daily_data

# ... (기존 설정 생략)

# 6. NotebookLM 연동용 데이터 내보내기 (23:50)
schedule.every().day.at("23:50").do(export_daily_data)

if __name__ == "__main__":
    logging.info("START: All-in-one scheduler started.")
    # 시작 시 한 번 실행
    # job_report()
    # export_daily_data() # 테스트용
    
    while True:
        schedule.run_pending()
        time.sleep(60)
