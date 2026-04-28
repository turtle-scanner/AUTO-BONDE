import sys
import os
import json
import logging
from datetime import datetime
import pandas as pd

# 프로젝트 루트 및 strategy_builder 경로 추가
sys.path.append(os.path.join(os.getcwd(), "strategy_builder"))

import kis_auth as ka
from core import data_fetcher
from telegram_notifier import send_telegram_message

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_market_status():
    """간단한 시장 상황 요약 (코스피/코스닥 지수 등)"""
    # 여기서는 간단하게 텍스트로 반환하거나 특정 지수 데이터를 가져올 수 있습니다.
    # 샘플에서는 생략하거나 간단한 메시지로 대체합니다.
    return "현재 시장은 정상 운영 중입니다. (추후 상세 데이터 연결 가능)"

def generate_report():
    print("Generating Telegram report...")
    
    # 1. KIS 인증
    try:
        # 실전투자(prod) 또는 모의투자(vps) 선택
        # 사용자가 secrets에 false로 설정했으므로 실전투자로 시도
        ka.auth(svr="prod", product="01")
    except Exception as e:
        logger.error(f"인증 실패: {e}")
        return "ERROR: KIS API Auth failed. Please check settings."

    # 2. 잔고 조회
    deposit_info = data_fetcher.get_deposit(env_dv="prod")
    holdings_df = data_fetcher.get_holdings(env_dv="prod")

    # 3. 보고서 작성
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    report = f"📊 *[사령부] 실시간 자산 및 시장 보고서*\n"
    report += f"⏰ 일시: {now_str}\n\n"
    
    # 💰 계좌 잔고
    if deposit_info:
        deposit = deposit_info.get('deposit', 0)
        total_eval = deposit_info.get('total_eval', 0)
        profit_loss = deposit_info.get('profit_loss', 0)
        
        # 수익률 계산
        if total_eval - profit_loss > 0:
            total_profit_rate = (profit_loss / (total_eval - profit_loss)) * 100
        else:
            total_profit_rate = 0.0

        report += f"💰 *통장 잔고*\n"
        report += f"• 예수금: {deposit:,}원\n"
        report += f"• 총 평가금액: {total_eval:,}원\n"
        report += f"• 총 손익: {profit_loss:,}원 ({total_profit_rate:+.2f}%)\n\n"
    else:
        report += f"💰 *통장 잔고*: 데이터 로드 실패\n\n"

    # 📈 보유 종목 및 수익률 (본데 상세 정보 포함)
    report += f"📈 *보유 종목 상세 현황*\n"
    
    # 본데 관리 파일 로드
    pos_file = "bonde_active_positions.json"
    active_pos = {}
    if os.path.exists(pos_file):
        with open(pos_file, "r", encoding="utf-8") as f:
            active_pos = json.load(f)

    if not holdings_df.empty:
        for _, row in holdings_df.iterrows():
            code = row['stock_code']
            pos_info = active_pos.get(code, {})
            
            report += f"• *{row['stock_name']}*\n"
            report += f"  - 수익: {row['profit_rate']:+.2f}% ({row['profit_loss']:,}원)\n"
            
            if pos_info:
                report += f"  - 이유: {pos_info.get('reason', 'N/A')}\n"
                report += f"  - ROE: {pos_info.get('roe', 0)}%\n"
                report += f"  - 목표: {pos_info.get('target_price', 0):,.0f}원\n"
                report += f"  - 손절: {pos_info.get('stop_price', 0):,.0f}원\n"
            else:
                report += "  - (봇 관리 외 종목)\n"
    else:
        report += "• 현재 보유 종목이 없습니다.\n"
    report += "\n"

    # 🌐 시장 상황
    report += f"🌐 *시장 상황*\n"
    report += f"• {get_market_status()}\n\n"

    report += "🫡 본데(Bonde) 전략 엔진이 감시 중입니다."
    
    return report

def main():
    report = generate_report()
    success = send_telegram_message(report)
    if success:
        print("Telegram report sent successfully!")
    else:
        print("Telegram report failed.")

if __name__ == "__main__":
    main()
