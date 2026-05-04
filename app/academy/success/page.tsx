\"use client\";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Trophy, 
  Star, 
  Award,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function SuccessStories() {
  return (
    <div className=\"academy-container animate-fade-in\">
      <div className=\"section-header\">
        <h1><span className=\"tag\">[ SUCCESS ]</span> 명예의 전당 (Hall of Fame)</h1>
        <p className=\"subtitle\">성공적인 오퍼레이터들의 매매 기록</p>
      </div>

      <div className=\"success-list\">
        <GlassCard className=\"empty-card\">
          <div className=\"empty-content\">
            <Trophy size={48} className=\"muted-gold\" />
            <h3>아직 등록된 성공 사례가 없습니다.</h3>
            <p>당신이 이 명예의 전당의 첫 번째 주인공이 되어보세요.</p>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        .empty-card { padding: 80px 20px; display: flex; align-items: center; justify-content: center; text-align: center; }
        .empty-content { display: flex; flex-direction: column; align-items: center; gap: 20px; }
        .muted-gold { color: rgba(212, 175, 55, 0.3); }
        .empty-content h3 { font-size: 1.4rem; font-weight: 800; color: #f2f2f2; }
        .empty-content p { color: #64748b; font-weight: 600; }
      `}</style>
    </div>
  );
}
