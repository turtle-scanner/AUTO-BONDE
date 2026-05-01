document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Auth Page Logic (Login & Signup) ---
    const loginBox = document.querySelector('.login');
    const signupBox = document.querySelector('.signup');
    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (goToSignup && goToLogin) {
        goToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginBox.classList.add('hidden');
            signupBox.classList.remove('hidden');
        });

        goToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupBox.classList.add('hidden');
            loginBox.classList.remove('hidden');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const inputs = loginForm.querySelectorAll('input');
            const username = inputs[0].value;
            const password = inputs[1].value;
            const btn = loginForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = '인증 중...';
            try {
                const res = await fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email: username, password })
                });
                const data = await res.json();
                
                if (res.ok) {
                    alert(data.message || '로그인 성공!');
                    window.location.href = 'dashboard.html';
                } else {
                    const errorMsg = typeof data.detail === 'object' ? JSON.stringify(data.detail) : (data.detail || '로그인 실패');
                    alert(errorMsg);
                }
            } catch (err) {
                alert('서버와 통신할 수 없습니다.');
            } finally {
                btn.textContent = originalText;
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const inputs = signupForm.querySelectorAll('input');
            const username = inputs[0].value;
            const email = inputs[1].value;
            const password = inputs[2].value;
            const passwordConfirm = inputs[3].value;
            
            if (password !== passwordConfirm) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }
            
            const btn = signupForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = '가입 중...';
            
            try {
                const res = await fetch('http://localhost:8000/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });
                const data = await res.json();
                
                if (res.ok) {
                    alert('가입이 완료되었습니다! 사령부 정예 요원 입성을 위한 자격 시험 페이지로 이동합니다.');
                    window.location.href = 'exam.html';
                } else {
                    const errorMsg = typeof data.detail === 'object' ? JSON.stringify(data.detail) : (data.detail || '가입 실패');
                    alert(errorMsg);
                }
            } catch (err) {
                alert('서버와 통신할 수 없습니다.');
            } finally {
                btn.textContent = originalText;
            }
        });
    }

    // --- 2. 실시간 마켓 지수 연동 ---
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

    // --- 3. 카카오톡 스타일 대화방 로직 ---
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
                            <div class="msg-sender"><span class="badge role-master" style="font-size:10px;padding:2px 6px;">고수등급</span> D-Bot</div>
                            <div class="msg-bubble">"${text}" 라고 하셨군요! 봇 응답입니다 😊</div>
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

    // --- 4. 주식 공부방 차트 로직 ---
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

    // --- 5. 히트맵 데이터 로직 ---
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
            
            result.data.forEach(item => {
                const cell = document.createElement('div');
                cell.className = 'heatmap-cell';
                
                let bgColor = 'rgba(255,255,255,0.05)'; 
                if (item.change_pct > 0) {
                    const intensity = Math.min(item.change_pct / 5, 1); 
                    bgColor = `rgba(239, 68, 68, ${0.3 + (intensity * 0.7)})`;
                } else if (item.change_pct < 0) {
                    const intensity = Math.min(Math.abs(item.change_pct) / 5, 1);
                    bgColor = `rgba(59, 130, 246, ${0.3 + (intensity * 0.7)})`;
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
    // --- 6. 사령부 전술 배너 클릭 로직 ---
    const banners = document.querySelectorAll('.banner-item');
    banners.forEach((banner, index) => {
        banner.addEventListener('click', () => {
            const num = (index + 1).toString().padStart(2, '0');
            const title = banner.querySelector('.title').textContent;
            
            if (num === '02') {
                const chatSec = document.querySelector('.chat-section');
                if (chatSec) chatSec.scrollIntoView({ behavior: 'smooth' });
                return;
            }
            
            alert(`[ 사령부 전술 ${num}번: ${title} ]\n\n현재 해당 모듈의 전술 데이터 동기화 및 퀀트 엔진을 최적화 중입니다. 곧 실전 배치가 완료됩니다! 🚀`);
        });
    });
});