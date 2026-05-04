"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Radar, 
  Zap, 
  Volume2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert,
  Target,
  Search,
  Activity
} from 'lucide-react';

export default function NanoBananaRadar() {
  const [isScanning, setIsScanning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [activeSignals, setActiveSignals] = useState([
    { ticker: "SOL", setup: "Nano-Banana Stage 3", tightness: 96, volDry: true, confidence: 94 },
    { ticker: "HIVE", setup: "VCP Consolidation", tightness: 88, volDry: true, confidence: 89 },
    { ticker: "MARA", setup: "Base Reset", tightness: 45, volDry: false, confidence: 72 },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsScanning(false);
      setShowAlert(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="radar-page-container animate-fade-in">
      <div className="radar-header">
        <div className="title-box">
          <h1 className="radar-title">
            <Radar size={36} className={`gold ${isScanning ? 'animate-spin' : ''}`} /> 
            5-c. [ RADAR ] 나노바나나 레이더
          </h1>
          <p className="radar-subtitle">폭풍 전의 고요함을 포착하십시오. 수축이 끝나면 발산이 시작됩니다.</p>
        </div>
        <div className={`scan-status ${isScanning ? 'scanning' : 'locked'}`}>
          {isScanning ? 'SYSTEM SCANNING...' : 'SIGNALS LOCKED'}
        </div>
      </div>

      {showAlert && (
        <div className="siren-notification animate-pulse">
          <AlertTriangle size={24} />
          <div className="siren-text">
            <strong>[ EMERGENCY ] 사령관님, 총공격 준비!</strong>
            <p>거래량이 마르고 에너지가 응축되었습니다. 나노바나나 타점 포착!</p>
          </div>
          <button className="close-siren" onClick={() => setShowAlert(false)}>X</button>
        </div>
      )}

      <div className="radar-grid">
        {/* Left: Real-time Scanning List */}
        <GlassCard className="radar-main">
          <div className="card-header">
            <Activity size={18} className="gold" /> TIGHTNESS RADAR LIVE FEED
          </div>
          <div className="radar-table-container">
            <table className="radar-table">
              <thead>
                <tr>
                  <th>TICKER</th>
                  <th>PATTERN SETUP</th>
                  <th>TIGHTNESS</th>
                  <th>VOL DRY-UP</th>
                  <th>CONFIDENCE</th>
                </tr>
              </thead>
              <tbody>
                {activeSignals.map((s, i) => (
                  <tr key={i} className={s.tightness > 90 ? 'critical-row' : ''}>
                    <td className="ticker-cell">{s.ticker}</td>
                    <td className="setup-cell">{s.setup}</td>
                    <td>
                      <div className="score-box">
                        <div className="score-bar"><div className="score-fill" style={{ width: `${s.tightness}%` }}></div></div>
                        <span className="score-val">{s.tightness}%</span>
                      </div>
                    </td>
                    <td className="dry-cell">
                      {s.volDry ? <Zap size={16} className="gold animate-bounce" /> : <Volume2 size={16} className="muted" />}
                    </td>
                    <td>
                      <span className="conf-val">{s.confidence}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Right: Tactical Logic */}
        <div className="radar-side">
          <GlassCard className="logic-card">
            <h3 className="gold"><ShieldAlert size={18} /> [ RADAR LOGIC ]</h3>
            <ul className="logic-list">
              <li>
                <strong>TIGHTNESS (3-5%)</strong>
                <p>급등 후 주가가 좁은 박스권에서 기어가는 구간을 수축 강도로 계산합니다.</p>
              </li>
              <li>
                <strong>VOL DRY-UP (50% ↓)</strong>
                <p>최근 10일 평균 거래량 대비 절반 이하로 줄어드는 시점을 포착합니다.</p>
              </li>
              <li>
                <strong>ENTRY SIGNAL</strong>
                <p>[주가 수축] + [거래량 최저] + [추세선 돌파] 조합 시 사이렌이 가동됩니다.</p>
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="tactical-status">
            <h3 className="gold"><Target size={18} /> OPERATIONAL STATUS</h3>
            <div className="status-item">
              <span>SCANNING FREQUENCY</span>
              <span className="gold">1.5ms</span>
            </div>
            <div className="status-item">
              <span>ALGORITHM VERSION</span>
              <span className="gold">v6.2 ELITE</span>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .radar-page-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; color: white; }
        .radar-header { display: flex; justify-content: space-between; align-items: center; }
        .radar-title { font-size: 2.2rem; font-weight: 900; display: flex; align-items: center; gap: 16px; }
        .radar-subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        
        .scan-status { padding: 8px 16px; border-radius: 20px; font-size: 0.75rem; font-weight: 900; letter-spacing: 1px; }
        .scan-status.scanning { background: rgba(212, 175, 55, 0.1); color: #d4af37; border: 1px solid rgba(212, 175, 55, 0.2); }
        .scan-status.locked { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }

        .siren-notification { background: rgba(255, 0, 85, 0.15); border: 1px solid #ff0055; padding: 20px 30px; border-radius: 12px; display: flex; align-items: center; gap: 24px; position: relative; color: #ff0055; }
        .siren-text strong { font-size: 1.1rem; display: block; margin-bottom: 4px; }
        .siren-text p { font-size: 0.9rem; font-weight: 700; opacity: 0.9; }
        .close-siren { background: none; border: none; color: #ff0055; position: absolute; right: 20px; top: 20px; cursor: pointer; font-weight: 900; }

        .radar-grid { display: grid; grid-template-columns: 1fr 360px; gap: 30px; }
        .radar-main { padding: 24px; }
        .card-header { font-size: 0.9rem; font-weight: 900; color: var(--gold-400); display: flex; align-items: center; gap: 10px; margin-bottom: 24px; }

        .radar-table { width: 100%; border-collapse: collapse; text-align: left; }
        .radar-table th { padding: 12px; background: rgba(255,255,255,0.03); color: var(--text-muted); font-size: 0.75rem; font-weight: 800; }
        .radar-table td { padding: 20px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.95rem; font-weight: 700; }
        .ticker-cell { color: var(--gold-400); font-weight: 900; font-size: 1.1rem; }
        .critical-row { background: rgba(212, 175, 55, 0.05); }

        .score-box { display: flex; align-items: center; gap: 10px; }
        .score-bar { flex: 1; height: 6px; background: rgba(0,0,0,0.3); border-radius: 3px; overflow: hidden; }
        .score-fill { height: 100%; background: linear-gradient(to right, #d4af37, #f9d976); }
        .score-val { font-size: 0.85rem; font-weight: 900; color: var(--gold-400); width: 35px; }

        .radar-side { display: flex; flex-direction: column; gap: 30px; }
        .logic-card { padding: 24px; }
        .logic-card h3 { font-size: 0.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .logic-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 20px; }
        .logic-list li strong { font-size: 0.8rem; color: white; display: block; margin-bottom: 4px; }
        .logic-list li p { font-size: 0.75rem; color: var(--text-muted); line-height: 1.5; }

        .tactical-status { padding: 24px; }
        .tactical-status h3 { font-size: 0.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .status-item { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 800; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.03); }

        .gold { color: #d4af37; }
        .muted { color: #555; }
        
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 4s linear infinite; }
      `}</style>
    </div>
  );
}
