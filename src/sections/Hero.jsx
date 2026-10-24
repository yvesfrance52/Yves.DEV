import { useCallback, useRef } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { useGoTo } from "../hooks/useGoTo.js";
import { useScrollProgress } from "../hooks/useScrollProgress.js";
import KineticWord from "../components/KineticWord.jsx";
import WireframeCanvas from "../components/WireframeCanvas.jsx";
import { ArrowIcon } from "../components/Icons.jsx";

// Accueil : « YVES. » plein, « DEV » au trait qui se remplit pendant que le wireframe s'assemble.
export default function Hero() {
  const { t } = usePrefs();
  const goTo = useGoTo();
  const ref = useRef(null);
  const progress = useRef(0);
  const onProgress = useCallback((p) => { progress.current = p; }, []);
  useScrollProgress(ref, { onProgress });

  return (
    <section className="hero" id="home" ref={ref} aria-labelledby="hero-title">
      <div className="hero-sticky">
        <h1 id="hero-title" className="hero-name">
          <KineticWord text="YVES." className="hero-line hero-line--1" />
          <KineticWord text="DEV" className="hero-line hero-line--2" outline delay={250} />
        </h1>
        <div className="hero-plan">
          <WireframeCanvas progressRef={progress} label={t.hero.wireframeLabel} />
        </div>
        <div className="hero-foot">
          <span className="sticker sticker--gold">{t.hero.sticker}</span>
          <p className="hero-lead">{t.hero.lead}</p>
          <a className="btn btn--ink btn--lg" href="/#work" onClick={(e) => { e.preventDefault(); goTo("work"); }}>
            {t.hero.cta}<ArrowIcon dir="down" />
          </a>
        </div>
      </div>
    </section>
  );
}
