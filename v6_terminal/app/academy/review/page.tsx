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
  ChevronRight
} from 'lucide-react';

interface LossRecord { 
  id: number; 
  ticker: string; 
  quantity: number;
  entryPrice: number; 
  exitPrice: number; 
  totalAmount: number;
  yield: string; 
  date: string; 
  mistake: string;
  lesson: string; 
}

const STORAGE_KEY = 'dragonfly_losses_v6_refined';

const defaults: LossRecord[] = [
  { 
    id: 1, 
    ticker: "TSLA", 
    quantity: 20,
    entryPrice: 210.50, 
    exitPrice: 195.20, 
    totalAmount: 3904,
    yield: "-7.3%", 
    date: "2026-04-28", 
    mistake: "손절 원칙 미준수 및 희망 회로",
    lesson: "10일선 이탈 시 기계적으로 손절했어야 함. 감정을 배제한 매매 필요." 
  },
  { 
    id: 2, 
    ticker: "META", 
    quantity: 15,
    entryPrice: 480.00, 
    exitPrice: 445.00, 
    totalAmount: 6675,
    yield: "-7.3%", 
    date: "2026-04-15", 
    mistake: "뇌동 매수 및 지수 하락 무시",
    lesson: "지수(IBD 상태)가 하락장일 때는 아무리 좋은 종목도 쉬어가는 것이 정답." 
  },
];

