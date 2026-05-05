"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Gauge, 
  Info, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShieldCheck, 
  Zap, 
  BrainCircuit,
  MessageSquare,
  Newspaper,
  History,
  Send,
  Terminal as TerminalIcon,
  Search,
  Thermometer
} from 'lucide-react';

export default function MarketSentimentUpgrade() {
  const sentimentValue = 68; // Greed level
  const confidence = 92; // AI Confidence level

  const sourceSentiments = [
    { icon: <Newspaper size={14} />, name: 'Institutional News', val: 72, label: 'Optimistic' },
    { icon: <Users size={14} />, name: 'Retail Communities', val: 54, label: 'Cautious' },
    { icon: <MessageSquare size={14} />, name: 'Social Media', val: 78, label: 'High Hype' },
    { icon: <BrainCircuit size={14} />, name: 'AI Macro Analysis', val: 65, label: 'Moderate' },
  ];

  return (
    <div className="sentiment-upgrade-container animate-fade-in">
      {/* Header */}
      <div className="sentiment-header">
        <div className="header-left">
          <h1 className="sentiment-title">
            <Gauge className="title-icon" /> PSYCHOLOGICAL RADAR
          </h1>
          <p className="sentiment-subtitle">??ï¿½ìŠ§ï¿½ï¿½ç¯€?¹ë€?????ï¿½ï¿½ï¿?ï¿½ê±«??ï¦«ï¿½? ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???ç­Œëš¯??‚‰ï¿???ç­Œë??£æ²…ï¿????¨ëš®ë¼???è²«çŒ·ï¿?????ï¿½ë¤†??ç­Œë¤¾?“ï¿½???</p>
        </div>
        <div className="confidence-badge">
          <BrainCircuit size={14} /> AI CONFIDENCE: {confidence}%
        </div>
      </div>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Left: Huge Gauge */}
        <GlassCard className="gauge-card">
          <div className="gauge-header">
            <h3>FEAR & GREED INDEX</h3>
            <span className="status-badge greed">GREED</span>
          </div>
          <div className="gauge-visual">
            <svg viewBox="0 0 200 120" className="gauge-svg">
              <path 
                d="M20 100 A 80 80 0 0 1 180 100" 
                fill="none" 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="12" 
                strokeLinecap="round" 
              />
              <path 
                d="M20 100 A 80 80 0 0 1 180 100" 
                fill="none" 
                stroke="url(#gaugeGradient)" 
                strokeWidth="12" 
                strokeLinecap="round" 
                strokeDasharray="251.3" 
                strokeDashoffset={251.3 - (251.3 * sentimentValue / 100)}
                className="gauge-progress"
              />
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="30%" stopColor="#0ea5e9" />
                  <stop offset="70%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#ff0055" />
                </linearGradient>
              </defs>
            </svg>
            <div className="gauge-info">
              <span className="val">{sentimentValue}</span>
              <span className="unit">POINTS</span>
            </div>
          </div>
          <div className="gauge-footer">
            <div className="extreme-label">EXTREME FEAR</div>
            <div className="extreme-label">EXTREME GREED</div>
          </div>
        </GlassCard>

        {/* Right: Source Analysis */}
        <div className="sources-section">
          <h3 className="section-title"><Zap size={16} /> MULTI-SOURCE ANALYSIS</h3>
          <div className="sources-list">
            {sourceSentiments.map((s) => (
              <GlassCard key={s.name} className="source-item">
                <div className="source-info">
                  <div className="source-icon">{s.icon}</div>
                  <div className="source-name-box">
                    <div className="source-name">{s.name}</div>
                    <div className="source-label">{s.label}</div>
                  </div>
                </div>
                <div className="source-val-box">
                  <div className="source-progress">
                    <div className="progress-fill" style={{ width: `${s.val}%` }}></div>
                  </div>
                  <span className="source-pct">{s.val}%</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Advice */}
      <GlassCard className="tactical-advice-card">
        <div className="advice-header">
          <ShieldCheck size={20} /> TACTICAL COMMAND DIRECTION
        </div>
        <div className="advice-grid">
          <div className="advice-text">
            "?ï¿½ë„­?¨ï½‹ì³???ï¿½êºï¿½ì????ºê³—ï¿½ï¿½ï¿½ë»¿?æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº??????????å½±ï¿½ï¿½ì“¨ï¿½ï¿½?¥â™‚?±ì?? ?²ãƒ«?£ï¿½?????ï¿½ë??¾ï¿½?????æºë¹ê±?? ?ï¿½ì”ˆ?·ë‰“ì§????????ï¿½ë¤ƒ??????????????ï¿½êº‚ï¿½ï¿½ï¿????ï¦«ëš®?ï¿½ë«’ï¿½êµ???ï¿½ëœ„ï¿½ë ¡. ?????????ï¿½ë«‚ï¿½ë£±?????<strong>?²ê¾§?—ï¿½ë«??????‰ëš°ï¿½ï¿½???????ï¿½ë¼¨??/strong>???ï¿½ì”ˆï¿½ìˆ???ï¿½ë®‚ï¿½ë¹????ç­Œï¿½?ï¿½ï¿½ï¿??ç­Œë¤¾?“ï¿½???"
          </div>
          <div className="advice-action">
            <span className="action-label">REACTION</span>
            <span className="action-val">AGGRESSIVE HOLD</span>
          </div>
        </div>
      </GlassCard>

      {/* AI COMMANDER SECTION */}
      <div className="commander-section-title">
        <BrainCircuit size={24} className="gold" /> [ AI COMMANDER V6.0 ] - NEXT GEN INTELLIGENCE
      </div>

      <div className="commander-grid">
        {/* 1. Global News Sentiment Gauge */}
        <GlassCard className="commander-card">
          <div className="card-header-v2">
            <Thermometer size={18} className="gold" /> GLOBAL NEWS TEMP (0-100)
          </div>
          <div className="temp-visual">
            <div className="temp-bar-bg">
              <div className="temp-bar-fill" style={{ width: '82%' }}></div>
              <div className="temp-marker" style={{ left: '82%' }}></div>
            </div>
            <div className="temp-labels">
              <span>0 (ICE COLD)</span>
              <span className="current-temp">82 (HOT)</span>
              <span>100 (BOILING)</span>
            </div>
          </div>
          <p className="card-desc">?æ£ºï¿½ë£±ç’ï¿??? ???¨ï¿½?æ«»ë—«ë´¿ç‘—ê¸ºëµ³?¨ê¾©ìª?è¹‚ï¿½ï¿½ì‡ ??SNS ????¨ëº£ë¹???ï¦«ëš®?ï¿½????? Gemini?ï¿½ì”ˆï¿½ìˆ? ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½?????ç­Œë??£æ²…ï¿?????ï¿½ë??¾ï¿½???ï¿½êµï¿½ë²??</p>
        </GlassCard>

        {/* 2. AI Strategy Feedback */}
        <GlassCard className="commander-card">
          <div className="card-header-v2">
            <History size={18} className="gold" /> AI STRATEGY FEEDBACK
          </div>
          <div className="feedback-content">
            <div className="feedback-item">
              <div className="feedback-tag">[ MISSION #142 RECAP ]</div>
              <p className="feedback-msg">"?????NVDA ?²ãƒ«??¿½ëµ????VCP ???????ï¿½ëª´æ´¹ï¼¢ï¿????????ï¿½ë?åª›ì•²????????‰ëš°ï¿½ï¿½?ï¿½ï¿½?“ë¨??²ãƒ«?£ï¿½???????¨ï¿½????ï¿½ëœ„ï¿½ë ¡. ???æºë‚†?????’ï¿½???¨ëš®ë¼????ï¿½ë†ï¿½ë °??2% ???¬ê³£ë«€ï¿½ë´¼??æ¿šìšŒê¼¬é‡‰ë¨?³®???ç­Œë¨²??§¥ï¿??æ¿¡ã‚?????ï¦«ëš®Ä²ï¿½ê± ï¿½ï¿½ï¿??ç­Œëš¯?œï¿½ï¿½ï¿½??ç­Œë??—ï¿½??"</p>
            </div>
          </div>
        </GlassCard>

        {/* 3. Interactive Command Center */}
        <GlassCard className="commander-card full-width">
          <div className="card-header-v2">
            <TerminalIcon size={18} className="gold" /> YUHANI COMMAND CONSOLE
          </div>
          <div className="chat-interface">
            <div className="chat-messages">
              <div className="msg bot">??ï¿½ëŒ–?¨ï¿½?ï¿½ë•»??? ?²ãƒ«??¿½?–ï¿½ë¤ƒï¿½ë¹???????æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº????ï¿½ëœ„ï¿½ë ¡. (?? "??ç­Œëš¯?œï§¥ï¿??RS 90 ??ï¿½ï¿½?¤ï¿½ï¿½å½›ï¿???¨ëš®??ï¿½ê¶˜?´ï¿½?ï¿½ëœ®?)</div>
              <div className="msg user">??ï¿½êº‚ï¿½ë€–ï¿½ëµ?? ?ï¿½ë„­?¨ï½‹ì³????ç­Œëš¯?œï§¥ï¿???ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»?æ¿šï¿½?RS 90 ??ï¿½ï¿½?¤ï¿½ï¿½å½›?™â”¼???è²???è¢â‘¤ì¶?</div>
              <div className="msg bot success">?²ãƒ«??¿½?–ï¿½ë¤ƒï¿½ë¹????ç­Œëš¯?œå ‰ï¿? ??ç­Œëš¯?œï§¥ï¿???ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ???ï¿½êºï¿½ê¼¤??12?ï¿½ì”ˆ?·ë‰“ì§? ?ï¿½ë„­?¨Îºë®?è½…ê³—??ï¿½ê¶ æ²…ï¿½???[ 3-e. RS ] ?ï¿½ë›¾?ï¿½ï¿½????ï¿½ë„­?¨ï½‹ì³³ï¿½?????¨ï¿½????ï¿½ëœ„ï¿½ë ¡.</div>
            </div>
            <div className="chat-input-box">
              <input type="text" placeholder="?²ãƒ«??¿½?–ï¿½ë¤ƒï¿½ë¹??????ï¿½ëƒ±è­°ï¿½??ç­Œëš¯ë¼šï¿½ë£??(Command Here...)" className="chat-input" />
              <button className="chat-send"><Send size={16} /></button>
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .sentiment-upgrade-container {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          color: white;
        }

        .sentiment-header { display: flex; justify-content: space-between; align-items: center; }
        .sentiment-title { font-size: 1.8rem; font-weight: 900; display: flex; align-items: center; gap: 12px; letter-spacing: -1px; }
        .title-icon { color: var(--gold-400); }
        .sentiment-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .confidence-badge {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: var(--gold-400);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* Gauge */
        .gauge-card { padding: 30px; display: flex; flex-direction: column; align-items: center; }
        .gauge-header { width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .gauge-header h3 { font-size: 0.85rem; font-weight: 900; }
        .status-badge { padding: 4px 12px; border-radius: 4px; font-size: 0.75rem; font-weight: 900; }
        .status-badge.greed { background: rgba(255, 0, 85, 0.1); color: #ff0055; border: 1px solid rgba(255, 0, 85, 0.2); }

        .gauge-visual { width: 100%; max-width: 320px; position: relative; margin-top: 20px; }
        .gauge-svg { width: 100%; height: auto; }
        .gauge-progress { transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1); }

        .gauge-info {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gauge-info .val { font-size: 3.5rem; font-weight: 900; line-height: 1; }
        .gauge-info .unit { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); margin-top: 5px; }

        .gauge-footer { width: 100%; display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.65rem; font-weight: 800; color: var(--text-muted); padding: 0 10px; }

        /* Sources */
        .section-title { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .sources-list { display: flex; flex-direction: column; gap: 12px; }
        .source-item { padding: 16px; display: flex; justify-content: space-between; align-items: center; }
        .source-info { display: flex; gap: 14px; align-items: center; }
        .source-icon { width: 32px; height: 32px; background: rgba(255,255,255,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .source-name { font-size: 0.85rem; font-weight: 800; }
        .source-label { font-size: 0.7rem; color: var(--text-muted); font-weight: 600; }
        
        .source-val-box { width: 150px; display: flex; align-items: center; gap: 12px; }
        .source-progress { flex: 1; height: 6px; background: #222; border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--gold-400); border-radius: 3px; }
        .source-pct { font-size: 0.85rem; font-weight: 900; width: 35px; text-align: right; }

        /* Advice Card */
        .tactical-advice-card { padding: 24px; }
        .advice-header { font-size: 0.9rem; font-weight: 900; color: var(--gold-400); display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .advice-grid { display: grid; grid-template-columns: 1fr 180px; gap: 40px; align-items: center; }
        .advice-text { font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); font-weight: 600; }
        .advice-action { display: flex; flex-direction: column; align-items: center; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.2); }
        .action-label { font-size: 0.65rem; font-weight: 900; color: var(--gold-400); margin-bottom: 4px; }
        .action-val { font-size: 1.1rem; font-weight: 900; }

        /* AI COMMANDER */
        .commander-section-title { font-size: 1.4rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; margin-top: 20px; }
        .commander-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 50px; }
        .commander-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .commander-card.full-width { grid-column: 1 / -1; }
        .card-header-v2 { font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 10px; color: var(--gold-400); }
        .card-desc { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }

        .temp-visual { margin: 10px 0; }
        .temp-bar-bg { width: 100%; height: 12px; background: rgba(0,0,0,0.4); border-radius: 6px; position: relative; overflow: visible; border: 1px solid rgba(255,255,255,0.05); }
        .temp-bar-fill { height: 100%; background: linear-gradient(to right, #3b82f6, #fbbf24, #ff0055); border-radius: 6px; }
        .temp-marker { position: absolute; top: -5px; width: 4px; height: 22px; background: white; box-shadow: 0 0 10px white; border-radius: 2px; }
        .temp-labels { display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); }
        .current-temp { color: #ff0055; font-weight: 900; }

        .feedback-item { background: rgba(255,255,255,0.03); padding: 16px; border-radius: 8px; border-left: 4px solid var(--gold-400); }
        .feedback-tag { font-size: 0.7rem; font-weight: 900; color: var(--gold-400); margin-bottom: 8px; }
        .feedback-msg { font-size: 0.85rem; line-height: 1.6; color: #e2e8f0; }

        .chat-interface { display: flex; flex-direction: column; gap: 20px; }
        .chat-messages { display: flex; flex-direction: column; gap: 12px; height: 160px; overflow-y: auto; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 8px; }
        .msg { padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; max-width: 80%; line-height: 1.5; }
        .msg.bot { background: rgba(255,255,255,0.05); color: #e2e8f0; align-self: flex-start; }
        .msg.user { background: rgba(212, 175, 55, 0.1); color: var(--gold-400); align-self: flex-end; border: 1px solid rgba(212, 175, 55, 0.2); }
        .msg.bot.success { border-left: 4px solid #10b981; }

        .chat-input-box { display: flex; gap: 10px; }
        .chat-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; border-radius: 8px; color: white; outline: none; font-size: 0.9rem; }
        .chat-input:focus { border-color: var(--gold-400); }
        .chat-send { width: 48px; display: flex; align-items: center; justify-content: center; background: var(--gold-400); border: none; border-radius: 8px; color: black; cursor: pointer; transition: transform 0.2s; }
        .chat-send:hover { transform: scale(1.05); }

        .gold { color: var(--gold-400); }
      `}</style>
    </div>
  );
}
