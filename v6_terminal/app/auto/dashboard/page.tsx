"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Activity, 
  History, 
  Play, 
  ShieldAlert, 
  BarChart3, 
  Search,
  Zap,
  Percent
} from 'lucide-react';

export default function AutoDashboardPage() {
  const stats = [
    { label: "총 평가 자산", val: "₩124,500,000", change: "+12.5%", isUp: true, icon: <Wallet size={16} /> },
    { label: "누적 수익률", val: "24.8%", change: "+2.1%", isUp: true, icon: <TrendingUp size={16} /> },
    { label: "현재 승률", val: "68.5%", change: "-0.5%", isUp: false, icon: <Activity size={16} /> },
    { label: "실현 손익", val: "₩24,800,000", change: "+4.2%", isUp: true, icon: <History size={16} /> }
  ];

  const positions = [
    { ticker: "NVDA", name: "엔비디아", price: "$880.32", profit: "+12.45%", amount: "₩25,000,000", status: "HOLD" },
    { ticker: "삼성전자", name: "삼성전자", price: "₩78,500", profit: "-1.20%", amount: "₩15,000,000", status: "HOLD" },
    { ticker: "AAPL", name: "애플", price: "$172.50", profit: "+5.12%", amount: "₩12,000,000", status: "PROFIT-TAKING" }
  ];

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          <LayoutDashboard size={32} className="title-icon" /> [ DASHBOARD ] 모의투자 현황 (Tactical Ops)
        </h1>
        <div className="dashboard-notice glass">
          사령부 자동매매 엔진의 실시간 모의투자 운용 현황입니다. 원칙에 기반한 복리 성장을 추격하십시오.
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            <div className="stat-value">{stat.val}</div>
            <div className={`stat-change ${stat.isUp ? 'up' : 'down'}`}>
              {stat.isUp ? '▲' : '▼'} {stat.change} (오늘)
            </div>
          </GlassCard>
        ))}
      </div>

      {/* STRATEGIC MODULES GRID */}
      <div className="strategic-grid">
        {/* 1. Backtest Engine */}
        <GlassCard className="strat-module backtest-module">
          <div className="module-header">
            <BarChart3 size={20} className="gold" /> [ BACKTEST ENGINE ] - 10Y DATA
          </div>
          <div className="module-content">
            <div className="backtest-controls">
              <div className="input-group">
                <label>Strategy</label>
                <select className="glass-select">
                  <option>VCP Breakout (Default)</option>
                  <option>Cup & Handle</option>
                  <option>Pocket Pivot</option>
                </select>
              </div>
              <button className="run-btn"><Play size={14} /> SIMULATE</button>
            </div>
            <div className="results-display">
              <div className="res-item">
                <span className="res-label">WIN RATE</span>
                <span className="res-val status-up">72.4%</span>
              </div>
              <div className="res-item">
                <span className="res-label">MAX DRAWDOWN</span>
                <span className="res-val status-down">-8.2%</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 2. Dynamic Position Sizing */}
        <GlassCard className="strat-module risk-module">
          <div className="module-header">
            <ShieldAlert size={20} className="gold" /> [ DYNAMIC RISK MANAGER ]
          </div>
          <div className="module-content">
            <div className="vix-monitor">
              <div className="vix-val">VIX: 14.2 <span className="vix-status">STABLE</span></div>
              <div className="sizing-advice">
                <span className="advice-label">RECOMMENDED POSITION SIZE</span>
                <div className="sizing-bar">
                  <div className="sizing-fill" style={{ width: '85%' }}></div>
                </div>
                <span className="sizing-pct">85% (AGGRESSIVE)</span>
              </div>
            </div>
            <p className="risk-text">현재 시장 변동성이 낮으므로 주도주에 강력하게 집중 투자할 것을 권고합니다.</p>
          </div>
        </GlassCard>

        {/* 3. Master Pattern Radar */}
        <GlassCard className="strat-module radar-module">
          <div className="module-header">
            <Search size={20} className="gold" /> [ MASTER PATTERN RADAR ]
          </div>
          <div className="radar-list">
            {[
              { name: "Cup & Handle", count: 12, status: "DETECTED" },
              { name: "Double Bottom", count: 5, status: "FORMING" },
              { name: "Pocket Pivot", count: 8, status: "READY" }
            ].map((p, i) => (
              <div key={i} className="radar-item">
                <span className="p-name">{p.name}</span>
                <span className="p-count">{p.count} Stocks</span>
                <span className={`p-status ${p.status.toLowerCase()}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <section className="dashboard-section">
        <h2 className="section-title">
          <Activity size={24} className="icon-glow" /> 교전 중인 포지션 (Active Positions)
        </h2>
        <div className="position-list glass">
          <table className="pos-table">
            <thead>
              <tr>
                <th>ASSET</th>
                <th>ENTRY PRICE</th>
                <th>PROFIT/LOSS</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((pos, i) => (
                <tr key={i}>
                  <td>
                    <div className="name-box">
                      <span className="name">{pos.name}</span>
                      <span className="ticker">{pos.ticker}</span>
                    </div>
                  </td>
                  <td>{pos.price}</td>
                  <td className={pos.profit.startsWith('+') ? 'up' : 'down'}>{pos.profit}</td>
                  <td>{pos.amount}</td>
                  <td>
                    <span className={`status-badge ${pos.status.toLowerCase()}`}>{pos.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="dashboard-footer">
        <div className="insight-label">[ HQ-SHIELD ] 본데의 일간 전술 통찰</div>
        <div className="insight-quote">
          "수익은 예측이 아니라, 시장이 주는 선물이다. 우리는 오직 리스크만을 통제할 뿐이다."
        </div>
      </footer>

      <style jsx>{`
        .dashboard-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .dashboard-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .dashboard-notice { padding: 20px; border-radius: 12px; font-size: 0.9rem; color: var(--text-muted); }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { padding: 24px; }
        .stat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .stat-label { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .stat-value { font-size: 1.6rem; font-weight: 900; color: white; margin-bottom: 8px; }
        .stat-change { font-size: 0.8rem; font-weight: 700; }
        .up { color: #ff0055; }
        .down { color: #0ea5e9; }

        .dashboard-section { display: flex; flex-direction: column; gap: 24px; }
        .section-title { font-size: 1.6rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .icon-glow { color: var(--primary); filter: drop-shadow(0 0 5px var(--primary-glow)); }

        .pos-table { width: 100%; border-collapse: collapse; text-align: left; }
        .pos-table th { padding: 16px; background: rgba(255, 255, 255, 0.03); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; }
        .pos-table td { padding: 20px 16px; border-bottom: 1px solid var(--card-border); font-weight: 700; font-size: 0.95rem; }

        .name-box { display: flex; flex-direction: column; }
        .name { color: white; }
        .ticker { font-size: 0.75rem; color: var(--text-muted); }

        .status-badge { padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 900; background: rgba(255, 255, 255, 0.05); }
        .hold { color: #0ea5e9; border: 1px solid #0ea5e9; }
        .profit-taking { color: #ff0055; border: 1px solid #ff0055; animation: pulse 2s infinite; }

        @keyframes pulse { 
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* STRATEGIC MODULES */
        .strategic-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }
        .strat-module { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .module-header { font-size: 0.85rem; font-weight: 900; display: flex; align-items: center; gap: 12px; color: var(--gold-400); }
        .gold { color: #d4af37; }

        .backtest-controls { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
        .input-group { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 0.65rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .glass-select { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px; font-size: 0.8rem; outline: none; }
        .run-btn { background: var(--primary); color: black; border: none; padding: 10px 16px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .results-display { display: flex; gap: 24px; margin-top: 10px; }
        .res-item { display: flex; flex-direction: column; gap: 4px; }
        .res-label { font-size: 0.6rem; font-weight: 800; color: var(--text-muted); }
        .res-val { font-size: 1.2rem; font-weight: 900; }
        .status-up { color: #10b981; }
        .status-down { color: #ff0055; }

        .vix-monitor { display: flex; flex-direction: column; gap: 16px; }
        .vix-val { font-size: 1.1rem; font-weight: 900; display: flex; align-items: center; gap: 12px; }
        .vix-status { font-size: 0.65rem; background: rgba(16, 185, 129, 0.2); color: #10b981; padding: 2px 8px; border-radius: 4px; }
        .sizing-advice { display: flex; flex-direction: column; gap: 8px; }
        .advice-label { font-size: 0.65rem; font-weight: 800; color: var(--text-muted); }
        .sizing-bar { width: 100%; height: 8px; background: rgba(0,0,0,0.3); border-radius: 4px; overflow: hidden; }
        .sizing-fill { height: 100%; background: linear-gradient(to right, var(--primary), var(--secondary)); }
        .sizing-pct { font-size: 0.85rem; font-weight: 900; color: var(--primary); }
        .risk-text { font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; font-style: italic; }

        .radar-list { display: flex; flex-direction: column; gap: 12px; }
        .radar-item { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .p-name { font-size: 0.85rem; font-weight: 800; }
        .p-count { font-size: 0.75rem; color: var(--text-muted); }
        .p-status { font-size: 0.65rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; }
        .p-status.detected { background: rgba(255, 0, 85, 0.1); color: #ff0055; }
        .p-status.forming { background: rgba(14, 165, 233, 0.1); color: #0ea5e9; }
        .p-status.ready { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .dashboard-footer { margin-top: 40px; text-align: center; border-top: 1px solid var(--card-border); padding-top: 30px; }
        .insight-label { color: var(--primary); font-size: 0.8rem; font-weight: 900; margin-bottom: 10px; }
        .insight-quote { font-size: 0.95rem; color: var(--text-muted); font-style: italic; }
      `}</style>
    </div>
  );
}
