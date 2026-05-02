import type { Metadata } from "next";
import Link from "next/link";
import BGMPlayer from "@/components/BGMPlayer";
import DigitalClock from "@/components/DigitalClock";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockDragonfly v6.0 | Elite Trading Terminal",
  description: "Next-generation algorithmic trading and market analysis dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="layout-container">
          <aside className="sidebar glass">
            <div className="logo-container">
              <span className="gradient-text logo-text">DRAGONFLY v6.0</span>
            </div>
            <div className="mission-control-header">
              <span className="label">[ MISSION CONTROL ]</span>
            </div>
            <nav className="nav-menu mission-scroll">
              {/* HQ */}
              <div className="nav-group">
                <div className="group-header">[ HQ ] 1. 본부 사령부</div>
                <div className="sub-menu">
                  <Link href="/admin" className="sub-item-link"><div className="sub-item">1-a. [ ADMIN ] 관리자 승인 센터</div></Link>
                  <Link href="/hq/hr" className="sub-item-link"><div className="sub-item">1-b. [ HR ] 본부 인적자원부</div></Link>
                  <Link href="/hq/security" className="sub-item-link"><div className="sub-item">1-c. [ SECURE ] 계정 비번 변경</div></Link>
                  <Link href="/hq/account" className="sub-item-link"><div className="sub-item">1-d. [ EXIT ] 탈퇴 및 임시휴식</div></Link>
                </div>
              </div>

              {/* MARKET */}
              <div className="nav-group">
                <div className="group-header">[ MARKET ] 2. 시장 상황실</div>
                <div className="sub-menu">
                  <Link href="/market/summary" className="sub-item-link"><div className="sub-item">2-a. [ TREND ] 마켓 트렌드 요약</div></Link>
                  <Link href="/market/heatmap" className="sub-item-link"><div className="sub-item">2-b. [ MAP ] 실시간 히트맵</div></Link>
                  <Link href="/market/sentiment" className="sub-item-link"><div className="sub-item">2-c. [ SENTIMENT ] 시장 심리 게이지</div></Link>
                  <Link href="/market/about" className="sub-item-link"><div className="sub-item">2-d. [ ABOUT ] 제작 동기</div></Link>
                  <Link href="/market/news" className="sub-item-link"><div className="sub-item">2-e. [ NEWS ] 실시간 시장 뉴스</div></Link>
                </div>
              </div>

              {/* TARGET */}
              <div className="nav-group">
                <div className="group-header">[ TARGET ] 3. 주도주 추격대</div>
                <div className="sub-menu">
                  <Link href="/target/scan" className="sub-item-link"><div className="sub-item">3-a. [ SCAN ] 주도주 타점 스캐너</div></Link>
                  <Link href="/target/rank" className="sub-item-link"><div className="sub-item">3-b. [ RANK ] 주도주 랭킹 TOP 50</div></Link>
                  <Link href="/target/watchlist" className="sub-item-link"><div className="sub-item">3-c. [ WATCH ] 본대 감시 리스트</div></Link>
                  <Link href="/target/industry" className="sub-item-link"><div className="sub-item">3-d. [ INDUSTRY ] 산업동향(TOP 10)</div></Link>
                  <Link href="/target/rs" className="sub-item-link"><div className="sub-item">3-e. [ RS ] RS 강도(TOP 10)</div></Link>
                </div>
              </div>

              {/* RISK / PORTFOLIO */}
              <Link href="/portfolio" className="nav-item mission-btn">
                <span className="tag">[ RISK ]</span> 4. 전략 및 리스크
              </Link>

              {/* ACADEMY */}
              <div className="nav-group">
                <div className="group-header">[ ACADEMY ] 5. 마스터 훈련소</div>
                <div className="sub-menu">
                  <Link href="/academy/intro" className="sub-item-link"><div className="sub-item">5-a. [ WHOWS ] 본데는 누구인가?</div></Link>
                  <Link href="/academy/study" className="sub-item-link"><div className="sub-item">5-b. [ STUDY ] 주식공부방(차트)</div></Link>
                  <Link href="/academy/radar" className="sub-item-link"><div className="sub-item">5-c. [ RADAR ] 나노바나나 레이더</div></Link>
                  <Link href="/exam" className="sub-item-link"><div className="sub-item">5-d. [ EXAM ] 정기 승급 시험 안내</div></Link>
                  <Link href="/academy/success" className="sub-item-link"><div className="sub-item">5-e. [ SUCCESS ] 실전 익절 자랑방</div></Link>
                  <Link href="/academy/review" className="sub-item-link"><div className="sub-item">5-f. [ REVIEW ] 손실 위로 및 복기방</div></Link>
                </div>
              </div>

              {/* SQUARE */}
              <div className="nav-group">
                <div className="group-header">[ SQUARE ] 6. 안티그래비티 광장</div>
                <div className="sub-menu">
                  <Link href="/square/checkin" className="sub-item-link"><div className="sub-item">6-a. [ CHECK ] 출석체크(오늘한줄)</div></Link>
                  <Link href="/square/chat" className="sub-item-link"><div className="sub-item">6-b. [ CHAT ] 소통 대화방</div></Link>
                  <Link href="/apply" className="sub-item-link"><div className="sub-item">6-c. [ VISIT ] 방문자 승격 신청</div></Link>
                </div>
              </div>

              {/* AUTO */}
              <div className="nav-group">
                <div className="group-header">[ AUTO ] 7. 자동매매 사령부</div>
                <div className="sub-menu">
                  <Link href="/auto/exec" className="sub-item-link"><div className="sub-item">7-a. [ EXEC ] 모의투자 매수 테스트</div></Link>
                  <Link href="/auto/dashboard" className="sub-item-link"><div className="sub-item">7-b. [ DASHBOARD ] 모의투자 현황/결과</div></Link>
                  <Link href="/auto/engine" className="sub-item-link"><div className="sub-item">7-c. [ ENGINE ] 자동매매 전략엔진</div></Link>
                  <Link href="/auto/report" className="sub-item-link"><div className="sub-item">7-d. [ REPORT ] 자동투자 성적표</div></Link>
                  <Link href="/auto/rank" className="sub-item-link"><div className="sub-item">7-e. [ RANK ] 사령부 명예의 전당</div></Link>
                </div>
              </div>

              {/* STRATEGY */}
              <div className="nav-group">
                <div className="group-header">[ STRATEGY ] 8. AI 거장들의 전술</div>
                <div className="sub-menu">
                  <Link href="/strategy/intro" className="sub-item-link"><div className="sub-item">8-a. [ INTRO ] AI 요원 및 거장 소개</div></Link>
                  <Link href="/strategy/manual" className="sub-item-link"><div className="sub-item">8-b. [ MANUAL ] 거장의 실전 전술 매뉴얼</div></Link>
                  <Link href="/strategy/checklist" className="sub-item-link"><div className="sub-item">8-c. [ CHECKLIST ] 진입 전 필수 체크리스트</div></Link>
                  <Link href="/strategy/library" className="sub-item-link"><div className="sub-item">8-d. [ LIBRARY ] 추천 필독서 및 전술 라이브러리</div></Link>
                  <Link href="/strategy/quote" className="sub-item-link"><div className="sub-item">8-e. [ QUOTE ] 오늘의 거장 명언</div></Link>
                  <Link href="/strategy/logs" className="sub-item-link"><div className="sub-item">8-f. [ LOGS ] AI 자동매매 실전 기록</div></Link>
                  <Link href="/strategy/performance" className="sub-item-link"><div className="sub-item">8-g. [ PERFORMANCE ] AI 수익률 전격 공개</div></Link>
                </div>
              </div>
            </nav>
            <div className="user-profile">
              <div className="avatar">CB</div>
              <div className="user-info">
                <div className="user-name">Captain Bonde</div>
                <div className="user-role">Elite Operator</div>
              </div>
            </div>
          </aside>
          <main className="main-content">
            <header className="top-nav glass">
              <div className="search-bar">
                <input type="text" placeholder="Search tickers, strategies, or commands..." className="glass" />
              </div>
              <div className="market-ticker glass">
                <div className="ticker-track">
                  {[
                    { name: "KOSPI", val: "2,750.32", delta: "+1.2%" },
                    { name: "KOSDAQ", val: "892.15", delta: "+0.8%" },
                    { name: "NASDAQ", val: "16,397.64", delta: "+1.5%" },
                    { name: "DOW", val: "39,127.14", delta: "+0.4%" },
                    { name: "S&P 500", val: "5,211.49", delta: "+1.1%" },
                  ].map((idx, i) => (
                    <div key={i} className="ticker-index">
                      <span className="idx-name">{idx.name}</span>
                      <span className="idx-val">{idx.val}</span>
                      <span className="idx-delta status-up">{idx.delta}</span>
                    </div>
                  ))}
                  {/* Duplicate for seamless loop if needed, or use CSS animation */}
                </div>
              </div>
              <div className="header-actions">
                <DigitalClock />
                <div className="icon-btn glass">🔔</div>
                <div className="icon-btn glass">⚡</div>
              </div>
            </header>
            <div className="content-area">
              <ErrorBoundary fallbackName="Main Sector">
                {children}
              </ErrorBoundary>
            </div>
          </main>
          <ErrorBoundary fallbackName="BGM Hub">
            <BGMPlayer />
          </ErrorBoundary>
        </div>
      </body>
    </html>
  );
}
