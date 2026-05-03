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
          <div className="promotion-info-box">
            <TrendingUp size={16} className="gold" />
            <span>활동 게시물 (+10pt) | 일일 접속 (+5pt) | 실전 수익 공유 (+50pt)</span>
          </div>
          <div className="promotion-list">
            {[
              { id: "fire33", current: "회원", target: "엘리트", points: 15 },
              { id: "sebinhi", current: "회원", target: "엘리트", points: 12 },
              { id: "popsong98", current: "방문자", target: "회원", points: 28 },
              { id: "MoneySnipper", current: "회원", target: "엘리트", points: 8 },
              { id: "wlgh8654", current: "방문자", target: "회원", points: 5 }
            ].map((p, i) => (
              <div key={i} className="promotion-item">
                <div className="p-info">
                  <span className="p-id">{p.id}</span>
                  <span className="p-route">{p.current} → {p.target}</span>
                </div>
                <div className="p-bar-bg">
                  <div className="p-bar-fill" style={{ width: `${(p.points / 1000) * 100}%` }}></div>
                </div>
                <div className="p-score">
                  <span className="p-current-val">{p.points}</span>
                  <span className="p-max-val">/ 1000</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="본부 인적자원 시스템 갱신" className="record-card">
          <div className="record-list">
            {[
              { date: "2026-05-03", msg: "사령관 특별 지시: 전 대원 진급 게이지 1,000pt 체제로 개편 및 초기화 완료" },
              { date: "2026-05-03", msg: "활동 포인트 실시간 연동 시스템 가동 시작" },
              { date: "2026-05-03", msg: "신규 명단: fire33, sebinhi, popsong98 외 2명 기여도 측정 시작" }
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
        
        .p-bar-bg { flex: 1; height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden; border: 1px solid rgba(255,255,255,0.02); }
        .p-bar-fill { height: 100%; background: linear-gradient(to right, #d4af37, #f59e0b); border-radius: 5px; box-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
        .p-score { display: flex; align-items: baseline; gap: 4px; width: 80px; justify-content: flex-end; }
        .p-current-val { font-family: 'Fira Code', monospace; font-size: 1rem; font-weight: 900; color: #f59e0b; }
        .p-max-val { font-size: 0.7rem; color: #555; font-weight: 700; }
        .promotion-info-box { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(212, 175, 55, 0.05); border-radius: 8px; margin-top: 16px; font-size: 0.75rem; color: #a3a3a3; font-weight: 700; }
        .gold { color: #d4af37; }

        .record-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
        .record-item { padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); }
        .record-date { font-size: 0.75rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 8px; }
        .record-msg { font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; }
      `}</style>
    </div>
  );
}
