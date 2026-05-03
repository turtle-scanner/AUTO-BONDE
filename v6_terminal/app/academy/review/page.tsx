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
  Sparkles,
  User,
  Send
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

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
  mistake?: string;
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
    comments: [
      { id: 101, author: "hjrubbi", text: "정말 완벽한 타점이네요! 축하드립니다.", date: "2026-05-01" }
    ]
  },
];

export default function ReviewPage() {
  const [records, setRecords] = useState<TradeRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState("Guest");
  const [form, setForm] = useState({ 
    ticker: '', quantity: '', entryPrice: '', exitPrice: '', 
    buyReason: '', sellReason: '', mistake: '', comment: '' 
  });
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
    if (!form.ticker || !form.quantity || !form.entryPrice || !form.exitPrice) return alert("필수 항목을 입력하세요!");
    
    const qty = parseFloat(form.quantity);
    const entry = parseFloat(form.entryPrice);
    const exit = parseFloat(form.exitPrice);
    const yieldVal = (((exit - entry) / entry) * 100).toFixed(1);

    const newRecord: TradeRecord = {
      id: Date.now(),
      type: 'REVIEW',
      author: currentUser,
      ticker: form.ticker.toUpperCase(),
      quantity: qty,
      entryPrice: entry,
      exitPrice: exit,
      totalAmount: qty * exit,
      yield: `${yieldVal}%`,
      date: new Date().toLocaleDateString('ko-KR'),
      buyReason: form.buyReason || "전술적 진입",
      sellReason: form.sellReason || "원칙적 청산",
      comment: form.comment || "복기 완료",
      comments: [],
      mistake: form.mistake || "해당 없음"
    };

    setRecords(prev => [newRecord, ...prev]);
    setForm({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', buyReason: '', sellReason: '', mistake: '', comment: '' });
    setShowForm(false);
  };

  const addComment = (recordId: number) => {
    const text = commentInputs[recordId];
    if (!text) return;

    setRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        return {
          ...r,
          comments: [...(r.comments || []), {
            id: Date.now(),
            author: currentUser,
            text: text,
            date: new Date().toLocaleDateString('ko-KR')
          }]
        };
      }
      return r;
    }));
    setCommentInputs(prev => ({ ...prev, [recordId]: '' }));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(records.length / itemsPerPage);

  return (
    <div className="review-container animate-fade-in">
      <div className="review-header">
        <div className="header-text">
          <h1><Heart size={32} className="heart-icon" /> [ REVIEW ] 통합 전술 분석실</h1>
          <p>사령부 대원들의 실전 기록을 심층 분석하고 댓글로 전술을 토론합니다.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "닫기" : "복기 등록"}
        </button>
      </div>

      {/* 통합 게시판 (Table View) */}
      <GlassCard className="board-card">
        <div className="board-header">
          <h3><FileText size={18} className="blue" /> 통합 전황 분석 보드</h3>
        </div>
        <div className="table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>대원명</th>
                <th>날짜</th>
                <th>종목명</th>
                <th>구분</th>
                <th>수량</th>
                <th>청산가</th>
                <th>전체금액</th>
                <th>수익률</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(r => (
                <tr key={r.id} className={r.type === 'SUCCESS' ? 'row-success' : 'row-review'}>
                  <td className="bold"><User size={14} className="inline-icon" /> {r.author}</td>
                  <td>{r.date}</td>
                  <td className="bold">{r.ticker}</td>
                  <td>{r.type === 'SUCCESS' ? <Sparkles size={14} className="gold" /> : <AlertCircle size={14} />}</td>
                  <td>{r.quantity}주</td>
                  <td>${r.exitPrice.toLocaleString()}</td>
                  <td className="bold">{r.totalAmount.toLocaleString()}원</td>
                  <td className={`yield ${r.type === 'SUCCESS' ? 'plus' : 'minus'}`}>{r.yield}</td>
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
        <GlassCard className="form-card blue-border-glow">
          <div className="form-grid">
            <div className="input-group"><label>종목명</label><input value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} /></div>
            <div className="input-group"><label>수량</label><input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} /></div>
            <div className="input-group"><label>진입가</label><input type="number" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} /></div>
            <div className="input-group"><label>손절가</label><input type="number" value={form.exitPrice} onChange={e => setForm({...form, exitPrice: e.target.value})} /></div>
            <div className="input-group full-width"><label>매수 이유 (Why Buy?)</label><input placeholder="진입 근거를 입력하세요" value={form.buyReason} onChange={e => setForm({...form, buyReason: e.target.value})} /></div>
            <div className="input-group full-width"><label>매도 이유 (Why Sell?)</label><input placeholder="청산 원칙을 입력하세요" value={form.sellReason} onChange={e => setForm({...form, sellReason: e.target.value})} /></div>
            <div className="input-group full-width"><label>실수 및 교훈</label><textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} /></div>
          </div>
          <button className="submit-btn" onClick={handleAdd}>📝 분석 결과 저장</button>
        </GlassCard>
      )}

      {/* 상세 분석 및 댓글 영역 */}
      <div className="deep-review-grid">
        {currentItems.map(r => (
          <GlassCard key={r.id} className="deep-card">
            <div className="deep-header">
              <div className="user-info"><User size={18} className="gold" /> <strong>{r.author}</strong> 대원의 분석</div>
              <span className={`yield-badge ${r.type === 'SUCCESS' ? 'plus' : 'minus'}`}>{r.yield}</span>
            </div>
            
            <div className="reason-box">
              <div className="reason-item"><strong>[ BUY ]</strong> {r.buyReason}</div>
              <div className="reason-item"><strong>[ SELL ]</strong> {r.sellReason}</div>
            </div>

            <div className="comment-section">
              <div className="comment-list">
                {r.comments?.map(c => (
                  <div key={c.id} className="comment-bubble">
                    <span className="c-author">{c.author}:</span>
                    <span className="c-text">{c.text}</span>
                  </div>
                ))}
              </div>
              <div className="comment-input-area">
                <input 
                  placeholder="전술적 조언이나 격려를 남기세요..." 
                  value={commentInputs[r.id] || ''} 
                  onChange={e => setCommentInputs({...commentInputs, [r.id]: e.target.value})}
                  onKeyDown={e => e.key === 'Enter' && addComment(r.id)}
                />
                <button onClick={() => addComment(r.id)}><Send size={16} /></button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .review-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .review-header { display: flex; justify-content: space-between; align-items: center; }
        .heart-icon { color: #f43f5e; }
        .add-btn { background: rgba(244, 63, 94, 0.15); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.3); padding: 12px 24px; border-radius: 12px; font-weight: 900; cursor: pointer; }
        
        .board-card { padding: 0; overflow: hidden; }
        .board-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .trade-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .trade-table th { text-align: left; padding: 16px; color: #555; border-bottom: 2px solid #222; }
        .trade-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #cbd5e1; }
        .yield.plus { color: #ef4444 !important; font-weight: 900; }
        .yield.minus { color: #3b82f6 !important; font-weight: 900; }
        .inline-icon { margin-right: 6px; vertical-align: middle; }
        .bold { font-weight: 900; color: #f2f2f2; }

        .form-card { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .input-group label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; margin-bottom: 8px; display: block; }
        .input-group input, .input-group textarea { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 12px; color: white; }
        .full-width { grid-column: span 4; }
        .submit-btn { background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 950; cursor: pointer; }

        .deep-review-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 24px; }
        .deep-card { padding: 24px; display: flex; flex-direction: column; gap: 20px; }
        .deep-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 12px; }
        .user-info { display: flex; align-items: center; gap: 10px; font-size: 0.95rem; }
        .yield-badge { padding: 4px 12px; border-radius: 20px; font-weight: 900; font-size: 0.9rem; }
        .yield-badge.plus { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .yield-badge.minus { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }

        .reason-box { background: rgba(0,0,0,0.2); padding: 16px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; }
        .reason-item { font-size: 0.85rem; color: #cbd5e1; line-height: 1.5; }
        .reason-item strong { color: var(--primary); margin-right: 8px; }

        .comment-section { display: flex; flex-direction: column; gap: 16px; }
        .comment-list { max-height: 150px; overflow-y: auto; display: flex; flex-direction: column; gap: 8px; }
        .comment-bubble { font-size: 0.8rem; background: rgba(255,255,255,0.03); padding: 8px 12px; border-radius: 8px; }
        .c-author { font-weight: 900; color: var(--primary); margin-right: 8px; }
        .comment-input-area { display: flex; gap: 10px; }
        .comment-input-area input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; color: white; font-size: 0.8rem; }
        .comment-input-area button { background: var(--primary); color: black; border: none; width: 36px; height: 36px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        .gold { color: #d4af37; }
        .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 15px; background: rgba(255,255,255,0.02); }
        .pagination button { background: none; border: 1px solid #333; color: #94a3b8; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; }
      `}</style>
    </div>
  );
}
