"use client";

import React, { useState, useEffect } from 'react';
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
  Filter,
  Globe,
  Flag
} from 'lucide-react';

interface HeatmapStock {
  ticker: string;
  change: number;
  cap: string;
}

interface HeatmapSector {
  name: string;
  stocks: HeatmapStock[];
}

interface HeatmapData {
  US: HeatmapSector[];
  KR: HeatmapSector[];
}

export default function MarketHeatmapUpgrade() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeMarket, setActiveMarket] = useState<'US' | 'KR'>('US');
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);

  useEffect(() => {
    fetchHeatmap();
  }, []);

  const fetchHeatmap = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/v6-api/market-heatmap');
      const data = await res.json();
      setHeatmapData(data);
    } catch (err) {
      console.error("Heatmap fetch failed", err);
    } finally {
      setTimeout(() => setIsSyncing(false), 800);
    }
  };

  const sectors = heatmapData ? heatmapData[activeMarket] : [];
  
  const allStocks = sectors.flatMap(s => s.stocks);
  const topGainer = allStocks.length > 0 ? [...allStocks].sort((a, b) => b.change - a.change)[0] : null;
  const topLoser = allStocks.length > 0 ? [...allStocks].sort((a, b) => a.change - b.change)[0] : null;
  const avgChange = allStocks.length > 0 ? allStocks.reduce((acc, s) => acc + s.change, 0) / allStocks.length : 0;

  return (
    <div className="heatmap-upgrade-container animate-fade-in">
      <div className="heatmap-header">
        <div className="header-left">
          <h1 className="heatmap-title">
            <Map className="title-icon" /> {activeMarket === 'US' ? 'US MARKET' : 'KR MARKET'} HEATMAP
          </h1>
          <p className="heatmap-subtitle">????®Î∫£Îπ?????????????Ô¶´ÎöÆ?èÊè¥Ôø???®Î£∏?????(RS ???ÔøΩÎõæ?ÔøΩÍ∂ñ?ËΩÖÍ≥ó??????®Î£∏Îπ??ÔøΩÎá°ÔøΩÏä£Á∂?øΩ??</p>
        </div>
        <div className="header-right">
          <div className="market-toggle glass">
            <button className={`m-btn ${activeMarket === 'US' ? 'active' : ''}`} onClick={() => setActiveMarket('US')}>
              <Globe size={14} /> US
            </button>
            <button className={`m-btn ${activeMarket === 'KR' ? 'active' : ''}`} onClick={() => setActiveMarket('KR')}>
              <Flag size={14} /> KR
            </button>
          </div>
          <button className={`sync-btn ${isSyncing ? 'loading' : ''}`} onClick={fetchHeatmap}>
            <RefreshCw size={16} className={isSyncing ? "rotating" : ""} /> {isSyncing ? 'SYNCING...' : 'LIVE SYNC'}
          </button>
        </div>
      </div>

      <div className="indicators-grid">
        <GlassCard className="indicator-card sentiment">
          <div className="indicator-label"><Zap size={14} /> MARKET MOMENTUM (AVG)</div>
          <div className="sentiment-bar">
            <div className="bar-fill" style={{ width: `${50 + avgChange * 5}%` }}></div>
            <div className="bar-pointer" style={{ left: `${50 + avgChange * 5}%` }}></div>
          </div>
          <div className="sentiment-labels">
            <span>BEARISH</span>
            <span className="current-status">{avgChange > 0 ? 'BULLISH' : 'CAUTIOUS'} ({avgChange.toFixed(2)}%)</span>
            <span>BULLISH</span>
          </div>
        </GlassCard>

        <GlassCard className="indicator-card">
          <div className="indicator-label"><Flame size={14} /> SECTOR LEADER</div>
          {topGainer && (
            <div className="top-stock positive">
              <span className="stock-symbol">{topGainer.ticker}</span>
              <span className="stock-val">+{topGainer.change}%</span>
            </div>
          )}
        </GlassCard>

        <GlassCard className="indicator-card">
          <div className="indicator-label"><Snowflake size={14} /> WEAKEST POINT</div>
          {topLoser && (
            <div className="top-stock negative">
              <span className="stock-symbol">{topLoser.ticker}</span>
              <span className="stock-val">{topLoser.change}%</span>
            </div>
          )}
        </GlassCard>
      </div>

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
        .heatmap-upgrade-container { padding: 30px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .heatmap-header { display: flex; justify-content: space-between; align-items: center; }
        .heatmap-title { font-size: 1.8rem; font-weight: 900; display: flex; align-items: center; gap: 12px; letter-spacing: -1px; }
        .title-icon { color: var(--gold-400); }
        .heatmap-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .header-right { display: flex; gap: 15px; align-items: center; }
        .market-toggle { display: flex; padding: 4px; border-radius: 10px; background: rgba(255,255,255,0.05); }
        .m-btn { display: flex; align-items: center; gap: 6px; padding: 6px 16px; border-radius: 8px; border: none; background: none; color: #64748b; font-size: 0.75rem; font-weight: 800; cursor: pointer; transition: all 0.2s; }
        .m-btn.active { background: white; color: black; }

        .sync-btn { background: var(--primary); border: none; color: black; padding: 8px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s; }
        .sync-btn:hover { transform: scale(1.05); }

        .indicators-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 20px; }
        .indicator-card { padding: 16px 20px; }
        .indicator-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
        
        .sentiment-bar { height: 8px; background: rgba(255, 255, 255, 0.05); border-radius: 4px; position: relative; overflow: visible; background: linear-gradient(to right, #ef4444, #f59e0b, #10b981); }
        .bar-pointer { width: 4px; height: 16px; background: white; position: absolute; top: -4px; border-radius: 2px; box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .sentiment-labels { display: flex; justify-content: space-between; margin-top: 12px; font-size: 0.7rem; font-weight: 700; color: var(--text-muted); }
        .current-status { color: white; font-weight: 900; }

        .top-stock { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
        .top-stock .stock-symbol { font-size: 1.5rem; font-weight: 900; }
        .top-stock .stock-val { font-size: 1.1rem; font-weight: 800; }
        .top-stock.positive { color: #10b981; }
        .top-stock.negative { color: #ef4444; }

        .sectors-container { display: flex; flex-direction: column; gap: 40px; }
        .sector-header { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
        .sector-name { font-size: 0.9rem; font-weight: 900; color: var(--gold-400); white-space: nowrap; }
        .sector-line { flex: 1; height: 1px; background: linear-gradient(to right, rgba(212, 175, 55, 0.3), transparent); }

        .sector-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
        .heatmap-cell { height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
        .heatmap-cell:hover { transform: scale(1.05); z-index: 10; box-shadow: 0 0 15px rgba(255, 255, 255, 0.1); }
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
