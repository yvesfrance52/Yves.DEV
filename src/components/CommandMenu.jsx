import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePrefs } from "../context/Prefs.jsx";
import { useFocusTrap } from "../hooks/useFocusTrap.js";
import { reducedMotion } from "../lib/motion.js";
import { useGoTo } from "../hooks/useGoTo.js";
import { projects } from "../data/projects.js";

const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

// Palette de commandes (Ctrl/⌘ + K) : navigation, projets, thème, langue, cookies.
export default function CommandMenu() {
  const { t, commandsOpen, setCommandsOpen, toggleTheme, setLang, setCookiePanel, setMotionPref } = usePrefs();
  const navigate = useNavigate();
  const goTo = useGoTo();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();
  const close = useCallback(() => { setCommandsOpen(false); setQuery(""); setActive(0); }, [setCommandsOpen]);
  useFocusTrap(ref, commandsOpen, close, { initial: inputRef });

  // Raccourci global Ctrl/⌘ + K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setCommandsOpen((o) => !o); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setCommandsOpen]);

  const c = t.commands;
  const actions = useMemo(() => [
    { group: c.groups.go, label: c.home, run: () => { navigate("/"); window.scrollTo({ top: 0 }); } },
    { group: c.groups.go, label: t.nav.work, run: () => goTo("work") },
    { group: c.groups.go, label: t.nav.about, run: () => goTo("about") },
    { group: c.groups.go, label: t.nav.skills, run: () => goTo("skills") },
    { group: c.groups.go, label: t.nav.contact, run: () => goTo("contact") },
    ...projects.map((p) => ({ group: c.groups.projects, label: t.projects.items[p.slug].name, run: () => navigate(`/projets/${p.slug}`) })),
    { group: c.groups.prefs, label: c.theme, run: () => toggleTheme() },
    { group: c.groups.prefs, label: c.lang, run: () => setLang() },
    reducedMotion()
      ? { group: c.groups.prefs, label: c.motionOn, run: () => setMotionPref("full") }
      : { group: c.groups.prefs, label: c.motionOff, run: () => setMotionPref("reduce") },
    { group: c.groups.prefs, label: c.cookies, run: () => setCookiePanel(true) },
    { group: c.groups.prefs, label: c.settings, run: () => navigate("/parametres") }
  ], [c, t, navigate, goTo, toggleTheme, setLang, setCookiePanel, setMotionPref, commandsOpen]); // commandsOpen : relit le réglage à chaque ouverture

  const q = normalize(query.trim());
  const list = q ? actions.filter((a) => normalize(`${a.group} ${a.label}`).includes(q)) : actions;
  const current = Math.min(active, Math.max(0, list.length - 1));

  if (!commandsOpen) return null;

  const run = (a) => { close(); setTimeout(a.run, 0); };
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((current + 1) % Math.max(1, list.length)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((current - 1 + list.length) % Math.max(1, list.length)); }
    if (e.key === "Enter" && list[current]) { e.preventDefault(); run(list[current]); }
  };

  let lastGroup = null;
  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}>
      <div className="cmd card" ref={ref} role="dialog" aria-modal="true" aria-label={c.title}>
        <input ref={inputRef} className="cmd-input" type="text" role="combobox" aria-expanded="true" aria-controls={listId}
          aria-activedescendant={list[current] ? `${listId}-${current}` : undefined} aria-autocomplete="list"
          placeholder={c.placeholder} value={query} maxLength={60}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onKeyDown} />
        <ul className="cmd-list" id={listId} role="listbox" aria-label={c.title}>
          {list.length === 0 && <li className="cmd-empty" role="presentation">{c.empty}</li>}
          {list.map((a, i) => {
            const head = a.group !== lastGroup ? (lastGroup = a.group) : null;
            return (
              <li key={`${a.group}-${a.label}`} role="presentation">
                {head && <span className="cmd-group" aria-hidden="true">{head}</span>}
                <div id={`${listId}-${i}`} role="option" aria-selected={i === current} className={`cmd-item ${i === current ? "is-active" : ""}`}
                  onMouseMove={() => setActive(i)} onClick={() => run(a)}>
                  {a.label}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="cmd-hint">{c.hint}</p>
      </div>
    </div>
  );
}
