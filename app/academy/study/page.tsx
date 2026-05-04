\"use client\";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  BookOpen, 
  PlayCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  Zap
} from 'lucide-react';

export default function StudyPage() {
  const lectures = [
    { id: 1, title: \"모멘텀 트레이딩의 기초\", duration: \"45분\", tag: \"입문\" },
    { id: 2, title: \"VCP 패턴 완벽 이해하기\", duration: \"60분\", tag: \"중급\" },
    { id: 3, title: \"나노 바나나 전략 심화\", duration: \"50분\", tag: \"고급\" },
  ];

  return (
    <div className=\"academy-container animate-fade-in\">
      <div className=\"section-header\">
        <h1><span className=\"tag\">[ STUDY ]</span> 트레이딩 실전 강의실</h1>
        <p className=\"subtitle\">단계별 커리큘럼을 통한 전문가 과정</p>
      </div>

      <div className=\"lecture-grid\">
        {lectures.map(lecture => (
          <GlassCard key={lecture.id} className=\"lecture-card glass-hover\">
            <div className=\"lecture-icon\">
              <PlayCircle size={32} className=\"gold\" />
            </div>
            <div className=\"lecture-info\">
              <span className=\"l-tag\">{lecture.tag}</span>
              <h3>{lecture.title}</h3>
              <div className=\"l-meta\">
                <Clock size={14} /> <span>{lecture.duration}</span>
              </div>
            </div>
            <ChevronRight size={20} className=\"muted\" />
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        .lecture-grid { display: flex; flex-direction: column; gap: 15px; }
        .lecture-card { padding: 20px 30px; display: flex; align-items: center; gap: 24px; cursor: pointer; }
        .lecture-info { flex: 1; }
        .l-tag { font-size: 0.7rem; font-weight: 900; color: var(--primary); background: rgba(212, 175, 55, 0.1); padding: 2px 8px; border-radius: 4px; }
        .lecture-info h3 { font-size: 1.1rem; font-weight: 800; color: #f2f2f2; margin: 8px 0; }
        .l-meta { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: #64748b; font-weight: 700; }
        .gold { color: #d4af37; }
        .muted { color: #475569; }
      `}</style>
    </div>
  );
}
