\"use client\";

import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause, SkipForward, ChevronUp } from 'lucide-react';

const playlist = [
  { name: \"MY_BONDE\", src: \"/my_bonde.mp3\" },
  { name: \"CUTE\", src: \"/cute.mp3\" },
  { name: \"HAPPY\", src: \"/happy.mp3\" },
  { name: \"HOPE\", src: \"/hope.mp3\" },
  { name: \"PETTY\", src: \"/petty.mp3\" },
  { name: \"YOU_RAISE\", src: \"/YouRaise.mp3\" },
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
          console.log(\"Auto-play blocked:\", err);
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
    // 오디오 소스 변경 시 약간의 지연 후 재생
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
    <div className=\"bgm-player glass\">
      <audio 
        ref={audioRef} 
        src={playlist[currentTrack].src} 
        loop 
        preload=\"none\"
      />
      
      <div className=\"playlist-container\">
        {showPlaylist && (
          <div className=\"playlist-dropdown glass animate-slide-up\">
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

      <div className=\"player-controls\">
        <button className=\"icon-btn-small\" onClick={() => setShowPlaylist(!showPlaylist)}>
          <ChevronUp size={14} className={showPlaylist ? 'rotate-180' : ''} />
        </button>
        
        <div className=\"track-info\">
          <Music size={14} className=\"gold\" />
          <span className=\"track-name\">{playlist[currentTrack].name}</span>
        </div>

        <div className=\"control-btns\">
          <button className=\"icon-btn\" onClick={togglePlay}>
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className=\"icon-btn\" onClick={nextTrack}>
            <SkipForward size={16} />
          </button>
        </div>

        <div className=\"volume-control\">
          {volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <input 
            type=\"range\" 
            min=\"0\" 
            max=\"1\" 
            step=\"0.01\" 
            value={volume} 
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className=\"volume-slider\"
          />
        </div>
      </div>

      <style jsx>{`
        .bgm-player {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 4000;
          padding: 10px 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 300px;
        }
        .player-controls { display: flex; align-items: center; gap: 15px; }
        .track-info { display: flex; align-items: center; gap: 8px; flex: 1; }
        .track-name { font-size: 0.75rem; font-weight: 800; color: #94a3b8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px; }
        
        .control-btns { display: flex; gap: 8px; }
        .icon-btn { background: none; border: none; color: #f2f2f2; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; transition: all 0.2s; }
        .icon-btn:hover { background: rgba(255, 255, 255, 0.1); color: var(--primary); }
        .icon-btn-small { background: none; border: none; color: #64748b; cursor: pointer; }
        
        .volume-control { display: flex; align-items: center; gap: 8px; }
        .volume-slider { width: 60px; height: 4px; border-radius: 2px; -webkit-appearance: none; background: rgba(255, 255, 255, 0.1); }
        .volume-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: var(--primary); cursor: pointer; }

        .playlist-dropdown { position: absolute; bottom: calc(100% + 10px); left: 0; width: 100%; border-radius: 12px; padding: 10px; display: flex; flex-direction: column; gap: 5px; }
        .playlist-item { padding: 8px 12px; font-size: 0.7rem; font-weight: 700; color: #64748b; border-radius: 6px; cursor: pointer; transition: all 0.2s; }
        .playlist-item:hover { background: rgba(212, 175, 55, 0.1); color: #f2f2f2; }
        .playlist-item.active { background: rgba(212, 175, 55, 0.2); color: var(--primary); }

        .rotate-180 { transform: rotate(180deg); }

        @media (max-width: 768px) {
          .bgm-player {
            bottom: 20px;
            left: 20px;
            right: 20px;
            min-width: 0;
            padding: 8px 15px;
          }
          .track-name { max-width: 80px; }
          .volume-control { display: none; }
        }
      `}</style>
    </div>
  );
}

export default BGMPlayer;
