\"use client\";

import React, { useState } from \"react\";
import dynamic from \"next/dynamic\";
import MarketHeader from \"@/components/MarketHeader\";
import ErrorBoundary from \"@/components/ErrorBoundary\";
import \"./globals.css\";

// 클라이언트 사이드 컴포넌트 동적 로딩 (하이드레이션 오류 방지)
const Sidebar = dynamic(() => import(\"@/components/Sidebar\"), { ssr: false });
const BGMPlayer = dynamic(() => import(\"@/components/BGMPlayer\"), { ssr: false });
const TacticalPopup = dynamic(() => import(\"@/components/TacticalPopup\"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <html lang=\"ko\">
      <head>
        <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\" />
        <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossOrigin=\"anonymous\" />
        <link href=\"https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;600;800&display=swap\" rel=\"stylesheet\" />
        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0\" />
        <link rel=\"manifest\" href=\"/manifest.json\" />
        <meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />
        <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black-translucent\" />
        <meta name=\"theme-color\" content=\"#d4af37\" />
        <link rel=\"apple-touch-icon\" href=\"/logo.png\" />
      </head>
      <body>
        <div className=\"terminal-overlay\"></div>
        <div className=\"scanlines\"></div>
        
        {/* 시스템 전략 팝업 */}
        <TacticalPopup />
        
        <div className={`layout-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
          {/* 사이드바 메뉴 */}
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          
          {isSidebarOpen && (
            <div className=\"sidebar-backdrop\" onClick={closeSidebar}></div>
          )}

          <main className=\"main-content\">
            <MarketHeader onMenuClick={toggleSidebar} />
            <div className=\"content-area\">
              <ErrorBoundary fallbackName=\"Main Sector\">
                {children}
              </ErrorBoundary>
            </div>
          </main>
          
          {/* BGM 허브 */}
          <ErrorBoundary fallbackName=\"BGM Hub\">
            <BGMPlayer />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
