import sys
import os
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta

# PYTHONPATH 설정
SCRATCH_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRATCH_DIR)
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

# Minimal Bonde Logic
def scan_with_yfinance():
    print("="*60)
    print("SCAN: [yfinance] Bonde Strategy Korean Stocks")
    print("="*60)
    
    # List of major KR stocks
    kr_stocks = [
        ("005930.KS", "Samsung Electronics"), ("000660.KS", "SK Hynix"), ("068270.KS", "Celltrion"),
        ("196170.KQ", "Alteogen"), ("005380.KS", "Hyundai Motor"), ("035420.KS", "NAVER"),
        ("000270.KS", "Kia"), ("105560.KS", "KB Financial"), ("055550.KS", "Shinhan Financial"),
        ("005490.KS", "POSCO Holdings"), ("035720.KS", "Kakao"), ("000810.KS", "Samsung Fire"),
        ("012330.KS", "Hyundai Mobis"), ("066570.KS", "LG Electronics"), ("032830.KS", "Samsung Life"),
        ("009150.KS", "Samsung Electro-Mech"), ("010130.KS", "Korea Zinc"), ("033780.KS", "KT&G"),
        ("000100.KS", "Yuhan"), ("003670.KS", "POSCO Future M"), ("086790.KS", "Hana Financial"),
        ("011200.KS", "HMM"), ("015760.KS", "KEPCO"), ("017670.KS", "SK Telecom"),
        ("018260.KS", "Samsung SDS"), ("034220.KS", "LG Display"), ("010950.KS", "S-Oil"),
        ("004020.KS", "Hyundai Steel"), ("028260.KS", "Samsung C&T"), ("096770.KS", "SK Innovation"),
        ("051910.KS", "LG Chem"), ("006400.KS", "Samsung SDI"), ("373220.KS", "LG Energy Sol"),
        ("207940.KS", "Samsung Bio"), ("001570.KS", "Kumho Petro"), ("000720.KS", "Hyundai E&C"),
        ("003490.KS", "Korean Air"), ("030200.KS", "KT"), ("011170.KS", "Lotte Chem"),
        ("036570.KS", "NCsoft"), ("009830.KS", "Hanwha Sol"), ("021240.KS", "Coway"),
        ("004170.KS", "Shinsegae"), ("010140.KS", "Samsung Heavy"), ("047050.KS", "POSCO DX"),
        ("000120.KS", "CJ Logistics"), ("003410.KS", "Ssangyong C&E"), ("009150.KS", "Samsung Electro-Mech"),
        ("042700.KQ", "HPSP"), ("247540.KQ", "Ecopro BM"), ("086520.KQ", "Ecopro")
    ]
    
    results = []
    
    for ticker, name in kr_stocks:
        try:
            df = yf.download(ticker, period="150d", progress=False)
            if df.empty or len(df) < 65:
                continue
                
            df = df.reset_index()
            df.columns = [c.lower() for c in df.columns]
            
            # Ensure columns are 1D Series
            close = df['close'].squeeze()
            volume = df['volume'].squeeze()
            
            # Indicators
            c1 = close.shift(1)
            v1 = volume.shift(1)
            pct_change = ((close - c1) / c1) * 100
            
            sma7 = close.rolling(window=7).mean()
            sma65 = close.rolling(window=65).mean()
            ti65 = (sma7 / sma65).iloc[-1]
            
            avg_v50 = volume.rolling(window=50).mean().iloc[-1]
            
            latest_pct = pct_change.iloc[-1]
            latest_vol = volume.iloc[-1]
            prev_v1 = v1.iloc[-1]
            
            # Anti-bagholder check (3 days up)
            prev_3_days_up = (close.iloc[-1] > close.iloc[-2] > close.iloc[-3] > close.iloc[-4])
            
            is_buy = False
            reason = ""
            
            # MB Setup
            if (latest_pct >= 4.0) and (latest_vol > prev_v1) and (ti65 >= 1.05):
                if not prev_3_days_up:
                    is_buy = True
                    reason = f"Momentum Burst (RS: {ti65:.2f})"
            
            # EP Setup
            if (latest_pct >= 10.0) and (latest_vol >= 3 * avg_v50):
                is_buy = True
                reason = f"Episodic Pivot (Vol: {latest_vol/avg_v50:.1f}x)"
                
            if is_buy:
                results.append((ticker, name, latest_pct, reason))
                print(f"BUY: {name:20} | {latest_pct:6.2f}% | {reason}")
                
        except Exception as e:
            continue

    print("\n" + "="*60)
    if not results:
        print("No stocks found meeting Bonde criteria today.")
    else:
        print(f"Total {len(results)} stocks found.")
    print("="*60)

if __name__ == "__main__":
    scan_with_yfinance()
