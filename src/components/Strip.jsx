import { useState } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { fill } from "../content/index.js";
import { PauseIcon, PlayIcon } from "./Icons.jsx";

// Bande de captures qui défile seule (inspirée des portfolios éditoriaux) :
// pause au survol, au focus et par bouton ; clic = agrandir.
export default function Strip({ items, alts, name, reverse = false, speed = 70, onOpen }) {
  const { t } = usePrefs();
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  return (
    <div className="strip-wrap">
      <div className={`strip ${paused ? "is-paused" : ""} ${reverse ? "is-reverse" : ""}`} style={{ "--speed": `${speed}s` }}
        role="group" aria-roledescription="carrousel" aria-label={fill(t.work.stripLabel, { name })}>
        <ul className="strip-track">
          {doubled.map((it, i) => {
            const clone = i >= items.length;
            const alt = alts[i % items.length];
            return (
              <li key={i} className="strip-item" aria-hidden={clone || undefined}>
                <button type="button" className="strip-frame" tabIndex={clone ? -1 : 0} style={{ aspectRatio: `${it.w} / ${it.h}` }}
                  onClick={() => onOpen(it.full)} aria-label={clone ? undefined : `${t.work.zoom} : ${alt}`}>
                  <img src={it.src} alt={clone ? "" : alt} width={it.w} height={it.h} loading="lazy" decoding="async" draggable="false" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button type="button" className="strip-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
        {paused ? <PlayIcon /> : <PauseIcon />}<span>{paused ? t.work.play : t.work.pause}</span>
      </button>
    </div>
  );
}
