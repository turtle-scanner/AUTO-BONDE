"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Globe, 
  Zap, 
  Clock, 
  RefreshCw, 
  BarChart3,
  Waves,
  BrainCircuit,
  Send
} from 'lucide-react';

export default function MarketIntelligenceUpgrade() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  // ?²ãƒ«?£ï¿½??????ï¿½ëˆ§?’ê³Œë­???ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼??  const indices = [
    { name: 'NASDAQ', value: '16,274.95', change: '+1.15%', isUp: true },
    { name: 'S&P 500', value: '5,123.41', change: '+0.85%', isUp: true },
    { name: 'KOSPI', value: '2,682.12', change: '-0.32%', isUp: false },
    { name: 'USD/KRW', value: '1,372.50', change: '+4.20', isUp: true },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/v6-api/market-news');
      const data = await res.json();
      setNews(data);
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchNews();
  };

  return (
    <div className="market-intel-container animate-fade-in">
      {/* Header */}
      <div className="intel-header">
        <div className="header-left">
          <h1 className="intel-title">
            <Activity className="title-icon" /> MARKET INTELLIGENCE
          </h1>
          <p className="intel-subtitle">???ï¦«ëš®?¥ï§¢ï¿????ç­Œë??£æ²…ï¿???²ê¾§?—ï¿½ë«???????????…ï¿½?¿ë—ª?¬ç­Œï¿??????ï¿½ë®„ï¿½ë€??????¨ëº£ë¹?ï¿½ì”ˆ?·ï¿½?????‰ï¿½???ï¿½ï¿½ï¿½ì”™ï¿½ë¤†??ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???ç­Œë¤¾?“ï¿½???</p>
        </div>
        <div className="header-right">
          <button className={`refresh-btn ${isRefreshing ? 'loading' : ''}`} onClick={handleRefresh}>
            <RefreshCw size={16} className={isRefreshing ? "rotating" : ""} /> REFRESH OPS
          </button>
        </div>
      </div>

      {/* Indices Ticker */}
      <div className="indices-grid">
        {indices.map((idx) => (
          <GlassCard key={idx.name} className="index-card">
            <div className="index-name">{idx.name}</div>
            <div className="index-value-group">
              <span className="index-value">{idx.value}</span>
              <span className={`index-change ${idx.isUp ? 'up' : 'down'}`}>
                {idx.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {idx.change}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="main-layout">
        {/* News Feed */}
        <div className="news-section">
          <div className="section-header">
            <h3><Zap size={18} /> LIVE INTEL FEED</h3>
          </div>
          
          <div className="news-list">
            {news.map((item) => (
              <div key={item.id} className="news-item">
                <div className="news-time">{item.time}</div>
                <div className="news-content-box">
                  <div className="news-meta">
                    <span className="news-source">{item.source}</span>
                    <span className={`news-impact ${item.impact.toLowerCase()}`}>{item.impact} IMPACT</span>
                    <span className="news-cat">[{item.category}]</span>
                  </div>
                  <div className="news-text">{item.title}</div>
                </div>
              </div>
            ))}
            {news.length === 0 && !isRefreshing && <p className="empty-msg">?ï¦«ëš®?æ´ï¿????ï¿½ï¿½?¤ë²šï¿½ëœ¤????ç­Œëš¯?œå ‰ï¿?????æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº????ï¿½ëœ„ï¿½ë ¡...</p>}
          </div>
        </div>

        {/* Market Breath & AI Briefing */}
        <div className="side-section">
          <GlassCard className="breath-card">
            <div className="card-header">
              <BarChart3 size={18} /> MARKET BREADTH
            </div>
            <div className="breath-meter">
              <div className="meter-track">
                <div className="meter-fill up" style={{ width: '62%' }}></div>
                <div className="meter-fill down" style={{ width: '38%' }}></div>
              </div>
              <div className="meter-labels">
                <span className="up-label">Advancers 62%</span>
                <span className="down-label">Decliners 38%</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="briefing-card">
            <div className="card-header">
              <Waves size={18} /> AI TACTICAL BRIEFING
            </div>
            <div className="briefing-text">
              "?ï¿½ë„­?¨ï½‹ì³????ç­Œë??£æ²…ï¿?? ??ç­Œëš¯?œï§¥ï¿??æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº????ï¿½ì”ˆ?·ë…»ë¦°ï¿½?ƒï¿½?€??²ãƒ«??¿½ëµ???ï¦«ï¿½? ??ï¿½êº‚ï¿½ï¿½?‹êµ¢???å¯ƒë—ï¿????æºë¹ê±?? ?????ï¿½êº‚ï¿½ï¿½ï¿½ï¿½?????ï¿½ë?ï§?ˆ???ï¿½ï¿½?¥ï¿½ï¿½í” ?ï¦«ëš®?æ´??µ³???¨ëš®ë¼????ï¿½ë†ï¿½ë ° ?ï¦«ï¿½?????ï¿½êº‚ï¿½ï¿½?‹ë¦°??ç­Œëš¯?œï¿½ï¿½ï¿½??ç­Œë??—ï¿½?? 2,680???²ãƒ«?£ï¿½???²ãƒ«?£ï¿½?? ????ï¿½ì”ˆï¿½ìˆ? ??å½±ï¿½ï¿½ë¿¢?¾ï¿½ ?æ½ëº›ê¹·ï§£ï¿???æ¿¡ã‚??????æ¿¡ã‚??????‰ï¿½???¨ëš®??????ï¿½ëœ„ï¿½ë ¡."
            </div>
            <div className="briefing-footer">
              COMMANDER'S DIRECTION: <span className="highlight">HOLD / ACCUMULATE</span>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Yuhani AI Command Console */}
      <GlassCard className="yuhani-console-card">
        <div className="console-header">
          <div className="title-group">
            <BrainCircuit size={20} className="gold" />
            <div className="title-info">
              <h3 className="gold">[ YUHANI AI ] TACTICAL COMMAND CONSOLE</h3>
              <p>?ï¦«ëš®?¥ï§¢?»ì¾®ï¿½ï¿½?ƒë•¡??‰ì˜¨ï¿????ï¿½êº‚ï¿½ë€–ï¿½ëµ????¨ì¢Šêµ????ç­Œë??£æ²…ï¿????ï¿½ë®„ï¿½ë€???????ï¿½ë„­?¨ï½‹ì³????æ¿¡ã‚‹ê»?ï¿½êº†ï¿½ë¤…?????«ë”…??ï¿½ë§¦???ï¿½ï¿½?¤ë˜»ï¿½ë£µ??</p>
            </div>
          </div>
          <div className="status-dot"></div>
        </div>
        
        <div className="console-interface">
          <div className="chat-window">
            <div className="msg system">CONNECTED TO STOCKDRAGONFLY CORE...</div>
            <div className="msg bot">??ï¿½ëŒ–?¨ï¿½?ï¿½ë•»??? ????¨ëº£ë¹???ï¦«ëš®?æ´ï¿????ï¿½ï¿½?¤ë²šï¿½ëœ¤ ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???ï¿½ë„­?¨ï½‹ì³???ç­Œï¿½????ï¿½ëœ®?? ??????ï¦«ëš®?¡ï¿½ë§Šäº¦?…ì‰ ï§Œï¿½?ï¿½ëŸ¾ï¿½ï¿½ ?ï¿½ë„­?¨ï½‹ì³???ç­Œëš¯?œï¿½ï¿½ï¿½???ï¿½ëŠ¾ï§Œï¿½?</div>
          </div>
          <div className="input-group">
            <input type="text" placeholder="???ï¿½ë®„ï¿½ë€??ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½?????‰ë¨¯???????’ï¿½???ç­Œë??£æ²…ï¿??ï¿½ë„­?¨ï½‹ì³? ?²ãƒ«?£ï¿½??è¢ï½‹ì¦?.." className="console-input" />
            <button className="send-btn"><Send size={18} /></button>
          </div>
        </div>
      </GlassCard>

      <style jsx>{`
        .market-intel-container { padding: 30px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .intel-header { display: flex; justify-content: space-between; align-items: center; }
        .intel-title { font-size: 1.8rem; font-weight: 900; display: flex; align-items: center; gap: 12px; letter-spacing: -1px; }
        .title-icon { color: var(--gold-400); }
        .intel-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .refresh-btn { background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); color: var(--gold-400); padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .indices-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .index-card { padding: 16px 20px; }
        .index-name { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); margin-bottom: 8px; }
        .index-value-group { display: flex; justify-content: space-between; align-items: baseline; }
        .index-value { font-size: 1.2rem; font-weight: 900; }
        .index-change { font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .index-change.up { color: #10b981; }
        .index-change.down { color: #ef4444; }

        .main-layout { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
        .section-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }

        .news-list { display: flex; flex-direction: column; gap: 20px; }
        .news-item { display: flex; gap: 15px; }
        .news-time { font-size: 0.8rem; font-weight: 900; color: var(--gold-400); width: 45px; margin-top: 4px; }
        
        .news-content-box { flex: 1; padding: 16px; background: rgba(255, 255, 255, 0.03); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05); }
        .news-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .news-source { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); }
        .news-impact { font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 4px; }
        .news-impact.high { background: rgba(255, 0, 85, 0.1); color: #ff0055; }
        .news-impact.med { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
        .news-cat { font-size: 0.6rem; font-weight: 900; color: var(--gold-400); }
        .news-text { font-size: 1rem; font-weight: 700; line-height: 1.4; color: rgba(255, 255, 255, 0.9); }

        .side-section { display: flex; flex-direction: column; gap: 30px; }
        .card-header { font-size: 0.85rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; color: var(--gold-400); }
        .breath-card, .briefing-card { padding: 24px; }
        
        .meter-track { height: 10px; background: #333; border-radius: 5px; display: flex; overflow: hidden; margin-bottom: 12px; }
        .meter-fill.up { background: #10b981; }
        .meter-fill.down { background: #ef4444; }
        .meter-labels { display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 700; color: var(--text-muted); }

        .briefing-text { font-size: 0.9rem; line-height: 1.6; color: var(--text-muted); font-weight: 600; margin-bottom: 20px; }
        .briefing-footer { font-size: 0.75rem; font-weight: 900; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; }
        .highlight { color: var(--gold-400); }

        .yuhani-console-card { padding: 24px; }
        .console-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .title-group { display: flex; gap: 14px; }
        .title-info h3 { font-size: 0.9rem; font-weight: 900; }
        .title-info p { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
        .status-dot { width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; animation: pulse 2s infinite; }

        .console-interface { display: flex; flex-direction: column; gap: 20px; }
        .chat-window { background: rgba(0,0,0,0.3); border-radius: 10px; padding: 15px; height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
        .msg { font-size: 0.85rem; font-weight: 700; line-height: 1.5; padding: 8px 12px; border-radius: 8px; }
        .msg.system { color: #64748b; font-size: 0.7rem; text-align: center; }
        .msg.bot { background: rgba(212, 175, 55, 0.05); color: #e2e8f0; border-left: 3px solid var(--gold-400); align-self: flex-start; max-width: 80%; }

        .input-group { display: flex; gap: 10px; }
        .console-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px; color: white; outline: none; font-size: 0.9rem; font-weight: 700; }
        .console-input:focus { border-color: var(--gold-400); }
        .send-btn { background: var(--gold-400); color: black; border: none; padding: 0 20px; border-radius: 8px; cursor: pointer; transition: transform 0.2s; }
        .send-btn:hover { transform: scale(1.05); }

        .gold { color: var(--gold-400); }
        .rotating { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .loading { opacity: 0.5; pointer-events: none; }
      `}</style>
    </div>
  );
}
