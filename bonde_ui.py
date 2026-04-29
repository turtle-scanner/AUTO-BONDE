import streamlit as st
import json
import os
import pandas as pd

# 페이지 설정
st.set_page_config(page_title="Bonde Bot Web Dashboard", layout="wide")

# 보안 설정 (ID/PW: cntfed)
def check_password():
    if "authenticated" not in st.session_state:
        st.session_state["authenticated"] = False

    if not st.session_state["authenticated"]:
        with st.sidebar:
            st.title("🔒 Secure Access")
            user_id = st.text_input("ID", value="cntfed")
            user_pw = st.text_input("Password", type="password")
            if st.button("Login"):
                if user_id == "cntfed" and user_pw == "cntfed":
                    st.session_state["authenticated"] = True
                    st.rerun()
                else:
                    st.error("Invalid ID or Password")
        return False
    return True

if check_password():
    # 데이터 경로
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    POSITIONS_PATH = os.path.join(BASE_DIR, "bonde_active_positions.json")
    WATCHLIST_PATH = os.path.join(BASE_DIR, "bonde_watchlist.json")

    # 사용자 지정 가격 데이터
    CASH_DEPOSIT = 297791
    PRICES = {"NVDA": 213.0, "MU": 742000.0, "001780": 3260.0}
    USD_KRW = 1400.0

    # 자산 계산 로직
    def calculate_assets():
        nvda_val = 17 * PRICES["NVDA"] * USD_KRW
        mu_val = 1 * PRICES["MU"]
        aluko_val = 2 * PRICES["001780"]
        total = int(nvda_val + mu_val + aluko_val + CASH_DEPOSIT)
        return total, int(nvda_val + mu_val + aluko_val)

    total_assets, stock_value = calculate_assets()

    # 메인 헤더
    st.title("🚀 Bonde Tactical Dashboard v3.5")
    st.markdown("---")

    # 상단 요약 카드
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Assets", f"₩{total_assets:,}")
    with col2:
        st.metric("Cash Deposit", f"₩{CASH_DEPOSIT:,}")
    with col3:
        st.metric("Stock Value", f"₩{stock_value:,}")
    with col4:
        st.metric("Risk Level", "1.0%", delta="Progressive")

    # 본문 영역
    st.subheader("📊 Current Holdings")
    if os.path.exists(POSITIONS_PATH):
        with open(POSITIONS_PATH, "r", encoding="utf-8") as f:
            positions = json.load(f)
            
        pos_data = []
        for code, info in positions.items():
            qty = info['qty']
            if code == "NVDA": val = f"₩{(qty*PRICES['NVDA']*USD_KRW):,.0f}"
            elif code == "MU": val = f"₩{(qty*PRICES['MU']):,.0f}"
            else: val = f"₩{(qty*3260):,}"
            
            pos_data.append({
                "STOCK": info['name'],
                "QTY": qty,
                "EST. VALUE": val,
                "STATUS": "Monitoring (SMA7)"
            })
        st.table(pd.DataFrame(pos_data))

    # 관심 종목 섹션
    st.markdown("---")
    left_col, right_col = st.columns(2)

    with left_col:
        st.subheader("🇰🇷 Watchlist Top 5 (KR)")
        if os.path.exists(WATCHLIST_PATH):
            with open(WATCHLIST_PATH, "r", encoding="utf-8") as f:
                watchlist = json.load(f)
            kr_stocks = [s for s in watchlist if s.get('market') == 'KOSDAQ'][:5]
            st.dataframe(pd.DataFrame(kr_stocks)[['name', 'code', 'rs_score']])

    with right_col:
        st.subheader("🇺🇸 Watchlist Top 5 (US)")
        if os.path.exists(WATCHLIST_PATH):
            us_stocks = [s for s in watchlist if s.get('market') == 'NASDAQ'][:5]
            st.dataframe(pd.DataFrame(us_stocks)[['name', 'code', 'rs_score']])

    # 푸터
    st.sidebar.markdown("---")
    st.sidebar.info(f"Last Sync: {pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')}")
    if st.sidebar.button("Logout"):
        st.session_state["authenticated"] = False
        st.rerun()
