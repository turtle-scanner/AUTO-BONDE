"use client";

import React, { useEffect, useState } from 'react';
import { X, Zap, ChevronRight, Target, Shield, Activity } from 'lucide-react';
import GlassCard from './GlassCard';

export default function TacticalPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`tactical-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="tactical-content glass animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="popup-header">
          <div className="header-icon">
             <Zap size={24} className="gold pulse" />
          </div>
          <div className="header-text">
            <h2>전술 브리핑 (TACTICAL BRIEFING)</h2>
            <p>실시간 AI 시장 전략 분석 리포트</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="popup-body">
          <div className="strategy-card">
            <div className="s-icon"><Target size={20} /></div>
            <div className="s-info">
              <h3>현재 시장 국면</h3>
              <p>강세 모멘텀 지속 중. 상단 돌파 가능성 72% 감지.</p>
            </div>
          </div>

          <div className="strategy-card">
            <div className="s-icon"><Shield size={20} /></div>
            <div className="s-info">
              <h3>위험 통제 가이드</h3>
              <p>변동성 확대 예상. 익절가를 타이트하게 조정하십시오.</p>
            </div>
          </div>

          <div className="strategy-card">
            <div className="s-icon"><Activity size={20} /></div>
            <div className="s-info">
              <h3>핵심 체크 포인트</h3>
              <p>나노 바나나 패턴 종목들이 대거 포착되고 있습니다.</p>
            </div>
          </div>
        </div>

        <div className="popup-footer">
          <button className="action-btn" onClick={onClose}>
            명령 확인 및 상황실 복귀 <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .tactical-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s; padding: 20px; }
        .tactical-overlay.active { opacity: 1; pointer-events: auto; }
        
        .tactical-content { width: 100%; max-width: 500px; padding: 30px; border-radius: 24px; border: 1px solid rgba(212,175,55,0.3); background: rgba(13, 17, 23, 0.95) !important; box-shadow: 0 0 50px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1); }
        
        .popup-header { display: flex; gap: 20px; align-items: center; margin-bottom: 30px; position: relative; }
        .header-icon { width: 50px; height: 50px; background: rgba(212,175,55,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .header-text h2 { font-size: 1.1rem; font-weight: 900; color: #f2f2f2; margin: 0; }
        .header-text p { font-size: 0.75rem; color: #64748b; font-weight: 700; }
        
        .close-btn { position: absolute; top: -10px; right: -10px; background: rgba(255,255,255,0.05); border: none; color: #64748b; padding: 8px; border-radius: 50%; cursor: pointer; }

        .popup-body { display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px; }
        .strategy-card { display: flex; gap: 16px; padding: 16px; background: rgba(255,255,255,0.02); border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
        .s-icon { color: var(--primary); margin-top: 2px; }
        .s-info h3 { font-size: 0.9rem; font-weight: 800; color: #f2f2f2; margin-bottom: 4px; }
        .s-info p { font-size: 0.8rem; color: #94a3b8; line-height: 1.5; font-weight: 600; }

        .action-btn { width: 100%; background: var(--primary); color: black; border: none; padding: 16px; border-radius: 15px; font-weight: 950; display: flex; align-items: center; justify-content: center; gap: 10px; cursor: pointer; transition: transform 0.2s; }
        .action-btn:hover { transform: scale(1.02); }

        .gold { color: #d4af37; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.7; } 100% { transform: scale(1); opacity: 1; } }

        @media (max-width: 480px) {
          .tactical-content { padding: 20px; border-radius: 20px; }
          .header-text h2 { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}
