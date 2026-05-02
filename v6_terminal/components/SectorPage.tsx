"use client";

import React from 'react';
import GlassCard from '@/components/GlassCard';
import { Construction, Zap } from 'lucide-react';

interface SectorPageProps {
  sectionCode: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const SectorPage: React.FC<SectorPageProps> = ({ sectionCode, title, description, icon }) => {
  return (
    <div className="sector-container animate-fade-in">
      <GlassCard className="sector-card">
        <div className="sector-icon">{icon || <Construction size={48} />}</div>
        <div className="sector-code">{sectionCode}</div>
        <h1 className="sector-title">{title}</h1>
        <p className="sector-desc">{description}</p>
        <div className="sector-status">
          <Zap size={14} />
          <span>SECTOR UNDER CONSTRUCTION</span>
        </div>
        <div className="pulse-ring"></div>
      </GlassCard>

      <style jsx>{`
        .sector-container { padding: 40px; display: flex; align-items: center; justify-content: center; min-height: 60vh; }
        .sector-card { padding: 60px 40px; text-align: center; max-width: 600px; width: 100%; position: relative; overflow: hidden; border: 1px solid var(--card-border); }
        .sector-icon { color: var(--primary); margin-bottom: 20px; display: flex; justify-content: center; }
        .sector-code { font-size: 0.75rem; font-weight: 900; color: var(--primary); letter-spacing: 0.15em; margin-bottom: 12px; background: rgba(0,242,255,0.08); display: inline-block; padding: 4px 14px; border-radius: 4px; border: 1px solid rgba(0,242,255,0.15); }
        .sector-title { font-size: 1.8rem; font-weight: 900; color: white; margin-bottom: 12px; }
        .sector-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; font-weight: 500; margin-bottom: 28px; }
        .sector-status { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.7rem; font-weight: 900; color: #fbbf24; letter-spacing: 0.1em; }
        .pulse-ring { position: absolute; top: 50%; left: 50%; width: 300px; height: 300px; border: 1px solid rgba(0,242,255,0.05); border-radius: 50%; transform: translate(-50%, -50%); animation: pulse-expand 3s ease-out infinite; pointer-events: none; }
        @keyframes pulse-expand { 0% { width: 100px; height: 100px; opacity: 0.3; } 100% { width: 500px; height: 500px; opacity: 0; } }
      `}</style>
    </div>
  );
};

export default SectorPage;
