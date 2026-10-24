import { useEffect, useRef, useState } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { keyboard, allSkills } from "../data/skills.js";
import { reducedMotion } from "../lib/motion.js";
import { useReveal } from "../hooks/useReveal.js";

// Compétences sous forme de clavier : on presse une touche, l'écran tape le nom et sa description.
export default function Skills() {
  const { t } = usePrefs();
  const s = t.skills;
  const ref = useReveal();
  const [active, setActive] = useState(null);
  const [typed, setTyped] = useState("");
  const timer = useRef(0);

  const skill = allSkills.find((k) => k.id === active);
  const fullText = skill ? s.items[skill.id] : "";

  // Effet machine à écrire (désactivé si l'utilisateur réduit les animations).
  useEffect(() => {
    clearInterval(timer.current);
    if (!fullText) { setTyped(""); return; }
    if (reducedMotion()) { setTyped(fullText); return; }
    let n = 0;
    setTyped("");
    timer.current = setInterval(() => {
      n += 2;
      setTyped(fullText.slice(0, n));
      if (n >= fullText.length) clearInterval(timer.current);
    }, 16);
    return () => clearInterval(timer.current);
  }, [fullText]);

  return (
    <section className="skills" id="skills" ref={ref} tabIndex={-1} aria-labelledby="skills-title">
      <div className="skills-head">
        <h2 id="skills-title" className="section-title" data-reveal>{s.title}</h2>
        <p data-reveal>{s.intro}</p>
      </div>
      <div className="device" data-reveal>
        <div className="screen">
          <div className="screen-inner" aria-live="polite" aria-atomic="true">
            {skill ? (
              <>
                <span className="screen-group">{s.groups[skill.group]}</span>
                <p className="screen-title">{skill.label}</p>
                <p className="screen-text"><span className="sr-only">{fullText}</span><span aria-hidden="true">{typed}</span><span className="caret" aria-hidden="true" /></p>
              </>
            ) : (
              <p className="screen-title screen-title--idle">{s.screenIdle}<span className="caret" aria-hidden="true" /></p>
            )}
          </div>
        </div>
        <div className="keyboard" role="group" aria-label={s.keyboardLabel}>
          {keyboard.map((row, r) => (
            <div className="key-row" key={r}>
              {row.map((k) => (
                <button key={k.id} type="button" className={`key key--${k.group}`} style={{ "--size": k.size }}
                  aria-pressed={active === k.id} onClick={() => setActive(k.id)}>
                  <span className="key-cap">{k.label}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
