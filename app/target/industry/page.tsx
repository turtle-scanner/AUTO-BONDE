"use client";

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/GlassCard';
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Factory, Flame, Snowflake } from 'lucide-react';

interface IndustryItem {
  rank: number;
  industry: string;
  day_chg: string;
  week_chg: string;
  month_chg: string;
  three_month_chg: string;
  six_month_chg: string;
  count: string;
  stocks: string;
}

const fmt = (v: string) => {
  if (!v) return { positive: false, num: 0 };
  const num = parseFloat(v.replace('%', ''));
  return { positive: num >= 0, num };
};

export default function IndustryPage() {
  const [data, setData] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  useEffect(() => {
    fetch('/data/industry_ranking.json')
      .then(res => res.json())
      .then((d: IndustryItem[]) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const hotSectors = data.filter(d => fmt(d.six_month_chg).num > 20);
  const coldSectors = data.filter(d => fmt(d.six_month_chg).num < -10);
  const top10 = data.slice(0, 10);

  return (
    <div className="ind-container animate-fade-in">
      <div className="section-header">
        <h1 className="gradient-text">3-d. [ INDUSTRY ] ??ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½????¨ì€ªë®ˆ ?ï¿½ë‡¡ï¿½ìŠ£ç¶?¿½??/h1>
        <p className="subtitle">??? ???ï¿½êº‚?„ï¿½ ????¨ëº£ë¹????ï¿½ë?è¸°ì¢‘ì­??‡ï¿½?{data.length}????ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½ ?ï¿½ë›¾?ï¿½ê¶–???‡ï¿½?6?ï¿½ì”ˆ?·ë‰“ì§??????ï¿½ì”ˆ?·ë…»ë¦°é†«ê·£ì???ï¿½êºï¿½ì???</p>
      </div>

      {/* ??ç­Œë??£æ²…ï¿????ï¿½ê¶¡ï¿½ëµ£??*/}
      <div className="temp-grid">
        <GlassCard className="temp-card hot-card">
          <Flame size={24} className="temp-icon hot" />
          <div className="temp-label">???HOT ?ï¿½ë›¾?ï¿½ê¶–??(6M &gt; +20%)</div>
          <div className="temp-count">{hotSectors.length}??/div>
          <div className="temp-list">
            {hotSectors.slice(0, 5).map((s, i) => (
              <span key={i} className="temp-tag hot">{s.industry} ({s.six_month_chg})</span>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="temp-card cold-card">
          <Snowflake size={24} className="temp-icon cold" />
          <div className="temp-label">?ï¿½ë„­?¨ë¡«ë¿«ï¿½ë¹?COLD ?ï¿½ë›¾?ï¿½ê¶–??(6M &lt; -10%)</div>
          <div className="temp-count">{coldSectors.length}??/div>
          <div className="temp-list">
            {coldSectors.slice(0, 5).map((s, i) => (
              <span key={i} className="temp-tag cold">{s.industry} ({s.six_month_chg})</span>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* TOP 10 ???ï¿½ë–¦?¾ï¿½?????²ãƒ«?“å ‰ê³ë•Ÿ??*/}
      <GlassCard className="chart-card" title="TOP 10 ??ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½ ??6?ï¿½ì”ˆ?·ë‰“ì§????ï¿½ëª´?¨ë£¸???>
        <div className="bar-chart">
          {top10.map((item, i) => {
            const sixM = fmt(item.six_month_chg);
            const maxVal = fmt(top10[0]?.six_month_chg || '0').num || 1;
            const width = Math.min(100, (sixM.num / maxVal) * 100);
            return (
              <div key={i} className="bar-row">
                <span className="bar-rank">#{item.rank}</span>
                <span className="bar-industry">{item.industry}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${width}%` }}>
                    <span className="bar-value">{item.six_month_chg}</span>
                  </div>
                </div>
                <span className="bar-count">{item.count}??ï¿½êºï¿½ê¼¤??/span>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* ?ï¿½ë„­?¨ï½‹ì³?????ï¿½ï¿½ï¿??*/}
      <GlassCard className="table-card">
        <div className="table-header-row">
          <span className="th rank-col">??ç­Œë??¡å½›ï¿?/span>
          <span className="th ind-col">??ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½</span>
          <span className="th cnt-col">??ï¿½êºï¿½ê¼¤???/span>
          <span className="th chg-col">???é¤¨ï¿½??/span>
          <span className="th chg-col">?ï¿½êµï¿½ë’©?ï¿½ë´»ï¿½ï¿½?/span>
          <span className="th chg-col">???‰ë¨®???/span>
          <span className="th chg-col">3?ï¿½ì”ˆ?·ë‰“ì§??/span>
          <span className="th chg-col hl">6?ï¿½ì”ˆ?·ë‰“ì§??/span>
        </div>
        {loading ? (
          <div className="loading-state">??ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼?????ï¿½ì‰µ?¾ï¿½??æ¿šï¿½?..</div>
        ) : (
          data.map((item, i) => (
            <React.Fragment key={i}>
              <div className={`table-row ${i < 3 ? 'top3' : ''} ${i % 2 === 0 ? 'even' : ''} ${fmt(item.six_month_chg).num < 0 ? 'negative-row' : ''}`}
                onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                <span className="td rank-col">#{item.rank}</span>
                <span className="td ind-col ind-text">{item.industry}</span>
                <span className="td cnt-col">{item.count}</span>
                <span className={`td chg-col ${fmt(item.day_chg).positive ? 'up' : 'down'}`}>{item.day_chg}</span>
                <span className={`td chg-col ${fmt(item.week_chg).positive ? 'up' : 'down'}`}>{item.week_chg}</span>
                <span className={`td chg-col ${fmt(item.month_chg).positive ? 'up' : 'down'}`}>{item.month_chg}</span>
                <span className={`td chg-col ${fmt(item.three_month_chg).positive ? 'up' : 'down'}`}>{item.three_month_chg}</span>
                <span className={`td chg-col hl ${fmt(item.six_month_chg).positive ? 'up' : 'down'}`}>{item.six_month_chg}</span>
              </div>
              {expandedRow === i && (
                <div className="expanded-row">
                  <span className="expanded-label">??????ï¿½êºï¿½ê¼¤??</span>
                  <span className="expanded-stocks">{item.stocks}</span>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </GlassCard>

      <div className="tactical-notes glass">
        <h3>[ BONDE'S TACTICAL NOTES ]</h3>
        <ul>
          <li>???ï¿½ì”ˆ?·ë…»ë¦°ï¿½?ƒï¿½?€???ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½??ï¿½ìŠ§ï¿½ï¿½ç¯€?‡ë©???ï¿½ì”ˆ?·ë…»ë¦°ï¿½?ƒï¿½?€???ï¿½êºï¿½ê¼¤?????ï¿½ëª´?¨ëŒ„??? ??ï¿½ë¼¨?1????ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½???ï¿½êµï¿½ë’©?????¥ï¿½?ï¿½ëŸ¡.</li>
          <li>????ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½ ?ï¿½ë„­?¨ï½‹ì³??˜ï§Œï¿?ï¿½ëŸ¾ï¿½ï¿½ ???²ãƒ«?£ï¿½???????ï¿½ë›¾ï¿½ë£†ï§?¿½????ï¿½ì”ˆï¿½ìˆ????äº?»‹ê¼?¶­ë½©ì †?</li>
          <li>????ï¿½êº‚ï¿½ë€????¥â–²êº‚ï§¥ï¿???ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½??1?æ¿šë°¸Å¦ï¿½êº?èª˜Î¼ë…ƒ?Ÿï¿½????æ¿šë°¸Å¦ï¿½êºŠ????¥â–²êº‚ï§¥ï¿???ï¿½ë«ï¿½ï¿½ï¿½êºƒ?¾ï¿½??2?æ¿šë°¸Å¦ï¿½êº?èª˜ã…»ì¨?ï¿½ëŸ¾ï¿½ï¿½ ??ï¿½ëª´?¨ë£°?????¥â–²êºƒï¿½ëµ????ï¿½ëœ„ï¿½ë ¡.</li>
        </ul>
      </div>

      <style jsx>{`
        .ind-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; }
        .section-header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .subtitle { color: var(--text-muted); font-family: 'Orbitron', sans-serif; letter-spacing: 1px; }

        .temp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .temp-card { padding: 24px; border: 1px solid var(--card-border); }
        .hot-card { border-color: rgba(239,68,68,0.2); }
        .cold-card { border-color: rgba(59,130,246,0.2); }
        .temp-icon.hot { color: #ef4444; }
        .temp-icon.cold { color: #3b82f6; }
        .temp-label { font-size: 0.9rem; font-weight: 800; color: white; margin-top: 8px; }
        .temp-count { font-size: 2rem; font-weight: 900; color: white; margin: 8px 0; }
        .temp-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .temp-tag { font-size: 0.65rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; }
        .temp-tag.hot { background: rgba(239,68,68,0.1); color: #ef4444; border: 1px solid rgba(239,68,68,0.2); }
        .temp-tag.cold { background: rgba(59,130,246,0.1); color: #3b82f6; border: 1px solid rgba(59,130,246,0.2); }

        .chart-card { padding: 28px; }
        .bar-chart { display: flex; flex-direction: column; gap: 10px; }
        .bar-row { display: flex; align-items: center; gap: 12px; }
        .bar-rank { width: 30px; font-size: 0.7rem; font-weight: 900; color: var(--primary); }
        .bar-industry { width: 160px; font-size: 0.75rem; font-weight: 700; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .bar-track { flex: 1; height: 24px; background: rgba(255,255,255,0.03); border-radius: 4px; overflow: hidden; }
        .bar-fill { height: 100%; background: linear-gradient(to right, #8b5cf6, #06b6d4); border-radius: 4px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; min-width: 60px; transition: width 0.8s ease; }
        .bar-value { font-size: 0.7rem; font-weight: 900; color: white; }
        .bar-count { width: 50px; font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-align: right; }

        .table-card { padding: 0; overflow-x: auto; }
        .table-header-row { display: flex; padding: 14px 20px; background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--card-border); min-width: 800px; }
        .th { font-size: 0.65rem; font-weight: 900; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; }
        .table-row { display: flex; padding: 12px 20px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.02); cursor: pointer; transition: background 0.2s; min-width: 800px; }
        .table-row:hover { background: rgba(139,92,246,0.03); }
        .table-row.even { background: rgba(255,255,255,0.01); }
        .table-row.top3 { background: rgba(251,191,36,0.03); }
        .table-row.negative-row { opacity: 0.7; }
        .td { font-size: 0.8rem; font-weight: 600; color: white; }
        .rank-col { width: 50px; flex-shrink: 0; }
        .ind-col { width: 180px; flex-shrink: 0; }
        .cnt-col { width: 60px; flex-shrink: 0; }
        .chg-col { width: 70px; flex-shrink: 0; font-size: 0.75rem; font-weight: 800; }
        .ind-text { font-weight: 800; }
        .up { color: #ef4444; }
        .down { color: #3b82f6; }
        .hl { font-weight: 900 !important; }

        .expanded-row { padding: 10px 20px 16px 82px; background: rgba(139,92,246,0.05); border-bottom: 1px solid rgba(139,92,246,0.1); min-width: 800px; }
        .expanded-label { font-size: 0.7rem; font-weight: 900; color: #8b5cf6; margin-right: 8px; }
        .expanded-stocks { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; word-break: break-all; }

        .loading-state { padding: 60px; text-align: center; color: var(--text-muted); font-weight: 800; }
      `}</style>
    </div>
  );
}
