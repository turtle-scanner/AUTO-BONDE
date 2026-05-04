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
        <button className="nav-group-header" onClick={() => toggleGroup(id)}>
          <span className="group-title">{title}</span>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </button>
        {isExpanded && <div className="nav-group-content">{children}</div>}
      </div>
    );
  };

  const NavItem = ({ href, label, icon: Icon }: { href: string, label: string, icon?: any }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={`nav-item ${isActive ? 'active' : ''}`}>
        {Icon && <Icon size={16} className="nav-icon" />}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <aside className={`sidebar glass ${isOpen ? 'mobile-open' : ''}`}>
      <div className="logo-container">
        <div className="logo-wrapper">
          <img src="/dragonfly4.png" alt="Dragonfly Logo" className="logo-img" />
          <span className="gradient-text logo-text">DRAGONFLY v6.0</span>
        </div>
        <button className="mobile-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <div className="mission-control-header">
        <span className="label">[ MISSION CONTROL ]</span>
      </div>
      
      <nav className="nav-menu mission-scroll">
        <NavGroup id="hq" title="1. 본부 사령부 (HQ)">
          <NavItem href="/" label="통합 상황실" />
          <NavItem href="/hq/briefing" label="일일 브리핑" />
          {isAdmin && <NavItem href="/hq/admin" label="관리자 통제" />}
        </NavGroup>

        <NavGroup id="market" title="2. 시장 데이터 센터">
          <NavItem href="/market/summary" label="시장 종합 지표" />
          <NavItem href="/market/heatmap" label="섹터 맵" />
          <NavItem href="/market/news" label="실시간 속보" />
        </NavGroup>

        <NavGroup id="target" title="3. 타겟 발굴 센터">
          <NavItem href="/target/rank" label="실시간 RS 순위" />
          <NavItem href="/target/scan" label="전술적 스캐너" />
          <NavItem href="/target/watchlist" label="집중 감시 명단" />
        </NavGroup>

        <NavGroup id="auto" title="4. 자동 매매 시스템">
          <NavItem href="/auto/dashboard" label="자동 매매 현황" />
          <NavItem href="/auto/exec" label="정밀 매매 집행" />
          <NavItem href="/auto/report" label="운용 보고서" />
        </NavGroup>

        <NavGroup id="strategy" title="5. AI 전략 연구소">
          <NavItem href="/strategy/intro" label="전략 라이브러리" />
          <NavItem href="/strategy/performance" label="수익률 시뮬레이션" />
        </NavGroup>

        <NavGroup id="academy" title="6. 투자 아카데미">
          <NavItem href="/academy/intro" label="기법 강의" />
          <NavItem href="/academy/radar" label="나노 바나나 레이더" />
          <NavItem href="/academy/review" label="매매 복기 노트" />
        </NavGroup>
      </nav>
      
      <div className="sidebar-footer">
        <div className="system-status">
          <div className="status-dot online"></div>
          <span>SECURE CHANNEL CONNECTED</span>
        </div>
      </div>
    </aside>
  );
}
