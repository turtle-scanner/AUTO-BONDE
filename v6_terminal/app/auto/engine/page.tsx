"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SectorPage from '@/components/SectorPage';
import { Settings, Lock, ShieldAlert } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function EnginePage() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem("dragonfly_user");
    if (user === "cntfed" || user === "hjrubbi") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return null;

  if (!isAdmin) {
    return (
      <div className="unauthorized-container animate-fade-in">
        <GlassCard className="error-card">
          <ShieldAlert size={64} className="error-icon" />
          <h1>ACCESS DENIED</h1>
          <p>
            '7-c. 자동매매 전략엔진'은 최고 사령부 관리자 전용 구역입니다.<br/>
            일반 대원은 접근할 수 없습니다. 보안 위반 기록이 보존됩니다.
          </p>
          <button onClick={() => router.push('/auto/dashboard')} className="back-btn">
            상황실로 복귀
          </button>
        </GlassCard>

        <style jsx>{`
          .unauthorized-container { height: 80vh; display: flex; align-items: center; justify-content: center; padding: 40px; }
          .error-card { padding: 60px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 24px; border: 1px solid rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.05); }
          .error-icon { color: #ef4444; }
          h1 { font-size: 2rem; font-weight: 950; color: #ef4444; letter-spacing: 4px; }
          p { color: #94a3b8; line-height: 1.8; font-weight: 600; }
          .back-btn { background: #1e293b; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; cursor: pointer; transition: all 0.3s; }
          .back-btn:hover { background: #334155; transform: scale(1.05); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="engine-admin-container animate-fade-in">
      <div className="admin-badge">
        <Lock size={14} /> CLASSIFIED: ELITE ACCESS ONLY
      </div>
      <SectorPage 
        sectionCode="7-c. ENGINE" 
        title="자동매매 전략엔진 (ADMIN)" 
        description="최고 사령관 전용: 본데/미너비니 전략 기반의 AI 자동매매 엔진 파라미터를 정밀 조정합니다." 
        icon={<Settings size={48} className="gold" />} 
      />
      
      <style jsx>{`
        .engine-admin-container { position: relative; }
        .admin-badge { 
          position: absolute; top: 0; right: 40px; padding: 8px 16px; 
          background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 20px; font-size: 0.7rem; font-weight: 900; color: #d4af37;
          display: flex; align-items: center; gap: 8px; z-index: 10;
        }
        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
