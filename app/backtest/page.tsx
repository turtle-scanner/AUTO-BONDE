"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import BacktestChart from '@/components/BacktestChart';
import { BarChart3, TrendingUp, AlertTriangle, Target, Briefcase, Download, Calendar } from 'lucide-react';

export default function BacktestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/backtest');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Backtest fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading-state">기록 분석 중...</div>;

  return (
    <div className="backtest-container animate-fade-in">
      <div className="header-row">
        <div className="title-section">
          <h2 className="gradient-text">Strategy Performance Analysis</h2>
          <p>전략: <span className="highlight">Advanced Bonde Strategy v3.0</span> | 기간: 2024-01-01 ~ 2024-04-10</p>
        </div>
        <button className="download-report">
          <Download size={16} />
          Export PDF Report
        </button>
      </div>

      <div className="metrics-grid">
        <GlassCard title="Total Return" className="metric-item">
          <div className="metric-value status-up">{data.metrics.totalReturn}</div>
          <div className="metric-footer">Alpha: +12.4%</div>
        </GlassCard>
        <GlassCard title="Max Drawdown" className="metric-item">
          <div className="metric-value status-down">{data.metrics.mdd}</div>
          <div className="metric-footer">Recovery: 14 days</div>
        </GlassCard>
        <GlassCard title="Sharpe Ratio" className="metric-item">
          <div className="metric-value">{data.metrics.sharpeRatio}</div>
          <div className="metric-footer">Risk-adjusted return</div>
        </GlassCard>
        <GlassCard title="Win Rate" className="metric-item">
          <div className="metric-value">{data.metrics.winRate}</div>
          <div className="metric-footer">Total Trades: {data.metrics.totalTrades}</div>
        </GlassCard>
        <GlassCard title="Profit Factor" className="metric-item">
          <div className="metric-value">{data.metrics.profitFactor}</div>
          <div className="metric-footer">Gross Profit / Gross Loss</div>
        </GlassCard>
      </div>

      <div className="charts-main-grid">
        <GlassCard className="equity-curve-card" hoverable={false}>
          <div className="chart-header-row">
            <h3>Equity Curve (Cumulative Returns)</h3>
            <div className="period-selector">
              <span>1M</span><span className="active">3M</span><span>6M</span><span>YTD</span><span>ALL</span>
            </div>
          </div>
          <BacktestChart data={data.equityData} title="" color="#00f2ff" />
        </GlassCard>

        <div className="sub-charts-column">
          <GlassCard className="drawdown-card" hoverable={false}>
            <h3>Drawdown (%)</h3>
            <BacktestChart data={data.drawdownData} title="" isDrawdown={true} />
          </GlassCard>
          
          <GlassCard title="Monthly Returns" className="monthly-card">
            <div className="monthly-grid">
              {['Jan', 'Feb', 'Mar', 'Apr'].map((m, i) => (
                <div key={m} className="month-bar">
                  <span className="m-label">{m}</span>
                  <div className="m-progress">
                    <div className="m-fill" style={{ width: `${60 + i * 10}%`, background: i === 2 ? 'var(--danger)' : 'var(--success)' }}></div>
                  </div>
                  <span className="m-val">{i === 2 ? '-2.1%' : `+${4 + i * 2}%`}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <GlassCard title="Recent Trade History" className="history-table-card" hoverable={false}>
        <table className="backtest-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticker</th>
              <th>Side</th>
              <th>Entry Price</th>
              <th>Exit Price</th>
              <th>Profit %</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: '2024-04-05', tic: 'NVDA', side: 'BUY', entry: '850.2', exit: '920.4', p: '+8.2%', res: 'win' },
              { date: '2024-04-02', tic: 'TSLA', side: 'BUY', entry: '175.5', exit: '170.1', p: '-3.1%', res: 'loss' },
              { date: '2024-03-28', tic: 'AAPL', side: 'BUY', entry: '170.2', exit: '178.4', p: '+4.8%', res: 'win' },
            ].map((t, i) => (
              <tr key={i}>
                <td>{t.date}</td>
                <td className="ticker-cell">{t.tic}</td>
                <td>{t.side}</td>
                <td>{t.entry}</td>
                <td>{t.exit}</td>
                <td className={t.res === 'win' ? 'status-up' : 'status-down'}>{t.p}</td>
                <td><span className={`res-badge ${t.res}`}>{t.res.toUpperCase()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>

      <style jsx>{`
        .backtest-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .title-section h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .highlight { color: var(--primary); font-weight: 700; }

        .download-report {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .download-report:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--primary);
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
        }

        .metric-value {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 4px 0;
        }

        .metric-footer {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .charts-main-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
        }

        .equity-curve-card {
          padding: 24px;
        }

        .chart-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .period-selector {
          display: flex;
          gap: 8px;
          background: rgba(0,0,0,0.2);
          padding: 4px;
          border-radius: 8px;
        }

        .period-selector span {
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          color: var(--text-muted);
        }

        .period-selector span.active {
          background: var(--primary);
          color: black;
          font-weight: 800;
        }

        .sub-charts-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .drawdown-card, .monthly-card {
          padding: 20px;
        }

        .monthly-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 16px;
        }

        .month-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .m-label { width: 40px; font-size: 0.8rem; font-weight: 600; }
        .m-progress { flex: 1; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden; }
        .m-fill { height: 100%; }
        .m-val { width: 50px; font-size: 0.8rem; text-align: right; font-weight: 700; }

        .backtest-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }

        .backtest-table th {
          text-align: left;
          padding: 12px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-bottom: 1px solid var(--card-border);
        }

        .backtest-table td {
          padding: 16px 12px;
          font-size: 0.9rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .ticker-cell { font-weight: 700; color: var(--primary); }
        
        .res-badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 800;
        }
        .res-badge.win { background: rgba(0, 255, 136, 0.1); color: var(--success); }
        .res-badge.loss { background: rgba(255, 0, 85, 0.1); color: var(--danger); }

        .loading-state {
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
