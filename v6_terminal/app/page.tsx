"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import TradingChart from '@/components/TradingChart';
import QuickOrder from '@/components/QuickOrder';
import { useMarketData } from '@/hooks/useMarketData';
import { TrendingUp, Activity, Box, Shield, Zap, Bell, Search, RefreshCw, Cpu, Server, Wifi, WifiOff } from 'lucide-react';

const LiveTickerTape = ({ data, isConnected }: { data: any[], isConnected: boolean }) => (
  <div className="ticker-tape glass">
    <div className="connection-status">
      {isConnected ? <Wifi size={12} className="status-up" /> : <WifiOff size={12} className="status-down" />}
      <span>{isConnected ? "LIVE STREAM" : "OFFLINE"}</span>
    </div>
    <div className="ticker-scroll">
      {data.map((item, i) => (
        <div key={i} className="ticker-item">
          <span className="ticker-name">{item.ticker}</span>
          <span className="ticker-price">{item.price}</span>
          <span className={`ticker-change ${item.is_up ? 'status-up' : 'status-down'}`}>
            {item.is_up ? '▲' : '▼'} {item.change_pct}%
          </span>
        </div>
      ))}
      {/* Duplicate for infinite scroll effect if needed, for now just a simple list */}
    </div>
  </div>
);

