"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Heart, 
  Plus, 
  TrendingDown, 
  DollarSign, 
  Hash, 
  ArrowRight, 
  AlertCircle,
  MessageSquare,
  FileText,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sparkles
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
  mistake?: string; // REVIEW 전용
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
    comment: "승리의 기록입니다." 
  },
  { 
    id: 2, 
    type: 'REVIEW',
    ticker: "TSLA", 
    quantity: 20,
    entryPrice: 210.50, 
    exitPrice: 195.20, 
    totalAmount: 3904,
    yield: "-7.3%", 
    date: "2026-04-28", 
    comment: "감정을 배제한 매매 필요.",
    mistake: "손절 원칙 미준수"
  },
];

export default function ReviewPage() {
  const [records, setRecords] = useState<TradeRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', mistake: '', comment: '' });
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
      return alert("모든 필수 항목을 입력해 주세요!");
    }
    
    const newRecord: TradeRecord = {
      id: Date.now(),
      type: 'REVIEW',
      ticker: form.ticker.toUpperCase(),
      quantity: qty,
      entryPrice: entry,
      exitPrice: exit,
      totalAmount: qty * exit,
      yield: `${calcYield}%`,
      date: new Date().toLocaleDateString('ko-KR'),
      comment: form.comment || "복기 기록입니다.",
      mistake: form.mistake || "원칙 미준수"
    };

    setRecords(prev => [newRecord, ...prev]);
    setForm({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', mistake: '', comment: '' });
    setShowForm(false);
  };

  // Pagination - 5-e(SUCCESS)와 5-f(REVIEW) 모두 포함하여 상단 보드에 표시
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(records.length / itemsPerPage);

  return (
    <div className="review-container animate-fade-in">
      <div className="review-header">
        <div className="header-text">
          <h1><Heart size={32} className="heart-icon" /> [ REVIEW ] 통합 전술 분석실</h1>
          <p>사령관님의 지시대로 5-e(익절)와 5-f(손실) 기록이 통합 게시판에 실시간 집계됩니다.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "닫기" : "손실 복기 등록"}
        </button>
      </div>

      {/* 상단 통합 게시판 (Success + Review) */}
      <GlassCard className="board-card">
        <div className="board-header">
          <h3><FileText size={18} className="blue" /> 통합 전황 분석 보드 (Page {currentPage})</h3>
        </div>
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>날짜</th>
                <th>종목명</th>
                <th>수량</th>
                <th>진입가</th>
                <th>청산가</th>
                <th>전체금액</th>
                <th>수익률</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(r => (
                <tr key={r.id} className={r.type === 'SUCCESS' ? 'row-success' : 'row-review'}>
                  <td className="type-tag">{r.type === 'SUCCESS' ? <Sparkles size={14} className="gold" /> : <AlertCircle size={14} />}</td>
                  <td>{r.date}</td>
                  <td className="bold">{r.ticker}</td>
                  <td>{r.quantity}주</td>
                  <td>${r.entryPrice.toLocaleString()}</td>
                  <td>${r.exitPrice.toLocaleString()}</td>
                  <td className="bold">{r.totalAmount.toLocaleString()}원</td>
                  <td className={`yield ${r.type === 'SUCCESS' ? 'plus' : 'minus'}`}>{r.yield}</td>
                </tr>
              ))}
              {currentItems.length === 0 && <tr><td colSpan={8} className="empty">분석할 데이터가 없습니다.</td></tr>}
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
        <GlassCard className="form-card blue-border-glow">
          <div className="form-grid">
            <div className="input-group">
              <label><Hash size={14} className="blue" /> 주식 종목</label>
              <input placeholder="예: TSLA" value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} />
            </div>
            <div className="input-group">
              <label><Hash size={14} className="blue" /> 주식 수</label>
              <input type="number" placeholder="수량" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
            </div>
            <div className="input-group">
              <label><DollarSign size={14} className="blue" /> 진입가</label>
              <input type="number" placeholder="진입가" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} />
            </div>
            <div className="input-group">
              <label><TrendingDown size={14} className="blue" /> 손절가</label>
              <input type="number" placeholder="손절가" value={form.exitPrice} onChange={e => setForm({...form, exitPrice: e.target.value})} />
            </div>
          </div>
          <div className="auto-calc-preview">
            <div className="calc-item"><span>예상 회수 금액:</span><strong>{calcTotal}원</strong></div>
            <div className="calc-item"><span>손실률:</span><strong className="loss-text">{calcYield}%</strong></div>
          </div>
          <div className="input-group full-width">
            <label><AlertCircle size={14} className="blue" /> 실수 분석</label>
            <input placeholder="실수 원인을 간단히 기록하세요." value={form.mistake} onChange={e => setForm({...form, mistake: e.target.value})} />
          </div>
          <div className="input-group full-width">
            <label><MessageSquare size={14} className="blue" /> 복기 및 교훈</label>
            <textarea placeholder="다음 전술을 기록하세요." value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
          </div>
          <button className="submit-btn" onClick={handleAdd}>📝 복기 기록 저장</button>
        </GlassCard>
      )}

      <div className="deep-review-grid">
        {currentItems.filter(r => r.type === 'REVIEW').map(r => (
          <GlassCard key={r.id} className="deep-card">
            <div className="deep-header"><span className="ticker">{r.ticker}</span><span className="loss-badge">{r.yield}</span></div>
            <div className="deep-mistake"><strong>Mistake:</strong> {r.mistake}</div>
            <div className="deep-lesson"><strong>Lesson:</strong> {r.comment}</div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .review-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .review-header { display: flex; justify-content: space-between; align-items: center; }
        .header-text h1 { font-size: 1.8rem; font-weight: 950; display: flex; align-items: center; gap: 12px; }
        .heart-icon { color: #f43f5e; }
        .add-btn { background: rgba(244, 63, 94, 0.15); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.3); padding: 12px 24px; border-radius: 12px; font-weight: 900; }
        
        .board-card { padding: 0; overflow: hidden; }
        .board-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .board-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin: 0; }
        .trade-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .trade-table th { text-align: left; padding: 16px; color: #555; border-bottom: 2px solid #222; }
        .trade-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #cbd5e1; }
        .row-success { background: rgba(212, 175, 55, 0.02); }
        .yield.plus { color: #ef4444 !important; font-weight: 900; }
        .yield.minus { color: #3b82f6 !important; font-weight: 900; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 15px; background: rgba(255,255,255,0.02); }
        .pagination button { background: none; border: 1px solid #333; color: #94a3b8; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; }
        
        .form-card { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .blue-border-glow { border: 1px solid rgba(59, 130, 246, 0.3); }
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .input-group input, .input-group textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; color: white; }
        .full-width { grid-column: span 4; }
        .auto-calc-preview { display: flex; gap: 40px; background: rgba(59, 130, 246, 0.03); padding: 16px; border-radius: 12px; }
        .submit-btn { background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 950; }

        .deep-review-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
        .deep-card { padding: 20px; display: flex; flex-direction: column; gap: 12px; }
        .loss-badge { color: #3b82f6; font-weight: 900; }
        .blue { color: #3b82f6; }
        .gold { color: #d4af37; }
      `}</style>
    </div>
  );
}
