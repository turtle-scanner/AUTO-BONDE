import sys
import os
import logging
import pandas as pd

# Set base dir to the project root (one level up from scratch/)
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRATCH_DIR)
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

import kis_auth as ka
from core import data_fetcher

logging.basicConfig(level=logging.INFO)

def test_fetch():
    print("Testing KIS API Connectivity...")
    try:
        # Auth (Paper Trading)
        ka.auth(svr="vps", product="01")
        print("Auth Success")
        
        # Fetch KR stock
        print("Fetching Samsung Electronics (005930)...")
        df_kr = data_fetcher.get_daily_prices("005930", days=5, env_dv="vps")
        if not df_kr.empty:
            print("KR Fetch Success:")
            print(df_kr.tail())
        else:
            print("KR Fetch Failed (Empty DF)")
            
        # Fetch US stock
        print("\nFetching NVDA...")
        df_us = data_fetcher.get_daily_prices("NVDA", days=5, env_dv="vps")
        if not df_us.empty:
            print("US Fetch Success:")
            print(df_us.tail())
        else:
            print("US Fetch Failed (Empty DF)")
            
    except Exception as e:
        print(f"Test Failed with Exception: {e}")

if __name__ == "__main__":
    test_fetch()
