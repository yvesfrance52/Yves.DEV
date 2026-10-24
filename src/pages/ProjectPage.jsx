import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { findProject, hostOf, projects } from "../data/projects.js";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { useReveal } from "../hooks/useReveal.js";
import BrowserFrame from "../components/BrowserFrame.jsx";
import KineticWord from "../components/KineticWord.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { ArrowIcon } from "../components/Icons.jsx";
import NotFound from "./NotFound.jsx";

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = usePrefs();
  const project = findProject(slug);
  const text = project ? t.projects.items[project.slug] : null;
  useDocumentMeta(text ? `${text.name} — Yves.DEV` : null, text?.summary);
  const ref = useReveal([slug]);
  const [index, setIndex] = useState(null);
  if (!project) return <NotFound />;

  const cs = t.caseStudy;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const nextText = t.projects.items[next.slug];
  const shots = ["home", "second"].map((k) => ({ ...project.shots[k], alt: text.shotAlts[k] }));
  // Seules les informations connues sont affichées (voir le commentaire dans src/content/fr.js).
  const details = text.details || {};
  const host = hostOf(project);
  const spec = [
    [cs.spec.client, text.name], [cs.spec.sector, text.sector], [cs.spec.place, text.place], [cs.spec.type, text.type],
    [cs.spec.role, details.role], [cs.spec.stack, details.stack],
    [cs.spec.url, host && <a href={project.url} target="_blank" rel="noopener noreferrer">{host}</a>],
    [cs.spec.results, details.results]
  ].filter(([, v]) => v);

  const shot = (i, className) => (
    <BrowserFrame className={className} address={host || text.name} data-reveal>
      <button type="button" className="shot" onClick={() => setIndex(i)} aria-label={`${cs.zoom} : ${shots[i].alt}`}>
        <img src={shots[i].src} srcSet={shots[i].srcSet} sizes="(max-width: 860px) 100vw, 70vw" alt={shots[i].alt}
          width={shots[i].w} height={shots[i].h} decoding="async" loading={i ? "lazy" : "eager"} />
      </button>
    </BrowserFrame>
  );

  return (
    <main id="main" className="case" ref={ref} tabIndex={-1} key={slug}>
      <header className="case-head">
        <Link to="/#work" className="back"><ArrowIcon dir="left" />{cs.back}</Link>
        <h1 className="case-title"><KineticWord text={text.name} /></h1>
        <div className="project-tags">
          <span className="sticker sticker--gold">{text.sector}</span>
          <span className="sticker">{text.place}</span>
        </div>
      </header>

      {shot(0, "case-shot case-shot--main")}

      <div className="case-body">
        <section className="case-summary" data-reveal>
          <h2 className="card-title">{cs.summaryTitle}</h2>
          <p className="lead">{text.summary}</p>
          <h2 className="card-title">{cs.showsTitle}</h2>
          <ul className="checklist">{text.shows.map((s) => <li key={s}>{s}</li>)}</ul>
        </section>
        <section className="spec card" aria-labelledby="spec-title" data-reveal>
          <h2 id="spec-title" className="card-title">{cs.specTitle}</h2>
          <dl>{spec.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
      </div>

      {shot(1, "case-shot case-shot--second")}

      <Link to={`/projets/${next.slug}`} className="next">
        <span className="next-label">{cs.next}</span>
        <span className="next-name">{nextText.name}</span>
        <ArrowIcon />
      </Link>

      <Lightbox images={shots} index={index} onIndex={setIndex} onClose={() => setIndex(null)} />
    </main>
  );
}
