"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { BookOpen, ChevronDown, ChevronUp, TrendingUp, BarChart3, Target, Shield, Zap, Eye } from 'lucide-react';

interface Lesson {
  id: number;
  category: string;
  icon: React.ReactNode;
  title: string;
  content: string[];
}

const lessons: Lesson[] = [
  {
    id: 1, category: "VCP 전략", icon: <Target size={20} />,
    title: "VCP (Volatility Contraction Pattern) 핵심 정리",
    content: [
      "📌 정의: 주가가 상승 후 조정받을 때, 조정폭이 점점 줄어드는 패턴",
      "📌 원리: 매도세가 점점 약해지고, 매수세가 바닥에서 받쳐주는 상태",
      "📌 T(Tight) 구간: 변동성이 극도로 줄어든 최종 수축 구간. 이때가 매수 급소!",
      "📌 조건: ① 가격 기저 최소 3~5주 ② 조정폭 감소 (예: -25% → -15% → -8%) ③ 거래량 감소",
      "📌 피벗(EP): T구간 고점을 돌파하는 순간이 진입 타점. 돌파 시 거래량 급증이 필수!",
      "⚠️ 실패 신호: 돌파 후 바로 되돌림, 거래량 미동반 돌파, 시장 전체 하락장"
    ]
  },
  {
    id: 2, category: "추세 분석", icon: <TrendingUp size={20} />,
    title: "이동평균선 (Moving Average) 전략",
    content: [
      "📌 10일선 (2주): 초단기 추세. 강한 상승주는 10일선 위에서 움직임",
      "📌 21일선 (1개월): 스윙 트레이더의 핵심 지지선. 이탈 시 경고",
      "📌 50일선 (10주): 중기 추세의 생명선. 기관 투자자들이 주시하는 핵심 라인",
      "📌 200일선 (40주): 장기 추세. 이 위에 있으면 상승장, 아래면 하락장",
      "📌 골든크로스: 50일선이 200일선을 상향 돌파 → 강세 신호",
      "📌 데스크로스: 50일선이 200일선을 하향 돌파 → 약세 신호",
      "⚠️ 미너비니 규칙: 주가 > 50일선 > 150일선 > 200일선 (스테이지 2 확인)"
    ]
  },
  {
    id: 3, category: "캔들 패턴", icon: <BarChart3 size={20} />,
    title: "핵심 캔들스틱 패턴 TOP 7",
    content: [
      "🔴 망치형 (Hammer): 긴 아래꼬리, 짧은 몸통. 바닥 반전 신호",
      "🔴 장악형 (Engulfing): 전일 음봉을 완전히 감싸는 양봉. 강한 반전 신호",
      "🔴 샛별형 (Morning Star): 대음봉 → 십자/팽이 → 대양봉. 3봉 반전 패턴",
      "🔵 교수형 (Hanging Man): 상승 추세 끝에서 망치형. 하락 전환 경고",
      "🔵 포곽형 (Dark Cloud Cover): 전일 양봉 중간까지 밀고 내려오는 음봉",
      "⭐ 도지 (Doji): 시가=종가, 매수/매도 균형. 추세 전환 가능성",
      "⭐ 마루보즈 (Marubozu): 꼬리 없는 봉. 해당 방향의 극단적 힘을 의미"
    ]
  },
  {
    id: 4, category: "거래량", icon: <Eye size={20} />,
    title: "거래량 분석 — 가격의 진실을 보여주는 지표",
    content: [
      "📌 원칙 1: 가격 상승 + 거래량 증가 = 건강한 상승 (기관 매수)",
      "📌 원칙 2: 가격 상승 + 거래량 감소 = 의심스러운 상승 (힘 부족)",
      "📌 원칙 3: 가격 하락 + 거래량 증가 = 매도 압력 (기관 매도)",
      "📌 원칙 4: 가격 하락 + 거래량 감소 = 건전한 조정 (VCP 신호!)",
      "📌 돌파일 거래량: 최소 평균 대비 150% 이상이어야 유효한 돌파",
      "📌 클라이맥스 탑: 극단적 거래량 급증 + 장대양봉 = 천장 신호 (익절 시점!)",
      "⚠️ 기관의 흔적: 기관은 거래량을 숨길 수 없다. 거래량에 진실이 있다."
    ]
  },
  {
    id: 5, category: "리스크 관리", icon: <Shield size={20} />,
    title: "손절 & 포지션 사이징 — 생존이 곧 승리",
    content: [
      "📌 7~8% 룰: 매수가 대비 -7~8% 하락 시 무조건 손절 (예외 없음!)",
      "📌 포지션 사이징: 한 종목에 총 자산의 최대 20~25% 배분",
      "📌 손실 한도: 한 거래당 총 자산의 1~2% 이상 손실 금지",
      "📌 계산법: 포지션 크기 = (총자산 × 1%) ÷ (매수가 × 손절률)",
      "📌 피라미딩: 수익이 나는 종목에만 추가 매수 (물타기 절대 금지!)",
      "📌 익절 규칙: 20~25% 수익 시 최소 1/3 물량 정리",
      "⚠️ 미너비니 명언: '큰 돈은 매수가 아니라 매도에서 벌린다'"
    ]
  },
  {
    id: 6, category: "시장 판단", icon: <Zap size={20} />,
    title: "시장 방향 판단법 — IBD 시장 진단",
    content: [
      "📌 Confirmed Uptrend (확정 상승세): 적극 매수 OK. 포트폴리오 80~100% 투입",
      "📌 Uptrend Under Pressure (상승세 압박): 신규 매수 자제. 기존 보유 종목 관찰",
      "📌 Market in Correction (조정장): 매수 금지. 현금 비중 50% 이상 유지",
      "📌 Follow-Through Day (FTD): 하락 후 4일차 이후 주요 지수 +1.5% 이상 상승 → 상승 전환 신호",
      "📌 Distribution Day: 거래량 증가 + 지수 -0.2% 이상 하락. 5주 내 4~5회 누적 시 위험",
      "📌 Power Trend: 21일선 > 50일선이 연속 유지되는 강력한 추세. 공격적 매수 가능",
      "⚠️ 핵심: 시장 방향이 맞아야 개별 종목도 이긴다. 시장 확인이 최우선!"
    ]
  }
];

