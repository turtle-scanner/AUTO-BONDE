\"use client\";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Lightbulb, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

export default function AcademyIntro() {
  return (
    <div className=\"academy-container animate-fade-in\">
      {/* AI Partner Greeting */}
      <div className=\"ai-briefing glass\">
        <div className=\"ai-avatar\">AI</div>
        <div className=\"ai-content\">
          <h3>안녕하세요 오퍼레이터님! 투자 아카데미에 오신 것을 환영합니다.</h3>
          <p>
            투자 아카데미는 프라디프 본데(Pradeep Bonde)의 모멘텀 트레이딩 철학을 바탕으로, 
            개인 투자자가 시장의 주도주를 포착하고 수익을 극대화할 수 있는 실전 전략을 교육합니다. 
            단순한 이론 교육이 아닌, 실제 시장 데이터를 활용한 실전 매매 기법을 익힐 수 있도록 돕겠습니다.
          </p>
        </div>
      </div>

      <div className=\"section-header\">
        <h1><span className=\"tag\">[ ACADEMY ]</span> 프라디프 본데(Bonde)의 투자 철학</h1>
        <p className=\"subtitle\">시장을 주도하는 '모멘텀'의 원리를 이해하고 수익으로 연결하는 법</p>
      </div>

      <div className=\"biography-grid\">
        <GlassCard className=\"bio-card\">
          <div className=\"bio-header\">
            <Briefcase className=\"gold\" size={24} />
            <h2>1. 프라디프 본데는 누구인가?</h2>
          </div>
          <div className=\"bio-body\">
            <p>
              프라디프 본데는 수천 퍼센트의 수익률을 기록한 전설적인 트레이더입니다. 
              그는 시장의 강한 모멘텀을 가진 종목을 발굴하여 단기간에 높은 수익을 올리는 전략으로 유명합니다. 
              그의 전략은 윌리엄 오닐의 CANSLIM 전략과 마크 미너비니의 VCP 패턴을 현대적으로 재해석한 것입니다.
            </p>
          </div>
        </GlassCard>

        <GlassCard className=\"bio-card\">
          <div className=\"bio-header\">
            <Lightbulb className=\"gold\" size={24} />
            <h2>2. 핵심 매매 기법: Nano Banana</h2>
          </div>
          <div className=\"bio-body\">
            <p>
              본데의 대표적인 전략 중 하나인 'Nano Banana'는 강력한 상승 추세에 있는 종목이 
              잠시 휴식을 취하는 구간(변동성 축소 구간)을 노려 매수하는 기법입니다. 
              이 전략은 손절 라인은 짧게 잡고, 익절 구간은 길게 가져가는 손익비가 매우 뛰어난 전략입니다.
            </p>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; color: white; }
        .ai-briefing { display: flex; gap: 24px; padding: 30px; border-left: 4px solid var(--primary); background: rgba(212, 175, 55, 0.03); align-items: flex-start; border-radius: 12px; }
        .ai-avatar { width: 50px; height: 50px; background: var(--primary); color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; flex-shrink: 0; }
        .ai-content h3 { font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 12px; }
        .ai-content p { font-size: 0.95rem; line-height: 1.7; color: #cbd5e1; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        .biography-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .bio-card { padding: 30px; display: flex; flex-direction: column; gap: 24px; }
        .bio-header { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px; }
        .bio-header h2 { font-size: 1.1rem; font-weight: 900; color: #f2f2f2; margin: 0; }
        .bio-body p { font-size: 0.9rem; line-height: 1.8; color: #b0b0b0; }
        .gold { color: #d4af37; }

        @media (max-width: 768px) {
          .biography-grid { grid-template-columns: 1fr; }
          .academy-container { padding: 20px; }
        }
      `}</style>
    </div>
  );
}
