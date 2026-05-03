"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  History, 
  User, 
  TrendingUp, 
  Target, 
  Zap, 
  BarChart3, 
  ShieldCheck,
  Calendar,
  ChevronRight,
  Info
} from 'lucide-react';

interface AgentTrade {
  agentName: string;
  style: string;
  capital: number;
  yield: number;
  stockCount: number;
  trades: {
    date: string;
    ticker: string;
    market: 'US' | 'KR';
    price: string;
    reason: string;
    comment: string;
  }[];
}

const agentsData: AgentTrade[] = [
  {
    agentName: "윌리엄 오닐",
    style: "CANSLIM 주도주 돌파",
    capital: 10000000,
    yield: 0.0,
    stockCount: 2,
    trades: [
      { date: "2026-05-04", ticker: "NVDA", market: "US", price: "$895.20", reason: "52주 신고가 돌파", comment: "CANSLIM 조건 완벽 충족. 강력한 이익 성장과 함께 대량 거래 수반한 컵 앤 핸들 돌파 포착." },
      { date: "2026-05-04", ticker: "삼성전자", market: "KR", price: "₩78,500", reason: "기관/외국인 동반 매수", comment: "한국 반도체 대장주로서 업황 턴어라운드 및 전고점 돌파 시도 중. 안정적 주도주 편입." }
    ]
  },
  {
    agentName: "마크 미너비니",
    style: "VCP 변동성 수축",
    capital: 10000000,
    yield: 0.0,
    stockCount: 1,
    trades: [
      { date: "2026-05-04", ticker: "AMD", market: "US", price: "$182.40", reason: "VCP 3단계 수축 완료", comment: "변동성이 25%->15%->6%로 줄어든 완벽한 수축 포착. 피벗 가격 돌파 시 즉각 진입." }
    ]
  },
  {
    agentName: "프라딥 본데",
    style: "모멘텀 & 에피소딕 피벗",
    capital: 10000000,
    yield: 0.0,
    stockCount: 1,
    trades: [
      { date: "2026-05-04", ticker: "SMCI", market: "US", price: "$920.15", reason: "실적 발표 후 갭상승", comment: "어닝 서프라이즈와 함께 발생한 에피소딕 피벗(EP). 강력한 추세 지속형 패턴으로 판단." }
    ]
  },
  {
    agentName: "스탠 와인스태인",
    style: "Stage 2 돌파 매매",
    capital: 10000000,
    yield: 0.0,
    stockCount: 2,
    trades: [
      { date: "2026-05-04", ticker: "SK하이닉스", market: "KR", price: "₩185,000", reason: "30주 이평선 상향 돌파", comment: "장기 횡보를 끝내고 Stage 2 상승 국면으로 진입. 상대강도(RS) 라인 우상향 전환 확인." },
      { date: "2026-05-04", ticker: "MSFT", market: "US", price: "$415.30", reason: "장기 추세 유지", comment: "우량한 주도주가 30주 이평선 위에서 지지를 받으며 재차 상승 시도. 안전한 진입 시점." }
    ]
  },
  {
    agentName: "워렌 버핏",
    style: "가치 투자 & 해자 분석",
    capital: 10000000,
    yield: 0.0,
    stockCount: 2,
    trades: [
      { date: "2026-05-04", ticker: "AAPL", market: "US", price: "$172.50", reason: "현금흐름 및 자사주 매입", comment: "강력한 브랜드 로열티와 생태계 해자 보유. 적정 가치 대비 저평가 구간으로 판단하여 장기 매집." },
      { date: "2026-05-04", ticker: "현대차", market: "KR", price: "₩245,000", reason: "저PBR 및 배당 강화", comment: "글로벌 점유율 확대와 적극적인 주주 환원 정책. 견고한 실적 대비 낮은 멀티플 매력적." }
    ]
  },
  {
    agentName: "농사매매기법",
    style: "바닥권 매집 & 분산 투자",
    capital: 10000000,
    yield: 0.0,
    stockCount: 3,
    trades: [
      { date: "2026-05-04", ticker: "네이버", market: "KR", price: "₩192,000", reason: "바닥권 다지기 확인", comment: "장기 하락 후 바닥권에서 대량 거래와 함께 추세 전환 시도. 씨를 뿌리는 마음으로 매집 시작." },
      { date: "2026-05-04", ticker: "LG화학", market: "KR", price: "₩450,000", reason: "낙폭 과대 구간", comment: "본질적 가치 훼손 없는 과도한 하락. 분할 매수로 대응하며 시간의 힘을 믿고 기다림." },
      { date: "2026-05-04", ticker: "카카오", market: "KR", price: "₩48,500", reason: "저점 확인 및 횡보", comment: "바닥을 확인하는 횡보 구간 진입. 리스크 대비 기대 수익이 높은 지점으로 판단." }
    ]
  }
];

