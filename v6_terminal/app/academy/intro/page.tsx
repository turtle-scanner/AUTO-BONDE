"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { BookOpen, Award, Users, Star } from 'lucide-react';

export default function AcademyIntro() {
  return (
    <div className="academy-container animate-fade-in">
      <div className="section-header">
        <h1><span className="tag">[ ACADEMY ]</span> 5-a. 본데(Bonde)는 누구인가?</h1>
        <p className="subtitle">안티그래비티 주식 사령부의 철학과 비전을 공유합니다.</p>
      </div>

      <div className="content-grid">
        <GlassCard className="philosophy-card">
          <div className="card-icon"><Star size={32} color="var(--primary)" /></div>
          <h3>The Bonde Philosophy</h3>
          <p>
            본데(Bonde)는 단순한 매매 기법을 넘어, 시장의 중력을 거스르는(Anti-Gravity) 
            독립적인 투자자의 정신을 상징합니다. 우리는 군중과 반대로 생각하고, 
            데이터와 원칙에 기반하여 전술적으로 행동합니다.
          </p>
        </GlassCard>

        <GlassCard title="Academy Roadmap">
          <div className="roadmap">
            <div className="step">
              <span className="step-num">01</span>
              <div className="step-text">
                <strong>기초 훈련 (Basic Training)</strong>
                <p>차트의 기본 원리와 시장의 생리 이해</p>
              </div>
            </div>
            <div className="step">
              <span className="step-num">02</span>
              <div className="step-text">
                <strong>전술 심화 (Tactical Ops)</strong>
                <p>VCP, EP 등 주도주 매매의 핵심 전술 습득</p>
              </div>
            </div>
            <div className="step active">
              <span className="step-num">03</span>
              <div className="step-text">
                <strong>마스터 승급 (Elite Operator)</strong>
                <p>자동매매 엔진 활용 및 실전 계좌 운용</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; }
        .content-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .philosophy-card h3 { font-size: 1.5rem; margin: 16px 0; font-weight: 800; }
        .philosophy-card p { line-height: 1.8; color: #cbd5e1; }
        .roadmap { display: flex; flex-direction: column; gap: 24px; margin-top: 10px; }
        .step { display: flex; gap: 20px; align-items: flex-start; opacity: 0.6; }
        .step.active { opacity: 1; }
        .step-num { 
          font-size: 1.2rem; font-weight: 900; color: var(--primary); 
          background: rgba(0, 255, 136, 0.1); padding: 8px 12px; border-radius: 8px;
        }
        .step-text strong { display: block; margin-bottom: 4px; font-size: 1rem; }
        .step-text p { font-size: 0.85rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
