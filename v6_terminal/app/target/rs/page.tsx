"use client";

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { TrendingUp, Zap, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface RSItem {
  rank: number;
  industry: string;
  symbol: string;
  name: string;
  close: string;
  day_chg: string;
  week_chg: string;
  month_chg: string;
  three_month_chg: string;
  six_month_chg: string;
}

const fmt = (v: string) => {
  if (!v) return { text: '-', positive: false };
  const clean = v.replace('%', '').trim();
  const num = parseFloat(clean);
  const positive = num >= 0;
  return { text: v, positive, num };
};

export default function RSPage() {
  const [data, setData] = useState<RSItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/rs_ranking.json')
      .then(res => res.json())
      .then((d: RSItem[]) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const top10 = data.slice(0, 10);

  return (
    <div className="rs-container animate-fade-in">
      <div className="section-header">
        <h1 className="gradient-text">3-e. [ RS ] 상대강도 랭킹 TOP 50</h1>
        <p className="subtitle">IBD RS Rating 기반 · 구글 시트 실시간 연동 · 6개월 상대강도 기준 정렬</p>
      </div>

      <div className="top10-grid">
        {top10.map((item, i) => {
          const sixM = fmt(item.six_month_chg);
          return (
            <GlassCard key={i} className={`top-card ${i < 3 ? 'elite' : ''}`}>
              <div className="top-rank">#{item.rank}</div>
              <div className="top-symbol">{item.symbol}</div>
              <div className="top-name">{item.name}</div>
              <div className="top-industry">{item.industry}</div>
              <div className="top-close">${item.close}</div>
              <div className={`top-rs ${sixM.positive ? 'up' : 'down'}`}>
                {sixM.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                6M: {item.six_month_chg}
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="table-card">
        <div className="table-header-row">
          <span className="th rank-col">순위</span>
          <span className="th sym-col">티커</span>
          <span className="th name-col">종목명</span>
          <span className="th ind-col">산업</span>
          <span className="th close-col">종가</span>
          <span className="th chg-col">일간</span>
          <span className="th chg-col">주간</span>
          <span className="th chg-col">월간</span>
          <span className="th chg-col">3개월</span>
          <span className="th chg-col highlight-col">6개월</span>
        </div>
        {loading ? (
          <div className="loading-state">데이터 동기화 중...</div>
        ) : (
          data.map((item, i) => (
            <div key={i} className={`table-row ${i < 3 ? 'top3' : ''} ${i % 2 === 0 ? 'even' : ''}`}>
              <span className="td rank-col">#{item.rank}</span>
              <span className="td sym-col sym-text">{item.symbol}</span>
              <span className="td name-col name-text">{item.name}</span>
              <span className="td ind-col">{item.industry}</span>
              <span className="td close-col">${item.close}</span>
              <span className={`td chg-col ${fmt(item.day_chg).positive ? 'up' : 'down'}`}>{item.day_chg}</span>
              <span className={`td chg-col ${fmt(item.week_chg).positive ? 'up' : 'down'}`}>{item.week_chg}</span>
              <span className={`td chg-col ${fmt(item.month_chg).positive ? 'up' : 'down'}`}>{item.month_chg}</span>
              <span className={`td chg-col ${fmt(item.three_month_chg).positive ? 'up' : 'down'}`}>{item.three_month_chg}</span>
              <span className={`td chg-col highlight-col ${fmt(item.six_month_chg).positive ? 'up' : 'down'}`}>{item.six_month_chg}</span>
            </div>
          ))
        )}
      </GlassCard>

      <div className="tactical-notes glass">
        <h3>[ BONDE'S TACTICAL NOTES ]</h3>
        <ul>
          <li>● RS는 시장의 절대적 지표다. 시장이 빠질 때 버티는 놈이 대장이다.</li>
          <li>● RS 90 이상의 종목은 이미 검증된 전사들이다.</li>
          <li>● 지수 대비 강한 흐름을 보이는 종목을 찾는 것이 본데의 핵심 기술이다.</li>
        </ul>
      </div>

      <style jsx>{`
        .rs-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .section-header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: var(--text-muted); font-family: 'Orbitron', sans-serif; letter-spacing: 1px; }

        .top10-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
        .top-card { padding: 20px; text-align: center; border: 1px solid var(--card-border); transition: all 0.3s; }
        .top-card:hover { border-color: #10b981; box-shadow: 0 0 20px rgba(16,185,129,0.1); }
        .top-card.elite { border-color: #fbbf24; box-shadow: 0 0 20px rgba(251,191,36,0.1); }
        .top-rank { font-size: 0.7rem; font-weight: 900; color: var(--primary); margin-bottom: 8px; }
        .top-symbol { font-size: 1.3rem; font-weight: 900; color: white; }
        .top-name { font-size: 0.65rem; color: var(--text-muted); font-weight: 600; margin: 4px 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .top-industry { font-size: 0.6rem; color: rgba(255,255,255,0.3); font-weight: 700; margin-bottom: 8px; }
        .top-close { font-size: 0.85rem; font-weight: 800; color: white; margin-bottom: 6px; }
        .top-rs { font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .top-rs.up { color: #ef4444; }
        .top-rs.down { color: #3b82f6; }

        .table-card { padding: 0; overflow-x: auto; }
        .table-header-row { display: flex; padding: 14px 20px; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--card-border); min-width: 900px; }
        .th { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }

        .table-row { display: flex; padding: 10px 20px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.2s; min-width: 900px; }
        .table-row:hover { background: rgba(16,185,129,0.03); }
        .table-row.even { background: rgba(255,255,255,0.01); }
        .table-row.top3 { background: rgba(251,191,36,0.03); }
        .td { font-size: 0.8rem; font-weight: 600; color: white; }

        .rank-col { width: 50px; flex-shrink: 0; }
        .sym-col { width: 70px; flex-shrink: 0; }
        .name-col { width: 180px; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ind-col { width: 150px; flex-shrink: 0; font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .close-col { width: 80px; flex-shrink: 0; }
        .chg-col { width: 70px; flex-shrink: 0; font-size: 0.75rem; font-weight: 800; }

        .sym-text { font-weight: 900; color: white; }
        .name-text { font-size: 0.75rem; color: var(--text-muted); }
        .up { color: #ef4444; }
        .down { color: #3b82f6; }
        .highlight-col { font-weight: 900 !important; }

        .loading-state { padding: 60px; text-align: center; color: var(--text-muted); font-weight: 800; }
      `}</style>
    </div>
  );
}