export default function AIStrategyLogs() {
  const [selectedAgent, setSelectedAgent] = useState(agentsData[0]);

  return (
    <div className="strategy-logs-container animate-fade-in">
      {/* Header Section */}
      <div className="logs-header">
        <div className="title-area">
          <h1 className="main-title">
            <History size={36} className="gold" /> 8-f. [ LOGS ] AI 거장 실전 매매 기록
          </h1>
          <p className="sub-title">원금 1,000만원 / 2026.05.04 시작 / 미국·한국 정예 종목 실전 매매</p>
        </div>
        <div className="global-stat glass">
          <div className="stat-item">
            <span className="label">TOTAL AGENTS</span>
            <span className="val">6 ELITES</span>
          </div>
          <div className="stat-item">
            <span className="label">START CAPITAL</span>
            <span className="val">₩60,000,000</span>
          </div>
        </div>
      </div>

      <div className="logs-layout">
        {/* Left: Agent Selection Grid */}
        <div className="agent-grid">
          {agentsData.map((agent, i) => (
            <GlassCard 
              key={i} 
              className={`agent-card ${selectedAgent.agentName === agent.agentName ? 'active' : ''}`}
              onClick={() => setSelectedAgent(agent)}
            >
              <div className="agent-info">
                <div className="agent-name-box">
                  <User size={16} className="gold" />
                  <span className="agent-name">{agent.agentName}</span>
                </div>
                <div className="agent-style">{agent.style}</div>
              </div>
              <div className="agent-stats">
                <div className="stat-box">
                  <span className="s-label">YIELD</span>
                  <span className={`s-val ${agent.yield >= 0 ? 'up' : 'down'}`}>
                    {agent.yield >= 0 ? '+' : ''}{agent.yield.toFixed(2)}%
                  </span>
                </div>
                <div className="stat-box">
                  <span className="s-label">STOCKS</span>
                  <span className="s-val">{agent.stockCount}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Right: Detailed Logs */}
        <div className="details-area">
          <GlassCard className="details-card">
            <div className="details-header">
              <div className="agent-profile">
                <div className="p-avatar">{selectedAgent.agentName[0]}</div>
                <div>
                  <h2 className="p-name">{selectedAgent.agentName} 요원의 전략 브리핑</h2>
                  <p className="p-style">{selectedAgent.style}</p>
                </div>
              </div>
              <div className="capital-status">
                <span className="c-label">CURRENT CAPITAL</span>
                <span className="c-val">₩{(selectedAgent.capital * (1 + selectedAgent.yield/100)).toLocaleString()}</span>
              </div>
            </div>

            <div className="trades-timeline">
              <h3 className="section-title"><Calendar size={18} /> 실전 매매 타임라인 (5월 4일~)</h3>
              <div className="timeline-list">
                {selectedAgent.trades.map((trade, i) => (
                  <div key={i} className="timeline-item">
                    <div className="item-left">
                      <div className="t-date">{trade.date}</div>
                      <div className="t-market">{trade.market}</div>
                    </div>
                    <div className="item-body">
                      <div className="t-header">
                        <span className="t-ticker">{trade.ticker}</span>
                        <span className="t-price">{trade.price}</span>
                        <span className="t-reason">{trade.reason}</span>
                      </div>
                      <div className="t-comment">
                        <Info size={14} className="gold" />
                        <p>{trade.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .strategy-logs-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; color: white; background: #0a0a0c; min-height: 100vh; }
        
        .logs-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .main-title { font-size: 2.2rem; font-weight: 900; display: flex; align-items: center; gap: 16px; margin: 0; }
        .sub-title { font-size: 1rem; color: #737373; margin-top: 8px; font-weight: 600; }
        .global-stat { padding: 16px 24px; display: flex; gap: 32px; }
        .stat-item { display: flex; flex-direction: column; gap: 4px; }
        .stat-item .label { font-size: 0.65rem; font-weight: 800; color: #737373; }
        .stat-item .val { font-size: 1.1rem; font-weight: 900; color: #d4af37; }

        .logs-layout { display: grid; grid-template-columns: 320px 1fr; gap: 40px; }

        .agent-grid { display: flex; flex-direction: column; gap: 16px; }
        .agent-card { padding: 20px; cursor: pointer; transition: all 0.3s; border: 1px solid rgba(255,255,255,0.05); }
        .agent-card:hover { transform: translateX(10px); background: rgba(255,255,255,0.05); }
        .agent-card.active { border-color: #d4af37; background: rgba(212, 175, 55, 0.05); }

        .agent-name-box { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
        .agent-name { font-size: 1.1rem; font-weight: 900; color: #f2f2f2; }
        .agent-style { font-size: 0.75rem; color: #737373; font-weight: 700; margin-bottom: 16px; }

        .agent-stats { display: flex; gap: 20px; }
        .stat-box { display: flex; flex-direction: column; gap: 2px; }
        .s-label { font-size: 0.6rem; font-weight: 800; color: #555; }
        .s-val { font-size: 0.9rem; font-weight: 900; }
        .up { color: #10b981; }
        .down { color: #ff0055; }

        .details-area { height: 800px; }
        .details-card { padding: 40px; height: 100%; display: flex; flex-direction: column; gap: 40px; }
        .details-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 30px; }
        .agent-profile { display: flex; gap: 20px; align-items: center; }
        .p-avatar { width: 56px; height: 56px; background: #d4af37; color: black; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; font-weight: 900; }
        .p-name { font-size: 1.5rem; font-weight: 900; color: white; margin: 0; }
        .p-style { font-size: 0.9rem; color: #d4af37; font-weight: 700; }
        .capital-status { text-align: right; }
        .c-label { font-size: 0.75rem; font-weight: 800; color: #737373; display: block; margin-bottom: 4px; }
        .c-val { font-size: 1.6rem; font-weight: 900; color: white; }

        .section-title { font-size: 1.1rem; font-weight: 900; display: flex; align-items: center; gap: 12px; color: #f2f2f2; margin-bottom: 24px; }
        .timeline-list { display: flex; flex-direction: column; gap: 24px; }
        .timeline-item { display: flex; gap: 30px; position: relative; }
        .timeline-item::before { content: ''; position: absolute; left: 100px; top: 0; bottom: -24px; width: 1px; background: rgba(255,255,255,0.05); }
        .item-left { width: 80px; flex-shrink: 0; text-align: right; }
        .t-date { font-size: 0.85rem; font-weight: 900; color: #d4af37; }
        .t-market { font-size: 0.7rem; font-weight: 800; color: #555; }

        .item-body { flex: 1; background: rgba(255,255,255,0.02); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.03); }
        .t-header { display: flex; align-items: center; gap: 20px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
        .t-ticker { font-size: 1.2rem; font-weight: 900; color: #d4af37; }
        .t-price { font-size: 1rem; font-weight: 800; color: white; }
        .t-reason { font-size: 0.75rem; font-weight: 900; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 4px; color: #10b981; }
        
        .t-comment { display: flex; gap: 12px; align-items: flex-start; }
        .t-comment p { font-size: 0.9rem; line-height: 1.6; color: #b0b0b0; font-weight: 500; margin: 0; }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
