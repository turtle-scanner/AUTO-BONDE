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
  // ?ç¸•ï¿½??¿ë…¿?????ï¿½ë?åª›ì•²????ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼??(1,000?²ãƒ«??¿½ëµ????ï¿½êºï¿½ì???)
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
        <h1><FileText size={32} className="icon" /> [ REPORT ] ???ç­Œï¿½?????æ¿šë°¸Å¦ï¿½êºŠ???/h1>
        <p className="subtitle">1,000?²ãƒ«??¿½ëµ?????ç¸•ï¿½??¿ë…¿?????äº?‚†?“å ‰ï¿?ï¿½ï¿½?????‰ï¿½???ç­Œë??£æ´ï¿?????ç­Œìšï¿½ãƒ??ï¿½ï¿½ï¿½å«„ï¿?????æºë†ë²??ï¿½êºï¿½ì??ï¿½ë¼º??¿½???ï¿½êµï¿½ë²??</p>
      </div>

      {/* Summary Row */}
      <div className="summary-grid">
        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">?ï¿½ë„­?¨ï½‹ì³?????????/span>
            <TrendingUp size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">{reportData.currentAsset.toLocaleString()}??/span>
            <span className="sub-val gold">0.00%</span>
          </div>
        </GlassCard>

        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">?ï¿½ë„­?¨Îºë°???ï¿½ë›¾ï¿½ë£†ï§?¿½??/span>
            <Target size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">{reportData.winRate}%</span>
            <span className="sub-val">0?²ê¾§?—ï¿½ë«?????ï¿½ï¿½ï¿½ì”™??/span>
          </div>
        </GlassCard>

        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">????????ï¿½ï¿½ï¿??/span>
            <Activity size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">0:0</span>
            <span className="sub-val">?²ãƒ«?£ï¿½?³ç­Œï¿??æ¿šï¿½?..</span>
          </div>
        </GlassCard>

        <GlassCard className="summary-card">
          <div className="card-top">
            <span className="label">?²ãƒ«?”ï¿½ê± ç’ï¿? ????¨ã…½ë£?(MDD)</span>
            <ShieldCheck size={20} className="gold" />
          </div>
          <div className="val-box">
            <span className="val">{reportData.mdd}%</span>
            <span className="sub-val">???æºë†???/span>
          </div>
        </GlassCard>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Performance Chart Placeholder */}
        <GlassCard className="chart-card">
          <div className="card-header">
            <h3><TrendingUp size={18} className="gold" /> ??????æ¿šë°¸Å¦ï¿½êºŠ????è²«çŒ·ï¿??(Equity Curve)</h3>
          </div>
          <div className="chart-placeholder">
            <div className="empty-msg">
              <Zap size={48} className="muted-gold" />
              <p>5??4????ç¹¹ë¨®?ï¿½ê¼????ï¿½ë¼”????ï¿½ì”ˆ?·ë‰“ì§??? ??å½±ï¿½ï¿½ì”­ï¿½ë§½ ??ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼???²ãƒ«?£ï¿½?³ç­Œï¿??¥â™‚?±ì?? ??ç­Œë??£æ´ï¿??ç­Œë¤¾?“ï¿½???</p>
            </div>
          </div>
        </GlassCard>

        {/* Tactical Feedback */}
        <GlassCard className="feedback-card">
          <div className="card-header">
            <h3><PieChart size={18} className="gold" /> ?ï¿½ë„­?¨ï½‹ì³???ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½?????¨ì€«ë®›???/h3>
          </div>
          <div className="feedback-body">
            <div className="ai-message glass">
              <p>?ï¿½ë„­?¨ï½‹ì³?????ç­Œìšï¿½ãƒ??ï¿½ï¿½ï¿½å«„ï¿?????‰ë¨¯??¿½ë¹?? <strong>'????READY)'</strong> ??ï¿½ë?åª›ì•²????ï¿½êµï¿½ë²?? ??¨ëš®?–ç­Œï¿????ï¿½ë„­?¨ï½‹ì³???????ï¿½ï¿½ï¿??‘ï¿½????ç­Œë??£æ²…ï¿??4% ?ï¿½êº‚ï¿½ï¿½ï¿½ï¿½ç­Œë²?—ç”±ê³„ëˆ§ï¿½ë‰ï¿½ë»¿?? EP(??èª˜â‘¦ï¿½ï¿½????????ï¿½ï¿½?¥ï¿½ï¿½è«­ï¿? ??ï¿½êºï¿½ê¼¤????ï¿½ì”ˆ?·ë†ƒ?????å¯ƒë—ï¿?????¨ï¿½????ï¿½ëœ„ï¿½ë ¡.</p>
            </div>
            <div className="stats-list">
              <div className="stat-row">
                <span>??????????ï¿½êµ??¿½</span>
                <strong>0??/strong>
              </div>
              <div className="stat-row">
                <span>??????????ï¿½êµ??¿½</span>
                <strong>0??/strong>
              </div>
              <div className="stat-row">
                <span>???????¨ëš®???? ?ï¿½êºï¿½ì??ï¿½ï¿½?±ï¿½?/span>
                <strong>0??/strong>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Trade Log Table */}
      <GlassCard className="log-card">
        <div className="card-header">
          <h3><FileText size={18} className="gold" /> ?²ãƒ«?”ï¿½ê± ç’ï¿?????ç­Œìšï¿½ãƒ??ï¿½ï¿½ï¿½å«„ï¿????ï¿½ï¿½ï¿½ì”™???ï¿½êºï¿½ì??ï¿½ë¼º??¿½?/h3>
        </div>
        <div className="table-wrapper">
          <table className="log-table">
            <thead>
              <tr>
                <th>?²ãƒ«??¿½ëµ????ç¹¹ë¨®êµï§‘ï¿?/th>
                <th>??ï¿½êºï¿½ê¼¤??ï¿½ë²Š?°ï¿½?/th>
                <th>??ï¿½ìŠ¢ï§ï¿½??/th>
                <th>?²ãƒ«?£ï¿½????ç­Œï¿½?</th>
                <th>?²ï¿½??…ï¿½ï¿½êµï¿½ì ¿ç­Œï¿½?</th>
                <th>??ï¿½ëª´?¨ë£¸???/th>
                <th>??ï¿½ë?åª›ì•²??/th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="empty-td">??ç­Œï¿½?ï§‘ï¿½????ï¿½ï¿½ï¿½ì”™???ï¿½êºï¿½ì??ï¿½ë¼º??¿½????ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡.</td>
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
