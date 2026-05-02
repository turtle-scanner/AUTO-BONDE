"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import TradingChart from '@/components/TradingChart';
import QuickOrder from '@/components/QuickOrder';
import { useMarketData } from '@/hooks/useMarketData';
import { 
  TrendingUp, 
  Activity, 
  Box, 
  Shield, 
  Zap, 
  RefreshCw, 
  Cpu, 
  Terminal as TerminalIcon,
  Wifi, 
  WifiOff,
  Globe
} from 'lucide-react';

const LiveTickerTape = ({ data, isConnected }: { data: any[], isConnected: boolean }) => {
  const safeData = Array.isArray(data) && data.length > 0 ? data : [
    { ticker: 'KOSPI', price: '---', change_pct: '0.00', is_up: true },
    { ticker: 'KOSDAQ', price: '---', change_pct: '0.00', is_up: true },
    { ticker: 'NASDAQ', price: '---', change_pct: '0.00', is_up: true },
    { ticker: 'S&P 500', price: '---', change_pct: '0.00', is_up: true },
  ];

  return (
    <div className="ticker-tape glass">
      <div className="connection-status">
        {isConnected ? <Wifi size={12} className="status-up" /> : <WifiOff size={12} className="status-down" />}
        <span>{isConnected ? "LIVE STREAM" : "OFFLINE"}</span>
      </div>
      <div className="ticker-scroll">
        {safeData.map((item, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-name">{item.ticker}</span>
            <span className="ticker-price">{item.price}</span>
            <span className={`ticker-change ${item.is_up ? 'status-up' : 'status-down'}`}>
              {item.is_up ? '▲' : '▼'} {item.change_pct}%
            </span>
          </div>
        ))}
        {!isConnected && safeData.length === 0 && <span style={{color:'#888', padding:'0 20px'}}>실시간 데이터 동기화 중...</span>}
      </div>
    </div>
  );
};

