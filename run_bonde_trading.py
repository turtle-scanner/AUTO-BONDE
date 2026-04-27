import sys
import os
import logging
from datetime import datetime

# 프로젝트 루트 및 strategy_builder 경로 추가
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")
if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

import kis_auth as ka
from strategy.strategy_11_bonde import BondeStrategy

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def run_bonde_trading():
    print("="*60)
    print("🚀 본데(Bonde/Stockbee) 방식 자동 탐색 엔진 v1.0")
    print("="*60)
    
    # 1. KIS API 인증
    # svr="vps"는 모의투자, svr="prod"는 실전투자입니다.
    # 초기에는 안전을 위해 모의투자(vps)로 설정합니다.
    try:
        ka.auth(svr="vps", product="01")
        logger.info("KIS API 인증 성공 (모의투자)")
    except Exception as e:
        logger.error(f"인증 실패: {e}")
        return

    # 2. 본데 전략 초기화
    # 한국장(KR)용 본데 전략 (최소가격 5000원)
    bonde_kr = BondeStrategy(min_change=4.0, volume_ratio=2.0, min_price=5000)
    
    # 미국장(US)용 본데 전략 (최소가격 $5)
    bonde_us = BondeStrategy(min_change=4.0, volume_ratio=2.0, min_price=5.0)

    # 3. 감시 종목 설정 (예시)
    kr_stocks = [
        ("005930", "삼성전자"),
        ("000660", "SK하이닉스"),
        ("068270", "셀트리온"),
        ("005380", "현대차"),
        ("035420", "NAVER")
    ]
    
    us_stocks = [
        ("NVDA", "Nvidia"),
        ("TSLA", "Tesla"),
        ("AAPL", "Apple"),
        ("MSFT", "Microsoft"),
        ("GOOGL", "Alphabet")
    ]

    # 4. 국내장 스캔
    print("\n[ 🇰🇷 국내 시장 본데 타점 스캔 ]")
    for code, name in kr_stocks:
        try:
            signal = bonde_kr.generate_signal(code, name)
            status = "✨ BUY" if signal.action.value == "buy" else "─ HOLD"
            print(f"[{code}] {name:10} | {status} | {signal.reason}")
            
            # BUY 신호 시 텔레그램 알림
            if signal.action.value == "buy":
                from telegram_notifier import send_telegram_message
                send_telegram_message(f"🚀 *[국내] 본데 매수 타점 포착*\n• 종목: {name} ({code})\n• 근거: {signal.reason}")
                
        except Exception as e:
            print(f"[{code}] {name:10} | ❌ 오류: {e}")

    # 5. 미국장 스캔
    print("\n[ 🇺🇸 미국 시장 본데 타점 스캔 ]")
    for code, name in us_stocks:
        try:
            signal = bonde_us.generate_signal(code, name)
            status = "✨ BUY" if signal.action.value == "buy" else "─ HOLD"
            print(f"[{code:5}] {name:10} | {status} | {signal.reason}")
            
            # BUY 신호 시 텔레그램 알림
            if signal.action.value == "buy":
                from telegram_notifier import send_telegram_message
                send_telegram_message(f"🚀 *[미국] 본데 매수 타점 포착*\n• 종목: {name} ({code})\n• 근거: {signal.reason}")

        except Exception as e:
            print(f"[{code:5}] {name:10} | ❌ 오류: {e}")

    print("\n" + "="*60)
    print(f"스캔 완료 시간: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("="*60)

if __name__ == "__main__":
    run_bonde_trading()
