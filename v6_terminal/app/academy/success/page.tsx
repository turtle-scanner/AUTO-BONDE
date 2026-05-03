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
  ChevronRight,
  User,
  Send
} from 'lucide-react';

interface Comment { id: number; author: string; text: string; date: string; }

interface TradeRecord { 
  id: number; 
  type: 'SUCCESS' | 'REVIEW';
  author: string;
  ticker: string; 
  quantity: number;
  entryPrice: number; 
  exitPrice: number; 
  totalAmount: number;
  yield: string; 
  date: string; 
  buyReason: string;
  sellReason: string;
  comment: string;
  comments: Comment[];
}

const SHARED_STORAGE_KEY = 'dragonfly_unified_trades_v6_social';

const defaults: TradeRecord[] = [
  { 
    id: 1, 
    type: 'SUCCESS',
    author: "cntfed",
    ticker: "SMCI", 
    quantity: 10,
    entryPrice: 350.50, 
    exitPrice: 980.20, 
    totalAmount: 9802,
    yield: "+179.6%", 
    date: "2026-05-01", 
    buyReason: "실적 가속화 및 EP 발생 확인",
    sellReason: "목표가 도달 및 분할 익절",
    comment: "승리의 기록입니다.",
    comments: []
  },
];

export default function SuccessPage() {
  const [records, setRecords] = useState<TradeRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState("Guest");
  const [form, setForm] = useState({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', buyReason: '', sellReason: '', comment: '' });
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [loaded, setLoaded] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    const user = sessionStorage.getItem("dragonfly_user") || "Guest";
    setCurrentUser(user);
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
    if (!form.ticker || !form.quantity || !form.entryPrice || !form.exitPrice) return alert("필수 항목 입력!");
    
    const qty = parseFloat(form.quantity);
    const entry = parseFloat(form.entryPrice);
    const exit = parseFloat(form.exitPrice);
    const yieldVal = (((exit - entry) / entry) * 100).toFixed(1);

    const newRecord: TradeRecord = {
      id: Date.now(),
      type: 'SUCCESS',
      author: currentUser,
      ticker: form.ticker.toUpperCase(),
      quantity: qty,
      entryPrice: entry,
      exitPrice: exit,
      totalAmount: qty * exit,
      yield: `+${yieldVal}%`,
      date: new Date().toLocaleDateString('ko-KR'),
      buyReason: form.buyReason || "전술적 승리",
      sellReason: form.sellReason || "익절 원칙 준수",
      comment: form.comment || "승전보 등록",
      comments: []
    };

    setRecords(prev => [newRecord, ...prev]);
    setForm({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', buyReason: '', sellReason: '', comment: '' });
    setShowForm(false);
  };

  const addComment = (recordId: number) => {
    const text = commentInputs[recordId];
    if (!text) return;
    setRecords(prev => prev.map(r => r.id === recordId ? { ...r, comments: [...(r.comments || []), { id: Date.now(), author: currentUser, text: text, date: new Date().toLocaleDateString('ko-KR') }] } : r));
    setCommentInputs(prev => ({ ...prev, [recordId]: '' }));
  };

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
          <p>대원들의 회원명이 명시되며, '매수/매도 이유'에 대한 심층 토론이 가능합니다.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "닫기" : "익절 기록 등록"}
        </button>
      </div>

      {/* 상단 게시판 (Table View) */}
      <GlassCard className="board-card">
        <div className="board-header"><h3><FileText size={18} className="gold" /> 대원별 전리품 현황</h3></div>
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr><th>대원명</th><th>날짜</th><th>종목명</th><th>수량</th><th>진입가</th><th>익절가</th><th>수익률</th></tr>
            </thead>
            <tbody>
              {currentItems.map(r => (
                <tr key={r.id}>
                  <td className="bold"><User size={14} className="inline-icon" /> {r.author}</td>
                  <td>{r.date}</td>
                  <td className="bold">{r.ticker}</td>
                  <td>{r.quantity}주</td>
                  <td>${r.entryPrice.toLocaleString()}</td>
                  <td>${r.exitPrice.toLocaleString()}</td>
                  <td className="success-yield">{r.yield}</td>
                </tr>
              ))}
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
            <div className="input-group"><label>종목명</label><input value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} /></div>
            <div className="input-group"><label>수량</label><input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} /></div>
            <div className="input-group"><label>진입가</label><input type="number" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} /></div>
            <div className="input-group"><label>익절가</label><input type="number" value={form.exitPrice} onChange={e => setForm({...form, exitPrice: e.target.value})} /></div>
            <div className="input-group full-width"><label>매수 근거 (Strategy)</label><input placeholder="VCP, EP 등 진입 근거" value={form.buyReason} onChange={e => setForm({...form, buyReason: e.target.value})} /></div>
            <div className="input-group full-width"><label>매도 근거 (Exit Rule)</label><input placeholder="익절 원칙" value={form.sellReason} onChange={e => setForm({...form, sellReason: e.target.value})} /></div>
          </div>
          <button className="submit-btn" onClick={handleAdd}>🏆 승전보 등록</button>
        </GlassCard>
      )}

      <div className="records-grid">
        {currentItems.map(r => (
          <GlassCard key={r.id} className="record-card">
            <div className="deep-header">
              <div className="user-info"><User size={18} className="gold" /> <strong>{r.author}</strong> 대원의 전리품</div>
              <span className="yield-badge plus">{r.yield}</span>
            </div>
            <div className="reason-box">
              <div className="reason-item"><strong>[ BUY ]</strong> {r.buyReason}</div>
              <div className="reason-item"><strong>[ SELL ]</strong> {r.sellReason}</div>
            </div>
            <div className="comment-section">
              <div className="comment-list">{r.comments?.map(c => (<div key={c.id} className="comment-bubble"><span className="c-author">{c.author}:</span><span>{c.text}</span></div>))}</div>
              <div className="comment-input-area">
                <input placeholder="댓글 남기기..." value={commentInputs[r.id] || ''} onChange={e => setCommentInputs({...commentInputs, [r.id]: e.target.value})} onKeyDown={e => e.key === 'Enter' && addComment(r.id)} />
                <button onClick={() => addComment(r.id)}><Send size={16} /></button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .success-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .success-header { display: flex; justify-content: space-between; align-items: center; }
        .gold-icon { color: #d4af37; }
        .add-btn { background: #d4af37; color: black; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 900; cursor: pointer; }
        
        .board-card { padding: 0; overflow: hidden; }
        .board-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .trade-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .trade-table th { text-align: left; padding: 16px; color: #555; border-bottom: 2px solid #222; }
        .trade-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #cbd5e1; }
        .success-yield { color: #ef4444 !important; font-weight: 900; }
        .inline-icon { margin-right: 6px; }
        .bold { font-weight: 900; color: #f2f2f2; }

        .form-card { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .input-group label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; margin-bottom: 8px; display: block; }
        .input-group input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; color: white; }
        .full-width { grid-column: span 4; }
        .submit-btn { background: #d4af37; color: black; border: none; padding: 14px; border-radius: 12px; font-weight: 950; cursor: pointer; }

        .records-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 24px; }
        .record-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .deep-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
        .user-info { display: flex; align-items: center; gap: 10px; font-size: 0.95rem; }
        .yield-badge { padding: 4px 12px; border-radius: 20px; font-weight: 900; }
        .yield-badge.plus { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .reason-box { background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; }
        .reason-item { font-size: 0.85rem; color: #cbd5e1; }
        .reason-item strong { color: #d4af37; margin-right: 8px; }

        .comment-section { display: flex; flex-direction: column; gap: 16px; }
        .comment-list { max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
        .comment-bubble { font-size: 0.8rem; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; }
        .c-author { font-weight: 900; color: #d4af37; margin-right: 8px; }
        .comment-input-area { display: flex; gap: 10px; }
        .comment-input-area input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; color: white; }
        .comment-input-area button { background: #d4af37; color: black; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .gold { color: #d4af37; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 15px; background: rgba(255,255,255,0.02); }
        .pagination button { background: none; border: 1px solid #333; color: #94a3b8; width: 32px; height: 32px; border-radius: 8px; }
      `}</style>
    </div>
  );
}
