import { useCallback, useRef } from 'react';

// Enhanced sound generation for premium effects
const createAudioContext = () => {
  if (typeof window === 'undefined') return null;
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch (e) {
    console.warn('AudioContext not supported');
    return null;
  }
};

const generatePremiumTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.08) => {
  const audioContext = createAudioContext();
  if (!audioContext) return null;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  // Create premium sound chain: oscillator -> filter -> gain -> destination
  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Configure filter for warmer, more premium sound
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2000, audioContext.currentTime);
  filter.Q.setValueAtTime(1, audioContext.currentTime);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = type;

  // Premium envelope: smooth attack and decay
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  return { oscillator, gainNode, audioContext, filter };
};

const generateSparkle = (baseFreq: number) => {
  const audioContext = createAudioContext();
  if (!audioContext) return null;

  // Create multiple oscillators for sparkle effect
  const oscillators = [];
  const gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);

  // Create harmonic sparkle with multiple frequencies
  const frequencies = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 2];
  
  frequencies.forEach((freq, index) => {
    const osc = audioContext.createOscillator();
    const oscGain = audioContext.createGain();
    
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    osc.type = 'sine';
    
    // Staggered timing for sparkle effect
    const startTime = audioContext.currentTime + index * 0.02;
    const volume = 0.03 / (index + 1); // Decreasing volume for harmonics
    
    oscGain.gain.setValueAtTime(0, startTime);
    oscGain.gain.linearRampToValueAtTime(volume, startTime + 0.005);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
    
    oscillators.push({ osc, startTime });
  });

  return { oscillators, gainNode, audioContext };
};

export const useSound = () => {
  const lastPlayTime = useRef<number>(0);
  
  // Debounce to prevent audio spam
  const canPlaySound = useCallback(() => {
    const now = Date.now();
    if (now - lastPlayTime.current < 50) return false; // 50ms debounce
    lastPlayTime.current = now;
    return true;
  }, []);

  const playButtonClick = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Premium button click: soft bell-like tone
    const tone = generatePremiumTone(880, 0.12, 'sine', 0.06);
    if (tone) {
      // Add subtle frequency modulation for premium feel
      tone.oscillator.frequency.setValueAtTime(880, tone.audioContext.currentTime);
      tone.oscillator.frequency.linearRampToValueAtTime(1100, tone.audioContext.currentTime + 0.03);
      tone.oscillator.frequency.linearRampToValueAtTime(800, tone.audioContext.currentTime + 0.12);
      
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.12);
    }
  }, [canPlaySound]);

  const playIconClick = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Subtle icon click: soft high-pitched chime
    const tone = generatePremiumTone(1320, 0.08, 'sine', 0.04);
    if (tone) {
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.08);
    }
  }, [canPlaySound]);

  const playDiamondSparkle = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Diamond sparkle effect: multiple harmonics
    const sparkle = generateSparkle(1760);
    if (sparkle) {
      sparkle.oscillators.forEach(({ osc, startTime }) => {
        osc.start(startTime);
        osc.stop(startTime + 0.15);
      });
    }
  }, [canPlaySound]);

  const playSuccess = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Success: Pleasant chord progression
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G major chord
    frequencies.forEach((freq, index) => {
      const tone = generatePremiumTone(freq, 0.8, 'sine', 0.05);
      if (tone) {
        const startTime = tone.audioContext.currentTime + index * 0.1;
        tone.oscillator.start(startTime);
        tone.oscillator.stop(startTime + 0.8);
      }
    });
  }, [canPlaySound]);

  const playShine = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Elegant shine effect
    const tone = generatePremiumTone(1400, 0.25, 'triangle', 0.05);
    if (tone) {
      tone.oscillator.frequency.setValueAtTime(1400, tone.audioContext.currentTime);
      tone.oscillator.frequency.linearRampToValueAtTime(1800, tone.audioContext.currentTime + 0.12);
      tone.oscillator.frequency.linearRampToValueAtTime(1200, tone.audioContext.currentTime + 0.25);
      
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.25);
    }
  }, [canPlaySound]);

  const playNotification = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Elegant notification: two-tone harmony
    const tone1 = generatePremiumTone(660, 0.2, 'sine', 0.04);
    const tone2 = generatePremiumTone(880, 0.2, 'sine', 0.04);
    
    if (tone1 && tone2) {
      tone1.oscillator.start(tone1.audioContext.currentTime);
      tone1.oscillator.stop(tone1.audioContext.currentTime + 0.2);
      
      tone2.oscillator.start(tone2.audioContext.currentTime + 0.1);
      tone2.oscillator.stop(tone2.audioContext.currentTime + 0.3);
    }
  }, [canPlaySound]);

  const playGlow = useCallback(() => {
    if (!canPlaySound()) return;
    
    // Subtle hover/glow effect
    const tone = generatePremiumTone(500, 0.3, 'sine', 0.025);
    if (tone) {
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.3);
    }
  }, [canPlaySound]);

  return {
    playButtonClick,
    playIconClick,
    playDiamondSparkle,
    playSuccess,
    playShine,
    playNotification,
    playGlow,
  };
};