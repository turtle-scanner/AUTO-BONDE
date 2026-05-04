"use client";

import React, { useEffect, useRef } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  LineChart, 
  Smartphone, 
  BellRing, 
  ShieldAlert, 
  Zap, 
  Send, 
  AlertCircle 
} from 'lucide-react';

export default function TradingViewLivePage() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          "autosize": true,
          "symbol": "NASDAQ:NVDA",
          "interval": "D",
          "timezone": "Asia/Seoul",
          "theme": "dark",
          "style": "1",
          "locale": "ko",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "tradingview_chart"
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="tv-live-container animate-fade-in">
      <div className="tv-header">
        <h1 className="tv-title">
          <LineChart size={36} className="gold" /> 5-g. [ TVLIVE ] 트레이딩뷰 라이브 사령부
        </h1>
        <div className="premium-badge">PREMIUM UX v6.5</div>
      </div>

      <div className="tv-main-grid">
        {/* TradingView Chart Area */}
        <GlassCard className="chart-wrapper">
          <div id="tradingview_chart" style={{ height: '600px' }}></div>
        </GlassCard>

        {/* Tactical Control Panel (Mobile Optimized) */}
        <div className="control-sidebar">
          <GlassCard className="mobile-command">
            <h3 className="gold"><Smartphone size={18} /> MOBILE COMMAND POST</h3>
            <div className="command-grid">
              <button className="cmd-btn danger">
                <ShieldAlert size={20} />
                <span>긴급 전량 매도 (EMERGENCY SELL)</span>
              </button>
              <button className="cmd-btn warning">
                <Zap size={20} />
                <span>시스템 일시정지 (PAUSE BOT)</span>
              </button>
            </div>
            <p className="cmd-desc">외부에서도 스마트폰으로 즉시 모든 포지션을 정리하고 안전하게 대피할 수 있습니다.</p>
          </GlassCard>

          <GlassCard className="alert-intelligence">
            <h3 className="gold"><BellRing size={18} /> ALERT INTELLIGENCE</h3>
            <div className="alert-status-list">
              <div className="alert-status-item active">
                <div className="status-label">
                  <Send size={14} /> Telegram Integration
                </div>
                <span className="status-val">CONNECTED</span>
              </div>
              <div className="alert-status-item">
                <div className="status-label">
                  <AlertCircle size={14} /> Push Notifications
                </div>
                <span className="status-val">READY</span>
              </div>
            </div>
            <div className="alert-config">
              <label>신호 강도 필터 (Signal Sensitivity)</label>
              <input type="range" className="gold-range" />
              <div className="range-labels">
                <span>Safe</span>
                <span>Aggressive</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .tv-live-container { padding: 40px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .tv-header { display: flex; justify-content: space-between; align-items: center; }
        .tv-title { font-size: 2.2rem; font-weight: 900; display: flex; align-items: center; gap: 16px; }
        .premium-badge { background: var(--gold-400); color: black; padding: 4px 12px; border-radius: 4px; font-size: 0.7rem; font-weight: 900; }

        .tv-main-grid { display: grid; grid-template-columns: 1fr 380px; gap: 30px; }
        .chart-wrapper { padding: 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }

        .control-sidebar { display: flex; flex-direction: column; gap: 30px; }
        .mobile-command { padding: 24px; }
        .mobile-command h3 { font-size: 0.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        
        .command-grid { display: flex; flex-direction: column; gap: 16px; }
        .cmd-btn { padding: 20px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 12px; font-weight: 900; font-size: 0.9rem; cursor: pointer; transition: transform 0.2s; }
        .cmd-btn:hover { transform: scale(1.02); }
        .cmd-btn.danger { background: #ff0055; color: white; box-shadow: 0 4px 15px rgba(255, 0, 85, 0.3); }
        .cmd-btn.warning { background: #fbbf24; color: black; box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3); }
        .cmd-desc { font-size: 0.75rem; color: var(--text-muted); margin-top: 16px; line-height: 1.5; text-align: center; font-style: italic; }

        .alert-intelligence { padding: 24px; }
        .alert-intelligence h3 { font-size: 0.9rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        
        .alert-status-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .alert-status-item { padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 700; }
        .alert-status-item.active .status-val { color: #10b981; }
        .status-label { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }

        .alert-config { display: flex; flex-direction: column; gap: 12px; }
        .alert-config label { font-size: 0.75rem; font-weight: 800; color: var(--gold-400); }
        .gold-range { width: 100%; accent-color: var(--gold-400); }
        .range-labels { display: flex; justify-content: space-between; font-size: 0.65rem; font-weight: 800; color: var(--text-muted); }

        .gold { color: var(--gold-400); }

        @media (max-width: 1200px) {
          .tv-main-grid { grid-template-columns: 1fr; }
          .control-sidebar { order: -1; }
        }
      `}</style>
    </div>
  );
}
