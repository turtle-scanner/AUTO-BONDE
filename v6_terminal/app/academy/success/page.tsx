"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Trophy, 
  Plus, 
  TrendingUp, 
  DollarSign, 
  Hash, 
  ArrowRight, 
  Coins,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface WinRecord { 
  id: number; 
  ticker: string; 
  quantity: number;
  entryPrice: number; 
  exitPrice: number; 
  totalAmount: number;
  yield: string; 
  date: string; 
  comment: string; 
}

const STORAGE_KEY = 'dragonfly_wins_v6_refined';

const defaults: WinRecord[] = [
  { 
    id: 1, 
    ticker: "SMCI", 
    quantity: 10,
    entryPrice: 350.50, 
    exitPrice: 980.20, 
    totalAmount: 9802,
    yield: "+179.6%", 
    date: "2026-05-01", 
    comment: "AI 서버 수요 폭증에 따른 EP 발생 확인 후 진입. 10일선 지지하며 강력 홀딩!" 
  },
  { 
    id: 2, 
    ticker: "NVDA", 
    quantity: 5,
    entryPrice: 420.00, 
    exitPrice: 850.50, 
    totalAmount: 4252.5,
    yield: "+102.5%", 
    date: "2026-04-20", 
    comment: "반도체 주도주의 위엄. VCP 패턴 수축 끝단에서 거래량 실린 돌파 확인." 
  },
];

