"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { Trophy, Medal, TrendingUp, User, ArrowUpRight } from 'lucide-react';

interface RankItem {
  name: string;
  balance: number;
  profitPct: string;
}

export default function RankPage() {
  const [ranking, setRanking] = useState<RankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRanking();
  }, []);

  const fetchRanking = async () => {
    try {
      const res = await fetch('/v6-api/mock-ranking');
      const data = await res.json();
      setRanking(data);
    } catch (err) {
      console.error("Failed to fetch ranking", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rank-container animate-fade-in">
      <div className="rank-header">
        <h1><Trophy size={36} className="gold" /> 7-e. [ RANK ] ??ï¿½ëŒ–?¨ëº£?¼é‡ï¿? ?²ãƒ«??¿½?–ï¿½ë¤????ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ì †?/h1>
        <p className="subtitle">???ï¿½êµï¿½ë£‚?ï¿½ì˜“åª›ï¿½ç­Œï¿½?æ²ƒì„…ë£—ï¿½ëª¡ï¿½??€¨Îºë°ï¿½ì †??ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ??????ï¿½ë¤ƒ???²ãƒ«??¿½?ˆæ³³ï¿??????ï¿½ë„­?¨ï½‹ì³????ï¿½ëª´?¨ë£¸??????…ï¿½???ï¿½êµï¿½ë²??</p>
      </div>

      <div className="rank-content">
        <div className="top-three">
          {ranking.slice(0, 3).map((item, i) => (
            <GlassCard key={i} className={`top-card rank-${i+1}`}>
              <div className="medal-box">
                <Medal size={48} className={`medal-${i+1}`} />
                <span className="rank-badge">{i+1}st</span>
              </div>
              <div className="user-name">{item.name}</div>
              <div className="user-profit">{item.profitPct}</div>
              <div className="user-balance">??{item.balance.toLocaleString()}</div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="full-rank-card">
          <table className="rank-table">
            <thead>
              <tr>
                <th>??ç­Œë??¡å½›ï¿?/th>
                <th>?????ï¿½ë¤ƒ?/th>
                <th>?ï¿½ë„­?¨ï½‹ì³????ï¿½ëª´?¨ë£¸???/th>
                <th>?²ãƒ«?”ï¿½ê± ç’ëº£ë¼ï¿½ë ­???? ?ï¿½êº‚ï¿½ï¿½ï¿½ï¿½?ï¿½ë‹ï¿½ë??/th>
                <th>??ï¿½ë?åª›ì•²??/th>
              </tr>
            </thead>
            <tbody>
              {ranking.map((item, i) => (
                <tr key={i} className={i < 3 ? 'top-row' : ''}>
                  <td>
                    <span className={`rank-number ${i < 3 ? 'gold-num' : ''}`}>
                      {i + 1}
                    </span>
                  </td>
                  <td>
                    <div className="user-cell">
                      <User size={16} className="muted" />
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="profit-cell">
                    <span className={parseFloat(item.profitPct) >= 0 ? 'up' : 'down'}>
                      {item.profitPct} <ArrowUpRight size={14} />
                    </span>
                  </td>
                  <td className="balance-cell">??{item.balance.toLocaleString()}</td>
                  <td>
                    <span className="status-badge">ACTIVE</span>
                  </td>
                </tr>
              ))}
              {ranking.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="empty-msg">?ï¿½ë„­?¨ï½‹ì³´ï¿½ë¹??ï¿½êºï¿½ì??ï¿½ë¼º??¿½???²ãƒ«??¿½ëµ???°ê·¥?•è‹¡ï¿? ??ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡. ?²ï¿½??ï§ï¿½ï¿½ï¿½ï¿???????ï§ëµ?? ??ç­Œëš¯??‹‘ï¿??¨ëš®??ï¿½ê¶˜ï¿½ë¹??</td>
                </tr>
              )}
            </tbody>
          </table>
        </GlassCard>
      </div>

      <style jsx>{`
        .rank-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .rank-header { display: flex; flex-direction: column; gap: 10px; }
        .rank-header h1 { font-size: 2.2rem; font-weight: 900; display: flex; align-items: center; gap: 16px; color: white; }
        .gold { color: #d4af37; }
        .subtitle { color: var(--text-muted); font-weight: 600; }

        .rank-content { display: flex; flex-direction: column; gap: 40px; }
        
        .top-three { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; align-items: flex-end; }
        .top-card { padding: 40px; text-align: center; display: flex; flex-direction: column; gap: 15px; transition: transform 0.3s; }
        .top-card:hover { transform: translateY(-10px); }
        .rank-1 { height: 350px; order: 2; border: 2px solid #d4af37; background: rgba(212, 175, 55, 0.05); }
        .rank-2 { height: 300px; order: 1; }
        .rank-3 { height: 280px; order: 3; }

        .medal-box { position: relative; margin: 0 auto 10px; }
        .medal-1 { color: #d4af37; filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.5)); }
        .medal-2 { color: #C0C0C0; }
        .medal-3 { color: #CD7F32; }
        .rank-badge { position: absolute; bottom: -5px; right: -5px; background: white; color: black; font-size: 0.7rem; font-weight: 900; padding: 2px 6px; border-radius: 4px; }

        .user-name { font-size: 1.4rem; font-weight: 900; color: white; }
        .user-profit { font-size: 2rem; font-weight: 900; color: #10b981; }
        .user-balance { font-size: 0.9rem; color: #64748b; font-weight: 700; }

        .full-rank-card { padding: 0; overflow: hidden; }
        .rank-table { width: 100%; border-collapse: collapse; text-align: left; }
        .rank-table th { padding: 20px; background: rgba(255, 255, 255, 0.03); color: #64748b; font-size: 0.75rem; text-transform: uppercase; font-weight: 800; }
        .rank-table td { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 700; color: white; }
        
        .rank-number { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border-radius: 50%; font-size: 0.85rem; }
        .gold-num { background: rgba(212, 175, 55, 0.1); color: #d4af37; border: 1px solid rgba(212, 175, 55, 0.2); }

        .user-cell { display: flex; align-items: center; gap: 10px; }
        .muted { color: #475569; }
        
        .profit-cell span { display: flex; align-items: center; gap: 6px; font-weight: 900; font-size: 1.1rem; }
        .up { color: #10b981; }
        .down { color: #ef4444; }

        .balance-cell { font-family: 'Fira Code', monospace; color: #94a3b8; }
        .status-badge { font-size: 0.65rem; font-weight: 900; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 4px; }
        .empty-msg { text-align: center; padding: 60px !important; color: #475569; font-weight: 700; }

        @media (max-width: 1024px) {
          .top-three { grid-template-columns: 1fr; }
          .rank-1, .rank-2, .rank-3 { height: auto; order: initial; padding: 30px; }
        }
      `}</style>
    </div>
  );
}
