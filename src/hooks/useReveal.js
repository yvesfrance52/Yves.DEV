import { useEffect, useRef } from "react";
import { reducedMotion } from "../lib/motion.js";

// Ajoute .is-in aux éléments [data-reveal] quand ils entrent dans l'écran (une seule fois).
export function useReveal(deps = []) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = [...root.querySelectorAll("[data-reveal]:not(.is-in)")];
    if (!nodes.length) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
