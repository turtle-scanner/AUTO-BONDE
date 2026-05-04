"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Users, UserPlus, Award, Briefcase, TrendingUp } from 'lucide-react';
import { PERMANENT_MEMBERS, Member } from '@/constants/members';

export default function HRDepartment() {
  const staffStats = [
    { label: "?ï¿½ë„­?¨ï½‹ì³??????, val: "7", icon: <Users size={20} />, color: "#0ea5e9" },
    { label: "??ï¿½êº‚ï§ï¿½???ï¿½ë„­?", val: "+1", icon: <UserPlus size={20} />, color: "#10b981" },
    { label: "???æºë…¾????ç­Œëš¯??‚‰ï¿??, val: "1", icon: <Award size={20} />, color: "#fbbf24" },
    { label: "??ï¿½ë¼”???????ï¿½ëœ®?, val: "7", icon: <Briefcase size={20} />, color: "#ff0055" }
  ];

  return (
    <div className="hr-container animate-fade-in">
      <div className="hr-header">
        <h1 className="hr-title">
          <Briefcase size={32} className="title-icon" /> [ HR ] ??¨ëš®?–ç­Œï¿? ?ï¦«ëš®?ï¿½ë«??????ï¿½ê±¡?ºë–·ï¿?        </h1>
        <p className="hr-subtitle">??¨ëš®?–ç­Œï¿? ?????ï¿½ë¤ƒ???ï¦«ëš®?ï¿½ë«?????????ï¿½ë®ï¿½ï¿½??????¨ëš®?–ç”•ê³•ë§®å¤·ï¿½ ?ï¿½êºï¿½ì??ï¿½ë¼º??¿½???ï¿½ë¿™ï¿½ëœ®????¥â–²êº‚ï§¥ï¿?æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº???ï¿½ê±¡?ºë–·ï¿??ç­Œë??¡ï¿½ë¿???ï¿½ëœ„ï¿½ë ¡.</p>
      </div>

      <div className="stats-grid">
        {staffStats.map((stat, i) => (
          <GlassCard key={i} className="stat-card">
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-val">{stat.val}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="hr-main-grid">
        <GlassCard title="?²ãƒ«?£ï¿½???????æºë†????²ãƒ«??¿½?–ï¿½ë¤??(Promotion Queue)" className="promotion-card">
          <div className="promotion-info-box">
            <TrendingUp size={16} className="gold" />
            <span>??ç­Œë¨²?£å½›ï¿??æ¿¡ã‚????ï¿½ê¶ ï¿½ë–›?(+10pt) | ??ç¹¹ë¨®?ï¿½????ï¿½ë¼”?ï¿½ëŒ†?(+5pt) | ???æºë†ë²???ï¿½ëª´?¨ë£¸????ï¿½ë‡?¡ï¿½?? (+50pt)</span>
          </div>
          <div className="promotion-list">
            {PERMANENT_MEMBERS.filter(m => m.rank !== '?è¢â‘¸?»æ³³ï¿??).map((p, i) => (
              <div key={i} className="promotion-item">
                <div className="p-info">
                  <span className="p-id">{p.id}</span>
                  <span className="p-route">{p.rank} ???ï¦«ëš®Ä²ï¿½ê± ï¿½ë¤ƒ???‰ë¨¯???/span>
                </div>
                <div className="p-bar-bg">
                  <div className="p-bar-fill" style={{ width: `${((p.points || 0) / 1000) * 100}%` }}></div>
                </div>
                <div className="p-score">
                  <span className="p-current-val">{p.points || 0}</span>
                  <span className="p-max-val">/ 1000</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard title="??¨ëš®?–ç­Œï¿? ?ï¦«ëš®?ï¿½ë«????????ç­Œï¿½?ï§¥ï¿½???ï¿½ì”ˆ?·ï¿½??? className="record-card">
          <div className="record-list">
            {[
              { date: "2026-05-03", msg: "??ï¿½ëŒ–?¨ï¿½?ï¿½ë•»? ?ï¿½ë›¾ï¿½ë£†ï§?¿½???²ãƒ«?£ï¿½???? ???????²ãƒ«?£ï¿½?????æ¿¡ã‚???ï¿½ë„«?¾ï¿½?? 1,000pt ?²ãƒ«?ªï¿½ë§??å½±ï¿½ï¿½ëƒ±?‰ï¿½??ï¿½ì”ˆ?·ë‰“ì§?????ç¸•ï¿½??¿ë…¿????ï¿½ë„­?¨ï½‹ì³?? },
              { date: "2026-05-03", msg: "??ç­Œë¨²?£å½›ï¿??????????¨ëº£ë¹????ï¿½ë?è¸°ì¢‘ì­???ç­Œï¿½?ï§¥ï¿½???ï¿½ì”ˆï¿½ìˆ?????ç­Œë??£æ´ï¿? },
              { date: "2026-05-03", msg: "??ï¿½êº‚ï§ï¿½???²ãƒ«??¿½?–ï¿½ë¤?? fire33, sebinhi, popsong98 ??2?²ï¿½??ï¿½êºï¿½ì??ç¯€?‡ë©???²ãƒ«?µï¿½ï¿½ï¿½?·ï¿½????ç­Œë??£æ´ï¿? }
            ].map((r, i) => (
              <div key={i} className="record-item">
                <span className="record-date">{r.date}</span>
                <p className="record-msg">{r.msg}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .hr-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .hr-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .hr-subtitle { color: var(--text-muted); font-size: 1rem; margin-top: 8px; }

        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .stat-card { padding: 24px; display: flex; align-items: center; gap: 20px; }
        .stat-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; }
        .stat-info { display: flex; flex-direction: column; }
        .stat-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
        .stat-val { font-size: 1.5rem; font-weight: 900; color: white; }

        .hr-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        
        .promotion-list { display: flex; flex-direction: column; gap: 24px; margin-top: 20px; }
        .promotion-item { display: flex; align-items: center; gap: 20px; }
        .p-info { flex-shrink: 0; width: 150px; display: flex; flex-direction: column; }
        .p-id { font-weight: 800; color: white; font-size: 0.95rem; }
        .p-route { font-size: 0.75rem; color: var(--text-muted); }
        
        .p-bar-bg { flex: 1; height: 10px; background: rgba(255,255,255,0.05); border-radius: 5px; overflow: hidden; border: 1px solid rgba(255,255,255,0.02); }
        .p-bar-fill { height: 100%; background: linear-gradient(to right, #d4af37, #f59e0b); border-radius: 5px; box-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
        .p-score { display: flex; align-items: baseline; gap: 4px; width: 80px; justify-content: flex-end; }
        .p-current-val { font-family: 'Fira Code', monospace; font-size: 1rem; font-weight: 900; color: #f59e0b; }
        .p-max-val { font-size: 0.7rem; color: #555; font-weight: 700; }
        .promotion-info-box { display: flex; align-items: center; gap: 10px; padding: 12px; background: rgba(212, 175, 55, 0.05); border-radius: 8px; margin-top: 16px; font-size: 0.75rem; color: #a3a3a3; font-weight: 700; }
        .gold { color: #d4af37; }

        .record-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
        .record-item { padding: 16px; border-radius: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); }
        .record-date { font-size: 0.75rem; font-weight: 800; color: var(--primary); display: block; margin-bottom: 8px; }
        .record-msg { font-size: 0.9rem; color: #e2e8f0; line-height: 1.5; }
      `}</style>
    </div>
  );
}
