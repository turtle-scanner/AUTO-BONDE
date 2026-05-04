\"use client\";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Tv, 
  Wifi, 
  Radio,
  Play,
  Activity
} from 'lucide-react';

export default function TvLive() {
  return (
    <div className=\"academy-container animate-fade-in\">
      <div className=\"section-header\">
        <h1><span className=\"tag\">[ TV LIVE ]</span> 실전 매매 라이브 방송</h1>
        <p className=\"subtitle\">전문가와 함께하는 실시간 시장 대응</p>
      </div>

      <div className=\"tv-grid\">
        <GlassCard title=\"LIVE STREAM\" icon={<Wifi size={18} className=\"red\" />}>
          <div className=\"video-placeholder glass\">
            <Radio size={64} className=\"muted-gold animate-pulse\" />
            <h3>현재 라이브 방송이 없습니다.</h3>
            <p>다음 방송 일정을 확인해주시기 바랍니다.</p>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        .video-placeholder { height: 450px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 24px; text-align: center; }
        .muted-gold { color: rgba(212, 175, 55, 0.3); }
        .red { color: #ef4444; }
      `}</style>
    </div>
  );
}
