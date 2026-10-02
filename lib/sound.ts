// Synthesized sound kit (Web Audio, no files). On by default; browsers still hold audio until the first click or tap.
// Everything runs through one bus: a gentle compressor plus a short synthesized room, so the sounds feel like one space.

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
  if (on) chime();
}

// C major pentatonic from C5. Any two notes sound fine together, so pitched events never clash.
const scale = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51];
const note = (i: number): number => scale[((i % scale.length) + scale.length) % scale.length] ?? 523.25;

type Bus = { c: AudioContext; dry: GainNode; verb: ConvolverNode };
let bus: Bus | null = null;

function makeImpulse(c: AudioContext, seconds: number, decay: number): AudioBuffer {
  const len = Math.ceil(c.sampleRate * seconds);
  const buf = c.createBuffer(2, len, c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

function getBus(c: AudioContext): Bus {
  if (bus && bus.c === c) return bus;
  const master = c.createGain();
  master.gain.value = 0.9;
  const comp = c.createDynamicsCompressor();
  comp.threshold.value = -20;
  comp.ratio.value = 3;
  comp.attack.value = 0.004;
  comp.release.value = 0.18;
  master.connect(comp).connect(c.destination);
  const dry = c.createGain();
  dry.connect(master);
  const verb = c.createConvolver();
  verb.buffer = makeImpulse(c, 1.3, 2.6);
  const wet = c.createGain();
  wet.gain.value = 0.28;
  verb.connect(wet).connect(master);
  bus = { c, dry, verb };
  return bus;
}

/** Route a node to the dry bus and, optionally, the room. */
function out(c: AudioContext, node: AudioNode, room = 0.25): void {
  const b = getBus(c);
  node.connect(b.dry);
  if (room > 0) {
    const send = c.createGain();
    send.gain.value = room;
    node.connect(send).connect(b.verb);
  }
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

type ToneOpts = { type?: OscillatorType; gain?: number; dur?: number; room?: number; glideTo?: number; bell?: boolean; at?: number };

/** One tuned voice with a fast attack and exponential decay. `bell` adds an inharmonic partial for a struck-metal feel. */
function tone(c: AudioContext, freq: number, o: ToneOpts = {}): void {
  const { type = "sine", gain = 0.05, dur = 0.4, room = 0.3, glideTo, bell = false, at = 0 } = o;
  const t = c.currentTime + at;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(gain, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t + dur * 0.8);
  osc.connect(g);
  osc.start(t);
  osc.stop(t + dur + 0.02);
  if (bell) {
    const g2 = c.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.linearRampToValueAtTime(gain * 0.35, t + 0.004);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.5);
    const o2 = c.createOscillator();
    o2.frequency.value = freq * 2.76;
    o2.connect(g2);
    o2.start(t);
    o2.stop(t + dur * 0.5 + 0.02);
    out(c, g2, room);
  }
  out(c, g, room);
}

/** A very short filtered noise tick: the "contact" of a pencil, key or switch. */
function tap(c: AudioContext, o: { freq?: number; gain?: number; dur?: number; at?: number } = {}): void {
  const { freq = 3200, gain = 0.04, dur = 0.018, at = 0 } = o;
  const t = c.currentTime + at;
  const src = noise(c, dur + 0.01);
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = 1.4;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g);
  out(c, g, 0.1);
  src.start(t);
}

/** Pen scratching across paper: filtered noise with a jittery, hand-driven envelope. */
export function pen(): void {
  const c = audio("pen", 140);
  if (!c) return;
  const t = c.currentTime;
  const dur = 0.3;
  const src = noise(c, dur + 0.05);
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.3;
  f.frequency.setValueAtTime(2200, t);
  f.frequency.linearRampToValueAtTime(4600, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  const steps = 14;
  for (let i = 1; i <= steps; i++) {
    const env = Math.sin((i / steps) * Math.PI);
    g.gain.linearRampToValueAtTime(0.012 + env * (0.025 + Math.random() * 0.03), t + (i / steps) * dur);
  }
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.04);
  src.connect(f).connect(g);
  out(c, g, 0.12);
  src.start(t);
}

/** A mark being ticked off. `i` walks up the scale, so progress through the page has a melody. */
export function tick(i = 0): void {
  const c = audio("tick", 110);
  if (!c) return;
  tap(c, { freq: 4200, gain: 0.03, dur: 0.012 });
  tone(c, note(i), { type: "sine", gain: 0.06, dur: 0.55, bell: true, room: 0.4 });
}

/** Barely-there hover tap. `i` picks a pitch; without it the pitch drifts a little so repeats never feel mechanical. */
export function soft(i?: number): void {
  const c = audio("soft", 70);
  if (!c) return;
  const f = i === undefined ? 900 * (1 + (Math.random() - 0.5) * 0.08) : note(i) * 1.5;
  tone(c, f, { type: "triangle", gain: 0.022, dur: 0.11, room: 0.15 });
}

/** A detection blip for a word being read. */
export function blip(i: number): void {
  const c = audio("blip", 60);
  if (!c) return;
  tone(c, note(i) * 2, { type: "sine", gain: 0.03, dur: 0.14, room: 0.2 });
  tap(c, { freq: 5200, gain: 0.015, dur: 0.01 });
}

/** The five detection boxes locking on: a quick rising run. */
export function detect(): void {
  const c = audio("detect", 400);
  if (!c) return;
  for (let k = 0; k < 5; k++) tone(c, note(k + 1) * 2, { type: "sine", gain: 0.03, dur: 0.12, room: 0.25, at: k * 0.065 });
}

/** The scan line sweeping the viewfinder. */
export function scan(): void {
  const c = audio("scan", 800);
  if (!c) return;
  const t = c.currentTime;
  const dur = 1.2;
  const src = noise(c, dur);
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 3;
  f.frequency.setValueAtTime(300, t);
  f.frequency.exponentialRampToValueAtTime(5200, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.03, t + 0.25);
  g.gain.linearRampToValueAtTime(0.025, t + dur * 0.85);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g);
  out(c, g, 0.2);
  src.start(t);
  tone(c, 180, { type: "sine", gain: 0.02, dur, glideTo: 1500, room: 0.2 });
}

