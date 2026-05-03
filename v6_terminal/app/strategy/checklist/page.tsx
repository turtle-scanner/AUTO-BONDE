"use client";
import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { CheckSquare, Square, Zap, Target, TrendingUp, ShieldCheck, Cpu } from 'lucide-react';

const categories = [
  { 
    name: "⚡ Bonde 4% Routine", 
    icon: <Zap size={18} className="gold" />,
    items: [
      "매일 전일 대비 4% 이상 급등 종목 전수 스캐닝",
      "전일 대비 거래량 150% 이상 폭발 여부 확인",
      "주요 이동평균선(10일, 20일) 위에서 첫 돌파 발생",
      "상승 종목 중 RS(상대강도) 80 이상인 주도주 우선 선별"
    ] 
  },
  { 
    name: "🎯 EP (Episodic Pivot)", 
    icon: <Target size={18} className="gold" />,
    items: [
      "강력한 실적 가속화 또는 신규 뉴스 촉매제 확인",
      "시초가 갭상승 및 장 초반 강력한 매수세 유입 감지",
      "최근 3개월 내 최대 거래량 동반 여부 체크",
      "돌파 지점이 전고점 및 주요 저항선 근처인지 확인"
    ] 
  },
  { 
    name: "📈 VCP 패턴 수축", 
    icon: <TrendingUp size={18} className="gold" />,
    items: [
      "최소 2회 이상의 변동성 수축(T구간) 발생 확인",
      "조정폭이 15% -> 8% -> 3% 등 단계적 축소 여부",
      "수축 지점에서 거래량이 말라붙으며 매도세 소멸 확인",
      "피벗(Pivot) 가격 돌파 시 즉각적인 반응 확인"
    ] 
  },
  { 
    name: "🛡️ 자동매매 리스크", 
    icon: <ShieldCheck size={18} className="gold" />,
    items: [
      "기계적 손절선 -4% ~ -7% 자동 설정 완료",
      "단일 종목 비중 총 자산의 20% 이내 제한",
      "매수 시 슬리피지(Slippage) 허용 범위 1% 이내 설정",
      "분할 매도 포인트(2R, 3R 지점) 자동 설정 여부"
    ] 
  },
  { 
    name: "🤖 봇 실행 프로토콜", 
    icon: <Cpu size={18} className="gold" />,
    items: [
      "장 초반 30분 내 주도주 돌파 시 우선 집행",
      "추격 매수 금지 (피벗 가격에서 5% 이내만 진입)",
      "진입 후 즉시 하이픈 스탑(Trailing Stop) 가동",
      "시장 상태(Uptrend/Downtrend)에 따른 비중 자동 조절"
    ] 
  },
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
      <div className="section-header">
        <h1><CheckSquare size={32} className="icon" /> [ CHECKLIST ] 본데식 자동매매 전술 체크리스트</h1>
        <p className="subtitle">사령부 자동매매 봇의 진입 알고리즘과 리스크 관리 원칙입니다.</p>
      </div>
      
      <div className="progress-container glass">
        <div className="progress-bar">
          <div className="progress-fill" style={{width:`${(done/total)*100}%`}}></div>
        </div>
        <span className="progress-text">작전 승인률: {Math.round((done/total)*100)}% ({done}/{total})</span>
      </div>

      <div className="cl-grid">
        {categories.map((cat, ci) => (
          <GlassCard key={ci} className="cl-card">
            <div className="cat-header">
              {cat.icon}
              <h3 className="cl-cat">{cat.name}</h3>
            </div>
            <div className="item-list">
              {cat.items.map((item, ii) => {
                const key = `${ci}-${ii}`;
                const isDone = checked.has(key);
                return (
                  <div key={ii} className={`cl-item ${isDone ? 'done' : ''}`} onClick={() => toggle(key)}>
                    <div className={`checkbox ${isDone ? 'checked' : ''}`}>
                      {isDone ? <CheckSquare size={14} /> : <Square size={14} />}
                    </div>
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .cl-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .section-header h1 { font-size: 1.8rem; font-weight: 950; display: flex; align-items: center; gap: 12px; }
        .icon { color: var(--primary); }
        .subtitle { color: #94a3b8; font-weight: 600; margin-top: 8px; }

        .progress-container { padding: 20px; border-radius: 16px; display: flex; flex-direction: column; gap: 12px; }
        .progress-bar { height: 12px; background: rgba(255,255,255,0.05); border-radius: 6px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), #06b6d4); border-radius: 6px; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .progress-text { font-size: 0.85rem; font-weight: 900; color: var(--primary); text-align: right; }

        .cl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
        .cl-card { padding: 24px; border: 1px solid rgba(255,255,255,0.05); transition: transform 0.3s; }
        .cl-card:hover { transform: translateY(-5px); border-color: rgba(212, 175, 55, 0.2); }
        
        .cat-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .cl-cat { font-size: 1.05rem; font-weight: 900; color: #f2f2f2; }
        
        .item-list { display: flex; flex-direction: column; gap: 4px; }
        .cl-item { 
          display: flex; align-items: flex-start; gap: 12px; padding: 12px; 
          cursor: pointer; border-radius: 8px; font-size: 0.85rem; color: #cbd5e1; 
          font-weight: 600; transition: all 0.2s; 
        }
        .cl-item:hover { background: rgba(255,255,255,0.03); }
        .cl-item.done { color: #4ade80; opacity: 0.8; }
        
        .checkbox { margin-top: 2px; color: #475569; }
        .checkbox.checked { color: #4ade80; }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
