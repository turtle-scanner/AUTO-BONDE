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
      alert('접근 권한이 없습니다. 사령부 승인이 필요합니다.');
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
        
        // 구글 시트 데이터 파싱 (NAME 탭 구조에 맞춤)
        const parsed: Member[] = rows.map((r: any) => ({
          id: r.c[0]?.v || '-',
          rank: r.c[3]?.v || '회원',
          location: r.c[4]?.v || '-',
          experience: r.c[6]?.v || '-',
          age: r.c[5]?.v || '-',
          motivation: r.c[7]?.v || '-',
          joined_at: r.c[8]?.f || r.c[8]?.v || '-',
          points: 0 // 시트에서 포인트 필드가 있다면 추가 가능
        }));

        if (parsed.length > 0) setMembers(parsed);
      } catch (error) {
        console.error("실시간 회원 연동 실패, 영구 백업 데이터 사용:", error);
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
          <span className="tag">[ ADMIN ]</span> 관리자 승인 센터 (HQ Member Approval)
        </h1>
        <div className="sync-badge">
          <Database size={14} /> 실시간 구글 시트 동기화 중
        </div>
      </div>

      <section className="admin-section">
        <h2 className="section-title">[ STAFF ] 사령부 전체 대원 명부 (HR 연동)</h2>
        <div className="table-container glass">
          <table className="admin-table">
            <thead>
              <tr>
                <th>아이디</th>
                <th>등급</th>
                <th>지역</th>
                <th>경력</th>
                <th>연령</th>
                <th>매매 동기</th>
                <th>합류일</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <tr key={i}>
                  <td className="id-cell">{member.id}</td>
                  <td><span className={`rank-badge ${member.rank === '방장' ? 'commander' : 'elite'}`}>{member.rank}</span></td>
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
