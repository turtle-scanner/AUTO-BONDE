"use client";
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { Trophy, Plus, TrendingUp, DollarSign } from 'lucide-react';

interface WinRecord { id: number; ticker: string; buyPrice: string; sellPrice: string; profit: string; date: string; comment: string; }
const STORAGE_KEY = 'dragonfly_wins';
const defaults: WinRecord[] = [
  { id: 1, ticker: "INTC", buyPrice: "42.50", sellPrice: "99.62", profit: "+134.4%", date: "2026-04-15", comment: "반도체 슈퍼사이클. VCP 패턴 돌파 후 진입. 50일선 지지 확인 후 홀딩!" },
  { id: 2, ticker: "CIEN", buyPrice: "180.00", sellPrice: "535.29", profit: "+197.4%", date: "2026-03-20", comment: "텔레콤 장비 RS 1위. T구간 돌파 시 거래량 300% 폭증. 미친 수익률!" },
  { id: 3, ticker: "MU", buyPrice: "220.00", sellPrice: "542.21", profit: "+146.5%", date: "2026-04-01", comment: "메모리 반도체 강세. 피벗 돌파 후 21일선 이탈 없이 꾸준히 상승." },
];

export default function SuccessPage() {
  const [records, setRecords] = useState<WinRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ticker: '', buyPrice: '', sellPrice: '', profit: '', comment: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); setRecords(s ? JSON.parse(s) : defaults); } catch { setRecords(defaults); }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }, [records, loaded]);

  const handleAdd = () => {
    if (!form.ticker) return alert("티커를 입력하세요!");
    setRecords(prev => [{ id: Date.now(), ...form, date: new Date().toLocaleDateString('ko-KR') }, ...prev]);
    setForm({ ticker: '', buyPrice: '', sellPrice: '', profit: '', comment: '' });
    setShowForm(false);
  };

  return (
    <div className="success-container animate-fade-in">
      <div className="success-header">
        <h1 className="success-title"><Trophy size={32} className="title-icon" /> [ SUCCESS ] 실전 익절 자랑방 🎉</h1>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}><Plus size={16} /> 익절 기록 등록</button>
      </div>

      {showForm && (
        <GlassCard className="form-card">
          <div className="form-grid">
            <input placeholder="티커 (예: AAPL)" className="glass-input" value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value.toUpperCase()})} />
            <input placeholder="매수가" className="glass-input" value={form.buyPrice} onChange={e => setForm({...form, buyPrice: e.target.value})} />
            <input placeholder="매도가" className="glass-input" value={form.sellPrice} onChange={e => setForm({...form, sellPrice: e.target.value})} />
            <input placeholder="수익률 (예: +25%)" className="glass-input" value={form.profit} onChange={e => setForm({...form, profit: e.target.value})} />
          </div>
          <textarea placeholder="전술 복기 코멘트" className="glass-input comment-input" value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} />
          <button className="submit-btn" onClick={handleAdd}>🏆 등록하기</button>
        </GlassCard>
      )}

      <div className="records-grid">
        {records.map(r => (
          <GlassCard key={r.id} className="record-card">
            <div className="record-top">
              <span className="record-ticker">{r.ticker}</span>
              <span className="record-profit">{r.profit}</span>
            </div>
            <div className="record-prices">
              <span>매수 ${r.buyPrice}</span><span>→</span><span>매도 ${r.sellPrice}</span>
            </div>
            <p className="record-comment">{r.comment}</p>
            <span className="record-date">{r.date}</span>
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .success-container { padding: 40px; display: flex; flex-direction: column; gap: 24px; }
        .success-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .success-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .title-icon { color: #fbbf24; }
        .add-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: #fbbf24; color: #1a1a2e; font-weight: 800; border: none; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
        .form-card { padding: 24px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .glass-input { width: 100%; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: 8px; padding: 10px 12px; color: white; outline: none; font-family: inherit; }
        .glass-input:focus { border-color: #fbbf24; }
        .comment-input { min-height: 80px; resize: vertical; margin-bottom: 12px; }
        .submit-btn { padding: 10px 24px; background: #fbbf24; color: #1a1a2e; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; }
        .records-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
        .record-card { padding: 24px; border: 1px solid rgba(251,191,36,0.15); background: rgba(251,191,36,0.02); }
        .record-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .record-ticker { font-size: 1.5rem; font-weight: 900; color: white; }
        .record-profit { font-size: 1.3rem; font-weight: 900; color: #ef4444; }
        .record-prices { display: flex; gap: 8px; font-size: 0.85rem; color: var(--text-muted); font-weight: 700; margin-bottom: 12px; }
        .record-comment { font-size: 0.88rem; color: #e2e8f0; line-height: 1.5; font-weight: 500; margin-bottom: 12px; }
        .record-date { font-size: 0.7rem; color: var(--text-muted); font-weight: 700; }
      `}</style>
    </div>
  );
}
