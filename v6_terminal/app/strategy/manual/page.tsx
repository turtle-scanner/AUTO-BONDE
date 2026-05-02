"use client";
import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

const manuals = [
  { title: "미너비니 SEPA 전술", steps: ["1. 스테이지 2 확인 (주가 > 50일선 > 150일선 > 200일선)", "2. VCP 패턴 형성 확인 (조정폭 감소 + 거래량 감소)", "3. 피벗(EP) 가격 설정 및 감시", "4. 돌파 시 거래량 150%+ 확인 후 진입", "5. 손절가 7~8% 설정", "6. 20~25% 수익 시 1/3 익절"] },
  { title: "오닐 CAN SLIM 전술", steps: ["C - Current Earnings: 최근 분기 EPS 25%+ 성장", "A - Annual Earnings: 연간 EPS 25%+ 성장", "N - New: 신제품/신경영/신고가", "S - Supply & Demand: 수요 > 공급 (거래량 확인)", "L - Leader: RS 80+ 주도주", "I - Institutional: 기관 보유 증가", "M - Market: 시장 방향 Confirmed Uptrend"] },
  { title: "리버모어 피벗 전술", steps: ["1. 큰 추세 방향 확인 (주간 차트)", "2. 피벗 포인트(저항선 돌파) 대기", "3. 돌파 시 소량 테스트 매수", "4. 추가 상승 확인 후 피라미딩", "5. 추세 이탈 시 즉시 청산", "6. 절대 물타기 금지"] },
  { title: "와인스타인 스테이지 전술", steps: ["Stage 1 (바닥): 매수 금지. 관찰만.", "Stage 2 (상승): ★ 유일한 매수 구간! 30주선 상향돌파 시 진입", "Stage 3 (천장): 매도 준비. 30주선 평탄화 시 경고", "Stage 4 (하락): 무조건 현금 보유. 30주선 하향 시 손절"] },
];

export default function ManualPage() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div className="manual-container animate-fade-in">
      <h1 className="page-title"><BookOpen size={32} className="icon" /> [ MANUAL ] 거장의 실전 전술 매뉴얼</h1>
      <div className="manual-list">
        {manuals.map((m, i) => (
          <GlassCard key={i} className={`manual-card ${openIdx === i ? 'active' : ''}`}>
            <div className="manual-header" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
              <h3>{m.title}</h3>
              {openIdx === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            {openIdx === i && (
              <div className="manual-body">
                {m.steps.map((s, j) => <div key={j} className="step">{s}</div>)}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
      <style jsx>{`
        .manual-container { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
        .page-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .icon { color: #f59e0b; }
        .manual-list { display: flex; flex-direction: column; gap: 16px; }
        .manual-card { padding: 0; border: 1px solid var(--card-border); overflow: hidden; cursor: pointer; }
        .manual-card.active { border-color: rgba(245,158,11,0.3); }
        .manual-header { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
        .manual-header h3 { font-size: 1.05rem; font-weight: 800; color: white; }
        .manual-body { padding: 0 24px 24px; display: flex; flex-direction: column; gap: 8px; }
        .step { font-size: 0.88rem; color: #e2e8f0; padding: 8px 12px; border-left: 2px solid rgba(245,158,11,0.3); line-height: 1.5; font-weight: 500; }
      `}</style>
    </div>
  );
}
