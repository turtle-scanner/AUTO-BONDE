"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { User, Star, Target, TrendingUp, Shield, Zap, BookOpen, Award } from 'lucide-react';

export default function IntroPage() {
  const philosophy = [
    { icon: <Target size={28} />, title: "VCP (Volatility Contraction Pattern)", desc: "변동성 수축 패턴을 통해 주가가 폭발하기 직전의 타점을 정밀 포착합니다. 마크 미너비니의 핵심 전략입니다." },
    { icon: <TrendingUp size={28} />, title: "추세 추종 (Trend Following)", desc: "시장의 대세 상승 흐름을 타고 주도주에 집중합니다. 하락장에서는 현금을 보유하며 생존합니다." },
    { icon: <Shield size={28} />, title: "리스크 관리 우선", desc: "진입 전 손절가를 반드시 설정합니다. 한 종목당 총 자산의 1~2% 이상 손실을 허용하지 않습니다." },
    { icon: <Zap size={28} />, title: "주도주 집중 매매", desc: "시장을 이끄는 소수의 정예 종목에만 집중합니다. RS(상대강도)가 높은 종목이 곧 전장의 핵심입니다." },
  ];

  const milestones = [
    { year: "2024", event: "주식 시장 입문 · 기초 차트 분석 학습" },
    { year: "2024", event: "마크 미너비니 전략 연구 시작" },
    { year: "2025", event: "자동매매 시스템 'AntiGravity' 개발 착수" },
    { year: "2025", event: "StockDragonfly 터미널 v1.0 ~ v5.5 진화" },
    { year: "2026", event: "StockDragonfly v6.0 차세대 터미널 완성" },
    { year: "2026", event: "AI 기반 실전 교전 엔진 가동 · 24/7 무중단 운영" },
  ];

  return (
    <div className="intro-container animate-fade-in">
      <div className="intro-hero">
        <div className="hero-avatar">
          <div className="avatar-ring">
            <div className="avatar-inner">
              <User size={64} />
            </div>
          </div>
        </div>
        <h1 className="hero-title">Captain Bonde</h1>
        <p className="hero-subtitle">StockDragonfly 사령관 · 주도주 추적 전문가 · 시스템 트레이더</p>
        <div className="hero-badges">
          <span className="badge"><Star size={14} /> Elite Operator</span>
          <span className="badge"><Award size={14} /> Minervini Disciple</span>
          <span className="badge"><BookOpen size={14} /> System Builder</span>
        </div>
      </div>

      <div className="section-title">
        <Zap size={24} className="section-icon" /> 투자 철학 · BONDE DOCTRINE
      </div>
      <div className="philosophy-grid">
        {philosophy.map((p, i) => (
          <GlassCard key={i} className="phil-card">
            <div className="phil-icon">{p.icon}</div>
            <h3 className="phil-title">{p.title}</h3>
            <p className="phil-desc">{p.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="section-title">
        <TrendingUp size={24} className="section-icon" /> 성장 기록 · MILESTONES
      </div>
      <GlassCard className="timeline-card">
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-year">{m.year}</span>
                <span className="timeline-event">{m.event}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="quote-card">
        <blockquote className="quote-text">
          &ldquo;시장은 전쟁터다. 준비된 자만이 살아남고, 규율을 지키는 자만이 승리한다.&rdquo;
        </blockquote>
        <span className="quote-author">— Captain Bonde</span>
      </GlassCard>

      <style jsx>{`
        .intro-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }

        .intro-hero { text-align: center; padding: 60px 20px 40px; }
        .hero-avatar { display: flex; justify-content: center; margin-bottom: 24px; }
        .avatar-ring { width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--secondary)); padding: 3px; animation: spin-slow 8s linear infinite; }
        .avatar-inner { width: 100%; height: 100%; border-radius: 50%; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; color: var(--primary); }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .hero-title { font-size: 2.8rem; font-weight: 900; color: white; margin-bottom: 8px; letter-spacing: -0.02em; }
        .hero-subtitle { font-size: 1.1rem; color: var(--text-muted); font-weight: 600; margin-bottom: 20px; }
        .hero-badges { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .badge { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; color: var(--primary); background: rgba(0,242,255,0.08); border: 1px solid rgba(0,242,255,0.15); }

        .section-title { font-size: 1.4rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; margin-top: 16px; }
        .section-icon { color: var(--primary); }

        .philosophy-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .phil-card { padding: 28px; border: 1px solid var(--card-border); }
        .phil-icon { color: var(--primary); margin-bottom: 16px; }
        .phil-title { font-size: 1rem; font-weight: 900; color: white; margin-bottom: 10px; }
        .phil-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; font-weight: 500; }

        .timeline-card { padding: 32px; }
        .timeline { display: flex; flex-direction: column; gap: 0; }
        .timeline-item { display: flex; align-items: flex-start; gap: 20px; padding: 16px 0; border-left: 2px solid rgba(0,242,255,0.15); padding-left: 24px; position: relative; }
        .timeline-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); position: absolute; left: -6px; top: 20px; }
        .timeline-content { display: flex; gap: 16px; align-items: center; }
        .timeline-year { font-size: 0.8rem; font-weight: 900; color: var(--primary); background: rgba(0,242,255,0.08); padding: 4px 10px; border-radius: 4px; flex-shrink: 0; }
        .timeline-event { font-size: 0.9rem; color: white; font-weight: 600; }

        .quote-card { padding: 40px; text-align: center; border: 1px solid rgba(251,191,36,0.15); background: rgba(251,191,36,0.02); }
        .quote-text { font-size: 1.3rem; font-weight: 700; color: white; font-style: italic; line-height: 1.6; margin: 0 0 16px; }
        .quote-author { font-size: 0.9rem; font-weight: 800; color: #fbbf24; }
      `}</style>
    </div>
  );
}
