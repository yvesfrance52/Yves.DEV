import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reducedMotion } from "../lib/motion.js";

// Fait défiler jusqu'à une section de l'accueil, même depuis une autre page.
export function useGoTo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useCallback((id) => {
    const scroll = (tries = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
        el.focus?.({ preventScroll: true });
      } else if (tries < 20) setTimeout(() => scroll(tries + 1), 50);
    };
    if (pathname !== "/") navigate("/");
    scroll();
  }, [navigate, pathname]);
}
