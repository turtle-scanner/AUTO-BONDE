"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Newspaper, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Globe, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export default function BreakingNewsDashboard() {
  const news = [
    {
      id: 1,
      time: '14:24',
      source: 'REUTERS',
      title: 'U.S. Manufacturing Data Beats Expectations, Dollar Strengthens',
      category: 'ECONOMY',
      sentiment: 'BULLISH',
      isUrgent: true
    },
    {
      id: 2,
      time: '14:15',
      source: 'BLOOMBERG',
      title: 'Nvidia Partners with Major Cloud Providers for Next-Gen AI Chips',
      category: 'TECH',
      sentiment: 'BULLISH',
      isUrgent: false
    },
    {
      id: 3,
      time: '13:58',
      source: 'CNBC',
      title: 'Federal Reserve Signals Possible Rate Cut Postponement',
      category: 'POLICY',
      sentiment: 'BEARISH',
      isUrgent: true
    },
    {
      id: 4,
      time: '13:30',
      source: 'YAHOO FINANCE',
      title: 'Oil Prices Dip Amid Global Supply Surge Concerns',
      category: 'ENERGY',
      sentiment: 'BEARISH',
      isUrgent: false
    },
    {
      id: 5,
      time: '12:45',
      source: 'MARKETWATCH',
      title: 'Retail Sales Flat as Consumer Spending Cools in April',
      category: 'ECONOMY',
      sentiment: 'NEUTRAL',
      isUrgent: false
    }
  ];

  return (
    <div className="news-dashboard animate-fade-in">
      {/* Header */}
      <div className="news-header">
        <div className="header-info">
          <h1 className="news-title">
            <Newspaper className="title-icon" /> BREAKING COMMAND
          </h1>
          <p className="news-subtitle">글로벌 핵심 정보망을 실시간으로 감시 중입니다.</p>
        </div>
        <div className="search-bar glass">
          <Search size={18} />
          <input type="text" placeholder="Search news by keywords..." />
        </div>
      </div>

      <div className="news-layout">
        {/* Main Feed */}
        <div className="news-feed">
          <div className="feed-controls">
            <div className="category-filters">
              <button className="filter-chip active">All News</button>
              <button className="filter-chip">Economy</button>
              <button className="filter-chip">Tech</button>
              <button className="filter-chip">Policy</button>
            </div>
            <button className="btn-filter"><Filter size={16} /> Filter</button>
          </div>

          <div className="timeline">
            {news.map((item) => (
              <div key={item.id} className={`news-item ${item.isUrgent ? 'urgent' : ''}`}>
                <div className="item-sidebar">
                  <div className="item-time">{item.time}</div>
                  <div className="item-line"></div>
                </div>
                <GlassCard className="item-content">
                  <div className="item-top">
                    <span className="source-tag">{item.source}</span>
                    <span className={`sentiment-badge ${item.sentiment.toLowerCase()}`}>
                      {item.sentiment === 'BULLISH' ? <TrendingUp size={14} /> : 
                       item.sentiment === 'BEARISH' ? <TrendingDown size={14} /> : 
                       <Globe size={14} />}
                      {item.sentiment}
                    </span>
                    {item.isUrgent && <span className="urgent-tag"><AlertTriangle size={12} /> URGENT</span>}
                  </div>
                  <h2 className="item-title">{item.title}</h2>
                  <div className="item-footer">
                    <span className="category-tag">{item.category}</span>
                    <div className="item-actions">
                      <button><MessageSquare size={16} /> 4</button>
                      <button><ExternalLink size={16} /> Read More</button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Hot Topics */}
        <div className="news-sidebar">
          <GlassCard className="hot-topics-card">
            <h3>TRENDING TOPICS</h3>
            <div className="topics-list">
              <div className="topic-item"># FederalReserve <span className="topic-count">1.2k</span></div>
              <div className="topic-item"># AIChips <span className="topic-count">850</span></div>
              <div className="topic-item"># Inflation <span className="topic-count">640</span></div>
              <div className="topic-item"># Nvidia <span className="topic-count">520</span></div>
            </div>
          </GlassCard>

          <GlassCard className="alert-box">
            <div className="alert-header">
              <Globe size={20} className="globe-icon" />
              <h4>GLOBAL BROADCAST</h4>
            </div>
            <p>사령부의 AI가 현재 시장의 호재 민감도가 평소보다 15% 높음을 감지했습니다. 매수 신호 시 적극 대응 권장.</p>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .news-dashboard {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 30px;
          color: white;
        }

        .news-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .news-title {
          font-size: 1.8rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 12px;
          letter-spacing: -1px;
        }

        .title-icon { color: var(--gold-400); }
        .news-subtitle { color: var(--text-muted); font-size: 0.9rem; margin-top: 4px; }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          border-radius: 12px;
          width: 350px;
        }

        .search-bar input {
          background: none;
          border: none;
          color: white;
          width: 100%;
          font-weight: 600;
        }

        .search-bar input::placeholder { color: rgba(255, 255, 255, 0.3); }

        .news-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 30px;
        }

        /* Feed */
        .feed-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .category-filters { display: flex; gap: 8px; }
        .filter-chip {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }

        .filter-chip.active {
          background: var(--gold-400);
          color: black;
          border-color: var(--gold-400);
        }

        .btn-filter { background: none; border: none; color: white; display: flex; align-items: center; gap: 8px; font-weight: 700; cursor: pointer; }

        /* Timeline */
        .timeline { display: flex; flex-direction: column; }

        .news-item { display: flex; gap: 20px; }
        
        .item-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 60px;
        }

        .item-time { font-size: 0.85rem; font-weight: 900; color: var(--gold-400); }
        .item-line { width: 1px; flex: 1; background: linear-gradient(to bottom, rgba(212, 175, 55, 0.3), rgba(212, 175, 55, 0.05)); margin: 8px 0; }

        .item-content { flex: 1; margin-bottom: 24px; padding: 20px; }
        .news-item.urgent .item-content { border: 1px solid rgba(212, 175, 55, 0.4); background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%); }

        .item-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .source-tag { font-size: 0.65rem; font-weight: 900; background: rgba(255, 255, 255, 0.1); padding: 2px 8px; border-radius: 4px; }
        
        .sentiment-badge {
          font-size: 0.65rem;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .sentiment-badge.bullish { color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .sentiment-badge.bearish { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        .sentiment-badge.neutral { color: var(--text-muted); background: rgba(255, 255, 255, 0.05); }

        .urgent-tag { color: #f59e0b; font-size: 0.65rem; font-weight: 900; display: flex; align-items: center; gap: 4px; }

        .item-title { font-size: 1.15rem; font-weight: 800; line-height: 1.4; margin-bottom: 16px; }

        .item-footer { display: flex; justify-content: space-between; align-items: center; }
        .category-tag { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); border: 1px solid rgba(255, 255, 255, 0.1); padding: 2px 8px; border-radius: 4px; }
        .item-actions { display: flex; gap: 16px; }
        .item-actions button { background: none; border: none; color: var(--text-muted); font-size: 0.8rem; font-weight: 700; display: flex; align-items: center; gap: 6px; cursor: pointer; transition: color 0.2s; }
        .item-actions button:hover { color: white; }

        /* Sidebar */
        .news-sidebar { display: flex; flex-direction: column; gap: 30px; }
        .hot-topics-card, .alert-box { padding: 24px; }
        
        .hot-topics-card h3 { font-size: 0.9rem; font-weight: 900; margin-bottom: 20px; }
        .topics-list { display: flex; flex-direction: column; gap: 12px; }
        .topic-item { font-size: 0.85rem; font-weight: 700; display: flex; justify-content: space-between; color: var(--text-muted); cursor: pointer; }
        .topic-item:hover { color: var(--gold-400); }
        .topic-count { font-size: 0.75rem; color: rgba(255, 255, 255, 0.2); }

        .alert-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: var(--gold-400); }
        .alert-header h4 { font-weight: 900; font-size: 0.9rem; }
        .alert-box p { font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; }
      `}</style>
    </div>
  );
}
