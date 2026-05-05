"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import {
  BookOpen,
  Image as ImageIcon,
  ChevronRight,
  PlusCircle,
  Monitor,
  Layout,
  Type,
  Maximize2,
  LineChart,
  Smartphone,
  BellRing,
  ShieldAlert,
  Zap as ZapIcon,
  RefreshCw,
  X
} from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  category: string;
  content: string;
  image?: string;
}

interface LeadingChart {
  ticker: string;
  url: string;
  desc: string;
}

export default function AcademyStudyPage() {
  const [lectures, setLectures] = useState<Lesson[]>([]);
  const [leadingCharts, setLeadingCharts] = useState<LeadingChart[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // New Lecture Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/v6-api/academy-study');
      const data = await res.json();
      setLectures(data.lectures);
      setLeadingCharts(data.leadingCharts);
    } catch (err) {
      console.error("Study data fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLecture = async () => {
    if (!newTitle || !newContent) return;
    
    const newLec = {
      title: newTitle,
      category: newCat || "GENERAL",
      content: newContent,
      image: "https://images.unsplash.com/photo-1611974715853-2b8ef9a3d136?auto=format&fit=crop&q=80&w=800"
    };

    try {
      const res = await fetch('/v6-api/academy-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLec)
      });
      if (res.ok) {
        fetchData();
        setIsModalOpen(false);
        setNewTitle('');
        setNewCat('');
        setNewContent('');
      }
    } catch (err) {
      console.error("Add lecture failed", err);
    }
  };

  const selectedLesson = lectures.find(l => l.id === selectedId) || lectures[0];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as any).TradingView) {
        new (window as any).TradingView.widget({
          "autosize": true,
          "symbol": "NASDAQ:NVDA",
          "interval": "D",
          "timezone": "Asia/Seoul",
          "theme": "dark",
          "style": "1",
          "locale": "ko",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "container_id": "study_tv_widget"
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div className="study-room-container animate-fade-in">
      {/* Header Area */}
      <div className="study-header-box">
        <div className="header-left">
          <div className="icon-bg"><BookOpen size={24} /></div>
          <div>
            <h1 className="main-title">5-b. [ STUDY ] ?ï¿½êµï¿½ë’©???ç¶?—ˆï¿?ï¿½ë‡?¡ï¿½???/h1>
            <p className="sub-title">???æºë‚‡ê¼??ï¦«ëš®?ï¿½ë«??????ï¿½ê¶¢ï¿½ì ¿??????²ê¾§?—ï¿½ë«?????æºë‚ƒ???ï¿½ë„­?¨ï½‹ì³????²ãƒ«?ªï¿½ë§?ï¿½ë›¾??ç­Œëš¯?œï¿½ï¿½ï¿½??ç­Œë??—ï¿½??</p>
          </div>
        </div>
        <button className="upload-btn" onClick={() => setIsModalOpen(true)}>
          <PlusCircle size={18} /> ???ï¿½ì”ˆ?·ë…»ë¦???ï¿½ï¿½?¤ë² ?‰ï¿½?
        </button>
      </div>

      <div className="study-layout">
        {/* Left: Navigation List */}
        <div className="lesson-nav">
          {lectures.map(lesson => (
            <div
              key={lesson.id}
              className={`nav-item ${selectedId === lesson.id ? 'active' : ''}`}
              onClick={() => setSelectedId(lesson.id)}
            >
              <div className="nav-cat">{lesson.category}</div>
              <div className="nav-title">{lesson.title}</div>
              <ChevronRight size={16} className="nav-arrow" />
            </div>
          ))}
        </div>

        {/* Right: Content Viewer */}
        <div className="content-viewer">
          {selectedLesson ? (
            <div className="content-card">
              <div className="viewer-header">
                <div className="category-tag">{selectedLesson.category}</div>
                <h2 className="viewer-title">{selectedLesson.title}</h2>
              </div>

              <div className="viewer-body">
                <div className="text-section">
                  <div className="section-label"><Type size={14} /> ??ï¿½ï¿½ï¿½ì”™????ï¿½ï¿½?¤ì±¶è£•ï¿½</div>
                  <p className="lesson-text">{selectedLesson.content}</p>
                </div>

                <div className="practice-section">
                  <div className="section-label">
                    <div className="label-left"><LineChart size={14} /> ???æºë†ë²???ï¿½ë¼”?”ç­Œï¿???ï¿½ë«ï¿½ï¿½ï¿½êº‚? (TradingView Live)</div>
                    <span className="premium-label">PREMIUM UX</span>
                  </div>
                  <div className="tv-widget-box glass">
                    <div id="study_tv_widget" style={{ height: '450px' }}></div>
                  </div>
                </div>

                {/* Leading Charts Gallery */}
                <div className="charts-gallery-section">
                  <div className="section-label">
                    <div className="label-left"><ZapIcon size={14} className="gold" /> ?ï¿½ë„­?¨ï½‹ì³????ç­Œë??£æ²…ï¿??ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»??²ãƒ«?“å ‰ê³ë•Ÿ??10??/div>
                  </div>
                  <div className="charts-grid">
                    {leadingCharts.map((chart, i) => (
                      <div key={i} className="chart-item glass">
                        <img src={chart.url} alt={chart.ticker} className="chart-thumb" />
                        <div className="chart-overlay">
                          <span className="c-ticker">{chart.ticker}</span>
                          <p className="c-desc">{chart.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="loading-state">
              <RefreshCw className="animate-spin" />
              <p>?ï¿½ì”ˆ?·ë…»ë¦??è«›ë©¥ê±??ï¿½ë‡¡ï¿½ì”­ï¿½ë§„????ï¿½ë‚ï§¥ï¿½ æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº????ï¿½ëœ„ï¿½ë ¡...</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Lecture Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass animate-scale-in">
            <div className="modal-header">
              <h3>???ï¿½ë§©????ï¿½ë„­?¨ï½‹ì³???ï¿½ì”ˆ?·ë…»ë¦???ï¿½ï¿½?¤ë² ?‰ï¿½?</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <div className="modal-body">
              <div className="input-group">
                <label>?ï¿½ì”ˆ?·ë…»ë¦????ç­Œë¨¯ë£„è‚„ï¿?/label>
                <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="?? ????¡ï¿½??ï¦«ëš®?ï¿½?ï¿½ë¤???ï¿½ï¿½?¤ë²¡ï¿½êºŠ???ï¦«ëš®Ä²ï¿½ê±?? />
              </div>
              <div className="input-group">
                <label>??¨ë©¸???æ²ƒì„…?™ï¿½ï¿??œï§Ÿï¿??/label>
                <input type="text" value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="?? PATTERN" />
              </div>
              <div className="input-group">
                <label>?ï¿½ì”ˆ?·ë…»ë¦????ï¿½ï¿½?¤ì±¶è£•ï¿½</label>
                <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="??ï¿½ë?ï¿½ëŠ¾????²ãƒ«??¿½ëµ????ï¿½ë„­?¨ï½‹ì³?????ï¿½ë?ï§?¿½??«ë‰???ï¿½ë•¾???"></textarea>
              </div>
              <button className="submit-btn" onClick={handleAddLecture}>?ï¿½ì”ˆ?·ë…»ë¦?????æ¿šì™¿ëª¾ï¿½?€?ï¿½ëˆ§?/button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .study-room-container { padding: 30px; display: flex; flex-direction: column; gap: 24px; color: #d1d1d1; }
        .study-header-box { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2d2d2d; padding-bottom: 24px; }
        .header-left { display: flex; gap: 20px; align-items: center; }
        .icon-bg { width: 56px; height: 56px; background: #2d2d2d; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #a3a3a3; }
        .main-title { font-size: 1.8rem; font-weight: 900; color: #f2f2f2; margin: 0; }
        .sub-title { font-size: 0.95rem; color: #737373; margin-top: 4px; }
        .upload-btn { background: var(--primary); border: none; color: black; padding: 10px 20px; border-radius: 8px; display: flex; align-items: center; gap: 10px; font-weight: 900; cursor: pointer; transition: all 0.2s; }
        .upload-btn:hover { transform: scale(1.05); }

        .study-layout { display: grid; grid-template-columns: 320px 1fr; gap: 32px; min-height: 800px; }
        .lesson-nav { display: flex; flex-direction: column; gap: 12px; }
        .nav-item { padding: 20px; background: #242424; border: 1px solid #2d2d2d; border-radius: 12px; cursor: pointer; transition: all 0.3s; position: relative; }
        .nav-item:hover { background: #2d2d2d; transform: translateX(5px); }
        .nav-item.active { background: #2d2d2d; border-color: var(--primary); }
        .nav-cat { font-size: 0.7rem; font-weight: 900; color: #737373; margin-bottom: 6px; }
        .nav-title { font-size: 0.95rem; font-weight: 700; color: #d1d1d1; line-height: 1.4; }
        .nav-arrow { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #404040; }

        .content-viewer { background: #242424; border: 1px solid #2d2d2d; border-radius: 16px; overflow-y: auto; }
        .viewer-header { padding: 32px 40px; background: #2a2a2a; border-bottom: 1px solid #333; }
        .category-tag { font-size: 0.75rem; font-weight: 900; color: #a3a3a3; background: #333; padding: 4px 12px; border-radius: 4px; display: inline-block; margin-bottom: 12px; }
        .viewer-title { font-size: 1.8rem; font-weight: 900; color: #f2f2f2; margin: 0; }

        .viewer-body { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .section-label { font-size: 0.8rem; font-weight: 900; color: #737373; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; justify-content: space-between; }
        .lesson-text { font-size: 1.1rem; line-height: 1.8; color: #b0b0b0; background: #1f1f1f; padding: 24px; border-radius: 12px; border-left: 4px solid var(--primary); }

        .tv-widget-box { border-radius: 12px; overflow: hidden; border: 1px solid #333; }
        .premium-label { font-size: 0.65rem; font-weight: 900; color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 8px; border-radius: 4px; }

        .charts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
        .chart-item { position: relative; border-radius: 12px; overflow: hidden; height: 120px; }
        .chart-thumb { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); transition: transform 0.3s; }
        .chart-item:hover .chart-thumb { transform: scale(1.1); filter: brightness(1); }
        .chart-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); }
        .c-ticker { font-size: 0.9rem; font-weight: 900; color: var(--primary); }
        .c-desc { font-size: 0.65rem; color: #cbd5e1; margin-top: 2px; }

        /* Modal */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { width: 500px; padding: 32px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .modal-header h3 { font-size: 1.2rem; font-weight: 900; }
        .close-btn { background: none; border: none; color: #64748b; cursor: pointer; }

        .input-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .input-group label { font-size: 0.8rem; font-weight: 800; color: #64748b; }
        .input-group input, .input-group textarea { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; color: white; outline: none; }
        .input-group textarea { height: 150px; resize: none; }
        .submit-btn { width: 100%; padding: 14px; background: var(--primary); color: black; border: none; border-radius: 8px; font-weight: 900; cursor: pointer; margin-top: 10px; }

        .gold { color: #f59e0b; }
        .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px; gap: 20px; }
      `}</style>
    </div>
  );
}
