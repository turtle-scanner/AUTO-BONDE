"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Map, RefreshCw, ChevronDown } from 'lucide-react';

export default function HeatmapPage() {
  const [isSyncing, setIsSyncing] = useState(false);

  // Mock heatmap data (100 leading stocks)
  const generateData = () => {
    const stocks = ["NVDA", "AAPL", "MSFT", "TSLA", "삼성전자", "SK하이닉스", "AMD", "META", "GOOGL", "AVGO", "AMZN", "NFLX"];
    return Array.from({ length: 60 }).map((_, i) => ({
      ticker: stocks[i % stocks.length] || `STOCK-${i}`,
      change: (Math.random() * 10 - 5).toFixed(2),
      isUp: Math.random() > 0.4
    }));
  };

  const [heatmapData, setHeatmapData] = useState(generateData());

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setHeatmapData(generateData());
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="heatmap-container animate-fade-in">
      <div className="heatmap-header">
        <h1 className="heatmap-title">
          <Map size={32} className="title-icon" /> [ MAP ] 실시간 주도주 히트맵 (Nasdaq / KOSPI / KOSDAQ)
        </h1>
        <div className="heatmap-notice glass">
          글로벌 및 국내 주도주 100선의 실시간 수급 현황입니다. <span className="up-txt">(빨강: 상승)</span> / <span className="down-txt">(파랑: 하락)</span>
        </div>
      </div>

      <div className="action-bar">
        <button className={`sync-btn glass ${isSyncing ? 'loading' : ''}`} onClick={handleSync}>
          <RefreshCw size={16} className={isSyncing ? "rotating" : ""} /> [ SYNC ] 히트맵 데이터 동기화
        </button>
      </div>

      <div className="heatmap-grid glass">
        {heatmapData.map((item, i) => {
          const strength = Math.abs(parseFloat(item.change)) / 5;
          const bgColor = item.isUp 
            ? `rgba(255, 0, 85, ${0.1 + strength * 0.8})` 
            : `rgba(14, 165, 233, ${0.1 + strength * 0.8})`;
          
          return (
            <div 
              key={i} 
              className="heatmap-cell"
              style={{ backgroundColor: bgColor }}
            >
              <span className="cell-ticker">{item.ticker}</span>
              <span className="cell-change">{item.isUp ? '+' : ''}{item.change}%</span>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .heatmap-container {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .heatmap-title {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .title-icon { color: var(--primary); }

        .heatmap-notice {
          padding: 24px;
          margin-top: 16px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .up-txt { color: #ff0055; font-weight: 800; }
        .down-txt { color: #0ea5e9; font-weight: 800; }

        .action-bar {
          margin-top: 12px;
        }

        .sync-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #ff0055;
          border: 1px solid rgba(255, 0, 85, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .sync-btn:hover {
          background: rgba(255, 0, 85, 0.1);
          border-color: #ff0055;
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 4px;
          padding: 12px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.3);
          min-height: 500px;
        }

        .heatmap-cell {
          height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.3s;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .heatmap-cell:hover {
          transform: scale(1.05);
          z-index: 10;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          border-color: white;
        }

        .cell-ticker {
          font-size: 0.85rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .cell-change {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Fira Code', monospace;
        }

        .rotating { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .loading { opacity: 0.7; pointer-events: none; }
      `}</style>
    </div>
  );
}
