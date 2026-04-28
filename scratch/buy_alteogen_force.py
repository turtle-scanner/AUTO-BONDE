import sys
import os
import logging
import requests
import urllib3

# SSL 무시 설정 (매우 위험하지만 디버깅용)
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
os.environ['CURL_CA_BUNDLE'] = ''
os.environ['PYTHONHTTPSVERIFY'] = '0'

# PYTHONPATH 설정
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRATCH_DIR)
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

import kis_auth as ka
from core.order_executor import OrderExecutor
from core.signal import Signal, Action

logging.basicConfig(level=logging.INFO)

def buy_alteogen_force():
    print("="*60)
    print("FORCE BUY ORDER: Alteogen (196170) 1 Share")
    print("="*60)
    
    try:
        # Auth (Paper Trading)
        ka.auth(svr="vps", product="01")
        
        # Initialize Executor
        executor = OrderExecutor(env_dv="vps")
        
        # Create Signal
        signal = Signal(
            stock_code="196170",
            stock_name="Alteogen",
            action=Action.BUY,
            strength=1.0,
            quantity=1,
            reason="User requested manual buy"
        )
        
        # Execute
        res = executor.execute_signal(signal)
        
        if not res.empty:
            print("\nSUCCESS: Order placed!")
            print(res.to_dict())
        else:
            print("\nFAILED: Order execution failed.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    buy_alteogen_force()
