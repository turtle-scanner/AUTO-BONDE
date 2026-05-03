"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import { Shield, UserCheck, Users, Link as LinkIcon, Clock } from 'lucide-react';

interface Member {
  id: string;
  rank: string;
  location: string;
  experience: string;
  age: string;
  motivation: string;
  joined_at: string;
}

export default function AdminCenter() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Security Check
  useEffect(() => {
    const user = sessionStorage.getItem('dragonfly_user');
    if (user !== 'cntfed' && user !== 'hjrubbi') {
      alert('접근 권한이 없습니다. 사령부 승인이 필요합니다.');
      router.push('/');
    }
  }, [router]);

  const SHEET_ID = '1xjbe9SF0HsxwY_Uy3NC2tT92BqK0nhArUaYU16Q0p9M';

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=1499398020`;
        const res = await fetch(url);
        const text = await res.text();
        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json.table.rows;
        const parsed: Member[] = rows.map((r: any) => ({
          id: r.c[0]?.v || '-',
          rank: r.c[3]?.v || '회원',
          location: r.c[4]?.v || '-',
          experience: r.c[6]?.v || '-',
          age: r.c[5]?.v || '-',
          motivation: r.c[7]?.v || '-',
          joined_at: r.c[8]?.f || r.c[8]?.v || '-',
        }));
        setMembers(parsed);
      } catch (error) {
        console.error("구글 시트 연동 실패, 폴백 데이터 사용:", error);
        setMembers([
          { id: "cntfed", rank: "방장", location: "-", experience: "-", age: "-", motivation: "-", joined_at: "2026-04-19 2:46" },
          { id: "fire33", rank: "회원", location: "서울", experience: "1-3년", age: "30대", motivation: "경제적자유 열심히공부할게요", joined_at: "2026-04-19 2:46" },
          { id: "sebinhi", rank: "회원", location: "인천", experience: "5-10년", age: "40대", motivation: "경제적 자유", joined_at: "2026-04-19 2:57" },
          { id: "popsong98", rank: "회원", location: "서울", experience: "1-3년", age: "20대 이하", motivation: "파이어족 되고 싶습니다!!", joined_at: "2026-04-19 3:16" },
          { id: "MoneySnipper", rank: "회원", location: "서울", experience: "3-5년", age: "30대", motivation: "빠른 은퇴", joined_at: "2026-04-19 3:26" },
          { id: "wlgh8654", rank: "회원", location: "서울", experience: "5-10년", age: "40대", motivation: "미국주식을 통한 경제적 자유 및 적극 활동", joined_at: "2026-04-19 3:49" },
          { id: "hjrubbi", rank: "회원", location: "청주", experience: "-", age: "40대", motivation: "성별: 여 (추가 인원)", joined_at: "2026-04-19 3:50" },
        ]);
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
          <span className="tag">[ ADMIN ]</span> 관리자 승인 센터 (HQ Member Approval) <LinkIcon size={20} className="icon-muted" />
        </h1>
      </div>

      <section className="admin-section">
        <h2 className="section-title">[ QUEUE ] 신규 가입 대기 인원</h2>
        <div className="empty-box glass">
          <p>대기 중인 신규 회원이 없습니다.</p>
        </div>
      </section>

      <section className="admin-section">
        <h2 className="section-title">[ PROMOTION ] 정규직 승격 심사 센터</h2>
        <div className="empty-box glass">
          <p>현재 접수된 실시간 승격 신청서가 없습니다.</p>
        </div>
      </section>

      <section className="admin-section">
        <h2 className="section-title">[ STAFF ] 사령부 전체 대원 명부</h2>
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
        .admin-container {
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .admin-title {
          font-size: 2.2rem;
          font-weight: 900;
          color: white;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .admin-title .tag {
          color: var(--primary);
        }

        .admin-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          letter-spacing: 0.05em;
        }

        .empty-box {
          padding: 30px;
          background: rgba(14, 165, 233, 0.05);
          border: 1px solid rgba(14, 165, 233, 0.1);
          border-radius: 12px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .table-container {
          overflow-x: auto;
          border-radius: 12px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table th {
          padding: 16px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          font-size: 0.8rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .admin-table td {
          padding: 16px;
          border-bottom: 1px solid var(--card-border);
          font-size: 0.9rem;
          color: #e2e8f0;
          font-weight: 600;
        }

        .id-cell {
          color: white;
          font-weight: 800;
        }

        .rank-badge {
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .rank-badge.commander {
          background: rgba(255, 0, 85, 0.2);
          color: #ff0055;
          border: 1px solid rgba(255, 0, 85, 0.3);
        }

        .rank-badge.elite {
          background: rgba(14, 165, 233, 0.2);
          color: #0ea5e9;
          border: 1px solid rgba(14, 165, 233, 0.3);
        }

        .memo-cell {
          max-width: 300px;
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--text-muted);
        }

        .date-cell {
          font-family: 'Fira Code', monospace;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
