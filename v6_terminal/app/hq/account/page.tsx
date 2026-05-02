"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreVertical,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function HQAccountDashboard() {
  // 샘플 데이터 (나중에 API 연동 예정)
  const portfolio = [
    { symbol: 'NVDA', name: 'Nvidia Corp', qty: 15, avgPrice: 850.50, currentPrice: 924.79, pnl: 8.7, value: 13871.85 },
    { symbol: 'TSLA', name: 'Tesla Inc', qty: 50, avgPrice: 185.00, currentPrice: 178.45, pnl: -3.5, value: 8922.50 },
    { symbol: 'AAPL', name: 'Apple Inc', qty: 25, avgPrice: 172.20, currentPrice: 183.32, pnl: 6.4, value: 4583.00 },
    { symbol: 'MSFT', name: 'Microsoft Corp', qty: 10, avgPrice: 395.00, currentPrice: 406.32, pnl: 2.8, value: 4063.20 },
  ];

  return (
    <div className="hq-account-container animate-fade-in">
      {/* Header */}
      <div className="hq-header">
        <div className="header-info">
          <h1 className="hq-title">
            <Wallet className="title-icon" /> HQ ACCOUNT CENTER
          </h1>
          <p className="hq-subtitle">사령부 통합 자산 및 포트폴리오 관리 센터입니다.</p>
        </div>
        <div className="security-badge">
          <ShieldCheck size={16} /> SECURITY LEVEL: PLATINUM
        </div>
      </div>

      {/* Main Stats */}
      <div className="stats-grid">
        <GlassCard className="stat-card primary-stat">
          <div className="stat-label">TOTAL ASSET VALUE</div>
          <div className="stat-value">$124,582.45</div>
          <div className="stat-change positive">
            <TrendingUp size={16} /> +2.45% (+$2,940.12) <span className="label">Today</span>
          </div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="stat-label">BUYING POWER</div>
          <div className="stat-value">$42,850.00</div>
          <div className="stat-footer">Available for immediate trade</div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="stat-label">TOTAL P/L</div>
          <div className="stat-value positive">+$18,245.50</div>
          <div className="stat-footer">All-time realized & unrealized</div>
        </GlassCard>
      </div>

      {/* Content Grid */}
      <div className="content-grid">
        {/* Left: Positions */}
        <div className="positions-section">
          <div className="section-header">
            <h3><Briefcase size={20} /> ACTIVE POSITIONS</h3>
            <button className="btn-text">View All</button>
          </div>
          
          <div className="positions-list">
            {portfolio.map((stock) => (
              <div key={stock.symbol} className="position-item">
                <div className="stock-info">
                  <div className="stock-symbol">{stock.symbol}</div>
                  <div className="stock-name">{stock.name}</div>
                </div>
                <div className="stock-price">
                  <div className="curr-price">${stock.currentPrice}</div>
                  <div className="avg-price">Avg: ${stock.avgPrice}</div>
                </div>
                <div className={`stock-pnl ${stock.pnl >= 0 ? 'positive' : 'negative'}`}>
                  {stock.pnl >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {Math.abs(stock.pnl)}%
                </div>
                <div className="stock-value">
                  <div className="val-amount">${stock.value.toLocaleString()}</div>
                  <div className="val-qty">{stock.qty} Shares</div>
                </div>
                <button className="item-action"><MoreVertical size={16} /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Asset Allocation & Activity */}
        <div className="side-section">
          <GlassCard className="allocation-card">
            <h3><PieChart size={20} /> ASSET ALLOCATION</h3>
            <div className="chart-placeholder">
              {/* Simple CSS Chart Representation */}
              <div className="chart-ring">
                <div className="ring-center">
                  <span className="center-val">65%</span>
                  <span className="center-label">Stocks</span>
                </div>
              </div>
              <div className="chart-legend">
                <div className="legend-item"><span className="dot stocks"></span> Stocks (65%)</div>
                <div className="legend-item"><span className="dot cash"></span> Cash (32%)</div>
                <div className="legend-item"><span className="dot crypto"></span> Crypto (3%)</div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="activity-card">
            <h3><Clock size={20} /> RECENT ACTIVITY</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="act-icon buy">B</div>
                <div className="act-content">
                  <div className="act-title">Bought 5 NVDA</div>
                  <div className="act-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="act-icon sell">S</div>
                <div className="act-content">
                  <div className="act-title">Sold 10 AAPL</div>
                  <div className="act-time">Yesterday</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .hq-account-container {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          color: white;
        }

        .hq-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .hq-title {
          font-size: 2rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -1px;
        }

        .title-icon { color: var(--gold-400); }
        .hq-subtitle { color: var(--text-muted); margin-top: 4px; }

        .security-badge {
          background: rgba(212, 175, 55, 0.1);
          color: var(--gold-400);
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 20px;
        }

        .stat-card { padding: 24px; position: relative; }
        .primary-stat { background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 0, 0, 0) 100%); border: 1px solid rgba(212, 175, 55, 0.3); }

        .stat-label { font-size: 0.8rem; color: var(--text-muted); font-weight: 700; margin-bottom: 8px; }
        .stat-value { font-size: 2.2rem; font-weight: 900; margin-bottom: 12px; letter-spacing: -1px; }
        .stat-change { display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.9rem; }
        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }
        .stat-footer { font-size: 0.85rem; color: var(--text-muted); }

        /* Content Grid */
        .content-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 30px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h3 { font-weight: 900; display: flex; align-items: center; gap: 10px; }
        .btn-text { background: none; border: none; color: var(--gold-400); font-weight: 700; cursor: pointer; }

        .positions-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .position-item {
          display: grid;
          grid-template-columns: 150px 1fr 100px 150px 40px;
          align-items: center;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: transform 0.2s, background 0.2s;
        }

        .position-item:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: scale(1.01);
        }

        .stock-symbol { font-weight: 900; font-size: 1.1rem; }
        .stock-name { font-size: 0.8rem; color: var(--text-muted); }
        .curr-price { font-weight: 700; }
        .avg-price { font-size: 0.75rem; color: var(--text-muted); }
        .stock-pnl { font-weight: 800; display: flex; align-items: center; gap: 4px; }
        .stock-pnl.positive { color: #10b981; }
        .stock-pnl.negative { color: #ef4444; }
        .val-amount { font-weight: 800; }
        .val-qty { font-size: 0.75rem; color: var(--text-muted); }
        .item-action { background: none; border: none; color: var(--text-muted); cursor: pointer; }

        /* Side Sections */
        .side-section { display: flex; flex-direction: column; gap: 30px; }
        .allocation-card, .activity-card { padding: 24px; }
        .allocation-card h3, .activity-card h3 { margin-bottom: 24px; font-weight: 900; display: flex; align-items: center; gap: 10px; font-size: 1rem; }

        .chart-placeholder {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .chart-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: conic-gradient(var(--gold-400) 0% 65%, #3b82f6 65% 97%, #ef4444 97% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .ring-center {
          width: 85px;
          height: 85px;
          background: #0a0a0a;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .center-val { font-size: 1.2rem; font-weight: 900; }
        .center-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; }

        .chart-legend { display: flex; flex-direction: column; gap: 10px; }
        .legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 600; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.stocks { background: var(--gold-400); }
        .dot.cash { background: #3b82f6; }
        .dot.crypto { background: #ef4444; }

        .activity-list { display: flex; flex-direction: column; gap: 16px; }
        .activity-item { display: flex; align-items: center; gap: 14px; }
        .act-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 0.8rem;
        }
        .act-icon.buy { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .act-icon.sell { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .act-title { font-size: 0.9rem; font-weight: 700; }
        .act-time { font-size: 0.75rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
