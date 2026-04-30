import os
import sys
import json
from datetime import datetime

# 프로젝트 경로 추가
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")
if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

import kis_auth as ka
from core import data_fetcher, indicators

def init_positions():
    ka.auth(svr="prod")
    
    holdings = [
        {"code": "001780", "name": "알루코", "qty": 221, "yield": -1.54},
        {"code": "FANG", "name": "Diamondback Energy", "qty": 3},
        {"code": "ARM", "name": "ARM", "qty": 2},
        {"code": "SMCI", "name": "Super Micro Computer", "qty": 3},
        {"code": "MU", "name": "Micron Technology", "qty": 1},
        {"code": "NVDA", "name": "NVIDIA", "qty": 17},
        {"code": "CEG", "name": "Constellation Energy", "qty": 1},
        {"code": "COIN", "name": "Coinbase", "qty": 1},
        {"code": "MSTR", "name": "MicroStrategy", "qty": 1},
    ]
    
    active_positions = {}
    
    for h in holdings:
        code = h['code']
        name = h['name']
        qty = h['qty']
        
        print(f"Fetching {name} ({code})...")
        price_info = data_fetcher.get_current_price(code)
        curr_price = float(price_info.get('price', 0))
        
        if h.get('yield'):
            # entry_price * (1 + yield/100) = curr_price
            # entry_price = curr_price / (1 + yield/100)
            entry_price = curr_price / (1 + h['yield']/100)
        else:
            entry_price = curr_price
            
        # ATR 계산을 위해 과거 데이터 조회
        df = data_fetcher.get_daily_prices(code, days=30)
        atr = indicators.calc_atr(df).iloc[-1] if df is not None and not df.empty else entry_price * 0.05
        stop_price = entry_price - (atr * 2)
        
        active_positions[code] = {
            "name": name,
            "entry_price": round(entry_price, 2),
            "stop_price": round(stop_price, 2),
            "atr": round(atr, 2),
            "qty": qty,
            "entry_date": datetime.now().strftime("%Y-%m-%d"),
            "reason": "Manual Sync (User Requested)",
            "status": "active"
        }
        
    output_path = os.path.join(BASE_DIR, "bonde_active_positions.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(active_positions, f, ensure_ascii=False, indent=4)
        
    print(f"Successfully saved {len(active_positions)} positions to {output_path}")

if __name__ == "__main__":
    init_positions()
