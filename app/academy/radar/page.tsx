"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Radar, 
  Zap, 
  Volume2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert,
  Target,
  Search,
  Activity,
  ArrowUpRight,
  RefreshCw,
  Info
} from 'lucide-react';

interface BananaStock {
  ticker: string;
  ripeness: number;
  status: string;
  price: string;
  target: string;
}

interface RadarData {
  KOSPI: BananaStock[];
  KOSDAQ: BananaStock[];
  NASDAQ: BananaStock[];
}

export default function NanoBananaRadar() {
  const [isScanning, setIsScanning] = useState(true);
  const [radarData, setRadarData] = useState<RadarData | null>(null);
  const [activeMarket, setActiveMarket] = useState<keyof RadarData>('KOSPI');

  useEffect(() => {
    fetchRadar();
  }, []);

  const fetchRadar = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/v6-api/nano-banana');
      const data = await res.json();
      setRadarData(data);
    } catch (err) {
      console.error("Radar fetch failed", err);
    } finally {
      setTimeout(() => setIsScanning(false), 1200);
    }
  };

  const getBananaColor = (ripeness: number) => {
    if (ripeness >= 95) return '#fbbf24'; // Gold / Ripe
    if (ripeness >= 70) return '#fde047'; // Yellow
    if (ripeness >= 40) return '#a3e635'; // Lime / Greenish
    return '#4ade80'; // Green
  };

  const stocks = radarData ? radarData[activeMarket] : [];

  return (
    <div className="radar-page-container animate-fade-in">
      <div className="radar-header">
        <div className="title-box">
          <h1 className="radar-title">
            <span className="emoji">???/span> 5-c. [ RADAR ] ???¥â–²êºè‚„ï¿?è¢â‘¸ì¦?ï¿½ï¿½????æ¿¡ã‚???ï¿½ï¿½?¥ï¿½?¬íˆ??          </h1>
          <p className="radar-subtitle">??ï¿½ï¿½?¤ë²¡ï¿½êºŠ ?²ãƒ«?£ï¿½?????'????? ?è¢â‘¸ì¦?ï¿½ï¿½??? ??ï¿½êºï¿½ê¼¤?????ç­Œë??£æ²…ï¿??¨ëš®??ï¿½ê·£ë­??ï¦«ï¿½? ???ï¿½ë‚?‰ï¿½??ç­Œë¤¾?“ï¿½???</p>
        </div>
        <div className="header-actions">
          <div className="market-selector glass">
            {(['KOSPI', 'KOSDAQ', 'NASDAQ'] as const).map(m => (
              <button 
                key={m} 
                className={`m-tab ${activeMarket === m ? 'active' : ''}`}
                onClick={() => setActiveMarket(m)}
              >
                {m}
              </button>
            ))}
          </div>
          <button className="sync-btn" onClick={fetchRadar} disabled={isScanning}>
            <RefreshCw size={16} className={isScanning ? 'animate-spin' : ''} />
            SCAN
          </button>
        </div>
      </div>

      <div className="radar-grid">
        {/* Left: Banana Harvest List */}
        <div className="banana-list">
          {stocks.map((stock, i) => (
            <GlassCard key={i} className="banana-card">
              <div className="banana-visual">
                <div className="banana-icon" style={{ filter: `drop-shadow(0 0 10px ${getBananaColor(stock.ripeness)})` }}>
                  {stock.ripeness >= 95 ? '??? : '???}
                  <div className="ripeness-overlay" style={{ height: `${100 - stock.ripeness}%` }}></div>
                </div>
                <div className="ripeness-percent" style={{ color: getBananaColor(stock.ripeness) }}>
                  {stock.ripeness}%
                </div>
              </div>
              
              <div className="banana-info">
                <div className="info-top">
                  <span className="b-ticker">{stock.ticker}</span>
                  <span className="b-status" style={{ background: `${getBananaColor(stock.ripeness)}22`, color: getBananaColor(stock.ripeness) }}>
                    {stock.status}
                  </span>
                </div>
                <div className="info-bottom">
                  <div className="price-box">
                    <span className="p-label">CURRENT</span>
                    <span className="p-val">{stock.price}</span>
                  </div>
                  <div className="price-box">
                    <span className="p-label">HARVEST AT</span>
                    <span className="p-val gold">{stock.target}</span>
                  </div>
                </div>
              </div>

              <div className="banana-action">
                {stock.ripeness >= 95 ? (
                  <button className="harvest-btn animate-bounce">
                    ?²ãƒ«?£é®ë½³ì­•????ï¿½ëˆ§èª˜â‘·??(BUY) <ArrowUpRight size={16} />
                  </button>
                ) : (
                  <div className="waiting-tag">???ï¿½ë†ï¿½ë ° ????æ¿šï¿½?..</div>
                )}
              </div>
            </GlassCard>
          ))}
          {stocks.length === 0 && !isScanning && <div className="empty-banana">?ï¿½ë„­?¨ï½‹ì³????? ?è¢â‘¸ì¦?ï¿½ï¿½???? ??ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡.</div>}
        </div>

        {/* Right: Legend & Logic */}
        <div className="radar-side">
          <GlassCard className="legend-card">
            <h3 className="gold"><Info size={18} /> [ ?è¢â‘¸ì¦?ï¿½ï¿½??????ï¿½ë†ï¿½ë °???ï¿½ì”ˆï¿½ìˆ????ï¿½ë›¾?]</h3>
            <div className="legend-items">
              <div className="l-item">
                <span className="l-dot green"></span>
                <div className="l-text">
                  <strong>Green (0-40%)</strong>
                  <p>?è¢â‘¸ì¦´ç”•ï¿??ï¿½ëƒ±ï¿½ë®????¥â–²êº‚ï¿½???²ãƒ«??¿½ëµ?ï¿½ë§•ï¿½ë§ª???ï¿½ìŠ¢ï¿½ì ?? ?ï¿½ë„­?¨ï½‹ì³´ï¿½ë¹???? ?²ï¿½?</p>
                </div>
              </div>
              <div className="l-item">
                <span className="l-dot yellow"></span>
                <div className="l-text">
                  <strong>Yellow (41-90%)</strong>
                  <p>????????????ï¿½ëª´æ´¹ï¼¢ï¿??ï¿½ë„­?¨ï½‹ì³?? ?æ¬²ê¼²ï¿?æºê»‰?·ç­Œï¿? ???ï¿½ë»¹?¾ï¿½ ??ç­Œë??£æ´ï¿??</p>
                </div>
              </div>
              <div className="l-item">
                <span className="l-dot gold"></span>
                <div className="l-text">
                  <strong>Gold (95%+)</strong>
                  <p>?²ãƒ«?£é®ë½³ì­•????ï¿½ï¿½?¤ë²¡ï¿½êºŠ ?ï¿½ì”ˆï¿½ìˆ??? ?²ãƒ«?”ï¿½ê± ç’ëº£ë¾?¾ï¿½???ï¿½ë›¾ï¿½ë£†ï§?°ì­???ï¿½ëª´?¨ë£¸??? ??ï¿½ìŠ¢ï¿½ì ??</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="radar-logic">
            <h3 className="gold"><Zap size={18} /> NANO LOGIC</h3>
            <p className="logic-p">???¥â–²êºè‚„ï¿?è¢â‘¸ì¦?ï¿½ï¿½????????ï¿½ï¿½ï¿??‘ï¿½?? 1?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½????ï¿½ë¿™ç­Œï¿½??<strong>[?²ê¾§?—ï¿½ë«???????æºë†ì¾?</strong>??<strong>[?²ï¿½??ï¿½ï¿½ï¿½ë›¾???ï¿½ëª´æ´¹ï¼¢ï¿?</strong>???ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½???ç­Œëš¯??‚‰ï¿??ï¿½ì”ˆï¿½ìˆ????ï¿½ë„­?¨ï½‹??????ï¿½ï¿½?¥ï¿½ï¿½è«­ï¿?????ï¦«ï¿½? ?æ¿¡ã‚???ï¿½ï¿½?¥ï¿½?¬íˆ—??ï¿½ï¿½???ï¿½ëœ„ï¿½ë ¡.</p>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .radar-page-container { padding: 30px; display: flex; flex-direction: column; gap: 30px; color: white; }
        .radar-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .radar-title { font-size: 2.2rem; font-weight: 900; display: flex; align-items: center; gap: 16px; }
        .radar-subtitle { color: var(--text-muted); margin-top: 8px; font-weight: 600; }
        
        .header-actions { display: flex; gap: 20px; align-items: center; }
        .market-selector { display: flex; padding: 4px; border-radius: 12px; }
        .m-tab { padding: 8px 16px; border: none; background: none; color: #64748b; font-size: 0.8rem; font-weight: 800; cursor: pointer; border-radius: 8px; transition: all 0.2s; }
        .m-tab.active { background: white; color: black; }

        .sync-btn { background: var(--primary); color: black; border: none; padding: 10px 24px; border-radius: 10px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .radar-grid { display: grid; grid-template-columns: 1fr 340px; gap: 30px; }
        
        .banana-list { display: flex; flex-direction: column; gap: 16px; }
        .banana-card { padding: 20px 30px; display: flex; align-items: center; gap: 30px; }
        
        .banana-visual { position: relative; width: 80px; display: flex; flex-direction: column; align-items: center; }
        .banana-icon { font-size: 3rem; position: relative; }
        .ripeness-overlay { position: absolute; top: 0; left: 0; width: 100%; background: rgba(0,0,0,0.5); mix-blend-mode: saturation; pointer-events: none; transition: height 1s; }
        .ripeness-percent { margin-top: 8px; font-weight: 900; font-size: 1.1rem; }

        .banana-info { flex: 1; display: flex; flex-direction: column; gap: 15px; }
        .info-top { display: flex; align-items: center; gap: 15px; }
        .b-ticker { font-size: 1.6rem; font-weight: 900; }
        .b-status { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; }
        
        .info-bottom { display: flex; gap: 30px; }
        .price-box { display: flex; flex-direction: column; gap: 4px; }
        .p-label { font-size: 0.6rem; font-weight: 800; color: #64748b; }
        .p-val { font-size: 1.1rem; font-weight: 900; font-family: 'Fira Code', monospace; }

        .harvest-btn { background: #fbbf24; color: black; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 900; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .waiting-tag { color: #64748b; font-size: 0.8rem; font-weight: 800; }

        .radar-side { display: flex; flex-direction: column; gap: 30px; }
        .legend-card, .radar-logic { padding: 24px; }
        .legend-card h3, .radar-logic h3 { font-size: 0.9rem; font-weight: 900; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        
        .legend-items { display: flex; flex-direction: column; gap: 20px; }
        .l-item { display: flex; gap: 15px; }
        .l-dot { width: 12px; height: 12px; border-radius: 50%; margin-top: 4px; }
        .l-dot.green { background: #4ade80; }
        .l-dot.yellow { background: #fde047; }
        .l-dot.gold { background: #fbbf24; }
        
        .l-text strong { font-size: 0.85rem; color: white; display: block; margin-bottom: 2px; }
        .l-text p { font-size: 0.75rem; color: #64748b; font-weight: 600; line-height: 1.4; }

        .logic-p { font-size: 0.85rem; line-height: 1.6; color: #cbd5e1; font-weight: 600; }

        .gold { color: var(--primary); }
        .empty-banana { padding: 100px; text-align: center; color: #475569; font-weight: 800; }
        
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
}
