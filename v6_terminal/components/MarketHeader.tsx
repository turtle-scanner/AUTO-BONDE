"use client";

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, ArrowUp, ArrowDown, Minus, Clock, Globe } from 'lucide-react';

export default function MarketHeader() {
  const [marketIndices, setMarketIndices] = useState<any>({
    kospi: { val: 6598.24, change: "+2.15%", trend: "up" },
    kosdaq: { val: 1192.45, change: "+1.88%", trend: "up" },
    nasdaq: { val: 21456.33, change: "+1.24%", trend: "up" },
    sp500: { val: 6123.41, change: "+0.88%", trend: "up" },
    dow: { val: 45675.68, change: "+0.72%", trend: "up" },
    exchange: { val: 1452.50, change: "+2.50", trend: "up" }
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  const [weather, setWeather] = useState({
    label: "맑음 (Bullish)",
    icon: <Sun size={20} className="weather-sun" />,
    color: "#fbbf24"
  });

  useEffect(() => {
    // 1. Clock Update
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    // 2. REAL API Fetching
    const fetchMarketData = async () => {
      try {
        const res = await fetch('/api/market');
        const data = await res.json();
        if (data && !data.error) {
          setMarketIndices((prev: any) => ({
            ...prev,
            ...data
          }));
        }
      } catch (err) {
        console.error("Failed to fetch live market data:", err);
      }
    };

    fetchMarketData();
    const apiTimer = setInterval(fetchMarketData, 60000); // Refresh every minute

    // 3. Market Jitter Simulation (Make it feel alive between API calls)
    const jitterTimer = setInterval(() => {
      setMarketIndices((prev: any) => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          if (next[key]) {
            const jitter = (Math.random() - 0.5) * 0.05; 
            next[key].val = parseFloat((next[key].val + jitter).toFixed(2));
          }
        });
        return next;
      });
    }, 3000);

    return () => {
      clearInterval(clockTimer);
      clearInterval(apiTimer);
      clearInterval(jitterTimer);
    };
  }, []);

  useEffect(() => {
    const upCount = [marketIndices.kospi, marketIndices.nasdaq, marketIndices.sp500].filter(i => i.trend === 'up').length;
    if (upCount >= 2) {
      setWeather({ label: "쾌청 (Very Bullish)", icon: <Sun size={20} className="weather-sun" />, color: "#fbbf24" });
    } else {
      setWeather({ label: "흐림 (Neutral)", icon: <Cloud size={20} className="weather-cloud" />, color: "#94a3b8" });
    }
  }, [marketIndices]);

  const MarketItem = ({ label, data }: { label: string, data: any }) => (
    <div className="market-item">
      <span className="m-label">{label}</span>
      <span className="m-val">{data.val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      <span className={`m-change ${data.trend}`} style={{ color: data.trend === 'up' ? '#ff4d4d' : '#4d94ff' }}>
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

      {/* 3. Market Sessions & Clock */}
      <div className="sessions-section">
        <div className="session-box">
          <div className="s-header">
            <Clock size={12} className="icon-gold" />
            <span>COMMAND TIME</span>
          </div>
          <div className="s-times">{currentTime.toLocaleTimeString()}</div>
        </div>
        <div className="session-divider"></div>
        <div className="session-box">
          <div className="s-header">
            <Globe size={12} className="icon-blue" />
            <span>STATUS</span>
          </div>
          <div className="s-times" style={{ color: '#ffb300' }}>WEEKEND CLOSED</div>
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
        .ticker-track { display: flex; gap: 40px; padding: 0 20px; animation: ticker-scroll 30s linear infinite; }
        .market-item { display: flex; align-items: center; gap: 10px; white-space: nowrap; background: rgba(255,255,255,0.03); padding: 6px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .m-label { font-size: 0.75rem; font-weight: 900; color: #94a3b8; }
        .m-val { font-size: 0.9rem; font-weight: 800; color: #f2f2f2; font-family: 'Fira Code', monospace; }
        .m-change { display: flex; align-items: center; gap: 2px; font-size: 0.8rem; font-weight: 800; }
        .m-change.up { color: #ff4d4d; }
        .m-change.down { color: #4d94ff; }

        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Sessions */
        .sessions-section { display: flex; align-items: center; gap: 16px; flex-shrink: 0; background: rgba(0,0,0,0.2); padding: 8px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
        .session-box { display: flex; flex-direction: column; gap: 2px; }
        .s-header { display: flex; align-items: center; gap: 6px; font-size: 0.65rem; font-weight: 900; color: #94a3b8; }
        .s-times { font-size: 0.75rem; font-weight: 800; color: #cbd5e1; font-family: 'Fira Code', monospace; }
        .session-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.1); }
        
        .icon-blue { color: #3b82f6; }
        .icon-gold { color: #fbbf24; }
      `}</style>
    </div>
  );
}
