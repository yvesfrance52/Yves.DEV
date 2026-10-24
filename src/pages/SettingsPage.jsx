import { Link } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import { systemReducedMotion } from "../lib/motion.js";
import { ArrowIcon } from "../components/Icons.jsx";

function Row({ info, children }) {
  return (
    <section className="card setting"><div><h2 className="card-title">{info[0]}</h2><p>{info[1]}</p></div><div className="setting-actions">{children}</div></section>
  );
}

export default function SettingsPage() {
  const { t, lang, setLang, themePref, setThemePref, motionPref, setMotionPref, setCookiePanel } = usePrefs();
  const s = t.settings;
  useDocumentMeta(`${s.title} — Yves.DEV`);
  return (
    <main id="main" className="doc" tabIndex={-1}>
      <Link to="/" className="back"><ArrowIcon dir="left" />{t.legal.back}</Link>
      <h1 className="doc-title">{s.title}</h1>
      <div className="doc-sections">
        <Row info={s.theme}>
          {["light", "dark", "system"].map((v) => (
            <button key={v} type="button" className="chip" aria-pressed={themePref === v} onClick={() => setThemePref(v)}>{s[v]}</button>
          ))}
        </Row>
        <Row info={s.language}>
          <button type="button" className="chip" aria-pressed={lang === "fr"} onClick={() => setLang("fr")} lang="fr">Français</button>
          <button type="button" className="chip" aria-pressed={lang === "en"} onClick={() => setLang("en")} lang="en">English</button>
        </Row>
        <Row info={s.motion}>
          {[["system", s.motionSystem], ["full", s.motionFull], ["reduce", s.motionReduce]].map(([v, label]) => (
            <button key={v} type="button" className="chip" aria-pressed={motionPref === v} onClick={() => setMotionPref(v)}>{label}</button>
          ))}
          <p className="setting-note">{systemReducedMotion() ? s.motionDeviceOn : s.motionDeviceOff}</p>
        </Row>
        <Row info={s.cookies}><button type="button" className="btn btn--gold btn--sm" onClick={() => setCookiePanel(true)}>{t.legal.manageCookies}</button></Row>
      </div>
    </main>
  );
}
