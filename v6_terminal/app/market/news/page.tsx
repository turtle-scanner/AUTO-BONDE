"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Bell, Zap, Globe, TrendingUp, Clock, RefreshCw, Filter } from 'lucide-react';

export default function NewsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const newsData = [
    { id: 1, type: "URGENT", title: "미국 4월 소비자물가지수(CPI) 예상치 하회, 금리 인하 기대감 고조", time: "1분 전", source: "Reuters", impact: "HIGH" },
    { id: 2, type: "HOT", title: "엔비디아(NVDA) 차세대 블랙웰 칩 양산 가속화... 시가총액 1위 탈환 가시화", time: "5분 전", source: "Bloomberg", impact: "MEDIUM" },
    { id: 3, type: "INFO", title: "한국은행, 기준금리 3.5% 동결 결정... 시장 예상 부합", time: "12분 전", source: "Yonhap", impact: "LOW" },
    { id: 4, type: "URGENT", title: "중동 긴장 재고조... 국제 유가(WTI) 배럴당 $90 돌파 시도", time: "25분 전", source: "CNBC", impact: "HIGH" },
    { id: 5, type: "HOT", title: "테슬라(TSLA) FSD 중국 진출 가속화 소식에 시간외 8% 급등", time: "40분 전", source: "WSJ", impact: "MEDIUM" }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  return (
    <div className="news-container animate-fade-in">
      <div className="news-header">
        <h1 className="news-title">
          <Bell size={32} className="title-icon" /> [ NEWS ] 실시간 시장 첩보 (Market Intelligence)
        </h1>
        <div className="news-notice glass">
          전 세계 금융 시장의 전술적 첩보를 실시간으로 수집합니다. 정보의 속도가 곧 수익의 차이를 만듭니다.
        </div>
      </div>

      <div className="intelligence-ops">
        <div className="filter-group glass">
          <button className="filter-btn active">ALL FEED</button>
          <button className="filter-btn">GLOBAL</button>
          <button className="filter-btn">DOMESTIC</button>
          <button className="filter-btn">CRYPTO</button>
        </div>
        <button className={`refresh-btn glass ${isRefreshing ? 'loading' : ''}`} onClick={handleRefresh}>
          <RefreshCw size={16} className={isRefreshing ? "rotating" : ""} /> [ SYNC ] INTELLIGENCE REFRESH
        </button>
      </div>

      <div className="news-timeline">
        {newsData.map((news) => (
          <GlassCard key={news.id} className="news-item-card">
            <div className="news-meta">
              <span className={`news-badge ${news.type.toLowerCase()}`}>
                <Zap size={10} /> {news.type}
              </span>
              <span className="news-source">{news.source}</span>
              <span className="news-time"><Clock size={12} /> {news.time}</span>
            </div>
            <h3 className="news-headline">{news.title}</h3>
            <div className="news-footer">
              <div className="impact-indicator">
                <span className="label">MARKET IMPACT:</span>
                <div className="impact-bar-container">
                  <div className={`impact-bar ${news.impact.toLowerCase()}`} style={{ width: news.impact === 'HIGH' ? '100%' : news.impact === 'MEDIUM' ? '60%' : '30%' }}></div>
                </div>
              </div>
              <button className="analysis-btn">전술 분석 보기</button>
            </div>
          </GlassCard>
        ))}
      </div>

      <footer className="news-footer-quote">
        <div className="insight-label">[ HQ-SHIELD ] 본데의 일간 전술 통찰</div>
        <div className="insight-quote">
          "뉴스는 사실이 아니라, 그 사실에 반응하는 대중의 심리를 읽는 도구일 뿐이다."
        </div>
      </footer>

      <style jsx>{`
        .news-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; max-width: 1000px; margin: 0 auto; }
        .news-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .title-icon { color: var(--primary); }
        .news-notice { padding: 20px; border-radius: 12px; font-size: 0.95rem; color: var(--text-muted); font-weight: 600; }

        .intelligence-ops { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; }
        .filter-group { display: flex; gap: 8px; padding: 6px; border-radius: 10px; background: rgba(0, 0, 0, 0.2); }
        .filter-btn { padding: 8px 16px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; border: none; background: transparent; color: var(--text-muted); cursor: pointer; transition: all 0.3s; }
        .filter-btn.active { background: var(--primary); color: black; }
        .filter-btn:hover:not(.active) { color: white; background: rgba(255, 255, 255, 0.05); }

        .refresh-btn { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; color: var(--primary); border: 1px solid rgba(255, 189, 46, 0.2); cursor: pointer; }

        .news-timeline { display: flex; flex-direction: column; gap: 16px; }
        .news-item-card { padding: 24px; position: relative; border-left: 4px solid transparent; transition: all 0.3s; }
        .news-item-card:hover { border-left-color: var(--primary); transform: translateX(4px); }

        .news-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
        .news-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 900; display: flex; align-items: center; gap: 4px; }
        .urgent { background: rgba(255, 0, 85, 0.2); color: #ff0055; border: 1px solid rgba(255, 0, 85, 0.3); box-shadow: 0 0 10px rgba(255, 0, 85, 0.2); }
        .hot { background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }
        .info { background: rgba(14, 165, 233, 0.2); color: #0ea5e9; border: 1px solid rgba(14, 165, 233, 0.3); }

        .news-source { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
        .news-time { font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; }

        .news-headline { font-size: 1.25rem; font-weight: 800; color: white; line-height: 1.4; margin-bottom: 20px; }

        .news-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255, 255, 255, 0.05); }
        .impact-indicator { display: flex; align-items: center; gap: 12px; }
        .impact-indicator .label { font-size: 0.65rem; font-weight: 800; color: var(--text-muted); }
        .impact-bar-container { width: 60px; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; }
        .impact-bar { height: 100%; border-radius: 2px; }
        .high { background: #ff0055; box-shadow: 0 0 5px #ff0055; }
        .medium { background: #fbbf24; }
        .low { background: #0ea5e9; }

        .analysis-btn { font-size: 0.75rem; font-weight: 800; color: var(--primary); background: transparent; border: none; cursor: pointer; text-decoration: underline; }

        .news-footer-quote { margin-top: 40px; text-align: center; border-top: 1px solid var(--card-border); padding-top: 30px; }
        .insight-label { color: var(--primary); font-size: 0.8rem; font-weight: 900; margin-bottom: 10px; }
        .insight-quote { font-size: 0.95rem; color: var(--text-muted); font-style: italic; }

        .rotating { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .loading { opacity: 0.7; pointer-events: none; }
      `}</style>
    </div>
  );
}
