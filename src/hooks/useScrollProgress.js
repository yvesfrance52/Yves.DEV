import { useEffect } from "react";
import { clamp } from "../lib/motion.js";

// Écrit la progression de défilement d'un élément (0 → 1) dans la variable CSS --p
// et appelle onProgress, sans rendu React (rAF).
export function useScrollProgress(ref, { start = "top top", onProgress } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // "top top" : 0 quand le haut touche le haut de l'écran, 1 quand le bas y arrive.
      // "center" : 0 quand l'élément entre par le bas, 1 quand il sort par le haut.
      const p = start === "center" ? clamp((vh - r.top) / (vh + r.height)) : clamp(-r.top / Math.max(1, r.height - vh * 0.35));
      el.style.setProperty("--p", p.toFixed(4));
      onProgress?.(p);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, start, onProgress]);
}
