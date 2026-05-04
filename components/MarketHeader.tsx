"use client";

import React, { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';

export default function MarketHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "proName": "FOREXCOM:SPX500", "title": "S&P 500" },
          { "proName": "FOREXCOM:NSXUSD", "title": "Nasdaq 100" },
          { "proName": "FX_IDC:USDKRW", "title": "USD/KRW" },
          { "proName": "KRX:KOSPI", "title": "KOSPI" },
          { "proName": "KRX:KOSDAQ", "title": "KOSDAQ" },
          { "proName": "BITSTAMP:BTCUSD", "title": "BTC/USD" }
        ],
        "showSymbolLogo": true,
        "isTransparent": true,
        "displayMode": "adaptive",
        "colorTheme": "dark",
        "locale": "kr"
      });
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="market-header-bar glass">
      <button className="mobile-menu-btn" onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      
      <div ref={containerRef} className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>

      <style jsx>{`
        .market-header-bar {
          height: 48px;
          display: flex;
          align-items: center;
          padding: 0 10px;
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
          margin-right: 10px;
          padding: 5px;
          align-items: center;
          justify-content: center;
        }
        .tradingview-widget-container {
          flex: 1;
          width: 100%;
        }

        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
