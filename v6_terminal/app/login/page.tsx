"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ShieldCheck, Zap } from 'lucide-react';

export default function LoginPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 환경에서는 API 연동을 하지만, 
    // 여기서는 로컬 경험을 위해 즉시 승인 프로세스를 시뮬레이션합니다.
    if (id && pw) {
      router.push('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box glass animate-fade-in">
        <div className="login-header">
          <div className="logo-icon glass">
            <Zap size={32} fill="var(--primary)" color="var(--primary)" />
          </div>
          <h1 className="gradient-text">DRAGONFLY v6.0</h1>
          <p>Elite Operator Authorization Required</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group glass">
            <User size={20} className="icon" />
            <input 
              type="text" 
              placeholder="OPERATOR ID" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div className="input-group glass">
            <Lock size={20} className="icon" />
            <input 
              type="password" 
              placeholder="ACCESS CODE" 
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">
            <ShieldCheck size={20} />
            AUTHORIZE ACCESS
          </button>
        </form>

        <div className="login-footer">
          <span>SECURED BY ANTIGRAVITY ENCRYPTION</span>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: 
            radial-gradient(circle at 10% 10%, rgba(0, 242, 255, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 90% 90%, rgba(112, 0, 255, 0.08) 0%, transparent 50%);
        }

        .login-box {
          width: 420px;
          padding: 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .logo-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
        }

        .login-header h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .login-header p {
          font-size: 0.85rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .input-group {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border-radius: 12px;
        }

        .input-group .icon {
          color: var(--text-muted);
        }

        .input-group input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          outline: none;
          font-size: 1rem;
          font-weight: 500;
        }

        .login-btn {
          margin-top: 12px;
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
          transition: all 0.2s;
          box-shadow: 0 0 20px var(--primary-glow);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        .login-footer {
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.2em;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
