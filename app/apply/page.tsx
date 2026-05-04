"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Send, UserPlus, ClipboardList } from 'lucide-react';

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    thoughts: '',
    intro: '',
    goals: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("사령부에 승격 신청서가 전송되었습니다. 심사 후 승인 센터에서 확인해 주세요.");
    console.log("Promotion Request Data:", formData);
  };

  return (
    <div className="apply-container animate-fade-in">
      <div className="apply-header">
        <h1 className="apply-title">
          <span className="tag">[ APPLY ]</span> 방문자 승격 신청서
        </h1>
        <div className="apply-info-banner glass">
          <p>정규직 승격을 위해 아래 항목을 작성해 주세요.</p>
        </div>
      </div>

      <GlassCard className="apply-form-card">
        <form onSubmit={handleSubmit} className="apply-form">
          <div className="form-group">
            <label>1. 방문 소감</label>
            <textarea 
              placeholder="소감을 남겨주세요."
              value={formData.thoughts}
              onChange={(e) => setFormData({...formData, thoughts: e.target.value})}
              className="glass-input"
            />
          </div>

          <div className="form-group">
            <label>2. 자기소개</label>
            <textarea 
              placeholder="투자 경험이나 경력을 적어주세요."
              value={formData.intro}
              onChange={(e) => setFormData({...formData, intro: e.target.value})}
              className="glass-input"
            />
          </div>

          <div className="form-group">
            <label>3. 포부</label>
            <textarea 
              placeholder="목표를 적어주세요."
              value={formData.goals}
              onChange={(e) => setFormData({...formData, goals: e.target.value})}
              className="glass-input"
            />
          </div>

          <button type="submit" className="submit-btn glass">
            <Send size={16} /> SEND: 승격 신청 전송
          </button>
        </form>
      </GlassCard>

      <style jsx>{`
        .apply-container {
          padding: 40px;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .apply-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: white;
          margin-bottom: 24px;
        }

        .apply-title .tag {
          color: var(--primary);
          font-family: 'Fira Code', monospace;
          margin-right: 12px;
        }

        .apply-info-banner {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 189, 46, 0.1);
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .apply-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-group label {
          font-size: 1rem;
          font-weight: 800;
          color: white;
        }

        .glass-input {
          width: 100%;
          min-height: 120px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 16px;
          color: white;
          font-size: 0.95rem;
          outline: none;
          resize: vertical;
          transition: all 0.3s;
        }

        .glass-input:focus {
          border-color: var(--primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .submit-btn {
          align-self: flex-start;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .submit-btn:hover {
          background: var(--primary);
          color: black;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px var(--primary-glow);
        }
      `}</style>
    </div>
  );
}
