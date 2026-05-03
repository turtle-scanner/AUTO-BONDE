import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import BGMPlayer from "@/components/BGMPlayer";
import DigitalClock from "@/components/DigitalClock";
import ErrorBoundary from "@/components/ErrorBoundary";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

// TacticalPopup을 클라이언트 사이드에서만 로드하도록 동적 임포트
const TacticalPopup = dynamic(() => import("@/components/TacticalPopup"), { ssr: false });

export const metadata: Metadata = {
  title: "StockDragonfly v6.0 | PLATINUM COMMAND",
  description: "Next-generation algorithmic trading and market analysis dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="terminal-overlay"></div>
        <div className="scanlines"></div>
        
        {/* 택티컬 팝업 가동 */}
        <TacticalPopup />
        
        <div className="layout-container">
          <Sidebar />
          <main className="main-content">
            <header className="top-nav glass">
              <div className="search-bar">
                <input type="text" placeholder="Search tickers, strategies, or commands..." className="glass" />
              </div>
              <div className="header-actions">
                <DigitalClock />
                <div className="icon-btn glass">🔔</div>
                <div className="icon-btn glass">⚡</div>
              </div>
            </header>
            <div className="content-area">
              <ErrorBoundary fallbackName="Main Sector">
                {children}
              </ErrorBoundary>
            </div>
          </main>
          <ErrorBoundary fallbackName="BGM Hub">
            <BGMPlayer />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
