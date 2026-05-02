from flask import Flask
import os
import pandas as pd
import json

app = Flask(__name__)

# [ SYSTEM ] STOCK DRAGONFLY V6.0 PLATINUM DEPLOYMENT
# Flask version (No Streamlit)

def get_mission_bundle():
    bundle = {}
    mission_dir = "missions"
    if os.path.exists(mission_dir):
        for filename in os.listdir(mission_dir):
            if filename.endswith(".html"):
                with open(os.path.join(mission_dir, filename), "r", encoding="utf-8") as f:
                    bundle[filename.replace(".html", "")] = f.read()
    return bundle

def fetch_hq_data():
    USERS_SHEET_URL = "https://docs.google.com/spreadsheets/d/1HbC_U1I78HAdV99X6qS1hmY_RiRGPrHX92AYbBPrIpU/export?format=csv&gid=1180564490"
    try:
        df = pd.read_csv(USERS_SHEET_URL)
        return {"members": df.to_dict('records')}
    except:
        return {"members": []}

@app.route('/')
def index():
    mission_bundle = get_mission_bundle()
    hq_data = fetch_hq_data()
    
    html_path = "index.html"
    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            html_content = f.read()
        
        # 데이터 주입
        data_injection = f"""
        <script>
            window.HQ_DATA = {json.dumps(hq_data, ensure_ascii=False)};
            window.MISSION_BUNDLE = {json.dumps(mission_bundle, ensure_ascii=False)};
        </script>
        """
        # <head> 태그 바로 뒤에 데이터 삽입
        return html_content.replace("<head>", f"<head>{data_injection}")
    else:
        return "Error: index.html not found.", 404

if __name__ == "__main__":
    # 서버 실행 (포트 80 또는 원하는 포트)
    app.run(host='0.0.0.0', port=80)
