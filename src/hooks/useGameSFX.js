// Web Audio API Sound Effects for Fantasy Study Quest
// Synthesized sounds - no external APIs needed

import { useCallback, useRef } from 'react';

const useGameSFX = () => {
  const audioCtxRef = useRef(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Helper: create noise buffer
  const createNoise = useCallback((ctx, duration) => {
    const sampleRate = ctx.sampleRate;
    const length = sampleRate * duration;
    const buffer = ctx.createBuffer(1, length, sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }, []);

  // ─── ATTACK HIT ───
  const playHit = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Impact thud - low frequency burst
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);

      // Noise burst for "crunch"
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = createNoise(ctx, 0.08);
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 800;
      noiseGain.gain.setValueAtTime(0.3, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(now);
      noiseSource.stop(now + 0.08);
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

  // ─── CRITICAL / SPECIAL ATTACK ───
  const playCritical = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Sharp metallic ring
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(600, now);
      osc1.frequency.exponentialRampToValueAtTime(200, now + 0.2);
      gain1.gain.setValueAtTime(0.35, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // Heavy impact
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(200, now + 0.05);
      osc2.frequency.exponentialRampToValueAtTime(30, now + 0.3);
      gain2.gain.setValueAtTime(0.6, now + 0.05);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.05);
      osc2.stop(now + 0.3);

      // Noise burst
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = createNoise(ctx, 0.12);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      noiseSource.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noiseSource.start(now);
      noiseSource.stop(now + 0.12);
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

  // ─── TAKE DAMAGE ───
  const playDamage = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Dull thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);

      // Quick crackle
      const noise = ctx.createBufferSource();
      noise.buffer = createNoise(ctx, 0.06);
      const nGain = ctx.createGain();
      const nFilter = ctx.createBiquadFilter();
      nFilter.type = 'bandpass';
      nFilter.frequency.value = 1500;
      nGain.gain.setValueAtTime(0.25, now);
      nGain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      noise.connect(nFilter);
      nFilter.connect(nGain);
      nGain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.06);
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

  // ─── DODGE / WHOOSH ───
  const playDodge = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Filtered noise sweep (whoosh)
      const noise = ctx.createBufferSource();
      noise.buffer = createNoise(ctx, 0.3);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(500, now + 0.3);
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
      noise.stop(now + 0.3);
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

  // ─── POTION USE ───
  const playPotion = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Bubbly ascending tones
      [0, 0.06, 0.12, 0.18].forEach((delay, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400 + i * 150, now + delay);
        gain.gain.setValueAtTime(0.15, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.1);
      });
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── PHASE TRANSITION (dramatic) ───
  const playPhaseTransition = useCallback((phase) => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Deep rumble
      const rumble = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumble.type = 'sine';
      rumble.frequency.setValueAtTime(40, now);
      rumble.frequency.linearRampToValueAtTime(25, now + 1.5);
      rumbleGain.gain.setValueAtTime(0.4, now);
      rumbleGain.gain.linearRampToValueAtTime(0.5, now + 0.5);
      rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      rumble.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);
      rumble.start(now);
      rumble.stop(now + 1.5);

      // Rising tension tone
      const tension = ctx.createOscillator();
      const tensionGain = ctx.createGain();
      tension.type = 'sawtooth';
      const baseFreq = phase === 3 ? 100 : 80;
      tension.frequency.setValueAtTime(baseFreq, now + 0.3);
      tension.frequency.exponentialRampToValueAtTime(baseFreq * 4, now + 1.2);
      tensionGain.gain.setValueAtTime(0.0, now);
      tensionGain.gain.linearRampToValueAtTime(0.2, now + 0.3);
      tensionGain.gain.linearRampToValueAtTime(0.3, now + 0.8);
      tensionGain.gain.exponentialRampToValueAtTime(0.01, now + 1.4);
      const tensionFilter = ctx.createBiquadFilter();
      tensionFilter.type = 'lowpass';
      tensionFilter.frequency.setValueAtTime(500, now);
      tensionFilter.frequency.exponentialRampToValueAtTime(3000, now + 1.2);
      tension.connect(tensionFilter);
      tensionFilter.connect(tensionGain);
      tensionGain.connect(ctx.destination);
      tension.start(now + 0.3);
      tension.stop(now + 1.4);

      // Impact slam at climax
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(80, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.4);
          g.gain.setValueAtTime(0.6, ctx.currentTime);
          g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
          osc.connect(g);
          g.connect(ctx.destination);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);

          // Crash noise
          const crash = ctx.createBufferSource();
          crash.buffer = createNoise(ctx, 0.3);
          const cGain = ctx.createGain();
          cGain.gain.setValueAtTime(0.35, ctx.currentTime);
          cGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
          crash.connect(cGain);
          cGain.connect(ctx.destination);
          crash.start(ctx.currentTime);
          crash.stop(ctx.currentTime + 0.3);
        } catch (e) { /* silent fail */ }
      }, 1200);
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

  // ─── VICTORY FANFARE ───
  const playVictory = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Triumphant ascending chord progression
      const notes = [
        { freq: 523.25, delay: 0, dur: 0.3 },     // C5
        { freq: 659.25, delay: 0.15, dur: 0.3 },   // E5
        { freq: 783.99, delay: 0.3, dur: 0.35 },    // G5
        { freq: 1046.50, delay: 0.5, dur: 0.5 },    // C6
      ];

      notes.forEach(({ freq, delay, dur }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.0, now + delay);
        gain.gain.linearRampToValueAtTime(0.25, now + delay + 0.05);
        gain.gain.setValueAtTime(0.25, now + delay + dur - 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + dur);
      });

      // Shimmering overtone
      const shimmer = ctx.createOscillator();
      const sGain = ctx.createGain();
      shimmer.type = 'sine';
      shimmer.frequency.setValueAtTime(2093, now + 0.6);
      sGain.gain.setValueAtTime(0.08, now + 0.6);
      sGain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
      shimmer.connect(sGain);
      sGain.connect(ctx.destination);
      shimmer.start(now + 0.6);
      shimmer.stop(now + 1.2);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── DEFEAT / DEATH ───
  const playDefeat = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Descending doom tones
      const notes = [
        { freq: 300, delay: 0 },
        { freq: 250, delay: 0.25 },
        { freq: 180, delay: 0.5 },
        { freq: 100, delay: 0.8 },
      ];

      notes.forEach(({ freq, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + delay);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + delay + 0.4);
        gain.gain.setValueAtTime(0.15, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.4);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.4);
      });

      // Low rumble
      const rumble = ctx.createOscillator();
      const rGain = ctx.createGain();
      rumble.type = 'sine';
      rumble.frequency.setValueAtTime(50, now);
      rumble.frequency.exponentialRampToValueAtTime(20, now + 1.5);
      rGain.gain.setValueAtTime(0.3, now);
      rGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
      rumble.connect(rGain);
      rGain.connect(ctx.destination);
      rumble.start(now);
      rumble.stop(now + 1.5);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── BOSS SPAWN ───
  const playBossSpawn = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Dramatic deep horn blast
      const horn = ctx.createOscillator();
      const hornGain = ctx.createGain();
      horn.type = 'sawtooth';
      horn.frequency.setValueAtTime(110, now);
      horn.frequency.linearRampToValueAtTime(130, now + 0.3);
      horn.frequency.linearRampToValueAtTime(110, now + 0.8);
      hornGain.gain.setValueAtTime(0.0, now);
      hornGain.gain.linearRampToValueAtTime(0.25, now + 0.1);
      hornGain.gain.setValueAtTime(0.25, now + 0.5);
      hornGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
      const hornFilter = ctx.createBiquadFilter();
      hornFilter.type = 'lowpass';
      hornFilter.frequency.value = 600;
      horn.connect(hornFilter);
      hornFilter.connect(hornGain);
      hornGain.connect(ctx.destination);
      horn.start(now);
      horn.stop(now + 1.0);

      // Sub bass thud
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(60, now);
      sub.frequency.exponentialRampToValueAtTime(25, now + 0.6);
      subGain.gain.setValueAtTime(0.5, now);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(now);
      sub.stop(now + 0.6);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── TAUNT ───
  const playTaunt = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Mocking descending tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.2);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 2000;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── ENRAGE ───
  const playEnrage = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Aggressive rising growl
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);

      // Distortion crackle
      const noise = ctx.createBufferSource();
      noise.buffer = createNoise(ctx, 0.15);
      const nGain = ctx.createGain();
      nGain.gain.setValueAtTime(0.15, now + 0.1);
      nGain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      noise.connect(nGain);
      nGain.connect(ctx.destination);
      noise.start(now + 0.1);
      noise.stop(now + 0.3);
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

  // ─── FLEE ───
  const playFlee = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Quick descending run
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── AOE WARNING ───
  const playAoeWarning = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Alarming pulsing tone
      [0, 0.2, 0.4].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now + delay);
        gain.gain.setValueAtTime(0.15, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.1);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2000;
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.1);
      });
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── LIFE DRAIN ───
  const playLifeDrain = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Eerie descending tone with vibrato
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.5);
      
      lfo.type = 'sine';
      lfo.frequency.value = 8;
      lfoGain.gain.value = 30;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      lfo.start(now);
      osc.start(now);
      lfo.stop(now + 0.5);
      osc.stop(now + 0.5);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  // ─── UI CLICK ───
  const playClick = useCallback(() => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      // Short, crisp tick
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) { /* silent fail */ }
  }, [getCtx]);

  return {
    playHit,
    playCritical,
    playDamage,
    playDodge,
    playPotion,
    playPhaseTransition,
    playVictory,
    playDefeat,
    playBossSpawn,
    playTaunt,
    playEnrage,
    playFlee,
    playAoeWarning,
    playLifeDrain,
    playClick,
  };
};

export default useGameSFX;
