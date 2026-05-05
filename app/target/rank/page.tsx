"use client";

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  Crown, 
  Medal, 
  Award, 
  Globe, 
  Flag, 
  Zap,
  Activity,
  RefreshCw
} from 'lucide-react';

interface RankItem {
  ticker: string;
  rs: number;
  roe: number;
  score: number;
  industry: string;
}

interface RankData {
  KOSPI: RankItem[];
  KOSDAQ: RankItem[];
  NASDAQ: RankItem[];
}

export default function RankPage() {
  const [data, setData] = useState<RankData | null>(null);
  const [activeMarket, setActiveMarket] = useState<keyof RankData>('NASDAQ');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRank();
  }, []);

  const fetchRank = async () => {
    setLoading(true);
    try {
      const res = await fetch('/v6-api/target-rank');
      const d = await res.json();
      setData(d);
    } catch (err) {
      console.error("Rank fetch failed", err);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const getRankIcon = (i: number) => {
    if (i === 0) return <Crown size={20} className="rank-icon gold" />;
    if (i === 1) return <Medal size={20} className="rank-icon silver" />;
    if (i === 2) return <Award size={20} className="rank-icon bronze" />;
    return <span className="rank-num">#{i + 1}</span>;
  };

  const currentList = data ? data[activeMarket] : [];
  const maxScore = 100;

  return (
    <div className="rank-container animate-fade-in">
      <div className="rank-header">
        <div className="header-left">
          <h1 className="rank-title">
            <Trophy size={32} className="title-icon" /> [ RANK ] ?ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»????…ï¿½?          </h1>
          <p className="rank-subtitle">RS?ï¿½ì”ˆ?·ë…»ë¦°é†«ê·£ì??90+) ??ROE(15%+) ?ï¿½êºï¿½ì??ï¿½ë„ï¿½ï¿½???¨ëš®?–ç­Œï¿???ï¿½ë„­?¨ï½‹ì³???²ãƒ«?”ï¿½ê± ç’ëº£ë¾?¾ï¿½???ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»?/p>
        </div>
        <div className="header-right">
          <div className="market-toggle glass">
            {(['NASDAQ', 'KOSPI', 'KOSDAQ'] as const).map(m => (
              <button 
                key={m} 
                className={`m-btn ${activeMarket === m ? 'active' : ''}`}
                onClick={() => setActiveMarket(m)}
              >
                {m === 'NASDAQ' ? <Globe size={14} /> : <Flag size={14} />} {m}
              </button>
            ))}
          </div>
          <button className={`sync-btn ${loading ? 'loading' : ''}`} onClick={fetchRank}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> SYNC
          </button>
        </div>
      </div>

      {/* Tactical Banner */}
      <div className="tactical-banner glass">
        <div className="banner-content">
          <span className="banner-tag">[ PRADEEP BONDE'S TACTIC ]</span>
          <p className="banner-text">
            "?²ãƒ«?£ï¿½??????ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»?ï¿½ï¿½?¤ë² ï§¥ï¿½ ?²ãƒ«?£ï¿½????? ???¥ï¿½?ï¿½ëŸ¢????RS(????ï¿½ì”ˆ?·ë…»ë¦°é†«ê·£ì???ï¿½ì”ˆï¿½ìˆ? 90 ??ï¿½ï¿½?¤ï¿½ï¿½å½›ï¿??ï¿½ï¿½?¥ï¿½ï¿½í” ??¨ë©¸?€ï¿½ëª­???æ¤°ï¿½? ?ï¿½ì”ˆ?·ë…»ë¦???ROE?ï¿½ì”ˆï¿½ìˆ? ???·ëª„êµ£ç­Œë¬’ì¥‰ï¿½ë‡²?ï¿½ê¼¶??????ï¿½êºï¿½ê¼¤????ï¿½êµï¿½ë²?? 
            ?????…ï¿½????ï¿½ë?ï§?¤„ì­???ï¿½êºï¿½ê¼¤???? ??ç¸•ï¿½?????ï¿½ë?ï§?ˆ??¿½?‹ï¿½???ï¿½ë•«? ?ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ëœ®? ??ç­Œë??£æ²…ï¿???????’ã‚Œ???‰ì˜¨ï¿?ï¿½ì”ˆï¿½ìˆ? ??ï¿½ë¼”????????ï¿½ë®?¾ï¿½???æºë‚†ë¿???ï¿½ëœ„ï¿½ë ¡."
          </p>
        </div>
      </div>

      <div className="podium">
        {currentList.slice(0, 3).map((item, i) => (
          <GlassCard key={i} className={`podium-card pos-${i}`}>
            <div className="podium-rank">{getRankIcon(i)}</div>
            <div className="podium-ticker">{item.ticker}</div>
            <div className="podium-industry">{item.industry}</div>
            <div className="podium-metrics">
              <div className="p-m">
                <span className="p-m-label">RS</span>
                <span className="p-m-val gold">{item.rs}</span>
              </div>
              <div className="p-m">
                <span className="p-m-label">ROE</span>
                <span className="p-m-val">{item.roe}%</span>
              </div>
            </div>
            <div className="podium-score">BONDE SCORE: {item.score}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="table-card">
        <div className="table-header-row">
          <span className="th rank-col">??ç­Œë??¡å½›ï¿?/span>
          <span className="th ticker-col">??ï¿½êºï¿½ê¼¤??ï¿½ë²Š?°ï¿½?/span>
          <span className="th industry-col">??ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½??/span>
          <span className="th rs-col">RS ?ï¿½ì”ˆ?·ë…»ë¦°é†«ê·£ì??/span>
          <span className="th roe-col">ROE</span>
          <span className="th bar-col">?ï¿½ë„­?¨ï½‹ì³???????/span>
        </div>
        {loading ? (
          <div className="loading-state">??ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼?????ï¿½ì‰µ?¾ï¿½??æ¿šï¿½?..</div>
        ) : (
          currentList.map((item, i) => (
            <div key={i} className={`table-row ${i < 3 ? 'top3' : ''} ${i % 2 === 0 ? 'even' : ''}`}>
              <span className="td rank-col">{getRankIcon(i)}</span>
              <span className="td ticker-col ticker-text">{item.ticker}</span>
              <span className="td industry-col">{item.industry}</span>
              <span className="td rs-col highlight">{item.rs}</span>
              <span className="td roe-col">{item.roe}%</span>
              <span className="td bar-col">
                <div className="power-bar-bg">
                  <div className="power-bar" style={{ width: `${(item.score / maxScore) * 100}%` }}></div>
                </div>
              </span>
            </div>
          ))
        )}
      </GlassCard>

      <style jsx>{`
        .rank-container { padding: 30px; display: flex; flex-direction: column; gap: 30px; }
        .rank-header { display: flex; justify-content: space-between; align-items: center; }
        .rank-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .rank-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; font-weight: 600; }

        .header-right { display: flex; gap: 15px; align-items: center; }
        .market-toggle { display: flex; padding: 4px; border-radius: 10px; background: rgba(255,255,255,0.05); }
        .m-btn { display: flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 8px; border: none; background: none; color: #64748b; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.2s; }
        .m-btn.active { background: white; color: black; }
        .sync-btn { background: var(--primary); border: none; color: black; padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .tactical-banner { padding: 20px 30px; border-radius: 12px; border-left: 4px solid var(--primary); }
        .banner-tag { font-size: 0.7rem; font-weight: 900; color: var(--primary); display: block; margin-bottom: 8px; }
        .banner-text { font-size: 0.95rem; line-height: 1.6; color: #cbd5e1; font-weight: 600; font-style: italic; }

        .podium { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .podium-card { padding: 30px; text-align: center; display: flex; flex-direction: column; gap: 15px; }
        .podium-card.pos-0 { border-color: var(--primary); box-shadow: 0 0 30px rgba(212,175,55,0.15); }
        .podium-ticker { font-size: 1.8rem; font-weight: 900; color: white; }
        .podium-industry { font-size: 0.8rem; color: var(--text-muted); font-weight: 800; }
        .podium-metrics { display: flex; justify-content: center; gap: 30px; }
        .p-m { display: flex; flex-direction: column; gap: 4px; }
        .p-m-label { font-size: 0.65rem; color: #64748b; font-weight: 800; }
        .p-m-val { font-size: 1.2rem; font-weight: 900; }
        .podium-score { font-size: 0.75rem; font-weight: 900; color: var(--primary); background: rgba(212,175,55,0.1); padding: 6px; border-radius: 20px; }

        .table-card { padding: 0; overflow: hidden; }
        .table-header-row { display: flex; padding: 16px 24px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .th { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }
        
        .table-row { display: flex; padding: 14px 24px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.2s; }
        .table-row:hover { background: rgba(255,255,255,0.03); }
        .td { font-size: 0.85rem; font-weight: 700; color: white; }

        .rank-col { width: 60px; }
        .ticker-col { width: 150px; }
        .industry-col { width: 150px; }
        .rs-col { width: 100px; }
        .roe-col { width: 100px; }
        .bar-col { flex: 1; }

        .ticker-text { font-weight: 900; font-size: 1.1rem; }
        .highlight { color: var(--primary); }
        .power-bar-bg { width: 100%; height: 6px; background: rgba(0,0,0,0.3); border-radius: 3px; }
        .power-bar { height: 100%; border-radius: 3px; background: linear-gradient(to right, var(--primary), #fbbf24); }

        .gold { color: var(--primary); }
        .loading-state { padding: 100px; text-align: center; color: var(--text-muted); font-weight: 800; }
      `}</style>
    </div>
  );
}
