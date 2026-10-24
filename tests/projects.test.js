import { describe, expect, it } from "vitest";
import { hostOf, projects } from "../src/data/projects.js";

describe("adresse des projets", () => {
  it("n'affiche un domaine que pour une adresse https valide", () => {
    expect(hostOf({ url: "https://mjdeco.ci/boutique" })).toBe("mjdeco.ci");
    expect(hostOf({ url: "" })).toBeNull();
    expect(hostOf({ url: "http://exemple.com" })).toBeNull();
    expect(hostOf({ url: "javascript:alert(1)" })).toBeNull();
    expect(hostOf({ url: "pas une adresse" })).toBeNull();
  });

  it("chaque projet a un champ url (vide tant que l'adresse n'est pas connue)", () => {
    for (const p of projects) expect(typeof p.url, p.slug).toBe("string");
  });
});
