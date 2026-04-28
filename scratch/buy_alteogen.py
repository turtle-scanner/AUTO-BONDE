import sys
import os
import logging

# Set base dir to the project root
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

def buy_alteogen():
    print("="*60)
    print("BUY ORDER: Alteogen (196170) 1 Share")
    print("="*60)
    
    # Auth (Paper Trading)
    try:
        ka.auth(svr="vps", product="01")
    except Exception as e:
        print(f"Auth Failed: {e}")
        return

    # Initialize Executor (Paper Trading)
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

if __name__ == "__main__":
    buy_alteogen()
