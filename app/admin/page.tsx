"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import { Shield, UserCheck, Users, Link as LinkIcon, Clock, Database } from 'lucide-react';
import { PERMANENT_MEMBERS, SHEET_CONFIG, Member } from '@/constants/members';

export default function AdminCenter() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>(PERMANENT_MEMBERS);
  const [isLoading, setIsLoading] = useState(true);

  // Security Check
  useEffect(() => {
    const user = sessionStorage.getItem('dragonfly_user');
    if (user !== 'cntfed' && user !== 'hjrubbi') {
      alert('??ï¿½ë¼”ï¿½ë‹ª??ï¿½ì’??´ï¿½??ï¿½ë?????ï¿½ï¿½?¤ï¼˜????ï¿½ëœ„ï¿½ë ¡. ??ï¿½ëŒ–?¨ëº£?¼é‡ï¿? ?ï¿½ë›¾?ï¿½ï¿½????ï¿½ë„­?¨ï½‹ì³???ç­Œë¤¾?“ï¿½???');
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_CONFIG.ID}/gviz/tq?tqx=out:json&gid=${SHEET_CONFIG.NAME_TAB_GID}`;
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json.table.rows;
        
        // ??? ???ï¿½êº‚?„ï¿½ ??ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼?????ï¿½ì †?(NAME ????ï¿½ìŠ¢è¸°ï¿½????²ãƒ«??¿½ëµ???
        const parsed: Member[] = rows.map((r: any) => ({
          id: r.c[0]?.v || '-',
          rank: r.c[3]?.v || '?????,
          location: r.c[4]?.v || '-',
          experience: r.c[6]?.v || '-',
          age: r.c[5]?.v || '-',
          motivation: r.c[7]?.v || '-',
          joined_at: r.c[8]?.f || r.c[8]?.v || '-',
          points: 0 // ???ï¿½êº‚?„ï¿½???????????ï¿½ë„­?¨ï½‹ï¿½ï¿½ï¿½ë¤ƒï¿½ë„‚ï§Œï¿½?ï¿½ëŸ¾ï¿½ï¿½ ???ï¿½ëœ„ï¿½ë ¡?²ï¿½??ï¿½ï¿½?¤ë² ?‰ï¿½? ?ï¿½ì”ˆï¿½ìˆ???        }));

        if (parsed.length > 0) setMembers(parsed);
      } catch (error) {
        console.error("????¨ëº£ë¹?????????ï¿½ë?è¸°ì¢‘ì­????ï¿½ëœ†ï¿½ê½¡, ??ï¿½ë?????è¢â‘¸ì¦??ï§?¿½???ï¿½ë«ï¿½ï¿½ï¿½ë²ê¼??????", error);
        setMembers(PERMANENT_MEMBERS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="admin-container animate-fade-in">
      <div className="admin-header">
        <h1 className="admin-title">
          <span className="tag">[ ADMIN ]</span> ??ï¿½ë®ï¿½ï¿½??Ÿë°¸Å¦?Šï¿½???ï¿½ë›¾?ï¿½ï¿½??????«ë¡«??(HQ Member Approval)
        </h1>
        <div className="sync-badge">
          <Database size={14} /> ????¨ëº£ë¹????? ???ï¿½êº‚?„ï¿½ ???ï¿½ì‰µ?¾ï¿½??æ¿šï¿½?        </div>
      </div>

      <section className="admin-section">
        <h2 className="section-title">[ STAFF ] ??ï¿½ëŒ–?¨ëº£?¼é‡ï¿? ?ï¿½ë„­?¨ï½‹ì³???????²ãƒ«??¿½?–ï¿½ë¤? (HR ??ï¿½ë?è¸°ì¢‘ì­?</h2>
        <div className="table-container glass">
          <table className="admin-table">
            <thead>
              <tr>
                <th>?ï¿½ë„­?¨ï½‹ì³´ï¿½ï¿½ï¿½??/th>
                <th>?æ¿šë°¸Ãï¿½ëœ”??/th>
                <th>?²ãƒ«?£ï¿½????/th>
                <th>?æ¿¡ã‚????/th>
                <th>??ï¿½ë?è¸°â–½??/th>
                <th>?²ãƒ«??¿½ëµ??????ï¿½ì‰µ?¾ï¿½</th>
                <th>??ç­Œë¤¾?´è‹¡ï¿??/th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <tr key={i}>
                  <td className="id-cell">{member.id}</td>
                  <td><span className={`rank-badge ${member.rank === '?è¢â‘¸?»æ³³ï¿?? ? 'commander' : 'elite'}`}>{member.rank}</span></td>
                  <td>{member.location}</td>
                  <td>{member.experience}</td>
                  <td>{member.age}</td>
                  <td className="memo-cell">{member.motivation}</td>
                  <td className="date-cell">{member.joined_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <style jsx>{`
        .admin-container { padding: 40px; display: flex; flex-direction: column; gap: 48px; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .admin-title { font-size: 2.2rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 16px; }
        .admin-title .tag { color: var(--primary); }
        .sync-badge { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 8px; }

        .admin-section { display: flex; flex-direction: column; gap: 20px; }
        .section-title { font-size: 1.5rem; font-weight: 900; color: white; letter-spacing: 0.05em; }

        .table-container { overflow-x: auto; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
        .admin-table { width: 100%; border-collapse: collapse; text-align: left; }
        .admin-table th { padding: 16px; background: rgba(255, 255, 255, 0.03); color: #94a3b8; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; }
        .admin-table td { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.02); font-size: 0.9rem; color: #e2e8f0; font-weight: 600; }
        
        .id-cell { color: white; font-weight: 800; }
        .rank-badge { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 800; }
        .rank-badge.commander { background: rgba(255, 0, 85, 0.2); color: #ff0055; border: 1px solid rgba(255, 0, 85, 0.3); }
        .rank-badge.elite { background: rgba(14, 165, 233, 0.2); color: #0ea5e9; border: 1px solid rgba(14, 165, 233, 0.3); }

        .memo-cell { max-width: 350px; font-size: 0.85rem; line-height: 1.4; color: #94a3b8; }
        .date-cell { font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #64748b; }
      `}</style>
    </div>
  );
}