export default function Dashboard() {
  const { data: liveMarket, isConnected } = useMarketData();
  const [marketData, setMarketData] = useState<any>(null);
  const [botStatus, setBotStatus] = useState<any>({ status: 'LOADING', lastHeartbeat: '...' });
  const [isLoading, setIsLoading] = useState(true);

  // Dummy candlestick data
  const dummyChartData = [
    { time: '2024-04-20', open: 850.50, high: 870.00, low: 840.20, close: 865.30 },
    { time: '2024-04-21', open: 865.30, high: 885.10, low: 860.00, close: 880.40 },
    { time: '2024-04-22', open: 880.40, high: 900.20, low: 875.00, close: 895.10 },
    { time: '2024-04-23', open: 895.10, high: 910.00, low: 880.00, close: 885.20 },
    { time: '2024-04-24', open: 885.20, high: 920.00, low: 882.00, close: 915.30 },
    { time: '2024-04-25', open: 915.30, high: 935.00, low: 910.00, close: 930.10 },
    { time: '2024-04-26', open: 930.10, high: 950.40, low: 925.00, close: 945.20 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mRes, sRes] = await Promise.all([
          fetch('/api/market'),
          fetch('/api/status')
        ]);
        setMarketData(await mRes.json());
        setBotStatus(await sRes.json());
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    const interval = setInterval(fetchData, 10000); // 10s refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <LiveTickerTape data={liveMarket} isConnected={isConnected} />
      
      <div className="strategic-banner-container animate-fade-in">
        <Link href="/" className="strategic-banner-link">
          <GlassCard className="strategic-banner">
            <div className="banner-content">
              <div className="banner-visual">
                <img src="/dragonfly_elite.png" alt="Dragonfly Command" className="dragonfly-img" />
                <div className="radar-ping"></div>
              </div>
              <div className="banner-text">
                <h1 className="banner-title">STRATEGIC COMMAND HUB</h1>
                <p className="banner-subtitle">SYSTEM STATUS: OPTIMAL | OPERATIVE: cntfed</p>
                <div className="banner-badges">
                  <span className="badge glass">V6.0 PLATINUM</span>
                  <span className="badge glass status-up">LIVE OPS ACTIVE</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </Link>
      </div>

      <div className="welcome-row">
        <div className="welcome-section">
          <h2 className="welcome-title">시스템 정상 작동 중, <span className="gradient-text">Captain Bonde</span></h2>
          <p className="welcome-subtitle">사령부 터미널 v6.0 Platinum 에디션에 오신 것을 환영합니다.</p>
        </div>
        <GlassCard className="bot-status-widget" hoverable={false}>
          <div className="status-header">
            <Server size={14} className={botStatus.status === 'LIVE' ? 'status-up' : 'icon-muted'} />
            <span className="status-label">Engine Status:</span>
            <span className={`status-badge ${botStatus.status === 'LIVE' ? 'live' : 'idle'}`}>{botStatus.status}</span>
          </div>
          <div className="status-time">Last Heartbeat: {botStatus.lastHeartbeat}</div>
        </GlassCard>
      </div>

      <div className="stats-row">
        {/* ... existing stats ... */}
        <GlassCard title="Net Liquidation">
          <div className="card-value-row">
            <span className="card-value">₩128,450,000</span>
            <Box className="icon-muted" size={20} />
          </div>
          <span className="card-delta status-up">▲ 2.4% vs prev</span>
        </GlassCard>

        <GlassCard title="Today's Profit">
          <div className="card-value-row">
            <span className="card-value status-up">+₩3,120,000</span>
            <TrendingUp className="status-up" size={20} />
          </div>
          <span className="card-delta">Total Trades: 14</span>
        </GlassCard>

        <GlassCard title="Active Positions">
          <div className="card-value-row">
            <span className="card-value">8 Stocks</span>
            <Activity className="icon-muted" size={20} />
          </div>
          <span className="card-delta">Avg Holding: 4.2d</span>
        </GlassCard>

        <GlassCard title="Risk Exposure">
          <div className="card-value-row">
            <span className="card-value">Moderate</span>
            <Shield className="status-down" size={20} />
          </div>
          <span className="card-delta status-down">VIX: 18.2 (Fear)</span>
        </GlassCard>
      </div>

      <div className="main-grid">
        <GlassCard className="chart-section" hoverable={false}>
          <div className="section-header">
            <h3>Market Overview</h3>
            <div className="chart-tabs">
              <span className="tab active">NASDAQ</span>
              <span className="tab">KOSPI</span>
              <span className="tab">S&P 500</span>
            </div>
          </div>
          <div className="chart-container">
            <TradingChart data={dummyChartData as any} ticker="NVDA" />
          </div>
        </GlassCard>

        <GlassCard title="Operative Feed" className="operative-feed">
          <div className="feed-list">
            {[
              { id: 1, name: "윌리엄 오닐", msg: "CAN SLIM 조건 충족 종목 포착. 컵앤핸들 돌파 구간을 주시하십시오.", time: "2 mins ago", color: "#3b82f6" },
              { id: 2, name: "마크 미너비니", msg: "VCP 변동성 수축 감지. Stage 2 가속화 지점까지 대기 권고.", time: "12 mins ago", color: "#10b981" },
              { id: 3, name: "프라딥 본데", msg: "EP(Episodic Pivot) 발생! 강력한 거래량 동반한 모멘텀 분출 중.", time: "45 mins ago", color: "#f59e0b" },
              { id: 4, name: "워렌 버핏", msg: "인내심은 수익의 핵심입니다. 핵심 가치 훼손 여부를 먼저 체크하세요.", time: "1h ago", color: "#8b5cf6" },
              { id: 5, name: "스탠 와인스타인", msg: "30주 이동평균선 상향 돌파 확인. 1단계 매집에서 2단계 상승 진입.", time: "2h ago", color: "#ef4444" },
              { id: 6, name: "농사 매매", msg: "씨앗(비중)을 골고루 뿌리십시오. 조급함보다는 수확의 시기를 기다리세요.", time: "3h ago", color: "#6b7280" }
            ].map(op => (
              <div key={op.id} className="feed-item">
                <div className="op-avatar" style={{ backgroundColor: op.color }}>{op.name[0]}</div>
                <div className="feed-content">
                  <span className="op-name">{op.name} [AI]</span>
                  <p>{op.msg}</p>
                  <span className="feed-time">{op.time}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="tactical-scan" hoverable={false}>
          <div className="section-header">
            <div className="title-with-icon">
              <Zap size={18} className="status-up" />
              <h3>Tactical Scan Results</h3>
            </div>
            <button className="scan-btn">
              <RefreshCw size={14} />
              RE-SCAN
            </button>
          </div>
          <div className="table-wrapper">
            <table className="scan-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Signal</th>
                  <th>Confidence</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="ticker-label">NVDA</span></td>
                  <td className="status-up">BURST</td>
                  <td>92%</td>
                  <td><span className="badge hot">HOT</span></td>
                </tr>
                <tr>
                  <td><span className="ticker-label">005930</span></td>
                  <td className="status-up">EP</td>
                  <td>84%</td>
                  <td><span className="badge active">MONITOR</span></td>
                </tr>
                <tr>
                  <td><span className="ticker-label">TSLA</span></td>
                  <td className="status-down">COOL</td>
                  <td>65%</td>
                  <td><span className="badge idle">IDLE</span></td>
                </tr>
                <tr>
                  <td><span className="ticker-label">AAPL</span></td>
                  <td className="status-up">VCP</td>
                  <td>78%</td>
                  <td><span className="badge active">MONITOR</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="sub-column">
          <GlassCard title="Strategic Roadmap (Next Steps)" className="roadmap-card">
            <div className="roadmap-list">
              {[
                { task: "자격 심사 완료 (Elite Certification)", status: "IN PROGRESS", color: "var(--primary)" },
                { task: "VCP 패턴 스캐닝 고도화", status: "WAITING", color: "var(--text-muted)" },
                { task: "자동 매매 실전 투입", status: "LOCKED", color: "rgba(255,0,85,0.3)" },
              ].map((item, i) => (
                <div key={i} className="roadmap-item">
                  <div className="task-info">
                    <span className="dot" style={{ background: item.color }}></span>
                    <span className="task-text">{item.task}</span>
                  </div>
                  <span className="task-status" style={{ color: item.color }}>{item.status}</span>
                </div>
              ))}
            </div>
          </GlassCard>
          <QuickOrder />
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .ticker-tape {
          display: flex;
          align-items: center;
          padding: 10px 20px;
          gap: 20px;
          overflow: hidden;
        }

        .connection-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 800;
          white-space: nowrap;
          padding-right: 20px;
          border-right: 1px solid var(--card-border);
        }

        .ticker-scroll {
          display: flex;
          gap: 40px;
          animation: scroll 30s linear infinite;
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 12px;
          white-space: nowrap;
        }

        .ticker-name { font-weight: 700; font-size: 0.85rem; color: var(--primary); }
        .ticker-price { font-weight: 600; font-size: 0.85rem; }
        .ticker-change { font-size: 0.75rem; font-weight: 700; }

        .welcome-title {
          font-size: 2.2rem;
          margin-bottom: 8px;
          font-weight: 800;
        }

        .welcome-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .welcome-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }

        .bot-status-widget {
          min-width: 300px;
          padding: 16px 20px;
        }

        .status-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .status-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .status-badge {
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .status-badge.live { background: rgba(0, 255, 136, 0.1); color: var(--success); }
        .status-badge.idle { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); }

        .status-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .card-value-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .icon-muted { color: var(--text-muted); opacity: 0.5; }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 350px;
          grid-template-rows: auto auto;
          gap: 24px;
        }

        .chart-section {
          grid-column: 1;
        }

        .chart-container {
          min-height: 350px;
          margin-top: 12px;
        }

        .sub-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .operative-feed {
          grid-column: 2;
          grid-row: 1 / span 2;
        }

        .tactical-scan {
          grid-column: 1;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .title-with-icon {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .chart-tabs {
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          padding: 4px;
          border-radius: 10px;
        }

        .tab {
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.75rem;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.2s;
          font-weight: 600;
        }

        .tab.active {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        }

        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feed-item {
          display: flex;
          gap: 16px;
        }

        .op-avatar {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .op-name {
          font-weight: 700;
          font-size: 0.9rem;
          margin-bottom: 4px;
          display: block;
        }

        .feed-content p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-main);
          opacity: 0.9;
          margin-bottom: 6px;
        }

        .feed-time {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        .scan-table {
          width: 100%;
          border-collapse: collapse;
        }

        .scan-table th {
          text-align: left;
          padding: 12px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-bottom: 1px solid var(--card-border);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .scan-table td {
          padding: 16px 12px;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .ticker-label {
          font-weight: 700;
          color: var(--primary);
        }

        .scan-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          background: var(--primary);
          color: black;
          border: none;
          border-radius: 8px;
          font-weight: 800;
          cursor: pointer;
          font-size: 0.75rem;
          transition: all 0.2s;
        }

        .scan-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 0.05em;
        }

        .badge.hot { background: rgba(255, 0, 85, 0.2); color: #ff0055; border: 1px solid rgba(255, 0, 85, 0.3); }
        .badge.active { background: rgba(0, 242, 255, 0.2); color: #00f2ff; border: 1px solid rgba(0, 242, 255, 0.3); }
        .badge.idle { background: rgba(255, 255, 255, 0.05); color: var(--text-muted); border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>
    </div>
  );
}
