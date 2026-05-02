import streamlit as st
import streamlit.components.v1 as components
import os
import pandas as pd
import json

# [ SYSTEM ] STOCK DRAGONFLY V6.0 PLATINUM DEPLOYMENT
# This script serves the new V6.0 HTML Terminal with BUNDLED MISSION DATA.

st.set_page_config(
    page_title="STOCK DRAGONFLY V6.0 | Platinum Command",
    page_icon="https://raw.githubusercontent.com/turtle-scanner/AUTO-BONDE/main/StockDragonfly.png",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# --- DATA BUNDLING (Avoiding Fetch Errors) ---
@st.cache_data(ttl=300)
def get_mission_bundle():
    bundle = {}
    mission_dir = "missions"
    if os.path.exists(mission_dir):
        for filename in os.listdir(mission_dir):
            if filename.endswith(".html"):
                with open(os.path.join(mission_dir, filename), "r", encoding="utf-8") as f:
                    bundle[filename.replace(".html", "")] = f.read()
    return bundle

@st.cache_data(ttl=300)
def fetch_hq_data():
    USERS_SHEET_URL = "https://docs.google.com/spreadsheets/d/1HbC_U1I78HAdV99X6qS1hmY_RiRGPrHX92AYbBPrIpU/export?format=csv&gid=1180564490"
    try:
        df = pd.read_csv(USERS_SHEET_URL)
        return {"members": df.to_dict('records')}
    except:
        return {"members": []}

mission_bundle = get_mission_bundle()
hq_data = fetch_hq_data()

# Hide Streamlit elements
st.markdown("""
    <style>
    #MainMenu {visibility: hidden;} footer {visibility: hidden;} header {visibility: hidden;}
    .block-container {padding: 0rem;}
    iframe { height: 100vh !important; width: 100vw !important; border: none; }
    </style>
    """, unsafe_allow_html=True)

# Bundle Everything into index.html
html_path = "index.html"
if os.path.exists(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Injecting real-time data AND mission bundle
    data_injection = f"""
    <script>
        window.HQ_DATA = {json.dumps(hq_data, ensure_ascii=False)};
        window.MISSION_BUNDLE = {json.dumps(mission_bundle, ensure_ascii=False)};
    </script>
    """
    html_content = html_content.replace("<head>", f"<head>{data_injection}")
    
    components.html(html_content, height=1500, scrolling=True)
else:
    st.error("Error: index.html not found.")
