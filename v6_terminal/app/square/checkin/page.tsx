"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Calendar, CheckCircle, Flame } from 'lucide-react';

export default function CheckIn() {
  return (
    <div className="square-container animate-fade-in">
      <div className="section-header">
        <h1><span className="tag">[ SQUARE ]</span> 6-a. 출석체크 (오늘 한 줄)</h1>
        <p className="subtitle">사령부에 합류한 대원들의 오늘 각오를 공유합니다.</p>
      </div>

      <div className="checkin-grid">
        <GlassCard className="calendar-box">
          <Calendar size={40} color="var(--primary)" />
          <h3>2026년 5월 2일</h3>
          <button className="checkin-btn">출석체크 완료</button>
          <div className="streak-info">
            <Flame size={16} color="#f59e0b" />
            <span>현재 7일 연속 출석 중!</span>
          </div>
        </GlassCard>

        <GlassCard title="Today's Mission Quote">
          <div className="quote-list">
            <div className="quote-item">
              <strong>Captain Bonde:</strong> "중력을 거스르는 자만이 하늘을 날 수 있습니다. 오늘도 원칙 매매!"
            </div>
            <div className="quote-item">
              <strong>fire33:</strong> "열심히 공부해서 경제적 자유 얻겠습니다!"
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .square-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; }
        .checkin-grid { display: grid; grid-template-columns: 300px 1fr; gap: 24px; }
        .calendar-box { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .checkin-btn { 
          width: 100%; padding: 12px; background: var(--primary); color: black; 
          border: none; border-radius: 8px; font-weight: 900; cursor: pointer;
        }
        .streak-info { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: #f59e0b; }
        .quote-list { display: flex; flex-direction: column; gap: 16px; }
        .quote-item { padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; font-size: 0.9rem; }
        .quote-item strong { color: var(--primary); margin-right: 8px; }
      `}</style>
    </div>
  );
}
