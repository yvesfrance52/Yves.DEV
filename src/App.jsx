import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { PrefsProvider, usePrefs } from "./context/Prefs.jsx";
import { reducedMotion } from "./lib/motion.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import CommandMenu from "./components/CommandMenu.jsx";
import Home from "./pages/Home.jsx";

// Pages secondaires : téléchargées seulement quand on les ouvre (l'accueil reste dans le premier envoi).
const ProjectPage = lazy(() => import("./pages/ProjectPage.jsx"));
const LegalPage = lazy(() => import("./pages/LegalPage.jsx"));
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Haut de page à chaque changement d'URL, ou défilement vers l'ancre (#work…).
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const go = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth" });
      else if (tries++ < 20) setTimeout(go, 50);
    };
    go();
  }, [pathname, hash]);
  return null;
}

function Shell() {
  const { t } = usePrefs();
  return (
    <>
      <a className="skip-link" href="#main" onClick={(e) => {
        e.preventDefault();
        const main = document.getElementById("main");
        main?.focus(); main?.scrollIntoView();
      }}>{t.a11y.skip}</a>
      <ScrollManager />
      <Header />
      <div className="page">
        <Suspense fallback={<main id="main" className="page-loading" tabIndex={-1} aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets/:slug" element={<ProjectPage />} />
            <Route path="/confidentialite" element={<LegalPage page="confidentialite" />} />
            <Route path="/termes" element={<LegalPage page="termes" />} />
            <Route path="/cookies" element={<LegalPage page="cookies" />} />
            <Route path="/parametres" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <CookieBanner />
      <CommandMenu />
    </>
  );
}

function Keyed() {
  const { motionPref } = usePrefs();
  return <Shell key={motionPref} />;
}

export default function App() {
  return <PrefsProvider><Keyed /></PrefsProvider>;
}
