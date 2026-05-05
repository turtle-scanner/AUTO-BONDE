const fs = require('fs');
const path = 'c:\\3.bonde web\\v6_terminal\\app\\layout.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add Lucide imports to layout if needed
if (!content.includes('Zap')) {
    content = content.replace("import { useState } from \"react\";", "import { useState } from \"react\";\nimport { Zap, Activity, Globe } from \"lucide-react\";");
}

// Add Baby Banners into the layout
const contentAreaSearch = '<div className="content-area">';
const babyBannersJsx = `
            <div className="content-area">
              <div className="global-baby-banners">
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

content = content.replace(contentAreaSearch, babyBannersJsx);

// Add CSS to layout or globals.css? I'll add to layout style tag if it exists or globals.css
// Layout doesn't have a style tag yet. I'll add one.
const bodyEndSearch = '</body>';
const styleTag = `
        <style jsx global>{\`
          .global-baby-banners {
            margin-bottom: 25px;
            display: none; /* Hidden by default, shown on specific pages or if you want it everywhere */
          }
          /* Show it only on dashboard and academy pages for now, or everywhere if you prefer */
          :global(.platinum-dashboard) .global-baby-banners,
          :global(.radar-page-container) .global-baby-banners {
            display: block;
          }

          .baby-banners-v-stack {
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 280px;
            position: fixed;
            top: 100px;
            right: 30px;
            z-index: 100;
          }

          .baby-banner-item {
            padding: 12px 18px;
            display: flex;
            align-items: center;
            gap: 12px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 14px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            background: rgba(20, 20, 25, 0.7);
            backdrop-filter: blur(10px);
          }

          .baby-banner-item:hover {
            border-color: #d4af37;
            background: rgba(212, 175, 55, 0.1);
            transform: translateX(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          }

          .baby-label {
            width: 22px;
            height: 22px;
            background: #d4af37;
            color: black;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            font-size: 0.7rem;
            font-weight: 900;
            text-transform: uppercase;
          }

          .baby-text {
            flex: 1;
            font-size: 0.7rem;
            font-weight: 800;
            color: #e2e8f0;
            letter-spacing: 0.05em;
          }

          .gold { color: #d4af37; }

          @media (max-width: 1400px) {
            .baby-banners-v-stack {
              position: static;
              width: 100%;
              flex-direction: row;
              margin-bottom: 20px;
            }
            .baby-banner-item { flex: 1; }
          }

          @media (max-width: 768px) {
            .baby-banners-v-stack {
              flex-direction: column;
            }
          }
        \`}</style>
      </body>`;

content = content.replace(bodyEndSearch, styleTag);

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated layout.tsx');
