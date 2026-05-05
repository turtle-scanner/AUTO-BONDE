"use client";

import React, { useState, useEffect } from 'react';
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
  Briefcase,
  User,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface Trade {
  user: string;
  ticker: string;
  market: string;
  price: number;
  qty: number;
  type: string;
  date: string;
}

export default function HQAccountDashboard() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTrades();
  }, []);

  const fetchAllTrades = async () => {
    setLoading(true);
    try {
      // In a real app, this would be a dedicated admin API
      const res = await fetch('/v6-api/mock-trading?all=true'); 
      const data = await res.json();
      // Since our current GET only returns for one user, I'll assume we can get all if admin
      // For now, let's use the trades from the API (I'll need to update the API too)
      if (data.trades) setTrades(data.trades);
    } catch (err) {
      console.error("Failed to fetch all trades", err);
    } finally {
      setLoading(false);
    }
  };

  // Group by User and Ticker
  const aggregateAssets = () => {
    const assets: Record<string, any> = {};
    
    // Add some mock AI trades for demonstration as requested
    const mockAITrades = [
      { user: 'AI(O\'Neil)', ticker: 'NVDA', market: 'US', price: 850, qty: 10, type: 'BUY', date: '2024-05-01' },
      { user: 'AI(Minervini)', ticker: 'AAPL', market: 'US', price: 170, qty: 50, type: 'BUY', date: '2024-05-02' },
      { user: 'AI(Bonde)', ticker: '??ÁππÎ®≠?îÔøΩ??ÔøΩÎÑ≠?®ÔΩãÏ≥??, market: 'KR', price: 78000, qty: 100, type: 'BUY', date: '2024-05-03' }
    ];

    const allTrades = [...trades, ...mockAITrades];

    allTrades.forEach(t => {
      const key = `${t.user}-${t.ticker}`;
      if (!assets[key]) {
        assets[key] = { 
          owner: t.user, 
          ticker: t.ticker, 
          market: t.market, 
          qty: 0, 
          avgPrice: 0,
          isAI: t.user.startsWith('AI(')
        };
      }
      if (t.type === 'BUY') {
        const cost = (assets[key].avgPrice * assets[key].qty) + (t.price * t.qty);
        assets[key].qty += t.qty;
        assets[key].avgPrice = cost / assets[key].qty;
      } else {
        assets[key].qty -= t.qty;
      }
    });

    return Object.values(assets).filter(a => a.qty > 0);
  };

  const assetList = aggregateAssets();
  const totalValue = assetList.reduce((acc, a) => acc + (a.qty * a.avgPrice * (a.market === 'US' ? 1400 : 1)), 0);

  return (
    <div className="hq-account-container animate-fade-in">
      <div className="hq-header">
        <div className="header-info">
          <h1 className="hq-title">
            <Briefcase className="title-icon" /> [ PORTFOLIO ] ??????????≤„É´??øΩ?àÊ≥≥ÔøΩÔßí?§Î≠Ñ?          </h1>
          <p className="hq-subtitle">?ÔøΩÎÑ≠?®ÔΩãÏ≥?????????AI ???âÎ®Ø?????Ê∫êÎÇÉ??????®Î∫£Îπ????????ÔøΩÎÑ≠?®Œ∫Îç±????ÔøΩÍµùÔøΩÎè≤??</p>
        </div>
        <button className="refresh-btn" onClick={fetchAllTrades}>
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} /> SYNC DATA
        </button>
      </div>

      <div className="stats-grid">
        <GlassCard className="stat-card primary-stat">
          <div className="stat-label">TOTAL ECOSYSTEM VALUE</div>
          <div className="stat-value">??{totalValue.toLocaleString()}</div>
          <div className="stat-change positive">
            <TrendingUp size={16} /> LIVE <span className="label">Ecosystem Tracking</span>
          </div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="stat-label">ACTIVE POSITIONS</div>
          <div className="stat-value">{assetList.length} Units</div>
          <div className="stat-footer">Across all members & AI agents</div>
        </GlassCard>

        <GlassCard className="stat-card">
          <div className="stat-label">AI AGENT COVERAGE</div>
          <div className="stat-value">100%</div>
          <div className="stat-footer">Tactical surveillance active</div>
        </GlassCard>
      </div>

      <div className="content-grid">
        <div className="positions-section">
          <div className="section-header">
            <h3><Briefcase size={20} className="gold" /> ???? ???????ÔøΩÎ?ÔøΩÎäæ???ÔøΩÎÑ≠?®Œ∫Îç±??/h3>
            <div className="filter-tabs">
              <span className="tab active">ALL</span>
              <span className="tab">MEMBERS</span>
              <span className="tab">AI AGENTS</span>
            </div>
          </div>
          
          <div className="positions-list">
            <table className="unified-table">
              <thead>
                <tr>
                  <th>OWNER</th>
                  <th>ASSET</th>
                  <th>QTY</th>
                  <th>AVG ENTRY</th>
                  <th>MARKET</th>
                  <th>VALUATION (KRW)</th>
                </tr>
              </thead>
              <tbody>
                {assetList.map((asset, i) => (
                  <tr key={i} className={asset.isAI ? 'ai-row' : ''}>
                    <td>
                      <div className="owner-cell">
                        {asset.isAI ? <Cpu size={14} className="gold" /> : <User size={14} className="muted" />}
                        <span className={asset.isAI ? 'ai-name' : ''}>{asset.owner}</span>
                      </div>
                    </td>
                    <td>
                      <div className="ticker-cell">
                        <span className="t-name">{asset.ticker}</span>
                      </div>
                    </td>
                    <td>{asset.qty}</td>
                    <td>{asset.market === 'US' ? '$' : '??}{asset.avgPrice.toLocaleString()}</td>
                    <td><span className={`m-tag ${asset.market.toLowerCase()}`}>{asset.market}</span></td>
                    <td className="val-cell">
                      ??{(asset.qty * asset.avgPrice * (asset.market === 'US' ? 1400 : 1)).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hq-account-container { padding: 30px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .hq-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .hq-title { font-size: 2rem; font-weight: 900; display: flex; align-items: center; gap: 12px; letter-spacing: -1px; }
        .title-icon { color: var(--primary); }
        .hq-subtitle { color: var(--text-muted); margin-top: 4px; font-weight: 600; }

        .refresh-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px 20px; border-radius: 8px; font-weight: 800; display: flex; align-items: center; gap: 10px; cursor: pointer; }

        .stats-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 20px; }
        .stat-card { padding: 24px; }
        .primary-stat { border: 1px solid rgba(212, 175, 55, 0.3); background: rgba(212, 175, 55, 0.05); }
        .stat-label { font-size: 0.75rem; color: var(--text-muted); font-weight: 800; margin-bottom: 10px; }
        .stat-value { font-size: 2.2rem; font-weight: 900; margin-bottom: 12px; letter-spacing: -1px; color: var(--primary); }
        .stat-change { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-weight: 800; }
        .stat-change.positive { color: #10b981; }

        .content-grid { width: 100%; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .section-header h3 { font-weight: 900; display: flex; align-items: center; gap: 12px; }
        .gold { color: var(--primary); }

        .filter-tabs { display: flex; gap: 10px; }
        .tab { padding: 6px 12px; border-radius: 6px; font-size: 0.7rem; font-weight: 900; color: #475569; cursor: pointer; background: rgba(255,255,255,0.02); }
        .tab.active { background: var(--primary); color: black; }

        .unified-table { width: 100%; border-collapse: collapse; text-align: left; background: rgba(0,0,0,0.2); border-radius: 12px; overflow: hidden; }
        .unified-table th { padding: 16px 20px; background: rgba(255,255,255,0.03); color: #64748b; font-size: 0.7rem; text-transform: uppercase; font-weight: 800; }
        .unified-table td { padding: 18px 20px; border-bottom: 1px solid rgba(255,255,255,0.03); font-weight: 700; font-size: 0.9rem; }
        
        .ai-row { background: rgba(212, 175, 55, 0.02); }
        .owner-cell { display: flex; align-items: center; gap: 10px; }
        .ai-name { color: var(--primary); }
        .ticker-cell { display: flex; flex-direction: column; }
        .t-name { font-weight: 900; color: white; }
        
        .m-tag { padding: 2px 6px; border-radius: 4px; font-size: 0.65rem; font-weight: 900; }
        .m-tag.us { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .m-tag.kr { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .val-cell { color: var(--primary); font-family: 'Fira Code', monospace; }
      `}</style>
    </div>
  );
}
