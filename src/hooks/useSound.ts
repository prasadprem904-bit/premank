import { useCallback, useRef } from 'react';

// Sound effect URLs (using web-based sound effects)
const SOUND_EFFECTS = {
  buttonClick: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsF',
  success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsF',
  shine: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsF',
  notification: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmEbBzaS1/LNeSsF',
};

// Generate better quality synthetic sounds
const createAudioContext = () => {
  if (typeof window === 'undefined') return null;
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

const generateTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
  const audioContext = createAudioContext();
  if (!audioContext) return null;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.type = type;

  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

  return { oscillator, gainNode, audioContext };
};

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playButtonClick = useCallback(() => {
    const tone = generateTone(800, 0.1, 'square');
    if (tone) {
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.1);
    }
  }, []);

  const playSuccess = useCallback(() => {
    // Play a pleasant success chord
    const frequencies = [523.25, 659.25, 783.99]; // C, E, G major chord
    frequencies.forEach((freq, index) => {
      const tone = generateTone(freq, 0.8, 'sine');
      if (tone) {
        tone.oscillator.start(tone.audioContext.currentTime + index * 0.1);
        tone.oscillator.stop(tone.audioContext.currentTime + 0.8 + index * 0.1);
      }
    });
  }, []);

  const playShine = useCallback(() => {
    // Sparkling diamond sound effect
    const tone = generateTone(1200, 0.3, 'triangle');
    if (tone) {
      // Add frequency modulation for sparkle effect
      tone.oscillator.frequency.setValueAtTime(1200, tone.audioContext.currentTime);
      tone.oscillator.frequency.linearRampToValueAtTime(1800, tone.audioContext.currentTime + 0.15);
      tone.oscillator.frequency.linearRampToValueAtTime(1000, tone.audioContext.currentTime + 0.3);
      
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.3);
    }
  }, []);

  const playNotification = useCallback(() => {
    // Two-tone notification
    const tone1 = generateTone(660, 0.2, 'sine');
    const tone2 = generateTone(880, 0.2, 'sine');
    
    if (tone1 && tone2) {
      tone1.oscillator.start(tone1.audioContext.currentTime);
      tone1.oscillator.stop(tone1.audioContext.currentTime + 0.2);
      
      tone2.oscillator.start(tone2.audioContext.currentTime + 0.15);
      tone2.oscillator.stop(tone2.audioContext.currentTime + 0.35);
    }
  }, []);

  const playGlow = useCallback(() => {
    // Subtle glow effect sound
    const tone = generateTone(400, 0.5, 'sine');
    if (tone) {
      tone.gainNode.gain.setValueAtTime(0, tone.audioContext.currentTime);
      tone.gainNode.gain.linearRampToValueAtTime(0.05, tone.audioContext.currentTime + 0.1);
      tone.gainNode.gain.linearRampToValueAtTime(0.02, tone.audioContext.currentTime + 0.3);
      tone.gainNode.gain.linearRampToValueAtTime(0.001, tone.audioContext.currentTime + 0.5);
      
      tone.oscillator.start(tone.audioContext.currentTime);
      tone.oscillator.stop(tone.audioContext.currentTime + 0.5);
    }
  }, []);

  return {
    playButtonClick,
    playSuccess,
    playShine,
    playNotification,
    playGlow,
  };
};