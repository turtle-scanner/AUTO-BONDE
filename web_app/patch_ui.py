import os

base_dir = r"g:\내 드라이브\ANTI GRAVITY\자동매매설정\web_app"
style_path = os.path.join(base_dir, "style.css")
dashboard_path = os.path.join(base_dir, "dashboard.html")
script_path = os.path.join(base_dir, "script.js")

# Append CSS
with open(style_path, "a", encoding="utf-8") as f:
    f.write("""
/* Market Indices */
.market-indices { display: flex; gap: 15px; margin-bottom: 30px; flex-wrap: wrap; }
.index-card { background: rgba(15, 15, 20, 0.9); border: 1px solid rgba(255, 255, 255, 0.05); border-top: 3px solid #ef4444; border-radius: 12px; padding: 15px; width: 180px; box-shadow: 0 10px 20px rgba(0,0,0,0.3); transition: transform 0.2s, border-color 0.3s; }
.index-card:hover { transform: translateY(-5px); }
.index-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.index-name { font-weight: 800; font-size: 14px; color: #ef4444; }
.index-time { font-size: 10px; color: rgba(255, 255, 255, 0.3); }
.index-price { font-size: 24px; font-weight: 800; margin-bottom: 5px; }
.index-change { font-size: 14px; font-weight: 800; }
.index-change.up { color: #ef4444; }
.index-card.up-card { border-top-color: #ef4444; }
.index-card.up-card .index-name { color: #ef4444; }
.index-change.down { color: #3b82f6; }
.index-card.down-card { border-top-color: #3b82f6; }
.index-card.down-card .index-name { color: #3b82f6; }

/* Kakaotalk Style Chat UI */
.chat-section { background: #1e1e24; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); width: 100%; max-width: 800px; margin-top: 30px; display: flex; flex-direction: column; height: 500px; box-shadow: 0 15px 35px rgba(0,0,0,0.4); }
.chat-header { padding: 15px 20px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 800; color: #fef01b; display: flex; align-items: center; gap: 10px; }
.chat-messages { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; }
.msg-row { display: flex; gap: 10px; max-width: 80%; }
.msg-row.me { align-self: flex-end; flex-direction: row-reverse; }
.msg-row.other { align-self: flex-start; }
.msg-profile { width: 40px; height: 40px; border-radius: 40%; background: #3b82f6; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 14px; flex-shrink: 0; color: white; }
.msg-row.me .msg-profile { display: none; }
.msg-info { display: flex; flex-direction: column; }
.msg-row.me .msg-info { align-items: flex-end; }
.msg-sender { font-size: 12px; color: #94a3b8; margin-bottom: 4px; display: flex; align-items: center; gap: 5px; }
.msg-bubble { padding: 10px 15px; border-radius: 12px; font-size: 14px; line-height: 1.4; word-break: break-all; position: relative; }
.msg-row.other .msg-bubble { background: #2b2b36; color: white; border-top-left-radius: 2px; }
.msg-row.me .msg-bubble { background: #fef01b; color: #333; border-top-right-radius: 2px; font-weight: 600; }
.chat-input-area { padding: 15px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 10px; }
.chat-input-area input { flex: 1; padding: 12px 15px; border-radius: 20px; border: none; background: rgba(255,255,255,0.05); color: white; outline: none; }
.chat-input-area input:focus { background: rgba(255,255,255,0.1); }
.chat-input-area button { background: #fef01b; color: #333; border: none; border-radius: 20px; padding: 0 20px; font-weight: 800; cursor: pointer; transition: 0.2s; }
.chat-input-area button:hover { background: #e5d818; }
""")

# Update dashboard.html
with open(dashboard_path, "r", encoding="utf-8") as f:
    dash_content = f.read()

