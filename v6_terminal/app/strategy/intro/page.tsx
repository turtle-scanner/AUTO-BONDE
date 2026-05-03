"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Cpu, Terminal, Users, ShieldAlert } from 'lucide-react';

export default function StrategyIntro() {
  const masters = [
    { name: "윌리엄 오닐", role: "CAN SLIM 기법 창시자", desc: "시장의 주도주를 포착하는 최고의 스캐닝 로직을 담당합니다.", color: "#3b82f6" },
    { name: "마크 미너비니", role: "VCP 변동성 수축 전문가", desc: "추세의 가속화 지점을 정밀하게 타격하는 전술가입니다.", color: "#10b981" },
    { name: "스탠 와인스타인", role: "Stage Analysis 대가", desc: "시장 사이클을 분석하여 안전한 진입 시점을 결정합니다.", color: "#ef4444" },
    { name: "프라딥 본데", role: "EP(Episodic Pivot) 마스터", desc: "강력한 모멘텀이 발생하는 순간을 포착하여 공격적으로 진입합니다.", color: "#f59e0b" },
  ];

  return (
    <div className="strategy-container animate-fade-in">
      <div className="section-header">
        <h1><span className="tag">[ STRATEGY ]</span> 8-a. AI 요원 및 거장 소개</h1>
        <p className="subtitle">세계적인 투자 거장들의 전술을 AI 알고리즘으로 이식했습니다.</p>
      </div>

      <div className="masters-grid">
        {masters.map((m, i) => (
          <GlassCard key={i} className="master-card" hoverable={true}>
            <div className="master-header">
              <div className="avatar" style={{ background: m.color }}>{m.name[0]}</div>
              <div className="master-info">
                <h3>{m.name} [AI AGENT]</h3>
                <span className="role">{m.role}</span>
              </div>
            </div>
            <p className="desc">{m.desc}</p>
            <div className="status-bar">
              <div className="status-label">Operational Status:</div>
              <div className="status-val status-up">ACTIVE</div>
            </div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .strategy-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; }
        .masters-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .master-header { display: flex; gap: 16px; align-items: center; margin-bottom: 20px; }
        .avatar { 
          width: 50px; height: 50px; border-radius: 12px; display: flex; 
          align-items: center; justify-content: center; font-weight: 900; color: white;
          font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .master-info h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 4px; }
        .role { font-size: 0.75rem; color: var(--primary); font-weight: 700; text-transform: uppercase; }
        .desc { font-size: 0.9rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 24px; min-height: 50px; }
        .status-bar { 
          display: flex; justify-content: space-between; align-items: center; 
          padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.7rem; font-weight: 800;
        }
        .status-val { color: #00ff88; }
      `}</style>
    </div>
  );
}
