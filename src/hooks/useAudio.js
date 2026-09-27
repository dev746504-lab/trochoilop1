import { useCallback, useMemo } from 'react';

let sharedCtx = null;
function ensureCtx() {
  if (!sharedCtx) {
    sharedCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (sharedCtx.state === 'suspended') sharedCtx.resume();
  return sharedCtx;
}

export function useAudio(mutedRef) {
  const isMuted = useCallback(() => (mutedRef ? mutedRef.current : false), [mutedRef]);

  const playTone = useCallback((freq, dur, type = 'sine', gain = 0.25, delay = 0) => {
    if (isMuted()) return;
    const ctx = ensureCtx();
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }, [isMuted]);

  const playSlide = useCallback((from, to, dur, type = 'sine', gain = 0.2, delay = 0) => {
    if (isMuted()) return;
    const ctx = ensureCtx();
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t0);
    osc.frequency.exponentialRampToValueAtTime(Math.max(to, 20), t0 + dur);
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }, [isMuted]);

  const playNoise = useCallback((dur = 0.22, gain = 0.3, delay = 0, freq = 1200) => {
    if (isMuted()) return;
    const ctx = ensureCtx();
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * dur));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = freq;
    const g = ctx.createGain();
    const t0 = ctx.currentTime + delay;
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    src.connect(filter).connect(g).connect(ctx.destination);
    src.start(t0);
  }, [isMuted]);

  const pop = useCallback(() => { playTone(680, 0.12, 'square', 0.2); playTone(420, 0.1, 'sine', 0.15, 0.03); }, [playTone]);
  const chime = useCallback(() => [880, 1175, 1568].forEach((f, i) => playTone(f, 0.18, 'triangle', 0.18, i * 0.06)), [playTone]);
  const wrongBuzz = useCallback(() => { playTone(180, 0.22, 'square', 0.25); playTone(140, 0.22, 'square', 0.2, 0.05); }, [playTone]);
  const whoosh = useCallback(() => playSlide(300, 900, 0.3, 'sawtooth', 0.12), [playSlide]);
  const burst = useCallback(() => { playNoise(0.2, 0.3); playTone(200, 0.1, 'sine', 0.15, 0.02); }, [playNoise, playTone]);
  const tick = useCallback(() => playTone(1000, 0.06, 'square', 0.12), [playTone]);
  const countdownBeep = useCallback(() => playTone(700, 0.12, 'square', 0.2), [playTone]);
  const goBeep = useCallback(() => { playTone(523, 0.1, 'square', 0.22); playTone(784, 0.22, 'square', 0.22, 0.1); }, [playTone]);
  const vroom = useCallback(() => playSlide(120, 260, 0.35, 'sawtooth', 0.18), [playSlide]);
  const tireSpin = useCallback(() => playNoise(0.35, 0.25, 0, 500), [playNoise]);
  const whistle = useCallback(() => playSlide(1200, 700, 0.5, 'triangle', 0.2), [playSlide]);
  const fanfare = useCallback(() => {
    const notes = [523.25, 659.25, 784, 1046.5];
    notes.forEach((f, i) => playTone(f, i === notes.length - 1 ? 0.6 : 0.22, 'triangle', 0.22, i * 0.18));
    setTimeout(() => [880, 1100, 1320, 1568].forEach((f, i) => playTone(f, 0.18, 'triangle', 0.15, i * 0.07)), 500);
  }, [playTone]);

  const ensureAudioUnlocked = useCallback(() => ensureCtx(), []);

  return useMemo(
    () => ({ pop, chime, wrongBuzz, whoosh, burst, tick, countdownBeep, goBeep, vroom, tireSpin, whistle, fanfare, ensureAudioUnlocked }),
    [pop, chime, wrongBuzz, whoosh, burst, tick, countdownBeep, goBeep, vroom, tireSpin, whistle, fanfare, ensureAudioUnlocked],
  );
}
