"use client";

import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '@/components/GlassCard';
import { 
  Send, 
  MessageCircle, 
  User, 
  Heart, 
  MoreHorizontal, 
  Trash2, 
  Edit3, 
  Share2,
  Smile,
  Image as ImageIcon
} from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Post {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  isMine: boolean;
}

const STORAGE_KEY = 'dragonfly_square_feed_v6_toss';

const defaultPosts: Post[] = [
  { 
    id: 1, 
    author: "본데", 
    text: "오늘 에피소딕 피벗(EP) 발생한 종목들 흐름이 심상치 않네요. 사령관님 가이드대로 21일선 지지 확인하며 대응 중입니다. 다들 성투하세요! ☕", 
    date: "오늘 오전 09:10", 
    likes: 12, 
    liked: false,
    comments: [
      { id: 101, author: "사령관", text: "본데님, 원칙 준수 아주 좋습니다. 거래량 실린 돌파 확인하세요!", date: "09:12" }
    ],
    isMine: false 
  },
  { 
    id: 2, 
    author: "사령관", 
    text: "안티그래비티 사령부의 모든 시스템이 5월 4일 라이브 작전을 위해 최종 점검 중입니다. 대원 여러분, 준비되셨습니까? 🚀", 
    date: "오늘 오전 10:30", 
    likes: 45, 
    liked: true,
    comments: [],
    isMine: true 
  }
];

export default function SquareFeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState("사령관");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("dragonfly_user") || "사령관";
    setCurrentUser(user);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setPosts(JSON.parse(saved));
    else setPosts(defaultPosts);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts, loaded]);

  const handlePost = () => {
    if (!input.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      author: currentUser,
      text: input.trim(),
      date: "방금 전",
      likes: 0,
      liked: false,
      comments: [],
      isMine: true
    };
    setPosts([newPost, ...posts]);
    setInput('');
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          likes: p.liked ? p.likes - 1 : p.likes + 1,
          liked: !p.liked 
        };
      }
      return p;
    }));
  };

  const handleDelete = (id: number) => {
    if (confirm("게시물을 삭제하시겠습니까?")) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  return (
    <div className="toss-feed-container animate-fade-in">
      {/* Header */}
      <div className="feed-header">
        <h1>사령부 광장</h1>
        <p>대원들과 자유롭게 전술을 공유하고 소통하세요.</p>
      </div>

      {/* Input Section */}
      <GlassCard className="feed-input-card">
        <div className="input-top">
          <div className="avatar">{currentUser[0]}</div>
          <textarea 
            placeholder={`${currentUser} 대원님, 무슨 생각을 하고 계신가요?`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="input-bottom">
          <div className="tools">
            <button className="tool-btn"><ImageIcon size={20} /> 사진</button>
            <button className="tool-btn"><Smile size={20} /> 이모지</button>
          </div>
          <button 
            className={`post-btn ${input.trim() ? 'active' : ''}`}
            onClick={handlePost}
            disabled={!input.trim()}
          >
            올리기
          </button>
        </div>
      </GlassCard>

      {/* Feed List */}
      <div className="feed-list">
        {posts.map((post) => (
          <GlassCard key={post.id} className="post-card">
            <div className="post-top">
              <div className="post-author">
                <div className="avatar-small">{post.author[0]}</div>
                <div className="author-info">
                  <span className="name">{post.author}</span>
                  <span className="date">{post.date}</span>
                </div>
              </div>
              {post.isMine && (
                <button className="more-btn" onClick={() => handleDelete(post.id)}>
                  <Trash2 size={18} className="icon-muted" />
                </button>
              )}
            </div>

            <div className="post-text">{post.text}</div>

            <div className="post-actions">
              <button 
                className={`action-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={18} fill={post.liked ? "#3182f6" : "none"} />
                {post.likes}
              </button>
              <button className="action-btn">
                <MessageCircle size={18} />
                {post.comments.length}
              </button>
              <button className="action-btn">
                <Share2 size={18} />
              </button>
            </div>

            {post.comments.length > 0 && (
              <div className="comments-area">
                {post.comments.map(c => (
                  <div key={c.id} className="comment-item">
                    <span className="c-author">{c.author}</span>
                    <span className="c-text">{c.text}</span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>

      <style jsx>{`
        .toss-feed-container {
          max-width: 650px;
          margin: 0 auto;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          color: white;
        }

        .feed-header h1 { font-size: 1.8rem; font-weight: 950; margin-bottom: 8px; }
        .feed-header p { color: #94a3b8; font-weight: 600; }

        .feed-input-card { padding: 24px; border: 1px solid rgba(255,255,255,0.05); }
        .input-top { display: flex; gap: 16px; margin-bottom: 20px; }
        .avatar { 
          width: 48px; height: 48px; background: #3182f6; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 1.2rem; flex-shrink: 0;
        }
        textarea {
          flex: 1; background: none; border: none; outline: none;
          color: white; font-size: 1.05rem; font-weight: 500;
          resize: none; min-height: 80px; font-family: inherit;
        }
        textarea::placeholder { color: #4e5968; }

        .input-bottom { display: flex; justify-content: space-between; align-items: center; }
        .tools { display: flex; gap: 12px; }
        .tool-btn { 
          background: none; border: none; color: #94a3b8; 
          display: flex; align-items: center; gap: 8px; 
          font-size: 0.85rem; font-weight: 700; cursor: pointer;
        }
        .post-btn {
          padding: 10px 24px; border-radius: 12px; border: none;
          background: #1e293b; color: #4e5968; font-weight: 900;
          cursor: pointer; transition: all 0.3s;
        }
        .post-btn.active { background: #3182f6; color: white; box-shadow: 0 4px 12px rgba(49, 130, 246, 0.3); }

        .feed-list { display: flex; flex-direction: column; gap: 20px; }
        .post-card { padding: 24px; border: 1px solid rgba(255,255,255,0.02); transition: all 0.3s; }
        .post-card:hover { border-color: rgba(49, 130, 246, 0.2); transform: translateY(-2px); }

        .post-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .post-author { display: flex; gap: 12px; align-items: center; }
        .avatar-small {
          width: 36px; height: 36px; background: #4e5968; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-size: 0.9rem;
        }
        .author-info { display: flex; flex-direction: column; }
        .name { font-size: 0.95rem; font-weight: 800; color: #f2f2f2; }
        .date { font-size: 0.75rem; color: #64748b; font-weight: 600; }
        .more-btn { background: none; border: none; cursor: pointer; padding: 4px; border-radius: 8px; }
        .more-btn:hover { background: rgba(255,255,255,0.05); }

        .post-text { font-size: 1rem; line-height: 1.6; color: #cbd5e1; font-weight: 500; margin-bottom: 20px; white-space: pre-wrap; }

        .post-actions { display: flex; gap: 24px; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 16px; }
        .action-btn {
          background: none; border: none; color: #94a3b8;
          display: flex; align-items: center; gap: 8px;
          font-size: 0.9rem; font-weight: 700; cursor: pointer;
          transition: color 0.2s;
        }
        .action-btn:hover { color: #f2f2f2; }
        .action-btn.liked { color: #3182f6; }

        .comments-area {
          margin-top: 16px; background: rgba(0,0,0,0.2);
          border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px;
        }
        .comment-item { font-size: 0.85rem; display: flex; gap: 10px; }
        .c-author { font-weight: 800; color: #3182f6; }
        .c-text { color: #94a3b8; }

        .icon-muted { color: #4e5968; }
      `}</style>
    </div>
  );
}
