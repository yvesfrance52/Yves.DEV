import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { plural } from "../content/index.js";
import { hostOf, projects } from "../data/projects.js";
import { useReveal } from "../hooks/useReveal.js";
import BrowserFrame from "../components/BrowserFrame.jsx";
import Strip from "../components/Strip.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { ArrowIcon } from "../components/Icons.jsx";

const shotList = (p, text) => ["home", "second"].map((k) => ({ ...p.shots[k], alt: text.shotAlts[k] }));

export default function Work() {
  const { t, lang } = usePrefs();
  const [filter, setFilter] = useState("all");
  const [box, setBox] = useState({ slug: null, index: null });
  const ref = useReveal([filter]);
  const w = t.work;

  const visible = useMemo(() => projects.filter((p) => filter === "all" || p.category === filter), [filter]);
  const boxProject = projects.find((p) => p.slug === box.slug);

  return (
    <section className="work" id="work" ref={ref} tabIndex={-1} aria-labelledby="work-title">
      <div className="work-head">
        <h2 id="work-title" className="section-title" data-reveal>{w.title}</h2>
        <p className="work-intro" data-reveal>{w.intro}</p>
        <div className="filters" role="group" aria-label={w.filterLabel} data-reveal>
          {Object.entries(w.filters).map(([key, label]) => (
            <button key={key} type="button" className="chip" aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>
          ))}
          <span className="filters-count" role="status">{plural(w.count, visible.length, lang)}</span>
        </div>
      </div>

      <div className="work-list">
        {visible.map((p, i) => {
          const text = t.projects.items[p.slug];
          const side = i % 2 ? "right" : "left";
          return (
            <article key={p.slug} className={`project project--${side}`} aria-labelledby={`p-${p.slug}`}>
              <BrowserFrame className="project-frame" address={hostOf(p) || text.name} data-reveal>
                <Strip items={p.strip} alts={text.stripAlts} name={text.name} reverse={i % 2 === 1} speed={i % 2 ? 58 : 72}
                  onOpen={(key) => setBox({ slug: p.slug, index: key === "second" ? 1 : 0 })} />
              </BrowserFrame>
              <div className={`project-card card ${i % 2 ? "card--blue" : ""}`} data-reveal>
                <div className="project-tags">
                  <span className="sticker sticker--gold">{text.sector}</span>
                  <span className="sticker">{text.place}</span>
                </div>
                <h3 id={`p-${p.slug}`} className="project-name">{text.name}</h3>
                <p>{text.summary}</p>
                <Link className="btn btn--paper" to={`/projets/${p.slug}`}>{w.openCase}<ArrowIcon /></Link>
              </div>
            </article>
          );
        })}
      </div>

      <Lightbox images={boxProject ? shotList(boxProject, t.projects.items[boxProject.slug]) : []}
        index={box.index} onIndex={(index) => setBox((b) => ({ ...b, index }))} onClose={() => setBox({ slug: null, index: null })} />
    </section>
  );
}
