import { useCallback, useEffect, useRef } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { fill } from "../content/index.js";
import { useFocusTrap } from "../hooks/useFocusTrap.js";
import { ArrowIcon, CloseIcon } from "./Icons.jsx";

// Visionneuse : flèches gauche/droite, Échap, focus piégé, retour du focus.
export default function Lightbox({ images, index, onIndex, onClose }) {
  const { t } = usePrefs();
  const ref = useRef(null);
  const closeRef = useRef(null);
  const open = index !== null && index >= 0;
  const close = useCallback(() => onClose(), [onClose]);
  useFocusTrap(ref, open, close, { initial: closeRef });

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onIndex]);

  if (!open) return null;
  const img = images[index];
  return (
    <div className="lightbox" ref={ref} role="dialog" aria-modal="true" aria-label={img.alt} onClick={(e) => e.target === e.currentTarget && close()}>
      <figure className="lightbox-figure">
        <img src={img.src} srcSet={img.srcSet} sizes="96vw" alt={img.alt} width={img.w} height={img.h} />
        <figcaption>
          <span>{img.alt}</span>
          {images.length > 1 && <span className="lightbox-count">{fill(t.lightbox.counter, { i: index + 1, n: images.length })}</span>}
        </figcaption>
      </figure>
      <div className="lightbox-tools">
        {images.length > 1 && (
          <>
            <button type="button" className="btn-square" onClick={() => onIndex((index - 1 + images.length) % images.length)} aria-label={t.lightbox.prev}><ArrowIcon dir="left" /></button>
            <button type="button" className="btn-square" onClick={() => onIndex((index + 1) % images.length)} aria-label={t.lightbox.next}><ArrowIcon /></button>
          </>
        )}
        <button type="button" ref={closeRef} className="btn-square btn-square--gold" onClick={close} aria-label={t.lightbox.close}><CloseIcon /></button>
      </div>
    </div>
  );
}
