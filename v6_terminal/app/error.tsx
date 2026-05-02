"use client";

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 에러 발생 시 사령부 로그에 기록 (실제 환경에서는 외부 로깅 서비스 연동 가능)
    console.error("HQ-SHIELD ALERT: Tactical System Failure detected", error);
  }, [error]);

  return (
    <div className="error-shield-container">
      <div className="error-shield-content glass">
        <div className="error-icon-box">
          <AlertTriangle size={64} className="warning-icon" />
        </div>
        <h1 className="error-title">[ SYSTEM FAILURE ] 전술적 시스템 장애 탐지</h1>
        <p className="error-message">
          예기치 못한 시스템 충돌이 발생했습니다. 사령관님, 걱정 마십시오. 
          HQ-SHIELD가 활성화되어 인터페이스 무결성을 유지하고 있습니다.
        </p>
        
        <div className="error-details glass">
          <code className="error-code">{error.message || "Unknown Tactical Error"}</code>
          {error.digest && <p className="error-digest">ID: {error.digest}</p>}
        </div>

        <div className="error-actions">
          <button onClick={() => reset()} className="btn-reset glass-btn">
            <RefreshCcw size={20} /> 시스템 재가동 (Retry)
          </button>
          <button onClick={() => window.location.href = '/'} className="btn-home glass-btn">
            <Home size={20} /> 메인 사령부로 복귀
          </button>
        </div>
      </div>

      <style jsx>{`
        .error-shield-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: radial-gradient(circle at center, #1a1a2e 0%, #0a0a0f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 9999;
          font-family: 'Inter', sans-serif;
        }
        .error-shield-content {
          max-width: 600px;
          width: 100%;
          padding: 60px 40px;
          border-radius: 24px;
          text-align: center;
          border: 1px solid rgba(255, 0, 85, 0.3);
          box-shadow: 0 0 50px rgba(255, 0, 85, 0.1);
        }
        .warning-icon { color: #ff0055; margin-bottom: 24px; filter: drop-shadow(0 0 10px rgba(255, 0, 85, 0.5)); }
        .error-title { font-size: 1.8rem; font-weight: 900; color: white; margin-bottom: 16px; letter-spacing: -0.02em; }
        .error-message { font-size: 1rem; color: #94a3b8; line-height: 1.6; margin-bottom: 32px; }
        .error-details { padding: 20px; border-radius: 12px; background: rgba(0, 0, 0, 0.3); margin-bottom: 40px; text-align: left; }
        .error-code { font-family: 'Fira Code', monospace; font-size: 0.85rem; color: #ff0055; word-break: break-all; }
        .error-digest { font-size: 0.7rem; color: #475569; margin-top: 8px; }
        
        .error-actions { display: flex; gap: 16px; justify-content: center; }
        .glass-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .btn-reset { background: rgba(255, 0, 85, 0.2); }
        .btn-reset:hover { background: rgba(255, 0, 85, 0.4); transform: translateY(-2px); }
        .btn-home { background: rgba(255, 255, 255, 0.05); }
        .btn-home:hover { background: rgba(255, 255, 255, 0.1); transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
