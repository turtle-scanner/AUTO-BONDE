"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, User, Heart, Smile, Plus } from 'lucide-react';

interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMine: boolean;
  reactions?: string[];
}

const STORAGE_KEY = 'dragonfly_chat_msgs_v6_toss';

const defaultMsgs: ChatMsg[] = [
  { id: 1, sender: "본데", text: "사령관님, 오늘 시장 분위기 어때요? ☕", time: "오전 09:10", isMine: false, reactions: ["👍"] },
  { id: 2, sender: "사령관", text: "나스닥 선물이 강하게 말아 올리네요. 분위기 좋습니다!", time: "오전 09:12", isMine: true },
  { id: 3, sender: "fire33", text: "안녕하세요! 오늘 첫 출석합니다. 잘 부탁드려요 🙏", time: "오전 09:15", isMine: false },
  { id: 4, sender: "sebinhi", text: "환영합니다! 오늘 반도체 쪽 흐름이 특히 좋네요.", time: "오전 09:16", isMine: false, reactions: ["🔥"] },
  { id: 5, sender: "hjrubbi", text: "유하니 커맨더한테 물어보니 VCP 패턴 종목들이 꽤 잡히네요!", time: "오전 09:20", isMine: false },
];

export default function TossChatPage() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [userCount, setUserCount] = useState(3);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load messages and simulate live user count
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMsgs(JSON.parse(saved));
    else setMsgs(defaultMsgs);

    // 인원수 실시간 변동 시뮬레이션 (3~7명)
    const interval = setInterval(() => {
      setUserCount(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const next = prev + delta;
        return next >= 3 && next <= 12 ? next : prev;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const handleSend = () => {
    if (!input.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    
    const newMsg: ChatMsg = {
      id: Date.now(),
      sender: "사령관",
      text: input.trim(),
      time: timeStr,
      isMine: true,
    };
    setMsgs([...msgs, newMsg]);
    setInput('');
  };

  return (
    <div className="toss-chat-container animate-fade-in">
      {/* Header */}
      <div className="chat-nav glass">
        <div className="nav-content">
          <h1 className="nav-title">안티그래비티 광장</h1>
          <div className="active-users">
            <div className="user-dots">
              <div className="dot pulse-1"></div>
              <div className="dot pulse-2"></div>
              <div className="dot pulse-3"></div>
            </div>
            <span>{userCount}명 대화 중</span>
          </div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        <div className="date-divider">2026년 5월 3일</div>
        
        {msgs.map((msg) => (
          <div key={msg.id} className={`msg-wrapper ${msg.isMine ? 'mine' : 'other'}`}>
            {!msg.isMine && (
              <div className="avatar-circle">
                {msg.sender[0]}
              </div>
            )}
            <div className="msg-content">
              {!msg.isMine && <span className="sender-name">{msg.sender}</span>}
              <div className="bubble-group">
                <div className="bubble">
                  {msg.text}
                </div>
                {msg.reactions && (
                  <div className="reaction-tag">
                    {msg.reactions.map((r, i) => <span key={i}>{r}</span>)}
                  </div>
                )}
              </div>
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area glass">
        <button className="plus-btn"><Plus size={20} /></button>
        <div className="input-wrapper">
          <input 
            type="text" 
            placeholder="마음을 담아 대화해보세요" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <div className="input-icons">
            <Smile size={20} className="icon-muted" />
          </div>
        </div>
        <button className={`send-btn ${input ? 'active' : ''}`} onClick={handleSend}>
          <Send size={18} />
        </button>
      </div>

      <style jsx>{`
        .toss-chat-container {
          height: calc(100vh - 120px);
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          background: #f9fafb;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          position: relative;
        }

        /* Header */
        .chat-nav {
          padding: 24px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid #f2f4f6;
          z-index: 10;
        }
        .nav-content { display: flex; justify-content: space-between; align-items: center; }
        .nav-title { font-size: 1.2rem; font-weight: 800; color: #191f28; }
        
        .active-users { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          font-size: 0.85rem; 
          color: #6b7684; 
          font-weight: 600;
          background: #f2f4f6;
          padding: 6px 14px;
          border-radius: 20px;
        }
        .user-dots { display: flex; gap: 4px; }
        .dot { width: 6px; height: 6px; background: #3182f6; border-radius: 50%; opacity: 0.3; }
        
        .pulse-1 { animation: pulse 1.5s infinite 0s; }
        .pulse-2 { animation: pulse 1.5s infinite 0.3s; }
        .pulse-3 { animation: pulse 1.5s infinite 0.6s; }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Body */
        .chat-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: #ffffff;
        }
        .date-divider { text-align: center; font-size: 0.75rem; color: #adb5bd; font-weight: 600; margin: 10px 0; }

        .msg-wrapper { display: flex; gap: 12px; max-width: 85%; }
        .msg-wrapper.mine { align-self: flex-end; flex-direction: row-reverse; }
        
        .avatar-circle {
          width: 36px;
          height: 36px;
          background: #f2f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          color: #4e5968;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .msg-content { display: flex; flex-direction: column; gap: 6px; }
        .sender-name { font-size: 0.8rem; font-weight: 700; color: #4e5968; margin-left: 4px; }
        
        .bubble-group { position: relative; }
        .bubble {
          padding: 14px 18px;
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 500;
          color: #191f28;
          border-radius: 20px;
          background: #f2f4f6;
          word-break: break-all;
        }
        .mine .bubble {
          background: #3182f6;
          color: #ffffff;
          border-bottom-right-radius: 4px;
        }
        .other .bubble {
          border-bottom-left-radius: 4px;
        }

        .reaction-tag {
          position: absolute;
          bottom: -10px;
          right: 10px;
          background: white;
          border: 1px solid #f2f4f6;
          border-radius: 12px;
          padding: 2px 6px;
          display: flex;
          gap: 2px;
          font-size: 0.8rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .msg-time { font-size: 0.65rem; color: #adb5bd; font-weight: 600; margin: 2px 6px; }
        .mine .msg-time { text-align: right; }

        /* Input */
        .input-area {
          padding: 20px 24px;
          background: white;
          display: flex;
          align-items: center;
          gap: 16px;
          border-top: 1px solid #f2f4f6;
        }
        .plus-btn { background: #f2f4f6; border: none; color: #6b7684; width: 36px; height: 36px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        
        .input-wrapper {
          flex: 1;
          background: #f2f4f6;
          border-radius: 18px;
          display: flex;
          align-items: center;
          padding: 0 16px;
        }
        .input-wrapper input {
          flex: 1;
          background: none;
          border: none;
          padding: 12px 0;
          font-size: 0.95rem;
          color: #191f28;
          outline: none;
          font-family: inherit;
        }
        .input-wrapper input::placeholder { color: #adb5bd; }
        .input-icons { margin-left: 10px; cursor: pointer; }

        .send-btn {
          width: 42px;
          height: 42px;
          background: #f2f4f6;
          color: #adb5bd;
          border: none;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .send-btn.active { background: #3182f6; color: white; transform: scale(1.05); box-shadow: 0 4px 12px rgba(49, 130, 246, 0.3); }

        .icon-muted { color: #6b7684; }

        /* Scrollbar */
        .chat-body::-webkit-scrollbar { width: 6px; }
        .chat-body::-webkit-scrollbar-thumb { background: #f2f4f6; border-radius: 10px; }
      `}</style>
    </div>
  );
}
