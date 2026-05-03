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
  Sparkles,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface TradeRecord { 
  id: number; 
  type: 'SUCCESS' | 'REVIEW';
  ticker: string; 
  quantity: number;
  entryPrice: number; 
  exitPrice: number; 
  totalAmount: number;
  yield: string; 
  date: string; 
  comment: string; 
}

// 5-e와 5-f가 공유하는 통합 데이터 키
const SHARED_STORAGE_KEY = 'dragonfly_unified_trades_v6';

const defaults: TradeRecord[] = [
  { 
    id: 1, 
    type: 'SUCCESS',
    ticker: "SMCI", 
    quantity: 10,
    entryPrice: 350.50, 
    exitPrice: 980.20, 
    totalAmount: 9802,
    yield: "+179.6%", 
    date: "2026-05-01", 
    comment: "AI 서버 수요 폭증에 따른 EP 발생 확인 후 진입. 강력 홀딩!" 
  },
];

export default function SuccessPage() {
  const [records, setRecords] = useState<TradeRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', comment: '' });
  const [loaded, setLoaded] = useState(false);

  const itemsPerPage = 5;

  // 실시간 계산 값
  const qty = parseFloat(form.quantity) || 0;
  const entry = parseFloat(form.entryPrice) || 0;
  const exit = parseFloat(form.exitPrice) || 0;
  const calcTotal = (qty * exit).toLocaleString();
  const calcYield = entry > 0 ? (((exit - entry) / entry) * 100).toFixed(1) : "0.0";

  useEffect(() => {
    try { 
      const s = localStorage.getItem(SHARED_STORAGE_KEY); 
      setRecords(s ? JSON.parse(s) : defaults); 
    } catch { 
      setRecords(defaults); 
    }
    setLoaded(true);
  }, []);

  useEffect(() => { 
    if (loaded) localStorage.setItem(SHARED_STORAGE_KEY, JSON.stringify(records)); 
  }, [records, loaded]);

  const handleAdd = () => {
    if (!form.ticker || !form.quantity || !form.entryPrice || !form.exitPrice) {
      return alert("모든 항목을 입력해 주세요!");
    }
    
    const newRecord: TradeRecord = {
      id: Date.now(),
      type: 'SUCCESS',
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

  // Pagination
  const successOnly = records.filter(r => r.type === 'SUCCESS');
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = successOnly.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(successOnly.length / itemsPerPage);

  return (
    <div className="success-container animate-fade-in">
      <div className="success-header">
        <div className="header-text">
          <h1><Trophy size={32} className="gold-icon" /> [ SUCCESS ] 실전 익절 자랑방</h1>
          <p>사령관님의 요청대로 익절 기록이 통합 전술 보드에 실시간 반영됩니다.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "닫기" : "익절 기록 등록"}
        </button>
      </div>

      {/* 상단 게시판 (Table View) - 5-f와 동일 규격 */}
      <GlassCard className="board-card">
        <div className="board-header">
          <h3><FileText size={18} className="gold" /> 익절 전리품 보드 (Page {currentPage})</h3>
        </div>
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>종목명</th>
                <th>수량</th>
                <th>진입가</th>
                <th>익절가</th>
                <th>전체금액</th>
                <th>수익률</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(r => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td className="bold">{r.ticker}</td>
                  <td>{r.quantity}주</td>
                  <td>${r.entryPrice.toLocaleString()}</td>
                  <td>${r.exitPrice.toLocaleString()}</td>
                  <td className="bold">{r.totalAmount.toLocaleString()}원</td>
                  <td className="success-yield">{r.yield}</td>
                </tr>
              ))}
              {currentItems.length === 0 && <tr><td colSpan={7} className="empty">기록이 없습니다.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><ChevronLeft size={16} /></button>
          <span>{currentPage} / {totalPages || 1}</span>
          <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)}><ChevronRight size={16} /></button>
        </div>
      </GlassCard>

      {showForm && (
        <GlassCard className="form-card gold-border-glow">
          <div className="form-grid">
            <div className="input-group">
              <label><Sparkles size={14} className="gold" /> 주식 종목</label>
              <input placeholder="예: AAPL" value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} />
            </div>
            <div className="input-group">
              <label><Hash size={14} className="gold" /> 주식 수</label>
              <input type="number" placeholder="수량" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
            </div>
            <div className="input-group">
              <label><DollarSign size={14} className="gold" /> 진입가</label>
              <input type="number" placeholder="진입가" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} />
            </div>
            <div className="input-group">
              <label><TrendingUp size={14} className="gold" /> 익절가</label>
              <input type="number" placeholder="익절가" value={form.exitPrice} onChange={e => setForm({...form, exitPrice: e.target.value})} />
            </div>
          </div>
          <div className="auto-calc-preview">
            <div className="calc-item"><span>전체 금액:</span><strong>{calcTotal}원</strong></div>
            <div className="calc-item"><span>수익률:</span><strong className="success-yield">+{calcYield}%</strong></div>
          </div>
          <div className="input-group full-width">
            <label><MessageSquare size={14} className="gold" /> 승리 코멘트</label>
            <textarea placeholder="전술적 성공 요인을 기록하세요." value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
          </div>
          <button className="submit-btn" onClick={handleAdd}>🏆 승전보 등록</button>
        </GlassCard>
      )}

      <div className="records-grid">
        {currentItems.map(r => (
          <GlassCard key={r.id} className="record-card">
            <div className="record-header"><div className="ticker-badge">{r.ticker}</div><div className="yield-badge">{r.yield}</div></div>
            <div className="price-info">
              <div className="price-item"><span className="label">ENTRY</span><span className="price">${r.entryPrice.toLocaleString()}</span></div>
              <ArrowRight size={16} className="arrow" /><div className="price-item"><span className="label">EXIT</span><span className="price">${r.exitPrice.toLocaleString()}</span></div>
            </div>
            <div className="total-box"><Coins size={16} className="gold" /><span>전체 금액: <strong>{r.totalAmount.toLocaleString()}원</strong></span></div>
            <p className="comment-text">{r.comment}</p>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .success-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .success-header { display: flex; justify-content: space-between; align-items: center; }
        .header-text h1 { font-size: 1.8rem; font-weight: 950; display: flex; align-items: center; gap: 12px; }
        .gold-icon { color: #d4af37; }
        .add-btn { background: #d4af37; color: black; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        
        .board-card { padding: 0; overflow: hidden; }
        .board-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .board-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin: 0; }
        .trade-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .trade-table th { text-align: left; padding: 16px; color: #555; border-bottom: 2px solid #222; }
        .trade-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #cbd5e1; }
        .trade-table .bold { color: #f2f2f2; font-weight: 900; }
        .success-yield { color: #ef4444 !important; font-weight: 900; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 15px; background: rgba(255,255,255,0.02); }
        .pagination button { background: none; border: 1px solid #333; color: #94a3b8; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; }
        
        .form-card { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .gold-border-glow { border: 1px solid rgba(212, 175, 55, 0.3); }
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group input, .input-group textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; color: white; }
        .full-width { grid-column: span 4; }
        .auto-calc-preview { display: flex; gap: 40px; background: rgba(0, 255, 136, 0.03); padding: 16px; border-radius: 12px; }
        .submit-btn { background: #d4af37; color: black; border: none; padding: 14px; border-radius: 12px; font-weight: 950; }

        .records-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 24px; }
        .record-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .ticker-badge { font-size: 1.4rem; font-weight: 950; }
        .yield-badge { padding: 4px 12px; background: rgba(239, 68, 68, 0.1); color: #ef4444; border-radius: 8px; font-weight: 900; }
        .price-info { display: flex; align-items: center; gap: 16px; background: rgba(255, 255, 255, 0.02); padding: 12px; border-radius: 12px; }
        .total-box { font-size: 0.9rem; color: #cbd5e1; display: flex; align-items: center; gap: 8px; }
        .comment-text { font-size: 0.88rem; color: #94a3b8; line-height: 1.6; }
        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
