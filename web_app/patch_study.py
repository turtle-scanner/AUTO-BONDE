import os

base_dir = r"g:\내 드라이브\ANTI GRAVITY\자동매매설정\web_app"
dashboard_path = os.path.join(base_dir, "dashboard.html")
script_path = os.path.join(base_dir, "script.js")
main_path = os.path.join(base_dir, "main.py")

# 1. Update dashboard.html
with open(dashboard_path, "r", encoding="utf-8") as f:
    dash_content = f.read()

# Add Lightweight Charts script to head
if "lightweight-charts" not in dash_content:
    dash_content = dash_content.replace("</head>", '    <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>\n</head>')

# Add Study Section before chat-section
study_html = """
            <!-- 주식 공부방 (차트 & 이론) -->
            <section class="study-section" style="margin-top: 30px; width: 100%; max-width: 800px; margin-bottom: 30px;">
                <div class="chat-header" style="color: #fef01b; font-size: 20px; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                    <i class="fa-solid fa-layer-group" style="color: #6366f1;"></i> [ STUDY ] 주식공부방 (차트 & 이론)
                </div>
                <div class="study-content" style="padding: 25px; background: rgba(10,10,15,0.8); border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
                    <p style="color: var(--text-main); font-weight: 600; margin-bottom: 25px;">본데의 철학과 매매 기법을 매일 점검하는 훈련소입니다.</p>
                    
                    <h3 style="margin-bottom: 15px; color: white; display:flex; justify-content:space-between; align-items:center;">
                        <span>📈 실제 차트 돌파(Breakout) 학습</span>
                        <span id="study-ticker" style="color: #ef4444; background:rgba(239,68,68,0.1); padding:4px 12px; border-radius:20px; font-size:14px; font-weight: 800;">NVDA 실시간 연동</span>
                    </h3>
                    <div id="study-chart" style="width: 100%; height: 400px; margin-bottom: 20px; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background: #131722;"></div>
                    <div id="study-desc" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
                        <strong><i class="fa-solid fa-lightbulb" style="color:#fef01b;"></i> 브레이크 아웃(돌파)란?</strong><br>
                        특정 저항선(노란 점선)을 강한 매수세와 함께 뚫고 올라가는 핵심 패턴입니다. 백엔드에서 <b>NVDA(엔비디아)</b>의 최근 6개월 차트를 분석하여 주요 저항선과 돌파 지점을 자동으로 마킹했습니다.
                    </div>

                    <hr style="border: 0; border-top: 1px dashed rgba(255,255,255,0.1); margin: 30px 0;">
                    
                    <h3 style="margin-bottom: 20px; color: white; display:flex; align-items:center; gap:10px;">
                        <i class="fa-solid fa-file-pen" style="color: #a855f7;"></i> 2026-05-01 오늘의 주식 모의고사 (10제)
                    </h3>
                    
                    <div class="quiz-box" style="background: rgba(255,255,255,0.02); padding: 25px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
                        <p style="font-weight: 800; margin-bottom: 15px; font-size: 16px;">Q1. 본데가 말하는 절대 손절 라인은 몇 퍼센트인가?</p>
                        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px; color: var(--text-muted);">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q1" checked style="accent-color: #ef4444; width:16px; height:16px;"> -3% 이내</label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q1" style="accent-color: #ef4444; width:16px; height:16px;"> -5%</label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q1" style="accent-color: #ef4444; width:16px; height:16px;"> -10%</label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q1" style="accent-color: #ef4444; width:16px; height:16px;"> 버틴다</label>
                        </div>

                        <p style="font-weight: 800; margin-bottom: 15px; font-size: 16px;">Q2. 마크 미너비니의 핵심 트레이딩 전략 이름은?</p>
                        <div style="display: flex; flex-direction: column; gap: 12px; color: var(--text-muted);">
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q2" style="accent-color: #ef4444; width:16px; height:16px;"> CAN SLIM</label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q2" checked style="accent-color: #ef4444; width:16px; height:16px;"> SEPA</label>
                            <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.2s;"><input type="radio" name="q2" style="accent-color: #ef4444; width:16px; height:16px;"> MACD</label>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 소통 대화방 -->
"""
if "<!-- 주식 공부방" not in dash_content:
    dash_content = dash_content.replace("<!-- 소통 대화방 (카카오톡 스타일) -->", study_html.replace("<!-- 소통 대화방 -->", "<!-- 소통 대화방 (카카오톡 스타일) -->"))
    with open(dashboard_path, "w", encoding="utf-8") as f:
        f.write(dash_content)

