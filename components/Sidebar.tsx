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

    // ?≤„É´??øΩ?àÊ≥≥ÔøΩÔøΩÔø???ÁππÎ®ÆÍµüË´≠Ôø????ÔøΩÎ™¥?®Î£ªÍºßÁô≤?´Ïä£ÔøΩÎÑä? ????????????Á≠åÎ®¶?áÔøΩ?????ÔøΩÎø¢?æÔøΩ
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
        {/* ?≤„É´??øΩ?àÊ≥≥ÔøΩÔøΩÔø????ÔøΩÎÑ≠?®ÔΩãÏ≥?????ÔøΩÎø¢?æÔøΩ ?ÔßêÔøΩÔøΩÔøΩÔø???*/}
        <button className="mobile-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <div className="mission-control-header">
        <span className="label">[ MISSION CONTROL ]</span>
      </div>
      
      <nav className="nav-menu mission-scroll">
        {/* ... (rest of the nav content) ... */}
        {/* 1. HQ */}
        <NavGroup id="hq" title="[ HQ ] 1. ??®ÎöÆ?ñÁ≠åÔø? ??ÔøΩÎåñ?®Î∫£?ºÈáéÔø?">
          <div className="sub-menu">
            {isAdmin && (
              <Link href="/hq/admin" className="sub-item-link">
                <div className={`sub-item ${pathname === "/hq/admin" ? "active" : ""}`}>1-a. [ ADMIN ] ?≤„É´??øΩÎµ??????ÔøΩÎèÆÔøΩÔøΩ??????´Î°´??/div>
              </Link>
            )}
            <Link href="/hq/hr" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/hr" ? "active" : ""}`}>1-b. [ HR ] ??®ÎöÆ?ñÁ≠åÔø? ?Ô¶´ÎöÆ?éÔøΩÎ´??????ÔøΩÍ±°?∫Îñ∑Ôø?/div></Link>
            <Link href="/hq/security" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/security" ? "active" : ""}`}>1-c. [ SECURE ] ??ÁØÄ??≥Æ?????ÔøΩÎÖøÎºÄ???®ÎöÆÎº???/div></Link>
            <Link href="/hq/account" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/account" ? "active" : ""}`}>1-d. [ PORTFOLIO ] ??????????≤„É´??øΩ?àÊ≥≥ÔøΩÔßí?§Î≠Ñ??????????/div></Link>
          </div>
        </NavGroup>

        {/* ... */}
        {/* 7. AUTO */}
        <NavGroup id="auto" title="[ AUTO ] 7. ???Á≠åÏöéÔøΩ„èÉ??ÔøΩÔøΩÔøΩÂ´ÑÔø????ÔøΩÎåñ?®Î∫£?ºÈáéÔø?">
          <div className="sub-menu">
            <Link href="/auto/exec" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/exec" ? "active" : ""}`}>7-a. [ EXEC ] ???Ê∫êÎÜÅÎ≤??≤„É´??øΩÎµ????????/div></Link>
            <Link href="/auto/dashboard" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/dashboard" ? "active" : ""}`}>7-b. [ DASHBOARD ] ?≤„É´??øΩ?àÊ≥≥Ôø??????ÔøΩÎÑ≠?®Œ∫Îç±???Êø°„Çç????/div></Link>
            {isAdmin && (
              <Link href="/auto/engine" className="sub-item-link">
                <div className={`sub-item ${pathname === "/auto/engine" ? "active" : ""}`}>
                  7-c. [ ENGINE ] ???Á≠åÏöéÔøΩ„èÉ??ÔøΩÔøΩÔøΩÂ´ÑÔø???ÔøΩÎÑ≠?®ÔΩãÏ≥????âÎ®Ø??øΩÎπ?
                </div>
              </Link>
            )}
            <Link href="/auto/report" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/report" ? "active" : ""}`}>7-d. [ REPORT ] ???Á≠åÔøΩ?????ÊøöÎ∞∏≈¶ÔøΩÍ∫ä???/div></Link>
            <Link href="/auto/rank" className="sub-item-link"><div className={`sub-item ${pathname === "/auto/rank" ? "active" : ""}`}>7-e. [ RANK ] ??ÔøΩÎåñ?®Î∫£?ºÈáéÔø? ?≤„É´??øΩ?ñÔøΩÎ§????ÔøΩÎÑ≠?®ÔΩãÔøΩÔøΩÔøΩÏ†Ü?/div></Link>
            {isAdmin && (
              <Link href="/hq/telegram" className="sub-item-link">
                <div className={`sub-item ${pathname === "/hq/telegram" ? "active" : ""}`}>7-f. [ TELEGRAM ] ???âÎ®Æ??ÔøΩÏäÉÔøΩÏê∫?ÑÏèÖÏ±∑Êè¥Ôø?????ÔøΩÔøΩÔø?????´Î°´??/div>
              </Link>
            )}
          </div>
        </NavGroup>

        {/* 8. STRATEGY */}
        <NavGroup id="strategy" title="[ STRATEGY ] 8. AI ?≤Íæß?óÔøΩÎ´?????Ê∫êÎÇÉ???ÔøΩÎÑ≠?®ÔΩãÏ≥??>
          <div className="sub-menu">
            <Link href="/strategy/intro" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/intro" ? "active" : ""}`}>8-a. [ INTRO ] AI ???âÎ®Ø??????≤Íæß?óÔøΩÎ´??????Á≠åÔøΩ?/div></Link>
            <Link href="/strategy/manual" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/manual" ? "active" : ""}`}>8-b. [ MANUAL ] ?≤Íæß?óÔøΩÎ´???????Ê∫êÎÜÅÎ≤??ÔøΩÎÑ≠?®ÔΩãÏ≥???≤„É´??øΩÎµ????/div></Link>
            <Link href="/strategy/checklist" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/checklist" ? "active" : ""}`}>8-c. [ CHECKLIST ] ?≤„É´?£ÔøΩ???????ÔøΩÎÑ≠?®ÔΩãÏ≥???≤„É´?™ÔøΩÎß?ÔøΩÎºÉÁßªÍ≥§Ï≠öÔøΩ?ìÔøΩ?????/div></Link>
            <Link href="/strategy/library" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/library" ? "active" : ""}`}>8-d. [ LIBRARY ] ?ÔøΩÔøΩ?§Î≤†ÊØìÔøΩ???ÔøΩÎÑ≠?®ÔΩãÔøΩÔøΩÁ≠åÔøΩ?????ÔøΩÎÑ≠?®ÔΩãÏ≥????ÁππÎ®Æ?èÔøΩÍº???®ÏÄ´ÎÆõ??ÔøΩÔøΩÔø?/div></Link>
            <Link href="/strategy/quote" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/quote" ? "active" : ""}`}>8-e. [ QUOTE ] ???ÔøΩÎÅÇÔß•ÔøΩ???≤Íæß?óÔøΩÎ´????≤„É´??øΩ?ñÔøΩÎ§ÉÔøΩ?©ÔøΩ??/div></Link>
            <Link href="/strategy/logs" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/logs" ? "active" : ""}`}>8-f. [ LOGS ] AI ???Á≠åÏöéÔøΩ„èÉ??ÔøΩÔøΩÔøΩÂ´ÑÔø?????Ê∫êÎÜÅÎ≤??ÔøΩÍ∫ÅÔøΩÏ??ÔøΩÎº∫??øΩ?/div></Link>
            <Link href="/strategy/performance" className="sub-item-link"><div className={`sub-item ${pathname === "/strategy/performance" ? "active" : ""}`}>8-g. [ PERFORMANCE ] AI ??ÔøΩÎ™¥?®Î£∏????ÔøΩÎÑ≠?®ŒªÏßÉÔøΩÍ±°???ÔøΩÎÅá???/div></Link>
            <Link href="/hq/briefing" className="sub-item-link"><div className={`sub-item ${pathname === "/hq/briefing" ? "active" : ""}`}>8-h. [ BRIEFING ] AI ?ÔøΩÎÑ≠?®ÔΩãÏ≥?????®ÏÄ´ÎÆõ???/div></Link>
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
        /* ... existing scrollbar styles ... */

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
