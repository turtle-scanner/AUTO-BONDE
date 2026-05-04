"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Trophy, 
  Medal, 
  TrendingUp, 
  Star, 
  Award, 
  Crown, 
  ArrowUpRight, 
  Target,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface Ranker {
  id: number;
  name: string;
  type: 'AI' | 'MEMBER';
  yield: number;
  bestStock: string;
  winRate: number;
}

// ?ç¸•ï¿½??¿ë…¿?????ï¿½ë?åª›ì•²?? ?²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¿½????????ç¸•ï¿½??¿ë…¿?????äº?‚†?“å ‰ï¿?1,000?²ãƒ«??¿½ëµ????ï¿½ï¿½?¥ï¿½ï¿½í” ??ç­Œë??£æ´ï¿?const rankers: Ranker[] = [
  { id: 1, name: "?ï¿½ë„­?¨ï½‹ì³›ï¿½ï¿½ï¿½????¨ëš®?–ç­Œï¿??, type: "AI", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 2, name: "cntfed", type: "MEMBER", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 3, name: "?²ãƒ«??¿½ëµ?ï¿½ë½ç§»ï¿½??…ï¿½?¿ë—ª?¬ç­Œï¿½ï¿½?£ï§ï¿?ï¿½ë«–ï¿½ëª¡ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ëœ®?, type: "AI", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 4, name: "hjrubbi", type: "MEMBER", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 5, name: "???ï¿½ê±¡?????ï¿½ë‚ï¿½ë’Š", type: "AI", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 6, name: "fire33", type: "MEMBER", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 7, name: "???è¢â““ï¿????ï¦«ëš®?ï¿½ë«Šç’ï¿??ç­Œë??¡ï¿½??, type: "AI", yield: 0.0, bestStock: "Ready...", winRate: 0 },
  { id: 8, name: "sebinhi", type: "MEMBER", yield: 0.0, bestStock: "Ready...", winRate: 0 },
];

