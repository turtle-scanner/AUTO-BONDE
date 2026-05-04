"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Shield, Lock, Key, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function SecurityPage() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="security-container animate-fade-in">
      <div className="security-header">
        <h1 className="security-title">
          <Shield size={32} className="title-icon" /> [ SECURE ] ??ç¯€??³®????¨ëš®??ï¿½ê¶šï¿½ë?????????ï§ï¿½ï¿½ï¿½ï¿?????¨ëš®ë¼???        </h1>
        <p className="security-subtitle">??ï¿½ëŒ–?¨ï¿½?ï¿½ë•»???ï¿½ëª´?¨ë£°????ç¯€??³®????¨ëš®??ï¿½ê¶šï¿½ë?????ï¿½ëƒï¿½ê¶¢???²ãƒ«?”ï¿½ê± ç’ëº£ë¾?¾ï¿½??ï¿½ï¿½?¥ï¿½ï¿½í” ?????ç­Œëš¯?œï¿½ï¿½ï¿½??ç­Œë??—ï¿½?? ?ï¦«ï¿½????ï¿½ë?ï§?£¬ï¿½ï¿½??????ï§ï¿½ï¿½ï¿½ï¿?????¨ëš®ë¼??æ¿¡ã‚??? ?ï¿½ë„­?¨ï½‹ì³????ï¿½êµï¿½ë²??</p>
      </div>

      <div className="security-grid">
        <GlassCard className="password-form-card">
          <h3 className="form-title">?????ï§ï¿½ï¿½ï¿½ï¿?????¨ëš®ë¼???(Change Access Key)</h3>
          <div className="form-groups">
            <div className="form-group">
              <label>?ï¿½ë„­?¨ï½‹ì³???????ï§ï¿½ï¿½ï¿½ï¿???(Current Access Key)</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input type={showPass ? "text" : "password"} placeholder="???ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½? className="glass-input" />
              </div>
            </div>

            <div className="form-group">
              <label>???????ï§ï¿½ï¿½ï¿½ï¿???(New Access Key)</label>
              <div className="input-wrapper">
                <Key size={18} className="input-icon" />
                <input type={showPass ? "text" : "password"} placeholder="???ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½? className="glass-input" />
                <button className="toggle-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>???????ï§ï¿½ï¿½ï¿½ï¿????ï¦«ëš®Ä²ï¿½ê± ï¿½ï¿½ï¿?(Confirm New Access Key)</label>
              <div className="input-wrapper">
                <Key size={18} className="input-icon" />
                <input type={showPass ? "text" : "password"} placeholder="???ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½??ï¿½ë™šï¿½ï¿½? className="glass-input" />
              </div>
            </div>
          </div>

          <button className="submit-btn">
            <ShieldCheck size={20} /> ??¨ëš®??ï¿½ê¶šï¿½ë???????ï¿½êµï§ï¿½???¬ê³£ë«€?„ï¿½ ??ï¿½ë?ï§?¿½??          </button>
        </GlassCard>

        <div className="security-sidebar">
          <GlassCard title="??¨ëš®??ï¿½ê¶šï¿½ë???²ãƒ«?£ï¿½????(Security Protocols)" className="protocol-card">
            <ul className="protocol-list">
              <li>?²ãƒ«?”ï¿½ê± ç’ï¿??12????ï¿½ï¿½?¤ï¿½ï¿½å½›ï¿????ï¿½ë?ä»¥ï¿½? ????? ?ï¿½ë›¾?ï¿½ï¿½?ï¿½ê²«ï¿½ê¶ ï¿½ë–›ï¦«ëš®?ï¿½ë«????‰ëš°ï¿½ï¿½?ï¿½ë‰–????ï¿½ì’??´ï¿½????ç­Œë¤¾?“ï¿½???</li>
              <li>?? ????ï¦«ï¿½? ???ï¿½ë§§ï¿½ëŸ¡???????ï§ï¿½ï¿½ï¿½ï¿???????? ?ï¿½ë„­?¨Îºë°???ç­Œë¤¾?“ï¿½???</li>
              <li>2??å½±ï¿½ï¿½ì“¨ï¿½ï¿½??ï¦«ëš®?ï¿½ë«’ç­Œï¿?2FA) ??ç­Œï¿½?ï¿½ë °??? ?ï¿½ì”ˆ?·ë…»ë¦???ï¿½ì’??´ï¿½????ç­Œë¤¾?“ï¿½???</li>
              <li>?????ï§ï¿½ï¿½ï¿½ï¿????90??ï¿½ï¿½?¥ï¿½?ë¼???ï¿½ì”ˆ?·ï¿½?????¥â–²êº‚ï§¥ï¿??æ¿¡ã‚?????ï¿½ë„­?¨ï½‹ì³???ï¿½ë?ï§?¤„ì­—ï¿½ë±¶ï¿½????ï¿½êº‚è¸°ï½‰ê±??ç­Œë¤¾?“ï¿½???</li>
            </ul>
          </GlassCard>

          <GlassCard title="?²ãƒ«?”ï¿½ê± ç’ï¿???æ£ºï¿½ë£±ç’ï¿???????? className="login-log-card">
            <div className="login-list">
              {[
                { date: "2026-05-02 14:22", ip: "125.132.XXX.XX", device: "Windows Desktop" },
                { date: "2026-05-01 09:15", ip: "211.234.XXX.XX", device: "iPhone 15 Pro" }
              ].map((log, i) => (
                <div key={i} className="login-item">
                  <span className="log-date">{log.date}</span>
                  <span className="log-device">{log.device} ({log.ip})</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .security-container { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .security-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: #fbbf24; }
        .security-subtitle { color: var(--text-muted); font-size: 1rem; margin-top: 8px; }

        .security-grid { display: grid; grid-template-columns: 1fr 380px; gap: 24px; }
        
        .password-form-card { padding: 40px; }
        .form-title { font-size: 1.4rem; font-weight: 900; color: white; margin-bottom: 32px; border-bottom: 1px solid var(--card-border); padding-bottom: 16px; }
        
        .form-groups { display: flex; flex-direction: column; gap: 24px; margin-bottom: 40px; }
        .form-group { display: flex; flex-direction: column; gap: 10px; }
        .form-group label { font-size: 0.85rem; font-weight: 800; color: var(--text-muted); }
        
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 16px; color: var(--text-muted); }
        .glass-input { width: 100%; padding: 14px 16px 14px 48px; background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); border-radius: 10px; color: white; font-size: 1rem; outline: none; transition: all 0.3s; }
        .glass-input:focus { border-color: var(--primary); background: rgba(255,255,255,0.07); box-shadow: 0 0 15px rgba(0, 242, 255, 0.1); }
        
        .toggle-btn { position: absolute; right: 16px; background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; }

        .submit-btn { width: 100%; padding: 16px; border-radius: 12px; background: #fbbf24; color: black; font-size: 1rem; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 12px; cursor: pointer; border: none; transition: all 0.3s; }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 0 20px rgba(251, 191, 36, 0.4); }

        .security-sidebar { display: flex; flex-direction: column; gap: 24px; }
        .protocol-list { list-style: disc; padding-left: 20px; display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
        .protocol-list li { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; line-height: 1.4; }

        .login-list { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; }
        .login-item { padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.02); }
        .log-date { font-size: 0.75rem; font-weight: 800; color: white; display: block; margin-bottom: 4px; }
        .log-device { font-size: 0.75rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
