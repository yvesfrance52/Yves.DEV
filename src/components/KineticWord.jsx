import { Fragment, useEffect, useRef } from "react";
import { clamp, reducedMotion } from "../lib/motion.js";

/*
  Mot en typographie cinétique (police variable Anybody : largeur 50–150 %, graisse 100–900).
  - À l'arrivée, chaque lettre s'étire depuis 50 % de largeur, l'une après l'autre.
  - Au survol (souris), les lettres proches du pointeur s'élargissent et s'alourdissent.
  - `outline` : le mot est dessiné au trait (wireframe) et se remplit de bas en haut selon --fill.
  Le texte complet reste lisible par les lecteurs d'écran (une seule étiquette, lettres masquées).
*/
export default function KineticWord({ text, as: Tag = "span", className = "", outline = false, delay = 0, reach = 260, boost = 34 }) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const nodes = [...root.querySelectorAll("[data-k]")];
    let raf = 0, mx = -9999, my = -9999;
    const base = parseFloat(getComputedStyle(root).getPropertyValue("--k-base")) || 100;

    const apply = () => {
      raf = 0;
      // Mesure d'abord (lecture), écrit ensuite (écriture) pour éviter les recalculs en cascade.
      const centers = [];
      for (const n of nodes) {
        if (n.dataset.copy === "1") continue;
        const r = n.getBoundingClientRect();
        centers[n.dataset.k] = [r.left + r.width / 2, r.top + r.height / 2];
      }
      for (const n of nodes) {
        const c = centers[n.dataset.k];
        if (!c) continue;
        const d = Math.hypot(mx - c[0], my - c[1]);
        const f = clamp(1 - d / reach);
        n.style.fontStretch = `${base + f * boost}%`;
        n.style.fontWeight = String(Math.round(800 + f * 100));
      }
    };
    const onMove = (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    const onLeave = () => { mx = my = -9999; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reach, boost]);

  // Lettres groupées par mot : chaque mot reste insécable, mais la ligne peut se couper entre les mots.
  const words = text.split(" ");
  const render = (copy) => {
    let k = 0;
    return words.map((word, w) => (
      <Fragment key={w}>
        {w > 0 ? " " : null}
        <span className="k-word">
          {[...word].map((ch) => {
            const i = k++;
            return (
              <span key={i} data-k={i} data-copy={copy ? "1" : undefined} className="k-letter" style={{ "--i": i, "--delay": `${delay}ms` }}>{ch}</span>
            );
          })}
        </span>
      </Fragment>
    ));
  };

  return (
    <Tag ref={ref} className={`kinetic ${outline ? "kinetic--outline" : ""} ${className}`}>
      <span className="sr-only">{text}</span>
      {outline ? (
        <>
          <span className="k-stroke" aria-hidden="true">{render(false)}</span>
          <span className="k-fill" aria-hidden="true">{render(true)}</span>
        </>
      ) : (
        <span aria-hidden="true">{render(false)}</span>
      )}
    </Tag>
  );
}
