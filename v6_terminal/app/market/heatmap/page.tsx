"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Map, 
  RefreshCw, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Flame,
  Snowflake,
  Filter
} from 'lucide-react';

export default function MarketHeatmapUpgrade() {
  const [isSyncing, setIsSyncing] = useState(false);

  // 섹터별 샘플 데이터
  const sectors = [
    { name: 'BIG TECH', stocks: [
      { ticker: 'NVDA', change: +4.2, cap: 'Large' },
      { ticker: 'AAPL', change: -0.5, cap: 'Large' },
      { ticker: 'MSFT', change: +1.2, cap: 'Large' },
      { ticker: 'GOOGL', change: +0.8, cap: 'Medium' },
      { ticker: 'META', change: +2.1, cap: 'Medium' },
      { ticker: 'AMZN', change: -1.1, cap: 'Medium' },
    ]},
    { name: 'SEMICONDUCTOR', stocks: [
      { ticker: 'AMD', change: +3.5, cap: 'Large' },
      { ticker: 'AVGO', change: +1.8, cap: 'Medium' },
      { ticker: 'ASML', change: +2.2, cap: 'Medium' },
      { ticker: 'MU', change: +5.1, cap: 'Small' },
      { ticker: 'INTC', change: -2.4, cap: 'Small' },
    ]},
    { name: 'EV & AUTO', stocks: [
      { ticker: 'TSLA', change: -3.8, cap: 'Large' },
      { ticker: 'RIVN', change: -5.2, cap: 'Small' },
      { ticker: 'LCID', change: -4.1, cap: 'Small' },
      { ticker: 'F', change: +0.2, cap: 'Small' },
      { ticker: 'GM', change: +0.5, cap: 'Small' },
    ]},
    { name: 'FINANCE', stocks: [
      { ticker: 'JPM', change: +0.5, cap: 'Medium' },
      { ticker: 'BAC', change: +0.3, cap: 'Medium' },
      { ticker: 'GS', change: -0.2, cap: 'Small' },
      { ticker: 'MS', change: +0.1, cap: 'Small' },
    ]}
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="heatmap-upgrade-container animate-fade-in">
      {/* Header */}
      <div className="heatmap-header">
        <div className="header-left">
          <h1 className="heatmap-title">
            <Map className="title-icon" /> MARKET FLOW HEATMAP
          </h1>
          <p className="heatmap-subtitle">전 세계 주요 섹터 및 종목들의 실시간 자금 흐름을 시각화합니다.</p>
        </div>
        <div className="header-right">
          <button className={`sync-btn ${isSyncing ? 'loading' : ''}`} onClick={handleSync}>
            <RefreshCw size={16} className={isSyncing ? "rotating" : ""} /> REFRESH DATA
          </button>
        </div>
      </div>

      {/* Top Indicators */}
      <div className="indicators-grid">
        <GlassCard className="indicator-card sentiment">
          <div className="indicator-label"><Zap size={14} /> MARKET SENTIMENT</div>
          <div className="sentiment-bar">
            <div className="bar-fill" style={{ width: '68%' }}></div>
            <div className="bar-pointer" style={{ left: '68%' }}></div>
          </div>
          <div className="sentiment-labels">
            <span>FEAR</span>
            <span className="current-status">NEUTRAL / BULLISH</span>
            <span>GREED</span>
          </div>
        </GlassCard>

        <GlassCard className="indicator-card">
          <div className="indicator-label"><Flame size={14} /> TOP GAINER</div>
          <div className="top-stock positive">
            <span className="stock-symbol">MU</span>
            <span className="stock-val">+5.12%</span>
          </div>
        </GlassCard>

        <GlassCard className="indicator-card">
          <div className="indicator-label"><Snowflake size={14} /> TOP LOSER</div>
          <div className="top-stock negative">
            <span className="stock-symbol">RIVN</span>
            <span className="stock-val">-5.24%</span>
          </div>
        </GlassCard>
      </div>

      {/* Heatmap Grid */}
      <div className="sectors-container">
        {sectors.map((sector) => (
          <div key={sector.name} className="sector-group">
            <div className="sector-header">
              <span className="sector-name">{sector.name}</span>
              <span className="sector-line"></span>
            </div>
            <div className="sector-grid">
              {sector.stocks.map((stock) => {
                const isPositive = stock.change >= 0;
                const strength = Math.min(Math.abs(stock.change) / 5, 1);
                const bgColor = isPositive 
                  ? `rgba(16, 185, 129, ${0.1 + strength * 0.8})` 
                  : `rgba(239, 68, 68, ${0.1 + strength * 0.8})`;
                
                return (
                  <div 
                    key={stock.ticker} 
                    className={`heatmap-cell ${stock.cap.toLowerCase()}`}
                    style={{ backgroundColor: bgColor, border: `1px solid ${isPositive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}
                  >
                    <span className="cell-ticker">{stock.ticker}</span>
                    <span className="cell-change">{isPositive ? '+' : ''}{stock.change}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .heatmap-upgrade-container {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          color: white;
        }

        .heatmap-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .heatmap-title {
          font-size: 1.8rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -1px;
        }

        .title-icon { color: var(--gold-400); }
        .heatmap-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .sync-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sync-btn:hover { background: rgba(255, 255, 255, 0.1); }

        /* Indicators */
        .indicators-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 20px;
        }

        .indicator-card { padding: 16px 20px; }
        .indicator-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
        
        .sentiment-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          position: relative;
          overflow: visible;
          background: linear-gradient(to right, #ef4444, #f59e0b, #10b981);
        }

        .bar-pointer {
          width: 4px;
          height: 16px;
          background: white;
          position: absolute;
          top: -4px;
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
          transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sentiment-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .current-status { color: white; font-weight: 900; }

        .top-stock { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
        .top-stock .stock-symbol { font-size: 1.5rem; font-weight: 900; }
        .top-stock .stock-val { font-size: 1.1rem; font-weight: 800; }
        .top-stock.positive { color: #10b981; }
        .top-stock.negative { color: #ef4444; }

        /* Heatmap Grid */
        .sectors-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .sector-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .sector-name { font-size: 0.9rem; font-weight: 900; color: var(--gold-400); white-space: nowrap; }
        .sector-line { flex: 1; height: 1px; background: linear-gradient(to right, rgba(212, 175, 55, 0.3), transparent); }

        .sector-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 8px;
        }

        .heatmap-cell {
          height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .heatmap-cell:hover {
          transform: scale(1.05);
          z-index: 10;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
        }

        .heatmap-cell.large { grid-column: span 2; grid-row: span 2; height: 168px; }
        .heatmap-cell.medium { grid-column: span 1; grid-row: span 2; height: 168px; }

        .cell-ticker { font-weight: 900; font-size: 1rem; }
        .large .cell-ticker { font-size: 1.8rem; }
        .medium .cell-ticker { font-size: 1.3rem; }

        .cell-change { font-size: 0.75rem; font-weight: 700; opacity: 0.9; }
        .large .cell-change { font-size: 1rem; }

        .rotating { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .loading { opacity: 0.5; pointer-events: none; }
      `}</style>
    </div>
  );
}
