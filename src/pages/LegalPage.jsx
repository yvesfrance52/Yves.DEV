import { Link } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { ArrowIcon } from "../components/Icons.jsx";

export default function LegalPage({ page }) {
  const { t, setCookiePanel } = usePrefs();
  const p = t.legal.pages[page];
  useDocumentMeta(`${p.title} — Yves.DEV`, p.intro);
  return (
    <main id="main" className="doc" tabIndex={-1}>
      <Link to="/" className="back"><ArrowIcon dir="left" />{t.legal.back}</Link>
      <h1 className="doc-title">{p.title}</h1>
      <p className="lead">{p.intro}</p>
      <div className="doc-sections">
        {p.sections.map(([h, body]) => (
          <section key={h} className="card doc-card"><h2 className="card-title">{h}</h2><p>{body}</p></section>
        ))}
      </div>
      {page === "cookies" && <button type="button" className="btn btn--gold" onClick={() => setCookiePanel(true)}>{t.legal.manageCookies}</button>}
      <p className="doc-updated">{t.legal.updated}</p>
    </main>
  );
}
