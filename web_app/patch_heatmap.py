import os

base_dir = r"g:\내 드라이브\ANTI GRAVITY\자동매매설정\web_app"
dashboard_path = os.path.join(base_dir, "dashboard.html")
script_path = os.path.join(base_dir, "script.js")
style_path = os.path.join(base_dir, "style.css")
main_path = os.path.join(base_dir, "main.py")

# 1. Update style.css for Heatmap
with open(style_path, "a", encoding="utf-8") as f:
    f.write("""
/* Heatmap UI */
.heatmap-section { background: rgba(10, 10, 15, 0.8); border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.05); padding: 25px; margin-top: 30px; margin-bottom: 30px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
.heatmap-header { font-size: 20px; font-weight: 800; color: white; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
.heatmap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; }
.heatmap-cell { border-radius: 8px; padding: 15px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; font-weight: 800; transition: transform 0.2s, filter 0.2s; cursor: pointer; min-height: 100px; }
.heatmap-cell:hover { transform: scale(1.05); filter: brightness(1.2); z-index: 10; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }
.hm-ticker { font-size: 18px; margin-bottom: 5px; }
.hm-change { font-size: 14px; }
""")

# 2. Update dashboard.html
with open(dashboard_path, "r", encoding="utf-8") as f:
    dash_content = f.read()

heatmap_html = """
            <!-- 실시간 히트맵 -->
            <section class="heatmap-section">
                <div class="heatmap-header">
                    <span><i class="fa-solid fa-table-cells" style="color:#a855f7;"></i> [ RUN ] 실시간 히트맵 데이터 동기화 (M7)</span>
                    <button id="refresh-heatmap" class="btn-small"><i class="fa-solid fa-rotate-right"></i> 동기화</button>
                </div>
                <div id="heatmap-error" style="display:none; color: #ef4444; background: rgba(239,68,68,0.1); padding: 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid rgba(239,68,68,0.2);"></div>
                <div class="heatmap-grid" id="heatmap-container">
                    <div style="color:var(--text-muted); padding:20px; text-align:center; grid-column: 1 / -1;"><i class="fa-solid fa-spinner fa-spin"></i> 데이터를 불러오는 중입니다...</div>
                </div>
            </section>

            <!-- Asset Card exactly like the user's screenshot -->
"""
if "heatmap-section" not in dash_content:
    dash_content = dash_content.replace("            <!-- Asset Card exactly like the user's screenshot -->", heatmap_html)
    with open(dashboard_path, "w", encoding="utf-8") as f:
        f.write(dash_content)

# 3. Update main.py for /api/market/heatmap
with open(main_path, "r", encoding="utf-8") as f:
    main_content = f.read()

if "/api/market/heatmap" not in main_content:
    heatmap_api = """
@app.get("/api/market/heatmap")
def get_heatmap():
    tickers = ["AAPL", "MSFT", "NVDA", "GOOGL", "AMZN", "META", "TSLA"]
    results = []
    
    for ticker in tickers:
        try:
            # yf.download()의 세션 버그를 우회하기 위해 개별 Ticker.history() 사용
            t = yf.Ticker(ticker)
            hist = t.history(period="5d")
            if len(hist) >= 2:
                current_price = hist['Close'].iloc[-1]
                prev_price = hist['Close'].iloc[-2]
                change_pct = ((current_price - prev_price) / prev_price) * 100
                results.append({
                    "ticker": ticker,
                    "change_pct": round(change_pct, 2)
                })
        except Exception as e:
            continue
            
    if not results:
        return {"error": "Yahoo API requires curl_cffi session not <class 'requests.sessions.Session'>. Solution: stop setting session, let YF handle. (또는 YF 서버 일시 오류)"}
        
    return {"data": results}
"""
    with open(main_path, "a", encoding="utf-8") as f:
        f.write(heatmap_api)

# 4. Update script.js
with open(script_path, "r", encoding="utf-8") as f:
    script_content = f.read()

if "fetchHeatmap" not in script_content:
    js_hm = """
    // --- 히트맵 데이터 로직 ---
    async function fetchHeatmap() {
        const container = document.getElementById('heatmap-container');
        const errorBox = document.getElementById('heatmap-error');
        if (!container) return;

        try {
            errorBox.style.display = 'none';
            container.innerHTML = '<div style="color:var(--text-muted); padding:20px; text-align:center; grid-column: 1 / -1;"><i class="fa-solid fa-spinner fa-spin"></i> 데이터를 갱신 중입니다...</div>';
            
            const res = await fetch('http://localhost:8000/api/market/heatmap');
            const result = await res.json();

            if (result.error) {
                throw new Error(result.error);
            }

            container.innerHTML = '';
            
            // 색상 결정 로직 (한국식: 상승 빨강, 하락 파랑)
            // 변동폭이 클수록 색이 진해짐 (최대 5% 기준)
            result.data.forEach(item => {
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';
                
                let bgColor = 'rgba(255,255,255,0.05)'; 
                if (item.change_pct > 0) {
                    const intensity = Math.min(item.change_pct / 5, 1); 
                    bgColor = `rgba(239, 68, 68, ${0.3 + (intensity * 0.7)})`; // Red
                } else if (item.change_pct < 0) {
                    const intensity = Math.min(Math.abs(item.change_pct) / 5, 1);
                    bgColor = `rgba(59, 130, 246, ${0.3 + (intensity * 0.7)})`; // Blue
                }

                cell.style.background = bgColor;
                
                const sign = item.change_pct > 0 ? '+' : '';
                cell.innerHTML = `
                    <div class="hm-ticker">${item.ticker}</div>
                    <div class="hm-change">${sign}${item.change_pct}%</div>
                `;
                container.appendChild(cell);
            });
        } catch (err) {
            console.error('Heatmap error:', err);
            errorBox.style.display = 'block';
            errorBox.innerHTML = `<strong>오류 발생:</strong> ${err.message}`;
            container.innerHTML = '';
        }
    }

    if (document.getElementById('heatmap-container')) {
        fetchHeatmap();
        const refreshBtn = document.getElementById('refresh-heatmap');
        if (refreshBtn) refreshBtn.addEventListener('click', fetchHeatmap);
    }
"""
    script_content = script_content.replace("});", js_hm + "\n});")
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(script_content)

print("Heatmap Patch applied successfully.")