export default function PlatinumDashboard() {
  const router = useRouter();
  const { data: liveMarket, isConnected } = useMarketData();
  const [botStatus, setBotStatus] = useState<any>({ status: 'LIVE', lastHeartbeat: 'SYNCING...' });
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('dragonfly_user');
    if (!user) {
      router.push('/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null; // 로그인 안됐으면 아무것도 안보여줌 (리다이렉트 대기)

  const commandLogs = [
    { time: '23:14:22', msg: 'HEARTBEAT: ALL SYSTEMS OPERATIONAL', type: 'system' },
    { time: '23:12:05', msg: 'MARKET SCAN: NVDA VCP PATTERN DETECTED', type: 'info' },
    { time: '23:08:45', msg: 'AI ANALYSIS: GLOBAL SENTIMENT SHIFT TO BULLISH', type: 'success' },
    { time: '23:05:12', msg: 'HEADLESS TRADER: EXECUTING CYCLE #142', type: 'info' },
  ];

  return (
    <div className="platinum-dashboard animate-fade-in">
      <LiveTickerTape data={liveMarket} isConnected={isConnected} />
      
      {/* Top Section: Strategic Hero */}
      <div className="strategic-hero">
        <GlassCard className="hero-card">
          <div className="hero-content">
            <div className="hero-visual">
              <div className="dragonfly-logo-box">
                <img src="/dragonfly_elite.png" alt="Dragonfly" className="dragonfly-logo" />
              </div>
              <div className="radar-waves">
                <div className="wave"></div>
                <div className="wave delay-1"></div>
                <div className="wave delay-2"></div>
              </div>
            </div>
            <div className="hero-text">
              <h1 className="hero-title">PLATINUM COMMAND CENTER</h1>
              <p className="hero-subtitle">SYSTEM STATUS: <span className="status-up">OPTIMAL</span> | OPERATOR: CAPTAIN BONDE</p>
              <div className="hero-badges">
                <div className="badge gold">V6.0 PLATINUM</div>
                <div className="badge secure">SECURE LINK ESTABLISHED</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <GlassCard title="Total Assets" className="stat-card">
          <div className="stat-val-group">
            <span className="stat-val">₩128,450,000</span>
            <Box size={20} className="stat-icon gold" />
          </div>
          <div className="stat-footer status-up">▲ 2.4% vs prev</div>
        </GlassCard>

        <GlassCard title="Daily P/L" className="stat-card">
          <div className="stat-val-group">
            <span className="stat-val status-up">+₩3,120,000</span>
            <TrendingUp size={20} className="stat-icon status-up" />
          </div>
          <div className="stat-footer">Efficiency: 84%</div>
        </GlassCard>

        <GlassCard title="Market Sentiment" className="stat-card">
          <div className="stat-val-group">
            <span className="stat-val">Greed (68)</span>
            <Activity size={20} className="stat-icon gold" />
          </div>
          <div className="stat-footer">VIX: 14.2 (Stable)</div>
        </GlassCard>

        <GlassCard title="Bot Status" className="stat-card">
          <div className="stat-val-group">
            <span className="stat-val">{botStatus.status}</span>
            <Cpu size={20} className="stat-icon status-up animate-pulse" />
          </div>
          <div className="stat-footer">Last Sync: {botStatus.lastHeartbeat}</div>
        </GlassCard>
      </div>

      {/* Main Content Area */}
      <div className="main-layout">
        <div className="left-column">
          <GlassCard className="chart-card">
            <div className="card-header">
              <h3><Globe size={18} className="gold" /> MARKET PULSE</h3>
              <div className="tabs">
                <button className="tab active">NASDAQ</button>
                <button className="tab">KOSPI</button>
                <button className="tab">S&P 500</button>
              </div>
            </div>
            <div className="chart-container">
              {/* Chart Placeholder */}
              <div className="mock-chart">
                <svg viewBox="0 0 800 300" className="chart-svg">
                  <path d="M0 250 Q 100 200 200 220 T 400 150 T 600 180 T 800 100" fill="none" stroke="var(--primary)" strokeWidth="3" />
                  <path d="M0 250 Q 100 200 200 220 T 400 150 T 600 180 T 800 100 L 800 300 L 0 300 Z" fill="url(#chartFill)" opacity="0.1" />
                  <defs>
                    <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="terminal-card">
            <div className="card-header">
              <h3><TerminalIcon size={18} className="gold" /> AI COMMAND LOGS</h3>
            </div>
            <div className="terminal-content">
              {commandLogs.map((log, i) => (
                <div key={i} className={`log-entry ${log.type}`}>
                  <span className="log-time">[{log.time}]</span>
                  <span className="log-msg">{log.msg}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="right-column">
          <QuickOrder />
          <GlassCard className="operative-feed">
            <h3><Zap size={18} className="gold" /> OPERATIVE FEED</h3>
            <div className="feed-list">
              {[
                { name: 'Minervini', msg: 'VCP setup complete on NVDA. Prepare entry.', time: '2m' },
                { name: 'Bonde', msg: 'EP gap spotted in MSFT. Momentum high.', time: '12m' },
                { name: 'Buffett', msg: 'Value persists in defensive sectors.', time: '45m' }
              ].map((f, i) => (
                <div key={i} className="feed-item">
                  <div className="feed-avatar">{f.name[0]}</div>
                  <div className="feed-body">
                    <div className="feed-name">{f.name} [AI]</div>
                    <div className="feed-msg">{f.msg}</div>
                    <div className="feed-time">{f.time} ago</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .platinum-dashboard {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .ticker-tape { padding: 10px 20px; display: flex; align-items: center; gap: 20px; }
        .connection-status { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; font-weight: 900; }
        .ticker-scroll { display: flex; gap: 40px; }
        .ticker-item { display: flex; gap: 10px; font-size: 0.8rem; font-weight: 700; }
        .ticker-name { color: var(--primary); }

        /* Hero */
        .strategic-hero { width: 100%; }
        .hero-card { padding: 40px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 100%); }
        .hero-content { display: flex; align-items: center; gap: 40px; }
        .hero-visual { position: relative; width: 120px; height: 120px; }
        .dragonfly-logo-box { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; z-index: 2; position: relative; }
        .dragonfly-logo { width: 100px; filter: drop-shadow(0 0 20px var(--primary-glow)); }
        
        .radar-waves { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%; height: 100%; }
        .wave { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 1px solid var(--primary); border-radius: 50%; opacity: 0; animation: ping 3s infinite; }
        .delay-1 { animation-delay: 1s; }
        .delay-2 { animation-delay: 2s; }

        @keyframes ping {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3); opacity: 0; }
        }

        .hero-title { font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 8px; font-family: 'Orbitron', sans-serif; }
        .hero-subtitle { font-size: 0.9rem; color: var(--text-muted); font-weight: 700; margin-bottom: 16px; }
        .hero-badges { display: flex; gap: 12px; }
        .badge { padding: 4px 12px; border-radius: 4px; font-size: 0.65rem; font-weight: 900; }
        .badge.gold { background: var(--primary); color: black; }
        .badge.secure { background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid rgba(255,255,255,0.1); }

        /* Stats */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { padding: 20px; }
        .stat-val-group { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .stat-val { font-size: 1.5rem; font-weight: 900; }
        .stat-footer { font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }

        /* Layout */
        .main-layout { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
        .left-column, .right-column { display: flex; flex-direction: column; gap: 30px; }

        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .card-header h3 { font-size: 0.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; }
        
        .tabs { display: flex; gap: 8px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 8px; }
        .tab { background: none; border: none; color: var(--text-muted); padding: 4px 12px; font-size: 0.7rem; font-weight: 800; cursor: pointer; }
        .tab.active { background: rgba(212, 175, 55, 0.2); color: var(--primary); border-radius: 6px; }

        .chart-container { height: 300px; width: 100%; position: relative; }
        .mock-chart { width: 100%; height: 100%; }
        .chart-svg { width: 100%; height: 100%; filter: drop-shadow(0 0 10px var(--primary-glow)); }

        /* Terminal */
        .terminal-card { padding: 20px; }
        .terminal-content { background: rgba(0,0,0,0.4); border-radius: 8px; padding: 15px; font-family: 'Fira Code', monospace; font-size: 0.75rem; height: 150px; overflow-y: auto; border: 1px solid rgba(212, 175, 55, 0.1); }
        .log-entry { margin-bottom: 8px; display: flex; gap: 12px; }
        .log-time { color: var(--primary); opacity: 0.7; }
        .log-entry.success .log-msg { color: #10b981; }
        .log-entry.info .log-msg { color: #3b82f6; }

        /* Feed */
        .operative-feed { padding: 24px; }
        .operative-feed h3 { font-size: 0.9rem; font-weight: 900; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .feed-list { display: flex; flex-direction: column; gap: 20px; }
        .feed-item { display: flex; gap: 15px; }
        .feed-avatar { width: 32px; height: 32px; background: rgba(212, 175, 55, 0.2); color: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; }
        .feed-name { font-size: 0.8rem; font-weight: 800; margin-bottom: 2px; }
        .feed-msg { font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; }
        .feed-time { font-size: 0.65rem; opacity: 0.5; margin-top: 4px; }

        .gold { color: var(--primary); }
      `}</style>
    </div>
  );
}
