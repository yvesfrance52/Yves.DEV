import { describe, expect, it } from "vitest";
import fr from "../src/content/fr.js";
import en from "../src/content/en.js";
import { projects } from "../src/data/projects.js";
import { allSkills } from "../src/data/skills.js";
import { revealContacts } from "../src/data/contact.js";

// Liste toutes les clés (et la taille des tableaux) d'un objet de contenu.
function shape(obj, prefix = "") {
  return Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v)) return [`${path}[${v.length}]`, ...v.flatMap((x, i) => (x && typeof x === "object" && !Array.isArray(x) ? shape(x, `${path}[${i}]`) : []))];
    if (v && typeof v === "object") return shape(v, path);
    return [path];
  }).sort();
}

describe("contenus FR / EN", () => {
  it("ont exactement les mêmes clés et les mêmes longueurs de listes", () => {
    expect(shape(en)).toEqual(shape(fr));
  });

  it("n'ont aucune valeur vide", () => {
    const empty = (o, p = "") => Object.entries(o).flatMap(([k, v]) =>
      typeof v === "string" ? (v.trim() ? [] : [`${p}${k}`]) : v && typeof v === "object" ? empty(v, `${p}${k}.`) : []);
    expect(empty(fr)).toEqual([]);
    expect(empty(en)).toEqual([]);
  });

  it("décrivent chaque projet et chaque compétence", () => {
    for (const lang of [fr, en]) {
      for (const p of projects) {
        const text = lang.projects.items[p.slug];
        expect(text, p.slug).toBeTruthy();
        expect(text.stripAlts).toHaveLength(p.strip.length);
      }
      for (const s of allSkills) expect(lang.skills.items[s.id], s.id).toBeTruthy();
    }
  });

  it("ne contiennent aucune coordonnée en clair", () => {
    const all = JSON.stringify([fr, en]);
    const c = revealContacts();
    for (const secret of [c.email, c.whatsapp, c.whatsappLabel]) expect(all).not.toContain(secret);
  });
});
