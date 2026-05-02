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
          <Shield size={32} className="title-icon" /> [ SECURE ] 계정 보안 및 비밀번호 변경
        </h1>
        <p className="security-subtitle">사령관님의 계정 보안 레벨을 최상으로 유지하십시오. 정기적인 비밀번호 변경은 필수입니다.</p>
      </div>

      <div className="security-grid">
        <GlassCard className="password-form-card">
          <h3 className="form-title">비밀번호 변경 (Change Access Key)</h3>
          <div className="form-groups">
            <div className="form-group">
              <label>현재 비밀번호 (Current Access Key)</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input type={showPass ? "text" : "password"} placeholder="••••••••" className="glass-input" />
              </div>
            </div>

            <div className="form-group">
              <label>새 비밀번호 (New Access Key)</label>
              <div className="input-wrapper">
                <Key size={18} className="input-icon" />
                <input type={showPass ? "text" : "password"} placeholder="••••••••" className="glass-input" />
                <button className="toggle-btn" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>새 비밀번호 확인 (Confirm New Access Key)</label>
              <div className="input-wrapper">
                <Key size={18} className="input-icon" />
                <input type={showPass ? "text" : "password"} placeholder="••••••••" className="glass-input" />
              </div>
            </div>
          </div>

          <button className="submit-btn">
            <ShieldCheck size={20} /> 보안 키 업데이트 적용
          </button>
        </GlassCard>

        <div className="security-sidebar">
          <GlassCard title="보안 지침 (Security Protocols)" className="protocol-card">
            <ul className="protocol-list">
              <li>최소 12자 이상의 영문, 숫자, 특수문자 조합을 권장합니다.</li>
              <li>타 사이트와 동일한 비밀번호 사용은 위험합니다.</li>
              <li>2단계 인증(2FA) 활성화를 강력히 권고합니다.</li>
              <li>비밀번호는 90일마다 갱신하는 것이 전술적으로 유리합니다.</li>
            </ul>
          </GlassCard>

          <GlassCard title="최근 로그인 이력" className="login-log-card">
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
