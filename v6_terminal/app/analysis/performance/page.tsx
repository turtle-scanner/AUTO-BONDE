"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  BarChart3, 
  Target, 
  Zap, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Award
} from 'lucide-react';

export default function PerformanceDashboard() {
  const stats = [
    { label: 'WIN RATE', value: '68.5%', change: '+2.4%', status: 'good' },
    { label: 'PROFIT FACTOR', value: '2.45', change: '+0.12', status: 'good' },
    { label: 'MAX DRAWDOWN', value: '-8.2%', change: '+1.5%', status: 'warning' },
    { label: 'AVG. PROFIT', value: '4.8%', change: '+0.5%', status: 'good' }
  ];

  const recentTrades = [
    { date: '2026.05.01', symbol: 'NVDA', pnl: +12.4, result: 'WIN' },
    { date: '2026.04.30', symbol: 'TSLA', pnl: -3.2, result: 'LOSS' },
    { date: '2026.04.28', symbol: 'AAPL', pnl: +5.8, result: 'WIN' },
    { date: '2026.04.25', symbol: 'MSFT', pnl: +2.1, result: 'WIN' },
  ];

  return (
    <div className="performance-dashboard animate-fade-in">
      {/* Header */}
      <div className="perf-header">
        <div className="header-info">
          <h1 className="perf-title">
            <Award className="title-icon" /> PERFORMANCE ANALYSIS
          </h1>
          <p className="perf-subtitle">전투 기록 분석 및 사령부의 승률 통계를 관리합니다.</p>
        </div>
        <div className="period-selector glass">
          <Calendar size={16} /> Last 30 Days
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        {stats.map((stat) => (
          <GlassCard key={stat.label} className="stat-card">
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value-group">
              <div className="stat-value">{stat.value}</div>
              <div className={`stat-change ${stat.status}`}>{stat.change}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="content-grid">
        {/* Main Chart Card */}
        <GlassCard className="chart-card">
          <div className="card-header">
            <h3><BarChart3 size={20} /> EQUITY CURVE</h3>
            <div className="chart-legend">
              <span className="dot target"></span> Target
              <span className="dot actual"></span> Actual
            </div>
          </div>
          <div className="visual-chart">
            {/* Visual representation of an equity curve */}
            <svg viewBox="0 0 800 200" className="curve-svg">
              <path d="M0 180 Q 200 150 400 120 T 800 50" fill="none" stroke="var(--gold-400)" strokeWidth="4" />
              <path d="M0 180 Q 200 160 400 140 T 800 80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="8" />
              <div className="chart-grid-lines"></div>
            </svg>
            <div className="chart-labels">
              <span>APR 01</span>
              <span>APR 10</span>
              <span>APR 20</span>
              <span>MAY 01</span>
            </div>
          </div>
        </GlassCard>

        {/* Win/Loss Card */}
        <GlassCard className="win-loss-card">
          <h3><Target size={20} /> WIN / LOSS RATIO</h3>
          <div className="donut-chart">
            <div className="donut-segment win" style={{ '--percentage': '68' } as any}></div>
            <div className="donut-center">
              <span className="win-pct">68%</span>
              <span className="pct-label">WIN RATE</span>
            </div>
          </div>
          <div className="ratio-details">
            <div className="ratio-item">
              <div className="label">Total Trades</div>
              <div className="val">142</div>
            </div>
            <div className="ratio-item">
              <div className="label">Winning</div>
              <div className="val win">97</div>
            </div>
            <div className="ratio-item">
              <div className="label">Losing</div>
              <div className="val loss">45</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* History Table */}
      <div className="history-section">
        <h3><Zap size={20} /> RECENT COMBAT LOGS</h3>
        <div className="history-table">
          {recentTrades.map((trade, i) => (
            <div key={i} className="trade-row">
              <div className="trade-date">{trade.date}</div>
              <div className="trade-symbol">{trade.symbol}</div>
              <div className={`trade-pnl ${trade.pnl >= 0 ? 'plus' : 'minus'}`}>
                {trade.pnl >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                {trade.pnl}%
              </div>
              <div className={`trade-result ${trade.result.toLowerCase()}`}>{trade.result}</div>
              <button className="btn-detail">Details</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .performance-dashboard {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          color: white;
        }

        .perf-header { display: flex; justify-content: space-between; align-items: center; }
        .perf-title { font-size: 1.8rem; font-weight: 900; display: flex; align-items: center; gap: 12px; letter-spacing: -1px; }
        .title-icon { color: var(--gold-400); }
        .perf-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .period-selector { padding: 8px 16px; border-radius: 10px; font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        /* Stats Grid */
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { padding: 20px; }
        .stat-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); margin-bottom: 12px; }
        .stat-value-group { display: flex; align-items: baseline; gap: 10px; }
        .stat-value { font-size: 1.8rem; font-weight: 900; }
        .stat-change { font-size: 0.8rem; font-weight: 700; }
        .stat-change.good { color: #10b981; }
        .stat-change.warning { color: #f59e0b; }

        .content-grid { display: grid; grid-template-columns: 1fr 320px; gap: 30px; }

        /* Chart */
        .chart-card { padding: 24px; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .card-header h3 { font-weight: 900; display: flex; align-items: center; gap: 10px; }
        .chart-legend { display: flex; gap: 16px; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
        .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .dot.target { background: var(--gold-400); }
        .dot.actual { background: rgba(255,255,255,0.1); }

        .visual-chart { margin-top: 20px; }
        .curve-svg { width: 100%; height: 200px; filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.2)); }
        .chart-labels { display: flex; justify-content: space-between; margin-top: 15px; color: var(--text-muted); font-size: 0.7rem; font-weight: 700; }

        /* Donut */
        .win-loss-card { padding: 24px; display: flex; flex-direction: column; align-items: center; }
        .win-loss-card h3 { width: 100%; margin-bottom: 30px; font-weight: 900; display: flex; align-items: center; gap: 10px; font-size: 1rem; }
        
        .donut-chart {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: conic-gradient(#10b981 0% 68%, #ef4444 68% 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
        }

        .donut-center {
          width: 110px;
          height: 110px;
          background: #0a0a0a;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .win-pct { font-size: 1.8rem; font-weight: 900; color: #10b981; }
        .pct-label { font-size: 0.65rem; color: var(--text-muted); font-weight: 800; }

        .ratio-details { width: 100%; display: flex; flex-direction: column; gap: 12px; }
        .ratio-item { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
        .ratio-item .label { color: var(--text-muted); }
        .ratio-item .win { color: #10b981; }
        .ratio-item .loss { color: #ef4444; }

        /* History */
        .history-section { margin-top: 20px; }
        .history-section h3 { font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .history-table { display: flex; flex-direction: column; gap: 10px; }
        .trade-row {
          display: grid;
          grid-template-columns: 120px 100px 1fr 100px 100px;
          align-items: center;
          padding: 16px 24px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.05);
          transition: transform 0.2s;
        }
        .trade-row:hover { background: rgba(255,255,255,0.05); transform: scale(1.005); }
        .trade-date { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
        .trade-symbol { font-weight: 900; }
        .trade-pnl { font-weight: 800; display: flex; align-items: center; gap: 4px; }
        .trade-pnl.plus { color: #10b981; }
        .trade-pnl.minus { color: #ef4444; }
        .trade-result { font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; width: fit-content; }
        .trade-result.win { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .trade-result.loss { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .btn-detail { background: none; border: 1px solid rgba(255,255,255,0.1); color: var(--text-muted); padding: 4px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .btn-detail:hover { border-color: var(--gold-400); color: var(--gold-400); }
      `}</style>
    </div>
  );
}
