"use client";
import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Cpu, User, Brain, Flame } from 'lucide-react';

const masters = [
  { name: "마크 미너비니", style: "SEPA / VCP 전략", desc: "변동성 수축 패턴(VCP)을 통해 슈퍼스톡을 포착하는 전략. US 투자 챔피언 우승자.", color: "#fbbf24" },
  { name: "윌리엄 오닐", style: "CAN SLIM", desc: "IBD(Investor's Business Daily) 창립자. 성장주 투자의 교과서적 시스템.", color: "#3b82f6" },
  { name: "제시 리버모어", style: "추세추종 / 피벗", desc: "월스트리트 전설. 시장의 큰 흐름을 읽고 피벗 포인트에서 진입하는 전략.", color: "#ef4444" },
  { name: "니콜라스 다르바스", style: "박스 이론", desc: "가격이 형성하는 박스(상자)를 돌파할 때 매수하는 명쾌한 전략.", color: "#10b981" },
  { name: "스탠 와인스타인", style: "스테이지 분석", desc: "주가의 4단계(바닥→상승→천장→하락)를 파악하여 스테이지 2에서만 매수.", color: "#8b5cf6" },
];

export default function StratIntroPage() {
  return (
    <div className="intro-container animate-fade-in">
      <h1 className="page-title"><Cpu size={32} className="icon" /> [ INTRO ] AI 요원 및 거장 소개</h1>
      <p className="page-sub">본데 사령부의 전략은 아래 투자 거장들의 철학을 기반으로 합니다.</p>
      <div className="master-grid">
        {masters.map((m, i) => (
          <GlassCard key={i} className="master-card">
            <div className="master-avatar" style={{borderColor: m.color}}><User size={32} /></div>
            <h3 className="master-name" style={{color: m.color}}>{m.name}</h3>
            <span className="master-style">{m.style}</span>
            <p className="master-desc">{m.desc}</p>
          </GlassCard>
        ))}
      </div>
      <style jsx>{`
        .intro-container { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
        .page-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .icon { color: var(--primary); }
        .page-sub { color: var(--text-muted); font-size: 0.95rem; }
        .master-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .master-card { padding: 28px; text-align: center; border: 1px solid var(--card-border); }
        .master-avatar { width: 64px; height: 64px; border-radius: 50%; border: 2px solid; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: white; background: rgba(255,255,255,0.03); }
        .master-name { font-size: 1.1rem; font-weight: 900; margin-bottom: 6px; }
        .master-style { font-size: 0.7rem; font-weight: 800; color: var(--primary); background: rgba(0,242,255,0.08); padding: 3px 10px; border-radius: 4px; }
        .master-desc { font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-top: 12px; }
      `}</style>
    </div>
  );
}
