import { useEffect, useRef } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { reducedMotion } from "../lib/motion.js";

// La devise construit la page : au trait (j'apprends) → pleine (je crée) → bloc bleu (je développe).
// Chaque ligne s'active quand elle passe au milieu de l'écran.
export default function Motto() {
  const { t } = usePrefs();
  const ref = useRef(null);

  useEffect(() => {
    const lines = [...ref.current.querySelectorAll(".motto-line")];
    if (reducedMotion() || !("IntersectionObserver" in window)) { lines.forEach((l) => l.classList.add("is-on")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        // Active quand la ligne atteint 60 % de la hauteur d'écran, ou si on l'a déjà dépassée.
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add("is-on"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -40% 0px", threshold: [0, 1] });
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, []);

  const m = t.motto;
  return (
    <section className="motto" ref={ref} aria-labelledby="motto-title">
      <h2 id="motto-title" className="sr-only">{m.title}</h2>
      <ol className="motto-lines">
        {m.lines.map((line, i) => (
          <li key={line} className={`motto-line motto-line--${i + 1}`}>
            <span className="motto-word">{line}</span>
            <span className="motto-note">{m.notes[i]}</span>
          </li>
        ))}
      </ol>
      <figure className="motto-portrait">
        <div className="portrait-frame">
          <img src="/img/yves-768.webp" srcSet="/img/yves-480.webp 480w, /img/yves-768.webp 768w" sizes="(max-width: 860px) 70vw, 30vw"
            alt={m.portraitAlt} width="768" height="1024" loading="lazy" decoding="async" />
        </div>
        <figcaption>{m.portraitCaption}</figcaption>
      </figure>
    </section>
  );
}
