"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { LayoutDashboard, TrendingUp, TrendingDown, Wallet, Activity, History } from 'lucide-react';

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

        .dashboard-footer { margin-top: 40px; text-align: center; border-top: 1px solid var(--card-border); padding-top: 30px; }
        .insight-label { color: var(--primary); font-size: 0.8rem; font-weight: 900; margin-bottom: 10px; }
        .insight-quote { font-size: 0.95rem; color: var(--text-muted); font-style: italic; }
      `}</style>
    </div>
  );
}
