import { Link } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { useGoTo } from "../hooks/useGoTo.js";
import { fill } from "../content/index.js";
import { tiktok } from "../data/contact.js";
import { NAV } from "./Header.jsx";
import KineticWord from "./KineticWord.jsx";

export default function Footer() {
  const { t, theme, toggleTheme, setLang, setCookiePanel } = usePrefs();
  const goTo = useGoTo();
  const f = t.footer;
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo-plate"><img src="/img/logo-full.webp" alt="Yves.DEV" width="901" height="181" loading="lazy" /></div>
          <p>{f.tagline}</p>
        </div>
        <div>
          <h2>{f.cols.nav}</h2>
          <ul>{NAV.map((id) => <li key={id}><a href={`/#${id}`} onClick={(e) => { e.preventDefault(); goTo(id); }}>{t.nav[id]}</a></li>)}</ul>
        </div>
        <div>
          <h2>{f.cols.legal}</h2>
          <ul>
            <li><Link to="/confidentialite">{t.legal.privacy}</Link></li>
            <li><Link to="/termes">{t.legal.terms}</Link></li>
            <li><Link to="/cookies">{t.legal.cookies}</Link></li>
            <li><button type="button" className="link-btn" onClick={() => setCookiePanel(true)}>{t.legal.manageCookies}</button></li>
          </ul>
        </div>
        <div>
          <h2>{f.cols.prefs}</h2>
          <ul>
            <li><button type="button" className="link-btn" onClick={() => toggleTheme()}>{theme === "dark" ? t.header.toLight : t.header.toDark}</button></li>
            <li><button type="button" className="link-btn" onClick={() => setLang()} lang={t.meta.lang === "fr" ? "en" : "fr"}>{t.header.switchLang}</button></li>
            <li><Link to="/parametres">{t.settings.title}</Link></li>
          </ul>
        </div>
        <div>
          <h2>{f.cols.social}</h2>
          <ul><li><a href={tiktok.url} target="_blank" rel="noopener noreferrer">TikTok {tiktok.handle} <span className="sr-only">{t.a11y.newTab}</span></a></li></ul>
        </div>
      </div>
      <KineticWord text="YVES.DEV" as="p" className="footer-word" outline reach={320} boost={40} />
      <div className="footer-end">
        <p>{fill(f.rights, { year: new Date().getFullYear() })} {f.built}</p>
        <button type="button" className="btn btn--gold btn--sm" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{f.top}</button>
      </div>
    </footer>
  );
}
