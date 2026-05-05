const fs = require('fs');
const path = 'c:\\3.bonde web\\v6_terminal\\app\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace JSX
const oldJsx = `      {/* Top Section: Strategic Hero */}
      <div className="strategic-hero">
        <GlassCard className="hero-card">
          <div className="hero-content">
            <div className="hero-visual">
              <div className="dragonfly-logo-box">
                <img src="/dragonfly4.png" alt="Dragonfly" className="dragonfly-logo" />
              </div>
              <div className="radar-waves">
                <div className="wave"></div>
                <div className="wave delay-1"></div>
                <div className="wave delay-2"></div>
              </div>
            </div>
            <div className="hero-text">
              <h1 className="hero-title">PLATINUM COMMAND CENTER</h1>
              <p className="hero-subtitle">SYSTEM STATUS: <span className="status-up">OPTIMAL</span> | OPERATOR: CAPTAIN BONDE</p>
              <div className="hero-badges">
                <div className="badge gold">V6.0 PLATINUM</div>
                <div className="badge secure">SECURE LINK ESTABLISHED</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>`;

const newJsx = `      {/* Top Section: Strategic Hero with Baby Banners */}
      <div className="strategic-hero">
        <div className="hero-layout-wrapper">
          <GlassCard className="hero-card">
            <div className="hero-content">
              <div className="hero-visual">
                <div className="dragonfly-logo-box">
                  <img src="/dragonfly4.png" alt="Dragonfly" className="dragonfly-logo" />
                </div>
                <div className="radar-waves">
                  <div className="wave"></div>
                  <div className="wave delay-1"></div>
                  <div className="wave delay-2"></div>
                </div>
              </div>
              <div className="hero-text">
                <h1 className="hero-title">PLATINUM COMMAND CENTER</h1>
                <p className="hero-subtitle">SYSTEM STATUS: <span className="status-up">OPTIMAL</span> | OPERATOR: CAPTAIN BONDE</p>
                <div className="hero-badges">
                  <div className="badge gold">V6.0 PLATINUM</div>
                  <div className="badge secure">SECURE LINK ESTABLISHED</div>
                </div>
              </div>
            </div>
          </GlassCard>

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
      </div>`;

content = content.replace(oldJsx, newJsx);

// Add CSS
const oldCss = `.strategic-hero { width: 100%; }`;
const newCss = `.strategic-hero { width: 100%; }
        .hero-layout-wrapper { display: grid; grid-template-columns: 1fr 280px; gap: 20px; }
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
        }`;

content = content.replace(oldCss, newCss);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated page.tsx');
