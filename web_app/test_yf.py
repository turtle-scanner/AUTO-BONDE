import yfinance as yf
tickers = ["^DJI", "^GSPC", "^IXIC", "^KS11", "^KQ11"]
for t in tickers:
    try:
        data = yf.Ticker(t).history(period="5d")
        print(f"{t}: {len(data)} rows")
        if len(data) > 0:
            print(f"Latest: {data['Close'].iloc[-1]}")
    except Exception as e:
        print(f"Error {t}: {e}")