# 2. Update main.py with /api/study/chart endpoint
with open(main_path, "r", encoding="utf-8") as f:
    main_content = f.read()

if "/api/study/chart" not in main_content:
    study_api = """
@app.get("/api/study/chart")
def get_study_chart(ticker: str = "NVDA"):
    try:
        t = yf.Ticker(ticker)
        hist = t.history(period="6mo")
        data = []
        for index, row in hist.iterrows():
            data.append({
                "time": index.strftime('%Y-%m-%d'),
                "open": round(row['Open'], 2),
                "high": round(row['High'], 2),
                "low": round(row['Low'], 2),
                "close": round(row['Close'], 2)
            })
            
        if not data:
            raise Exception("No data found")
            
        # 간단한 브레이크 아웃 저항선 로직 (최근 6개월 고점 대비 약간 아래를 돌파선으로 지정)
        max_high = hist['High'].max()
        breakout_price = round(max_high * 0.95, 2)
        
        return {
            "ticker": ticker,
            "data": data,
            "breakout_price": breakout_price
        }
    except Exception as e:
        return {"error": str(e)}
"""
    with open(main_path, "a", encoding="utf-8") as f:
        f.write(study_api)

# 3. Update script.js with initStudyChart
with open(script_path, "r", encoding="utf-8") as f:
    script_content = f.read()

if "initStudyChart" not in script_content:
    study_js = """
    // --- 주식 공부방 차트 로직 ---
    async function initStudyChart() {
        const chartContainer = document.getElementById('study-chart');
        if (!chartContainer) return;

        try {
            const res = await fetch('http://localhost:8000/api/study/chart?ticker=NVDA');
            const result = await res.json();
            
            if (result.error) throw new Error(result.error);

            const chart = LightweightCharts.createChart(chartContainer, {
                width: chartContainer.clientWidth,
                height: 400,
                layout: {
                    background: { type: 'solid', color: 'rgba(0,0,0,0)' },
                    textColor: '#9ca3af',
                },
                grid: {
                    vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
                    horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
                },
                crosshair: { mode: LightweightCharts.CrosshairMode.Normal },
                rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
                timeScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
            });

            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#ef4444', 
                downColor: '#3b82f6', 
                borderVisible: false,
                wickUpColor: '#ef4444',
                wickDownColor: '#3b82f6',
            });

            candlestickSeries.setData(result.data);

            const priceLine = {
                price: result.breakout_price,
                color: '#fef01b', 
                lineWidth: 2,
                lineStyle: LightweightCharts.LineStyle.Dashed,
                axisLabelVisible: true,
                title: 'Breakout 저항선',
            };
            candlestickSeries.createPriceLine(priceLine);

            const markers = [];
            result.data.forEach(d => {
                if (d.close > result.breakout_price && d.open <= result.breakout_price) {
                    markers.push({
                        time: d.time,
                        position: 'aboveBar',
                        color: '#fef01b',
                        shape: 'arrowDown',
                        text: '돌파!',
                    });
                }
            });
            candlestickSeries.setMarkers(markers);
            
            window.addEventListener('resize', () => {
                chart.applyOptions({ width: chartContainer.clientWidth });
            });

        } catch (err) {
            console.error('Study chart error:', err);
            chartContainer.innerHTML = `<p style="color:#ef4444; padding: 20px;">차트 데이터를 불러오지 못했습니다. FastAPI 백엔드가 켜져있는지 확인하세요.</p>`;
        }
    }
    
    if (document.getElementById('study-chart')) {
        initStudyChart();
    }
"""
    script_content = script_content.replace("});", study_js + "\n});")
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(script_content)

print("Study Patch applied successfully.")