export default function StudyPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="study-container animate-fade-in">
      <div className="study-header">
        <h1 className="study-title">
          <BookOpen size={32} className="title-icon" /> [ STUDY ] 주식공부방 — 차트 전술 교범
        </h1>
        <p className="study-subtitle">미너비니/본데 전략 기반 · 실전 트레이딩 핵심 교육 자료</p>
      </div>

      <div className="lesson-grid">
        {lessons.map(lesson => (
          <GlassCard key={lesson.id} className={`lesson-card ${openId === lesson.id ? 'active' : ''}`}>
            <div className="lesson-header" onClick={() => setOpenId(openId === lesson.id ? null : lesson.id)}>
              <div className="lesson-meta">
                <span className="lesson-cat">{lesson.category}</span>
                <div className="lesson-icon">{lesson.icon}</div>
              </div>
              <h3 className="lesson-title">{lesson.title}</h3>
              <div className="lesson-toggle">
                {openId === lesson.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
            {openId === lesson.id && (
              <div className="lesson-body">
                {lesson.content.map((line, i) => (
                  <div key={i} className="lesson-line">{line}</div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <GlassCard className="quick-ref">
        <h3 className="ref-title">⚡ 미너비니 체크리스트 (매수 전 확인)</h3>
        <div className="ref-grid">
          {[
            "주가 > 50일선 > 150일선 > 200일선",
            "200일선이 최소 1개월간 상승 추세",
            "52주 신고가 대비 -25% 이내",
            "52주 신저가 대비 +30% 이상",
            "RS Rating 70 이상 (90 이상 우선)",
            "EPS Rating 80 이상",
            "거래량 동반 돌파 확인",
            "손절가 7~8% 이내 설정 완료"
          ].map((item, i) => (
            <div key={i} className="ref-item">
              <span className="ref-check">☐</span>
              <span className="ref-text">{item}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <style jsx>{`
        .study-container { padding: 40px; display: flex; flex-direction: column; gap: 28px; }
        .study-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: #f59e0b; }
        .study-subtitle { color: var(--text-muted); font-size: 1rem; margin-top: 8px; }

        .lesson-grid { display: flex; flex-direction: column; gap: 16px; }
        .lesson-card { padding: 0; border: 1px solid var(--card-border); overflow: hidden; cursor: pointer; }
        .lesson-card.active { border-color: rgba(245,158,11,0.3); box-shadow: 0 0 20px rgba(245,158,11,0.05); }
        .lesson-header { padding: 20px 24px; display: flex; align-items: center; gap: 16px; }
        .lesson-meta { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 80px; flex-shrink: 0; }
        .lesson-cat { font-size: 0.6rem; font-weight: 900; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.1em; background: rgba(245,158,11,0.08); padding: 2px 8px; border-radius: 3px; }
        .lesson-icon { color: var(--primary); }
        .lesson-title { flex: 1; font-size: 1rem; font-weight: 800; color: white; }
        .lesson-toggle { color: var(--text-muted); flex-shrink: 0; }

        .lesson-body { padding: 0 24px 24px 120px; display: flex; flex-direction: column; gap: 10px; animation: slideDown 0.3s ease; }
        .lesson-line { font-size: 0.9rem; color: #e2e8f0; line-height: 1.6; font-weight: 500; padding: 6px 12px; border-left: 2px solid rgba(245,158,11,0.2); }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        .quick-ref { padding: 32px; border: 1px solid rgba(245,158,11,0.15); background: rgba(245,158,11,0.02); }
        .ref-title { font-size: 1.2rem; font-weight: 900; color: #f59e0b; margin-bottom: 20px; }
        .ref-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .ref-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: rgba(255,255,255,0.02); border-radius: 6px; border: 1px solid rgba(255,255,255,0.03); }
        .ref-check { font-size: 1rem; color: var(--primary); }
        .ref-text { font-size: 0.85rem; color: white; font-weight: 600; }
      `}</style>
    </div>
  );
}
