import streamlit as st
import pandas as pd
import os
import sys
import json
from datetime import datetime

# 프로젝트 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STRATEGY_DIR = os.path.join(BASE_DIR, "strategy_builder")
if STRATEGY_DIR not in sys.path:
    sys.path.append(STRATEGY_DIR)

import kis_auth as ka
import yfinance as yf
from core import data_fetcher

# 페이지 설정
st.set_page_config(
    page_title="BONDE Command Center",
    page_icon="🚀",
    layout="wide"
)

# 커스텀 CSS (프리미엄 다크 모드)
st.markdown("""
<style>
    .main {
        background-color: #0e1117;
    }
    .stMetric {
        background-color: #1e2130;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        border: 1px solid #30363d;
    }
    .stMetric:hover {
        border-color: #58a6ff;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    [data-testid="stSidebar"] {
        background-color: #161b22;
        border-right: 1px solid #30363d;
    }
    h1, h2, h3 {
        color: #f0f6fc;
        font-family: 'Inter', sans-serif;
    }
    .banana-card {
        background: linear-gradient(135deg, #fff3b0 0%, #ca7e00 100%);
        padding: 20px;
        border-radius: 15px;
        color: #1a1a1a;
        font-weight: bold;
        box-shadow: 0 10px 20px rgba(255, 243, 176, 0.2);
        border: none;
        margin-bottom: 20px;
    }
</style>
""", unsafe_allow_html=True)

# 세션 상태 초기화
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False
if "env_dv" not in st.session_state:
    st.session_state.env_dv = "prod"

def login_page():
    st.container()
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("<h1 style='text-align: center;'>🚀 BONDE COMMAND</h1>", unsafe_allow_html=True)
        st.markdown("<p style='text-align: center; color: #8b949e;'>프라딥 본데 전략 자동매매 사령부</p>", unsafe_allow_html=True)
        
        with st.form("login_form"):
            user_id = st.text_input("아이디", value="cntfed")
            password = st.text_input("비밀번호", type="password")
            submitted = st.form_submit_button("로그인", use_container_width=True)
            
            if submitted:
                if user_id == "cntfed" and password == "123456": # 실제 환경에서는 더 안전한 인증 필요
                    st.session_state.logged_in = True
                    st.success("인증 성공!")
                    st.rerun()
                else:
                    st.error("아이디 또는 비밀번호가 올바르지 않습니다.")

