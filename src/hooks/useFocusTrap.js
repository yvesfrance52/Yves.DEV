import { useEffect } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Garde le focus dans un dialogue ouvert, ferme avec Échap, rend le focus à l'élément d'origine.
export function useFocusTrap(ref, open, onClose, { lockScroll = true, initial } = {}) {
  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const previous = document.activeElement;
    const items = () => [...(node?.querySelectorAll(FOCUSABLE) || [])].filter((el) => el.offsetParent !== null || el === document.activeElement);
    (initial?.current || items()[0])?.focus();
    if (lockScroll) document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (lockScroll) document.body.style.overflow = "";
      // Rend le focus à l'élément d'origine s'il existe encore (pas au <body> ni à un élément retiré).
      if (previous instanceof HTMLElement && previous !== document.body && previous.isConnected) previous.focus({ preventScroll: true });
    };
  }, [ref, open, onClose, lockScroll, initial]);
}