if "<!-- 소통 대화방 (카카오톡 스타일) -->" not in dash_content:
    chat_html = """
            <!-- 소통 대화방 (카카오톡 스타일) -->
            <section class="chat-section">
                <div class="chat-header">
                    <i class="fa-solid fa-comments"></i> 안티그래비티 대화방 (HQ Free Talk)
                </div>
                <div class="chat-messages" id="chat-messages">
                    <div class="msg-row other">
                        <div class="msg-profile" style="background:#ef4444;">A</div>
                        <div class="msg-info">
                            <div class="msg-sender"><span class="badge role-admin" style="font-size:10px;padding:2px 6px;">관리자</span> Mint Soft</div>
                            <div class="msg-bubble">비트코인 흐름이 주식시장에도 영향을 주고 있습니다. 다들 주목해주세요.</div>
                        </div>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="자유롭게 대화에 참여하세요. (Enter로 전송)">
                    <button id="chat-send">[ EXEC ] 전송</button>
                </div>
            </section>
        </main>
"""
    dash_content = dash_content.replace("        </main>", chat_html)
    with open(dashboard_path, "w", encoding="utf-8") as f:
        f.write(dash_content)

# Update script.js
with open(script_path, "r", encoding="utf-8") as f:
    script_content = f.read()

if "fetchMarketData" not in script_content:
    js_additions = """
    // --- 실시간 마켓 지수 연동 ---
    async function fetchMarketData() {
        try {
            const res = await fetch('http://localhost:8000/api/market/indices');
            const data = await res.json();
            
            const mapping = {
                'DOW': { id: 'card-dow', key: 'dow' },
                'S&P500': { id: 'card-sp500', key: 'sp500' },
                'NASDAQ': { id: 'card-nasdaq', key: 'nasdaq' },
                'KOSPI': { id: 'card-kospi', key: 'kospi' },
                'KOSDAQ': { id: 'card-kosdaq', key: 'kosdaq' }
            };

            for (const [displayName, info] of Object.entries(mapping)) {
                const card = document.getElementById(info.id);
                if (!card) continue;
                const marketInfo = data[info.key];
                if (!marketInfo) continue;

                card.querySelector('.index-time').textContent = marketInfo.time;
                card.querySelector('.index-price').textContent = marketInfo.price;
                
                const changeEl = card.querySelector('.index-change');
                const sign = marketInfo.is_up ? '▲' : '▼';
                const signStr = marketInfo.change_pct > 0 ? '+' : '';
                changeEl.textContent = `${sign} ${signStr}${marketInfo.change_pct}%`;

                // 한국식 컬러: 상승=빨간색(up), 하락=파란색(down)
                if (marketInfo.is_up) {
                    changeEl.className = 'index-change up';
                    card.className = 'index-card up-card';
                } else {
                    changeEl.className = 'index-change down';
                    card.className = 'index-card down-card';
                }
            }
        } catch (err) {
            console.error('Market data fetch error', err);
        }
    }

    if (document.querySelector('.market-indices')) {
        fetchMarketData();
        setInterval(fetchMarketData, 60000);
    }

    // --- 카카오톡 스타일 대화방 로직 ---
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    if (chatInput && chatSend) {
        function sendMessage() {
            const text = chatInput.value.trim();
            if (!text) return;

            const msgHtml = `
                <div class="msg-row me">
                    <div class="msg-info">
                        <div class="msg-bubble">${text}</div>
                    </div>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', msgHtml);
            chatInput.value = '';
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            setTimeout(() => {
                const botHtml = `
                    <div class="msg-row other">
                        <div class="msg-profile" style="background:#a855f7;">G</div>
                        <div class="msg-info">
                            <div class="msg-sender"><span class="badge role-master" style="font-size:10px;padding:2px 6px;">고수등급</span> G-Bot</div>
                            <div class="msg-bubble">"${text}" 라고 하셨군요! 현재 디자인을 보여주기 위한 봇 응답입니다 😊</div>
                        </div>
                    </div>
                `;
                chatMessages.insertAdjacentHTML('beforeend', botHtml);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
"""
    script_content = script_content.replace("});", js_additions + "\n});")
    with open(script_path, "w", encoding="utf-8") as f:
        f.write(script_content)

print("Patch applied successfully.")
