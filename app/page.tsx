"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import TradingChart from '@/components/TradingChart';
import QuickOrder from '@/components/QuickOrder';
import { useMarketData } from '@/hooks/useMarketData';
import { 
  TrendingUp, 
  Activity, 
  Box, 
  Shield, 
  Zap, 
  RefreshCw, 
  Cpu, 
  Terminal as TerminalIcon,
  Wifi, 
  WifiOff,
  ChevronRight,
  Target
} from 'lucide-react';
import dynamic from 'next/dynamic';

const TacticalPopup = dynamic(() => import('@/components/TacticalPopup'), { ssr: false });

export default function Dashboard() {
  const router = useRouter();
  const { data: liveMarket, isConnected } = useMarketData();
  const [isAuth, setIsAuth] = useState(false);
  const [showTactical, setShowTactical] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem('dragonfly_user');
    if (!user) {
      router.push('/login');
    } else {
      setIsAuth(true);
      // 접속 3초 후 전략 팝업 표시
      const timer = setTimeout(() => setShowTactical(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [router]);

  if (!isAuth) return null;

  return (
    <main className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="status-badge">
            {isConnected ? <Wifi size={14} className="online" /> : <WifiOff size={14} className="offline" />}
            <span>{isConnected ? 'LIVE' : 'RECONNECTING...'}</span>
          </div>
          <h1>전술적 상황실 (TACTICAL HQ)</h1>
        </div>
        <div className="header-right">
          <button className="tactical-btn" onClick={() => setShowTactical(true)}>
             <Zap size={16} /> 전략 브리핑
          </button>
        </div>
      </header>

      <div className="dashboard-grid">
        <GlassCard className="chart-section" title="실시간 시장 분석" icon={<Activity size={18} />}>
          <TradingChart />
        </GlassCard>

        <div className="side-panels">
          <GlassCard className="order-section" title="신속 매매 집행" icon={<Zap size={18} />}>
            <QuickOrder />
          </GlassCard>
          
          <GlassCard className="status-section" title="AI 엔진 상태" icon={<Cpu size={18} />}>
            <div className="status-grid">
              <div className="status-item">
                <span className="label">신뢰도</span>
                <span className="value gold">98.5%</span>
              </div>
              <div className="status-item">
                <span className="label">리스크</span>
                <span className="value green">LOW</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <TacticalPopup isOpen={showTactical} onClose={() => setShowTactical(false)} />

      <style jsx>{`
        .dashboard-container { padding: 24px; display: flex; flex-direction: column; gap: 24px; min-height: 100vh; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; }
        .header-left h1 { font-size: 1.5rem; font-weight: 900; color: white; margin-top: 8px; }
        .status-badge { display: flex; align-items: center; gap: 8px; font-size: 0.7rem; font-weight: 800; color: #64748b; }
        .online { color: #10b981; }
        .offline { color: #ef4444; }
        
        .tactical-btn { background: var(--primary); color: black; border: none; padding: 10px 20px; border-radius: 30px; font-weight: 900; font-size: 0.8rem; display: flex; align-items: center; gap: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(212,175,55,0.3); }

        .dashboard-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; flex: 1; }
        .side-panels { display: flex; flex-direction: column; gap: 24px; }
        
        .status-grid { display: grid; grid-cols: 2; gap: 16px; margin-top: 10px; }
        .status-item { display: flex; flex-direction: column; gap: 4px; background: rgba(255,255,255,0.03); padding: 12px; border-radius: 12px; }
        .status-item .label { font-size: 0.65rem; color: #64748b; font-weight: 800; }
        .status-item .value { font-size: 1.2rem; font-weight: 900; }
        .gold { color: #d4af37; }
        .green { color: #10b981; }

        @media (max-width: 1024px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .side-panels { order: 2; }
          .chart-section { order: 1; min-height: 400px; }
        }
      `}</style>
    </main>
  );
}
