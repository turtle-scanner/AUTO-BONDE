"use client";

import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, X, ArrowRight, Bell, Target } from 'lucide-react';

export default function TacticalPopup() {
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState({
    title: "사령부 긴급 브리핑",
    body: "시장 상황이 급변하고 있습니다. 실시간 타점 레이더를 확인하십시오.",
    type: "INFO"
  });

  useEffect(() => {
    // 최초 3초 후 첫 팝업 노출 (데모용)
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setShow(false);

  if (!show) return null;

  return (
    <div className="tactical-popup-wrapper animate-slide-in">
      <div className={`tactical-popup glass ${msg.type === 'ALERT' ? 'border-alert' : 'border-gold'}`}>
        <div className="popup-header">
          <div className="title-box">
            {msg.type === 'ALERT' ? <ShieldAlert size={18} className="alert-red" /> : <Zap size={18} className="gold" />}
            <span className="p-title">{msg.title}</span>
          </div>
          <button onClick={closePopup} className="p-close">
            <X size={16} />
          </button>
        </div>
        
        <div className="popup-body">
          <p className="p-desc">{msg.body}</p>
        </div>

        <div className="popup-footer">
          <button className="p-action-btn">
            상세 확인하기 <ArrowRight size={14} />
          </button>
          <div className="p-time">JUST NOW</div>
        </div>
      </div>

      <style jsx>{`
        .tactical-popup-wrapper {
          position: fixed;
          top: 80px;
          right: 30px;
          z-index: 9999;
          width: 340px;
        }

        .tactical-popup {
          padding: 20px;
          border-radius: 20px;
          background: rgba(15, 15, 20, 0.85);
          backdrop-filter: blur(25px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .border-gold { border: 1px solid rgba(212, 175, 55, 0.4); box-shadow: inset 0 0 15px rgba(212, 175, 55, 0.05); }
        .border-alert { border: 1px solid rgba(255, 0, 85, 0.4); box-shadow: inset 0 0 15px rgba(255, 0, 85, 0.1); }

        .popup-header { display: flex; justify-content: space-between; align-items: center; }
        .title-box { display: flex; align-items: center; gap: 10px; }
        .p-title { font-size: 0.85rem; font-weight: 900; color: #f2f2f2; letter-spacing: 0.5px; }
        .p-close { background: none; border: none; color: #737373; cursor: pointer; transition: color 0.2s; }
        .p-close:hover { color: white; }

        .p-desc { font-size: 0.9rem; color: #b0b0b0; line-height: 1.5; font-weight: 500; margin: 0; }

        .popup-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
        .p-action-btn { background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.2); color: #d4af37; padding: 6px 14px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .p-action-btn:hover { background: #d4af37; color: black; }
        .p-time { font-size: 0.65rem; font-weight: 800; color: #555; }

        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .gold { color: #d4af37; }
        .alert-red { color: #ff0055; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
