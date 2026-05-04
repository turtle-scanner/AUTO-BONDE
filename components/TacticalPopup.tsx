\"use client\";

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, X, ArrowRight } from 'lucide-react';

export default function TacticalPopup() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState({
    title: \"시스템 전략 브리핑\",
    body: \"현재 시장의 변동성이 감지되었습니다. 주요 타겟 종목들에 대한 정밀 분석이 완료되었으니, 전략 일지를 확인하시기 바랍니다.\",
    type: \"INFO\"
  });

  useEffect(() => {
    // 최초 실행 3초 후 팝업 표시
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setShow(false);

  if (!show) return null;

  return (
    <div className=\"tactical-popup-wrapper animate-slide-in\">
      <div className={`tactical-popup glass ${msg.type === 'ALERT' ? 'border-alert' : 'border-gold'}`}>
        <div className=\"popup-header\">
          <div className=\"title-box\">
            {msg.type === 'ALERT' ? <ShieldAlert size={18} className=\"alert-red\" /> : <Zap size={18} className=\"gold\" />}
            <span className=\"p-title\">{msg.title}</span>
          </div>
          <button onClick={closePopup} className=\"p-close\">
            <X size={16} />
          </button>
        </div>
        
        <div className=\"popup-body\">
          <p className=\"p-desc\">{msg.body}</p>
        </div>

        <div className=\"popup-footer\">
          <button className=\"p-action-btn\" onClick={closePopup}>
            상세 내용 확인 <ArrowRight size={14} />
          </button>
          <div className=\"p-time\">방금 전</div>
        </div>
      </div>

      <style jsx>{`
        .tactical-popup-wrapper {
          position: fixed;
          bottom: 100px;
          right: 30px;
          z-index: 5000;
          max-width: 320px;
        }
        .tactical-popup {
          padding: 20px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .border-gold { border-left: 4px solid var(--primary); }
        .border-alert { border-left: 4px solid var(--danger); }
        
        .popup-header { display: flex; justify-content: space-between; align-items: center; }
        .title-box { display: flex; align-items: center; gap: 8px; }
        .p-title { font-size: 0.85rem; font-weight: 900; color: #f2f2f2; }
        .p-close { background: none; border: none; color: #64748b; cursor: pointer; }
        
        .p-desc { font-size: 0.75rem; color: #94a3b8; line-height: 1.5; font-weight: 600; }
        
        .popup-footer { display: flex; justify-content: space-between; align-items: center; }
        .p-action-btn { background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.2); color: var(--primary); font-size: 0.7rem; font-weight: 900; padding: 6px 12px; border-radius: 6px; display: flex; align-items: center; gap: 6px; cursor: pointer; }
        .p-time { font-size: 0.6rem; color: #475569; font-weight: 800; }

        @media (max-width: 768px) {
          .tactical-popup-wrapper {
            bottom: 40px;
            right: 20px;
            left: 20px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}