export default function StrategyPerformance() {
  const top3 = rankers.slice(0, 3);
  const rest = rankers.slice(3);

  return (
    <div className="performance-container animate-fade-in">
      {/* Header */}
      <div className="award-header">
        <h1 className="main-title">
          <Trophy size={48} className="gold-icon" /> [ ???????ï¿½ë„­?¨ï½‹êµ»ï¿½ê±????ç­Œëš¯ë¼”å½›ï¿?]
        </h1>
        <p className="sub-title">2026??5??- AI ???‰ë¨¯??????ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ???????ï¿½ëª´?¨ë£¸????²ãƒ«??¿½?–ï¿½ë¤????ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ì †?/p>
        
        {/* 1000?²ãƒ«??¿½ëµ?????????²ãƒ«??¿½?–ï¿½ë¤??*/}
        <div className="simulation-rule-badge glass">
          <ShieldCheck size={16} className="gold" />
          <span>?²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¿½????????ç¸•ï¿½??¿ë…¿?????äº?‚†?“å ‰ï¿?<strong>1,000?²ãƒ«??¿½ëµ???/strong>??ï¿½ï¿½?¥ï¿½ï¿½í” ???ï¿½ë§§ï¿½ëŸ¡???ï¿½ìŠ¦è¸°ï¿½ ??ç­Œë??£æ´ï¿??ç­Œï¿½????ï¿½ëœ®??</span>
        </div>
      </div>

      {/* Podium Section */}
      <div className="podium-section">
        {/* 2nd Place */}
        <div className="podium-item second">
          <div className="rank-medal silver"><Medal size={24} /></div>
          <div className="podium-card glass">
            <div className="avatar-box silver-border">{top3[1].name[0]}</div>
            <h3 className="rank-name">{top3[1].name}</h3>
            <div className="rank-yield">{top3[1].yield.toFixed(2)}%</div>
            <div className="rank-label">?ï¿½ë„­?¨Îºë°??????æ¿šï¿½?/div>
          </div>
          <div className="base silver-base">2</div>
        </div>

        {/* 1st Place */}
        <div className="podium-item first">
          <div className="rank-medal gold"><Crown size={32} /></div>
          <div className="podium-card glass-gold">
            <div className="avatar-box gold-border">{top3[0].name[0]}</div>
            <h3 className="rank-name gold-text">{top3[0].name}</h3>
            <div className="rank-yield gold-text">{top3[0].yield.toFixed(2)}%</div>
            <div className="rank-label gold-text">?ï¿½ë„­?¨Îºë°??????æ¿šï¿½?/div>
            <div className="sparkle-effects">
              <Sparkles className="s1" size={16} />
              <Sparkles className="s2" size={12} />
            </div>
          </div>
          <div className="base gold-base">1</div>
        </div>

        {/* 3rd Place */}
        <div className="podium-item third">
          <div className="rank-medal bronze"><Medal size={24} /></div>
          <div className="podium-card glass">
            <div className="avatar-box bronze-border">{top3[2].name[0]}</div>
            <h3 className="rank-name">{top3[2].name}</h3>
            <div className="rank-yield">{top3[2].yield.toFixed(2)}%</div>
            <div className="rank-label">?ï¿½ë„­?¨Îºë°??????æ¿šï¿½?/div>
          </div>
          <div className="base bronze-base">3</div>
        </div>
      </div>

      {/* Leaderboard Grid */}
      <div className="leaderboard-layout">
        <GlassCard className="leaderboard-card">
          <h3 className="section-title"><Award size={20} className="gold" /> ?ï¿½ë„­?¨ï½‹ì³?????…ï¿½?(Total Rankings)</h3>
          <div className="rank-table">
            <div className="table-header">
              <span>??ç­Œë??¡å½›ï¿?/span>
              <span>????AI</span>
              <span>??ï¿½êº‚ï§Ÿë‰‘ë¤?/span>
              <span>?²ãƒ«?”ï¿½ê± ç’ï¿???ï¿½ëª´?¨ë£¸???ï¿½êºï¿½ê¼¤??/span>
              <span>?ï¿½ë›¾ï¿½ë£†ï§?¿½??/span>
              <span>??ï¿½ëª´?¨ë£¸???/span>
            </div>
            {rankers.map((r, i) => (
              <div key={r.id} className="table-row">
                <span className="row-rank">{i + 1}</span>
                <span className="row-name">{r.name}</span>
                <span className={`row-type ${r.type.toLowerCase()}`}>{r.type}</span>
                <span className="row-stock">{r.bestStock}</span>
                <span className="row-win">{r.winRate}%</span>
                <span className="row-yield">{r.yield >= 0 ? '+' : ''}{r.yield.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Stats Column */}
        <div className="stats-column">
          <GlassCard className="mini-stat">
            <div className="m-icon"><Star size={20} className="gold" /></div>
            <div className="m-info">
              <span className="m-label">?²ãƒ«?”ï¿½ê± ç’ï¿????ï¿½ë„­?¨ï½‹ì³?ï¿½ï¿½ï¿½ï§Œï¿?ï¿½ëŸ¾ï¿½ï¿½</span>
              <span className="m-val">TBD</span>
            </div>
          </GlassCard>
          <GlassCard className="mini-stat">
            <div className="m-icon"><Target size={20} className="gold" /></div>
            <div className="m-info">
              <span className="m-label">?²ãƒ«?”ï¿½ê± ç’ï¿???????????/span>
              <span className="m-val">TBD</span>
            </div>
          </GlassCard>
          <GlassCard className="mini-stat bg-gold-tint">
            <div className="m-icon"><ArrowUpRight size={20} className="gold" /></div>
            <div className="m-info">
              <span className="m-label">???????ï¿½ëª´?¨ë£¸???/span>
              <span className="m-val">0.00%</span>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .performance-container { padding: 40px; display: flex; flex-direction: column; gap: 50px; color: white; background: #08080a; min-height: 100vh; }
        
        .award-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .main-title { font-size: 3rem; font-weight: 950; display: flex; align-items: center; gap: 20px; color: #f2f2f2; text-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
        .gold-icon { color: #d4af37; animation: bounce 2s infinite; }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .sub-title { font-size: 1.1rem; color: #737373; font-weight: 600; letter-spacing: 1px; }

        .simulation-rule-badge { 
          margin-top: 10px; padding: 10px 24px; border-radius: 30px; 
          background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2);
          display: flex; align-items: center; gap: 10px; font-size: 0.9rem; color: #cbd5e1;
        }
        .simulation-rule-badge strong { color: var(--primary); }

        /* Podium */
        .podium-section { display: flex; align-items: flex-end; justify-content: center; gap: 30px; padding: 40px 0; }
        .podium-item { display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; }
        .podium-card { width: 220px; padding: 30px 20px; border-radius: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: transform 0.3s; }
        .podium-card:hover { transform: translateY(-10px); }
        .glass-gold { background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05)); border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 10px 40px rgba(212, 175, 55, 0.1); }
        
        .avatar-box { width: 64px; height: 64px; border-radius: 50%; background: #1a1a1a; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; }
        .gold-border { border: 3px solid #d4af37; }
        .silver-border { border: 3px solid #C0C0C0; }
        .bronze-border { border: 3px solid #CD7F32; }

        .rank-medal { position: absolute; top: -20px; z-index: 5; filter: drop-shadow(0 0 10px currentColor); }
        .gold { color: #d4af37; }
        .silver { color: #C0C0C0; }
        .bronze { color: #CD7F32; }

        .rank-name { font-size: 1.2rem; font-weight: 900; margin: 0; }
        .rank-yield { font-size: 1.8rem; font-weight: 950; margin: 4px 0; color: #444; }
        .rank-label { font-size: 0.7rem; font-weight: 900; opacity: 0.8; }
        .gold-text { color: #d4af37; }

        .base { width: 100%; height: 60px; border-radius: 12px 12px 0 0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 900; color: rgba(255,255,255,0.2); }
        .gold-base { height: 100px; background: linear-gradient(to bottom, #d4af37, #8a6d1d); }
        .silver-base { height: 70px; background: linear-gradient(to bottom, #C0C0C0, #7a7a7a); }
        .bronze-base { height: 50px; background: linear-gradient(to bottom, #CD7F32, #7d4e1e); }

        .sparkle-effects { position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; }
        .s1 { position: absolute; top: 10%; right: 10%; color: #d4af37; animation: pulse 1.5s infinite; }
        .s2 { position: absolute; bottom: 20%; left: 15%; color: #d4af37; animation: pulse 2s infinite; }
        @keyframes pulse { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 1; transform: scale(1.2); } }

        /* Leaderboard Table */
        .leaderboard-layout { display: grid; grid-template-columns: 1fr 300px; gap: 32px; }
        .leaderboard-card { padding: 32px; }
        .section-title { font-size: 1.2rem; font-weight: 900; display: flex; align-items: center; gap: 12px; margin-bottom: 30px; }
        
        .rank-table { display: flex; flex-direction: column; gap: 8px; }
        .table-header { display: grid; grid-template-columns: 60px 1fr 100px 150px 100px 100px; padding: 12px 16px; font-size: 0.75rem; font-weight: 900; color: #555; text-transform: uppercase; border-bottom: 1px solid #222; }
        .table-row { display: grid; grid-template-columns: 60px 1fr 100px 150px 100px 100px; padding: 16px; background: rgba(255,255,255,0.02); border-radius: 8px; align-items: center; border: 1px solid transparent; transition: all 0.2s; }
        .table-row:hover { background: rgba(212, 175, 55, 0.05); border-color: rgba(212, 175, 55, 0.2); transform: translateX(5px); }
        
        .row-rank { font-weight: 900; color: #737373; }
        .row-name { font-weight: 800; color: #f2f2f2; }
        .row-type { font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; text-align: center; width: fit-content; }
        .row-type.ai { background: rgba(212, 175, 55, 0.1); color: #d4af37; }
        .row-type.member { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .row-stock { font-size: 0.85rem; color: #999; font-weight: 700; }
        .row-win { font-weight: 700; color: #737373; }
        .row-yield { font-weight: 900; color: #737373; text-align: right; }

        .stats-column { display: flex; flex-direction: column; gap: 20px; }
        .mini-stat { padding: 20px; display: flex; align-items: center; gap: 16px; }
        .m-icon { width: 44px; height: 44px; background: rgba(212, 175, 55, 0.05); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .m-info { display: flex; flex-direction: column; gap: 2px; }
        .m-label { font-size: 0.65rem; font-weight: 800; color: #737373; text-transform: uppercase; }
        .m-val { font-size: 1rem; font-weight: 900; color: #f2f2f2; }
        .bg-gold-tint { background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent); border-color: rgba(212, 175, 55, 0.1); }
      `}</style>
    </div>
  );
}
