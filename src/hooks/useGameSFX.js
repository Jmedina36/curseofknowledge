// Web Audio API Sound Effects for Fantasy Study Quest
// Synthesized sounds - no external APIs needed

import { useCallback, useRef, useEffect } from 'react';

const useGameSFX = () => {
  const audioCtxRef = useRef(null);
  const musicNodesRef = useRef(null); // Holds all active battle music nodes

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

  // ─── BATTLE START (war drums + horn swell, varies by type) ───
  // type: 'regular' | 'elite' | 'gauntlet'
  const playBattleStart = useCallback((type = 'regular') => {
    try {
      const ctx = getCtx();
      const now = ctx.currentTime;

      const isElite = type === 'elite';
      const isGauntlet = type === 'gauntlet';

      // --- Drum config per type ---
      const drumBaseFreq = isGauntlet ? 60 : isElite ? 70 : 90;
      const drumCount = isGauntlet ? 5 : isElite ? 4 : 3;
      const drumSpacing = isGauntlet ? 0.14 : isElite ? 0.16 : 0.18;
      const drumVolume = isGauntlet ? 0.45 : isElite ? 0.4 : 0.3;
      const drumDecay = isGauntlet ? 0.35 : isElite ? 0.3 : 0.25;

      // War drum hits
      Array.from({ length: drumCount }).forEach((_, i) => {
        const delay = i * drumSpacing;
        const drum = ctx.createOscillator();
        const drumGain = ctx.createGain();
        drum.type = 'sine';
        const startFreq = drumBaseFreq - i * (isGauntlet ? 6 : isElite ? 8 : 10);
        drum.frequency.setValueAtTime(startFreq, now + delay);
        drum.frequency.exponentialRampToValueAtTime(20, now + delay + drumDecay);
        drumGain.gain.setValueAtTime(drumVolume + i * 0.05, now + delay);
        drumGain.gain.exponentialRampToValueAtTime(0.01, now + delay + drumDecay);
        drum.connect(drumGain);
        drumGain.connect(ctx.destination);
        drum.start(now + delay);
        drum.stop(now + delay + drumDecay);

        // Drum skin noise layer
        const skin = ctx.createBufferSource();
        skin.buffer = createNoise(ctx, 0.1);
        const skinGain = ctx.createGain();
        const skinFilter = ctx.createBiquadFilter();
        skinFilter.type = 'bandpass';
        skinFilter.frequency.value = (isElite ? 250 : 400) + i * (isGauntlet ? 100 : 200);
        skinFilter.Q.value = isElite ? 2 : 3;
        skinGain.gain.setValueAtTime(0.15 + i * 0.04, now + delay);
        skinGain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.1);
        skin.connect(skinFilter);
        skinFilter.connect(skinGain);
        skinGain.connect(ctx.destination);
        skin.start(now + delay);
        skin.stop(now + delay + 0.1);
      });

      const drumsEnd = drumCount * drumSpacing;

      // --- Horn config per type ---
      const hornStart = drumsEnd + 0.12;
      const hornBaseFreq = isGauntlet ? 85 : isElite ? 100 : 130;
      const hornPeakFreq = isGauntlet ? 260 : isElite ? 200 : 220;
      const hornVolume = isGauntlet ? 0.28 : isElite ? 0.22 : 0.18;
      const hornDuration = isGauntlet ? 1.2 : isElite ? 1.0 : 0.85;

      // Primary horn
      const horn = ctx.createOscillator();
      const hornGain = ctx.createGain();
      horn.type = 'sawtooth';
      horn.frequency.setValueAtTime(hornBaseFreq, now + hornStart);
      horn.frequency.linearRampToValueAtTime(hornBaseFreq * 1.3, now + hornStart + hornDuration * 0.4);
      horn.frequency.linearRampToValueAtTime(hornPeakFreq, now + hornStart + hornDuration * 0.85);
      hornGain.gain.setValueAtTime(0.0, now + hornStart);
      hornGain.gain.linearRampToValueAtTime(hornVolume, now + hornStart + hornDuration * 0.25);
      hornGain.gain.setValueAtTime(hornVolume, now + hornStart + hornDuration * 0.65);
      hornGain.gain.exponentialRampToValueAtTime(0.01, now + hornStart + hornDuration);
      const hornFilter = ctx.createBiquadFilter();
      hornFilter.type = 'lowpass';
      hornFilter.frequency.setValueAtTime(isElite ? 350 : 400, now + hornStart);
      hornFilter.frequency.linearRampToValueAtTime(isGauntlet ? 1800 : 1200, now + hornStart + hornDuration * 0.8);
      horn.connect(hornFilter);
      hornFilter.connect(hornGain);
      hornGain.connect(ctx.destination);
      horn.start(now + hornStart);
      horn.stop(now + hornStart + hornDuration);

      // Gauntlet: second harmony horn a 5th above for epic feel
      if (isGauntlet) {
        const horn2 = ctx.createOscillator();
        const horn2Gain = ctx.createGain();
        horn2.type = 'sawtooth';
        horn2.frequency.setValueAtTime(hornBaseFreq * 1.5, now + hornStart + 0.15);
        horn2.frequency.linearRampToValueAtTime(hornPeakFreq * 1.5, now + hornStart + hornDuration * 0.85);
        horn2Gain.gain.setValueAtTime(0.0, now + hornStart + 0.15);
        horn2Gain.gain.linearRampToValueAtTime(0.14, now + hornStart + hornDuration * 0.35);
        horn2Gain.gain.exponentialRampToValueAtTime(0.01, now + hornStart + hornDuration);
        const horn2Filter = ctx.createBiquadFilter();
        horn2Filter.type = 'lowpass';
        horn2Filter.frequency.value = 1400;
        horn2.connect(horn2Filter);
        horn2Filter.connect(horn2Gain);
        horn2Gain.connect(ctx.destination);
        horn2.start(now + hornStart + 0.15);
        horn2.stop(now + hornStart + hornDuration);
      }

      // Sub-bass undertone
      const totalDuration = hornStart + hornDuration;
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(isGauntlet ? 30 : isElite ? 35 : 45, now);
      subGain.gain.setValueAtTime(isGauntlet ? 0.35 : isElite ? 0.3 : 0.25, now);
      subGain.gain.linearRampToValueAtTime(isGauntlet ? 0.45 : 0.35, now + totalDuration * 0.4);
      subGain.gain.exponentialRampToValueAtTime(0.01, now + totalDuration);
      sub.connect(subGain);
      subGain.connect(ctx.destination);
      sub.start(now);
      sub.stop(now + totalDuration);

      // Gauntlet: ominous rumble noise bed
      if (isGauntlet) {
        const rumble = ctx.createBufferSource();
        rumble.buffer = createNoise(ctx, totalDuration);
        const rumbleGain = ctx.createGain();
        const rumbleFilter = ctx.createBiquadFilter();
        rumbleFilter.type = 'lowpass';
        rumbleFilter.frequency.value = 150;
        rumbleGain.gain.setValueAtTime(0.08, now);
        rumbleGain.gain.linearRampToValueAtTime(0.15, now + totalDuration * 0.5);
        rumbleGain.gain.exponentialRampToValueAtTime(0.01, now + totalDuration);
        rumble.connect(rumbleFilter);
        rumbleFilter.connect(rumbleGain);
        rumbleGain.connect(ctx.destination);
        rumble.start(now);
        rumble.stop(now + totalDuration);
      }
    } catch (e) { /* silent fail */ }
  }, [getCtx, createNoise]);

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

  // ─── BATTLE MUSIC (looping synthesized ambience) ───
  const stopBattleMusic = useCallback(() => {
    if (!musicNodesRef.current) return;
    const { nodes, ctx } = musicNodesRef.current;
    const now = ctx.currentTime;
    // Fade out over 0.5s
    nodes.forEach(({ gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
      } catch (e) { /* silent */ }
    });
    // Stop all oscillators after fade
    setTimeout(() => {
      nodes.forEach(({ sources }) => {
        sources.forEach(s => { try { s.stop(); } catch (e) { /* already stopped */ } });
      });
      musicNodesRef.current = null;
    }, 600);
  }, []);

  const startBattleMusic = useCallback((intensity = 1) => {
    // Stop any existing music first
    if (musicNodesRef.current) stopBattleMusic();

    // Small delay so stop can finish
    setTimeout(() => {
      try {
        const ctx = getCtx();
        const now = ctx.currentTime;
        const allNodes = [];

        // Master gain for overall volume control
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.18, now + 1.5); // Fade in
        masterGain.connect(ctx.destination);

        // ── Layer 1: Deep sub-bass drone ──
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        // Pitch shifts with intensity: 1=regular, 2=elite, 3+=gauntlet phases
        const basePitch = intensity <= 1 ? 40 : intensity === 2 ? 35 : 30;
        subOsc.frequency.setValueAtTime(basePitch, now);
        // Subtle pitch wobble
        const subLfo = ctx.createOscillator();
        const subLfoGain = ctx.createGain();
        subLfo.type = 'sine';
        subLfo.frequency.value = 0.15;
        subLfoGain.gain.value = 3;
        subLfo.connect(subLfoGain);
        subLfoGain.connect(subOsc.frequency);
        subGain.gain.value = 0.6;
        subOsc.connect(subGain);
        subGain.connect(masterGain);
        subLfo.start(now);
        subOsc.start(now);
        allNodes.push({ gain: subGain, sources: [subOsc, subLfo] });

        // ── Layer 2: Mid-range menacing drone ──
        const midOsc = ctx.createOscillator();
        const midGain = ctx.createGain();
        const midFilter = ctx.createBiquadFilter();
        midOsc.type = 'sawtooth';
        const midPitch = intensity <= 1 ? 55 : intensity === 2 ? 65 : 75;
        midOsc.frequency.setValueAtTime(midPitch, now);
        midFilter.type = 'lowpass';
        midFilter.frequency.setValueAtTime(200 + intensity * 80, now);
        midFilter.Q.value = 2;
        // Slow filter sweep for movement
        const filterLfo = ctx.createOscillator();
        const filterLfoGain = ctx.createGain();
        filterLfo.type = 'sine';
        filterLfo.frequency.value = 0.08 + intensity * 0.02;
        filterLfoGain.gain.value = 100 + intensity * 40;
        filterLfo.connect(filterLfoGain);
        filterLfoGain.connect(midFilter.frequency);
        midGain.gain.value = 0.15 + intensity * 0.03;
        midOsc.connect(midFilter);
        midFilter.connect(midGain);
        midGain.connect(masterGain);
        filterLfo.start(now);
        midOsc.start(now);
        allNodes.push({ gain: midGain, sources: [midOsc, filterLfo] });

        // ── Layer 3: Rhythmic pulse (heartbeat) ──
        const pulseInterval = intensity <= 1 ? 1.2 : intensity === 2 ? 0.9 : 0.7;
        const pulseOsc = ctx.createOscillator();
        const pulseGain = ctx.createGain();
        const pulseLfo = ctx.createOscillator();
        const pulseLfoGain = ctx.createGain();
        pulseOsc.type = 'sine';
        pulseOsc.frequency.value = 50 + intensity * 5;
        pulseLfo.type = 'square'; // Creates on/off pulse
        pulseLfo.frequency.value = 1 / pulseInterval;
        pulseLfoGain.gain.value = 0.2 + intensity * 0.02;
        pulseLfo.connect(pulseLfoGain);
        pulseLfoGain.connect(pulseGain.gain);
        pulseGain.gain.value = 0;
        pulseOsc.connect(pulseGain);
        pulseGain.connect(masterGain);
        pulseLfo.start(now);
        pulseOsc.start(now);
        allNodes.push({ gain: pulseGain, sources: [pulseOsc, pulseLfo] });

        // ── Layer 4: High tension shimmer (intensity 2+) ──
        if (intensity >= 2) {
          const shimmerOsc = ctx.createOscillator();
          const shimmerGain = ctx.createGain();
          const shimmerFilter = ctx.createBiquadFilter();
          shimmerOsc.type = 'triangle';
          shimmerOsc.frequency.value = intensity >= 3 ? 220 : 180;
          shimmerFilter.type = 'bandpass';
          shimmerFilter.frequency.value = 400;
          shimmerFilter.Q.value = 8;
          // Tremolo
          const tremolo = ctx.createOscillator();
          const tremGain = ctx.createGain();
          tremolo.type = 'sine';
          tremolo.frequency.value = intensity >= 3 ? 6 : 4;
          tremGain.gain.value = 0.06;
          tremolo.connect(tremGain);
          tremGain.connect(shimmerGain.gain);
          shimmerGain.gain.value = 0;
          shimmerOsc.connect(shimmerFilter);
          shimmerFilter.connect(shimmerGain);
          shimmerGain.connect(masterGain);
          tremolo.start(now);
          shimmerOsc.start(now);
          allNodes.push({ gain: shimmerGain, sources: [shimmerOsc, tremolo] });
        }

        // ── Layer 5: Chaos noise bed (intensity 3+ / Gauntlet) ──
        if (intensity >= 3) {
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = createNoise(ctx, 10);
          noiseSource.loop = true;
          const noiseGain = ctx.createGain();
          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = 'bandpass';
          noiseFilter.frequency.value = 300;
          noiseFilter.Q.value = 1;
          // Slow sweep
          const noiseLfo = ctx.createOscillator();
          const noiseLfoGain = ctx.createGain();
          noiseLfo.type = 'sine';
          noiseLfo.frequency.value = 0.05;
          noiseLfoGain.gain.value = 200;
          noiseLfo.connect(noiseLfoGain);
          noiseLfoGain.connect(noiseFilter.frequency);
          noiseGain.gain.value = 0.04;
          noiseSource.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(masterGain);
          noiseLfo.start(now);
          noiseSource.start(now);
          allNodes.push({ gain: noiseGain, sources: [noiseSource, noiseLfo] });
        }

        musicNodesRef.current = { nodes: allNodes, ctx, masterGain };
      } catch (e) { /* silent fail */ }
    }, musicNodesRef.current ? 650 : 0);
  }, [getCtx, createNoise, stopBattleMusic]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (musicNodesRef.current) {
        const { nodes } = musicNodesRef.current;
        nodes.forEach(({ sources }) => {
          sources.forEach(s => { try { s.stop(); } catch (e) { /* */ } });
        });
        musicNodesRef.current = null;
      }
    };
  }, []);

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
    playBattleStart,
    startBattleMusic,
    stopBattleMusic,
  };
};

export default useGameSFX;
