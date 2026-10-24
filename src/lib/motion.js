// Réglage de l'appareil (Windows : « Effets d'animation », macOS/iOS : « Réduire les animations »).
export const systemReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Le choix fait dans les Paramètres du site (<html data-motion="full|reduce">) l'emporte sur l'appareil.
export const reducedMotion = () => {
  if (typeof document === "undefined") return false;
  const forced = document.documentElement.dataset.motion;
  if (forced === "full") return false;
  if (forced === "reduce") return true;
  return systemReducedMotion();
};

export function applyMotionPref(pref) {
  const root = document.documentElement;
  if (pref === "full" || pref === "reduce") root.dataset.motion = pref;
  else delete root.dataset.motion;
}

export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;

// Change d'état avec une transition de vue en cercle depuis un point (si le navigateur la prend en charge).
export function withViewTransition(update, origin) {
  if (!document.startViewTransition || reducedMotion()) { update(); return; }
  if (origin) {
    const r = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
    document.documentElement.style.setProperty("--vt-x", `${origin.x}px`);
    document.documentElement.style.setProperty("--vt-y", `${origin.y}px`);
    document.documentElement.style.setProperty("--vt-r", `${r}px`);
  }
  document.startViewTransition(update);
}
