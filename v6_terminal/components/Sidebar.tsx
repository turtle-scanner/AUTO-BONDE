"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    hq: true, // 기본적으로 HQ는 열어둠
    market: false,
    target: false,
    academy: false,
    square: false,
    auto: false,
    strategy: false,
  });

  useEffect(() => {
    setUser(sessionStorage.getItem("dragonfly_user"));
    
    // 현재 경로에 맞춰 해당 그룹 자동 확장
    if (pathname.includes("/hq")) toggleGroup("hq", true);
    else if (pathname.includes("/market")) toggleGroup("market", true);
    else if (pathname.includes("/target")) toggleGroup("target", true);
    else if (pathname.includes("/academy")) toggleGroup("academy", true);
    else if (pathname.includes("/square")) toggleGroup("square", true);
    else if (pathname.includes("/auto")) toggleGroup("auto", true);
    else if (pathname.includes("/strategy")) toggleGroup("strategy", true);
  }, [pathname]);

  const isAdmin = user === "cntfed" || user === "hjrubbi";

  const toggleGroup = (group: string, force?: boolean) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: force !== undefined ? force : !prev[group]
    }));
  };

  const NavGroup = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => {
    const isExpanded = expandedGroups[id];
    return (
      <div className={`nav-group-container ${isExpanded ? 'is-expanded' : ''}`}>
        <div className="group-header-clickable" onClick={() => toggleGroup(id)}>
          <span className="group-title">{title}</span>
          {isExpanded ? <ChevronDown size={16} className="gold" /> : <ChevronRight size={16} className="muted" />}
        </div>
        <div className={`sub-menu-accordion ${isExpanded ? 'open' : 'closed'}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <aside className="sidebar glass">
      <div className="logo-container">
        <div className="logo-wrapper">
          <img src="/logo.png" alt="Dragonfly Logo" className="logo-img" />
          <span className="gradient-text logo-text">DRAGONFLY v6.0</span>
        </div>
      </div>
      <div className="mission-control-header">
        <span className="label">[ MISSION CONTROL ]</span>
      </div>
      
      <nav className="nav-menu mission-scroll">
        {/* 1. HQ */}
        <NavGroup id="hq" title="[ HQ ] 1. 본부 사령부">
          <div className="sub-menu">
            {isAdmin && (
              <Link href="/admin" className="sub-item-link">
                <div className={`sub-item ${pathname === "/admin" ? "active" : ""}`}>1-a. [ ADMIN ] 관리자 승인 센터</div>
              </Link>
            )}
            <Link href="/hq/hr" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/hr" ? "active" : ""}`}>1-b. [ HR ] 본부 인적자원부</div></Link>
            <Link href="/hq/security" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/security" ? "active" : ""}`}>1-c. [ SECURE ] 계정 비번 변경</div></Link>
            <Link href="/hq/account" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/account" ? "active" : ""}`}>1-d. [ EXIT ] 탈퇴 및 임시휴식</div></Link>
          </div>
        </NavGroup>

        {/* 2. MARKET */}
        <NavGroup id="market" title="[ MARKET ] 2. 시장 상황실">
          <div className="sub-menu">
            <Link href="/market/summary" className="sub-item-link"><div className={`sub-item ${pathname === "/market/summary" ? "active" : ""}`}>2-a. [ TREND ] 마켓 트렌드 요약</div></Link>
            <Link href="/market/heatmap" className="sub-item-link"><div className={`sub-item ${pathname === "/market/heatmap" ? "active" : ""}`}>2-b. [ MAP ] 실시간 히트맵</div></Link>
            <Link href="/market/sentiment" className="sub-item-link"><div className={`sub-item ${pathname === "/market/sentiment" ? "active" : ""}`}>2-c. [ SENTIMENT ] 시장 심리 게이지</div></Link>
            <Link href="/market/about" className="sub-item-link"><div className={`sub-item ${pathname === "/market/about" ? "active" : ""}`}>2-d. [ ABOUT ] 제작 동기</div></Link>
            <Link href="/market/news" className="sub-item-link"><div className={`sub-item ${pathname === "/market/news" ? "active" : ""}`}>2-e. [ NEWS ] 실시간 시장 뉴스</div></Link>
          </div>
        </NavGroup>

        {/* 3. TARGET */}
        <NavGroup id="target" title="[ TARGET ] 3. 주도주 추격대">
          <div className="sub-menu">
            <Link href="/target/scan" className="sub-item-link"><div className={`sub-item ${pathname === "/target/scan" ? "active" : ""}`}>3-a. [ SCAN ] 주도주 타점 스캐너</div></Link>
            <Link href="/target/rank" className="sub-item-link"><div className={`sub-item ${pathname === "/target/rank" ? "active" : ""}`}>3-b. [ RANK ] 주도주 랭킹 TOP 50</div></Link>
            <Link href="/target/watchlist" className="sub-item-link"><div className={`sub-item ${pathname === "/target/watchlist" ? "active" : ""}`}>3-c. [ WATCH ] 본대 감시 리스트</div></Link>
            <Link href="/target/industry" className="sub-item-link"><div className={`sub-item ${pathname === "/target/industry" ? "active" : ""}`}>3-d. [ INDUSTRY ] 산업동향(TOP 10)</div></Link>
            <Link href="/target/rs" className="sub-item-link"><div className={`sub-item ${pathname === "/target/rs" ? "active" : ""}`}>3-e. [ RS ] RS 강도(TOP 10)</div></Link>
          </div>
        </NavGroup>

        {/* 4. RISK (Special Single Link) */}
        <Link href="/portfolio" className="nav-item mission-btn">
          <span className="tag">[ RISK ]</span> 4. 전략 및 리스크
        </Link>

        {/* 5. ACADEMY */}
        <NavGroup id="academy" title="[ ACADEMY ] 5. 마스터 훈련소">
          <div className="sub-menu">
            <Link href="/academy/intro" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/intro" ? "active" : ""}`}>5-a. [ WHOWS ] 본데는 누구인가?</div></Link>
            <Link href="/academy/study" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/study" ? "active" : ""}`}>5-b. [ STUDY ] 주식공부방(차트)</div></Link>
            <Link href="/academy/radar" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/radar" ? "active" : ""}`}>5-c. [ RADAR ] 나노바나나 레이더</div></Link>
            <Link href="/exam" className="sub-item-link"><div className={`sub-item ${pathname === "/exam" ? "active" : ""}`}>5-d. [ EXAM ] 정기 승급 시험 안내</div></Link>
            <Link href="/academy/success" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/success" ? "active" : ""}`}>5-e. [ SUCCESS ] 실전 익절 자랑방</div></Link>
            <Link href="/academy/review" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/review" ? "active" : ""}`}>5-f. [ REVIEW ] 손실 위로 및 복기방</div></Link>
            <Link href="/academy/tvlive" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/tvlive" ? "active" : ""}`}>5-g. [ TVLIVE ] 트레이딩뷰 라이브</div></Link>
          </div>
        </NavGroup>

        {/* 6. SQUARE */}
        <NavGroup id="square" title="[ SQUARE ] 6. 안티그래비티 광장">
          <div className="sub-menu">
            <Link href="/square/checkin" className="sub-item-link"><div className={`sub-item ${pathname === "/square/checkin" ? "active" : ""}`}>6-a. [ CHECK ] 출석체크(오늘한줄)</div></Link>
            <Link href="/square/chat" className="sub-item-link"><div className={`sub-item ${pathname === "/square/chat" ? "active" : ""}`}>6-b. [ CHAT ] 소통 대화방</div></Link>
            <Link href="/apply" className="sub-item-link"><div className={`sub-item ${pathname === "/apply" ? "active" : ""}`}>6-c. [ VISIT ] 방문자 승격 신청</div></Link>
          </div>
        </NavGroup>

        {/* 7. AUTO */}
        <NavGroup id="auto" title="[ AUTO ] 7. 자동매매 사령부">
          <div className="sub-menu">
            <Link href="/auto/exec" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/exec" ? "active" : ""}`}>7-a. [ EXEC ] 모의투자 매수 테스트</div></Link>
            <Link href="/auto/dashboard" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/dashboard" ? "active" : ""}`}>7-b. [ DASHBOARD ] 모의투자 현황/결과</div></Link>
            {isAdmin && (
              <Link href="/auto/engine" className="sub-item-link">
                <div className={`sub-item ${pathname === "/auto/engine" ? "active" : ""}`}>
                  7-c. [ ENGINE ] 자동매매 전략엔진
                </div>
              </Link>
            )}
            <Link href="/auto/report" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/report" ? "active" : ""}`}>7-d. [ REPORT ] 자동투자 성적표</div></Link>
            <Link href="/auto/rank" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/rank" ? "active" : ""}`}>7-e. [ RANK ] 사령부 명예의 전당</div></Link>
          </div>
        </NavGroup>

        {/* 8. STRATEGY */}
        <NavGroup id="strategy" title="[ STRATEGY ] 8. AI 거장들의 전술">
          <div className="sub-menu">
            <Link href="/strategy/intro" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/intro" ? "active" : ""}`}>8-a. [ INTRO ] AI 요원 및 거장 소개</div></Link>
            <Link href="/strategy/manual" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/manual" ? "active" : ""}`}>8-b. [ MANUAL ] 거장의 실전 전술 매뉴얼</div></Link>
            <Link href="/strategy/checklist" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/checklist" ? "active" : ""}`}>8-c. [ CHECKLIST ] 진입 전 필수 체크리스트</div></Link>
            <Link href="/strategy/library" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/library" ? "active" : ""}`}>8-d. [ LIBRARY ] 추천 필독서 및 전술 라이브러리</div></Link>
            <Link href="/strategy/quote" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/quote" ? "active" : ""}`}>8-e. [ QUOTE ] 오늘의 거장 명언</div></Link>
            <Link href="/strategy/logs" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/logs" ? "active" : ""}`}>8-f. [ LOGS ] AI 자동매매 실전 기록</div></Link>
            <Link href="/strategy/performance" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/performance" ? "active" : ""}`}>8-g. [ PERFORMANCE ] AI 수익률 전격 공개</div></Link>
          </div>
        </NavGroup>
      </nav>

      <div className="user-profile">
        <div className="avatar">{isAdmin ? "AD" : "CB"}</div>
        <div className="user-info">
          <div className="user-name">{user || "Guest"}</div>
          <div className="user-role">{isAdmin ? "Master Admin" : "Elite Operator"}</div>
        </div>
      </div>

      <style jsx>{`
        .sidebar { width: 300px; height: 100vh; background: rgba(10, 10, 15, 0.95); border-right: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; z-index: 1000; flex-shrink: 0; }
        .logo-container { padding: 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .logo-wrapper { display: flex; align-items: center; gap: 12px; }
        .logo-img { width: 32px; height: 32px; border-radius: 8px; filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3)); }
        .logo-text { font-size: 1.4rem; font-weight: 900; letter-spacing: -1px; }
        .mission-control-header { padding: 20px 30px 10px 30px; }
        .label { font-size: 0.7rem; font-weight: 900; color: var(--primary); letter-spacing: 2px; }
        .mission-scroll { flex: 1; overflow-y: auto; padding: 10px 20px; }
        .mission-scroll::-webkit-scrollbar { width: 4px; }
        .mission-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 10px; }

        /* Accordion Styles */
        .nav-group-container { margin-bottom: 8px; border-radius: 12px; overflow: hidden; transition: all 0.3s ease; }
        .nav-group-container.is-expanded { background: rgba(255, 255, 255, 0.02); }
        
        .group-header-clickable { 
          padding: 14px 15px; display: flex; justify-content: space-between; align-items: center; 
          cursor: pointer; transition: all 0.2s; font-size: 0.85rem; font-weight: 800; color: #94a3b8;
        }
        .group-header-clickable:hover { background: rgba(212, 175, 55, 0.05); color: #f2f2f2; }
        .is-expanded .group-header-clickable { color: var(--primary); }

        .sub-menu-accordion { overflow: hidden; transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .sub-menu-accordion.closed { max-height: 0; }
        .sub-menu-accordion.open { max-height: 500px; padding-bottom: 10px; }

        .sub-menu { display: flex; flex-direction: column; padding-left: 10px; }
        .sub-item { padding: 10px 15px; font-size: 0.8rem; color: #64748b; font-weight: 700; transition: all 0.2s; border-radius: 8px; margin: 2px 0; }
        .sub-item:hover { background: rgba(255, 255, 255, 0.05); color: #f2f2f2; }
        .sub-item.active { background: rgba(212, 175, 55, 0.1); color: var(--primary); border-left: 3px solid var(--primary); }

        .nav-item.mission-btn { display: block; padding: 14px 15px; font-size: 0.85rem; font-weight: 800; color: #94a3b8; text-decoration: none; border-radius: 12px; transition: all 0.2s; margin-top: 10px; }
        .nav-item.mission-btn:hover { background: rgba(255, 255, 255, 0.05); color: #f2f2f2; }
        .tag { color: var(--primary); margin-right: 8px; }

        .user-profile { padding: 24px; background: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: center; gap: 16px; }
        .avatar { width: 40px; height: 40px; background: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: black; }
        .user-name { font-size: 0.9rem; font-weight: 800; color: #f2f2f2; }
        .user-role { font-size: 0.7rem; color: #64748b; font-weight: 700; }

        .gold { color: #d4af37; }
        .muted { color: #475569; }
      `}</style>
    </aside>
  );
}
