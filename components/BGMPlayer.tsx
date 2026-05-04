"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, ChevronUp } from 'lucide-react';

const playlist = [
  { name: "MY_BONDE", src: "/my_bonde.mp3" },
  { name: "CUTE", src: "/cute.mp3" },
  { name: "HAPPY", src: "/happy.mp3" },
  { name: "HOPE", src: "/hope.mp3" },
  { name: "PETTY", src: "/petty.mp3" },
  { name: "YOU_RAISE", src: "/YouRaise.mp3" },
];

const BGMPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Auto-play blocked:", err);
        });
      }
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

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
    // 오디오 소스가 바뀌면 자동으로 재생되도록 함
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setShowPlaylist(false);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
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
        src={playlist[currentTrack].src} 
        loop 
        preload="none"
      />
      
      <div className="playlist-container">
        {showPlaylist && (
          <div className="playlist-dropdown glass animate-slide-up">
            {playlist.map((track, i) => (
              <div 
                key={i} 
                className={`playlist-item ${currentTrack === i ? 'active' : ''}`}
                onClick={() => selectTrack(i)}
              >
                {track.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="player-controls">
        <button className="icon-btn-small" onClick={() => setShowPlaylist(!showPlaylist)}>
          <ChevronUp size={14} className={showPlaylist ? 'rotate-180' : ''} />
        </button>

        <button className="control-btn" onClick={togglePlay}>
          {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
        </button>

        <button className="icon-btn-small" onClick={nextTrack}>
          <SkipForward size={14} />
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

        <div className="track-display">
          <Music size={12} className={isPlaying ? 'animate-spin-slow' : ''} />
          <span className="track-info">{playlist[currentTrack].name}</span>
        </div>
      </div>

      <style jsx>{`
        .bgm-player {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          border-radius: 20px;
          padding: 8px 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .player-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .playlist-container {
          position: relative;
        }

        .playlist-dropdown {
          position: absolute;
          bottom: 50px;
          right: 0;
          width: 180px;
          max-height: 250px;
          overflow-y: auto;
          border-radius: 12px;
          padding: 8px;
          background: rgba(10, 10, 10, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .playlist-item {
          padding: 8px 12px;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .playlist-item:hover {
          background: rgba(255,255,255,0.05);
          color: white;
        }

        .playlist-item.active {
          color: #00ff88;
          background: rgba(0, 255, 136, 0.1);
        }

        .control-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .icon-btn-small {
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.2s;
        }

        .icon-btn-small:hover { color: white; }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 6px;
          border-left: 1px solid rgba(255,255,255,0.1);
          padding-left: 12px;
        }

        .volume-control input {
          width: 50px;
          accent-color: #00ff88;
        }

        .track-display {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.3);
          padding: 4px 12px;
          border-radius: 10px;
          min-width: 100px;
        }

        .track-info {
          font-size: 0.65rem;
          font-weight: 900;
          color: #00ff88;
          letter-spacing: 0.05em;
        }

        .rotate-180 { transform: rotate(180deg); }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BGMPlayer;
