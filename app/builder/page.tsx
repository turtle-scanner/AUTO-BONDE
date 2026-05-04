"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { FileCode, Play, Plus, Search, Code, Zap } from 'lucide-react';

export default function BuilderPage() {
  const existingStrategies = [
    { name: "strategy_11_bonde.py", type: "VCP/EP", accuracy: "72%", status: "ACTIVE" },
    { name: "bonde_procedural_bot.py", type: "Core Engine", accuracy: "N/A", status: "RUNNING" },
    { name: "scan_all_stocks.py", type: "Scanner", accuracy: "N/A", status: "READY" },
    { name: "buy_nvidia.py", type: "One-off", accuracy: "N/A", status: "COMPLETED" }
  ];

  return (
    <div className="builder-container animate-fade-in">
      <div className="builder-header">
        <div className="title-row">
          <h2 className="gradient-text">Strategy Builder</h2>
          <button className="new-btn">
            <Plus size={18} /> NEW STRATEGY
          </button>
        </div>
        <p>?ÔøΩÎÑ≠?®ÔΩãÏ≥?????ÔøΩÔøΩÔø????¨Í≥£Î´Ä?ÔøΩÎõæ?ÔøΩÎ±ΩÁ≠åÔøΩ???ÔøΩÎèÆÔøΩÔøΩ??üÎ∞∏≈¶?â„ÉßÎµ?????ÔøΩÎß©????????ÔøΩÔøΩÔø??ëÔøΩ????ÔøΩÎá°?∫Îñ∑Ôø??Á≠åÎöØ?úÔøΩÔøΩÔøΩ??Á≠åÎ??óÔøΩ??</p>
      </div>

      <div className="builder-grid">
        <GlassCard title="Active Repository" className="repo-card">
          <div className="search-box glass">
            <Search size={16} className="icon-muted" />
            <input type="text" placeholder="Search strategies..." />
          </div>
          <div className="strategy-list">
            {existingStrategies.map((strat, i) => (
              <div key={i} className="strategy-item glass-hover">
                <div className="strat-left">
                  <FileCode size={20} className="icon-muted" />
                  <div className="strat-info">
                    <div className="strat-name">{strat.name}</div>
                    <div className="strat-type">{strat.type}</div>
                  </div>
                </div>
                <div className="strat-right">
                  <span className="strat-accuracy">{strat.accuracy}</span>
                  <span className={`status-dot ${strat.status === 'RUNNING' || strat.status === 'ACTIVE' ? 'live' : ''}`}></span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="Elite Code Lab" className="lab-card">
          <div className="code-editor-placeholder glass">
            <div className="editor-header">
              <div className="dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="file-name">new_tactical_strategy.py</span>
            </div>
            <div className="editor-content">
              <pre><code>{`
import pandas as pd
from bonde_engine import TacticalBot

class MyNewStrategy(TacticalBot):
    def on_market_open(self, data):
        # EP (Episodic Pivot) Logic
        if data['volume'] > data['avg_volume'] * 3:
            if data['price_change'] > 5.0:
                self.execute_order('BURST', confidence=0.92)
              `}</code></pre>
            </div>
          </div>
          <div className="lab-actions">
            <button className="test-btn glass"><Zap size={16} /> RUN BACKTEST</button>
            <button className="deploy-btn"><Play size={16} /> DEPLOY TO LIVE</button>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .builder-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .builder-header .title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .builder-header h2 { font-size: 2rem; font-weight: 800; }
        .builder-header p { color: var(--text-muted); }

        .new-btn {
          padding: 10px 20px;
          background: var(--primary);
          color: black;
          border: none;
          border-radius: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .builder-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          border-radius: 10px;
          margin-bottom: 16px;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          font-size: 0.85rem;
          width: 100%;
        }

        .strategy-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .strategy-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px;
          border-radius: 12px;
          cursor: pointer;
        }

        .strat-left { display: flex; align-items: center; gap: 12px; }
        .strat-name { font-weight: 600; font-size: 0.9rem; }
        .strat-type { font-size: 0.7rem; color: var(--text-muted); }

        .strat-right { display: flex; align-items: center; gap: 12px; }
        .strat-accuracy { font-size: 0.75rem; font-weight: 700; color: var(--primary); }

        .status-dot { width: 8px; height: 8px; background: var(--text-muted); border-radius: 50%; }
        .status-dot.live { background: var(--success); box-shadow: 0 0 8px var(--success); }

        .code-editor-placeholder {
          height: 500px;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .editor-header {
          padding: 12px 20px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--card-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dots { display: flex; gap: 6px; }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.red { background: #ff5f56; }
        .dot.yellow { background: #ffbd2e; }
        .dot.green { background: #27c93f; }

        .file-name { font-size: 0.75rem; color: var(--text-muted); font-family: monospace; }

        .editor-content {
          flex: 1;
          padding: 24px;
          background: rgba(0,0,0,0.2);
          overflow-y: auto;
        }

        .editor-content pre { color: #d1d5db; font-family: 'Fira Code', monospace; font-size: 0.9rem; }

        .lab-actions {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }

        .lab-actions button {
          flex: 1;
          padding: 14px;
          border-radius: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
        }

        .test-btn { color: var(--primary); }
        .deploy-btn { background: var(--primary); color: black; border: none; }
      `}</style>
    </div>
  );
}
