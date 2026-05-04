"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Award, CheckCircle, HelpCircle } from 'lucide-react';

export default function ExamPage() {
  return (
    <div className="exam-container animate-fade-in">
      <div className="header-section">
        <h2 className="gradient-text">Elite Trader Certification</h2>
        <p>사령부 요원으로 승급하기 위한 테스트를 진행하십시오.</p>
      </div>

      <div className="exam-grid">
        <GlassCard title="Current Status" className="status-card">
          <div className="progress-container">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <span className="progress-text">Level 1: Novice (65%)</span>
          </div>
          <div className="stats-list">
            <div className="stat-item">
              <CheckCircle size={16} className="status-up" />
              <span>기초 기술적 분석 이수</span>
            </div>
            <div className="stat-item">
              <CheckCircle size={16} className="status-up" />
              <span>자금 관리 원칙 확인</span>
            </div>
            <div className="stat-item">
              <HelpCircle size={16} className="icon-muted" />
              <span>VCP 패턴 실전 판독 (진행 중)</span>
            </div>
          </div>
        </GlassCard>

        <div className="main-exam-area glass">
          <div className="question-header">
            <span className="q-number">Question 12 of 20</span>
            <Award className="icon-muted" />
          </div>
          <div className="question-content">
            <h3>다음 중 Mark Minervini의 'Stage 2' 상승 국면 조건으로 틀린 것은?</h3>
            <div className="options-list">
              <div className="option glass-hover">A. 주가가 150일 및 200일 이동평균선 위에 있어야 한다.</div>
              <div className="option glass-hover">B. 200일 이동평균선은 최소 1개월 이상 상향 추세여야 한다.</div>
              <div className="option glass-hover">C. 주가는 52주 신저가 대비 최소 25% 이상 위에 있어야 한다.</div>
              <div className="option glass-hover selected">D. 50일 이동평균선은 항상 150일 이동평균선 아래에 위치해야 한다.</div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn-prev glass">이전</button>
            <button className="btn-next">다음 단계로</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .exam-container {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-section h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .header-section p {
          color: var(--text-muted);
        }

        .exam-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
        }

        .progress-container {
          margin: 16px 0;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          box-shadow: 0 0 10px var(--primary-glow);
        }

        .progress-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .stats-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
        }

        .main-exam-area {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 16px;
        }

        .q-number {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
        }

        .question-content h3 {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .option {
          padding: 16px 20px;
          border: 1px solid var(--card-border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .option:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .option.selected {
          border-color: var(--primary);
          background: rgba(0, 242, 255, 0.05);
          box-shadow: 0 0 15px rgba(0, 242, 255, 0.1);
        }

        .action-buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 32px;
        }

        .btn-prev {
          padding: 10px 24px;
          border-radius: 8px;
          border: 1px solid var(--card-border);
          background: transparent;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-next {
          padding: 10px 32px;
          border-radius: 8px;
          background: var(--primary);
          color: black;
          border: none;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 0 15px var(--primary-glow);
        }
      `}</style>
    </div>
  );
}
