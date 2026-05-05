"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Radar, 
  Target, 
  Library, 
  ChevronRight, 
  Zap, 
  Volume2, 
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Search,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

interface ScannedStock {
  id: number;
  ticker: string;
  market: string;
  sector: string;
  setup: string;
  rs: number;
  roe: string;
  price: string;
  entry: string;
  stopLoss: string;
  volume: string;
  status: string;
}

export default function TargetScanPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [stocks, setStocks] = useState<ScannedStock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<ScannedStock[]>([]);
  const [marketFilter, setMarketFilter] = useState<'ALL' | 'US' | 'KR'>('ALL');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    performScan();
  }, []);

  useEffect(() => {
    let result = stocks;
    if (marketFilter !== 'ALL') {
      result = result.filter(s => s.market === marketFilter);
    }
    if (searchTerm) {
      result = result.filter(s => s.ticker.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredStocks(result);
  }, [marketFilter, stocks, searchTerm]);

  const performScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/v6-api/target-scan');
      const data = await res.json();
      setStocks(data);
    } catch (err) {
      console.error("Scan failed", err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="scan-page-container animate-fade-in">
      <div className="section-header">
        <div className="header-top">
          <h1 className="gradient-title">
            <Radar className={`title-icon ${isScanning ? 'animate-spin' : ''}`} />
            3-a. [ SCAN ] ??¨ëš®?–ç­Œï¿????ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»?200??          </h1>
          <div className="scanner-badges">
            <span className="badge rs">RS 90+ ONLY</span>
            <span className="badge roe">ROE 20%+ ONLY</span>
          </div>
        </div>
        <p className="subtitle">High RS + High ROE ?ï¿½êºï¿½ì??ï¿½ë„ï¿½ï¿½???¨ëš®?–ç­Œï¿??Qullamaggie) ?ï¿½ë„­?¨ï½‹ì³??????¨ëº£ë¹?????ï¿½ë‚?‰ï¿½</p>
      </div>

      <div className="control-bar glass">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="TICKER ?æ¿¡ã‚????.." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button className={`filter-btn ${marketFilter === 'ALL' ? 'active' : ''}`} onClick={() => setMarketFilter('ALL')}>ALL</button>
          <button className={`filter-btn ${marketFilter === 'US' ? 'active' : ''}`} onClick={() => setMarketFilter('US')}>US MARKET</button>
          <button className={`filter-btn ${marketFilter === 'KR' ? 'active' : ''}`} onClick={() => setMarketFilter('KR')}>KR MARKET</button>
        </div>
        <button className="scan-trigger" onClick={performScan} disabled={isScanning}>
          <RefreshCw size={18} className={isScanning ? 'animate-spin' : ''} />
          {isScanning ? 'SCANNING...' : 'DEEP SCAN START'}
        </button>
      </div>

      <div className="scanner-results glass">
        <div className="results-header">
          <div className="h-cell">TICKER</div>
          <div className="h-cell">MARKET</div>
          <div className="h-cell">RS</div>
          <div className="h-cell">ROE</div>
          <div className="h-cell">SETUP</div>
          <div className="h-cell gold">ENTRY (?²ãƒ«??¿½ëµ???ç­Œï¿½?)</div>
          <div className="h-cell red">STOP (????ï¿½ìŠ†ï§Œï¿½?ï¿½ëŸ¾ï¿½ï¿½)</div>
          <div className="h-cell">VOL</div>
          <div className="h-cell">ACTION</div>
        </div>
        
        <div className="results-list">
          {filteredStocks.map((stock) => (
            <div key={stock.id} className="stock-row">
              <div className="cell ticker">
                <span className="t-code">{stock.ticker}</span>
                <span className="t-sector">{stock.sector}</span>
              </div>
              <div className="cell">
                <span className={`m-tag ${stock.market.toLowerCase()}`}>{stock.market}</span>
              </div>
              <div className="cell rs-val">{stock.rs}</div>
              <div className="cell roe-val">{stock.roe}%</div>
              <div className="cell setup-tag">{stock.setup}</div>
              <div className="cell entry-val">{stock.entry}</div>
              <div className="cell stop-val">{stock.stopLoss}</div>
              <div className="cell vol-val">{stock.volume}</div>
              <div className="cell">
                <button className="trade-btn"><ArrowUpRight size={14} /> ORDER</button>
              </div>
            </div>
          ))}
          {filteredStocks.length === 0 && !isScanning && (
            <div className="empty-results">??‰ëš°ï¿½ï¿½?ï¿½ï¿½ï¿½ï§Œï¿???²ãƒ«??¿½ëµ????ï¿½êµï¿½ë’©?ï§’ãƒ«?€?¬ê³£?§ï¿½ë»?? ??ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡.</div>
          )}
        </div>
      </div>

      <div className="tactical-notes-grid">
        <GlassCard className="notes-card">
          <h3><ShieldAlert size={20} className="gold" /> BONDE'S SCANNER PROTOCOL</h3>
          <ul>
            <li>??<strong>RS (Relative Strength)</strong>: ??ç­Œë??£æ²…ï¿??¨ëš®?????ï¿½ì”ˆ?·ë…»ë¦°ï¿½?ƒï¿½?€??ï¿½???ï¿½ë?ï§?ˆ????¥â–²êº‚ï§¥ï¿???ï¿½êºï¿½ê¼¤????ï¿½ë¹Š??²ãƒ«?£ï¿½?³ç­Œ?»Ä¿ï¿½????¥ï¿½?ï¿½ëŸ¡.</li>
            <li>??<strong>ROE (Return on Equity)</strong>: ?????‰ë¨®?ï¿½ï¿½ï¿½?ï¦«ëš®?ï¿½ë«’ï¿½ï¿½ï¿½????·ëª„êµ£ç­Œë¬’ì¥‰ï¿½ë‡²?ï¿½ê¼¶?????æ¿šë°¸Å¦ï¿½êºŠ????²ãƒ«?£ï¿½?????ï¦«ëš®Ä²ï¿½ê± ï¿½ï¿½ï¿???¥ï¿½?ï¿½ëŸ¡.</li>
            <li>??<strong>Stop Loss</strong>: 4% ??ï¿½ï¿½?¤ì±¶ï¿½ëˆ???????¬ê³£ë«€?„ï¿½??????ï¿½ìŠƒï¿½ë’™???Ÿë°¸Å¦?Šì–•ì§??? ?ï¿½ì˜“åª›ï¿½?¶ï¿½?ï¿½ì??¬ê³»?£è‚‰ï¿????ï¿½êº‚ï¿½ëµ²???¥ï¿½?ï¿½ëŸ¡.</li>
            <li>??<strong>Volume</strong>: ??ï¿½ï¿½?¤ë²¡ï¿½êºŠ ???²ê¾§?—ï¿½ë«????? ??ç¹¹ë¨®êµ›ï¿½???????²ãƒ«?”ï¿½ê± ç’ï¿??2????ï¿½ï¿½?¤ï¿½ï¿½å½›ï¿??ï¿½ï¿½?¤ï¼™?‘ï¿½????ç­Œë¨²??¿½??</li>
          </ul>
        </GlassCard>
      </div>

      <style jsx>{`
        .scan-page-container { padding: 30px; color: white; display: flex; flex-direction: column; gap: 24px; }
        .header-top { display: flex; justify-content: space-between; align-items: center; }
        .gradient-title { font-size: 2.2rem; font-weight: 900; display: flex; align-items: center; gap: 16px; letter-spacing: -1px; }
        .title-icon { color: var(--primary); }
        .subtitle { color: var(--text-muted); font-weight: 600; margin-top: 4px; }
        
        .scanner-badges { display: flex; gap: 10px; }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 0.7rem; font-weight: 900; border: 1px solid rgba(255,255,255,0.1); }
        .badge.rs { background: rgba(212, 175, 55, 0.1); color: var(--primary); border-color: rgba(212, 175, 55, 0.3); }
        .badge.roe { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-color: rgba(59, 130, 246, 0.3); }

        .control-bar { padding: 16px 24px; display: flex; align-items: center; gap: 20px; border-radius: 12px; }
        .search-box { flex: 1; display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); padding: 10px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }
        .search-box input { background: none; border: none; color: white; outline: none; width: 100%; font-weight: 600; }
        
        .filter-group { display: flex; gap: 8px; }
        .filter-btn { padding: 8px 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 0.75rem; font-weight: 800; color: #64748b; cursor: pointer; }
        .filter-btn.active { background: var(--primary); color: black; border-color: var(--primary); }
        
        .scan-trigger { display: flex; align-items: center; gap: 10px; background: white; color: black; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 900; cursor: pointer; transition: transform 0.2s; }
        .scan-trigger:hover { transform: scale(1.05); }
        .scan-trigger:disabled { opacity: 0.5; }

        .scanner-results { border-radius: 12px; overflow: hidden; min-height: 500px; }
        .results-header { display: grid; grid-template-columns: 2fr 1fr 0.8fr 0.8fr 1.5fr 1.5fr 1.5fr 0.8fr 1fr; padding: 16px 24px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .h-cell { font-size: 0.7rem; font-weight: 900; color: #64748b; text-transform: uppercase; }
        .h-cell.gold { color: var(--primary); }
        .h-cell.red { color: #ef4444; }

        .results-list { height: 600px; overflow-y: auto; }
        .stock-row { display: grid; grid-template-columns: 2fr 1fr 0.8fr 0.8fr 1.5fr 1.5fr 1.5fr 0.8fr 1fr; padding: 18px 24px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); transition: background 0.2s; }
        .stock-row:hover { background: rgba(255,255,255,0.03); }
        
        .cell.ticker { display: flex; flex-direction: column; }
        .t-code { font-weight: 900; color: white; font-size: 1.1rem; }
        .t-sector { font-size: 0.7rem; color: #64748b; }
        
        .m-tag { padding: 2px 6px; border-radius: 4px; font-size: 0.6rem; font-weight: 900; }
        .m-tag.us { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .m-tag.kr { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .rs-val { color: var(--primary); font-weight: 900; font-size: 1.1rem; }
        .roe-val { color: #3b82f6; font-weight: 900; }
        .setup-tag { font-size: 0.75rem; font-weight: 700; background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; width: fit-content; }
        
        .entry-val { font-family: 'Fira Code', monospace; color: var(--primary); font-weight: 800; }
        .stop-val { font-family: 'Fira Code', monospace; color: #ef4444; font-weight: 800; }
        .vol-val { font-weight: 700; color: #10b981; }

        .trade-btn { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 6px 12px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; cursor: pointer; }
        .trade-btn:hover { background: var(--primary); color: black; border-color: var(--primary); }

        .notes-card { padding: 24px; }
        .notes-card h3 { display: flex; align-items: center; gap: 12px; font-weight: 900; margin-bottom: 20px; font-size: 1rem; }
        .notes-card ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .notes-card li { font-size: 0.9rem; font-weight: 600; color: #94a3b8; }
        .notes-card strong { color: white; }

        .empty-results { padding: 100px; text-align: center; color: #475569; font-weight: 800; }
        
        .gold { color: var(--primary); }
      `}</style>
    </div>
  );
}
