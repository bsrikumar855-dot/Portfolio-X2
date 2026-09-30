// Tiny synthesized sound kit (Web Audio, no files). On by default; browsers still hold audio until the first click or tap.

let ctx: AudioContext | null = null;
let enabled = true;
const listeners = new Set<() => void>();
const last: Record<string, number> = {};

export const subscribeSound = (cb: () => void): (() => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
export const getSound = (): boolean => enabled;
export const getSoundServer = (): boolean => true;

const emit = () => listeners.forEach((l) => l());

/** Restore the saved preference. Audio still waits for a user gesture before it can play. */
export function initSound(): void {
  try {
    enabled = localStorage.getItem("sk-sound") !== "0";
  } catch {}
  emit();
}

export function setSound(on: boolean): void {
  enabled = on;
  try {
    localStorage.setItem("sk-sound", on ? "1" : "0");
  } catch {}
  emit();
  if (on) tick();
}

function audio(key: string, gap = 90): AudioContext | null {
  if (!enabled || typeof window === "undefined") return null;
  const now = performance.now();
  if (now - (last[key] ?? -1e9) < gap) return null;
  last[key] = now;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function noise(c: AudioContext, seconds: number): AudioBufferSourceNode {
  const buf = c.createBuffer(1, Math.ceil(c.sampleRate * seconds), c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  return src;
}

/** Pen scratching across paper. */
export function pen(): void {
  const c = audio("pen", 140);
  if (!c) return;
  const t = c.currentTime;
  const src = noise(c, 0.26);
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.1;
  f.frequency.setValueAtTime(2400, t);
  f.frequency.linearRampToValueAtTime(4300, t + 0.22);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t);
}

/** A light two-note tick, like a mark being ticked off. */
export function tick(): void {
  const c = audio("tick", 120);
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(880, t);
  o.frequency.setValueAtTime(1318, t + 0.06);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.06, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + 0.24);
}

/** Barely-there tap for hover and small toggles. */
export function soft(): void {
  const c = audio("soft", 70);
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.value = 620;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.025, t + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + 0.06);
}

/** A sheet of paper being pulled across: used for the page transition. */
export function paper(): void {
  const c = audio("paper", 400);
  if (!c) return;
  const t = c.currentTime;
  const src = noise(c, 0.5);
  const f = c.createBiquadFilter();
  f.type = "highpass";
  f.frequency.setValueAtTime(1200, t);
  f.frequency.linearRampToValueAtTime(3200, t + 0.45);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.045, t + 0.12);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t);
}
