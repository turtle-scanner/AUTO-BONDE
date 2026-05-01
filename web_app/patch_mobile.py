import os

base_dir = r"g:\내 드라이브\ANTI GRAVITY\자동매매설정\web_app"
style_path = os.path.join(base_dir, "style.css")

mobile_css = """
/* --- Mobile Responsive UI (핸드폰/모바일 최적화) --- */
@media (max-width: 768px) {
    body { padding: 10px; font-size: 14px; }
    .container, .dashboard-container, .exam-container { padding: 15px; margin: 10px auto; width: 100%; border-radius: 12px; }
    
    .dashboard-header { flex-direction: column; text-align: center; gap: 10px; }
    .header-info { justify-content: center; flex-wrap: wrap; }
    
    .market-indices { justify-content: center; gap: 10px; }
    .index-card { width: 45%; flex-grow: 1; padding: 10px; }
    .index-price { font-size: 18px; }
    
    .heatmap-grid { grid-template-columns: repeat(3, 1fr); gap: 5px; }
    .heatmap-cell { min-height: 80px; padding: 10px; }
    .hm-ticker { font-size: 14px; }
    .hm-change { font-size: 12px; }
    
    .asset-card, .trading-card, .admin-card { padding: 15px; }
    .balance-info { font-size: 24px; }
    .profit-loss { font-size: 14px; }
    
    .chat-section, .study-section { max-width: 100%; margin-top: 15px; }
    .chat-header { font-size: 16px; padding: 12px; }
    .msg-row { max-width: 95%; }
    
    .timer-box { font-size: 16px; padding: 8px 15px; right: 10px; top: 10px; }
    .question-card { padding: 15px; }
    .question-text { font-size: 16px; }
    
    .btn-primary, .btn-secondary, .btn-outline { width: 100%; margin-bottom: 5px; padding: 12px; }
    
    #intro-form div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
}

@media (max-width: 480px) {
    .index-card { width: 100%; }
    .heatmap-grid { grid-template-columns: repeat(2, 1fr); }
}
"""

with open(style_path, "r", encoding="utf-8") as f:
    current_css = f.read()

if "Mobile Responsive UI" not in current_css:
    with open(style_path, "a", encoding="utf-8") as f:
        f.write(mobile_css)

# Rename run_server.bat to DRAGONFLY.bat
old_bat = os.path.join(base_dir, "run_server.bat")
new_bat = os.path.join(base_dir, "DRAGONFLY.bat")

if os.path.exists(old_bat):
    if os.path.exists(new_bat):
        os.remove(new_bat) # remove existing if any to avoid conflict
    os.rename(old_bat, new_bat)
elif not os.path.exists(new_bat):
    # Create it if neither exists
    with open(new_bat, "w", encoding="utf-8") as f:
        f.write("@echo off\\ncolor 0A\\ntitle ANTI GRAVITY DRAGONFLY SERVER\\necho Installing required packages for backend...\\npip install fastapi uvicorn pydantic yfinance pytz passlib\\npython database.py\\necho Starting backend...\\nuvicorn main:app --reload --host 0.0.0.0 --port 8000\\npause")

print("Mobile UI patch applied and executable renamed to DRAGONFLY.bat")
