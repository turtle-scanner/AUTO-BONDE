"use client";

import React, { useState } from 'react';
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
  Zap as ZapIcon
} from 'lucide-react';
import { useEffect } from 'react';

interface Lesson {
  id: number;
  title: string;
  category: string;
  content: string;
  image?: string;
}

const studyData: Lesson[] = [
  {
    id: 1,
    category: "VCP TACTICS",
    title: "변동성 수축 패턴(VCP)의 이해",
    content: "VCP 패턴의 핵심은 공급 물량이 소화되는 과정입니다. 주가가 상승 후 조정받을 때, 그 조정의 폭과 기간이 점점 짧아지는 것은 매도세가 소멸되고 있다는 강력한 증거입니다. 마지막 'T(Tight)' 구간에서 거래량이 마르는 것을 확인하고 돌파 시 진입하는 것이 정석입니다.",
    image: "https://images.unsplash.com/photo-1611974715853-2b8ef9a3d136?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    category: "INDICATOR",
    title: "상대강도(RS) 지수의 활용",
    content: "RS 지수는 시장 지수(S&P 500 등) 대비 해당 종목이 얼마나 강한지를 나타냅니다. 시장이 하락할 때 덜 하락하거나 횡보하는 종목, 시장이 반등할 때 가장 먼저 튀어나가는 종목이 진정한 주도주입니다. RS 90 이상의 종목을 우선순위에 두십시오.",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800"
  }
];

