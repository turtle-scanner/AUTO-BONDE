import sys
import os
import logging

# 프로젝트 경로 추가
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # .../scratch
ROOT_DIR = os.path.dirname(BASE_DIR) # .../AUTO BONDE
STRATEGY_DIR = os.path.join(ROOT_DIR, "strategy_builder")

if ROOT_DIR not in sys.path:
    sys.path.append(ROOT_DIR)
if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

import kis_auth as ka
from core.order_executor import OrderExecutor
from core.signal import Signal, Action

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def buy_aluko_manual():
    # 1. 인증 (실전투자)
    try:
        ka.auth(svr="prod", product="01")
        logger.info("KIS API 인증 성공 (실전투자)")
    except Exception as e:
        logger.error(f"인증 실패: {e}")
        return

    # 2. 주문 실행기 초기화
    executor = OrderExecutor(env_dv="prod")

    # 3. 알루코 (001780) 1주 매수 시그널 생성
    # 시장가(is_strong=True)로 1주 매수
    signal = Signal(
        stock_code="001780",
        stock_name="알루코",
        action=Action.BUY,
        strength=1.0, # 강한 시그널 -> 시장가
        reason="사용자 요청 수동 매수 (1주)",
        quantity=1
    )

    # 4. 주문 실행
    logger.info("알루코 1주 매수 주문을 실행합니다...")
    result = executor.execute_signal(signal)
    
    if not result.empty:
        print("\n" + "="*40)
        print("✅ 주문 성공!")
        print(result)
        print("="*40)
    else:
        print("\n" + "="*40)
        print("❌ 주문 실패 (로그를 확인하세요)")
        print("="*40)

if __name__ == "__main__":
    buy_aluko_manual()
