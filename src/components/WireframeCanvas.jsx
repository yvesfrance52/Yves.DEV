import { useEffect, useRef } from "react";
import { clamp, lerp, reducedMotion } from "../lib/motion.js";

/*
  Wireframe 3D d'une page web, dessiné sans bibliothèque.
  La page est découpée en couches (cadre, en-tête, hero, cartes, bouton) éclatées en profondeur.
  `progressRef.current` (0 → 1) les rassemble : à 1, la page est « construite »
  (les aplats apparaissent et elle se tourne face au visiteur).
*/

// Formes en unités de page (16 × 10, centrée sur l'origine). kind: rect | line | cross
const R = (x, y, w, h, extra = {}) => ({ kind: "rect", x, y, w, h, ...extra });
const L = (x1, y1, x2, y2, extra = {}) => ({ kind: "line", x1, y1, x2, y2, ...extra });

const LAYERS = [
  { // 0 — cadre du navigateur
    shapes: [
      R(-8, -5, 16, 10, { fill: "surface" }),
      L(-8, -4.15, 8, -4.15),
      R(-7.6, -4.78, 0.42, 0.42, { fill: "ink" }),
      R(-7.0, -4.78, 0.42, 0.42, { fill: "gold" }),
      R(-6.4, -4.78, 0.42, 0.42, { fill: "blue" }),
      R(-5.2, -4.8, 8.4, 0.46)
    ]
  },
  { // 1 — en-tête du site
    shapes: [
      R(-7.3, -3.75, 0.85, 0.85, { fill: "blue", cross: true }),
      L(-6.1, -3.33, -4.1, -3.33, { w: 2 }),
      R(1.4, -3.5, 1.1, 0.34), R(2.8, -3.5, 1.1, 0.34), R(4.2, -3.5, 1.1, 0.34),
      R(5.75, -3.68, 1.55, 0.7, { fill: "ink" })
    ]
  },
  { // 2 — hero : titre, texte, image
    shapes: [
      R(-7.3, -2.55, 6.3, 0.85, { fill: "ink" }),
      R(-7.3, -1.45, 4.6, 0.85, { fill: "ink" }),
      L(-7.3, -0.15, -1.4, -0.15), L(-7.3, 0.25, -2.1, 0.25), L(-7.3, 0.65, -2.8, 0.65),
      R(0.3, -2.6, 7.0, 4.15, { fill: "blue", cross: true })
    ]
  },
  { // 3 — bouton d'action (couche à part : c'est lui qu'on « pose » en dernier)
    shapes: [R(-7.3, 1.05, 2.6, 0.8, { fill: "gold" })]
  },
  { // 4 — rangée de cartes
    shapes: [
      R(-7.3, 2.35, 4.5, 2.25, { fill: "sky" }), R(-7.3, 2.35, 4.5, 1.2, { cross: true }), L(-7.0, 3.9, -4.0, 3.9), L(-7.0, 4.25, -5.0, 4.25),
      R(-2.25, 2.35, 4.5, 2.25, { fill: "sky" }), R(-2.25, 2.35, 4.5, 1.2, { cross: true }), L(-1.95, 3.9, 1.05, 3.9), L(-1.95, 4.25, 0.05, 4.25),
      R(2.8, 2.35, 4.5, 2.25, { fill: "sky" }), R(2.8, 2.35, 4.5, 1.2, { cross: true }), L(3.1, 3.9, 6.1, 3.9), L(3.1, 4.25, 5.1, 4.25)
    ]
  }
];

const ORDER = [0, 1, 2, 3, 4];
const DEPTH = [2, 1, 0, -1.7, -0.9]; // décalage de chaque couche (positif = au fond) quand la page est éclatée

function readColors(el) {
  const s = getComputedStyle(el);
  const v = (n) => s.getPropertyValue(n).trim();
  return { ink: v("--wf-ink"), blue: v("--blue"), gold: v("--gold"), surface: v("--wf-surface"), sky: v("--wf-sky") };
}

