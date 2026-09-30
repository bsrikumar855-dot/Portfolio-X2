// Two palettes, swapped by [data-theme] on <html>. The saved choice is applied by an inline head script before paint.

export type Theme = "classic" | "neon";

const listeners = new Set<() => void>();

export const subscribeTheme = (cb: () => void): (() => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export const getTheme = (): Theme =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "neon" ? "neon" : "classic";

export const getThemeServer = (): Theme => "classic";

export function setTheme(next: Theme): void {
  const root = document.documentElement;
  root.classList.add("theme-anim");
  if (next === "neon") root.dataset.theme = "neon";
  else delete root.dataset.theme;
  try {
    localStorage.setItem("sk-theme", next);
  } catch {}
  listeners.forEach((l) => l());
  window.setTimeout(() => root.classList.remove("theme-anim"), 600);
}
