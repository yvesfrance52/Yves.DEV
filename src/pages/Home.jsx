import { usePrefs } from "../context/Prefs.jsx";
import { useDocumentMeta } from "../hooks/useDocumentMeta.js";
import Hero from "../sections/Hero.jsx";
import Ribbon from "../sections/Ribbon.jsx";
import Work from "../sections/Work.jsx";
import Motto from "../sections/Motto.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import Contact from "../sections/Contact.jsx";

export default function Home() {
  const { t } = usePrefs();
  useDocumentMeta(t.meta.homeTitle, t.meta.description);
  return (
    <main id="main" tabIndex={-1}>
      <Hero />
      <Ribbon />
      <Work />
      <Motto />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
