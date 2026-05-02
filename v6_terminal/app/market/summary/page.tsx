"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { FileText, Plus, ChevronDown, Edit3, Trash2, User } from 'lucide-react';

export default function MarketSummaryPage() {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "투자 용어사전",
      date: "2026-05-02 12:16",
      author: "cntfed",
      content: `지연 반응 (Delayed Reaction): 강력한 실적이나 뉴스(EP)로 주가가 급등한 직후, 바로 추격 매수하지 않고 주가가 옆으로 기며 변동성이 잦아들 때까지 기다리는 구간입니다.\nS&P 500: 미국 증시를 대표하는 500개 대형 기업의 주가를 지수로 나타낸 것으로, 시장 전체의 건강 상태를 파악하는 핵심 척도입니다.\n확정된 상승세 (Confirmed Uptrend): IBD(Investors.com)의 진단 기준에 따라 주요 지수가 중요한 기술적 지지선 위에서 견고하게 상승하고 있는 안전한 시장 상태를 의미합니다.\nRS 지수 (Relative Strength): 시장의 다른 종목들보다 얼마나 더 강하게 움직이는지 나타내는 상대 강도 지표로, 보통 70~90 이상의 주도주를 선별할 때 사용합니다.\n피벗구간 (Pivot Point/EP): 주가가 에너지를 응축하다가 강력한 촉매제(EP)를 만나 돌파하기 직전의 변동성 축소 구간, 즉 대가들이 노리는 매수 급소입니다.`
    }
  ]);

  const handlePublish = () => {
    if (!newTitle || !newContent) {
      alert("제목과 내용을 모두 입력해 주십시오, 사령관님.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newTitle,
      date: new Date().toLocaleString(),
      author: "cntfed",
      content: newContent
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setIsWriteOpen(false);
    alert("전술 보고서가 성공적으로 게시되었습니다.");
  };

  const handleDelete = (id: number) => {
    if (confirm("이 전술 보고서를 말소하시겠습니까?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="summary-container animate-fade-in">
      <div className="summary-header">
        <h1 className="summary-title">
          <span className="tag">[ SUMMARY ]</span> 전체 시장 요약 (Command Post)
        </h1>
      </div>

      {isAdmin && (
        <div className="admin-write-section">
          <button 
            className="write-toggle-btn glass"
            onClick={() => setIsWriteOpen(!isWriteOpen)}
          >
            <ChevronDown size={16} className={isWriteOpen ? "rotate" : ""} />
            <FileText size={16} /> [ ADMIN ] 시장 요약 신규 작성
          </button>
          
          {isWriteOpen && (
            <GlassCard className="write-form-card animate-slide-down">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="제목을 입력하세요" 
                  className="glass-input title-input"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea 
                  placeholder="전술적 분석 내용을 입력하세요" 
                  className="glass-input content-input" 
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>
              <button className="submit-btn glass" onClick={handlePublish}>전술 보고서 게시</button>
            </GlassCard>
          )}
        </div>
      )}

      <div className="pagination-bar glass">
        <span className="label">Summary Page</span>
        <div className="page-selector">
          <button className="page-btn">1</button>
          <div className="page-controls">
            <button className="ctrl-btn">-</button>
            <button className="ctrl-btn">+</button>
          </div>
        </div>
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <GlassCard key={post.id} className="post-card">
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <span className="post-date">{post.date}</span>
            </div>
            <div className="post-body">
              {post.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <div className="post-footer">
              <span className="author-sig">Commander: {post.author}</span>
            </div>
            {isAdmin && (
              <div className="post-actions">
                <button className="action-btn edit">수정</button>
                <button className="action-btn delete" onClick={() => handleDelete(post.id)}>삭제</button>
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .summary-container {
          padding: 40px;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .summary-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: white;
        }

        .summary-title .tag { color: var(--primary); margin-right: 12px; }

        .admin-write-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .write-toggle-btn {
          width: 100%;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          cursor: pointer;
        }

        .write-form-card { margin-top: 8px; padding: 24px; }

        .glass-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          padding: 12px;
          color: white;
          outline: none;
          margin-bottom: 12px;
        }

        .content-input { min-height: 200px; resize: vertical; }

        .submit-btn {
          padding: 10px 24px;
          background: var(--primary);
          color: black;
          font-weight: 800;
          border-radius: 6px;
          cursor: pointer;
        }

        .pagination-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          padding: 12px;
          border-radius: 8px;
          background: rgba(0, 0, 0, 0.2);
        }

        .pagination-bar .label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }

        .page-selector {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #1e293b;
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid var(--card-border);
        }

        .page-btn { background: transparent; border: none; color: white; font-weight: 800; font-size: 0.9rem; }
        .page-controls { display: flex; gap: 8px; }
        .ctrl-btn { background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.1rem; }

        .post-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .post-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          position: relative;
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .post-title {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fbbf24; /* Tactical Yellow */
          letter-spacing: -0.01em;
        }

        .post-date {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-family: 'Fira Code', monospace;
        }

        .post-body {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #e2e8f0;
          margin-bottom: 40px;
          white-space: pre-wrap;
        }

        .post-body p { margin-bottom: 12px; }

        .post-footer {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
        }

        .author-sig {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
        }

        .post-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .action-btn {
          padding: 6px 16px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit { background: rgba(255, 255, 255, 0.05); border: 1px solid #ff0055; color: #ff0055; }
        .delete { background: rgba(255, 0, 85, 0.1); border: 1px solid #ff0055; color: #ff0055; }

        .action-btn:hover { background: #ff0055; color: white; }

        .rotate { transform: rotate(180deg); }
      `}</style>
    </div>
  );
}
