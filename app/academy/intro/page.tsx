"use client";

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
    <div className="academy-container animate-fade-in">
      {/* AI Partner Greeting */}
      <div className="ai-briefing glass">
        <div className="ai-avatar">AI</div>
        <div className="ai-content">
          <h3>사령관님, 주식 시장의 수행자 '프라딥 본데'를 소개합니다.</h3>
          <p>
            프라딥 본데(Pradeep Bonde)는 시장에서 단순함의 미학을 극적으로 증명해낸 인물입니다. 
            인도 출신의 평범한 직장인이 어떻게 세계적인 트레이더가 되었는지, 그 과정을 함께 살펴보고자 합니다. 
            저는 지휘관님의 학습 파트너로서 본데의 일생과 전략을 안내하고, 중간중간 질문을 통해 깊이 있는 이해를 도와드릴게요. 🏛️
          </p>
        </div>
      </div>

      <div className="section-header">
        <h1><span className="tag">[ ACADEMY ]</span> 5-a. 본데(Bonde)는 누구인가?</h1>
        <p className="subtitle">전설적 트레이더 프라딥 본데의 일생과 전술적 철학</p>
      </div>

      <div className="biography-grid">
        {/* 1. Career Section */}
        <GlassCard className="bio-card">
          <div className="bio-header">
            <Briefcase className="gold" size={24} />
            <h2>1. 직업 일생: 평범한 직장인에서 시장의 대가로</h2>
          </div>
          <div className="bio-body">
            <p>
              프라딥 본데는 원래 인도에서 <strong>DHL과 FedEx</strong> 같은 글로벌 물류 기업의 마케팅 책임자로 일하던 화이트칼라 직장인이었습니다. 
              안정적인 삶을 살던 그가 주식에 눈을 뜬 계기는 아주 가까운 곳에 있었습니다. 바로 옆자리의 직장 동료가 주식 매매를 통해 놀라운 성과를 내는 것을 목격한 것이죠. 🤝
            </p>
            <div className="callout gold-border">
              이 경험은 본데에게 강렬한 자극이 되었고, 그는 단순히 돈을 버는 기술을 넘어 '시장의 작동 원리'를 파악하기 위해 본격적으로 트레이딩의 세계에 발을 들였습니다. 이후 그는 전업 투자자로 전향하여 자신만의 독보적인 시스템을 구축하게 됩니다.
            </div>
          </div>
        </GlassCard>

        {/* 2. Study Section */}
        <GlassCard className="bio-card">
          <div className="bio-header">
            <BookOpen className="gold" size={24} />
            <h2>2. 주식 공부: 스승들의 지혜와 시스템의 결합</h2>
          </div>
          <div className="bio-body">
            <div className="sub-section">
              <h4>거인들의 어깨 위에서</h4>
              <p>그는 윌리엄 오닐의 실적 기반 성장주 투자 원칙(CAN SLIM)과 마크 미너비니의 기술적 분석(VCP 패턴)을 철저히 연구했습니다.</p>
            </div>
            <div className="sub-section">
              <h4>동료와의 기술적 협력</h4>
              <p>특히 지표 개발자인 투시아르 찬드(Tushar Chande)와의 협력은 결정적이었습니다. 찬드가 변동성을 수치화하는 지표(CMO, DMI 등)를 개발하면, 본데는 이를 실전 매매에서 검증하며 시스템을 정교하게 다듬었습니다. 🛠️</p>
            </div>
            <div className="question-box glass">
              <HelpCircle size={18} className="gold" />
              <span>지휘관님, 본데가 왜 '일상의 단순화'를 그토록 강조했는지 그 이유가 무엇일까요?</span>
            </div>
          </div>
        </GlassCard>

        {/* 3. Performance Section */}
        <GlassCard className="bio-card">
          <div className="bio-header">
            <TrendingUp className="gold" size={24} />
            <h2>3. 수익률: 에피소딕 피벗(EP)과 4% 루틴</h2>
          </div>
          <div className="bio-body">
            <div className="stat-row">
              <div className="stat-item">
                <Zap size={20} className="gold" />
                <div className="stat-text">
                  <strong>에피소딕 피벗 (EP)</strong>
                  <p>강력한 뉴스나 실적 가속화라는 촉매제가 터지며 거래량이 폭발하는 종목을 초기 단계에 포착하여 수천 퍼센트의 수익을 거두었습니다. ⚡</p>
                </div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-item">
                <Lightbulb size={20} className="gold" />
                <div className="stat-text">
                  <strong>4% 루틴</strong>
                  <p>매일 주가가 4% 이상 급등하는 종목을 전수 조사하는 성실함이 그 바탕이 되었습니다.</p>
                </div>
              </div>
            </div>
            <div className="stat-row">
              <div className="stat-item">
                <ShieldCheck size={20} className="gold" />
                <div className="stat-text">
                  <strong>리스크 관리</strong>
                  <p>그는 수익보다 '생존'을 우선시했습니다. 미리 정한 손절선에 닿으면 기계적으로 매도하여 자산을 보호했기에, 복리의 마법을 온전히 누릴 수 있었습니다. 🛡️</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* 4. Disciples Section */}
        <GlassCard className="bio-card">
          <div className="bio-header">
            <Users className="gold" size={24} />
            <h2>4. 제자들: 전략의 전수와 증명</h2>
          </div>
          <div className="bio-body">
            <p>
              본데의 전략이 단순히 '본인만 잘하는 것'이 아님을 증명한 인물이 바로 <strong>크리스찬 쿨라매기(Kristjan Kullamägi)</strong>입니다. 
              쿨라매기는 본데의 가르침과 매매 일지를 바탕으로 자신만의 스타일을 정립하여 1억 달러(약 1,300억 원) 이상의 수익을 올린 것으로 유명합니다.
            </p>
            <p className="highlight-p">
              본데의 오픈소스 정신과 쿨라매기의 실전 성과는 오늘날 수많은 트레이더들에게 희망이 되고 있습니다.
            </p>
            <div className="footer-action">
              <span>다음 과정: 본데의 핵심 전술 학습하기</span>
              <ChevronRight size={18} />
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .academy-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; color: white; }
        
        .ai-briefing { display: flex; gap: 24px; padding: 30px; border-left: 4px solid var(--primary); background: rgba(212, 175, 55, 0.03); align-items: flex-start; }
        .ai-avatar { width: 50px; height: 50px; background: var(--primary); color: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; flex-shrink: 0; }
        .ai-content h3 { font-size: 1.3rem; font-weight: 800; color: var(--primary); margin-bottom: 12px; }
        .ai-content p { font-size: 0.95rem; line-height: 1.7; color: #cbd5e1; }

        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }

        .biography-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .bio-card { padding: 30px; display: flex; flex-direction: column; gap: 24px; }
        
        .bio-header { display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 16px; }
        .bio-header h2 { font-size: 1.1rem; font-weight: 900; color: #f2f2f2; margin: 0; }
        
        .bio-body p { font-size: 0.9rem; line-height: 1.8; color: #b0b0b0; margin-bottom: 16px; }
        .bio-body strong { color: white; font-weight: 800; }
        
        .callout { padding: 16px; background: rgba(255,255,255,0.02); border-radius: 8px; font-size: 0.85rem; line-height: 1.6; color: #94a3b8; font-style: italic; }
        .gold-border { border-left: 2px solid var(--primary); }

        .sub-section { margin-bottom: 20px; }
        .sub-section h4 { font-size: 0.95rem; font-weight: 800; color: var(--primary); margin-bottom: 8px; }

        .question-box { padding: 16px; display: flex; align-items: center; gap: 12px; font-size: 0.85rem; font-weight: 700; color: #d4af37; border-radius: 12px; background: rgba(212, 175, 55, 0.05); border: 1px dashed rgba(212, 175, 55, 0.2); }

        .stat-row { margin-bottom: 20px; }
        .stat-item { display: flex; gap: 16px; align-items: flex-start; }
        .stat-text strong { display: block; font-size: 0.95rem; margin-bottom: 4px; color: #f2f2f2; }
        .stat-text p { font-size: 0.85rem; color: #94a3b8; margin: 0; }

        .highlight-p { background: linear-gradient(90deg, rgba(212, 175, 55, 0.1), transparent); padding: 12px; border-radius: 4px; }
        .footer-action { margin-top: 10px; display: flex; align-items: center; justify-content: flex-end; gap: 8px; color: var(--primary); font-weight: 900; font-size: 0.85rem; cursor: pointer; transition: gap 0.3s; }
        .footer-action:hover { gap: 14px; }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
