import sys
import os
import pandas as pd

# 프로젝트 경로 설정
# 현재 스크립트 위치가 scratch 폴더 내부이므로 한 단계 위가 프로젝트 루트입니다.
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRATCH_DIR)
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

import kis_auth as ka
from core import data_fetcher

def debug_foreign():
    # 1. KIS 인증 (사용자 환경에 맞춰 vps 또는 prod)
    # 여기서는 대시보드 세션 상태를 모르므로 일단 prod 시도
    try:
        ka.auth(svr="prod", product="01")
        print("Auth Success")
    except:
        print("Auth Failed")
        return

    print("\n--- [PROD] Foreign Deposit ---")
    dep = data_fetcher.get_foreign_deposit("prod")
    print(dep)

    print("\n--- [PROD] Foreign Holdings ---")
    holdings = data_fetcher.get_foreign_holdings("prod")
    print(holdings)
    
    print("\n--- [VPS] Foreign Deposit ---")
    dep_vps = data_fetcher.get_foreign_deposit("vps")
    print(dep_vps)

    print("\n--- [PROD] Domestic Holdings ---")
    dom_holdings = data_fetcher.get_holdings("prod")
    print(dom_holdings)
    
    if not holdings.empty:
        print("\nColumns in holdings:")
        print(holdings.columns.tolist())

if __name__ == "__main__":
    debug_foreign()
