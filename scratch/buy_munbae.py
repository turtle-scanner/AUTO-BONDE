import sys
import os
import logging
import requests
import urllib3
import json

# SSL 무시 설정
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# PYTHONPATH 설정
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRATCH_DIR)
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

import kis_auth as ka

logging.basicConfig(level=logging.INFO)

def buy_munbae_single_price():
    print("="*60)
    print("AFTER-MARKET SINGLE PRICE BUY ORDER: Munbae Steel (008420) 1 Share @ 3,365")
    print("="*60)
    
    try:
        # Auth (REAL ACCOUNT)
        ka.auth(svr="prod", product="01")
        trenv = ka.getTREnv()
        
        # 시간외 단일가 주문 (ORD_DVSN = '06')
        api_path = "/uapi/domestic-stock/v1/trading/order-cash"
        tr_id = "TTTC0802U" # 실전투자 매수
        
        params = {
            "CANO": trenv.my_acct,
            "ACNT_PRDT_CD": trenv.my_prod,
            "PDNO": "008420",
            "ORD_DVSN": "06", # 시간외 단일가
            "ORD_QTY": "1",
            "ORD_UNPR": "3365", # 오늘 종가
        }
        
        print(f"Sending order: {params}")
        res = ka._url_fetch(api_path, tr_id, "", params, postFlag=True)
        
        if res.isOK():
            print("\nSUCCESS: Order placed for Munbae Steel!")
            print(res.getBody().output)
        else:
            print("\nFAILED: Order execution failed.")
            res.printError(api_path)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    buy_munbae_single_price()
