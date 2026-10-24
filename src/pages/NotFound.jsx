import { Link } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import WireframeCanvas from "../components/WireframeCanvas.jsx";

// 404 : la page n'est « pas encore construite » — le wireframe reste éclaté.
export default function NotFound() {
  const { t } = usePrefs();
  const n = t.notFound;
  useDocumentMeta(t.meta.notFoundTitle);
  return (
    <main id="main" className="notfound" tabIndex={-1}>
      <div className="notfound-text">
        <p className="notfound-code" aria-hidden="true">{n.code}</p>
        <h1 className="doc-title">{n.title}</h1>
        <p className="lead">{n.text}</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn--ink">{n.home}</Link>
          <Link to="/#work" className="btn btn--paper">{n.work}</Link>
        </div>
      </div>
      <div className="notfound-plan"><WireframeCanvas staticProgress={0} label={t.hero.wireframeLabel} /></div>
    </main>
  );
}
