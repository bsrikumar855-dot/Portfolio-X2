// One shared, rAF-throttled scroll subscription with cached geometry.
// Components read `scrollY` (cheap) and compare against cached section tops instead of calling
// getBoundingClientRect on every scroll frame, which forced layout over and over.

type Listener = (y: number) => void;

const listeners = new Set<Listener>();
const tops = new Map<string, number>();
let frame = 0;
let bound = false;
let observer: ResizeObserver | null = null;
let docMaxCache = -1;

const invalidate = () => {
  tops.clear();
  docMaxCache = -1;
};

const run = () => {
  frame = 0;
  const y = window.scrollY;
  listeners.forEach((l) => l(y));
};
const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(run);
};
const onResize = () => {
  invalidate();
  onScroll();
};

export function subscribeScroll(cb: Listener): () => void {
  if (!bound) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Layout changes (images, fonts, an accordion opening) invalidate the cached geometry.
    observer = new ResizeObserver(() => {
      invalidate();
      onScroll();
    });
    observer.observe(document.body);
    bound = true;
  }
  listeners.add(cb);
  cb(window.scrollY);
  return () => {
    listeners.delete(cb);
    if (!listeners.size && bound) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      observer = null;
      cancelAnimationFrame(frame);
      frame = 0;
      bound = false;
      invalidate();
    }
  };
}

/** Absolute top of an element (document coordinates), cached until the layout changes. */
export function sectionTop(id: string): number | null {
  const hit = tops.get(id);
  if (hit !== undefined) return hit;
  const el = document.getElementById(id);
  if (!el) return null;
  const top = el.getBoundingClientRect().top + window.scrollY;
  tops.set(id, top);
  return top;
}

/** Furthest scroll position, cached until the layout changes. */
export function scrollMax(): number {
  if (docMaxCache < 0) docMaxCache = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return docMaxCache;
}
