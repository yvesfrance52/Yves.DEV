// Accès au stockage du navigateur qui ne casse jamais la page
// (navigation privée stricte, stockage désactivé, quotas…).
function safe(area) {
  return {
    get(key) { try { return window[area].getItem(key); } catch { return null; } },
    set(key, value) { try { window[area].setItem(key, value); return true; } catch { return false; } },
    remove(key) { try { window[area].removeItem(key); } catch { /* ignoré */ } }
  };
}

export const local = safe("localStorage");
export const session = safe("sessionStorage");

export const KEYS = {
  consent: "yd-consent",
  theme: "yd-theme",
  lang: "yd-lang",
  motion: "yd-motion",
  human: "yd-human"
};
