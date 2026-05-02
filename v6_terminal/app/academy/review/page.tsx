"use client";
import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { Heart, Plus, AlertTriangle } from 'lucide-react';

interface LossRecord { id: number; ticker: string; loss: string; date: string; lesson: string; mistake: string; }
const STORAGE_KEY = 'dragonfly_losses';
const defaults: LossRecord[] = [
  { id: 1, ticker: "NVDA", loss: "-8.2%", date: "2026-03-10", mistake: "하락장에서 추격 매수", lesson: "IBD 시장 상태 확인 없이 진입한 것이 실수. 시장 방향이 최우선!" },
  { id: 2, ticker: "TSLA", loss: "-12.5%", date: "2026-02-28", mistake: "손절가 미설정", lesson: "진입 전 반드시 손절가를 설정하고, 7~8% 룰을 철저히 지켜야 한다." },
  { id: 3, ticker: "META", loss: "-6.8%", date: "2026-03-15", mistake: "VCP 미확인 진입", lesson: "조정폭이 줄어들지 않는 상태에서 돌파를 기대한 것이 문제. 인내심이 필요." },
];

export default function ReviewPage() {
  const [records, setRecords] = useState<LossRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ticker: '', loss: '', mistake: '', lesson: '' });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { try { const s = localStorage.getItem(STORAGE_KEY); setRecords(s ? JSON.parse(s) : defaults); } catch { setRecords(defaults); } setLoaded(true); }, []);
  useEffect(() => { if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); }, [records, loaded]);

  const handleAdd = () => {
    if (!form.ticker) return alert("티커를 입력하세요!");
    setRecords(prev => [{ id: Date.now(), ...form, date: new Date().toLocaleDateString('ko-KR') }, ...prev]);
    setForm({ ticker: '', loss: '', mistake: '', lesson: '' }); setShowForm(false);
  };

  return (
    <div className="review-container animate-fade-in">
      <div className="review-header">
        <h1 className="review-title"><Heart size={32} className="title-icon" /> [ REVIEW ] 손실 위로 및 복기방</h1>
        <p className="review-sub">실패에서 배우는 것이 진정한 성장입니다. 냉정하게 복기하고, 다음엔 더 강해지세요.</p>
      </div>
      <button className="add-btn" onClick={() => setShowForm(!showForm)}><Plus size={16} /> 손실 복기 등록</button>
      {showForm && (
        <GlassCard className="form-card">
          <div className="form-grid">
            <input placeholder="티커" className="glass-input" value={form.ticker} onChange={e => setForm({...form, ticker: e.target.value.toUpperCase()})} />
            <input placeholder="손실률 (예: -8%)" className="glass-input" value={form.loss} onChange={e => setForm({...form, loss: e.target.value})} />
          </div>
          <input placeholder="실수 요약 (한 줄)" className="glass-input" value={form.mistake} onChange={e => setForm({...form, mistake: e.target.value})} style={{marginBottom:12}} />
          <textarea placeholder="교훈 및 개선점" className="glass-input comment-input" value={form.lesson} onChange={e => setForm({...form, lesson: e.target.value})} />
          <button className="submit-btn" onClick={handleAdd}>📝 등록하기</button>
        </GlassCard>
      )}
      <div className="records-list">
        {records.map(r => (
          <GlassCard key={r.id} className="record-card">
            <div className="record-top">
              <span className="record-ticker">{r.ticker}</span>
              <span className="record-loss">{r.loss}</span>
            </div>
            <div className="record-mistake"><AlertTriangle size={14} /> {r.mistake}</div>
            <p className="record-lesson">💡 교훈: {r.lesson}</p>
            <span className="record-date">{r.date}</span>
          </GlassCard>
        ))}
      </div>
      <style jsx>{`
        .review-container { padding: 40px; display: flex; flex-direction: column; gap: 20px; }
        .review-title { font-size: 2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 12px; }
        .title-icon { color: #f43f5e; }
        .review-sub { color: var(--text-muted); font-size: 0.95rem; margin-top: 8px; }
        .add-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; background: rgba(244,63,94,0.15); color: #f43f5e; font-weight: 800; border: 1px solid rgba(244,63,94,0.3); border-radius: 8px; cursor: pointer; font-size: 0.85rem; align-self: flex-start; }
        .form-card { padding: 24px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .glass-input { width: 100%; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: 8px; padding: 10px 12px; color: white; outline: none; font-family: inherit; }
        .comment-input { min-height: 80px; resize: vertical; margin-bottom: 12px; }
        .submit-btn { padding: 10px 24px; background: #f43f5e; color: white; font-weight: 800; border: none; border-radius: 6px; cursor: pointer; }
        .records-list { display: flex; flex-direction: column; gap: 16px; }
        .record-card { padding: 24px; border: 1px solid rgba(244,63,94,0.12); }
        .record-top { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .record-ticker { font-size: 1.3rem; font-weight: 900; color: white; }
        .record-loss { font-size: 1.2rem; font-weight: 900; color: #3b82f6; }
        .record-mistake { font-size: 0.8rem; color: #f43f5e; font-weight: 700; display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
        .record-lesson { font-size: 0.88rem; color: #e2e8f0; line-height: 1.5; margin-bottom: 10px; }
        .record-date { font-size: 0.7rem; color: var(--text-muted); }
      `}</style>
    </div>
  );
}
