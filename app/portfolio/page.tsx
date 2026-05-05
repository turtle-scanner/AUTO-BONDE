"use client";

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { Shield, Wallet, Calculator, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  const [balance, setBalance] = useState(128450000);
  const [riskPct, setRiskPct] = useState(1);
  const [entryPrice, setEntryPrice] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);

  const calculatePositionSize = () => {
    if (entryPrice <= 0 || stopLoss <= 0 || entryPrice <= stopLoss) return 0;
    const riskAmount = balance * (riskPct / 100);
    const riskPerShare = entryPrice - stopLoss;
    return Math.floor(riskAmount / riskPerShare);
  };

  const posSize = calculatePositionSize();

  return (
    <div className="portfolio-container animate-fade-in">
      <div className="section-header">
        <h1><span className="tag">[ RISK ]</span> 4. ?ï¿½ë„­?¨ï½‹ì³??????Ÿë°¸Å¦?Šì–•ì§????ï¿½ë®ï¿½ï¿½??/h1>
        <p className="subtitle">??ï¿½ëŒ–?¨ëº£?¼é‡ï¿? ???? ??????ï¿½ë„­?¨Îºë±????????????ï¿½ë„«?¾ï¿½???ï¿½ë„­?¨ï½‹ì³??????«ë¡«??/p>
      </div>

      <div className="portfolio-grid">
        {/* Asset Summary */}
        <div className="left-side">
          <GlassCard className="asset-card highlight-card">
            <div className="card-header">
              <h3><Wallet size={20} className="gold" /> [ ASSET ] KIS ????¨ëº£ë¹?????? ???‰ï¿½???/h3>
              <div className="status-badge">LIVE SYNC</div>
            </div>
            
            <div className="asset-main">
              <div className="asset-item">
                <span className="label">???°ê¶½?´ì¿????¬ê³ï¿??ï¿½ë™´ï¿½ê¶ ï¿½ï¿½?(?????²ãƒ«?£é®?Œëœ®è¹‚ì¢Šì¨?ï¿½ë¼”ç³?</span>
                <span className="account">4654-****-01</span>
              </div>
              <div className="asset-value">
                <span className="amount">??{balance.toLocaleString()}</span>
                <span className="change positive">??2.4% (???ï¿½ë‚ï§¥ï¿½)</span>
              </div>
              <hr className="divider" />
              <div className="power-section">
                <span className="label">[ TOTAL POWER ] ?²ãƒ«??¿½ëµ????ï¿½ì”ˆï¿½ìˆ???ï¿½ë®ƒï¿½ë??/span>
                <span className="amount-usd">$ 42,850.00</span>
                <span className="fx-rate">* ????¨ëº£ë¹????ï¿½ëª´?¨ë£¹ì¾?1,400.0???ï¿½êºï¿½ì???</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard title="Risk Management Protocol" className="protocol-card">
            <div className="protocol-list">
              <div className="protocol-item">
                <Shield size={16} className="gold" />
                <span>?²ãƒ«?”ï¿½ê± ç’ï¿? ???æºë‚…ì¸????ï¿½ì †? ??ç¯€??³®è¾±ï¿½??ï¿½ë¿™ï¿½ëœ®ï¿½ê¼³ï¿½ë???1% ?…ï¿½?¿ë—ª?¬ç­Œï¿½ï¿½?šï¿½ë§????</span>
              </div>
              <div className="protocol-item">
                <Shield size={16} className="gold" />
                <span>?ï¿½ì”ˆ?·ë‰“ì§????ï¿½êºï¿½ê¼¤?????ï¿½ë–£ï¿½ë€? ?²ãƒ«?”ï¿½ê± ç’ï¿? 25% ????…ï¿½????ï¿½êº‚ï¿½ëµ²</span>
              </div>
              <div className="protocol-item">
                <AlertTriangle size={16} className="alert-red" />
                <span>???????ç¹¹ë¨®?ï¿½?? 7~8% ???ç­Œï¿½??²ãƒ«??¿½ëµ?ï¿½ë¿ï¿½ì???????æ¿šìšŒê¼¬è£•ë¼˜ï¿½??/span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Risk Calculator */}
        <div className="right-side">
          <GlassCard className="calculator-card">
            <div className="card-header">
              <h3><Calculator size={20} className="gold" /> [ CALC ] ????????ï¿½ë„«?¾ï¿½????ç¯€??³®?…ï¿½ï¿½êµï¿½ì¡ï¿½ëˆ§?/h3>
            </div>
            
            <div className="calc-inputs">
              <div className="input-group">
                <label>??ç¯€??³®è¾±ï¿½??ï¿½ë¿™ï¿½ëœ®ï¿½ê¼³ï¿½ë??(KRW)</label>
                <input type="number" value={balance} onChange={(e) => setBalance(Number(e.target.value))} />
              </div>
              <div className="input-group">
                <label>?ï¿½ë„­?¨Îºë°???ï¿½ì”ˆ?·ë†ƒ????????(%)</label>
                <select value={riskPct} onChange={(e) => setRiskPct(Number(e.target.value))}>
                  <option value={0.5}>0.5% (??¨ëš®?????</option>
                  <option value={1}>1.0% (???)</option>
                  <option value={2}>2.0% (??ï¿½ë‡????</option>
                </select>
              </div>
              <div className="input-group">
                <label>?²ãƒ«?£ï¿½?????ï¿½ì”ˆï¿½ìˆ???($)</label>
                <input type="number" placeholder="?? 924.50" onChange={(e) => setEntryPrice(Number(e.target.value))} />
              </div>
              <div className="input-group">
                <label>??????ï¿½ì”ˆï¿½ìˆ???($)</label>
                <input type="number" placeholder="?? 850.00" onChange={(e) => setStopLoss(Number(e.target.value))} />
              </div>
            </div>

            <div className="calc-result">
              <div className="result-item">
                <span className="label">????Ÿë°¸Å¦?Šì–•ì§???ï¿½êº‚ï¿½ï¿½ï¿½ï¿½?ï¿½ë‹ï¿½ë??/span>
                <span className="val alert-red">??{(balance * (riskPct / 100)).toLocaleString()}</span>
              </div>
              <div className="result-main">
                <span className="label">?ï¿½ï¿½?¤ë² æ¯“ï¿½???²ãƒ«??¿½ëµ??????¥ï¿½?ï¿½ì</span>
                <span className="val gold">{posSize} <span className="unit">SHARES</span></span>
              </div>
            </div>

            <button className="calc-action-btn">
              ??ç¯€??³®?…ï¿½??æ¿¡ã‚??????ï¿½ë?ï§?¿½??<ArrowRight size={16} />
            </button>
          </GlassCard>
        </div>
      </div>

      <style jsx>{`
        .portfolio-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .tag { color: var(--primary); font-weight: 900; }
        .subtitle { color: var(--text-muted); margin-top: 8px; }
        
        .portfolio-grid { display: grid; grid-template-columns: 1fr 400px; gap: 30px; }
        .left-side, .right-side { display: flex; flex-direction: column; gap: 30px; }
        
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .card-header h3 { font-size: 1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; }
        
        .status-badge { font-size: 0.65rem; font-weight: 900; color: #10b981; background: rgba(16, 185, 129, 0.1); padding: 4px 10px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.2); }
        
        .asset-main { display: flex; flex-direction: column; gap: 20px; }
        .asset-item { display: flex; flex-direction: column; gap: 4px; }
        .asset-item .label { font-size: 0.8rem; color: var(--primary); font-weight: 800; }
        .asset-item .account { font-size: 0.9rem; color: var(--text-muted); font-family: 'Fira Code', monospace; }
        
        .asset-value { display: flex; align-items: baseline; gap: 15px; }
        .asset-value .amount { font-size: 2.2rem; font-weight: 900; letter-spacing: -1px; }
        .asset-value .change { font-size: 0.9rem; font-weight: 700; }
        .positive { color: #10b981; }
        
        .divider { border: 0; border-top: 1px solid rgba(255,255,255,0.05); margin: 10px 0; }
        
        .power-section { display: flex; flex-direction: column; gap: 6px; }
        .power-section .label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
        .power-section .amount-usd { font-size: 1.5rem; font-weight: 900; color: white; }
        .power-section .fx-rate { font-size: 0.7rem; color: rgba(255,255,255,0.3); }
        
        .protocol-list { display: flex; flex-direction: column; gap: 16px; }
        .protocol-item { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; font-weight: 600; color: #e2e8f0; }
        
        .calc-inputs { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
        .input-group { display: flex; flex-direction: column; gap: 8px; }
        .input-group label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
        .input-group input, .input-group select { 
          background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); 
          padding: 12px; border-radius: 8px; color: white; font-weight: 700; outline: none;
        }
        .input-group input:focus { border-color: var(--primary); }
        
        .calc-result { background: rgba(0,0,0,0.3); padding: 20px; border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.1); margin-bottom: 20px; }
        .result-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.85rem; }
        .result-main { display: flex; justify-content: space-between; align-items: baseline; border-top: 1px dashed rgba(255,255,255,0.1); pt: 12px; }
        .result-main .val { font-size: 1.8rem; font-weight: 900; }
        .result-main .unit { font-size: 0.8rem; opacity: 0.5; }
        
        .calc-action-btn { 
          width: 100%; padding: 14px; background: var(--primary); color: black; 
          border: none; border-radius: 8px; font-weight: 900; cursor: pointer; 
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        
        .alert-red { color: #ef4444; }
        .gold { color: var(--primary); }

        @media (max-width: 1024px) {
          .portfolio-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
