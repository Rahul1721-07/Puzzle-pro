// Web Audio API Synthesizer - 100% self-contained, no external audio files needed

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
}

export function getMuted() {
  return isMuted;
}

export function playTileClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(420, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.06);
}

export function playTileSlide() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(260, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.12);
}

export function playTileSwap() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Dual tone for swap
  [523.25, 659.25].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.04);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.25, ctx.currentTime + i * 0.04 + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.04 + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + i * 0.04);
    osc.stop(ctx.currentTime + i * 0.04 + 0.1);
  });
}

export function playShuffleSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [300, 380, 450, 520, 600, 680];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);

    gain.gain.setValueAtTime(0.05, ctx.currentTime + idx * 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.04 + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.04);
    osc.stop(ctx.currentTime + idx * 0.04 + 0.06);
  });
}

export function playVictoryFanfare() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Major Arpeggio fanfare: C5, E5, G5, C6
  const notes = [
    { freq: 523.25, time: 0.0, dur: 0.15 },
    { freq: 659.25, time: 0.15, dur: 0.15 },
    { freq: 783.99, time: 0.3, dur: 0.2 },
    { freq: 1046.50, time: 0.5, dur: 0.45 },
    { freq: 1318.51, time: 0.65, dur: 0.6 },
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

    gain.gain.setValueAtTime(0.2, ctx.currentTime + time);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + time);
    osc.stop(ctx.currentTime + time + dur);
  });
}
