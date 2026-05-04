"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import TradingChart from '@/components/TradingChart';
import QuickOrder from '@/components/QuickOrder';
import { useMarketData } from '@/hooks/useMarketData';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Cpu, 
  Terminal as TerminalIcon,
  Wifi, 
  WifiOff,
  Globe,
  X
} from 'lucide-react';

const TacticalTargets = () => {
  const targets = [
    { category: 'BONDE PICK', name: 'NVDA', price: '924.50', status: 'TARGET REACHED', trend: 'up' },
    { category: 'EP SIGNAL', name: 'TSMC', price: '142.10', status: 'VCP PATTERN', trend: 'up' },
    { category: 'DRY-UP ENTRY', name: 'MSFT', price: '425.20', status: 'VOLUME DRY-UP', trend: 'neutral' },
  ];

  return (
    <div className="tactical-targets-bar glass">
      <div className="scanning-indicator">
        <div className="scan-dot animate-pulse"></div>
        <span>TACTICAL SCAN ACTIVE</span>
      </div>
      <div className="targets-scroll">
        {targets.map((t, i) => (
          <div key={i} className="target-card">
            <span className={`target-cat ${t.category.toLowerCase().replace(' ', '-')}`}>{t.category}</span>
            <span className="target-name">{t.name}</span>
            <span className="target-price">{t.price}</span>
            <span className="target-status">{t.status}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        .tactical-targets-bar { padding: 12px 24px; display: flex; align-items: center; gap: 30px; border: 1px solid rgba(212,175,55,0.1); border-radius: 12px; margin-bottom: 20px; }
        .scanning-indicator { display: flex; align-items: center; gap: 10px; font-size: 0.65rem; font-weight: 900; color: #d4af37; white-space: nowrap; }
        .scan-dot { width: 6px; height: 6px; background: #d4af37; border-radius: 50%; box-shadow: 0 0 10px #d4af37; }
        .targets-scroll { display: flex; gap: 40px; overflow-x: auto; scrollbar-width: none; padding-bottom: 5px; }
        .target-card { display: flex; align-items: center; gap: 12px; white-space: nowrap; cursor: pointer; transition: transform 0.2s; }
        .target-card:hover { transform: scale(1.05); }
        .target-cat { font-size: 0.6rem; font-weight: 900; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.05); }
        .target-cat.bonde-pick { color: #fbbf24; border: 1px solid #fbbf24; }
        .target-cat.ep-signal { color: #f87171; border: 1px solid #f87171; }
        .target-cat.dry-up-entry { color: #60a5fa; border: 1px solid #60a5fa; }
        .target-name { font-size: 0.9rem; font-weight: 900; color: #f2f2f2; }
        .target-price { font-size: 0.85rem; font-weight: 700; color: #94a3b8; }
        .target-status { font-size: 0.75rem; font-weight: 800; color: #d4af37; opacity: 0.8; }
      `}</style>
    </div>
  );
};

export default function PlatinumDashboard() {
  const router = useRouter();
  const { data: liveMarket, isConnected } = useMarketData();
  const [botStatus, setBotStatus] = useState<any>({ status: 'LIVE', lastHeartbeat: 'SYNCING...' });
  const [isAuth, setIsAuth] = useState(false);
  const [showBanner, setShowBanner] = useState(false); // 배너 표시 여부 (모바일 대응)

  useEffect(() => {
    const user = sessionStorage.getItem('dragonfly_user');
    if (!user) {
      router.push('/login');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) return null;

  const commandLogs = [
    { time: '23:14:22', msg: 'HEARTBEAT: ALL SYSTEMS OPERATIONAL', type: 'system' },
    { time: '23:12:05', msg: 'MARKET SCAN: NVDA VCP PATTERN DETECTED', type: 'info' },
    { time: '23:08:45', msg: 'AI ANALYSIS: GLOBAL SENTIMENT SHIFT TO BULLISH', type: 'success' },
    { time: '23:05:12', msg: 'HEADLESS TRADER: EXECUTING CYCLE #142', type: 'info' },
  ];

  return (
    <div className="platinum-dashboard animate-fade-in">
      {/* 배너 토글 버튼 (모바일 전용) */}
      <div className="banner-toggle-fixed">
        <button 
          onClick={() => setShowBanner(true)}
          className="banner-pulse-btn"
        >
          <Zap size={20} />
        </button>
      </div>

      {/* 전략 브리핑 배너 (모바일 대응) */}
      {showBanner && (
        <div className="tactical-banner-overlay">
          <div className="tactical-banner-modal glass animate-slide-up">
            <button className="banner-close" onClick={() => setShowBanner(false)}>
              <X size={24} />
            </button>
            <div className="banner-content">
              <div className="banner-tag">STRATEGIC BRIEFING</div>
              <h2>[ TACTICAL MISSION ]</h2>
              <p className="banner-text">
                전략적 중요도가 높은 종목들의 변동성이 감지되었습니다. 
                현재 시장의 주도 테마인 반도체와 AI 관련 핵심 타겟들에 대한 정밀 모니터링을 권장합니다.
                VCP 패턴이 완성된 종목들의 돌파 시점을 예의주시하십시오.
              </p>
              <div className="banner-actions">
                <button className="primary-btn" onClick={() => setShowBanner(false)}>이해했습니다</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="main-content">
          <TacticalTargets />
          
          <div className="charts-row">
            <GlassCard title="LIVE MARKET FEED" icon={<Activity size={18} />}>
              <TradingChart data={liveMarket} />
            </GlassCard>
            
            <div className="stats-col">
              <GlassCard title="SYSTEM STATUS" icon={<Cpu size={18} />}>
                <div className="status-grid">
                  <div className="status-item">
                    <span className="status-label">ENGINE</span>
                    <span className="status-value online">OPERATIONAL</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">LATENCY</span>
                    <span className="status-value">24ms</span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">NET</span>
                    <span className="status-value">{isConnected ? <Wifi size={14} className="green" /> : <WifiOff size={14} className="red" />}</span>
                  </div>
                </div>
              </GlassCard>

              <GlassCard title="QUICK COMMANDS" icon={<TerminalIcon size={18} />}>
                <div className="command-grid">
                  <button className="cmd-btn"><Zap size={14} /> SCAN</button>
                  <button className="cmd-btn"><TrendingUp size={14} /> TOP</button>
                  <button className="cmd-btn"><Globe size={14} /> NEWS</button>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="bottom-row">
            <GlassCard title="EXECUTION LOGS" icon={<Box size={18} />}>
              <div className="log-container">
                {commandLogs.map((log, i) => (
                  <div key={i} className={`log-entry ${log.type}`}>
                    <span className="log-time">[{log.time}]</span>
                    <span className="log-msg">{log.msg}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="side-panel">
          <GlassCard title="SMART ORDER" icon={<Zap size={18} />}>
            <QuickOrder />
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .platinum-dashboard { padding: 30px; color: #f2f2f2; position: relative; }
        .dashboard-grid { display: grid; grid-template-columns: 1fr 350px; gap: 20px; }
        .main-content { display: flex; flex-direction: column; gap: 20px; }
        .charts-row { display: grid; grid-template-columns: 1fr 280px; gap: 20px; min-height: 400px; }
        .stats-col { display: flex; flex-direction: column; gap: 20px; }
        
        .status-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .status-item { background: rgba(255,255,255,0.03); padding: 12px; border-radius: 10px; display: flex; flex-direction: column; gap: 4px; }
        .status-label { font-size: 0.6rem; font-weight: 800; color: #64748b; }
        .status-value { font-size: 0.8rem; font-weight: 900; }
        .status-value.online { color: #10b981; }
        
        .command-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .cmd-btn { background: rgba(212,175,55,0.1); border: 1px solid rgba(212,175,55,0.2); color: #d4af37; padding: 10px; border-radius: 8px; font-size: 0.7rem; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; transition: all 0.2s; }
        .cmd-btn:hover { background: rgba(212,175,55,0.2); transform: translateY(-2px); }

        .log-container { display: flex; flex-direction: column; gap: 8px; font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; }
        .log-entry { display: flex; gap: 12px; padding: 4px 8px; border-radius: 4px; }
        .log-entry.system { color: #d4af37; background: rgba(212,175,55,0.05); }
        .log-entry.success { color: #10b981; }
        .log-time { color: #475569; font-weight: 700; }

        .banner-toggle-fixed { position: fixed; bottom: 30px; right: 30px; z-index: 1000; }
        .banner-pulse-btn { width: 56px; height: 56px; border-radius: 50%; background: #d4af37; color: black; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); animation: pulse 2s infinite; }
        
        .tactical-banner-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .tactical-banner-modal { background: rgba(15, 15, 20, 0.95); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 24px; max-width: 500px; width: 100%; position: relative; padding: 40px; }
        .banner-close { position: absolute; top: 20px; right: 20px; background: none; border: none; color: #64748b; cursor: pointer; }
        .banner-tag { color: #d4af37; font-weight: 900; letter-spacing: 2px; font-size: 0.7rem; margin-bottom: 10px; }
        .banner-text { color: #94a3b8; line-height: 1.6; margin: 20px 0; }
        .primary-btn { width: 100%; padding: 16px; border-radius: 12px; background: #d4af37; color: black; border: none; font-weight: 900; cursor: pointer; }

        @keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); } 70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); } }

        @media (max-width: 1200px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .side-panel { display: none; }
        }

        @media (max-width: 768px) {
          .platinum-dashboard { padding: 15px; }
          .charts-row { grid-template-columns: 1fr; min-height: auto; }
          .tactical-targets-bar { display: none; }
        }

        .green { color: #10b981; }
        .red { color: #ef4444; }
      `}</style>
    </div>
  );
}