export default function WireframeCanvas({ progressRef, staticProgress, label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const still = reducedMotion();
    // Écran tactile : pas de balancement permanent, et la boucle s'endort dès que le dessin est stable
    // (elle se réveille au défilement). Sur ordinateur, le wireframe suit la souris et respire en continu.
    const fine = window.matchMedia("(pointer: fine)").matches;
    let moving = true;
    let colors = readColors(canvas);
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, running = false;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    let intro = still ? 1 : 0;
    const t0 = performance.now();
    let built = 0; // progression lissée

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      draw(performance.now());
    };

    function project(x, y, z, yaw, pitch, scale) {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
      const d = 28, k = d / (d + z2);
      return [w * 0.54 + x1 * k * scale, h * (0.5 + 0.06 * built) + y1 * k * scale, z2];
    }

    function draw(now) {
      if (!w) return;
      const target = staticProgress ?? clamp((progressRef?.current ?? 0) * 1.45);
      built = still ? target : lerp(built, target, 0.12);
      if (!still) intro = clamp((now - t0) / 1600);
      const easeIntro = 1 - Math.pow(1 - intro, 4);
      const time = (now - t0) / 1000;

      pointer.x = lerp(pointer.x, pointer.tx, 0.08);
      pointer.y = lerp(pointer.y, pointer.ty, 0.08);

      const sway = still || !fine ? 0 : Math.sin(time * 0.5) * 0.04 * (1 - built);
      moving = intro < 1 || Math.abs(target - built) > 0.0005
        || Math.abs(pointer.tx - pointer.x) > 0.001 || Math.abs(pointer.ty - pointer.y) > 0.001
        || (sway !== 0 && built < 0.999);
      const yaw = lerp(-0.72, -0.1, built) + pointer.x * 0.32 + sway;
      const pitch = lerp(0.36, 0.1, built) + pointer.y * 0.18;
      const spread = lerp(lerp(7, 2.6, easeIntro), 0, built);
      const scale = Math.min(w / 22, h / 15);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = "miter";
      ctx.lineCap = "square";

      // Couches triées de la plus lointaine à la plus proche.
      const layers = ORDER.map((i) => ({ i, z: DEPTH[i] * spread }))
        .map((l) => ({ ...l, depth: project(0, 0, l.z, yaw, pitch, scale)[2] }))
        .sort((a, b) => b.depth - a.depth);

      const fillAlpha = clamp((built - 0.35) / 0.5);
      for (const { i, z } of layers) {
        for (const s of LAYERS[i].shapes) {
          if (s.kind === "line") {
            const a = project(s.x1, s.y1, z, yaw, pitch, scale);
            const b = project(s.x2, s.y2, z, yaw, pitch, scale);
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
            ctx.lineWidth = s.w || 1.6; ctx.strokeStyle = colors.ink; ctx.stroke();
            continue;
          }
          const pts = [[s.x, s.y], [s.x + s.w, s.y], [s.x + s.w, s.y + s.h], [s.x, s.y + s.h]]
            .map(([x, y]) => project(x, y, z, yaw, pitch, scale));
          const path = () => {
            ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
            for (let k = 1; k < 4; k++) ctx.lineTo(pts[k][0], pts[k][1]);
            ctx.closePath();
          };
          if (s.fill) {
            // Les grands fonds restent pleins (sinon les couches se mélangent) ; le reste se remplit à l'assemblage.
            const alpha = s.fill === "surface" || s.fill === "sky" ? 1 : fillAlpha;
            if (alpha > 0) { path(); ctx.globalAlpha = alpha; ctx.fillStyle = colors[s.fill]; ctx.fill(); ctx.globalAlpha = 1; }
          }
          path(); ctx.lineWidth = i === 0 ? 3 : 2.2; ctx.strokeStyle = colors.ink; ctx.stroke();
          if (s.cross && fillAlpha < 1) {
            ctx.globalAlpha = 1 - fillAlpha;
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]); ctx.lineTo(pts[2][0], pts[2][1]);
            ctx.moveTo(pts[1][0], pts[1][1]); ctx.lineTo(pts[3][0], pts[3][1]);
            ctx.lineWidth = 1.4; ctx.stroke(); ctx.globalAlpha = 1;
          }
        }
      }
    }

    const loop = (now) => {
      draw(now);
      if (!moving) running = false; // rien ne bouge : on s'arrête jusqu'au prochain défilement / mouvement
      raf = running ? requestAnimationFrame(loop) : 0;
    };
    const start = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    const onPointer = (e) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
      start();
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onScroll = () => { if (still) draw(performance.now()); else start(); };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
    io.observe(canvas);
    const mo = new MutationObserver(() => { colors = readColors(canvas); draw(performance.now()); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (!still) window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    if (!still) start();

    return () => {
      stop(); ro.disconnect(); io.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [progressRef, staticProgress]);

  return <canvas ref={canvasRef} className="wireframe" role="img" aria-label={label} />;
}
