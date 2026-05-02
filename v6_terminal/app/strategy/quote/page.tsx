"use client";
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { Quote, RefreshCw } from 'lucide-react';

const quotes = [
  { text: "큰 돈은 '기다림' 속에 있다. 앉아서 기다리는 것이 가장 어렵다.", author: "제시 리버모어" },
  { text: "시장은 당신이 틀렸는지 맞았는지를 알려준다. 시장의 말을 들어라.", author: "마크 미너비니" },
  { text: "최고의 주식은 처음에는 항상 비싸 보인다.", author: "윌리엄 오닐" },
  { text: "리스크를 관리하라. 수익은 스스로 관리된다.", author: "마크 미너비니" },
  { text: "추세는 친구다. 추세를 거스르지 마라.", author: "에드 세이코타" },
  { text: "90%의 트레이더가 지는 이유는 규율이 없어서다.", author: "마크 더글라스" },
  { text: "손실을 빨리 끊고, 수익은 달리게 하라.", author: "데이비드 라이언" },
  { text: "주식시장에서 가장 비싼 말은 '이번에는 다를 거야'이다.", author: "존 템플턴" },
  { text: "바닥에서 사려고 하지 마라. 확인된 추세에서 사라.", author: "스탠 와인스타인" },
  { text: "최고의 트레이더는 최고의 분석가가 아니라 최고의 리스크 관리자이다.", author: "반 타프" },
  { text: "시장이 당신에게 주는 것을 가져가라. 탐욕을 부리지 마라.", author: "제시 리버모어" },
  { text: "승리하는 트레이더는 자신의 전략을 믿고 일관되게 실행한다.", author: "마크 미너비니" },
];

export default function QuotePage() {
  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(Math.floor(Math.random() * quotes.length)); }, []);
  const q = quotes[idx];

  return (
    <div className="quote-container animate-fade-in">
      <h1 className="page-title"><Quote size={32} className="icon" /> [ QUOTE ] 오늘의 거장 명언</h1>
      <GlassCard className="main-quote-card">
        <blockquote className="main-quote">&ldquo;{q.text}&rdquo;</blockquote>
        <span className="main-author">— {q.author}</span>
        <button className="refresh-btn" onClick={() => setIdx((idx + 1) % quotes.length)}><RefreshCw size={16} /> 다른 명언 보기</button>
      </GlassCard>
      <div className="all-quotes">
        <h2 className="section-title">📜 전체 명언 아카이브</h2>
        <div className="quote-grid">
          {quotes.map((q, i) => (
            <GlassCard key={i} className="quote-item">
              <p className="qi-text">&ldquo;{q.text}&rdquo;</p>
              <span className="qi-author">— {q.author}</span>
            </GlassCard>
          ))}
        </div>
      </div>
      <style jsx>{`
        .quote-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .page-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .icon { color: #fbbf24; }
        .main-quote-card { padding: 60px 40px; text-align: center; border: 1px solid rgba(251,191,36,0.15); background: rgba(251,191,36,0.02); }
        .main-quote { font-size: 1.5rem; font-weight: 700; color: white; font-style: italic; line-height: 1.6; margin: 0 0 20px; }
        .main-author { font-size: 1rem; font-weight: 800; color: #fbbf24; }
        .refresh-btn { margin-top: 24px; display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.2); color: #fbbf24; font-weight: 800; border-radius: 20px; cursor: pointer; font-size: 0.8rem; }
        .section-title { font-size: 1.2rem; font-weight: 900; color: white; }
        .quote-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
        .quote-item { padding: 20px; border: 1px solid var(--card-border); }
        .qi-text { font-size: 0.88rem; color: #e2e8f0; line-height: 1.5; font-style: italic; margin-bottom: 10px; }
        .qi-author { font-size: 0.75rem; font-weight: 800; color: var(--primary); }
      `}</style>
    </div>
  );
}
