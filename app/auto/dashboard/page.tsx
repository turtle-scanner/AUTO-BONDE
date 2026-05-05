"use client";

import React, { useState, useEffect } from 'react';
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
  Percent,
  ClipboardList,
  Trophy,
  User as UserIcon,
  Medal,
  RefreshCw
} from 'lucide-react';

interface MockTrade {
  id: string;
  user: string;
  ticker: string;
  market: 'US' | 'KR';
  type: 'BUY' | 'SELL';
  price: number;
  qty: number;
  date: string;
}

export default function AutoDashboardPage() {
  const [user, setUser] = useState<string>('Guest');
  const [balance, setBalance] = useState(10000000);
  const [trades, setTrades] = useState<MockTrade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("dragonfly_user");
    if (loggedUser) setUser(loggedUser);
    fetchData(loggedUser || 'Guest');
  }, []);

  const fetchData = async (username: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/mock-trading?user=${username}`);
      const data = await res.json();
      if (data.balance) setBalance(data.balance);
      if (data.trades) setTrades(data.trades);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate holdings and performance
  const calculateHoldings = () => {
    const holdings: Record<string, { ticker: string, qty: number, avgPrice: number, market: string }> = {};
    trades.forEach(t => {
      const key = `${t.market}:${t.ticker}`;
      if (!holdings[key]) holdings[key] = { ticker: t.ticker, qty: 0, avgPrice: 0, market: t.market };
      
      if (t.type === 'BUY') {
        const totalCost = (holdings[key].avgPrice * holdings[key].qty) + (t.price * t.qty);
        holdings[key].qty += t.qty;
        holdings[key].avgPrice = totalCost / holdings[key].qty;
      } else {
        holdings[key].qty -= t.qty;
      }
    });
    return Object.values(holdings).filter(h => h.qty > 0);
  };

  const currentHoldings = calculateHoldings();
  
  // Mock performance stats for now (since we don't have real-time live feed for all tickers yet)
  const totalInvested = currentHoldings.reduce((acc, h) => acc + (h.qty * h.avgPrice * (h.market === 'US' ? 1400 : 1)), 0);
  const totalEvaluated = totalInvested; // Simplified: evaluated = invested for now
  const yieldPct = totalInvested > 0 ? 0 : 0;

  const stats = [
    { label: "?ÔøΩÎÑ≠?®ÔΩãÏ≥???ÔøΩÏîàÔøΩÏùà????????, val: `??{balance.toLocaleString()}`, change: "LIVE", isUp: true, icon: <Wallet size={16} /> },
    { label: "???????ÔøΩÍ∫ÇÔøΩÔøΩÔøΩÔøΩ?ÔøΩÎÅãÔøΩÎ??, val: `??{totalInvested.toLocaleString()}`, change: "ACTIVE", isUp: true, icon: <TrendingUp size={16} /> },
    { label: "?ÔøΩÎÑ≠?®ÔΩãÏ≥????ÔøΩÎ™¥?®Î£∏???, val: `${yieldPct.toFixed(2)}%`, change: "0.00%", isUp: true, icon: <Percent size={16} /> },
    { label: "???≤„É´??øΩÎµ??????ÔøΩÍµù??øΩ", val: `${trades.length}?≤ÔøΩ?, change: "LOGGED", isUp: true, icon: <History size={16} /> }
  ];

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">
            <LayoutDashboard size={32} className="title-icon" /> [ DASHBOARD ] ?≤„É´??øΩ?àÊ≥≥Ôø??????ÔøΩÎÑ≠?®Œ∫Îç±??(Tactical Ops)
          </h1>
          <p className="user-welcome">???âÎ®Ø???<strong>{user}</strong>??ÔøΩÎ™¥?®Î£∞??????®Î∫£Îπ????????ÔøΩÎÑ≠?®Œ∫Îç±????ÔøΩÍµùÔøΩÎè≤??</p>
        </div>
        <button className="refresh-btn" onClick={() => fetchData(user)}>
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> REFRESH
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="stat-card">
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            <div className="stat-value">{stat.val}</div>
            <div className={`stat-badge ${stat.isUp ? 'up' : 'down'}`}>
              {stat.change}
            </div>
          </GlassCard>
        ))}
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">
            <Activity size={24} className="icon-glow" /> ??ÔøΩÔøΩÔøΩÏîô??ÊøöÏöåÍº¨ÔøΩÍ∂°ÔøΩÍ∫???????(Active Positions)
          </h2>
          <div className="status-indicator">
            <span className="pulse-dot"></span> MARKET MONITORING
          </div>
        </div>
        
        <div className="position-list glass">
          <table className="pos-table">
            <thead>
              <tr>
                <th>ASSET / TICKER</th>
                <th>ENTRY (AVG)</th>
                <th>QTY</th>
                <th>MARKET</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {currentHoldings.length > 0 ? currentHoldings.map((pos, i) => (
                <tr key={i}>
                  <td>
                    <div className="name-box">
                      <span className="name">{pos.ticker}</span>
                      <span className="ticker">{pos.market} EQUITIES</span>
                    </div>
                  </td>
                  <td>{pos.market === 'US' ? '$' : '??}{pos.avgPrice.toLocaleString()}</td>
                  <td>{pos.qty} SHARES</td>
                  <td>{pos.market}</td>
                  <td>
                    <span className="status-badge active">HOLDING</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="empty-row">?ÔøΩÎÑ≠?®ÔΩãÏ≥????®ÎöÆ???? ÊøöÏöåÍº¨ÔøΩÍ∂°ÔøΩÍ∫???????ÔøΩÎ™¥?®Î£ªÍº???ÔøΩÔøΩ?§Ôºò????ÔøΩÎúÑÔøΩÎ†°. 7-a??????≤„É´??øΩÎµ??ÔøΩÍ≤´?âÎù≤Í±???Á≠åÎ??£Êè¥Ôø??Á≠åÎöØÎºöÔøΩÎ£??</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="ecosystem-grid">
        <GlassCard className="ecosystem-module logs-module">
          <div className="module-header">
            <ClipboardList size={20} className="gold" /> [ RECENT ORDERS ]
          </div>
          <div className="logs-list">
            {trades.slice(0, 5).map((trade, i) => (
              <div key={i} className="log-item">
                <div className="log-meta">
                  <span className="log-time">{trade.date}</span>
                  <span className="log-ticker">{trade.ticker}</span>
                  <span className={`log-type ${trade.type.toLowerCase()}`}>{trade.type}</span>
                </div>
                <div className="log-desc">{trade.qty}??@ {trade.market === 'US' ? '$' : '??}{trade.price.toLocaleString()}</div>
              </div>
            ))}
            {trades.length === 0 && <p className="empty-text">?ÔøΩÍµùÔøΩÎí©?Ôßí„ÇãÏ¶???ÔøΩÔøΩ?§Ôºô?âÔøΩ????ÔøΩÔøΩ?§Ôºò????ÔøΩÎúÑÔøΩÎ†°.</p>}
          </div>
        </GlassCard>

        <GlassCard className="ecosystem-module rank-module">
          <div className="module-header">
            <Trophy size={20} className="gold" /> [ TOP LEADERS ]
          </div>
          <div className="rank-list">
            {[
              { name: "cntfed", rank: 1, profit: "+42.5%", medal: <Medal size={14} className="gold" /> },
              { name: "hjrubbi", rank: 2, profit: "+38.2%", medal: <Medal size={14} style={{ color: '#C0C0C0' }} /> },
              { name: user, rank: "-", profit: "0.00%", medal: <Medal size={14} style={{ color: '#475569' }} /> }
            ].map((r, i) => (
              <div key={i} className="rank-item">
                <div className="rank-left">
                  <span className="rank-num">{r.rank}</span>
                  {r.medal}
                  <span className="rank-name">{r.name}</span>
                </div>
                <div className="rank-profit">{r.profit}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .dashboard-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .dashboard-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; margin: 0; }
        .title-icon { color: var(--primary); }
        .user-welcome { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        
        .refresh-btn { 
          background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); 
          color: white; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 0.8rem;
          display: flex; align-items: center; gap: 8px; cursor: pointer; transition: all 0.2s;
        }
        .refresh-btn:hover { background: rgba(212, 175, 55, 0.1); border-color: var(--primary); color: var(--primary); }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { padding: 24px; }
        .stat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .stat-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .stat-value { font-size: 1.8rem; font-weight: 900; color: white; margin-bottom: 12px; letter-spacing: -1px; }
        .stat-badge { font-size: 0.7rem; font-weight: 900; padding: 4px 10px; border-radius: 20px; width: fit-content; }
        .stat-badge.up { background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .dashboard-section { display: flex; flex-direction: column; gap: 24px; }
        .section-header { display: flex; justify-content: space-between; align-items: center; }
        .section-title { font-size: 1.6rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; margin: 0; }
        .icon-glow { color: var(--primary); filter: drop-shadow(0 0 5px var(--primary-glow)); }
        
        .status-indicator { display: flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: 900; color: #10b981; }
        .pulse-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

        .pos-table { width: 100%; border-collapse: collapse; text-align: left; }
        .pos-table th { padding: 16px; background: rgba(255, 255, 255, 0.03); color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; }
        .pos-table td { padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 700; font-size: 0.95rem; color: white; }
        .empty-row { text-align: center; color: #475569; padding: 60px !important; }

        .name-box { display: flex; flex-direction: column; }
        .name { color: white; font-weight: 900; }
        .ticker { font-size: 0.75rem; color: var(--text-muted); }

        .status-badge { padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 900; background: rgba(16, 185, 129, 0.1); color: #10b981; }

        .ecosystem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .ecosystem-module { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .module-header { font-size: 0.85rem; font-weight: 900; display: flex; align-items: center; gap: 12px; color: var(--primary); }
        .gold { color: #d4af37; }

        .logs-list { display: flex; flex-direction: column; gap: 12px; }
        .log-item { padding: 12px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .log-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; }
        .log-time { font-size: 0.7rem; color: var(--text-muted); font-weight: 800; }
        .log-ticker { font-size: 0.85rem; font-weight: 900; color: var(--primary); }
        .log-type { font-size: 0.65rem; font-weight: 900; padding: 2px 6px; border-radius: 4px; }
        .log-type.buy { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .log-desc { font-size: 0.8rem; color: #bbb; }
        .empty-text { color: #475569; font-size: 0.8rem; font-weight: 700; text-align: center; }

        .rank-list { display: flex; flex-direction: column; gap: 10px; }
        .rank-item { display: flex; justify-content: space-between; align-items: center; padding: 14px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .rank-left { display: flex; align-items: center; gap: 12px; }
        .rank-num { font-size: 1rem; font-weight: 900; width: 20px; color: var(--text-muted); }
        .rank-name { font-size: 0.9rem; font-weight: 800; color: white; }
        .rank-profit { font-size: 1rem; font-weight: 900; color: #10b981; }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .ecosystem-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <footer className="dashboard-footer">
        <div className="insight-label">[ HQ-SHIELD ] ??®ÎöÆ?ñÁ≠åÔø??????È§®ÔøΩ???ÔøΩÎÑ≠?®ÔΩãÏ≥?????ÔøΩÔøΩÔø?/div>
        <div className="insight-quote">
          "??ÔøΩÎ™¥?®Î£∏??? ???????ÔøΩÎÑ≠?®ÔΩãÔøΩÔøΩÔøΩÎúÆ?? ??Á≠åÎ??£Ê≤ÖÔø???ÔøΩÍµùÔøΩÎí©?????ÔøΩÍ∫ÇË´?øΩ????? ??ÔøΩÎ?ÔøΩÎñúÔøΩÍ±°?????Ê∫êÎÖøÎ∏???üÎ∞∏≈¶?äÏñïÏß??È∂?øΩ??????????Â´ÑÔøΩ???"
        </div>
      </footer>
    </div>
  );
}