/** A short, warm arpeggio: confirms sound on, and rings when a page is revealed. */
export function chime(): void {
  const c = audio("chime", 300);
  if (!c) return;
  [0, 2, 4].forEach((n, k) => tone(c, note(n), { type: "sine", gain: 0.045, dur: 0.7, bell: true, room: 0.5, at: k * 0.075 }));
}

/** A sheet of paper pulled across: the page transition cover. */
export function paper(): void {
  const c = audio("paper", 400);
  if (!c) return;
  const t = c.currentTime;
  const dur = 0.5;
  const src = noise(c, dur + 0.05);
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.setValueAtTime(900, t);
  hp.frequency.linearRampToValueAtTime(3600, t + dur);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 7000;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.14);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(hp).connect(lp).connect(g);
  out(c, g, 0.2);
  src.start(t);
  tone(c, 95, { type: "sine", gain: 0.05, dur: 0.3, glideTo: 55, room: 0.1, at: dur * 0.75 });
}

/** Theme switch: a relay click, then a sweep up for neon or down for classic. */
export function themeSwitch(toNeon: boolean): void {
  const c = audio("theme", 250);
  if (!c) return;
  tap(c, { freq: 2400, gain: 0.07, dur: 0.02 });
  if (toNeon) {
    tone(c, 280, { type: "sawtooth", gain: 0.02, dur: 0.28, glideTo: 1900, room: 0.3, at: 0.02 });
    tone(c, note(5), { type: "sine", gain: 0.04, dur: 0.5, bell: true, room: 0.4, at: 0.2 });
  } else {
    tone(c, 900, { type: "triangle", gain: 0.035, dur: 0.3, glideTo: 240, room: 0.3, at: 0.02 });
    tone(c, note(0), { type: "sine", gain: 0.04, dur: 0.5, bell: true, room: 0.4, at: 0.2 });
  }
}

/** A soft UI click for links and buttons. */
export function click(): void {
  const c = audio("click", 80);
  if (!c) return;
  tap(c, { freq: 2800, gain: 0.05, dur: 0.014 });
  tone(c, 1500, { type: "sine", gain: 0.012, dur: 0.05, room: 0.1 });
}
