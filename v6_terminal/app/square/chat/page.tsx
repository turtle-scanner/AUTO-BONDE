"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, ChevronLeft, ChevronRight, MessageCircle, User } from 'lucide-react';

interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMine: boolean;
}

const STORAGE_KEY = 'dragonfly_chat_msgs';
const PER_PAGE = 20;

const defaultMsgs: ChatMsg[] = [
  { id: 1, sender: "본데", text: "사령부 소통 대화방에 오신 것을 환영합니다! 🎖️", time: "09:00", isMine: false },
  { id: 2, sender: "본데", text: "오늘 시장 전체적으로 반도체 섹터가 강세입니다. INTC, MU 주목하세요.", time: "09:15", isMine: false },
  { id: 3, sender: "사령관", text: "CIEN도 RS 1위로 올라왔네요! 텔레콤 장비 섹터가 핫합니다.", time: "09:20", isMine: true },
  { id: 4, sender: "본데", text: "맞습니다. 6개월 수익률 183%... 진짜 괴물이네요 🔥", time: "09:22", isMine: false },
  { id: 5, sender: "사령관", text: "오늘 VCP 패턴 발견한 종목 있나요?", time: "09:30", isMine: true },
  { id: 6, sender: "본데", text: "FORM이 T구간 진입 중입니다. 변동성 수축이 아름답습니다.", time: "09:35", isMine: false },
  { id: 7, sender: "사령관", text: "좋습니다. 피벗 가격 확인하고 감시 리스트에 올리겠습니다.", time: "09:38", isMine: true },
  { id: 8, sender: "본데", text: "IBD 시장 상태: Confirmed Uptrend 유지 중. 공격적 매수 OK 🟢", time: "10:00", isMine: false },
];

export default function ChatPage() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [page, setPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMsgs(JSON.parse(saved));
      else { setMsgs(defaultMsgs); localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMsgs)); }
    } catch { setMsgs(defaultMsgs); }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  }, [msgs, loaded]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(msgs.length / PER_PAGE));
  const pagedMsgs = msgs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const newMsg: ChatMsg = {
      id: Date.now(),
      sender: "사령관",
      text: input.trim(),
      time: `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`,
      isMine: true,
    };
    const updated = [...msgs, newMsg];
    setMsgs(updated);
    setInput('');
    setPage(Math.ceil(updated.length / PER_PAGE));
  };

  return (
    <div className="chat-container animate-fade-in">
      {/* 채팅방 헤더 */}
      <div className="chat-header">
        <div className="header-left">
          <MessageCircle size={20} />
          <span className="room-name">🎖️ 본데 사령부 대화방</span>
        </div>
        <span className="member-count">{msgs.length}개 메시지</span>
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-info">{page} / {totalPages}</span>
          <button className="page-btn" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* 채팅 메시지 영역 */}
      <div className="chat-body">
        <div className="date-divider">
          <span>오늘</span>
        </div>
        {pagedMsgs.map(msg => (
          <div key={msg.id} className={`msg-row ${msg.isMine ? 'mine' : 'other'}`}>
            {!msg.isMine && (
              <div className="avatar">
                <User size={18} />
              </div>
            )}
            <div className="msg-content">
              {!msg.isMine && <span className="sender-name">{msg.sender}</span>}
              <div className={`bubble ${msg.isMine ? 'bubble-mine' : 'bubble-other'}`}>
                {msg.text}
              </div>
              <span className={`msg-time ${msg.isMine ? 'time-mine' : ''}`}>{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="chat-input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>

      <style jsx>{`
        .chat-container { display: flex; flex-direction: column; height: calc(100vh - 80px); max-width: 800px; margin: 0 auto; background: #0b1426; }

        .chat-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #1a2744; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .header-left { display: flex; align-items: center; gap: 10px; color: white; font-weight: 800; font-size: 1rem; }
        .room-name { font-size: 0.95rem; }
        .member-count { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }

        .pagination { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 8px; background: rgba(0,0,0,0.3); }
        .page-btn { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 6px; padding: 4px 10px; cursor: pointer; display: flex; align-items: center; }
        .page-btn:disabled { opacity: 0.3; cursor: default; }
        .page-info { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }

        .chat-body { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; }

        .date-divider { text-align: center; margin: 8px 0 16px; }
        .date-divider span { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 4px 16px; border-radius: 20px; }

        .msg-row { display: flex; gap: 8px; max-width: 80%; }
        .msg-row.mine { margin-left: auto; flex-direction: row-reverse; }
        .msg-row.other { margin-right: auto; }

        .avatar { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #fbbf24, #f59e0b); display: flex; align-items: center; justify-content: center; color: #1a1a2e; flex-shrink: 0; }

        .msg-content { display: flex; flex-direction: column; gap: 4px; }
        .sender-name { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); padding-left: 4px; }

        .bubble { padding: 10px 14px; font-size: 0.88rem; line-height: 1.5; font-weight: 500; word-break: break-word; }
        .bubble-other { background: #1e2d4a; color: #e2e8f0; border-radius: 4px 16px 16px 16px; }
        .bubble-mine { background: #fbbf24; color: #1a1a2e; border-radius: 16px 4px 16px 16px; font-weight: 600; }

        .msg-time { font-size: 0.6rem; color: rgba(255,255,255,0.25); font-weight: 600; padding: 0 4px; }
        .time-mine { text-align: right; }

        .chat-input-area { display: flex; gap: 10px; padding: 12px 16px; background: #1a2744; border-top: 1px solid rgba(255,255,255,0.05); }
        .chat-input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 10px 18px; color: white; font-size: 0.9rem; outline: none; font-family: inherit; }
        .chat-input:focus { border-color: #fbbf24; }
        .chat-input::placeholder { color: rgba(255,255,255,0.25); }
        .send-btn { width: 42px; height: 42px; border-radius: 50%; background: #fbbf24; border: none; color: #1a1a2e; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s; flex-shrink: 0; }
        .send-btn:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
}
