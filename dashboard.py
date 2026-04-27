import streamlit as st
import pandas as pd
import os
import sys
from datetime import datetime

# 프로젝트 경로 설정
sys.path.append(os.path.join(os.getcwd(), "strategy_builder"))
import kis_auth as ka
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

    st.divider()

    # 4. 보유 종목 리스트
    st.subheader("📋 보유 종목 리스트")
    holdings_df = data_fetcher.get_holdings(env_dv=st.session_state.env_dv)
    
    if not holdings_df.empty:
        # 보기 좋게 포맷팅
        display_df = holdings_df[['stock_name', 'quantity', 'avg_price', 'current_price', 'profit_rate', 'profit_loss']]
        display_df.columns = ['종목명', '수량', '평균단가', '현재가', '수익률(%)', '평가손익']
        st.dataframe(display_df.style.format({
            '평균단가': '{:,}',
            '현재가': '{:,}',
            '수익률(%)': '{:+.2f}',
            '평가손익': '{:+,}'
        }), use_container_width=True)
    else:
        st.info("현재 보유 중인 종목이 없습니다.")

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
