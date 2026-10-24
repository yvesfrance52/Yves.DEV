import { useState } from "react";
import { Link } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";

export default function CookieBanner() {
  const { t, consent, chooseConsent, cookiePanel } = usePrefs();
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState(consent === "all");
  if (!cookiePanel) return null;
  const c = t.cookies;
  return (
    <aside className="cookie card" aria-labelledby="cookie-title">
      <h2 id="cookie-title" className="card-title">{c.title}</h2>
      <p>{c.text} <Link to="/cookies">{c.learn}</Link></p>
      {custom && (
        <div className="cookie-options">
          <div className="cookie-option"><span><strong>{c.essential[0]}</strong><small>{c.essential[1]}</small></span><em>{c.always}</em></div>
          <label className="cookie-option is-toggle">
            <span><strong>{c.prefs[0]}</strong><small>{c.prefs[1]}</small></span>
            <input type="checkbox" checked={prefs} onChange={(e) => setPrefs(e.target.checked)} />
          </label>
        </div>
      )}
      <div className="cookie-actions">
        {custom ? (
          <button className="btn btn--gold btn--sm" onClick={() => chooseConsent(prefs ? "all" : "essential")}>{c.save}</button>
        ) : (
          <>
            <button className="btn btn--gold btn--sm" onClick={() => chooseConsent("all")}>{c.accept}</button>
            <button className="btn btn--plain btn--sm" onClick={() => chooseConsent("essential")}>{c.refuse}</button>
            <button className="link-btn" onClick={() => setCustom(true)}>{c.customize}</button>
          </>
        )}
      </div>
    </aside>
  );
}
