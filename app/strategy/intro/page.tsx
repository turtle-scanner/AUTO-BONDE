"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Cpu, Terminal, Users, ShieldAlert, Rocket, Trophy, Wallet } from 'lucide-react';
import Link from 'next/link';

export default function StrategyIntro() {
  const masters = [
    { name: "???ï¿½ê±¡?????ï¿½ë‚ï¿½ë’Š", role: "CAN SLIM ?ï¿½êºï¿½ì??ï¿½ë„ï¿½ë???²ãƒ«?“ï¿½ë£????, desc: "??ç­Œë??£æ²…ï¿???ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»?? ??ï¿½ë¤†???¥â–²êº‚ï§¥ï¿??²ãƒ«?”ï¿½ê± ç’ï¿??????ï¿½ë‚?‰ï¿½???æ£ºï¿½ë£±ç’ëº£ë½ï¿½ë§ª????????ç­Œë¤¾?“ï¿½???", color: "#3b82f6" },
    { name: "?²ãƒ«??¿½ëµ?ï¿½ë½ç§»ï¿½??…ï¿½?¿ë—ª?¬ç­Œï¿½ï¿½?£ï§ï¿?ï¿½ë«–ï¿½ëª¡ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ëœ®?, role: "VCP ??¨ëš®ë¼????ï¿½ë†ï¿½ë ° ??ï¿½ëª´æ´¹ï¼¢ï¿??ï¿½ë„­?¨ï½‹ê´?ç­Œï¿½?", desc: "?ï¿½ï¿½?¤ë² æ¯“ï¿½????ï¿½ì”ˆï¿½ìˆ???ï¿½ï¿½?¤ì±¶?—ï¿½ ?²ãƒ«?£ï¿½??????„ï¿½??ï¦«ï¿½????ï¿½ìŠ¦è¸°ï¿½ ???æ¿¡ã‚‹?¸æ³³ï¿½ï¿½?˜ï¿½?€???ï¿½ë„­?¨ï½‹ì³?ï¿½ï¿½ï¿½ï§Œï¿?ï¿½ëŸ¾ï¿½ï¿½???ï¿½êµï¿½ë²??", color: "#10b981" },
    { name: "???è¢â““ï¿????ï¦«ëš®?ï¿½ë«Šç’ï¿????, role: "Stage Analysis ???ï¿½ì”ˆï¿½ìˆ?", desc: "??ç­Œë??£æ²…ï¿??????ï¿½ï¿½?¤ì±¶?´ï¿½ ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???ç­Œëš¯??‚‰ï¿????æºë†ë²???²ãƒ«?£ï¿½??????ç­Œë??£ï¿½????æ¿¡ã‚?????ç­Œë¤¾?“ï¿½???", color: "#ef4444" },
    { name: "?ï¿½ë„­?¨ï½‹ì³›ï¿½ï¿½ï¿½????¨ëš®?–ç­Œï¿??, role: "EP(Episodic Pivot) ?²ãƒ«??¿½ëµ????, desc: "?ï¿½ì”ˆ?·ë…»ë¦????²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¦«ï¿?????è¢â‘¸ì¦µç’ëº£ë¾ï¿½ë–???¥â–²êº‚ï§¥ï¿????°ï¿½?ï¿½ì¿????ï¿½ë¤†??ç­Œëš¯??‚‰ï¿???ï¿½ë‡????ï¿½ë?ï§?¤„ì­—ï¿½ë±¶ï¿½???²ãƒ«?£ï¿½?????ç­Œë¤¾?“ï¿½???", color: "#f59e0b" },
  ];

  return (
    <div className="strategy-container animate-fade-in">
      <div className="section-header">
        <h1><span className="tag">[ STRATEGY ]</span> 8-a. AI ???‰ë¨¯??????²ê¾§?—ï¿½ë«??????ç­Œï¿½?/h1>
        <p className="subtitle">?ï¦«ëš®?¥ï§¢ï¿???ï¿½ë?ï§?£¬ï¿½ï¿½??????²ê¾§?—ï¿½ë«?????æºë‚ƒ???ï¿½ë„­?¨ï½‹ì³???AI ?????ï¿½ï¿½ï¿??‘ï¿½??ï¿½ï¿½?¥ï¿½ï¿½í” ??ï¿½ï¿½?¤ï¼˜ï§‘ï¿½????¨ï¿½????ï¿½ëœ„ï¿½ë ¡.</p>
      </div>

      <div className="masters-grid">
        {masters.map((m, i) => (
          <GlassCard key={i} className="master-card" hoverable={true}>
            <div className="master-header">
              <div className="avatar" style={{ background: m.color }}>{m.name[0]}</div>
              <div className="master-info">
                <h3>{m.name} [AI AGENT]</h3>
                <span className="role">{m.role}</span>
              </div>
            </div>
            <p className="desc">{m.desc}</p>
            <div className="status-bar">
              <div className="status-label">Operational Status:</div>
              <div className="status-val status-up">ACTIVE</div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* 1,000?²ãƒ«??¿½ëµ????²ãƒ«??¿½?ˆæ³³ï¿????????ï¿½ëƒ? ?ï¿½ë›¾?ï¿½ï¿½???ï¿½ï¿½?¤ë² ?‰ï¿½? */}
      <div className="simulation-mission-section">
        <GlassCard className="mission-card gold-border-glow">
          <div className="mission-content">
            <div className="mission-icon">
              <Rocket size={40} className="gold" />
            </div>
            <div className="mission-text">
              <h2>???ï¿½ê±¡?ºë–·ï¿????1,000?²ãƒ«??¿½ëµ????²ãƒ«??¿½?ˆæ³³ï¿??????ï¿½ë„­?¨ï½‹ê´??ï¿½ê±¡?ºë–·ï¿??/h2>
              <p>
                ???ï¿½êµï¿½ë£‚?ï¿½ì˜“åª›ï¿½ç­Œï¿½?æ²ƒì„…ë£—ï¿½ëª¡ï¿½??€¨Îºë°ï¿½ì †???ï¿½ëŒ–?¨ëº£?¼é‡ï¿????²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¿½?????????«ëˆ????ï¿½ë‡?¡ï¿½????ï¿½ìŠ¦è¸°ï¿½ <strong>?ç¸•ï¿½??¿ë…¿?????äº?‚†?“å ‰ï¿?1,000?²ãƒ«??¿½ëµ???/strong>???²ãƒ«??¿½?ˆæ³³ï¿????????è¢ã‚‹ë£???²ãƒ«?£ï¿½???ï¿½êº‚ï¿½ï¿½ï¿½ï¿½ç­Œë²êµ?¿½?????ï¿½ëœ„ï¿½ë ¡. 
                AI ?²ê¾§?—ï¿½ë«?????æºë‚ƒ???ï¿½ë„­?¨ï½‹ì³?????ç­Œë??¡è£•ï¿??ç­Œëš¯??‚‰ï¿???ï¿½ëª´?¨ë£¸???ï§’ê³—ì²???ï¿½ì˜“åª›ï¿½?¶ï¿½???ï¿½ï¿½ï¿½ï¿½ï¿?????? ?????ê»ê¹¿ä¼Šï¿?è«›ë©¸???²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¿½???æ¿šë°¸Å¦ï¿½êºŠ??? ????¨ëº£ë¹?ï¿½ì”ˆ?·ï¿½?????‰ï¿½??ï¿½êºï¿½ì??ï¿½ë¼º??¿½??ç­Œë¤¾?“ï¿½???
              </p>
              <div className="mission-features">
                <div className="feat-item"><Wallet size={16} /> 1,000?²ãƒ«??¿½ëµ????ï¿½êºï¿½ì?????²ãƒ«?£ï¿½????/div>
                <div className="feat-item"><Trophy size={16} /> ?²ãƒ«??¿½?–ï¿½ë¤????ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ì †?8-g) ??ï¿½ë?è¸°ì¢‘ì­?/div>
                <div className="feat-item"><Users size={16} /> ???ï¿½ê±¡?ºë–·ï¿???????æºë†ë²??æ¿¡ã‚????/div>
              </div>
              <Link href="/auto/exec">
                <button className="mission-btn">?ï¿½ë„­?¨ï½‹ê´???ç­Œë??£æ´ï¿???ï¿½ë»¹?¾ï¿½ <Terminal size={16} /></button>
              </Link>
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .strategy-container { padding: 40px; display: flex; flex-direction: column; gap: 48px; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; }
        
        .masters-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .master-card { padding: 24px; }
        .master-header { display: flex; gap: 16px; align-items: center; margin-bottom: 20px; }
        .avatar { 
          width: 50px; height: 50px; border-radius: 12px; display: flex; 
          align-items: center; justify-content: center; font-weight: 900; color: white;
          font-size: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }
        .master-info h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 4px; }
        .role { font-size: 0.75rem; color: var(--primary); font-weight: 700; text-transform: uppercase; }
        .desc { font-size: 0.9rem; color: #cbd5e1; line-height: 1.6; margin-bottom: 24px; min-height: 50px; }
        
        .status-bar { 
          display: flex; justify-content: space-between; align-items: center; 
          padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 0.7rem; font-weight: 800;
        }
        .status-val { color: #00ff88; }

        /* Simulation Mission Styles */
        .simulation-mission-section { margin-top: 20px; }
        .mission-card { padding: 40px; background: linear-gradient(135deg, rgba(212, 175, 55, 0.05), rgba(0, 0, 0, 0.4)); }
        .gold-border-glow { border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 0 30px rgba(212, 175, 55, 0.1); }
        
        .mission-content { display: flex; gap: 32px; align-items: center; }
        .mission-icon { background: rgba(212, 175, 55, 0.1); padding: 24px; border-radius: 20px; }
        .mission-text h2 { font-size: 1.6rem; font-weight: 900; color: #f2f2f2; margin-bottom: 12px; }
        .mission-text p { font-size: 1rem; color: #94a3b8; line-height: 1.7; margin-bottom: 24px; }
        .mission-text strong { color: var(--primary); }

        .mission-features { display: flex; gap: 20px; margin-bottom: 30px; }
        .feat-item { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 800; color: #cbd5e1; background: rgba(255, 255, 255, 0.03); padding: 8px 16px; border-radius: 10px; }

        .mission-btn { 
          background: var(--primary); color: black; border: none; padding: 14px 28px; 
          border-radius: 12px; font-weight: 900; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; gap: 10px; transition: all 0.3s;
        }
        .mission-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0, 255, 136, 0.2); }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
