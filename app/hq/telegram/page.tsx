"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Send, 
  Settings, 
  Bell, 
  ShieldCheck, 
  Zap, 
  RefreshCw,
  MessageSquare,
  Lock
} from 'lucide-react';

export default function TelegramCenterPage() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("dragonfly_user");
    if (['cntfed', 'hjrubbi'].includes(user || '')) {
      setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) return <div className="p-10 text-white">Unauthorized Access</div>;

  return (
    <div className="telegram-container animate-fade-in">
      <div className="telegram-header">
        <h1><span className="tag">[ NOTIFY ]</span> TELEGRAM ALERT HUB</h1>
        <p className="subtitle">????¨ëº£ë¹???ï¿½ë„­?¨ï½‹ì³?????äº?¿½???????ï¿½ë?è¸°ì¢‘ì­????æºë†??????«ë¡«??/p>
      </div>

      <div className="telegram-grid">
        <GlassCard className="config-card">
          <div className="card-header">
            <Settings size={20} className="gold" /> BOT CONFIGURATION
          </div>
          <div className="config-form">
            <div className="input-group">
              <label>BOT TOKEN</label>
              <input type="password" value="****************************************" disabled />
            </div>
            <div className="input-group">
              <label>CHAT ID (MASTER)</label>
              <input type="text" value="649172839" disabled />
            </div>
            <button className="test-btn"><Send size={14} /> SEND TEST SIGNAL</button>
          </div>
        </GlassCard>

        <GlassCard className="alert-settings">
          <div className="card-header">
            <Bell size={20} className="gold" /> ALERT FILTERS
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <span>TRADING EXECUTION (BUY/SELL)</span>
              <div className="toggle active">ON</div>
            </div>
            <div className="setting-item">
              <span>SQUARE CHECK-IN NOTIFICATION</span>
              <div className="toggle">OFF</div>
            </div>
            <div className="setting-item">
              <span>GEMINI MARKET ANALYSIS (9AM)</span>
              <div className="toggle active">ON</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .telegram-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .tag { color: var(--primary); font-weight: 950; }
        .subtitle { color: #64748b; font-weight: 600; margin-top: 6px; }
        
        .telegram-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
        .config-card, .alert-settings { padding: 30px; }
        .card-header { display: flex; align-items: center; gap: 12px; font-weight: 900; font-size: 0.9rem; margin-bottom: 25px; }

        .config-form { display: flex; flex-direction: column; gap: 20px; }
        .input-group label { display: block; font-size: 0.7rem; font-weight: 800; color: #64748b; margin-bottom: 8px; }
        input { width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; color: white; }
        
        .test-btn { margin-top: 10px; background: rgba(212, 175, 55, 0.1); border: 1px solid var(--primary); color: var(--primary); padding: 12px; border-radius: 8px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; }

        .settings-list { display: flex; flex-direction: column; gap: 15px; }
        .setting-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(255,255,255,0.02); border-radius: 10px; font-size: 0.8rem; font-weight: 700; }
        .toggle { padding: 4px 12px; border-radius: 12px; font-size: 0.6rem; font-weight: 900; background: #334155; color: #94a3b8; }
        .toggle.active { background: var(--primary); color: black; }

        .gold { color: var(--primary); }
      `}</style>
    </div>
  );
}
