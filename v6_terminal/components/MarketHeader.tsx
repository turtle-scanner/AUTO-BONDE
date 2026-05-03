"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, ArrowUp, ArrowDown, Minus, Clock, Globe } from 'lucide-react';

export default function MarketHeader() {
  const [marketIndices, setMarketIndices] = useState({
    kospi: { val: "2,712.35", change: "+0.45%", trend: "up" },
    kosdaq: { val: "862.15", change: "-0.12%", trend: "down" },
    nasdaq: { val: "16,156.33", change: "+1.24%", trend: "up" },
    sp500: { val: "5,123.41", change: "+0.88%", trend: "up" },
    dow: { val: "38,675.68", change: "+0.72%", trend: "up" },
    exchange: { val: "1,372.50", change: "+2.50", trend: "up" }
  });

  const [weather, setWeather] = useState({
    label: "맑음 (Bullish)",
    icon: <Sun size={20} className="weather-sun" />,
    color: "#fbbf24"
  });

  // 시장 분위기 자동 시뮬레이션 (실제로는 API 연동 가능)
  useEffect(() => {
    const upCount = [marketIndices.kospi, marketIndices.nasdaq, marketIndices.sp500].filter(i => i.trend === 'up').length;
    if (upCount >= 2) {
      setWeather({ label: "쾌청 (Very Bullish)", icon: <Sun size={20} className="weather-sun" />, color: "#fbbf24" });
    } else {
      setWeather({ label: "흐림 (Neutral)", icon: <Cloud size={20} className="weather-cloud" />, color: "#94a3b8" });
    }
  }, []);

  const MarketItem = ({ label, data }: { label: string, data: any }) => (
    <div className="market-item">
      <span className="m-label">{label}</span>
      <span className="m-val">{data.val}</span>
      <span className={`m-change ${data.trend}`}>
        {data.trend === 'up' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
        {data.change}
      </span>
    </div>
  );

  return (
    <div className="market-header-bar glass">
      {/* 1. Market Weather */}
      <div className="weather-section">
        <div className="weather-icon-box" style={{ color: weather.color }}>
          {weather.icon}
        </div>
        <div className="weather-info">
          <span className="w-label">시장 기상도</span>
          <span className="w-status" style={{ color: weather.color }}>{weather.label}</span>
        </div>
      </div>

      {/* 2. Ticker Indices */}
      <div className="indices-ticker">
        <div className="ticker-track">
          <MarketItem label="KOSPI" data={marketIndices.kospi} />
          <MarketItem label="KOSDAQ" data={marketIndices.kosdaq} />
          <MarketItem label="NASDAQ" data={marketIndices.nasdaq} />
          <MarketItem label="S&P 500" data={marketIndices.sp500} />
          <MarketItem label="DOW" data={marketIndices.dow} />
          <MarketItem label="USD/KRW" data={marketIndices.exchange} />
        </div>
      </div>

      {/* 3. Market Sessions */}
      <div className="sessions-section">
        <div className="session-box">
          <div className="s-header">
            <Globe size={12} className="icon-blue" />
            <span>KOREA</span>
          </div>
          <div className="s-times">09:00 - 15:30</div>
        </div>
        <div className="session-divider"></div>
        <div className="session-box">
          <div className="s-header">
            <Globe size={12} className="icon-gold" />
            <span>USA (NY)</span>
          </div>
          <div className="s-times">22:30 - 05:00</div>
        </div>
      </div>

      <style jsx>{`
        .market-header-bar {
          height: 60px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
        }

        /* Weather */
        .weather-section { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .weather-icon-box { 
          width: 36px; height: 36px; background: rgba(255,255,255,0.03); 
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
        }
        .weather-info { display: flex; flex-direction: column; }
        .w-label { font-size: 0.65rem; font-weight: 800; color: #64748b; text-transform: uppercase; }
        .w-status { font-size: 0.85rem; font-weight: 900; }

        /* Ticker */
        .indices-ticker { flex: 1; overflow: hidden; position: relative; }
        .ticker-track { display: flex; gap: 30px; }
        .market-item { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .m-label { font-size: 0.7rem; font-weight: 900; color: #94a3b8; }
        .m-val { font-size: 0.85rem; font-weight: 800; color: #f2f2f2; font-family: 'Fira Code', monospace; }
        .m-change { display: flex; align-items: center; gap: 2px; font-size: 0.75rem; font-weight: 700; }
        .m-change.up { color: #f87171; }
        .m-change.down { color: #60a5fa; }

        /* Sessions */
        .sessions-section { display: flex; align-items: center; gap: 16px; flex-shrink: 0; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
        .session-box { display: flex; flex-direction: column; gap: 2px; }
        .s-header { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 900; color: #94a3b8; }
        .s-times { font-size: 0.75rem; font-weight: 800; color: #cbd5e1; font-family: 'Fira Code', monospace; }
        .session-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }
        
        .icon-blue { color: #3b82f6; }
        .icon-gold { color: #fbbf24; }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
