"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  FileText, 
  TrendingUp, 
  PieChart, 
  Target, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function ReportPage() {
  // 초기화 상태 데이터 (1,000만원 기준)
  const reportData = {
    initialAsset: 10000000,
    currentAsset: 10000000,
    totalProfit: 0,
    totalYield: 0.00,
    winRate: 0,
    trades: [] as any[],
    avgProfit: 0,
    avgLoss: 0,
    mdd: 0.00
  };

  return (
    <div className="report-container animate-fade-in">
      <div className="section-header">
        <h1><FileText size={32} className="icon" /> [ REPORT ] 자동투자 성적표</h1>
        <p className="subtitle">1,000만원의 초기 자본금으로 시작된 자동매매 실전 기록입니다.</p>
      </div>

      {/* Summary Row */}
      <div className="summary-grid">
        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">현재 총 자산</span>
            <TrendingUp size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">{reportData.currentAsset.toLocaleString()}원</span>
            <span className="sub-val gold">0.00%</span>
          </div>
        </GlassCard>

        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">전투 승률</span>
            <Target size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">{reportData.winRate}%</span>
            <span className="sub-val">0건의 교전</span>
          </div>
        </GlassCard>

        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">평균 손익비</span>
            <Activity size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">0:0</span>
            <span className="sub-val">집계 중...</span>
          </div>
        </GlassCard>

        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">최대 낙폭 (MDD)</span>
            <ShieldCheck size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">{reportData.mdd}%</span>
            <span className="sub-val">안정적</span>
          </div>
        </GlassCard>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Performance Chart Placeholder */}
        <GlassCard className="chart-card">
          <div className="card-header">
            <h3><TrendingUp size={18} className="gold" /> 자산 성장 곡선 (Equity Curve)</h3>
          </div>
          <div className="chart-placeholder">
            <div className="empty-msg">
              <Zap size={48} className="muted-gold" />
              <p>5월 4일 라이브 작전 개시와 함께 데이터 집계가 시작됩니다.</p>
            </div>
          </div>
        </GlassCard>

        {/* Tactical Feedback */}
        <GlassCard className="feedback-card">
          <div className="card-header">
            <h3><PieChart size={18} className="gold" /> 전술 분석 브리핑</h3>
          </div>
          <div className="feedback-body">
            <div className="ai-message glass">
              <p>현재 자동매매 엔진은 <strong>'대기(READY)'</strong> 상태입니다. 본데식 전술 알고리즘이 시장의 4% 급등주와 EP(에피소딕 피벗) 종목을 감시하고 있습니다.</p>
            </div>
            <div className="stats-list">
              <div className="stat-row">
                <span>총 익절 횟수</span>
                <strong>0회</strong>
              </div>
              <div className="stat-row">
                <span>총 손절 횟수</span>
                <strong>0회</strong>
              </div>
              <div className="stat-row">
                <span>평균 보유 기간</span>
                <strong>0일</strong>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Trade Log Table */}
      <GlassCard className="log-card">
        <div className="card-header">
          <h3><FileText size={18} className="gold" /> 최근 자동매매 교전 기록</h3>
        </div>
        <div className="table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th>매매일시</th>
                <th>종목명</th>
                <th>구분</th>
                <th>진입가</th>
                <th>청산가</th>
                <th>수익률</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="empty-td">표시할 교전 기록이 없습니다.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>

      <style jsx>{`
        .report-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        
        .section-header h1 { font-size: 1.8rem; font-weight: 950; display: flex; align-items: center; gap: 12px; }
        .icon { color: var(--primary); }
        .subtitle { color: #94a3b8; font-weight: 600; margin-top: 8px; }

        .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
        .summary-card { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
        .card-top { display: flex; justify-content: space-between; align-items: center; }
        .label { font-size: 0.8rem; font-weight: 800; color: #94a3b8; }
        .val-box { display: flex; flex-direction: column; gap: 4px; }
        .val { font-size: 1.5rem; font-weight: 900; color: #f2f2f2; }
        .sub-val { font-size: 0.75rem; font-weight: 700; color: #64748b; }

        .content-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
        .card-header { border-bottom: 1px solid rgba(255,255,255,0.05); padding: 20px; }
        .card-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin: 0; }
        
        .chart-card { min-height: 400px; display: flex; flex-direction: column; }
        .chart-placeholder { flex: 1; display: flex; align-items: center; justify-content: center; }
        .empty-msg { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; opacity: 0.5; }
        .empty-msg p { font-size: 0.9rem; font-weight: 700; color: #94a3b8; max-width: 250px; }
        .muted-gold { color: rgba(212, 175, 55, 0.3); }

        .feedback-body { padding: 20px; display: flex; flex-direction: column; gap: 24px; }
        .ai-message { padding: 16px; border-radius: 12px; font-size: 0.85rem; line-height: 1.6; color: #cbd5e1; border-left: 3px solid var(--primary); }
        .stats-list { display: flex; flex-direction: column; gap: 12px; }
        .stat-row { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #94a3b8; }
        .stat-row strong { color: #f2f2f2; }

        .log-card { padding: 0; }
        .table-wrapper { padding: 20px; overflow-x: auto; }
        .log-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .log-table th { text-align: left; padding: 12px; color: #555; font-weight: 900; border-bottom: 2px solid #222; text-transform: uppercase; }
        .log-table td { padding: 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #cbd5e1; font-weight: 600; }
        .empty-td { text-align: center; padding: 60px !important; color: #555; font-weight: 800; font-style: italic; }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
