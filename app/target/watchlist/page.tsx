"use client";

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Eye, 
  TrendingUp, 
  BarChart3, 
  Star, 
  Zap, 
  RefreshCw, 
  Target, 
  ShieldAlert, 
  ChevronRight,
  Info
} from 'lucide-react';

interface WatchItem {
  ticker: string;
  market: string;
  setup: string;
  rs: number;
  roe: string;
  reason: string;
  target: string;
  stop: string;
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const res = await fetch('/v6-api/target-watchlist');
      const data = await res.json();
      setWatchlist(data);
    } catch (err) {
      console.error("Error loading watchlist:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="watch-container animate-fade-in">
      <div className="section-header">
        <div className="header-main">
          <h1 className="gradient-text">3-c. [ WATCH ] ??¨ëš®?–ç­Œï¿? ?ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ??²ãƒ«??¿½ëµ????ï¿½ì”ˆ?·ë†ƒ?????Ÿë°¸Å¦?Šì–•ì§??/h1>
          <span className="live-status">ELITE SELECTION</span>
        </div>
        <p className="subtitle">??¨ëš®?–ç­Œï¿??Qullamaggie) ??ï¿½ë®ï¿½ï¿½???????ï¿½ë„­?¨ï½‹ì³???²ãƒ«?£é®ë½³ì­•??'?²ãƒ«??¿½ëµ????ï¿½ì”ˆï¿½ìˆ??? ??????????ï¿½ëœ„ï§¥ï¿½ ?ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ???ï¿½êºï¿½ê¼¤??ï¿½êµ¥å¤·ï¿½?/p>
      </div>

      <div className="watch-info-bar glass">
        <div className="info-item">
          <Star size={18} className="gold" />
          <span>?ï¿½ë„­?¨ï½‹ì³???ï¿½ì”ˆ?·ë†ƒ???æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº???ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ????? <strong>{watchlist.length}??/strong></span>
        </div>
        <div className="info-item">
          <ShieldAlert size={18} className="red" />
          <span>ï¿½ì’??´ï¿½?????????ï§ï¿½ï¿½ï¿½ï¿??? <strong>3-5% ????…ï¿½?/strong></span>
        </div>
        <button className="sync-btn" onClick={fetchWatchlist} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          ???ï¿½ë§©????œï§Ÿï¿??        </button>
      </div>

      <div className="watch-grid">
        {loading ? (
          <div className="loading-state">
            <RefreshCw size={40} className="animate-spin muted" />
            <p>??ï¿½ëŒ–?¨ëº£?¼é‡ï¿? ??ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼??ï¿½ë?è¸°ï¿½???ï¿½ï¿½?¤ï¼˜ï§¥ï¿½ ???ï¿½ì‰µ?¾ï¿½??æ¿šï¿½?..</p>
          </div>
        ) : (
          watchlist.map((item, i) => (
            <GlassCard key={i} className="elite-card">
              <div className="card-top">
                <div className="ticker-group">
                  <span className="ticker-symbol">{item.ticker}</span>
                  <span className={`market-tag ${item.market.toLowerCase()}`}>{item.market}</span>
                </div>
                <div className="setup-badge">{item.setup}</div>
              </div>

              <div className="metrics-grid">
                <div className="metric">
                  <span className="m-label">RS STRENGTH</span>
                  <span className="m-val gold">{item.rs}</span>
                </div>
                <div className="metric">
                  <span className="m-label">ROE</span>
                  <span className="m-val">{item.roe}%</span>
                </div>
              </div>

              <div className="reason-box">
                <div className="reason-header">
                  <Info size={14} className="gold" />
                  <span>BONDE'S BUY RATIONALE</span>
                </div>
                <p className="reason-text">{item.reason}</p>
              </div>

              <div className="tactical-levels">
                <div className="level">
                  <span className="l-label">TARGET (?²ãƒ«??¿½?ˆæ³³ï¿½ï¿½?£å½›ï¿?</span>
                  <span className="l-val gold">{item.target}</span>
                </div>
                <div className="level">
                  <span className="l-label">STOP (?????</span>
                  <span className="l-val red">{item.stop}</span>
                </div>
              </div>

              <button className="execute-btn">
                ?????ï¦«ï¿½? ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½??<ChevronRight size={16} />
              </button>
            </GlassCard>
          ))
        )}
      </div>

      <style jsx>{`
        .watch-container { padding: 30px; display: flex; flex-direction: column; gap: 24px; }
        .header-main { display: flex; justify-content: space-between; align-items: center; }
        .live-status { background: rgba(0, 242, 255, 0.1); color: var(--primary); padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 900; border: 1px solid rgba(0, 242, 255, 0.2); }
        
        .watch-info-bar { padding: 15px 25px; display: flex; align-items: center; gap: 30px; border-radius: 12px; }
        .info-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 700; color: #94a3b8; }
        .info-item strong { color: white; }
        
        .sync-btn { margin-left: auto; background: none; border: 1px solid rgba(255,255,255,0.1); color: white; padding: 6px 16px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; }
        .sync-btn:hover { background: rgba(255,255,255,0.05); }

        .watch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
        
        .elite-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; transition: transform 0.3s; }
        .elite-card:hover { transform: translateY(-5px); border-color: var(--primary); }

        .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .ticker-group { display: flex; align-items: center; gap: 10px; }
        .ticker-symbol { font-size: 1.8rem; font-weight: 900; color: white; }
        .market-tag { padding: 2px 6px; border-radius: 4px; font-size: 0.6rem; font-weight: 900; }
        .market-tag.us { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .market-tag.kr { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .setup-badge { font-size: 0.7rem; font-weight: 900; color: var(--primary); background: rgba(212, 175, 55, 0.1); padding: 4px 10px; border-radius: 6px; }

        .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .metric { display: flex; flex-direction: column; gap: 4px; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; }
        .m-label { font-size: 0.6rem; font-weight: 800; color: #64748b; }
        .m-val { font-size: 1.1rem; font-weight: 900; }

        .reason-box { background: rgba(255, 255, 255, 0.03); padding: 16px; border-radius: 10px; border-left: 3px solid var(--primary); }
        .reason-header { display: flex; align-items: center; gap: 8px; font-size: 0.65rem; font-weight: 900; color: #64748b; margin-bottom: 8px; }
        .reason-text { font-size: 0.85rem; line-height: 1.6; color: #cbd5e1; font-weight: 600; }

        .tactical-levels { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }
        .level { display: flex; flex-direction: column; gap: 4px; }
        .l-label { font-size: 0.65rem; font-weight: 800; color: #64748b; }
        .l-val { font-size: 1rem; font-weight: 900; font-family: 'Fira Code', monospace; }

        .execute-btn { width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 8px; font-weight: 900; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s; }
        .execute-btn:hover { background: var(--primary); color: black; border-color: var(--primary); }

        .loading-state { grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; gap: 20px; color: #64748b; font-weight: 800; }

        .gold { color: var(--primary); }
        .red { color: #ef4444; }
      `}</style>
    </div>
  );
}
