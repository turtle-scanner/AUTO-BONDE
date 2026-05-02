"use client";
import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { CheckSquare, Square } from 'lucide-react';

const categories = [
  { name: "📊 시장 상태", items: ["IBD 시장 진단: Confirmed Uptrend 확인", "Distribution Day 4회 미만", "주요 지수 50일선 위 위치", "시장 선도주 신고가 갱신 여부"] },
  { name: "📈 종목 조건", items: ["주가 > 50일선 > 150일선 > 200일선", "200일선 최소 1개월 상승 추세", "RS Rating 70+ (90+ 우선)", "EPS Rating 80+", "52주 고가 대비 -25% 이내"] },
  { name: "🎯 VCP/패턴", items: ["VCP 조정폭 감소 확인", "T구간(변동성 수축) 진입 확인", "피벗(EP) 가격 설정", "거래량 감소 추세 확인"] },
  { name: "🛡️ 리스크", items: ["손절가 7~8% 설정 완료", "포지션 사이즈 총자산 20% 이하", "한 거래 최대 손실 1~2% 이내", "목표 수익률 20~25% 설정"] },
  { name: "⚡ 진입 실행", items: ["돌파 시 거래량 평균 150%+ 확인", "지정가 주문 설정 (시장가 자제)", "진입 시간 확인 (장 초반 돌파 우선)", "진입 후 즉시 손절 주문 설정"] },
];

export default function ChecklistPage() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const toggle = (key: string) => {
    const next = new Set(checked);
    next.has(key) ? next.delete(key) : next.add(key);
    setChecked(next);
  };
  const total = categories.reduce((s, c) => s + c.items.length, 0);
  const done = checked.size;

  return (
    <div className="cl-container animate-fade-in">
      <h1 className="page-title"><CheckSquare size={32} className="icon" /> [ CHECKLIST ] 진입 전 필수 체크리스트</h1>
      <div className="progress-bar"><div className="progress-fill" style={{width:`${(done/total)*100}%`}}></div><span className="progress-text">{done}/{total} 완료</span></div>
      <div className="cl-grid">
        {categories.map((cat, ci) => (
          <GlassCard key={ci} className="cl-card">
            <h3 className="cl-cat">{cat.name}</h3>
            {cat.items.map((item, ii) => {
              const key = `${ci}-${ii}`;
              return (
                <div key={ii} className={`cl-item ${checked.has(key)?'done':''}`} onClick={() => toggle(key)}>
                  {checked.has(key) ? <CheckSquare size={16} className="check-icon" /> : <Square size={16} />}
                  <span>{item}</span>
                </div>
              );
            })}
          </GlassCard>
        ))}
      </div>
      <style jsx>{`
        .cl-container { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
        .page-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .icon { color: #10b981; }
        .progress-bar { position: relative; height: 28px; background: rgba(255,255,255,0.03); border-radius: 14px; overflow: hidden; border: 1px solid var(--card-border); }
        .progress-fill { height: 100%; background: linear-gradient(to right, #10b981, #06b6d4); border-radius: 14px; transition: width 0.3s; }
        .progress-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-size: 0.75rem; font-weight: 900; color: white; }
        .cl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .cl-card { padding: 24px; border: 1px solid var(--card-border); }
        .cl-cat { font-size: 1rem; font-weight: 900; color: white; margin-bottom: 16px; }
        .cl-item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; cursor: pointer; border-radius: 6px; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; transition: all 0.2s; }
        .cl-item:hover { background: rgba(16,185,129,0.05); }
        .cl-item.done { color: #10b981; text-decoration: line-through; opacity: 0.7; }
        .check-icon { color: #10b981; }
      `}</style>
    </div>
  );
}
