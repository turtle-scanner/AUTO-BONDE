"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    hq: true, 
    market: false,
    target: false,
    academy: false,
    square: false,
    auto: false,
    strategy: false,
  });

  useEffect(() => {
    setUser(sessionStorage.getItem("dragonfly_user"));
    
    if (pathname.includes("/hq")) toggleGroup("hq", true);
    else if (pathname.includes("/market")) toggleGroup("market", true);
    else if (pathname.includes("/target")) toggleGroup("target", true);
    else if (pathname.includes("/academy")) toggleGroup("academy", true);
    else if (pathname.includes("/square")) toggleGroup("square", true);
    else if (pathname.includes("/auto")) toggleGroup("auto", true);
    else if (pathname.includes("/strategy")) toggleGroup("strategy", true);

    // 사이드바 자동 닫기 (모바일 대응)
    if (isOpen) {
      onClose();
    }
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
    <aside className={`sidebar glass ${isOpen ? 'mobile-open' : ''}`}>
      <div className="logo-container">
        <div className="logo-wrapper">
          <img src="/dragonfly4.png" alt="Dragonfly Logo" className="logo-img" />
          <span className="gradient-text logo-text">DRAGONFLY v6.0</span>
        </div>
        <button className="mobile-close-btn" onClick={onClose} aria-label="Close sidebar">
          <X size={24} />
        </button>
      </div>
      <div className="mission-control-header">
        <span className="label">[ MISSION CONTROL ]</span>
      </div>
      
      <nav className="nav-menu mission-scroll">
        {/* 1. HQ */}
        <NavGroup id="hq" title="[ HQ ] 1. 본부 사령부 / 전략 통제실">
          <div className="sub-menu">
            {isAdmin && (
              <Link href="/hq/admin" className="sub-item-link">
                <div className={`sub-item ${pathname === "/hq/admin" ? "active" : ""}`}>1-a. [ ADMIN ] 관리자 승인 센터</div>
              </Link>
            )}
            <Link href="/hq/hr" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/hr" ? "active" : ""}`}>1-b. [ HR ] 본부 인적자원부</div></Link>
            <Link href="/hq/security" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/security" ? "active" : ""}`}>1-c. [ SECURE ] 보안 및 권한 설정</div></Link>
            <Link href="/hq/account" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/account" ? "active" : ""}`}>1-d. [ PORTFOLIO ] 통합 자산 포트폴리오</div></Link>
          </div>
        </NavGroup>

        {/* 2. MARKET */}
        <NavGroup id="market" title="[ MARKET ] 2. 글로벌 시장 모니터링">
          <div className="sub-menu">
            <Link href="/market/live" className="sub-item-link"><div className={`sub-item ${pathname === "/market/live" ? "active" : ""}`}>2-a. [ LIVE ] 실시간 시장 상황판</div></Link>
            <Link href="/market/sectors" className="sub-item-link"><div className={`sub-item ${pathname === "/market/sectors" ? "active" : ""}`}>2-b. [ SECTOR ] 섹터별 수급 현황</div></Link>
            <Link href="/market/news" className="sub-item-link"><div className={`sub-item ${pathname === "/market/news" ? "active" : ""}`}>2-c. [ NEWS ] AI 시장 속보 / 공시</div></Link>
          </div>
        </NavGroup>

        {/* 3. TARGET */}
        <NavGroup id="target" title="[ TARGET ] 3. 타겟 스캐닝 / 종목 발굴">
          <div className="sub-menu">
            <Link href="/target/scanner" className="sub-item-link"><div className={`sub-item ${pathname === "/target/scanner" ? "active" : ""}`}>3-a. [ SCANNER ] AI 실시간 종목 스캐너</div></Link>
            <Link href="/target/watchlist" className="sub-item-link"><div className={`sub-item ${pathname === "/target/watchlist" ? "active" : ""}`}>3-b. [ WATCHLIST ] 타겟 관심종목 관리</div></Link>
            <Link href="/target/analysis" className="sub-item-link"><div className={`sub-item ${pathname === "/target/analysis" ? "active" : ""}`}>3-c. [ ANALYSIS ] 종목 정밀 분석 보고서</div></Link>
          </div>
        </NavGroup>

        {/* 4. ACADEMY */}
        <NavGroup id="academy" title="[ ACADEMY ] 4. 투자 아카데미 / 교육">
          <div className="sub-menu">
            <Link href="/academy/lectures" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/lectures" ? "active" : ""}`}>4-a. [ LECTURE ] 실전 매매 강의실</div></Link>
            <Link href="/academy/methods" className="sub-item-link"><div className={`sub-item ${pathname === "/academy/methods" ? "active" : ""}`}>4-b. [ METHOD ] 매매 기법 라이브러리</div></Link>
          </div>
        </NavGroup>

        {/* 5. SQUARE */}
        <NavGroup id="square" title="[ SQUARE ] 5. 커뮤니티 / 정보 공유">
          <div className="sub-menu">
            <Link href="/square/notice" className="sub-item-link"><div className={`sub-item ${pathname === "/square/notice" ? "active" : ""}`}>5-a. [ NOTICE ] 본부 주요 공지사항</div></Link>
            <Link href="/square/forum" className="sub-item-link"><div className={`sub-item ${pathname === "/square/forum" ? "active" : ""}`}>5-b. [ FORUM ] 오퍼레이터 자유게시판</div></Link>
          </div>
        </NavGroup>

        {/* 7. AUTO */}
        <NavGroup id="auto" title="[ AUTO ] 7. 자동 매매 시스템 관리부">
          <div className="sub-menu">
            <Link href="/auto/exec" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/exec" ? "active" : ""}`}>7-a. [ EXEC ] 자동 매매 실행 제어</div></Link>
            <Link href="/auto/dashboard" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/dashboard" ? "active" : ""}`}>7-b. [ DASHBOARD ] 실시간 매매 현황판</div></Link>
            {isAdmin && (
              <Link href="/auto/settings" className="sub-item-link">
                <div className={`sub-item ${pathname === "/auto/settings" ? "active" : ""}`}>7-c. [ CONFIG ] 자동 매매 파라미터</div>
              </Link>
            )}
            <Link href="/auto/report" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/report" ? "active" : ""}`}>7-d. [ REPORT ] 일일 자동매매 결산</div></Link>
            <Link href="/auto/rank" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/rank" ? "active" : ""}`}>7-e. [ RANK ] 리더보드 / 랭킹 시스템</div></Link>
            {isAdmin && (
              <Link href="/hq/telegram" className="sub-item-link">
                <div className={`sub-item ${pathname === "/hq/telegram" ? "active" : ""}`}>7-f. [ TELEGRAM ] 텔레그램 연동 센터</div>
              </Link>
            )}
          </div>
        </NavGroup>

        {/* 8. STRATEGY */}
        <NavGroup id="strategy" title="[ STRATEGY ] 8. AI 전략 연구소">
          <div className="sub-menu">
            <Link href="/strategy/intro" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/intro" ? "active" : ""}`}>8-a. [ INTRO ] AI 투자 전략 소개</div></Link>
            <Link href="/strategy/manual" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/manual" ? "active" : ""}`}>8-b. [ MANUAL ] 전략 연구소 매뉴얼</div></Link>
            <Link href="/strategy/checklist" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/checklist" ? "active" : ""}`}>8-c. [ CHECKLIST ] 전략 이행 체크리스트</div></Link>
            <Link href="/strategy/library" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/library" ? "active" : ""}`}>8-d. [ LIBRARY ] 투자 지식 라이브러리</div></Link>
            <Link href="/strategy/quote" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/quote" ? "active" : ""}`}>8-e. [ QUOTE ] 투자 명언 및 격언</div></Link>
            <Link href="/strategy/logs" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/logs" ? "active" : ""}`}>8-f. [ LOGS ] AI 투자 일지 및 기록</div></Link>
            <Link href="/strategy/performance" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/performance" ? "active" : ""}`}>8-g. [ PERFORMANCE ] AI 성과분석 리포트</div></Link>
            <Link href="/hq/briefing" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/briefing" ? "active" : ""}`}>8-h. [ BRIEFING ] AI 투자 브리핑</div></Link>
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
        .sidebar { width: 300px; height: 100vh; background: rgba(10, 10, 15, 0.95); border-right: 1px solid rgba(255, 255, 255, 0.05); display: flex; flex-direction: column; z-index: 1000; flex-shrink: 0; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .logo-container { padding: 30px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); display: flex; justify-content: space-between; align-items: center; }
        .logo-wrapper { display: flex; align-items: center; gap: 12px; }
        .logo-img { width: 32px; height: 32px; border-radius: 8px; filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.3)); }
        .logo-text { font-size: 1.4rem; font-weight: 900; letter-spacing: -1px; }
        
        .mobile-close-btn { display: none; background: none; border: none; color: var(--text-muted); cursor: pointer; }
        
        .mission-control-header { padding: 20px 30px 10px 30px; }
        .label { font-size: 0.7rem; font-weight: 900; color: var(--primary); letter-spacing: 2px; }
        .mission-scroll { flex: 1; overflow-y: auto; padding: 10px 20px; }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            transform: translateX(-100%);
            width: 100vw;
            height: 100vh;
            background: rgba(5, 5, 10, 0.98);
            backdrop-filter: blur(20px);
            z-index: 2000;
            padding: 40px 20px;
          }
          .sidebar.mobile-open {
            transform: translateX(0);
          }
          .logo-container {
            margin-bottom: 20px;
            padding: 0 10px 20px 10px;
          }
          .mobile-close-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(212, 175, 55, 0.1);
            color: var(--primary);
            border: 1px solid rgba(212, 175, 55, 0.2);
          }
          .group-header-clickable {
            padding: 18px 15px;
            font-size: 1rem;
          }
          .sub-item {
            padding: 14px 20px;
            font-size: 0.9rem;
          }
          .nav-menu {
            padding-top: 20px;
          }
        }
        .mission-scroll::-webkit-scrollbar { width: 4px; }
        .mission-scroll::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 10px; }

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
        .sub-menu-accordion.open { max-height: 800px; padding-bottom: 10px; }

        .sub-menu { display: flex; flex-direction: column; padding-left: 10px; }
        .sub-item { padding: 10px 15px; font-size: 0.8rem; color: #64748b; font-weight: 700; transition: all 0.2s; border-radius: 8px; margin: 2px 0; }
        .sub-item:hover { background: rgba(255, 255, 255, 0.05); color: #f2f2f2; }
        .sub-item.active { background: rgba(212, 175, 55, 0.1); color: var(--primary); border-left: 3px solid var(--primary); }

        .user-profile { padding: 24px; background: rgba(255, 255, 255, 0.02); border-top: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: center; gap: 16px; margin-top: auto; }
        .avatar { width: 40px; height: 40px; background: var(--primary); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: black; }
        .user-info { display: flex; flex-direction: column; }
        .user-name { font-size: 0.9rem; font-weight: 800; color: #f2f2f2; }
        .user-role { font-size: 0.7rem; color: #64748b; font-weight: 700; }

        .gold { color: #d4af37; }
        .muted { color: #475569; }
      `}</style>
    </aside>
  );
}
