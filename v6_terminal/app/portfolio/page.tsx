"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { Briefcase, PieChart, TrendingUp, DollarSign, Clock } from 'lucide-react';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/trading');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const positions = data?.positions ? Object.entries(data.positions) : [];

  return (
    <div className="portfolio-container animate-fade-in">
      <div className="header-section">
        <h2 className="gradient-text">Portfolio Management</h2>
        <p>현재 보유 중인 포지션 및 주문 현황을 실시간으로 모니터링합니다.</p>
      </div>

      <div className="portfolio-stats stats-row">
        <GlassCard title="Total Exposure">
          <div className="stat-value">₩84,200,000</div>
          <span className="stat-sub">9 Active Tickers</span>
        </GlassCard>
        <GlassCard title="Unrealized P/L">
          <div className="stat-value status-up">+₩2,450,000</div>
          <span className="stat-sub">+3.15% Portfolio wide</span>
        </GlassCard>
        <GlassCard title="Day Gain">
          <div className="stat-value status-up">+₩420,000</div>
          <span className="stat-sub">Today's movement</span>
        </GlassCard>
      </div>

      <div className="positions-section">
        <GlassCard title="Active Positions" className="positions-card" hoverable={false}>
          <div className="table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Quantity</th>
                  <th>Entry Price</th>
                  <th>Current</th>
                  <th>P/L %</th>
                  <th>Health Check</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>Loading positions...</td></tr>
                ) : positions.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>No active positions found.</td></tr>
                ) : (
                  positions.map(([ticker, info]: [string, any]) => {
                    const pl = info.current_price && info.entry_price 
                      ? ((info.current_price - info.entry_price) / info.entry_price * 100).toFixed(2)
                      : "0.00";
                    
                    return (
                      <tr key={ticker}>
                        <td><span className="ticker-label">{info.name}</span><br/><small>{ticker}</small></td>
                        <td>{info.qty}</td>
                        <td>₩{info.entry_price?.toLocaleString()}</td>
                        <td>₩{info.current_price?.toLocaleString()}</td>
                        <td className={parseFloat(pl) >= 0 ? "status-up" : "status-down"}>
                          {parseFloat(pl) >= 0 ? '+' : ''}{pl}%
                        </td>
                        <td>
                          <div className={`health-badge ${info.trend_status === 'BULL' ? 'bull' : 'bear'}`}>
                            {info.trend_status === 'BULL' ? 'SMA7 상단' : 'SMA7 하단 (위험)'}
                          </div>
                        </td>
                        <td><span className="badge-active">ACTIVE</span></td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .portfolio-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .header-section h2 {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .header-section p {
          color: var(--text-muted);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 4px;
        }

        .stat-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .positions-card {
          padding: 24px;
        }

        .table-wrapper {
          overflow-x: auto;
          margin-top: 16px;
        }

        .portfolio-table {
          width: 100%;
          border-collapse: collapse;
        }

        .portfolio-table th {
          text-align: left;
          padding: 16px 12px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-bottom: 1px solid var(--card-border);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .portfolio-table td {
          padding: 16px 12px;
          font-size: 0.95rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }

        .ticker-label {
          font-weight: 800;
          color: var(--primary);
        }

        .reason-cell {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .badge-active {
          background: rgba(0, 255, 136, 0.1);
          color: var(--success);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 800;
          border: 1px solid rgba(0, 255, 136, 0.2);
        }
      `}</style>
    </div>
  );
}
