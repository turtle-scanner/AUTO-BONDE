"use client";

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  Settings, 
  BarChart, 
  LayoutDashboard,
  UserPlus,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  status: 'approved' | 'pending' | 'rejected';
  joinDate: string;
  lastLogin: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<string>('');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const loggedUser = sessionStorage.getItem("dragonfly_user") || "";
    setUser(loggedUser);
    
    if (['cntfed', 'hjrubbi'].includes(loggedUser)) {
      setIsAuthorized(true);
      fetchMembers();
    } else {
      setIsAuthorized(false);
      setLoading(false);
    }
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/v6-api/members');
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (memberId: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    const updated = members.map(m => m.id === memberId ? { ...m, status: newStatus } : m);
    setMembers(updated);
    
    try {
      await fetch('/v6-api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (!isAuthorized && !loading) {
    return (
      <div className="auth-error animate-fade-in">
        <AlertCircle size={48} className="error-icon" />
        <h1>??ÔøΩÎºîÔøΩÎã™??ÔøΩÏçí??¥ÔøΩ??ÔøΩÎ?????ÔøΩÔøΩ?§Ôºò????ÔøΩÎúÑÔøΩÎ†°.</h1>
        <p>?≤„É´??øΩÎµ??????ÔøΩÎåñ?®ÔøΩ?ÔøΩÎïª??≤ÔøΩ???ÔøΩÎºîÔøΩÎã™???ÔøΩÏîàÔøΩÏùà??ÊøöÏôøÎ™æÔøΩ?Ä???ÔøΩÏä¢?äÔøΩ????ÔøΩÍµùÔøΩÎè≤??</p>
        <button onClick={() => window.location.href = '/hq/account'}>HQ????®ÎöÆ?ñÁîïÍ±îÔøΩ?</button>
        <style jsx>{`
          .auth-error { height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; color: white; text-align: center; }
          .error-icon { color: #ef4444; }
          button { padding: 12px 24px; background: var(--primary); border: none; border-radius: 8px; font-weight: 900; cursor: pointer; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-container animate-fade-in">
      <div className="admin-header">
        <div className="header-left">
          <h1><span className="tag">[ MASTER ]</span> COMMAND CENTER</h1>
          <p className="subtitle">?ÔøΩÎÑ≠?®ÔΩãÏ≥????????ÔøΩÎèÆÔøΩÔøΩ??????Á≠åÔøΩ?Ôß•ÔøΩ????????/p>
        </div>
        <div className="header-right">
          <button className="refresh-btn" onClick={fetchMembers} disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> SYNC DATABASE
          </button>
        </div>
      </div>

      <div className="admin-grid">
        {/* Statistics Card */}
        <div className="stat-row">
          <GlassCard className="stat-card">
            <Users className="stat-icon" />
            <div className="stat-info">
              <span className="label">TOTAL MEMBERS</span>
              <span className="value">{members.length}</span>
            </div>
          </GlassCard>
          <GlassCard className="stat-card">
            <ShieldCheck className="stat-icon green" />
            <div className="stat-info">
              <span className="label">APPROVED</span>
              <span className="value">{members.filter(m => m.status === 'approved').length}</span>
            </div>
          </GlassCard>
          <GlassCard className="stat-card">
            <AlertCircle className="stat-icon gold" />
            <div className="stat-info">
              <span className="label">PENDING</span>
              <span className="value">{members.filter(m => m.status === 'pending').length}</span>
            </div>
          </GlassCard>
        </div>

        {/* Members List */}
        <GlassCard className="members-card">
          <div className="card-header">
            <h3><Users size={20} className="gold" /> ???????? ??üÎ∞∏≈¶?äÏñïÏß??/h3>
          </div>
          <div className="members-table-wrap">
            <table className="members-table">
              <thead>
                <tr>
                  <th>????ID</th>
                  <th>???ÔøΩÎø•?/th>
                  <th>??ÔøΩÎ?Â™õÏï≤??/th>
                  <th>?ÔøΩÏîàÔøΩÏùà?????®Î£∏??/th>
                  <th>?≤„É´??øΩÎµ???≤ÔøΩ???ÔøΩÎºî?ÔøΩÎåÜ?/th>
                  <th>???ÔøΩÎº¥ÔøΩÔøΩ?/th>
                </tr>
              </thead>
              <tbody>
                {members.map(member => (
                  <tr key={member.id}>
                    <td><span className="member-id">{member.id}</span></td>
                    <td><span className="member-name">{member.name || 'N/A'}</span></td>
                    <td>
                      <span className={`status-badge ${member.status}`}>
                        {member.status.toUpperCase()}
                      </span>
                    </td>
                    <td>{member.joinDate || '-'}</td>
                    <td>{member.lastLogin || '-'}</td>
                    <td>
                      <div className="action-btns">
                        {member.status !== 'approved' && (
                          <button className="approve" onClick={() => handleStatusChange(member.id, 'approved')}>
                            <CheckCircle size={14} /> APPROVE
                          </button>
                        )}
                        {member.status !== 'rejected' && (
                          <button className="reject" onClick={() => handleStatusChange(member.id, 'rejected')}>
                            <XCircle size={14} /> REJECT
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>

      <style jsx>{`
        .admin-container { padding: 40px; display: flex; flex-direction: column; gap: 32px; color: white; }
        .admin-header { display: flex; justify-content: space-between; align-items: flex-end; }
        .tag { color: var(--primary); font-weight: 950; }
        .subtitle { color: #64748b; font-size: 0.9rem; font-weight: 600; margin-top: 6px; }
        
        .refresh-btn { 
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: white; padding: 10px 20px; border-radius: 10px; font-size: 0.8rem;
          font-weight: 800; cursor: pointer; display: flex; align-items: center; gap: 10px;
        }

        .admin-grid { display: flex; flex-direction: column; gap: 30px; }
        .stat-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-card { padding: 24px; display: flex; align-items: center; gap: 20px; }
        .stat-icon { width: 40px; height: 40px; color: #64748b; }
        .stat-icon.green { color: #10b981; }
        .stat-icon.gold { color: var(--primary); }
        .stat-info { display: flex; flex-direction: column; }
        .stat-info .label { font-size: 0.65rem; font-weight: 800; color: #64748b; letter-spacing: 1px; }
        .stat-info .value { font-size: 1.8rem; font-weight: 950; }

        .members-card { padding: 30px; }
        .card-header { margin-bottom: 24px; }
        .card-header h3 { font-size: 1rem; font-weight: 900; }
        
        .members-table-wrap { overflow-x: auto; }
        .members-table { width: 100%; border-collapse: collapse; text-align: left; }
        .members-table th { padding: 15px; font-size: 0.75rem; color: #64748b; font-weight: 800; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .members-table td { padding: 18px 15px; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.02); }
        
        .member-id { font-weight: 900; color: var(--primary); }
        .member-name { font-weight: 700; color: #cbd5e1; }
        
        .status-badge { padding: 4px 10px; border-radius: 15px; font-size: 0.65rem; font-weight: 900; }
        .status-badge.approved { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .status-badge.pending { background: rgba(212, 175, 55, 0.1); color: var(--primary); }
        .status-badge.rejected { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

        .action-btns { display: flex; gap: 10px; }
        .action-btns button { padding: 6px 12px; border: none; border-radius: 6px; font-size: 0.7rem; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .action-btns button.approve { background: #10b981; color: black; }
        .action-btns button.reject { background: #ef4444; color: white; }
        .action-btns button:hover { transform: translateY(-2px); filter: brightness(1.1); }

        .gold { color: var(--primary); }
      `}</style>
    </div>
  );
}
