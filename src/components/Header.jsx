import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { useGoTo } from "../hooks/useGoTo.js";
import { useFocusTrap } from "../hooks/useFocusTrap.js";
import { CloseIcon, MoonIcon, SettingsIcon, SunIcon } from "./Icons.jsx";

export const NAV = ["work", "about", "skills", "contact"];

export default function Header() {
  const { t, theme, toggleTheme, setLang, setCommandsOpen } = usePrefs();
  const goTo = useGoTo();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(menuRef, open, close);

  // Masque la barre en descendant, la montre en remontant.
  useEffect(() => {
    let last = window.scrollY, raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setHidden(y > 240 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
        last = y;
      });
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const onNav = (e, id) => { e.preventDefault(); setOpen(false); goTo(id); };
  const themeLabel = theme === "dark" ? t.header.toLight : t.header.toDark;
  const onTheme = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  return (
    <>
      <header className={`site-header ${hidden && !open ? "is-hidden" : ""}`}>
        <div className="bar">
          <Link to="/" className="brand" aria-label={t.a11y.home} onClick={() => window.scrollTo({ top: 0 })}>
            <img src="/img/logo-mark.webp" alt="" width="44" height="31" />
            <span className="brand-name">Yves<span className="brand-dot">.</span>DEV</span>
          </Link>
          <nav className="bar-nav" aria-label={t.a11y.mainNav}>
            {NAV.map((id) => <a key={id} href={`/#${id}`} onClick={(e) => onNav(e, id)}>{t.nav[id]}</a>)}
          </nav>
          <div className="bar-tools">
            <Link to="/parametres" className="tool tool--settings" aria-label={t.header.settings} title={t.header.settings}
              aria-current={pathname === "/parametres" ? "page" : undefined}>
              <SettingsIcon />
            </Link>
            <button type="button" className="tool" onClick={onTheme} aria-label={themeLabel} title={themeLabel}>
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <button type="button" className="tool tool--lang" onClick={() => setLang()} aria-label={t.header.switchLang} title={t.header.switchLang} lang={t.meta.lang === "fr" ? "en" : "fr"}>
              {t.header.switchLangShort}
            </button>
            <button type="button" className="tool tool--menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-menu">
              {t.header.menu}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="menu-sheet" id="mobile-menu" ref={menuRef} role="dialog" aria-modal="true" aria-label={t.header.menu}>
          <button type="button" className="tool menu-close" onClick={close}><CloseIcon /><span>{t.header.closeMenu}</span></button>
          <nav aria-label={t.a11y.mainNav}>
            {NAV.map((id, i) => (
              <a key={id} href={`/#${id}`} onClick={(e) => onNav(e, id)} style={{ "--i": i }}>{t.nav[id]}</a>
            ))}
          </nav>
          <button type="button" className="btn btn--gold" onClick={() => { close(); setCommandsOpen(true); }}>{t.commands.title}</button>
        </div>
      )}
    </>
  );
}
