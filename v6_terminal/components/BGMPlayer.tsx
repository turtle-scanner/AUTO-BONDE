"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

const BGMPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 브라우저 자동재생 차단을 피하기 위한 로직
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Auto-play blocked, waiting for manual play:", err);
        });
      }
      // 이벤트 한 번만 실행 후 제거
      window.removeEventListener('click', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="bgm-player glass">
      <audio 
        ref={audioRef} 
        src="/bgm.mp3" 
        loop 
        preload="auto"
      />
      
      <div className="status-dot-container">
        <div className={`status-dot ${isPlaying ? 'active' : ''}`}></div>
      </div>

      <button className="control-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
      </button>

      <div className="volume-control">
        {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>

      <span className="track-info">COMMAND_CENTER_BGM</span>

      <style jsx>{`
        .bgm-player {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 20px;
          border-radius: 50px;
          z-index: 1000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-dot-container {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status-dot {
          width: 4px;
          height: 4px;
          background: #ff0055;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .status-dot.active {
          background: #00ff88;
          box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
          animation: pulse 1s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .control-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .control-btn:hover {
          transform: scale(1.1);
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.5);
        }

        .volume-control input {
          width: 60px;
          accent-color: #00ff88;
          cursor: pointer;
        }

        .track-info {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding-left: 16px;
        }
      `}</style>
    </div>
  );
};

export default BGMPlayer;
