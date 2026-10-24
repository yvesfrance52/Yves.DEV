import fr from "./fr.js";
import en from "./en.js";

export const content = { fr, en };
export const LANGS = ["fr", "en"];

// Remplace {clé} par sa valeur : fill("{n} projets", { n: 2 }).
export const fill = (str, vars = {}) =>
  String(str).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

export const plural = (forms, n, lang) =>
  fill(new Intl.PluralRules(lang).select(n) === "one" ? forms.one : forms.other, { n });
