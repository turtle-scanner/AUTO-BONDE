"use client";
import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Library, Star, ExternalLink } from 'lucide-react';

const books = [
  { title: "Trade Like a Stock Market Wizard", author: "마크 미너비니", rating: 5, desc: "VCP, SEPA 전략의 바이블. 주도주 트레이딩의 A to Z.", category: "필독" },
  { title: "Think & Trade Like a Champion", author: "마크 미너비니", rating: 5, desc: "미너비니의 심화편. 실전 사례와 심리 관리까지 다룬 완결판.", category: "필독" },
  { title: "How to Make Money in Stocks", author: "윌리엄 오닐", rating: 5, desc: "CAN SLIM 전략의 원전. IBD 시스템의 모든 것.", category: "필독" },
  { title: "Reminiscences of a Stock Operator", author: "에드윈 르페브르", rating: 5, desc: "제시 리버모어의 전기. 100년이 지나도 유효한 시장의 본질.", category: "고전" },
  { title: "Stan Weinstein's Secrets for Profiting", author: "스탠 와인스타인", rating: 4, desc: "스테이지 분석의 교과서. 주간 차트로 큰 그림을 보는 법.", category: "필독" },
  { title: "Market Wizards", author: "잭 슈웨거", rating: 4, desc: "세계 최고 트레이더들의 인터뷰. 다양한 전략과 철학.", category: "추천" },
  { title: "Trading in the Zone", author: "마크 더글라스", rating: 4, desc: "트레이딩 심리학의 정석. 규율과 확률적 사고의 중요성.", category: "심리" },
  { title: "The New Market Wizards", author: "잭 슈웨거", rating: 4, desc: "마켓 위저드 후속편. 더 다양한 트레이더들의 비법.", category: "추천" },
];

export default function LibraryPage() {
  return (
    <div className="lib-container animate-fade-in">
      <h1 className="page-title"><Library size={32} className="icon" /> [ LIBRARY ] 추천 필독서 및 전술 라이브러리</h1>
      <div className="book-grid">
        {books.map((b, i) => (
          <GlassCard key={i} className="book-card">
            <span className={`book-cat cat-${b.category}`}>{b.category}</span>
            <h3 className="book-title">{b.title}</h3>
            <span className="book-author">{b.author}</span>
            <div className="book-stars">{"★".repeat(b.rating)}{"☆".repeat(5 - b.rating)}</div>
            <p className="book-desc">{b.desc}</p>
          </GlassCard>
        ))}
      </div>
      <style jsx>{`
        .lib-container { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
        .page-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .icon { color: #8b5cf6; }
        .book-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .book-card { padding: 28px; border: 1px solid var(--card-border); }
        .book-cat { font-size: 0.6rem; font-weight: 900; padding: 3px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.1em; }
        .cat-필독 { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); }
        .cat-고전 { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }
        .cat-추천 { background: rgba(16,185,129,0.1); color: #10b981; border: 1px solid rgba(16,185,129,0.2); }
        .cat-심리 { background: rgba(139,92,246,0.1); color: #8b5cf6; border: 1px solid rgba(139,92,246,0.2); }
        .book-title { font-size: 1rem; font-weight: 900; color: white; margin: 12px 0 6px; }
        .book-author { font-size: 0.8rem; font-weight: 700; color: var(--primary); }
        .book-stars { color: #fbbf24; font-size: 0.9rem; margin: 8px 0; }
        .book-desc { font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; }
      `}</style>
    </div>
  );
}
