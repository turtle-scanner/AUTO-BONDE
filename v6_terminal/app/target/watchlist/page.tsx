"use client";

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Eye, TrendingUp, BarChart3, Star, Zap, RefreshCw } from 'lucide-react';

interface WatchItem {
  ticker: string;
  recent: number;
  total: number;
  score: number;
}

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/watchlist.json')
      .then(res => res.json())
      .then(data => {
        setWatchlist(data);
        setLoading(false);
      })
      .catch(err => console.error("Error loading watchlist:", err));
  }, []);

  return (
    <div className="watch-container animate-fade-in">
      <div className="section-header">
        <h1 className="gradient-text">3-c. [ WATCH ] 본대 정예 감시 리스트</h1>
        <p className="subtitle">빅데이터 분석을 통해 도출된 시장 주도주 및 고빈도 언급 종목입니다.</p>
      </div>

      <div className="watch-stats">
        <GlassCard className="mini-stat">
          <Star size={20} className="icon-gold" />
          <div className="stat-info">
            <span className="stat-label">분석 대상 티커</span>
            <span className="stat-val">250+</span>
          </div>
        </GlassCard>
        <GlassCard className="mini-stat">
          <Zap size={20} className="icon-cyan" />
          <div className="stat-info">
            <span className="stat-label">실시간 주도주</span>
            <span className="stat-val">{watchlist.slice(0, 5).map(w => w.ticker).join(', ')}</span>
          </div>
        </GlassCard>
        <GlassCard className="mini-stat">
          <RefreshCw size={20} className="icon-green" />
          <div className="stat-info">
            <span className="stat-label">최종 동기화</span>
            <span className="stat-val">Just Now</span>
          </div>
        </GlassCard>
      </div>

      <div className="watch-grid">
        {loading ? (
          <div className="loading-state">데이터 동기화 중...</div>
        ) : (
          watchlist.map((item, i) => (
            <GlassCard key={i} className="ticker-card">
              <div className="ticker-top">
                <span className="ticker-symbol">{item.ticker}</span>
                <div className="rank-badge">#{i + 1}</div>
              </div>
              <div className="ticker-data">
                <div className="data-row">
                  <span className="data-label">최근 언급</span>
                  <span className="data-val highlight">{item.recent}회</span>
                </div>
                <div className="data-row">
                  <span className="data-label">누적 빈도</span>
                  <span className="data-val">{item.total}회</span>
                </div>
                <div className="score-bar-container">
                  <div className="score-bar" style={{ width: `${Math.min(item.score / 5, 100)}%` }}></div>
                </div>
              </div>
              <div className="ticker-footer">
                <button className="analysis-btn">전술 차트 보기</button>
              </div>
            </GlassCard>
          ))
        )}
      </div>

      <div className="tactical-notes glass">
        <h3>[ BONDE'S TACTICAL NOTES ]</h3>
        <ul>
          <li>● 감시 리스트는 관심의 시작이다. 패턴이 완성될 때까지 인내하라.</li>
          <li>● 빈도가 높은 종목일수록 기관의 매집 가능성이 높다.</li>
          <li>● 타점이 오지 않으면 총을 쏘지 않는다.</li>
        </ul>
      </div>

      <style jsx>{`
        .watch-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .section-header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: var(--text-muted); font-family: 'Orbitron', sans-serif; letter-spacing: 1px; }

        .watch-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .mini-stat { padding: 20px; display: flex; align-items: center; gap: 20px; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .stat-val { font-size: 1.1rem; font-weight: 900; color: white; }
        
        .icon-gold { color: #fbbf24; }
        .icon-cyan { color: var(--primary); }
        .icon-green { color: #10b981; }

        .watch-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
        
        .ticker-card { padding: 24px; transition: all 0.3s; border: 1px solid var(--card-border); }
        .ticker-card:hover { transform: translateY(-5px); border-color: var(--primary); box-shadow: 0 10px 30px rgba(0, 242, 255, 0.1); }
        
        .ticker-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .ticker-symbol { font-size: 1.5rem; font-weight: 900; color: white; letter-spacing: -0.02em; }
        .rank-badge { background: rgba(0, 242, 255, 0.1); color: var(--primary); padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 900; border: 1px solid rgba(0, 242, 255, 0.2); }

        .ticker-data { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .data-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
        .data-label { color: var(--text-muted); font-weight: 600; }
        .data-val { color: white; font-weight: 800; }
        .data-val.highlight { color: var(--primary); }

        .score-bar-container { width: 100%; height: 4px; background: rgba(255,255,255,0.05); border-radius: 2px; margin-top: 8px; }
        .score-bar { height: 100%; background: linear-gradient(to right, var(--primary), var(--secondary)); border-radius: 2px; }

        .analysis-btn { width: 100%; padding: 10px; border-radius: 6px; background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); color: var(--text-muted); font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.2s; }
        .analysis-btn:hover { background: var(--primary); color: black; border-color: var(--primary); }

        .loading-state { grid-column: 1 / -1; text-align: center; padding: 100px; color: var(--text-muted); font-weight: 800; }
      `}</style>
    </div>
  );
}
