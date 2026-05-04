\"use client\";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Radar, 
  Zap, 
  Target,
  Search,
  Activity,
  ArrowUpRight,
  RefreshCw
} from 'lucide-react';

export default function NanoBananaRadar() {
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=\"academy-container animate-fade-in\">
      <div className=\"section-header\">
        <h1><span className=\"tag\">[ RADAR ]</span> 나노 바나나 레이더 (Nano Banana Radar)</h1>
        <p className=\"subtitle\">실시간 모멘텀 주도주 포착 시스템</p>
      </div>

      <div className=\"radar-grid\">
        <GlassCard title=\"실시간 스캐닝 현황\" icon={<Activity size={18} />}>
          <div className=\"radar-display\">
            {isScanning ? (
              <div className=\"scanning-overlay\">
                <RefreshCw size={48} className=\"animate-spin gold\" />
                <p>시장의 주도주를 탐색 중입니다...</p>
              </div>
            ) : (
              <div className=\"radar-list\">
                <p className=\"empty-msg\">현재 포착된 나노 바나나 타겟이 없습니다. 시장 모니터링을 지속하십시오.</p>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard title=\"레이더 작동 원리\" icon={<Target size={18} />}>
          <div className=\"guide-content\">
            <div className=\"guide-item\">
              <Zap size={20} className=\"gold\" />
              <div>
                <h4>강한 모멘텀 감지</h4>
                <p>최근 1개월 내 20% 이상의 급등이 있었던 종목을 우선순위로 둡니다.</p>
              </div>
            </div>
            <div className=\"guide-item\">
              <Search size={20} className=\"gold\" />
              <div>
                <h4>변동성 축소 확인</h4>
                <p>상승 후 좁은 박스권에서 거래량이 감소하며 휴식 중인 종목을 찾습니다.</p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        .radar-grid { display: grid; grid-template-columns: 1fr 400px; gap: 20px; }
        .radar-display { height: 400px; display: flex; align-items: center; justify-content: center; position: relative; }
        .scanning-overlay { display: flex; flex-direction: column; align-items: center; gap: 20px; color: #94a3b8; }
        .empty-msg { color: #64748b; font-weight: 700; text-align: center; }
        .guide-content { display: flex; flex-direction: column; gap: 24px; padding: 20px; }
        .guide-item { display: flex; gap: 16px; align-items: flex-start; }
        .guide-item h4 { font-size: 1rem; font-weight: 800; color: #f2f2f2; margin-bottom: 4px; }
        .guide-item p { font-size: 0.85rem; color: #94a3b8; line-height: 1.5; }
        .gold { color: #d4af37; }

        @media (max-width: 1100px) {
          .radar-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
