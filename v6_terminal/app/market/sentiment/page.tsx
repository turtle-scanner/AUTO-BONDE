"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Gauge, Info, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

export default function MarketSentimentPage() {
  const sentimentValue = 68; // 0-100 (Greed)
  const status = sentimentValue > 75 ? "EXTREME GREED" : sentimentValue > 55 ? "GREED" : sentimentValue > 45 ? "NEUTRAL" : sentimentValue > 25 ? "FEAR" : "EXTREME FEAR";
  const statusColor = sentimentValue > 75 ? "#ff0055" : sentimentValue > 55 ? "#fbbf24" : sentimentValue > 45 ? "#94a3b8" : sentimentValue > 25 ? "#0ea5e9" : "#3b82f6";

  const metrics = [
    { name: "시장 모멘텀 (S&P 500)", status: "Strong", val: "Above 125-day MA" },
    { name: "변동성 지수 (VIX)", status: "Low", val: "14.2 (Stable)" },
    { name: "풋/콜 옵션 비율", status: "Neutral", val: "0.95" },
    { name: "안전 자산 수요", status: "Low", val: "Bond Yields Rising" }
  ];

  return (
    <div className="sentiment-container animate-fade-in">
      <div className="sentiment-header">
        <h1 className="sentiment-title">
          <Gauge size={32} className="title-icon" /> [ SENTIMENT ] 시장 심리 게이지 (Fear & Greed)
        </h1>
        <div className="sentiment-notice glass">
          시장의 감정 상태를 정밀 스캔합니다. 극도의 공포는 기회이며, 극도의 탐욕은 위기임을 명심하십시오.
        </div>
      </div>

      <div className="sentiment-main-grid">
        <GlassCard className="gauge-card">
          <div className="gauge-visual">
            <div className="gauge-circle" style={{ '--progress': `${sentimentValue}` } as any}>
              <div className="gauge-inner">
                <span className="gauge-value">{sentimentValue}</span>
                <span className="gauge-label" style={{ color: statusColor }}>{status}</span>
              </div>
            </div>
          </div>
          <div className="gauge-scale">
            <span>FEAR</span>
            <span>NEUTRAL</span>
            <span>GREED</span>
          </div>
        </GlassCard>

        <GlassCard className="advice-card">
          <div className="advice-header">
            <ShieldCheck size={20} className="icon-glow" />
            <h3 className="advice-title">사령부 전술 권고 (Tactical Advice)</h3>
          </div>
          <div className="advice-content">
            <p className="advice-main">현재 시장은 <strong style={{ color: statusColor }}>{status}</strong> 단계에 진입해 있습니다.</p>
            <ul className="advice-list">
              <li>신규 진입 시 분할 매수 원칙을 엄격히 준수하십시오.</li>
              <li>수익권 종목은 익절 라인을 타이트하게 상향 조정하십시오.</li>
              <li>VCP 패턴이 완성되지 않은 추격 매수는 지양하십시오.</li>
            </ul>
            <div className="tactical-badge glass">
              <Zap size={14} /> RECOMMENDED: <strong>CAUTIOUS BUY</strong>
            </div>
          </div>
        </GlassCard>
      </div>

      <section className="metrics-section">
        <h2 className="section-title">다중 지표 분석 (Multi-Indicator Analysis)</h2>
        <div className="metrics-grid">
          {metrics.map((m, i) => (
            <GlassCard key={i} className="metric-item">
              <div className="metric-header">
                <span className="metric-name">{m.name}</span>
                <Info size={14} className="info-icon" />
              </div>
              <div className="metric-status">{m.status}</div>
              <div className="metric-val">{m.val}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="sentiment-footer">
        <div className="insight-label">[ HQ-SHIELD ] 본데의 일간 전술 통찰</div>
        <div className="insight-quote">
          "군중이 공포에 질려 도망칠 때 비로소 진정한 부의 기회가 찾아온다."
        </div>
      </footer>

      <style jsx>{`
        .sentiment-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .sentiment-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .sentiment-notice { padding: 20px; border-radius: 12px; font-size: 0.9rem; color: var(--text-muted); }

        .sentiment-main-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; }
        
        .gauge-card { padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .gauge-visual { position: relative; width: 240px; height: 120px; overflow: hidden; }
        .gauge-circle {
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: conic-gradient(from -90deg, #0ea5e9 0%, #94a3b8 45%, #fbbf24 55%, #ff0055 100%);
          mask: radial-gradient(transparent 65%, black 66%);
          transform: rotate(calc(-90deg + (var(--progress) * 1.8)));
          transition: transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .gauge-inner {
          position: absolute;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gauge-value { font-size: 3rem; font-weight: 900; color: white; line-height: 1; }
        .gauge-label { font-size: 0.85rem; font-weight: 900; margin-top: 8px; letter-spacing: 0.1em; }
        .gauge-scale { width: 100%; display: flex; justify-content: space-between; margin-top: 20px; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); padding: 0 20px; }

        .advice-card { padding: 32px; }
        .advice-header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .advice-title { font-size: 1.2rem; font-weight: 900; color: white; }
        .icon-glow { color: var(--primary); }
        
        .advice-main { font-size: 1.1rem; font-weight: 700; color: #e2e8f0; margin-bottom: 20px; }
        .advice-list { list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
        .advice-list li { font-size: 0.95rem; color: var(--text-muted); font-weight: 600; }
        
        .tactical-badge { padding: 12px 20px; border-radius: 8px; background: rgba(255, 189, 46, 0.1); color: #fbbf24; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 800; border: 1px solid rgba(255, 189, 46, 0.2); }

        .metrics-section { display: flex; flex-direction: column; gap: 24px; }
        .section-title { font-size: 1.5rem; font-weight: 900; color: white; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .metric-item { padding: 20px; }
        .metric-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .metric-name { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .info-icon { color: var(--text-muted); }
        .metric-status { font-size: 1.1rem; font-weight: 900; color: white; margin-bottom: 4px; }
        .metric-val { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }

        .sentiment-footer { margin-top: 40px; text-align: center; border-top: 1px solid var(--card-border); padding-top: 30px; }
        .insight-label { color: var(--primary); font-size: 0.8rem; font-weight: 900; margin-bottom: 10px; }
        .insight-quote { font-size: 0.95rem; color: var(--text-muted); font-style: italic; }
      `}</style>
    </div>
  );
}
