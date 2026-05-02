"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { UserMinus, Coffee, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AccountExitPage() {
  const [selectedMode, setSelectedMode] = useState<'NONE' | 'REST' | 'EXIT'>('NONE');

  return (
    <div className="exit-container animate-fade-in">
      <div className="exit-header">
        <h1 className="exit-title">
          <UserMinus size={32} className="title-icon" /> [ EXIT ] 탈퇴 및 임시 휴식
        </h1>
        <p className="exit-subtitle">잠시 전선을 떠나 재충전의 시간을 갖거나, 사령부를 완전히 은퇴하실 수 있습니다.</p>
      </div>

      <div className="exit-options">
        <GlassCard 
          className={`option-card ${selectedMode === 'REST' ? 'selected' : ''}`}
          onClick={() => setSelectedMode('REST')}
        >
          <div className="option-visual rest">
            <Coffee size={48} />
          </div>
          <h2 className="option-name">임시 휴식 (Strategic Break)</h2>
          <p className="option-desc">계정과 데이터는 유지되지만, 모든 알림과 작전 리포트 수신이 일시 중단됩니다. 언제든 복귀 가능합니다.</p>
          <div className="option-badge">RECOMMENDED</div>
        </GlassCard>

        <GlassCard 
          className={`option-card ${selectedMode === 'EXIT' ? 'selected' : ''}`}
          onClick={() => setSelectedMode('EXIT')}
        >
          <div className="option-visual exit">
            <UserMinus size={48} />
          </div>
          <h2 className="option-name">영구 탈퇴 (Retirement)</h2>
          <p className="option-desc">사령부의 모든 작전 기록과 계정 정보가 영구 삭제됩니다. 이 작업은 되돌릴 수 없으니 신중하십시오.</p>
        </GlassCard>
      </div>

      {selectedMode !== 'NONE' && (
        <div className="confirmation-area animate-fade-in">
          <GlassCard className="confirm-card">
            <div className="confirm-header">
              <AlertCircle size={24} className="warning-icon" />
              <h3>정말로 진행하시겠습니까?</h3>
            </div>
            <p className="confirm-text">
              {selectedMode === 'REST' 
                ? "임시 휴식 모드로 전환하면, 복귀 시까지 모든 시장 브리핑이 중단됩니다."
                : "탈퇴 즉시 본대에서의 모든 권한이 박탈되며, 복구는 불가능합니다."}
            </p>
            <div className="confirm-actions">
              <button className="btn-cancel glass" onClick={() => setSelectedMode('NONE')}>취소 및 복귀</button>
              <button className={`btn-confirm ${selectedMode === 'REST' ? 'rest-btn' : 'exit-btn'}`}>
                {selectedMode === 'REST' ? "휴식 모드 활성화" : "영구 탈퇴 승인"}
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      <div className="exit-footer">
        <Link href="/" className="back-link">
          <ArrowLeft size={16} /> 메인 사령부로 돌아가기
        </Link>
      </div>

      <style jsx>{`
        .exit-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; max-width: 1000px; margin: 0 auto; }
        .exit-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--text-muted); }
        .exit-subtitle { color: var(--text-muted); font-size: 1rem; margin-top: 8px; }

        .exit-options { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .option-card { padding: 40px; cursor: pointer; transition: all 0.3s; border: 1px solid var(--card-border); position: relative; overflow: hidden; }
        .option-card:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.2); }
        .option-card.selected { border-color: var(--primary); background: rgba(0, 242, 255, 0.05); }

        .option-visual { width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
        .option-visual.rest { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .option-visual.exit { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .option-name { font-size: 1.5rem; font-weight: 900; color: white; margin-bottom: 12px; }
        .option-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }
        .option-badge { position: absolute; top: 20px; right: -30px; background: #10b981; color: white; padding: 4px 40px; font-size: 0.65rem; font-weight: 900; transform: rotate(45deg); }

        .confirmation-area { margin-top: 20px; }
        .confirm-card { padding: 32px; border: 1px solid rgba(255, 0, 85, 0.2); }
        .confirm-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .confirm-header h3 { font-size: 1.2rem; font-weight: 900; color: white; }
        .warning-icon { color: #ff0055; }
        .confirm-text { font-size: 1rem; color: var(--text-muted); margin-bottom: 32px; }
        
        .confirm-actions { display: flex; gap: 16px; }
        .btn-cancel { padding: 12px 24px; border-radius: 10px; font-weight: 700; color: white; cursor: pointer; border: 1px solid var(--card-border); background: none; }
        .btn-confirm { padding: 12px 32px; border-radius: 10px; font-weight: 900; color: white; cursor: pointer; border: none; }
        .rest-btn { background: #10b981; }
        .exit-btn { background: #ef4444; }

        .exit-footer { text-align: center; margin-top: 40px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--primary); text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: opacity 0.2s; }
        .back-link:hover { opacity: 0.8; }
      `}</style>
    </div>
  );
}
