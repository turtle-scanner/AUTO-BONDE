"use client";

import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '@/components/GlassCard';
import TacticalAI from '@/components/TacticalAI';
import { 
  Play, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Wallet, 
  History, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Globe,
  Zap,
  Activity,
  ShieldCheck,
  Cpu,
  Volume2,
  BarChart2,
  MessageSquareCode
} from 'lucide-react';

interface Position {
  ticker: string;
  qty: number;
  avg_price: number;
  current_price: number;
  profit_pct: number;
}

interface PendingOrder {
  id: string;
  ticker: string;
  type: 'BUY' | 'SELL';
  price: number;
  qty: number;
  status: string;
  created_at: string;
}

declare global {
  interface Window {
    TradingView: any;
    tacticalAI: {
      speak: (text: string) => void;
      play: (type: 'success' | 'alert' | 'click') => void;
    };
  }
}

export default function TacticalExecPage() {
  const [user, setUser] = useState<string>('guest');
  const [ticker, setTicker] = useState('NVDA');
  const [market, setMarket] = useState<'US' | 'KR'>('US');
  const [price, setPrice] = useState<string>('');
  const [qty, setQty] = useState<string>('');
  const [positions, setPositions] = useState<Position[]>([]);
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("dragonfly_user") || "guest";
    setUser(loggedUser);
    
    fetchTradingData(loggedUser);
    const interval = setInterval(() => fetchTradingData(loggedUser), 5000);
    
    // Load TradingView Script
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => initChart('NVDA');
    document.head.appendChild(script);

    return () => clearInterval(interval);
  }, []);

  const initChart = (symbol: string) => {
    if (window.TradingView && chartContainerRef.current) {
      new window.TradingView.widget({
        "autosize": true,
        "symbol": market === 'US' ? symbol : `KRX:${symbol}`,
        "interval": "D",
        "timezone": "Asia/Seoul",
        "theme": "dark",
        "style": "1",
        "locale": "ko",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_chart",
        "backgroundColor": "rgba(0, 0, 0, 0)",
        "gridColor": "rgba(255, 255, 255, 0.05)",
      });
    }
  };

  useEffect(() => {
    if (ticker.length >= 4) initChart(ticker);
  }, [market]);

  const fetchTradingData = async (username: string) => {
    try {
      const res = await fetch(`/api/trading?user=${username}`);
      const data = await res.json();
      if (data.positions) {
        const posArray = Object.entries(data.positions).map(([t, details]: [string, any]) => ({
          ticker: t,
          ...details
        }));
        setPositions(posArray);
      }
      if (data.orders) setPendingOrders(data.orders);
    } catch (err) {
      console.error("Failed to fetch tactical data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (type: 'BUY' | 'SELL') => {
    if (!ticker || !price || !qty) {
      window.tacticalAI?.play('alert');
      setMessage({ text: '?²ãƒ«??¿½?ˆæ³³ï¿½ï¿½ï¿½ï¿½???ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ë¤ƒ?????ï¿½ëƒ±è­°ï¿½???ï¿½êµï¿½ë’©?ï¿½ê¼±ï¿½ë¹??', type: 'error' });
      return;
    }

    const confirmMsg = `${market} ??ç­Œë??£æ²…ï¿?${ticker} ??ï¿½êºï¿½ê¼¤???${price}${market === 'US' ? '$' : '??}??${qty}??${type === 'BUY' ? '?²ãƒ«??¿½ëµ??? : '?²ãƒ«??¿½ëµ?ï¿½ë¿ï¿½ì??} ??ç­Œëš¯?œï§‘ï¿?æ¿¡ã‚?‘é´‰ï¿????ï¿½ëŠ¾ï§Œï¿½?`;
    if (!confirm(confirmMsg)) return;

    window.tacticalAI?.play('click');
    setIsExecuting(true);
    setMessage(null);

    try {
      const res = await fetch('/v6-api/trading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user,
          ticker: ticker.toUpperCase(),
          market,
          price: parseFloat(price),
          qty: parseInt(qty),
          type
        })
      });

      if (res.ok) {
        window.tacticalAI?.play('success');
        window.tacticalAI?.speak(`?ï¿½ë„­?¨ï½‹ì³???²ãƒ«??¿½?–ï¿½ë¤ƒï¿½ë¹????æ¿šë°¸Ãï¿½ëœäº?¿½??ï¿½ë?ï§?¤„ì­—ï¿½ë±¶ï¿½?????¥â–²êº‚ï¿½???ç­Œï¿½????ï¿½ëœ®?? ${ticker} ??ï¿½êºï¿½ê¼¤???${type === 'BUY' ? '?²ãƒ«??¿½ëµ??? : '?²ãƒ«??¿½ëµ?ï¿½ë¿ï¿½ì??} ??ï¿½ë¼”?????ï¿½ì”ˆ?·ë‰“ì§???ç­Œë¤¾?“ï¿½???`);
        setMessage({ text: '?ï¿½ë„­?¨ï½‹ì³???²ãƒ«??¿½?–ï¿½ë¤ƒï¿½ë¹??????¥â–²êº‚ï¿½???ç­Œï¿½????ï¿½ëœ®??', type: 'success' });
        setPrice('');
        setQty('');
        fetchTradingData(user);
      } else {
        window.tacticalAI?.play('alert');
        setMessage({ text: '?²ãƒ«??¿½?–ï¿½ë¤ƒï¿½ë¹?????¥â–²êº‚ï¿½??????ï¿½ëœ†ï¿½ê½¡????¨ï¿½????ï¿½ëœ„ï¿½ë ¡.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: '???ç­Œï¿½????ï¿½ë˜»?¡ï¿½?ï¿½ì”ˆï¿½ìˆ? ?è¢â‘¸ì¦µç’ëº£ë¾ï¿½ë–????¨ï¿½????ï¿½ëœ„ï¿½ë ¡.', type: 'error' });
    } finally {
      setIsExecuting(false);
    }
  };

  const handleBriefing = () => {
    const totalProfit = positions.reduce((acc, p) => acc + (p.profit_pct || 0), 0) / (positions.length || 1);
    const briefText = `??ï¿½ëŒ–?¨ï¿½?ï¿½ë•»??? ?ï¿½ë„­?¨ï½‹ì³??${user} ??ç¯€??³®è¾±ï¿½?????¨ì€«ë®›???ï¿½ë¼”??„ï¿½???ç­Œë??£æ´ï¿???ï¿½ìŠ§è«?¿½???ï¿½ëœ®?? ?ï¿½ë„­?¨ï½‹ì³??${positions.length}?ï¿½ì”ˆ?·ë‰“ì§????ç­Œï¿½?ï¿½ë ° ?????ï¿½ëª´?¨ë£°????¨ëš®???? æ¿šìšŒê¼¬ï¿½ê¶¡ï¿½êº?ï¿½ë„«?¾ë??? ???????ï¿½ëª´?¨ë£¸???ï§’ê³—ì²? ${totalProfit.toFixed(2)}% ???ï¿½êµï¿½ë²?? ??ç­Œë??£æ²…ï¿???ï¿½ë??????²ãƒ«??¿½ëµ????????ï¿½ë„­?¨ï½‹ì³??????¥â–²ï¿½ë³¥???ç­Œëš¯?œï¿½ï¿½ï¿½??ç­Œë??—ï¿½??`;
    window.tacticalAI?.speak(briefText);
  };

  return (
    <div className="tactical-exec-container animate-fade-in">
      <TacticalAI onReady={() => console.log("Tactical AI Online")} />
      
      {/* Tactical Status Header */}
      <div className="tactical-header">
        <div className="header-left">
          <h1><span className="tag">[ COMMAND ]</span> {user === 'cntfed' || user === 'hjrubbi' ? 'MASTER' : 'MEMBER'} TRADING CENTER</h1>
          <p className="subtitle">{user} ??????•ï¿½??ï¿½ì”ˆ?·ë‰“ì§???ï¿½ë„­?¨ï½‹ì³?????????æºë‚†ë¿???ï¿½ëœ„ï¿½ë ¡.</p>
        </div>
        <div className="header-right">
          <button className="briefing-btn" onClick={handleBriefing}>
            <Volume2 size={16} /> AI BRIEFING
          </button>
          <div className="status-badge live">
            <Activity size={14} className="pulse" /> LIVE
          </div>
        </div>
      </div>

      <div className="exec-layout">
        {/* Main Chart Area */}
        <div className="chart-section">
          <GlassCard className="chart-card">
            <div id="tradingview_chart" className="tv-widget"></div>
          </GlassCard>
          
          <div className="intel-row">
            <GlassCard className="ai-briefing-card">
              <div className="card-header">
                <MessageSquareCode size={18} className="gold" /> AI STRATEGIC BRIEFING
              </div>
              <p className="brief-content">
                "?ï¿½ë„­?¨ï½‹ì³??{ticker} ??ï¿½êºï¿½ê¼¤??? ?ï¿½êµï¿½ë’©????²ãƒ«?£ï¿½???²ãƒ«?£ï¿½?????ï¿½ë„­?¨ï½‹ì³????æ¿¡ã‚‹ê»?ï¿½ë€‘ï¿½ï¿??????????¨ëš®????ºê³—?©ï¿½ï¿?????¨ï¿½????ï¿½ëœ„ï¿½ë ¡. RSI ?²ãƒ«?£ï¿½????? ??è²«ï¿½??????ï¿½ìŠ¢ï¿½ì ????²ãƒ«?£ï¿½??????ï¿½ë»¹?¾ï¿½ ?? ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???²ãƒ«??¿½ëµ????ï¿½ë„­?¨ï½‹ì³?????ï¿½êº‚ï§Ÿï¿½?????¨ëš®??????ï¿½ëœ„ï¿½ë ¡."
              </p>
              <div className="brief-footer">
                STATUS: <span className="green">TACTICAL ADVANTAGE</span>
              </div>
            </GlassCard>
            
            <GlassCard className="bot-status-card">
               <div className="card-header">
                <Cpu size={18} className="gold" /> SYSTEM METRICS
              </div>
              <div className="metrics-grid">
                <div className="m-item"><span>LATENCY</span><span className="v">12ms</span></div>
                <div className="m-item"><span>UPTIME</span><span className="v">99.9%</span></div>
                <div className="m-item"><span>SECURITY</span><span className="v green">AES-256</span></div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Sidebar: Order & Positions */}
        <div className="sidebar-section">
          <GlassCard className="order-console">
             <div className="console-header">
              <h3><Zap size={20} className="gold" /> [ ORDER ]</h3>
              <div className="market-selector">
                <button className={market === 'US' ? 'active' : ''} onClick={() => setMarket('US')}>US</button>
                <button className={market === 'KR' ? 'active' : ''} onClick={() => setMarket('KR')}>KR</button>
              </div>
            </div>

            <div className="order-inputs">
              <div className="field">
                <label>TICKER</label>
                <input 
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value.toUpperCase())}
                  onBlur={() => initChart(ticker)}
                />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>PRICE</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" />
                </div>
                <div className="field">
                  <label>QTY</label>
                  <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="0" />
                </div>
              </div>

              <div className="order-actions">
                <button className="buy-btn" onClick={() => handleExecute('BUY')} disabled={isExecuting}>BUY</button>
                <button className="sell-btn" onClick={() => handleExecute('SELL')} disabled={isExecuting}>SELL</button>
              </div>

              {message && (
                <div className={`status-msg ${message.type}`}>
                  {message.text}
                </div>
              )}
            </div>
          </GlassCard>

          <GlassCard className="portfolio-card">
            <div className="card-header">
              <Wallet size={18} className="gold" /> ACTIVE POSITIONS
            </div>
            <div className="pos-list">
              {positions.map(pos => (
                <div key={pos.ticker} className="pos-row">
                  <div className="p-info">
                    <span className="p-t">{pos.ticker}</span>
                    <span className="p-q">{pos.qty}??/span>
                  </div>
                  <span className={`p-p ${pos.profit_pct >= 0 ? 'up' : 'down'}`}>
                    {pos.profit_pct.toFixed(2)}%
                  </span>
                </div>
              ))}
              {positions.length === 0 && <p className="empty">?????ï¿½ëª´?¨ë£»ê¼???ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡.</p>}
            </div>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .tactical-exec-container { padding: 30px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .tactical-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: #64748b; font-size: 0.85rem; font-weight: 600; margin-top: 4px; }
        
        .header-right { display: flex; gap: 15px; align-items: center; }
        .briefing-btn { 
          background: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3);
          color: var(--primary); padding: 8px 16px; border-radius: 20px; font-size: 0.75rem;
          font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 8px;
        }

        .status-badge { padding: 6px 12px; border-radius: 15px; font-size: 0.65rem; font-weight: 900; border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; }

        .exec-layout { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
        .chart-section { display: flex; flex-direction: column; gap: 30px; }
        .chart-card { height: 500px; padding: 0 !important; overflow: hidden; }
        .tv-widget { width: 100%; height: 100%; }

        .intel-row { display: grid; grid-template-columns: 1fr 240px; gap: 30px; }
        .ai-briefing-card, .bot-status-card { padding: 20px; }
        .card-header { font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 10px; margin-bottom: 15px; color: var(--primary); }
        .brief-content { font-size: 0.9rem; color: #cbd5e1; line-height: 1.6; font-weight: 600; }
        .brief-footer { margin-top: 15px; font-size: 0.7rem; font-weight: 900; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 10px; }

        .metrics-grid { display: flex; flex-direction: column; gap: 10px; }
        .m-item { display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 800; color: #64748b; }
        .v { color: white; font-weight: 900; }

        .sidebar-section { display: flex; flex-direction: column; gap: 30px; }
        .order-console { padding: 24px; }
        .console-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .console-header h3 { font-size: 0.9rem; font-weight: 950; }
        
        .market-selector { display: flex; background: #000; padding: 3px; border-radius: 6px; }
        .market-selector button { padding: 4px 10px; border: none; background: none; color: #475569; font-size: 0.65rem; font-weight: 800; cursor: pointer; }
        .market-selector button.active { background: var(--primary); color: black; border-radius: 4px; }

        .order-inputs { display: flex; flex-direction: column; gap: 15px; }
        .field label { display: block; font-size: 0.65rem; font-weight: 800; color: #64748b; margin-bottom: 6px; }
        input { width: 100%; padding: 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; color: white; font-weight: 700; outline: none; }
        input:focus { border-color: var(--primary); }
        
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }

        .order-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
        .buy-btn { background: #ef4444; color: white; border: none; padding: 14px; border-radius: 8px; font-weight: 950; cursor: pointer; }
        .sell-btn { background: #3b82f6; color: white; border: none; padding: 14px; border-radius: 8px; font-weight: 950; cursor: pointer; }
        
        .status-msg { font-size: 0.75rem; font-weight: 800; padding: 10px; border-radius: 6px; background: rgba(255,255,255,0.05); text-align: center; }
        .status-msg.success { color: #10b981; }
        .status-msg.error { color: #ef4444; }

        .portfolio-card { padding: 24px; }
        .pos-list { display: flex; flex-direction: column; gap: 12px; }
        .pos-row { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: rgba(255,255,255,0.02); border-radius: 8px; }
        .p-t { font-weight: 900; color: var(--primary); display: block; }
        .p-q { font-size: 0.7rem; color: #64748b; font-weight: 700; }
        .p-p { font-weight: 900; font-size: 0.9rem; }
        .p-p.up { color: #ef4444; }
        .p-p.down { color: #3b82f6; }
        .empty { font-size: 0.75rem; color: #475569; text-align: center; }

        .gold { color: var(--primary); }
        .green { color: #10b981; }
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

        @media (max-width: 1200px) {
          .exec-layout { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
