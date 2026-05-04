\"use client\";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Heart, 
  MessageSquare,
  FileText,
  TrendingUp,
  Sparkles,
  User,
  Plus
} from 'lucide-react';

export default function ReviewPage() {
  return (
    <div className=\"academy-container animate-fade-in\">
      <div className=\"section-header\">
        <h1><span className=\"tag\">[ REVIEW ]</span> 오퍼레이터 매매 복기 및 공유</h1>
        <p className=\"subtitle\">성공과 실패의 기록을 통한 성장</p>
      </div>

      <div className=\"review-list\">
        <GlassCard className=\"empty-card\">
          <div className=\"empty-content\">
            <FileText size={48} className=\"muted-gold\" />
            <h3>아직 작성된 매매 일지가 없습니다.</h3>
            <p>오늘의 매매를 기록하고 동료 오퍼레이터들과 인사이트를 나누어보세요.</p>
            <button className=\"primary-btn\">
              <Plus size={18} /> 새 매매 일지 작성
            </button>
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
        .primary-btn { background: var(--primary); color: black; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 900; display: flex; align-items: center; gap: 8px; cursor: pointer; }
      `}</style>
    </div>
  );
}
