"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Quote, Heart, Target, Rocket, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-container animate-fade-in">
      <div className="about-header">
        <h1 className="about-title">
          <Rocket size={32} className="title-icon" /> [ ABOUT ] 제작 동기 (Our Mission)
        </h1>
        <div className="about-notice glass">
          StockDragonfly v6.0 Platinum: 우리가 시스템에 집착하는 단 하나의 이유, 그것은 '자유'입니다.
        </div>
      </div>

      <div className="mission-grid">
        <GlassCard className="mission-card main-card">
          <div className="card-icon"><Target size={40} /></div>
          <h2 className="mission-heading">시스템은 배신하지 않는다</h2>
          <p className="mission-text">
            인간의 감정은 때로 우리를 파멸로 이끕니다. 공포에 질려 팔고, 탐욕에 눈이 멀어 추격 매수하는 반복되는 실수들... 
            <strong>StockDragonfly</strong>는 이러한 인간의 한계를 극복하기 위해 탄생했습니다. 
            원칙을 코드로 치환하고, 실행을 기계에 맡김으로써 우리는 비로소 시장이라는 전쟁터에서 '감정'이라는 가장 큰 적을 제거했습니다.
          </p>
        </GlassCard>

        <div className="side-missions">
          <GlassCard className="mission-card">
            <div className="card-icon"><Heart size={24} className="icon-red" /></div>
            <h3 className="sub-heading">함께 쟁취하는 경제적 자유</h3>
            <p className="sub-text">혼자 가면 빠르지만, 함께 가면 멀리 갑니다. 모든 정예 요원이 시스템을 통해 노동의 굴레에서 벗어나는 것, 그것이 우리의 궁극적 목표입니다.</p>
          </GlassCard>

          <GlassCard className="mission-card">
            <div className="card-icon"><ShieldCheck size={24} className="icon-blue" /></div>
            <h3 className="sub-heading">사령부의 약속</h3>
            <p className="sub-text">우리는 멈추지 않는 엔진과 정교한 전술을 제공할 것입니다. 사령관님의 원칙이 시스템을 통해 승전보로 돌아오는 그날까지 함께하겠습니다.</p>
          </GlassCard>
        </div>
      </div>

      <section className="manifesto-section glass">
        <div className="manifesto-header">
          <Quote size={40} className="quote-icon" />
          <h2 className="manifesto-title">Dragonfly Manifesto</h2>
        </div>
        <div className="manifesto-body">
          <p>"우리는 돈을 쫓지 않습니다. 우리는 완벽한 '프로세스'를 쫓습니다."</p>
          <p>"수익은 그 프로세스를 견뎌낸 자에게 시장이 내리는 훈장일 뿐입니다."</p>
          <p>"오늘도 우리는 차가운 코드 위에 뜨거운 열정을 녹여냅니다."</p>
        </div>
        <div className="manifesto-footer">
          - StockDragonfly Commander, cntfed
        </div>
      </section>

      <footer className="about-footer">
        <div className="insight-label">[ HQ-SHIELD ] 본데의 일간 전술 통찰</div>
        <div className="insight-quote">
          "진정한 자유란 하고 싶은 것을 하는 것이 아니라, 하기 싫은 일을 하지 않아도 되는 상태를 말한다."
        </div>
      </footer>

      <style jsx>{`
        .about-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; max-width: 1100px; margin: 0 auto; }
        .about-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .about-notice { padding: 24px; border-radius: 12px; font-size: 1rem; color: var(--text-muted); font-weight: 600; }

        .mission-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 24px; }
        .mission-card { padding: 40px; display: flex; flex-direction: column; gap: 20px; }
        .main-card { background: rgba(255, 189, 46, 0.03); border: 1px solid rgba(255, 189, 46, 0.1); }
        .card-icon { color: var(--primary); }
        .mission-heading { font-size: 1.8rem; font-weight: 900; color: white; }
        .mission-text { font-size: 1.1rem; line-height: 1.8; color: #e2e8f0; }
        .mission-text strong { color: var(--primary); }

        .side-missions { display: flex; flex-direction: column; gap: 24px; }
        .sub-heading { font-size: 1.2rem; font-weight: 800; color: white; }
        .sub-text { font-size: 0.95rem; line-height: 1.6; color: var(--text-muted); }
        .icon-red { color: #ff0055; }
        .icon-blue { color: #0ea5e9; }

        .manifesto-section { padding: 60px; text-align: center; background: rgba(0, 0, 0, 0.4); }
        .manifesto-header { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 32px; }
        .quote-icon { color: var(--primary); opacity: 0.5; }
        .manifesto-title { font-size: 1.5rem; font-weight: 900; color: white; letter-spacing: 0.2em; text-transform: uppercase; }
        .manifesto-body { font-size: 1.2rem; font-weight: 600; color: #cbd5e1; line-height: 2; margin-bottom: 40px; font-style: italic; }
        .manifesto-footer { font-size: 0.9rem; font-weight: 800; color: var(--primary); }

        .about-footer { margin-top: 40px; text-align: center; border-top: 1px solid var(--card-border); padding-top: 30px; }
        .insight-label { color: var(--primary); font-size: 0.8rem; font-weight: 900; margin-bottom: 10px; }
        .insight-quote { font-size: 0.95rem; color: var(--text-muted); font-style: italic; }
      `}</style>
    </div>
  );
}
