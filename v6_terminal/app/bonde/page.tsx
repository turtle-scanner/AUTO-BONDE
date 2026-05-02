"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { Crosshair, Zap, BarChart2, ShieldAlert, Settings, Play, Search } from 'lucide-react';

export default function BondeCommandPage() {
  const [minChange, setMinChange] = useState(4.0);
  const [scanResults, setScanResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScan = async () => {
      try {
        const res = await fetch('/api/bonde/scan');
        const json = await res.json();
        setScanResults(json);
      } catch (err) {
        console.error("Scan fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchScan();
    const interval = setInterval(fetchScan, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bonde-container animate-fade-in">
      <div className="bonde-header">
        <div className="title-area">
          <h2 className="gradient-text">Bonde Strategic Command</h2>
          <p>Mark Minervini & Stockbee 기반 초우량주 발굴 엔진</p>
        </div>
        <div className="command-actions">
          <button className="run-btn">
            <Play size={16} fill="black" />
            RUN BONDE SCANNER
          </button>
        </div>
      </div>

      <div className="main-layout">
        <div className="left-column">
          <GlassCard title="Strategic Setup" className="setup-card">
            <div className="strategy-desc">
              <div className="setup-item">
                <Zap size={18} className="status-up" />
                <div>
                  <strong>EP (Episodic Pivot)</strong>
                  <p>강력한 펀더멘털 뉴스/실적 기반의 갭상승 및 거래량 폭증 (Volume 3x+)</p>
                </div>
              </div>
              <div className="setup-item">
                <BarChart2 size={18} className="status-up" />
                <div>
                  <strong>MB (Momentum Burst)</strong>
                  <p>주가 급등 및 추세 강도(TI65) 우상향 국면 진입</p>
                </div>
              </div>
              <div className="setup-item">
                <Crosshair size={18} className="status-up" />
                <div>
                  <strong>VCP (Volatility Contraction)</strong>
                  <p>응축된 에너지가 폭발하기 직전의 변동성 축소 패턴</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Bonde Parameters" className="settings-card">
            <div className="settings-list">
              <div className="setting-row">
                <label>Min. MB Change (%)</label>
                <input 
                  type="range" 
                  min="2" 
                  max="10" 
                  step="0.5" 
                  value={minChange} 
                  onChange={(e) => setMinChange(parseFloat(e.target.value))}
                />
                <span className="val">{minChange}%</span>
              </div>
              <div className="setting-row">
                <label>Volume Multiplier (EP)</label>
                <span className="val">3.0x</span>
              </div>
              <div className="setting-row">
                <label>Trend Intensity (TI65)</label>
                <span className="val">1.05+</span>
              </div>
              <div className="setting-row">
                <label>Exit Strategy</label>
                <span className="val">SMA7 Break</span>
              </div>
            </div>
            <button className="apply-btn">
              <Settings size={14} />
              APPLY SETTINGS
            </button>
          </GlassCard>
        </div>

        <div className="right-column">
          <GlassCard className="scanner-results" hoverable={false}>
            <div className="section-header">
              <h3>Live Bonde Scanner</h3>
              <div className="search-box glass">
                <Search size={14} />
                <input type="text" placeholder="Filter tickers..." />
              </div>
            </div>
            
            <div className="results-grid">
              {loading ? (
                <div className="status-msg">Scanning market...</div>
              ) : scanResults.length === 0 ? (
                <div className="status-msg">No active setups found.</div>
              ) : (
                scanResults.map((item, idx) => (
                  <div key={idx} className="scan-item glass glass-hover">
                    <div className="item-head">
                      <span className="tic">{item.code}</span>
                      <span className={`badge ${item.reason.includes('EP') ? 'EP' : 'MB'}`}>
                        {item.reason.includes('EP') ? 'EP' : 'MB'}
                      </span>
                    </div>
                    <div className="item-body">
                      <p className="reason-text">{item.reason}</p>
                      <div className="metric">
                        <span>Strength</span>
                        <span className="val">{Math.round(item.strength * 100)}%</span>
                      </div>
                      <div className="metric">
                        <span>Detected</span>
                        <span className="val">{item.timestamp.split(' ')[1]}</span>
                      </div>
                    </div>
                    <div className="item-footer">
                      <span className="status-up">Breaking Out</span>
                      <button className="buy-btn">EXECUTE</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          <GlassCard title="Bonde Risk Manager" className="risk-card">
            <div className="risk-metrics">
              <div className="risk-box">
                <ShieldAlert size={20} className="status-down" />
                <div className="info">
                  <strong>Max Loss per Trade</strong>
                  <p>계좌 자산의 0.5% - 1% 이내로 엄격히 제한</p>
                </div>
              </div>
              <div className="risk-box">
                <Zap size={20} className="status-up" />
                <div className="info">
                  <strong>Progressive Exposure</strong>
                  <p>연승 시 비중 확대, 연패 시 비중 축소 (기계적 대응)</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .bonde-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .bonde-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .run-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: var(--primary);
          color: black;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 0 20px var(--primary-glow);
          transition: all 0.2s;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 24px;
        }

        .left-column, .right-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .setup-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .setup-item p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .settings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 16px 0;
        }

        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }

        .setting-row input { width: 120px; }
        .setting-row .val { font-weight: 700; color: var(--primary); }

        .apply-btn {
          width: 100%;
          padding: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          color: white;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-top: 20px;
        }

        .scan-item {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .item-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tic { font-size: 1.2rem; font-weight: 800; }

        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 900;
        }

        .badge.EP { background: rgba(0, 242, 255, 0.2); color: var(--primary); }
        .badge.MB { background: rgba(112, 0, 255, 0.2); color: #b780ff; }
        .badge.VCP { background: rgba(255, 255, 255, 0.1); color: white; }

        .item-body {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .reason-text { font-size: 0.8rem; line-height: 1.5; color: var(--text-main); margin-bottom: 8px; }

        .metric {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .metric .val { color: var(--text-main); font-weight: 600; }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .item-footer span { font-size: 0.8rem; font-weight: 600; }

        .buy-btn {
          padding: 6px 12px;
          background: rgba(255,255,255,0.1);
          border: 1px solid var(--card-border);
          border-radius: 6px;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
        }

        .buy-btn:hover { background: var(--success); color: black; border-color: transparent; }

        .risk-box {
          display: flex;
          gap: 16px;
          margin-top: 16px;
        }

        .risk-box p { font-size: 0.8rem; color: var(--text-muted); }

        .status-msg { padding: 40px; text-align: center; color: var(--text-muted); grid-column: 1 / -1; }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 8px;
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          outline: none;
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
}
