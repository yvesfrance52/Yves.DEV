import { usePrefs } from "../context/Prefs.jsx";
import { useGoTo } from "../hooks/useGoTo.js";
import { useReveal } from "../hooks/useReveal.js";

const MARK = { n: "about-name", g: "mark mark--gold", b: "mark mark--blue" };

export default function About() {
  const { t } = usePrefs();
  const goTo = useGoTo();
  const ref = useReveal();
  const a = t.about;
  return (
    <section className="about" id="about" ref={ref} tabIndex={-1} aria-labelledby="about-title">
      <h2 id="about-title" className="section-title" data-reveal>{a.title}</h2>
      <div className="about-grid">
        <p className="about-text" data-reveal>
          {a.text.map(([type, text], i) => {
            if (type === "p") return <span key={i}>{text}</span>;
            if (type === "cta") return (
              <a key={i} className="mark mark--ink about-cta" href="/#contact" onClick={(e) => { e.preventDefault(); goTo("contact"); }}>{text}</a>
            );
            return <span key={i} className={MARK[type]}>{text}</span>;
          })}
        </p>
        <aside className="vision card card--blue" data-reveal>
          <h3 className="card-title">{a.visionTitle}</h3>
          <p>{a.vision}</p>
        </aside>
      </div>
      <h3 className="traits-title" data-reveal>{a.traitsTitle}</h3>
      <ul className="traits">
        {a.traits.map(([name, text], i) => (
          <li key={name} className={`trait trait--${i + 1}`} data-reveal>
            <strong>{name}</strong>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
