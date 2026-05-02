"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Users, UserPlus, Award, Briefcase, TrendingUp } from 'lucide-react';

export default function HRDepartment() {
  const staffStats = [
    { label: "전체 대원", val: "7", icon: <Users size={20} />, color: "#0ea5e9" },
    { label: "신규 임관", val: "+1", icon: <UserPlus size={20} />, color: "#10b981" },
    { label: "훈장 수여자", val: "1", icon: <Award size={20} />, color: "#fbbf24" },
    { label: "작전 투입중", val: "7", icon: <Briefcase size={20} />, color: "#ff0055" }
  ];

  return (
    <div className="hr-container animate-fade-in">
      <div className="hr-header">
        <h1 className="hr-title">
          <Briefcase size={32} className="title-icon" /> [ HR ] 본부 인적자원부
        </h1>
        <p className="hr-subtitle">본대 대원들의 인적 자원 관리 및 복무 기록을 총괄하는 중앙 부서입니다.</p>
      </div>

      <div className="stats-grid">
        {staffStats.map((stat, i) => (
          <GlassCard key={i} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-val">{stat.val}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="hr-main-grid">
        <GlassCard title="진급 예정자 명단 (Promotion Queue)" className="promotion-card">
          <div className="promotion-list">
            {[
              { id: "fire33", current: "회원", target: "엘리트", progress: 85 },
              { id: "sebinhi", current: "회원", target: "엘리트", progress: 62 },
              { id: "popsong98", current: "방문자", target: "회원", progress: 95 }
            ].map((p, i) => (
              <div key={i} className="promotion-item">
                <div className="p-info">
                  <span className="p-id">{p.id}</span>
                  <span className="p-route">{p.current} → {p.target}</span>
                </div>
                <div className="p-bar-bg">
                  <div className="p-bar-fill" style={{ width: `${p.progress}%` }}></div>
                </div>
                <span className="p-pct">{p.progress}%</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="최근 주요 인사 기록" className="record-card">
          <div className="record-list">
            {[
              { date: "2026-05-01", msg: "MoneySnipper 대원, '주도주 스캐너' 활용 성과로 엘리트 등급 승격" },
              { date: "2026-04-30", msg: "wlgh8654 대원, 본부 인적자원부 정식 등록 완료" },
              { date: "2026-04-28", msg: "사령부 정기 보안 교육 실시 (참석율 98%)" }
            ].map((r, i) => (
              <div key={i} className="record-item">
                <span className="record-date">{r.date}</span>
                <p className="record-msg">{r.msg}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .hr-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .hr-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .hr-subtitle { color: var(--text-muted); font-size: 1rem; margin-top: 8px; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { padding: 24px; display: flex; align-items: center; gap: 20px; }
        .stat-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .stat-val { font-size: 1.5rem; font-weight: 900; color: white; }

        .hr-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        
        .promotion-list { display: flex; flex-direction: column; gap: 24px; margin-top: 20px; }
        .promotion-item { display: flex; align-items: center; gap: 20px; }
        .p-info { flex-shrink: 0; width: 150px; display: flex; flex-direction: column; }
        .p-id { font-weight: 800; color: white; font-size: 0.95rem; }
        .p-route { font-size: 0.75rem; color: var(--text-muted); }
        
        .p-bar-bg { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
        .p-bar-fill { height: 100%; background: linear-gradient(to right, var(--primary), var(--secondary)); border-radius: 4px; }
        .p-pct { font-family: 'Fira Code', monospace; font-size: 0.8rem; font-weight: 700; width: 40px; text-align: right; color: var(--primary); }

        .record-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
        .record-item { padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); }
        .record-date { font-size: 0.75rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 8px; }
        .record-msg { font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; }
      `}</style>
    </div>
  );
}
