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
    agentName: "???ï¿½ê±¡?????ï¿½ë‚ï¿½ë’Š",
    style: "CANSLIM ?ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»???ï¿½ï¿½?¤ë²¡ï¿½êºŠ",
    capital: 10000000,
    yield: 1.25,
    stockCount: 2,
    trades: [
      {
        date: "2026-05-04",
        ticker: "NVDA",
        market: "US",
        price: "$924.79",
        reason: "PIVOT BREAKOUT",
        comment: "Blackwell ????ï¿½ëª´?¨ë£¸ï¿½ï¿½ ?ï¿½ì”ˆï¿½ìˆ???ï¿½ï¿½?¤ì±¶?—ï¿½???ï¦«ëš®?æ´??µ³?????¡ï¿½??ï¦«ëš®?ï¿½?ï¿½ë¤???????ï¿½ë„­?¨ï½‹ì³?????²ê¾§?—ï¿½ë«???????ï¿½ï¿½??–˜ ??ï¿½ï¿½?¤ë²¡ï¿½êºŠ."
      },
      {
        date: "2026-05-04",
        ticker: "MSFT",
        market: "US",
        price: "$406.32",
        reason: "RELATIVE STRENGTH",
        comment: "?²ãƒ«?£ï¿½?????????ï¿½ì”ˆ?·ë…»ë¦?????? ?ï¿½ì”ˆ?·ë…»ë¦°é†«ê·£ì??RS) ??????????…ï¿½????ï¿½êº‚ï§ï¿½??ç­Œï¿½? ?ï¿½ê±¡?ºë–·ï¿???²ãƒ«??¿½ëµ?????ï¿½êº‚ï¿½ï¿½?‹êµ¢?"
      }
    ]
  },
  {
    agentName: "?²ãƒ«??¿½ëµ?ï¿½ë½ç§»ï¿½??…ï¿½?¿ë—ª?¬ç­Œï¿½ï¿½?£ï§ï¿?ï¿½ë«–ï¿½ëª¡ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ëœ®?,
    style: "VCP ??¨ëš®ë¼????ï¿½ë†ï¿½ë ° ??ï¿½ëª´æ´¹ï¼¢ï¿?,
    capital: 10000000,
    yield: 0.82,
    stockCount: 1,
    trades: [
      {
        date: "2026-05-04",
        ticker: "AAPL",
        market: "US",
        price: "$183.32",
        reason: "VCP 3-TIGHT",
        comment: "?ï¿½êµï¿½ë’©?ï¿½ë´»ï¿½ï¿½??²ãƒ«?“å ‰ê³ë•Ÿ?????¨ëš®ë¼????ï¿½ë†ï¿½ë ° ??ï¿½ëª´æ´¹ï¼¢ï¿?VCP) ?ï¿½ë„­?¨ï½‹ì³?? ??Ÿë°¸Å¦?Šì–•ì§????????¨ëš®??ï¿½ê¶?¾ï¿½?ï¿½ëŸ¥ï¿½ëª¡ï¿½ë„­?¨ï½‹ì³´ç­Œï¿???äº?¿½? ?²ãƒ«?£ï¿½?????????²ãƒ«?£ï¿½????"
      }
    ]
  },
  {
    agentName: "?ï¿½ë„­?¨ï½‹ì³›ï¿½ï¿½ï¿½????¨ëš®?–ç­Œï¿??,
    style: "?²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¦«ï¿?? & ??èª˜â‘¦ï¿½ï¿½????????ï¿½ï¿½?¥ï¿½ï¿½è«­ï¿?,
    capital: 10000000,
    yield: 3.45,
    stockCount: 2,
    trades: [
      {
        date: "2026-05-04",
        ticker: "HPSP",
        market: "KR",
        price: "??2,500",
        reason: "EPISODIC PIVOT",
        comment: "????????ï¿½êº‚ï¿½ë???ç¹¹ë¨®?ï¿½ê¼§ç™²?«ìŠ£??¿½?? ??å½±ï¿½ï¿½ì”­ï¿½ë§½ ?????²ê¾§?—ï¿½ë«??????¥ï¿½?ï¿½ë–˜??????ï¿½ë?ï§?ˆ???è¢â‘¸ì¦µç’ëº£ë¾ï¿½ë–? ?ï¿½ì”ˆ?·ë…»ë¦????²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¦«ï¿?? ?ç¸•ï¿½???"
      },
      {
        date: "2026-05-04",
        ticker: "ALAB",
        market: "US",
        price: "$68.12",
        reason: "MOMENTUM BURST",
        comment: "??ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼??ï¿½ë«ï¿½ï¿½ï¿½êµ¦ï¿½ë¤Š???ï¦«ëš®?æ´ï¿???ç¯€?ªì½ª?????ï¿½ëª´?¨ë£¸ï¿½ï¿½ ???‘ï¿½???ï¿½ï¿½?¤ï¼˜ï§¥ï¿½???è¢â‘¸ì¦µï¿½ëª??????è¢â‘¸ì¦´ç”•ï¿??ï¿½ëƒ±ï¿½ë®???ï¿½ë?ç«Šì„‡????ï¿½ï¿½?¤ë²¡ï¿½êºŠ."
      }
    ]
  },
  {
    agentName: "???è¢â““ï¿????ï¦«ëš®?ï¿½ë«Šç’ï¿??ç­Œë??¡ï¿½??,
    style: "Stage 2 ??ï¿½ï¿½?¤ë²¡ï¿½êºŠ ?²ãƒ«??¿½ëµ???,
    capital: 10000000,
    yield: -0.5,
    stockCount: 1,
    trades: [
      {
        date: "2026-05-04",
        ticker: "???ç­Œï¿½?ï¿½ë„­?¨ï½‹ì³›é¸šï¿?æ²ƒì„ƒë«—æ´ï¿??,
        market: "KR",
        price: "??15,000",
        reason: "STAGE 2 ENTRY",
        comment: "?æ¬²ê¼²ï¿??????????????ï¿½ë?åª›ï¿½????ï¿½ï¿½?¤ë²¡ï¿½êºŠ????2??å½±ï¿½ï¿½ì“¨ï¿½ï¿½???ï¿½ë?ï§?ˆ???????²ãƒ«?£ï¿½?????ï¦«ëš®Ä²ï¿½ê± ï¿½ï¿½ï¿? ???ï¿½ë–£ï¿½ë€???‰ëš°ï¿½ï¿½???????²ãƒ«??¿½ëµ?ï¿½ë§•ï¿½ë§ª?"
      }
    ]
  },
  {
    agentName: "??????ï§ï¿½ï¿½ï¿½ï¿?ï¿½ë±¾ï¿½ë??,
    style: "?ï¿½ì”ˆï¿½ìˆ???????& ??ï¿½ï¿½?¤ì±·å¯ƒï¿½ ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½??,
    capital: 10000000,
    yield: 0.1,
    stockCount: 1,
    trades: [
      {
        date: "2026-05-04",
        ticker: "KO",
        market: "US",
        price: "$62.45",
        reason: "MOAT ANALYSIS",
        comment: "???æºë†???ï¿½ë?ï§?£¬ï¿½ï¿½??ï¿½ë„­?¨Î»ì¦¸?????????ï¿½ì”ˆ?·ë…»ë¦??????¨ì€«ë®›????????????????? ???ï¿½ì †? ?æ¬²ê¼²ï¿????¨ëš®???? ??ï¿½ë®ï¿½ï¿½???²ãƒ«?£ï¿½????"
      }
    ]
  },
  {
    agentName: "???ï¿½ë£Šï¿½ï¿½??¼ï¿½??¿½ëµ???°ê·¥ì¥“ç³¾?ï¿½ë?è¸°ï¿½??,
    style: "?è¢â‘¸ì¦?ï¿½ï¿½?ç­Œëš®ì±·ï¿½ë®??²ãƒ«??¿½ëµ?ï¿½ë§•ï¿½ë§ª?& ?ï¿½ë‡¡ï¿½ìŠ£ç¶??ë²?????,
    capital: 10000000,
    yield: 1.12,
    stockCount: 5,
    trades: [
      {
        date: "2026-05-04",
        ticker: "??ç¹¹ë¨­?”ï¿½??ï¿½ë„­?¨ï½‹ì³??,
        market: "KR",
        price: "??8,200",
        reason: "BOTTOM ACCUMULATION",
        comment: "???ï¿½ï¿½?ªì‰´ ??ï¿½ï¿½?¤ï¼™?‘ï¿½??ç¹¹ë¨®?è£•ï¿???ï¦«ëš®Ä²ï¿½ê± ï¿½ï¿½ï¿????è¢â‘¸ì¦?ï¿½ï¿½?ç­Œëš®ì±·ï¿½ë®??????²ãƒ«??¿½ëµ?ï¿½ë§•ï¿½ë§ª????‰ë¨¯?????ï¿½ë¤†? ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???²ãƒ«??¿½ëµ???1?²ï¿½??ï¿½ë„­?¨ï½‹ì³??"
      },
      {
        date: "2026-05-04",
        ticker: "?ï¿½ë„­??²ï¿½?,
        market: "KR",
        price: "??45,500",
        reason: "VALUE RE-RATING",
        comment: "??? PBR ???ï¿½êµï¿½ë’©?ï¿½ê¼¯?¾ï¿½???ï¿½ëª´?¨ë£¹ë§??ï¦«ëš®Ä²ï¿½ê± ???ï¿½ì”ˆ?·ë…»ë¦???ï¿½êºï¿½ì????ï¿½ì”ˆ?·ë†ƒ?????ï¿½ë?ï¿½ë–œ????ï¿½ë«ï¿½ï¿½ï¿½êµ¥å½›ï¿½???ï¿½ï¿½?¤ë² æ¯“ï¿½???ï¿½ï¿½?¤ë² æ¯“ì‡¤??"
      }
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
            <History size={36} className="gold" /> 8-f. [ LOGS ] AI ?²ê¾§?—ï¿½ë«??????æºë†ë²??²ãƒ«??¿½ëµ????ï¿½êºï¿½ì??ï¿½ë¼º??¿½?          </h1>
          <p className="sub-title">?????1,000?²ãƒ«??¿½ëµ???/ 2026.05.04 ??ç­Œë??£æ´ï¿?/ ?…ï¿½?¿ë—ª????ï¿½ëƒ±????°ê¶½?´ì¿ ?ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ???ï¿½êºï¿½ê¼¤?????æºë†ë²??²ãƒ«??¿½ëµ???/p>
        </div>
        <div className="global-stat glass">
          <div className="stat-item">
            <span className="label">TOTAL AGENTS</span>
            <span className="val">6 ELITES</span>
          </div>
          <div className="stat-item">
            <span className="label">START CAPITAL</span>
            <span className="val">??0,000,000</span>
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
                  <h2 className="p-name">{selectedAgent.agentName} ???‰ë¨¯?????ï¿½ë„­?¨ï½‹ì³?????¨ì€«ë®›???/h2>
                  <p className="p-style">{selectedAgent.style}</p>
                </div>
              </div>
              <div className="capital-status">
                <span className="c-label">CURRENT CAPITAL</span>
                <span className="c-val">??(selectedAgent.capital * (1 + selectedAgent.yield/100)).toLocaleString()}</span>
              </div>
            </div>

            <div className="trades-timeline">
              <h3 className="section-title"><Calendar size={18} /> ???æºë†ë²??²ãƒ«??¿½ëµ??????ï¿½ë„­?¨ï½‹ì³›ï¿½ï¿½ï¿½??/h3>
              <div className="timeline-list">
                {selectedAgent.trades.length > 0 ? (
                  selectedAgent.trades.map((trade, i) => (
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
                  ))
                ) : (
                  <div className="empty-logs">
                    <History size={48} className="empty-icon" />
                    <p>?ï¿½ë„­?¨ï½‹ì³???ï¿½êºï¿½ì??ï¿½ë¼º??¿½?????æºë†ë²??²ãƒ«??¿½ëµ?????ï¿½ï¿½?¤ï¼™?‰ï¿½????ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡.</p>
                    <span>?ï¿½ë„­?¨ï½‹ì³?????‰ë¨¯??¿½ë¹???ï¿½ì”ˆï¿½ìˆ???æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº?ï¿½ë„«?¾ë??? ?²ï¿½??ï§ï¿½ï¿½ï¿½ï¿?????????„ï¿½???ï¿½ë¤†???ï¿½ë»¹?¾ï¿½ ?ï¿½ë„­?¨Îºë°????ç­Œë??£æ²…ï¿???ï¿½ì”ˆ?·ë†ƒ?????å¯ƒë—ï¿?????¨ï¿½????ï¿½ëœ„ï¿½ë ¡.</span>
                  </div>
                )}
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

        .empty-logs { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 60px 20px; text-align: center; gap: 16px; background: rgba(255,255,255,0.01); border-radius: 20px; border: 1px dashed rgba(255,255,255,0.05); }
        .empty-icon { color: #222; }
        .empty-logs p { font-size: 1.1rem; font-weight: 800; color: #555; margin: 0; }
        .empty-logs span { font-size: 0.85rem; color: #333; font-weight: 600; }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
