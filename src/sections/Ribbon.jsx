import { useEffect, useRef } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { clamp, reducedMotion } from "../lib/motion.js";
import { StarIcon } from "../components/Icons.jsx";

// Deux rubans croisés. Ils avancent seuls, plus vite quand on défile, et s'étirent avec la vitesse :
// la devise « accélère » avec vous.
// Performance : la largeur d'un ruban est mesurée une seule fois (puis à chaque redimensionnement), et
// chaque image ne modifie que `transform` (translation + étirement horizontal). Le navigateur n'a donc
// jamais à recalculer la mise en page pendant l'animation : tout se passe sur la carte graphique.
export default function Ribbon() {
  const { t } = usePrefs();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const tracks = [...el.querySelectorAll(".ribbon-track")];
    const widths = tracks.map(() => 1);
    const measure = () => tracks.forEach((tr, i) => { widths[i] = tr.scrollWidth / 2 || 1; });
    measure();
    const ro = new ResizeObserver(measure);
    tracks.forEach((tr) => ro.observe(tr));
    document.fonts?.ready.then(measure);

    let raf = 0, x = 0, lastY = window.scrollY, vel = 0, visible = false, last = performance.now();
    function tick(now) {
      const dt = Math.min(64, now - last); last = now;
      const y = window.scrollY;
      const dy = y - lastY; lastY = y;
      vel += (dy - vel) * 0.15;
      x -= (0.075 * dt) + vel * 0.55; // ≈ 75 px/s au repos, plus vite quand on défile
      const s = 1 + clamp(Math.abs(vel) / 30) * 0.35; // jusqu'à +35 % de largeur
      tracks.forEach((tr, i) => {
        const w = widths[i] * s; // largeur d'un motif une fois étiré
        const pos = ((x * (i ? -1 : 1)) % w + w) % w;
        tr.style.transform = `translate3d(${(-pos).toFixed(1)}px,0,0) scaleX(${s.toFixed(3)})`;
      });
      raf = visible ? requestAnimationFrame(tick) : 0;
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) { last = performance.now(); lastY = window.scrollY; raf = requestAnimationFrame(tick); }
    });
    io.observe(el);
    return () => { io.disconnect(); ro.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const words = t.ribbon;
  const run = (k) => Array.from({ length: 4 }, (_, n) => words.map((w, i) => (
    <span key={`${k}${n}${i}`} className="ribbon-word">{w}<StarIcon /></span>
  )));

  return (
    <div className="ribbons" ref={ref} aria-hidden="true">
      <div className="ribbon ribbon--gold"><div className="ribbon-track">{run("a")}{run("b")}</div></div>
      <div className="ribbon ribbon--blue"><div className="ribbon-track">{run("c")}{run("d")}</div></div>
    </div>
  );
}