def dashboard_page():
    # 1. 사이드바 설정
    with st.sidebar:
        st.title("🚀 BONDE COMMAND")
        
        # 계좌번호 안전하게 가져오기
        try:
            acct_no = ka.getTREnv().my_acct
        except:
            acct_no = st.secrets.get("KIS_ACCOUNT_NO", os.environ.get("KIS_ACCOUNT_NO", "4654671301"))
        
        token = st.secrets.get("TELEGRAM_TOKEN", os.environ.get("TELEGRAM_TOKEN", "8713555022:AAFu6WjY6HUpaw2eyYSBSZSrIhiTFex9uho"))
        chat_id = st.secrets.get("TELEGRAM_CHAT_ID", os.environ.get("TELEGRAM_CHAT_ID", "7998778160"))
            
        st.info(f"계좌: {acct_no}")
        
        if st.button("로그아웃"):
            st.session_state.logged_in = False
            st.rerun()

    # 2. 메인 화면 구성
    st.title("📊 실시간 자산 모니터링 (통합증거금)")
    
    # KIS 인증
    try:
        ka.auth(svr="prod", product="01")
        trenv = ka.getTREnv()
    except Exception as e:
        st.error(f"API 인증 실패: {e}")
        return

    # 데이터 로드
    with st.spinner("자산 정보를 불러오는 중..."):
        deposit_data = data_fetcher.get_deposit(env_dv=st.session_state.env_dv)
        foreign_data = data_fetcher.get_foreign_deposit(env_dv=st.session_state.env_dv)
        
    # 데이터 가공 (API 응답에서 필요한 값 추출)
    krw_balance = float(deposit_data.get('deposit', 0))
    usd_balance = float(foreign_data.get('usd_deposit', 0))
    krw_equiv = float(foreign_data.get('krw_equiv', 0))
    
    total_asset = krw_balance + krw_equiv
    # 총 손익 (평가금액 합계 - 매입금액 합계)
    total_pnl = int(deposit_data.get('evlu_amt_smtl_amt', 0)) - int(deposit_data.get('pchs_amt_smtl_amt', 0))

    # 3. 자산 현황 카드
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="💰 총합 자산",
            value=f"{total_asset:,.0f} 원",
            delta=f"{total_pnl:+,d} 원"
        )
        
    with col2:
        st.metric(
            label="🇰🇷 원화 (KRW)",
            value=f"{krw_balance:,.0f} 원"
        )
        
    with col3:
        # 환율 계산 (데이터가 없을 경우 대비 기본값 1350원 가정)
        exchange_rate = (krw_equiv / usd_balance) if usd_balance > 0 else 1380.0 
        st.metric(
            label="🇺🇸 해외 자산 (USD)",
            value=f"${usd_balance:,.2f}",
            delta=f"환율: {exchange_rate:,.1f}원",
            delta_color="off"
        )
        st.caption(f"원화 환산: {krw_equiv:,.0f} 원")
        
    with col4:
        pnl_rate = (total_pnl / (total_asset - total_pnl) * 100) if (total_asset - total_pnl) != 0 else 0
        st.metric(
            label="📈 총 손익",
            value=f"{total_pnl:+,d} 원",
            delta=f"{pnl_rate:+.2f}%"
        )

    # 나노 바나나 전용 섹션 (더욱 강력한 시각화)
    if os.path.exists(signals_path):
        with open(signals_path, "r", encoding="utf-8") as f:
            scan_data = json.load(f)
            signals = scan_data.get("signals", [])
            nano_bananas = [s for s in signals if "Banana" in s['reason'] or "나노" in s['reason']]
            
            if nano_bananas:
                st.markdown("### 🍌 Nano Banana Detective")
                btab1, btab2 = st.tabs(["🇰🇷 국내 나노바나나", "🇺🇸 해외 나노바나나"])
                
                # 시장 구분 (market 필드가 없으면 종목코드 숫자로 판별)
                kr_bananas = [s for s in nano_bananas if s.get('market') in ['KOSPI', 'KOSDAQ'] or (s.get('market') is None and s['code'].isdigit())]
                us_bananas = [s for s in nano_bananas if s.get('market') not in ['KOSPI', 'KOSDAQ'] and not (s.get('market') is None and s['code'].isdigit())]

                with btab1:
                    if kr_bananas:
                        for nb in kr_bananas:
                            st.markdown(f"""
                            <div class="banana-card">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <span style="font-size: 1.5em;">🚀 {nb['name']} ({nb['code']})</span><br>
                                        <span style="font-size: 0.9em; opacity: 0.8;">{nb['reason']}</span>
                                    </div>
                                    <div style="text-align: right;">
                                        <span style="font-size: 1.2em;">손절가: {nb['stop_loss']:,}원</span><br>
                                        <span style="font-size: 0.8em;">포착: {nb['time']}</span>
                                    </div>
                                </div>
                            </div>
                            """, unsafe_allow_html=True)
                    else:
                        st.info("현재 국내 시장에 나노 바나나 셋업이 없습니다.")

                with btab2:
                    if us_bananas:
                        for nb in us_bananas:
                            # 해외 주식은 달러 표시
                            st.markdown(f"""
                            <div class="banana-card" style="background: linear-gradient(135deg, #e3f2fd 0%, #1976d2 100%); color: white;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <span style="font-size: 1.5em;">🇺🇸 {nb['name']} ({nb['code']})</span><br>
                                        <span style="font-size: 0.9em; opacity: 0.8;">{nb['reason']}</span>
                                    </div>
                                    <div style="text-align: right;">
                                        <span style="font-size: 1.2em;">손절가: ${nb['stop_loss']:.2f}</span><br>
                                        <span style="font-size: 0.8em;">포착: {nb['time']}</span>
                                    </div>
                                </div>
                            </div>
                            """, unsafe_allow_html=True)
                    else:
                        st.info("현재 해외 시장에 나노 바나나 셋업이 없습니다.")
            else:
                st.info("현재 시장에 나노 바나나 셋업이 포착되지 않았습니다. 관망을 유지하세요.")

    st.divider()

    # 글로벌 마켓 인사이트 (뉴스 및 지수)
    st.subheader("🌐 글로벌 마켓 인사이트")
    mcol1, mcol2 = st.columns([1, 2])
    
    with mcol1:
        st.markdown("#### 📈 주요 시장 지수")
        indices = {
            "^GSPC": "S&P 500",
            "^IXIC": "Nasdaq",
            "^KS11": "KOSPI",
            "^KQ11": "KOSDAQ"
        }
        for ticker, name in indices.items():
            try:
                idx_data = yf.Ticker(ticker).history(period="2d")
                if not idx_data.empty:
                    current_val = idx_data['Close'].iloc[-1]
                    prev_val = idx_data['Close'].iloc[-2]
                    diff = current_val - prev_val
                    pct = (diff / prev_val) * 100
                    st.metric(name, f"{current_val:,.2f}", f"{pct:+.2f}%")
            except:
                st.caption(f"{name} 데이터를 불러올 수 없습니다.")

    with mcol2:
        st.markdown("#### 📰 최신 세계 시장 뉴스")
        try:
            news_list = yf.Ticker("^GSPC").news[:5]
            for news in news_list:
                with st.expander(f"📌 {news['content']['title']}"):
                    st.write(news['content'].get('summary', '요약 정보가 없습니다.'))
                    st.markdown(f"[기사 읽기]({news['content']['canonicalUrl']['url']})")
                    st.caption(f"출처: {news['content']['provider']['displayName']} | {news['content']['displayTime']}")
        except Exception as e:
            st.info("뉴스를 불러오는 중입니다... 잠시만 기다려주세요.")

    st.divider()

    # 4. 실시간 본데 스캐너 현황
    st.subheader("🔍 실시간 본데 스캐너 (Full Market Scan)")
    
    if os.path.exists(signals_path):
        with open(signals_path, "r", encoding="utf-8") as f:
            scan_data = json.load(f)
            
        progress = scan_data.get("progress", 0)
        total = scan_data.get("total", 4341)
        signals = scan_data.get("signals", [])
        last_update = scan_data.get("last_update", "N/A")
        
        # 프로그래스 바
        pct = progress / total if total > 0 else 0
        st.progress(pct, text=f"전 종목 스캔 진행 중: {progress}/{total} ({pct*100:.1f}%) | 마지막 업데이트: {last_update}")
        
        # 포착된 신호 (가로형 카드로 표시)
        if signals:
            st.markdown(f"### 🚀 포착된 매수 신호 ({len(signals)}건)")
            cols = st.columns(3)
            for idx, sig in enumerate(reversed(signals)): # 최신순
                with cols[idx % 3]:
                    st.markdown(f"""
                    <div style="background-color: #1e2130; padding: 15px; border-radius: 10px; border-left: 5px solid #28a745; margin-bottom: 10px;">
                        <h4 style="margin:0;">{sig['name']} ({sig['code']})</h4>
                        <p style="font-size: 0.8em; color: #8b949e;">포착 시간: {sig['time']}</p>
                        <p style="font-weight: bold; color: #28a745;">Setup: {sig['reason']}</p>
                        <p style="font-size: 0.9em;">손절가: {sig['stop_loss']:,}원</p>
                    </div>
                    """, unsafe_allow_html=True)
        else:
            st.info("아직 포착된 매수 신호가 없습니다. 스캔이 진행됨에 따라 여기에 나타납니다.")
    else:
        st.warning("스캐너가 실행 중이 아닙니다. 터미널에서 scan_all_stocks.py를 실행해 주세요.")

    st.divider()

    # 5. 보유 종목 리스트
    st.subheader("📋 보유 종목 리스트")
    
    tab1, tab2 = st.tabs(["🇰🇷 국내 주식", "🇺🇸 해외 주식"])
    
    with tab1:
        holdings_df = data_fetcher.get_holdings(env_dv=st.session_state.env_dv)
        if not holdings_df.empty:
            display_df = holdings_df[['stock_name', 'quantity', 'avg_price', 'current_price', 'profit_rate', 'profit_loss']]
            display_df.columns = ['종목명', '수량', '평균단가', '현재가', '수익률(%)', '평가손익']
            st.dataframe(display_df.style.format({
                '평균단가': '{:,}',
                '현재가': '{:,}',
                '수익률(%)': '{:+.2f}',
                '평가손익': '{:+,}'
            }), use_container_width=True)
        else:
            st.info("현재 보유 중인 국내 종목이 없습니다.")

    with tab2:
        with st.spinner("해외 자산 정보를 불러오는 중..."):
            f_holdings_df = data_fetcher.get_foreign_holdings(env_dv=st.session_state.env_dv)
        
        if not f_holdings_df.empty:
            # 해외 주식은 달러 표시가 필요하므로 별도 포맷팅
            f_display_df = f_holdings_df[['stock_name', 'quantity', 'avg_price', 'current_price', 'profit_rate', 'profit_loss']]
            f_display_df.columns = ['종목명', '수량', '평균단가($)', '현재가($)', '수익률(%)', '평가손익($)']
            
            # 숫자형 변환 (이미 되어있을 수 있지만 안전하게)
            for col in ['수량', '평균단가($)', '현재가($)', '수익률(%)', '평가손익($)']:
                f_display_df[col] = pd.to_numeric(f_display_df[col], errors='coerce')

            st.dataframe(f_display_df.style.format({
                '평균단가($)': '{:,.2f}',
                '현재가($)': '{:,.2f}',
                '수익률(%)': '{:+.2f}',
                '평가손익($)': '{:,.2f}'
            }), use_container_width=True)
        else:
            st.info("현재 보유 중인 해외 종목이 없습니다.")

    # 하단 상태 바
    st.markdown("---")
    st.caption(f"마지막 업데이트: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | 본데 전략 엔진 가동 중")

    # API 진단 모드 (오류 해결용)
    with st.expander("🛠️ API 진단 데이터"):
        st.write("계좌번호:", acct_no)
        st.write("국내 예수금 원본 데이터:", deposit_data)
        st.write("해외 예수금 원본 데이터:", foreign_data)

# 페이지 라우팅
if not st.session_state.logged_in:
    login_page()
else:
    dashboard_page()
