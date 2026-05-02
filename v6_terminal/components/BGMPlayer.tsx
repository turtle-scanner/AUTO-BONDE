"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';

// Cyber-ambient BGM engine using Web Audio API
// Generates a layered, atmospheric electronic soundscape in real-time
const BGMPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const nodesRef = useRef<OscillatorNode[]>([]);
  const lfoRef = useRef<OscillatorNode[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const createEngine = useCallback(() => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);
    gainRef.current = master;

    // Layer 1: Deep sub-bass pad (warm foundation)
    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 55; // A1
    const subGain = ctx.createGain();
    subGain.gain.value = 0.15;
    const subFilter = ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 120;
    sub.connect(subFilter).connect(subGain).connect(master);

    // Layer 2: Ethereal pad chord (Cm7 voicing)
    const padNotes = [130.81, 155.56, 196.0, 233.08]; // C3, Eb3, G3, Bb3
    const padOscs: OscillatorNode[] = [];
    padNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = 0.04;
      
      // Subtle detuning for richness
      osc.detune.value = (i - 1.5) * 4;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;
      filter.Q.value = 2;
      
      osc.connect(filter).connect(g).connect(master);
      padOscs.push(osc);
    });

    // Layer 3: High shimmer (octave up, very quiet)
    const shimmer = ctx.createOscillator();
    shimmer.type = 'triangle';
    shimmer.frequency.value = 523.25; // C5
    const shimGain = ctx.createGain();
    shimGain.gain.value = 0.015;
    const shimFilter = ctx.createBiquadFilter();
    shimFilter.type = 'bandpass';
    shimFilter.frequency.value = 600;
    shimFilter.Q.value = 5;
    shimmer.connect(shimFilter).connect(shimGain).connect(master);

    // LFO 1: Slow volume swell on pad
    const lfo1 = ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.value = 0.08; // Very slow breathing
    const lfo1Gain = ctx.createGain();
    lfo1Gain.gain.value = 0.02;
    lfo1.connect(lfo1Gain);
    padOscs.forEach(osc => {
      // We can't directly modulate gain param of individual gains easily,
      // so we modulate the filter frequency for a sweeping effect
    });

    // LFO 2: Filter sweep on shimmer
    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.value = 0.05;
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.value = 300;
    lfo2.connect(lfo2Gain).connect(shimFilter.frequency);

    // Start all
    const allOsc = [sub, ...padOscs, shimmer];
    const allLfo = [lfo1, lfo2];
    allOsc.forEach(o => o.start());
    allLfo.forEach(l => l.start());
    nodesRef.current = allOsc;
    lfoRef.current = allLfo;

    // Chord progression: slowly shift pad notes every 12 seconds
    const chords = [
      [130.81, 155.56, 196.0, 233.08],  // Cm7
      [116.54, 146.83, 174.61, 220.0],  // Bb maj7
      [123.47, 155.56, 185.0, 220.0],   // Eb maj
      [110.0, 138.59, 164.81, 207.65],  // Ab maj7
    ];
    let chordIdx = 0;
    intervalRef.current = setInterval(() => {
      chordIdx = (chordIdx + 1) % chords.length;
      const chord = chords[chordIdx];
      const now = ctx.currentTime;
      padOscs.forEach((osc, i) => {
        osc.frequency.linearRampToValueAtTime(chord[i], now + 4); // 4s smooth transition
      });
      sub.frequency.linearRampToValueAtTime(chord[0] / 2, now + 4);
    }, 12000);

  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      // Stop
      nodesRef.current.forEach(o => { try { o.stop(); } catch(e){} });
      lfoRef.current.forEach(l => { try { l.stop(); } catch(e){} });
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
      audioCtxRef.current = null;
      nodesRef.current = [];
      lfoRef.current = [];
      setIsPlaying(false);
    } else {
      // Start
      createEngine();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = volume;
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      nodesRef.current.forEach(o => { try { o.stop(); } catch(e){} });
      lfoRef.current.forEach(l => { try { l.stop(); } catch(e){} });
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="bgm-player glass">
      <div className="status-dot-container">
        <div className={`status-dot ${isPlaying ? 'active' : ''}`}></div>
      </div>

      <button className="control-btn" onClick={togglePlay}>
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

      <span className="track-info">CYBER_AMBIENT_v6.0</span>

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
          background: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
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
          color: var(--text-muted);
        }

        .volume-control input {
          width: 60px;
          accent-color: var(--primary);
          cursor: pointer;
        }

        .track-info {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          border-left: 1px solid var(--card-border);
          padding-left: 16px;
        }
      `}</style>
    </div>
  );
};

export default BGMPlayer;
