import type { Metadata } from "next";
import Link from "next/link";
import BGMPlayer from "@/components/BGMPlayer";
import DigitalClock from "@/components/DigitalClock";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockDragonfly v6.0 | PLATINUM COMMAND",
  description: "Next-generation algorithmic trading and market analysis dashboard.",
};

import Sidebar from "@/components/Sidebar";
import TacticalPopup from "@/components/TacticalPopup";

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
