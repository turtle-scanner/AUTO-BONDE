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

    </div>
  );
}
