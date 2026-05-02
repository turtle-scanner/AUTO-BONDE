"use client";

import React, { useState, useEffect } from 'react';

export default function DigitalClock() {
  const [times, setTimes] = useState({ kst: '--:--:--', ny: '--:--:--' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // KST (Korea Standard Time)
      const kstTime = now.toLocaleTimeString('ko-KR', { 
        timeZone: 'Asia/Seoul', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });

      // EST/EDT (New York Time)
      const nyTime = now.toLocaleTimeString('en-US', { 
        timeZone: 'America/New_York', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });

      setTimes({ kst: kstTime, ny: nyTime });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ops-clocks glass">
      <div className="clock-item">
        <span className="label">KST</span>
        <span className="time">{times.kst}</span>
      </div>
      <div className="clock-divider"></div>
      <div className="clock-item">
        <span className="label">NY</span>
        <span className="time">{times.ny}</span>
      </div>

      <style jsx>{`
        .ops-clocks {
          display: flex;
          align-items: center;
          padding: 4px 16px;
          gap: 12px;
          height: 36px;
          border-radius: 10px !important;
        }

        .clock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 65px;
        }

        .label {
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 2px;
        }

        .time {
          font-size: 0.85rem;
          font-weight: 700;
          font-family: 'Fira Code', monospace;
          color: white;
          line-height: 1;
        }

        .clock-divider {
          width: 1px;
          height: 16px;
          background: var(--card-border);
        }
      `}</style>
    </div>
  );
}
