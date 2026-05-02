"use client";

import React, { useState } from 'react';
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
  Waves
} from 'lucide-react';

export default function MarketIntelligenceUpgrade() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // 지수 샘플 데이터
  const indices = [
    { name: 'NASDAQ', value: '16,274.95', change: '+1.15%', isUp: true },
    { name: 'S&P 500', value: '5,123.41', change: '+0.85%', isUp: true },
    { name: 'KOSPI', value: '2,682.12', change: '-0.32%', isUp: false },
    { name: 'USD/KRW', value: '1,372.50', change: '+4.20', isUp: true },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="market-intel-container animate-fade-in">
      {/* Header */}
      <div className="intel-header">
        <div className="header-left">
          <h1 className="intel-title">
            <Activity className="title-icon" /> MARKET INTELLIGENCE
          </h1>
          <p className="intel-subtitle">전 세계 시장의 거시적 흐름과 미시적 속보를 실시간으로 교차 분석합니다.</p>
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="news-item">
                <div className="news-time">14:{30 - i * 5}</div>
                <div className="news-content-box">
                  <div className="news-meta">
                    <span className="news-source">BLOOMBERG</span>
                    <span className="news-impact high">HIGH IMPACT</span>
                  </div>
                  <div className="news-text">
                    {i === 1 ? "U.S. Tech Giants Surge as AI Infrastructure Spending Reaches Record Highs" : 
                     i === 2 ? "Federal Reserve Officials Hint at 'Higher for Longer' Interest Rate Strategy" :
                     i === 3 ? "South Korean Export Data Shows Robust Growth in Semiconductor Sector" :
                     "Global Oil Markets React to Heightened Geopolitical Tensions in Energy Corridors"}
                  </div>
                </div>
              </div>
            ))}
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
              "현재 시장은 나스닥 중심의 강한 매수세가 유입되고 있으나, 국채 금리 상승으로 인한 변동성 확대에 유의하십시오. 2,680선 지지 여부가 단기 향방을 결정할 것으로 보입니다."
            </div>
            <div className="briefing-footer">
              COMMANDER'S DIRECTION: <span className="highlight">HOLD / ACCUMULATE</span>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .market-intel-container {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          color: white;
        }

        .intel-header { display: flex; justify-content: space-between; align-items: center; }
        .intel-title { font-size: 1.8rem; font-weight: 900; display: flex; align-items: center; gap: 12px; letter-spacing: -1px; }
        .title-icon { color: var(--gold-400); }
        .intel-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .refresh-btn {
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--gold-400);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        /* Indices */
        .indices-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .index-card { padding: 16px 20px; }
        .index-name { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); margin-bottom: 8px; }
        .index-value-group { display: flex; justify-content: space-between; align-items: baseline; }
        .index-value { font-size: 1.2rem; font-weight: 900; }
        .index-change { font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 4px; }
        .index-change.up { color: #10b981; }
        .index-change.down { color: #ef4444; }

        /* Layout */
        .main-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 30px;
        }

        .section-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }

        .news-list { display: flex; flex-direction: column; gap: 20px; }
        .news-item { display: flex; gap: 15px; }
        .news-time { font-size: 0.8rem; font-weight: 900; color: var(--gold-400); width: 45px; margin-top: 4px; }
        
        .news-content-box {
          flex: 1;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .news-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .news-source { font-size: 0.6rem; font-weight: 900; color: var(--text-muted); }
        .news-impact { font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 4px; }
        .news-impact.high { background: rgba(255, 0, 85, 0.1); color: #ff0055; }

        .news-text { font-size: 1rem; font-weight: 700; line-height: 1.4; color: rgba(255, 255, 255, 0.9); }

        /* Side Section */
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

        .rotating { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .loading { opacity: 0.5; pointer-events: none; }
      `}</style>
    </div>
  );
}
