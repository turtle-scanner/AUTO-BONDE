const fs = require('fs');
const path = 'c:\\3.bonde web\\v6_terminal\\app\\academy\\radar\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports if missing (Zap, Activity, Globe are already used or needed)
if (!content.includes('Zap')) {
    content = content.replace("import {", "import { Zap, Activity, Globe,");
}

// Add JSX for baby banners
const headerSearch = '<header className="radar-header">';
const headerReplace = `<div className="hero-layout-wrapper" style={{ marginBottom: '30px' }}>
        <div className="hero-card glass" style={{ flex: 1, padding: '40px', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '24px' }}>
          <header className="radar-header">`;

// We also need to close the divs after the header ends. 
// But wait, the banners should be *beside* the hero card.
// Let's look at the structure of radar page.
// It has <div className="radar-page-container">
// Then <header className="radar-header">
// Then <div className="radar-grid">

const newHeaderSection = `
      <div className="hero-layout-wrapper">
        <div className="hero-card glass" style={{ flex: 1, padding: '30px', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(0,0,0,0) 100%)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <header className="radar-header">
            <div className="title-group">
              <h1 className="radar-title">
                <Radio className="gold animate-pulse" size={32} />
                ?熬곣뫖利?占쏙옙???? (TACTICAL HQ)
              </h1>
              <p className="radar-subtitle">?뀐옙??占쏙옙占쎈쎗???占쎈ご域뱄샨占? ?占쎌뵂占쎌쓧????占쎈꽠?⑨퐢?????? 1?占쎈눀占쎌뒩泳?옙???? 占쎈퓳嶺뚳옙??</p>
            </div>
            <div className="header-actions">
              <div className="market-selector glass">
                <button className="m-tab active">US MARKET</button>
                <button className="m-tab">KOREA</button>
              </div>
              <button className="sync-btn" onClick={() => setIsScanning(true)}>
                <Zap size={18} />
                {isScanning ? 'SCANNING...' : '?熬곣뫖利?? 釉먮폁??'}
              </button>
            </div>
          </header>
        </div>

        <div className="baby-banners-v-stack">
          <div className="baby-banner-item glass">
            <span className="baby-label">a</span>
            <span className="baby-text">REAL-TIME SCANNING</span>
            <Zap size={14} className="gold" />
          </div>
          <div className="baby-banner-item glass">
            <span className="baby-label">b</span>
            <span className="baby-text">TACTICAL ANALYSIS</span>
            <Activity size={14} className="gold" />
          </div>
          <div className="baby-banner-item glass">
            <span className="baby-label">c</span>
            <span className="baby-text">GLOBAL STRATEGY</span>
            <Globe size={14} className="gold" />
          </div>
        </div>
      </div>
`;

// Find the header block and replace it
const oldHeaderRegex = /<header className="radar-header">[\s\S]*?<\/header>/;
content = content.replace(oldHeaderRegex, newHeaderSection);

// Add CSS
const cssToAdd = `
        .hero-layout-wrapper { display: grid; grid-template-columns: 1fr 280px; gap: 20px; margin-bottom: 30px; }
        .baby-banners-v-stack { display: flex; flex-direction: column; gap: 12px; }
        .baby-banner-item { 
          padding: 15px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          border: 1px solid rgba(255, 255, 255, 0.05); 
          border-radius: 16px;
          transition: all 0.3s;
          cursor: pointer;
        }
        .baby-banner-item:hover {
          border-color: var(--primary);
          background: rgba(212, 175, 55, 0.1);
          transform: translateX(5px);
        }
        .baby-label {
          width: 24px;
          height: 24px;
          background: var(--primary);
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
        }
        .baby-text {
          flex: 1;
          font-size: 0.75rem;
          font-weight: 800;
          color: white;
          letter-spacing: 0.05em;
        }

        @media (max-width: 1200px) {
          .hero-layout-wrapper { grid-template-columns: 1fr; }
          .baby-banners-v-stack { flex-direction: row; }
          .baby-banner-item { flex: 1; }
        }
        @media (max-width: 768px) {
          .baby-banners-v-stack { flex-direction: column; }
        }
`;

content = content.replace('.radar-page-container {', cssToAdd + '\n        .radar-page-container {');

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated radar/page.tsx');
