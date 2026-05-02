"use client";

import React, { useState, useEffect } from 'react';

export default function TargetScanPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [targets, setTargets] = useState([
    { ticker: "NVDA", setup: "VCP Breakout", strength: 95, status: "READY", price: "912.40", volume: "120%" },
    { ticker: "TSLA", setup: "Double Bottom", strength: 78, status: "WATCH", price: "175.20", volume: "85%" },
    { ticker: "AMD", setup: "Cup & Handle", strength: 88, status: "READY", price: "185.10", volume: "110%" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="scan-page animate-fade-in">
      <div className="section-header">
        <h1 className="gradient-text">3-a. [ SCAN ] 주도주 타점 스캐너</h1>
        <p className="subtitle">본데의 매수 정신: "압도적 거래량과 완벽한 추세의 교차점"</p>
      </div>

      <div className="scanner-container glass">
        <div className="radar-header">
          <div className="status-indicator">
            <span className={`dot ${isScanning ? 'ping' : 'active'}`}></span>
            <span className="text">{isScanning ? 'SCANNING SECTORS...' : 'TACTICAL TARGETS DETECTED'}</span>
          </div>
          <div className="scanner-stats">
            <div className="stat-item">
              <span className="label">SCAN RATE:</span>
              <span className="value">1.2ms</span>
            </div>
            <div className="stat-item">
              <span className="label">CONFIDENCE:</span>
              <span className="value">HIGH</span>
            </div>
          </div>
        </div>

        <div className="target-list">
          <div className="list-header">
            <span>TICKER</span>
            <span>SETUP PATTERN</span>
            <span>RS STRENGTH</span>
            <span>VOLUME</span>
            <span>STATUS</span>
          </div>
          {targets.map((target, idx) => (
            <div key={idx} className={`target-row ${target.status === 'READY' ? 'highlight' : ''}`}>
              <span className="ticker-box">{target.ticker}</span>
              <span className="setup-text">{target.setup}</span>
              <span className="strength-bar">
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${target.strength}%` }}></div>
                </div>
                <span className="pct">{target.strength}%</span>
              </span>
              <span className="vol-text">{target.volume}</span>
              <span className={`status-tag ${target.status.toLowerCase()}`}>{target.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tactical-notes glass">
        <h3>[ BONDE'S TACTICAL NOTES ]</h3>
        <ul>
          <li>● 거래량 없는 돌파는 기만 전술이다. 반드시 평균 대비 150% 이상의 거래량을 확인하라.</li>
          <li>● VCP의 마지막 수축 구간에서의 변동성은 죽어 있어야 한다. 고요함 속의 폭풍을 기다려라.</li>
          <li>● RS 강도가 시장 대비 우위에 있는 종목만이 진정한 주도주다.</li>
        </ul>
      </div>

      <style jsx>{`
        .scan-page {
          padding: 20px;
          color: white;
        }
        .section-header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .subtitle {
          color: var(--text-muted);
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 1px;
        }
        .scanner-container {
          margin-top: 30px;
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
        }
        .radar-header {
          padding: 20px;
          background: rgba(212, 175, 55, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }
        .status-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dot {
          width: 12px;
          height: 12px;
          background: #d4af37;
          border-radius: 50%;
          box-shadow: 0 0 10px #d4af37;
        }
        .dot.ping {
          animation: pulse 1s infinite;
        }
        .target-list {
          padding: 20px;
        }
        .list-header {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 1fr 1fr;
          padding: 10px;
          color: var(--text-muted);
          font-size: 0.8rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .target-row {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 1fr 1fr;
          padding: 15px 10px;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s;
        }
        .target-row.highlight {
          background: rgba(212, 175, 55, 0.05);
        }
        .target-row:hover {
          background: rgba(255,255,255,0.05);
          transform: translateX(10px);
        }
        .ticker-box {
          font-weight: 800;
          color: #d4af37;
          font-size: 1.2rem;
        }
        .strength-bar {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bar-bg {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #d4af37, #f9d976);
          border-radius: 3px;
          box-shadow: 0 0 10px rgba(212,175,55,0.5);
        }
        .status-tag {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 700;
          text-align: center;
        }
        .status-tag.ready {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          border: 1px solid #10b981;
        }
        .status-tag.watch {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
          border: 1px solid #f59e0b;
        }
        .tactical-notes {
          margin-top: 30px;
          padding: 20px;
          border-left: 4px solid #d4af37;
        }
        .tactical-notes h3 {
          color: #d4af37;
          margin-bottom: 15px;
          font-size: 1.1rem;
        }
        .tactical-notes ul {
          list-style: none;
          padding: 0;
        }
        .tactical-notes li {
          margin-bottom: 10px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
