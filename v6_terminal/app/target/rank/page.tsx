"use client";

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Trophy, TrendingUp, Target, Crown, Medal, Award } from 'lucide-react';

interface RankItem {
  ticker: string;
  recent: number;
  total: number;
  score: number;
}

export default function RankPage() {
  const [data, setData] = useState<RankItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/watchlist.json')
      .then(res => res.json())
      .then((d: RankItem[]) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getRankIcon = (i: number) => {
    if (i === 0) return <Crown size={20} className="rank-icon gold" />;
    if (i === 1) return <Medal size={20} className="rank-icon silver" />;
    if (i === 2) return <Award size={20} className="rank-icon bronze" />;
    return <span className="rank-num">#{i + 1}</span>;
  };

  const maxScore = data.length > 0 ? data[0].score : 1;

  return (
    <div className="rank-container animate-fade-in">
      <div className="rank-header">
        <div className="header-top">
          <h1 className="rank-title">
            <Trophy size={32} className="title-icon" /> [ RANK ] 주도주 랭킹 TOP 50
          </h1>
          <span className="rank-badge-live">DATA SYNCED</span>
        </div>
        <p className="rank-subtitle">구글 시트 빅데이터 기반 · 최근 언급 빈도 + 누적 스코어 종합 랭킹</p>
      </div>

      {/* Tactical Banner */}
      <div className="tactical-banner glass">
        <div className="banner-content">
          <span className="banner-tag">[ BONDE'S TACTICAL NOTES ]</span>
          <p className="banner-text">
            "순위는 거짓말을 하지 않는다. 언급 빈도가 높아진다는 것은 기관과 세력의 관심이 쏠리고 있다는 증거다. 
            TOP 3 종목의 RS(상대강도) 변화를 매일 아침 9시 이전에 반드시 체크하라."
          </p>
        </div>
      </div>

      <div className="podium">
        {data.slice(0, 3).map((item, i) => (
          <GlassCard key={i} className={`podium-card pos-${i}`}>
            <div className="podium-rank">{getRankIcon(i)}</div>
            <div className="podium-ticker">{item.ticker}</div>
            <div className="podium-score">{item.score} pts</div>
            <div className="podium-details">
              <span>최근 {item.recent}회</span>
              <span>누적 {item.total}회</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="table-card">
        <div className="table-header-row">
          <span className="th rank-col">순위</span>
          <span className="th ticker-col">티커</span>
          <span className="th recent-col">최근 언급</span>
          <span className="th total-col">누적 빈도</span>
          <span className="th score-col">종합 스코어</span>
          <span className="th bar-col">파워 게이지</span>
        </div>
        {loading ? (
          <div className="loading-state">데이터 동기화 중...</div>
        ) : (
          data.map((item, i) => (
            <div key={i} className={`table-row ${i < 3 ? 'top3' : ''} ${i % 2 === 0 ? 'even' : ''}`}>
              <span className="td rank-col">{getRankIcon(i)}</span>
              <span className="td ticker-col ticker-text">{item.ticker}</span>
              <span className="td recent-col highlight">{item.recent}회</span>
              <span className="td total-col">{item.total}회</span>
              <span className="td score-col score-text">{item.score}</span>
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
        .rank-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .rank-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: #fbbf24; }
        .rank-subtitle { color: var(--text-muted); font-size: 1rem; margin-top: 8px; }

        .podium { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
        .podium-card { padding: 32px; text-align: center; border: 1px solid var(--card-border); }
        .podium-card.pos-0 { border-color: #fbbf24; box-shadow: 0 0 30px rgba(251,191,36,0.15); }
        .podium-card.pos-1 { border-color: #94a3b8; box-shadow: 0 0 20px rgba(148,163,184,0.1); }
        .podium-card.pos-2 { border-color: #cd7f32; box-shadow: 0 0 20px rgba(205,127,50,0.1); }
        .podium-rank { margin-bottom: 12px; }
        .podium-ticker { font-size: 2rem; font-weight: 900; color: white; letter-spacing: -0.02em; }
        .podium-score { font-size: 1.2rem; font-weight: 800; color: var(--primary); margin: 8px 0; }
        .podium-details { display: flex; justify-content: center; gap: 16px; font-size: 0.8rem; color: var(--text-muted); font-weight: 700; }

        .rank-icon.gold { color: #fbbf24; }
        .rank-icon.silver { color: #94a3b8; }
        .rank-icon.bronze { color: #cd7f32; }
        .rank-num { font-size: 0.8rem; font-weight: 900; color: var(--text-muted); }

        .table-card { padding: 0; overflow: hidden; }
        .table-header-row { display: flex; padding: 16px 24px; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--card-border); }
        .th { font-size: 0.7rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; }

        .table-row { display: flex; padding: 14px 24px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.2s; }
        .table-row:hover { background: rgba(0, 242, 255, 0.03); }
        .table-row.even { background: rgba(255,255,255,0.01); }
        .table-row.top3 { background: rgba(251,191,36,0.03); }
        .td { font-size: 0.85rem; font-weight: 700; color: white; }

        .rank-col { width: 60px; flex-shrink: 0; }
        .ticker-col { width: 100px; flex-shrink: 0; }
        .recent-col { width: 100px; flex-shrink: 0; }
        .total-col { width: 100px; flex-shrink: 0; }
        .score-col { width: 120px; flex-shrink: 0; }
        .bar-col { flex: 1; }

        .ticker-text { font-weight: 900; letter-spacing: 0.02em; }
        .highlight { color: var(--primary); }
        .score-text { color: #fbbf24; font-weight: 900; }

        .power-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; }
        .power-bar { height: 100%; border-radius: 3px; background: linear-gradient(to right, var(--primary), #fbbf24); transition: width 0.5s ease; }

        .loading-state { padding: 60px; text-align: center; color: var(--text-muted); font-weight: 800; }
      `}</style>
    </div>
  );
}