export default function ReviewPage() {
  const [records, setRecords] = useState<LossRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState({ 
    ticker: '', 
    quantity: '', 
    entryPrice: '', 
    exitPrice: '', 
    mistake: '',
    lesson: '' 
  });
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
      return alert("모든 필수 항목을 입력해 주세요!");
    }
    
    const newRecord: LossRecord = {
      id: Date.now(),
      ticker: form.ticker.toUpperCase(),
      quantity: qty,
      entryPrice: entry,
      exitPrice: exit,
      totalAmount: qty * exit,
      yield: `${calcYield}%`,
      date: new Date().toLocaleDateString('ko-KR'),
      mistake: form.mistake || "원칙 미준수",
      lesson: form.lesson || "학습 및 복기 예정"
    };

    setRecords(prev => [newRecord, ...prev]);
    setForm({ ticker: '', quantity: '', entryPrice: '', exitPrice: '', mistake: '', lesson: '' });
    setShowForm(false);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(records.length / itemsPerPage);

  return (
    <div className="review-container animate-fade-in">
      <div className="review-header">
        <div className="header-text">
          <h1><Heart size={32} className="heart-icon" /> [ REVIEW ] 손실 위로 및 복기방</h1>
          <p>뼈아픈 손실은 위대한 성장의 거름입니다. 냉정하게 기록하고 더 강해져서 돌아오십시오.</p>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> {showForm ? "닫기" : "손실 복기 등록"}
        </button>
      </div>

      {/* 상단 게시판 (Table View) */}
      <GlassCard className="board-card">
        <div className="board-header">
          <h3><FileText size={18} className="blue" /> 복기 전술 보드 (Page {currentPage})</h3>
        </div>
        <div className="table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>종목명</th>
                <th>수량</th>
                <th>진입가</th>
                <th>손절가</th>
                <th>전체금액</th>
                <th>손실률</th>
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
                  <td className="loss-yield">{r.yield}</td>
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
            <div className="input-group">
              <label><Hash size={14} className="blue" /> 주식 종목</label>
              <input placeholder="예: TSLA" value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value})} />
            </div>
            <div className="input-group">
              <label><Hash size={14} className="blue" /> 주식 수</label>
              <input type="number" placeholder="보유 수량" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} />
            </div>
            <div className="input-group">
              <label><DollarSign size={14} className="blue" /> 진입가</label>
              <input type="number" placeholder="매수 평단가" value={form.entryPrice} onChange={e => setForm({...form, entryPrice: e.target.value})} />
            </div>
            <div className="input-group">
              <label><TrendingDown size={14} className="blue" /> 손절가</label>
              <input type="number" placeholder="매도 확정가" value={form.exitPrice} onChange={e => setForm({...form, exitPrice: e.target.value})} />
            </div>
          </div>
          
          <div className="auto-calc-preview">
            <div className="calc-item">
              <span>예상 전체 금액:</span>
              <strong>{calcTotal}원</strong>
            </div>
            <div className="calc-item">
              <span>손실률:</span>
              <strong className="loss-text">{calcYield}%</strong>
            </div>
          </div>

          <div className="input-group full-width">
            <label><AlertCircle size={14} className="blue" /> 패배 원인 및 실수 분석</label>
            <input placeholder="무엇이 잘못되었나요? (예: 원칙 미준수, 뇌동매매 등)" value={form.mistake} onChange={e => setForm({...form, mistake: e.target.value})} />
          </div>

          <div className="input-group full-width">
            <label><MessageSquare size={14} className="blue" /> 차후 개선 전략 및 교훈</label>
            <textarea placeholder="다음엔 어떻게 대응하시겠습니까?" value={form.lesson} onChange={e => setForm({...form, lesson: e.target.value})} />
          </div>

          <button className="submit-btn" onClick={handleAdd}>📝 복기 기록 저장</button>
        </GlassCard>
      )}

      {/* 하단 상세 분석 카드 (Optional: detailed cards for deep review) */}
      <div className="deep-review-grid">
        {currentItems.map(r => (
          <GlassCard key={r.id} className="deep-card">
            <div className="deep-header">
              <span className="ticker">{r.ticker}</span>
              <span className="loss-badge">{r.yield}</span>
            </div>
            <div className="deep-mistake">
              <strong>Mistake:</strong> {r.mistake}
            </div>
            <div className="deep-lesson">
              <strong>Lesson:</strong> {r.lesson}
            </div>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .review-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        
        .review-header { display: flex; justify-content: space-between; align-items: center; }
        .header-text h1 { font-size: 1.8rem; font-weight: 950; display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .header-text p { color: #94a3b8; font-weight: 600; font-size: 0.95rem; }
        .heart-icon { color: #f43f5e; }

        .add-btn { background: rgba(244, 63, 94, 0.15); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.3); padding: 12px 24px; border-radius: 12px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.3s; }
        .add-btn:hover { background: rgba(244, 63, 94, 0.25); }

        /* Board Card Style */
        .board-card { padding: 0; overflow: hidden; }
        .board-header { padding: 20px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .board-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin: 0; }
        .table-wrapper { width: 100%; overflow-x: auto; }
        .review-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .review-table th { text-align: left; padding: 16px; color: #555; font-weight: 900; border-bottom: 2px solid #222; text-transform: uppercase; }
        .review-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); color: #cbd5e1; font-weight: 600; }
        .review-table .bold { color: #f2f2f2; font-weight: 900; }
        .loss-yield { color: #3b82f6 !important; font-weight: 900; }

        .pagination { display: flex; align-items: center; justify-content: center; gap: 20px; padding: 15px; background: rgba(255,255,255,0.02); }
        .pagination button { background: none; border: 1px solid #333; color: #94a3b8; width: 32px; height: 32px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .pagination button:disabled { opacity: 0.3; cursor: not-allowed; }
        .pagination span { font-size: 0.8rem; font-weight: 800; color: #64748b; }

        /* Form Style */
        .form-card { padding: 32px; display: flex; flex-direction: column; gap: 24px; }
        .blue-border-glow { border: 1px solid rgba(59, 130, 246, 0.3); box-shadow: 0 0 30px rgba(59, 130, 246, 0.1); }
        .form-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 0.75rem; font-weight: 800; color: #94a3b8; display: flex; align-items: center; gap: 6px; }
        .input-group input, .input-group textarea { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 12px; color: white; outline: none; transition: border-color 0.3s; }
        .input-group input:focus, .input-group textarea:focus { border-color: #3b82f6; }
        .input-group textarea { height: 100px; resize: none; }
        .full-width { grid-column: span 4; }

        .auto-calc-preview { display: flex; gap: 40px; background: rgba(59, 130, 246, 0.03); padding: 16px 24px; border-radius: 12px; border: 1px dashed rgba(59, 130, 246, 0.2); }
        .calc-item { display: flex; flex-direction: column; gap: 4px; }
        .calc-item span { font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
        .calc-item strong { font-size: 1.1rem; font-weight: 900; color: #f2f2f2; }
        .loss-text { color: #3b82f6 !important; }

        .submit-btn { background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 12px; font-weight: 950; font-size: 1rem; cursor: pointer; transition: all 0.3s; }
        .submit-btn:hover { background: #2563eb; }

        /* Deep Review Grid */
        .deep-review-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; }
        .deep-card { padding: 20px; display: flex; flex-direction: column; gap: 12px; border: 1px solid rgba(255,255,255,0.03); }
        .deep-header { display: flex; justify-content: space-between; align-items: center; }
        .deep-header .ticker { font-size: 1.1rem; font-weight: 900; }
        .deep-header .loss-badge { color: #3b82f6; font-weight: 900; }
        .deep-mistake, .deep-lesson { font-size: 0.85rem; color: #94a3b8; line-height: 1.6; }
        .deep-mistake strong, .deep-lesson strong { color: #cbd5e1; }

        .blue { color: #3b82f6; }
      `}</style>
    </div>
  );
}
