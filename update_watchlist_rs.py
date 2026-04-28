import os
import sys
import json
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
import logging

# 프로젝트 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")
STOCKS_INFO_DIR = os.path.join(BASE_DIR, "stocks_info")

if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)
if STOCKS_INFO_DIR not in sys.path:
    sys.path.append(STOCKS_INFO_DIR)

import kis_kospi_code_mst as kospi
import kis_kosdaq_code_mst as kosdaq

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def get_kr_top_rs(limit=400):
    logger.info("Fetching KR Stock Master...")
    STOCKS_INFO_DIR = os.path.join(BASE_DIR, "stocks_info")
    
    # KOSPI/KOSDAQ 마스터 로드
    kospi.kospi_master_download(STOCKS_INFO_DIR)
    df_kospi = kospi.get_kospi_master_dataframe(STOCKS_INFO_DIR)
    kosdaq.kosdaq_master_download(STOCKS_INFO_DIR)
    df_kosdaq = kosdaq.get_kosdaq_master_dataframe(STOCKS_INFO_DIR)
    
    codes = []
    for _, row in df_kospi.iterrows():
        codes.append({"code": str(row['단축코드']).zfill(6), "name": row['한글명'], "market": "KOSPI", "yf_code": str(row['단축코드']).zfill(6) + ".KS"})
    for _, row in df_kosdaq.iterrows():
        codes.append({"code": str(row['단축코드']).zfill(6), "name": row['한글종목명'], "market": "KOSDAQ", "yf_code": str(row['단축코드']).zfill(6) + ".KQ"})
    
    logger.info(f"Total KR stocks: {len(codes)}. Fetching performance...")
    
    # yfinance로 한 번에 조회 (청크 단위로)
    yf_codes = [c['yf_code'] for c in codes]
    chunk_size = 100
    perf_data = {}
    
    for i in range(0, len(yf_codes), chunk_size):
        chunk = yf_codes[i:i+chunk_size]
        try:
            data = yf.download(chunk, period="1y", interval="1d", group_by='ticker', threads=True, progress=False)
            for ticker in chunk:
                try:
                    if ticker in data and not data[ticker].empty:
                        close = data[ticker]['Close'].dropna()
                        if len(close) > 200:
                            ret = (close.iloc[-1] / close.iloc[0]) - 1
                            perf_data[ticker] = ret
                except:
                    continue
        except:
            continue
        logger.info(f"Progress: {i+len(chunk)}/{len(yf_codes)}")

    # 정렬 및 필터링
    for c in codes:
        c['rs_score'] = perf_data.get(c['yf_code'], -1.0)
    
    top_400 = sorted([c for c in codes if c['rs_score'] > -1], key=lambda x: x['rs_score'], reverse=True)[:limit]
    return top_400

def get_us_top_rs(limit=400):
    logger.info("Fetching US Stock List...")
    # US는 주요 지수 구성 종목 + 거래량 상위 종목 위주로 샘플링 (전체는 너무 많음)
    # 실제로는 nasmst.cod 등을 파싱해야 함. 여기서는 주요 기술주 및 인기 종목 리스트를 사용하거나 yfinance로 검색
    
    # 간단하게 S&P 500 + Nasdaq 100 리스트를 가져오는 방식 (실제로는 더 넓게 잡는 게 좋음)
    # 여기서는 예시로 많이 거래되는 종목 리스트를 직접 정의하거나 외부 소스 활용
    try:
        # S&P 500 리스트 위키피디아에서 가져오기
        table = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
        df_sp500 = table[0]
        tickers = df_sp500['Symbol'].tolist()
        
        # Nasdaq 100 추가
        table_ndx = pd.read_html('https://en.wikipedia.org/wiki/Nasdaq-100')
        df_ndx = table_ndx[4] # 위키피디아 구조에 따라 다를 수 있음
        tickers.extend(df_ndx['Ticker'].tolist())
        tickers = list(set(tickers)) # 중복 제거
    except:
        logger.warning("Failed to fetch US indices. Using fallback list.")
        tickers = ["NVDA", "AAPL", "MSFT", "AMZN", "META", "TSLA", "GOOGL", "AVGO", "COST", "NFLX", "AMD", "MU"]

    logger.info(f"Total US stocks to check: {len(tickers)}. Fetching performance...")
    
    perf_data = {}
    chunk_size = 50
    for i in range(0, len(tickers), chunk_size):
        chunk = tickers[i:i+chunk_size]
        data = yf.download(chunk, period="1y", interval="1d", group_by='ticker', threads=True, progress=False)
        for ticker in chunk:
            try:
                if ticker in data and not data[ticker].empty:
                    close = data[ticker]['Close'].dropna()
                    if len(close) > 200:
                        ret = (close.iloc[-1] / close.iloc[0]) - 1
                        perf_data[ticker] = ret
            except:
                continue
    
    us_codes = []
    for ticker, ret in perf_data.items():
        us_codes.append({"code": ticker, "name": ticker, "market": "NAS", "rs_score": ret})
        
    top_400 = sorted(us_codes, key=lambda x: x['rs_score'], reverse=True)[:limit]
    return top_400

def main():
    kr_top = get_kr_top_rs(400)
    us_top = get_us_top_rs(400)
    
    # 합치기
    watchlist = []
    for s in kr_top:
        watchlist.append({"code": s['code'], "name": s['name'], "market": s['market'], "rs_1y": s['rs_score']})
    for s in us_top:
        watchlist.append({"code": s['code'], "name": s['name'], "market": s['market'], "rs_1y": s['rs_score']})
        
    # 저장
    output_path = os.path.join(BASE_DIR, "bonde_watchlist.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(watchlist, f, ensure_ascii=False, indent=4)
        
    logger.info(f"Watchlist updated with {len(watchlist)} stocks (Top 400 KR, Top 400 US by RS)")

if __name__ == "__main__":
    main()
