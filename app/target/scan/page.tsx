"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Radar, 
  Target, 
  Library, 
  ChevronRight, 
  Zap, 
  Volume2, 
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  History
} from 'lucide-react';

export default function TargetScanPage() {
  const [isScanning, setIsScanning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [targets, setTargets] = useState([
    { ticker: "NVDA", setup: "VCP Breakout", strength: 95, status: "READY", price: "912.40", volume: "120%", tightness: 98, volDry: true },
    { ticker: "TSLA", setup: "Double Bottom", strength: 78, status: "WATCH", price: "175.20", volume: "85%", tightness: 45, volDry: false },
    { ticker: "AMD", setup: "Cup & Handle", strength: 88, status: "READY", price: "185.10", volume: "110%", tightness: 82, volDry: true },
  ]);

  const victoryArchive = [
    { ticker: "MSFT", rise: "+42%", period: "2024.03", comment: "전형적인 VCP 3단계 수축 후 돌파. 거래량 마름이 완벽했음." },
    { ticker: "AAPL", rise: "+28%", period: "2024.01", comment: "이중 바닥 패턴 완성 후 900만 주 거래량 동반하며 발산." },
    { ticker: "SMCI", rise: "+120%", period: "2023.11", comment: "압도적 주도주. RS 강도가 시장을 압도했던 전설적인 사례." },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
      setShowAlert(true); // 시뮬레이션: 완벽한 타점 포착 시 사이렌 알림
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="section-header">
        <div className="header-top">
          <h1 className="gradient-text">3-a. [ SCAN ] 주도주 타점 스캐너</h1>
          <span className="live-badge">LIVE SCANNING</span>
        </div>
        <p className="subtitle">본데의 매수 정신: "압도적 거래량과 완벽한 추세의 교차점"</p>
      </div>

      {/* Tactical Banner */}
      <div className="tactical-banner glass">
        <div className="banner-content">
          <span className="banner-tag">[ BONDE'S TACTICAL NOTES ]</span>
          <p className="banner-text">
            "스캐너에 포착된 종목은 단순한 숫자가 아니다. 시장의 에너지가 임계점에 도달했음을 알리는 신호탄이다. 
            VCP 패턴의 수축이 끝나는 지점에서 거래량이 동반될 때 사령부의 공격은 시작된다."
          </p>
        </div>
      </div>

      {/* SIREN ALERT */}
      {showAlert && (
        <div className="siren-alert animate-pulse">
          <AlertTriangle size={24} />
          <span>[ EMERGENCY ] 사령관님, 총공격 준비! 거래량이 마르고 에너지가 응축되었습니다!</span>
          <button onClick={() => setShowAlert(false)} className="close-btn">X</button>
        </div>
      )}

      <div className="scanner-container glass">
        <div className="radar-header">
          <div className="status-indicator">
            <Radar size={20} className={isScanning ? 'animate-spin' : ''} />
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

        {/* TIGHTNESS RADAR GRID */}
        <div className="target-list">
          <div className="list-header-v2">
            <span>TICKER</span>
            <span>PATTERN</span>
            <span>RS STRENGTH</span>
            <span>TIGHTNESS</span>
            <span>VOL DRY-UP</span>
            <span>STATUS</span>
          </div>
          {targets.map((target, idx) => (
            <div key={idx} className={`target-row-v2 ${target.status === 'READY' ? 'highlight' : ''}`}>
              <span className="ticker-box">{target.ticker}</span>
              <span className="setup-text">{target.setup}</span>
              <span className="strength-bar">
                <div className="bar-bg"><div className="bar-fill" style={{ width: `${target.strength}%` }}></div></div>
                <span className="pct">{target.strength}%</span>
              </span>
              <span className="tightness-bar">
                <div className="bar-bg"><div className="bar-fill gold" style={{ width: `${target.tightness}%` }}></div></div>
                <span className="pct gold">{target.tightness}%</span>
              </span>
              <span className="vol-dry">
                {target.volDry ? <Zap size={16} className="gold" /> : <Volume2 size={16} className="muted" />}
              </span>
              <span className={`status-tag ${target.status.toLowerCase()}`}>{target.status}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-grid">
        {/* TACTICAL NOTES */}
        <GlassCard className="tactical-notes-v2">
          <h3><Target size={18} className="gold" /> [ BONDE'S TACTICAL NOTES ]</h3>
          <ul>
            <li>● 거래량 없는 돌파는 기만 전술이다. 반드시 150% 이상 확인하라.</li>
            <li>● VCP의 마지막 수축 구간에서의 변동성은 죽어 있어야 한다. 고요함 속의 폭풍을 기다려라.</li>
            <li>● RS 강도가 시장 대비 우위에 있는 종목만이 진정한 주도주다.</li>
          </ul>
        </GlassCard>

        {/* VICTORY ARCHIVE */}
        <GlassCard className="victory-archive">
          <h3><Library size={18} className="gold" /> [ VICTORY ARCHIVE ] - 주도주 학습 센터</h3>
          <div className="archive-list">
            {victoryArchive.map((a, i) => (
              <div key={i} className="archive-item">
                <div className="a-header">
                  <span className="a-ticker">{a.ticker}</span>
                  <span className="a-rise">{a.rise}</span>
                  <span className="a-period">{a.period}</span>
                </div>
                <div className="a-comment">
                  <MessageSquare size={12} /> {a.comment}
                </div>
              </div>
            ))}
          </div>
          <button className="view-more-btn">1,000+ 전술 기록 더보기 <ChevronRight size={14} /></button>
        </GlassCard>
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
        .list-header-v2 {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 2fr 1fr 1fr;
          padding: 10px;
          color: var(--text-muted);
          font-size: 0.8rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .target-row-v2 {
          display: grid;
          grid-template-columns: 1fr 2fr 2fr 2fr 1fr 1fr;
          padding: 15px 10px;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: all 0.3s;
        }
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
    </>
  );
}