export default function SuccessPage() {
  const [records, setRecords] = useState<WinRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ 
    ticker: '', 
    quantity: '', 
    entryPrice: '', 
    exitPrice: '', 
    comment: '' 
  });
  const [loaded, setLoaded] = useState(false);

  // 실시간 계산 값
  const qty = parseFloat(form.quantity) || 0;
  const entry = parseFloat(form.entryPrice) || 0;
  const exit = parseFloat(form.exitPrice) || 0;
  const calcTotal = (qty * exit).toLocaleString();
  const calcYield = entry > 0 ? (((exit - entry) / entry) * 100).toFixed(1) : "0.0";

  useEffect(() => {
    try { 
      const s = localStorage.getItem(STORAGE_KEY); 
      setRecords(s ? JSON.parse(s) : defaults); 
    } catch { 
      setRecords(defaults); 
    }
    setLoaded(true);
  }, []);

  useEffect(() => { 
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); 
  }, [records, loaded]);

  const handleAdd = () => {
    if (!form.ticker || !form.quantity || !form.entryPrice || !form.exitPrice) {
      return alert("모든 항목을 입력해 주세요!");
    }
    
    const newRecord: WinRecord = {
      id: Date.now(),
      ticker: form.ticker.toUpperCase(),
      quantity: qty,
      entryPrice: entry,
      exitPrice: exit,
      totalAmount: qty * exit,
      yield: `+${calcYield}%`,
      date: new Date().toLocaleDateString('ko-KR'),
      comment: form.comment || "승리의 기록입니다."
    };

    setRecords(prev => [newRecord, ...prev]);
    setForm({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', comment: '' });
    setShowForm(false);
  };

  return (
    <div className="success-container animate-fade-in">
      <div className="success-header">
        <div className="header-text">
          <h1><Trophy size={32} className="gold-icon" /> [ SUCCESS ] 실전 익절 자랑방</h1>
          <p>사령부 대원들의 빛나는 전리품을 공유하고 승리의 기운을 나눕니다.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "닫기" : "익절 기록 등록"}
        </button>
      </div>

      {showForm && (
        <GlassCard className="form-card gold-border-glow">
          <div className="form-grid">
            <div className="input-group">
              <label><Sparkles size={14} className="gold" /> 주식 종목</label>
              <input placeholder="예: AAPL" value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} />
            </div>
            <div className="input-group">
              <label><Hash size={14} className="gold" /> 주식 수</label>
              <input type="number" placeholder="보유 수량" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
            </div>
            <div className="input-group">
              <label><DollarSign size={14} className="gold" /> 진입가</label>
              <input type="number" placeholder="매수 평단가" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} />
            </div>
            <div className="input-group">
              <label><TrendingUp size={14} className="gold" /> 익절가</label>
              <input type="number" placeholder="매도 확정가" value={form.exitPrice} onChange={e => setForm({...form, exitPrice: e.target.value})} />
            </div>
          </div>
          
          <div className="auto-calc-preview">
            <div className="calc-item">
              <span>예상 전체 금액:</span>
              <strong>{calcTotal}원</strong>
            </div>
            <div className="calc-item">
              <span>확정 수익률:</span>
              <strong className="yield-text">+{calcYield}%</strong>
            </div>
          </div>

          <div className="input-group full-width">
            <label><MessageSquare size={14} className="gold" /> 전술 복기 및 코멘트</label>
            <textarea placeholder="진입 근거와 전술적 판단을 기록하세요." value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
          </div>

          <button className="submit-btn" onClick={handleAdd}>🏆 승전보 등록하기</button>
        </GlassCard>
      )}

      <div className="records-grid">
        {records.map(r => (
          <GlassCard key={r.id} className="record-card">
            <div className="record-header">
              <div className="ticker-badge">{r.ticker}</div>
              <div className="yield-badge">{r.yield}</div>
            </div>
            
            <div className="price-info">
              <div className="price-item">
                <span className="label">ENTRY</span>
                <span className="price">${r.entryPrice.toLocaleString()}</span>
              </div>
              <ArrowRight size={16} className="arrow" />
              <div className="price-item">
                <span className="label">EXIT</span>
                <span className="price">${r.exitPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="total-box">
              <Coins size={16} className="gold" />
              <span>전체 금액: <strong>{r.totalAmount.toLocaleString()}원</strong></span>
              <span className="qty-tag">({r.quantity}주)</span>
            </div>

            <p className="comment-text">{r.comment}</p>
            
            <div className="record-footer">
              <span className="date">{r.date}</span>
              <span className="status">VERIFIED</span>
            </div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .success-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        
        .success-header { display: flex; justify-content: space-between; align-items: center; }
        .header-text h1 { font-size: 1.8rem; font-weight: 950; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .header-text p { color: #94a3b8; font-weight: 600; font-size: 0.95rem; }
        .gold-icon { color: #d4af37; }

        .add-btn { background: #d4af37; color: black; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .add-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3); }

        /* Form Style */
        .form-card { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .gold-border-glow { border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: 0 0 30px rgba(212, 175, 55, 0.1); }
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
        .input-group input, .input-group textarea { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; color: white; outline: none; transition: border-color 0.3s; }
        .input-group input:focus, .input-group textarea:focus { border-color: #d4af37; }
        .input-group textarea { height: 100px; resize: none; }
        .full-width { grid-column: span 4; }

        .auto-calc-preview { display: flex; gap: 40px; background: rgba(0, 255, 136, 0.03); padding: 16px 24px; border-radius: 12px; border: 1px dashed rgba(0, 255, 136, 0.2); }
        .calc-item { display: flex; flex-direction: column; gap: 4px; }
        .calc-item span { font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
        .calc-item strong { font-size: 1.1rem; font-weight: 900; color: #f2f2f2; }
        .yield-text { color: #4ade80 !important; }

        .submit-btn { background: #d4af37; color: black; border: none; padding: 14px; border-radius: 12px; font-weight: 950; font-size: 1rem; cursor: pointer; transition: all 0.3s; }
        .submit-btn:hover { background: #e5c05b; }

        /* Records Style */
        .records-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
        .record-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; border: 1px solid rgba(255,255,255,0.05); }
        .record-card:hover { border-color: rgba(212, 175, 55, 0.2); transform: translateY(-5px); }
        
        .record-header { display: flex; justify-content: space-between; align-items: center; }
        .ticker-badge { font-size: 1.4rem; font-weight: 950; color: #f2f2f2; }
        .yield-badge { padding: 4px 12px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-radius: 8px; font-weight: 900; font-size: 1rem; }

        .price-info { display: flex; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.02); padding: 12px; border-radius: 12px; }
        .price-item { display: flex; flex-direction: column; gap: 2px; }
        .price-item .label { font-size: 0.6rem; font-weight: 800; color: #64748b; }
        .price-item .price { font-size: 0.95rem; font-weight: 800; color: #cbd5e1; }
        .arrow { color: #475569; }

        .total-box { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; font-weight: 700; color: #cbd5e1; }
        .total-box strong { color: #f2f2f2; font-size: 1.1rem; }
        .qty-tag { font-size: 0.75rem; color: #64748b; }

        .comment-text { font-size: 0.88rem; color: #94a3b8; line-height: 1.6; font-weight: 500; margin: 0; min-height: 48px; border-left: 2px solid rgba(255,255,255,0.05); padding-left: 12px; }

        .record-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
        .date { font-size: 0.7rem; font-weight: 800; color: #475569; }
        .status { font-size: 0.65rem; font-weight: 900; color: #4ade80; background: rgba(74, 222, 128, 0.1); padding: 2px 8px; border-radius: 4px; }

        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
