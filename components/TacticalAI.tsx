"use client";

import React, { useEffect, useCallback } from 'react';

interface TacticalAIProps {
  onReady?: () => void;
}

export default function TacticalAI({ onReady }: TacticalAIProps) {
  
  const playVoice = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find a premium-sounding female voice (trying to match requested persona)
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Yuri')) && 
      v.lang.startsWith('ko')
    ) || voices.find(v => v.lang.startsWith('ko'));

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    
    utterance.pitch = 1.1; // Slightly higher for 20-something feel
    utterance.rate = 1.0;
    utterance.volume = 0.8;
    
    window.speechSynthesis.speak(utterance);
  }, []);

  const playSound = useCallback((type: 'success' | 'alert' | 'click') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(audioContext.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    } else if (type === 'alert') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audioContext.currentTime);
      osc.frequency.setValueAtTime(110, audioContext.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    } else {
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, audioContext.currentTime);
      gain.gain.setValueAtTime(0.05, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    }

    osc.start();
    osc.stop(audioContext.currentTime + 0.5);
  }, []);

  // Expose to window for easy access from other components
  useEffect(() => {
    (window as any).tacticalAI = {
      speak: playVoice,
      play: playSound
    };
    if (onReady) onReady();
  }, [playVoice, playSound, onReady]);

  return null; // Invisible component
}
