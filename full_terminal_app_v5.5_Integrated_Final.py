import streamlit as st
import streamlit.components.v1 as components
import os

# [ SYSTEM ] STOCK DRAGONFLY V6.0 PLATINUM DEPLOYMENT
# This script serves the new V6.0 HTML Terminal.

st.set_page_config(
    page_title="STOCK DRAGONFLY V6.0 | Platinum Command",
    page_icon="https://raw.githubusercontent.com/turtle-scanner/AUTO-BONDE/main/StockDragonfly.png",
    layout="wide",
    initial_sidebar_state="collapsed",
)

# Hide Streamlit elements
hide_st_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            .block-container {padding-top: 0rem; padding-bottom: 0rem; padding-left: 0rem; padding-right: 0rem;}
            iframe { height: 100vh !important; width: 100vw !important; }
            </style>
            """
st.markdown(hide_st_style, unsafe_allow_html=True)

# Load the V6.0 HTML
html_path = "index.html"
if os.path.exists(html_path):
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()
    
    # Render the HTML
    components.html(html_content, height=2000, scrolling=True)
else:
    st.error(f"Error: {html_path} not found. Please ensure the V6.0 HTML is in the root directory.")
    st.info("System is awaiting file synchronization...")
