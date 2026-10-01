// Synthesized UI sounds. Web Audio only: no files, no network. Loaded lazily, after the first interaction.

export type SoundName = "tick" | "click" | "open" | "close" | "reveal" | "confirm" | "whoosh";

const MASTER_GAIN = 0.12;
/** Minimum ms between plays of the same sound. */
const GAP: Record<SoundName, number> = { tick: 80, click: 60, open: 200, close: 200, reveal: 140, confirm: 200, whoosh: 400 };

let ctx: AudioContext | null = null;
let bus: BiquadFilterNode | null = null;
let enabled = false;
const last: Partial<Record<SoundName, number>> = {};

/** Create the context (once) inside a user gesture. Everything routes through a soft ~4kHz low-pass and a quiet master gain. */
export function init(): void {
  if (ctx || typeof window === "undefined") return;
  try {
    ctx = new AudioContext();
  } catch {
    return;
  }
  const master = ctx.createGain();
  master.gain.value = MASTER_GAIN;
  bus = ctx.createBiquadFilter();
  bus.type = "lowpass";
  bus.frequency.value = 4000;
  bus.connect(master).connect(ctx.destination);
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) void ctx.suspend();
    else if (enabled) void ctx.resume();
  });
}

export function setEnabled(on: boolean): void {
  enabled = on;
  if (!ctx) return;
  if (on && !document.hidden) void ctx.resume();
  if (!on) void ctx.suspend();
}

/** One sine/triangle note with a 5ms attack and an exponential decay. */
function note(c: AudioContext, out: AudioNode, freq: number, type: "sine" | "triangle", at: number, decay: number, peak: number): void {
  const o = c.createOscillator();
  o.type = type;
  o.frequency.value = freq;
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.linearRampToValueAtTime(peak, at + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, at + 0.005 + decay);
  o.connect(g).connect(out);
  o.start(at);
  o.stop(at + decay + 0.05);
}

export function play(name: SoundName): void {
  if (!enabled || !ctx || !bus || ctx.state === "closed") return;
  const now = performance.now();
  if (now - (last[name] ?? -1e9) < GAP[name]) return;
  last[name] = now;
  if (ctx.state === "suspended") void ctx.resume();
  const t = ctx.currentTime;
  switch (name) {
    case "tick":
      note(ctx, bus, 1760, "sine", t, 0.03, 0.4);
      break;
    case "click":
      note(ctx, bus, 660, "triangle", t, 0.07, 0.6);
      break;
    case "open":
      note(ctx, bus, 523, "sine", t, 0.12, 0.55);
      note(ctx, bus, 784, "sine", t + 0.07, 0.18, 0.55);
      break;
    case "close":
      note(ctx, bus, 784, "sine", t, 0.12, 0.5);
      note(ctx, bus, 523, "sine", t + 0.07, 0.18, 0.5);
      break;
    case "reveal":
      note(ctx, bus, 196, "triangle", t, 0.2, 0.3);
      break;
    case "confirm":
      note(ctx, bus, 587, "sine", t, 0.1, 0.55);
      note(ctx, bus, 880, "sine", t + 0.08, 0.2, 0.55);
      break;
    case "whoosh": {
      const len = Math.ceil(ctx.sampleRate * 0.25);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const f = ctx.createBiquadFilter();
      f.type = "bandpass";
      f.Q.value = 0.8;
      f.frequency.setValueAtTime(500, t);
      f.frequency.exponentialRampToValueAtTime(2400, t + 0.2);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.5, t + 0.08);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      src.connect(f).connect(g).connect(bus);
      src.start(t);
      break;
    }
  }
}
