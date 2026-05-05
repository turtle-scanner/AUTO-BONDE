"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Settings as SettingsIcon, Shield, Key, Cpu, Save, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="settings-container animate-fade-in">
      <div className="settings-header">
        <h2 className="gradient-text">Command Settings</h2>
        <p>??ÔøΩÎåñ?®Î∫£?ºÈáéÔø? ???ÔøΩÏ†Ü????ÔøΩÔøΩ?óÍæ©?Ä?Êø°ÔøΩ?¥ÔøΩ??????®ÎöÆ??ÔøΩÍ∂öÔøΩÎ?????Ê∫êÎÜÅ?????ÔøΩÎèÆÔøΩÔøΩ??üÎ∞∏≈¶?â„ÉßÎµ?????</p>
      </div>

      <div className="settings-grid">
        <div className="settings-column">
          <GlassCard title="API Authorization Status" className="config-card">
            <div className="config-list">
              {[
                { name: "Korea Investment (KIS)", status: "CONNECTED", type: "Main" },
                { name: "Telegram Bot API", status: "CONNECTED", type: "Notification" },
                { name: "Gemini AI Engine", status: "AUTHORIZED", type: "Intelligence" }
              ].map((api, i) => (
                <div key={i} className="config-item">
                  <div className="api-info">
                    <Key size={16} className="status-up" />
                    <div>
                      <div className="api-name">{api.name}</div>
                      <div className="api-type">{api.type}</div>
                    </div>
                  </div>
                  <span className="status-badge live">{api.status}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard title="Bot Core Parameters" className="config-card">
            <div className="param-grid">
              <div className="param-item">
                <label>Stop-Loss (SMA7)</label>
                <input type="text" className="glass" defaultValue="-2.5%" />
              </div>
              <div className="param-item">
                <label>Take-Profit Target</label>
                <input type="text" className="glass" defaultValue="+15.0%" />
              </div>
              <div className="param-item">
                <label>VCP Min Consolidation</label>
                <input type="text" className="glass" defaultValue="4 weeks" />
              </div>
              <div className="param-item">
                <label>Max Single Position</label>
                <input type="text" className="glass" defaultValue="20%" />
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="settings-column">
          <GlassCard title="System Performance" className="config-card">
            <div className="perf-stats">
              <div className="perf-item">
                <span className="label">CPU USAGE</span>
                <div className="perf-bar"><div className="fill" style={{ width: '12%' }}></div></div>
                <span className="val">12%</span>
              </div>
              <div className="perf-item">
                <span className="label">LATENCY</span>
                <div className="perf-bar"><div className="fill" style={{ width: '45%' }}></div></div>
                <span className="val">45ms</span>
              </div>
            </div>
            <button className="reboot-btn glass">
              <RefreshCw size={14} /> RESTART ENGINE
            </button>
          </GlassCard>

          <div className="action-row">
            <button className="save-btn">
              <Save size={18} /> SAVE ALL CHANGES
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .settings-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .settings-header h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .settings-header p {
          color: var(--text-muted);
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 24px;
        }

        .settings-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .config-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 12px;
        }

        .config-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border: 1px solid var(--card-border);
        }

        .api-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .api-name { font-weight: 700; font-size: 0.9rem; }
        .api-type { font-size: 0.75rem; color: var(--text-muted); }

        .param-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 12px;
        }

        .param-item label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 6px;
          font-weight: 600;
        }

        .param-item input {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          color: white;
          outline: none;
          font-weight: 600;
        }

        .perf-stats {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 16px 0;
        }

        .perf-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .perf-item .label {
          width: 80px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .perf-bar {
          flex: 1;
          height: 6px;
          background: rgba(255,255,255,0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .perf-bar .fill {
          height: 100%;
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .perf-item .val {
          font-size: 0.75rem;
          font-weight: 700;
        }

        .reboot-btn {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--danger);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }

        .save-btn {
          width: 100%;
          padding: 16px;
          background: var(--primary);
          color: black;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 0 20px var(--primary-glow);
        }
      `}</style>
    </div>
  );
}
