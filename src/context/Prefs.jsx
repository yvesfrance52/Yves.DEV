import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { content, LANGS } from "../content/index.js";
import { local, KEYS } from "../lib/storage.js";
import { applyMotionPref, withViewTransition } from "../lib/motion.js";

const PrefsContext = createContext(null);

const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

function initialLang() {
  const saved = local.get(KEYS.lang);
  if (LANGS.includes(saved)) return saved;
  const nav = (navigator.languages?.[0] || navigator.language || "fr").toLowerCase();
  return nav.startsWith("en") ? "en" : "fr";
}

function initialThemePref() {
  const saved = local.get(KEYS.theme);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
}

function initialMotionPref() {
  const saved = local.get(KEYS.motion);
  const pref = saved === "full" || saved === "reduce" ? saved : "system";
  applyMotionPref(pref); // avant le premier rendu : les composants lisent ce réglage au montage
  return pref;
}

function initialConsent() {
  const v = local.get(KEYS.consent);
  return v === "all" || v === "essential" ? v : null;
}

export function PrefsProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const [themePref, setThemePrefState] = useState(initialThemePref);
  const [motionPref, setMotionPrefState] = useState(initialMotionPref);
  const [sysTheme, setSysTheme] = useState(systemTheme);
  const [consent, setConsent] = useState(initialConsent);
  const [cookiePanel, setCookiePanel] = useState(() => initialConsent() === null);
  const [commandsOpen, setCommandsOpen] = useState(false);

  const theme = themePref === "system" ? sysTheme : themePref;
  const t = content[lang];

  // Suit le thème du système quand l'utilisateur n'a rien choisi.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const on = () => setSysTheme(mq.matches ? "light" : "dark");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.lang = lang;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#0B1236" : "#F4F6FB");
  }, [theme, lang]);

  // Les préférences ne sont mémorisées qu'avec le consentement « all ».
  useEffect(() => {
    if (consent === "all") {
      local.set(KEYS.lang, lang);
      local.set(KEYS.theme, themePref);
      local.set(KEYS.motion, motionPref);
    }
  }, [consent, lang, themePref, motionPref]);

  const setLang = useCallback((next) => {
    setLangState((cur) => (LANGS.includes(next) ? next : cur === "fr" ? "en" : "fr"));
  }, []);

  const setThemePref = useCallback((next, origin) => {
    withViewTransition(() => flushSync(() => setThemePrefState(next)), origin);
  }, []);

  const toggleTheme = useCallback((origin) => {
    setThemePref(theme === "dark" ? "light" : "dark", origin);
  }, [theme, setThemePref]);

  // Appliqué tout de suite sur <html> ; l'application remonte ses composants (clé motionPref dans App).
  const setMotionPref = useCallback((next) => {
    const pref = next === "full" || next === "reduce" ? next : "system";
    applyMotionPref(pref);
    setMotionPrefState(pref);
  }, []);

  const chooseConsent = useCallback((value) => {
    local.set(KEYS.consent, value);
    if (value !== "all") { local.remove(KEYS.lang); local.remove(KEYS.theme); local.remove(KEYS.motion); }
    setConsent(value);
    setCookiePanel(false);
  }, []);

  const value = useMemo(() => ({
    lang, t, setLang, theme, themePref, setThemePref, toggleTheme, motionPref, setMotionPref,
    consent, chooseConsent, cookiePanel, setCookiePanel,
    commandsOpen, setCommandsOpen
  }), [lang, t, setLang, theme, themePref, setThemePref, toggleTheme, motionPref, setMotionPref, consent, chooseConsent, cookiePanel, commandsOpen]);

  return <PrefsContext.Provider value={value}>{children}</PrefsContext.Provider>;
}

export function usePrefs() {
  const ctx = useContext(PrefsContext);
  if (!ctx) throw new Error("usePrefs doit être utilisé dans <PrefsProvider>");
  return ctx;
}