export default function EyeComfortStudyPage() {
  const [selectedId, setSelectedId] = useState<number>(1);
  const selectedLesson = studyData.find(l => l.id === selectedId) || studyData[0];

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
            <h1 className="main-title">5-b. [ STUDY ] 주식공부방</h1>
            <p className="sub-title">눈이 편안한 환경에서 거장들의 전술을 체득하십시오.</p>
          </div>
        </div>
        <button className="upload-btn">
          <PlusCircle size={18} /> 사진 올리기
        </button>
      </div>

      <div className="study-layout">
        {/* Left: Navigation List */}
        <div className="lesson-nav">
          {studyData.map(lesson => (
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
          <div className="nav-item add-new">
            <PlusCircle size={20} /> 새 강의 추가하기
          </div>
        </div>

        {/* Right: Content Viewer */}
        <div className="content-viewer">
          <div className="content-card">
            {/* Title Section */}
            <div className="viewer-header">
              <div className="category-tag">{selectedLesson.category}</div>
              <h2 className="viewer-title">{selectedLesson.title}</h2>
            </div>

            {/* Content Section */}
            <div className="viewer-body">
              <div className="text-section">
                <div className="section-label"><Type size={14} /> 교육 내용</div>
                <p className="lesson-text">{selectedLesson.content}</p>
              </div>

              {/* TradingView Practice Area */}
              <div className="practice-section">
                <div className="section-label">
                  <div className="label-left"><LineChart size={14} /> 실전 작도 연습 (TradingView Live)</div>
                  <span className="premium-label">PREMIUM UX</span>
                </div>
                <div className="tv-widget-box glass">
                  <div id="study_tv_widget" style={{ height: '450px' }}></div>
                </div>
              </div>

              {/* Image Section */}
              <div className="image-section">
                <div className="section-label">
                  <div className="label-left"><ImageIcon size={14} /> 참조 이미지</div>
                  <button className="zoom-btn"><Maximize2 size={12} /> 크게보기</button>
                </div>
                <div className="image-box">
                  {selectedLesson.image ? (
                    <img src={selectedLesson.image} alt="Chart" className="lesson-img" />
                  ) : (
                    <div className="image-placeholder">
                      <ImageIcon size={48} />
                      <span>이미지가 없습니다.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PREMIUM UX BOTTOM BAR (Mobile Optimized) */}
      <div className="premium-bottom-grid">
        <GlassCard className="bottom-module mobile-ops">
          <h4 className="gold"><Smartphone size={16} /> MOBILE COMMAND CENTER</h4>
          <div className="mobile-btn-group">
            <button className="m-btn danger"><ShieldAlert size={16} /> EMERGENCY SELL</button>
            <button className="m-btn warning"><ZapIcon size={16} /> PAUSE BOT</button>
          </div>
        </GlassCard>

        <GlassCard className="bottom-module alert-hub">
          <h4 className="gold"><BellRing size={16} /> SMART ALERT CONFIG</h4>
          <div className="alert-toggle-box">
            <span>실시간 패턴 돌파 알림 (Telegram)</span>
            <div className="toggle active"></div>
          </div>
          <p className="alert-desc">공부 중인 패턴이 시장에서 포착되면 즉시 차트와 함께 전송됩니다.</p>
        </GlassCard>
      </div>

      <style jsx>{`
        .study-room-container {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          background: #1a1a1a; /* Soft Charcoal */
          min-height: 100vh;
          color: #d1d1d1;
        }

        /* Header */
        .study-header-box { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2d2d2d; padding-bottom: 24px; }
        .header-left { display: flex; gap: 20px; align-items: center; }
        .icon-bg { width: 56px; height: 56px; background: #2d2d2d; border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #a3a3a3; }
        .main-title { font-size: 1.8rem; font-weight: 900; color: #f2f2f2; margin: 0; }
        .sub-title { font-size: 0.95rem; color: #737373; margin-top: 4px; }
        .upload-btn { background: #3d3d3d; border: 1px solid #4a4a4a; color: #d1d1d1; padding: 10px 20px; border-radius: 8px; display: flex; align-items: center; gap: 10px; font-weight: 700; cursor: pointer; transition: all 0.2s; }
        .upload-btn:hover { background: #4a4a4a; color: white; }

        /* Layout */
        .study-layout { display: grid; grid-template-columns: 320px 1fr; gap: 32px; height: 700px; }

        /* Sidebar Nav */
        .lesson-nav { display: flex; flex-direction: column; gap: 12px; }
        .nav-item { padding: 20px; background: #242424; border: 1px solid #2d2d2d; border-radius: 12px; cursor: pointer; transition: all 0.3s; position: relative; }
        .nav-item:hover { background: #2d2d2d; transform: translateX(5px); }
        .nav-item.active { background: #2d2d2d; border-color: #525252; box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
        .nav-cat { font-size: 0.7rem; font-weight: 900; color: #737373; margin-bottom: 6px; letter-spacing: 1px; }
        .nav-title { font-size: 0.95rem; font-weight: 700; color: #d1d1d1; line-height: 1.4; }
        .nav-arrow { position: absolute; right: 20px; top: 50%; transform: translateY(-50%); color: #404040; }
        .active .nav-arrow { color: #a3a3a3; }
        .add-new { border: 1px dashed #404040; background: transparent; display: flex; align-items: center; justify-content: center; gap: 12px; color: #737373; font-weight: 700; margin-top: 20px; }

        /* Viewer */
        .content-viewer { background: #242424; border: 1px solid #2d2d2d; border-radius: 16px; overflow-y: auto; }
        .viewer-header { padding: 32px 40px; background: #2a2a2a; border-bottom: 1px solid #333; }
        .category-tag { font-size: 0.75rem; font-weight: 900; color: #a3a3a3; background: #333; padding: 4px 12px; border-radius: 4px; display: inline-block; margin-bottom: 12px; }
        .viewer-title { font-size: 1.8rem; font-weight: 900; color: #f2f2f2; margin: 0; }

        .viewer-body { padding: 40px; display: flex; flex-direction: column; gap: 40px; }
        .section-label { font-size: 0.8rem; font-weight: 900; color: #737373; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; justify-content: space-between; }
        .label-left { display: flex; align-items: center; gap: 8px; }

        .lesson-text { font-size: 1.1rem; line-height: 1.8; color: #b0b0b0; background: #1f1f1f; padding: 24px; border-radius: 12px; border-left: 4px solid #404040; }

        .image-box { width: 100%; border-radius: 12px; overflow: hidden; background: #1f1f1f; border: 1px solid #2d2d2d; }
        .lesson-img { width: 100%; height: auto; display: block; filter: brightness(0.9); transition: filter 0.3s; }
        .lesson-img:hover { filter: brightness(1); }
        .zoom-btn { background: #333; border: none; color: #a3a3a3; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 4px; }
        
        .image-placeholder { height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: #404040; }

        .image-placeholder { height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: #404040; }

        /* Premium UX Features */
        .practice-section { margin-top: 20px; }
        .tv-widget-box { border-radius: 12px; overflow: hidden; border: 1px solid #333; }
        .premium-label { font-size: 0.65rem; font-weight: 900; color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); padding: 2px 8px; border-radius: 4px; }

        .premium-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 20px; margin-bottom: 50px; }
        .bottom-module { padding: 24px; display: flex; flex-direction: column; gap: 16px; }
        .bottom-module h4 { font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 10px; }
        
        .mobile-btn-group { display: flex; gap: 12px; }
        .m-btn { flex: 1; padding: 12px; border: none; border-radius: 8px; font-weight: 800; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: transform 0.2s; }
        .m-btn:hover { transform: translateY(-2px); }
        .m-btn.danger { background: #ff0055; color: white; }
        .m-btn.warning { background: #fbbf24; color: black; }

        .alert-toggle-box { display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); padding: 12px 16px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; }
        .toggle { width: 40px; height: 20px; background: #333; border-radius: 10px; position: relative; }
        .toggle.active { background: #10b981; }
        .toggle.active::after { content: ''; position: absolute; right: 2px; top: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; }
        .alert-desc { font-size: 0.7rem; color: #737373; font-style: italic; }

        .gold { color: #f59e0b; }

        @media (max-width: 1000px) {
          .study-layout { grid-template-columns: 1fr; height: auto; }
          .premium-bottom-grid { grid-template-columns: 1fr; }
        }

        /* Custom Scrollbar */
        .content-viewer::-webkit-scrollbar { width: 8px; }
        .content-viewer::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}
