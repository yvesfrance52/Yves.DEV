import { describe, expect, it } from "vitest";
import { clean, composeText, mailtoLink, whatsappLink, LIMITS } from "../src/lib/message.js";
import { decode, encode } from "../src/lib/obfuscate.js";

const t = { greeting: "Bonjour Yves,", intro: "je m'appelle {name}.", projectLine: "Projet : {type}." };

describe("nettoyage des saisies", () => {
  it("retire les caractères de contrôle et les caractères bidirectionnels", () => {
    expect(clean("Awa\u0007‮ test​", 60)).toBe("Awa test");
  });
  it("réduit les lignes vides et tronque à la limite", () => {
    expect(clean("a\n\n\n\n\nb", 100)).toBe("a\n\nb");
    expect(clean("x".repeat(2000), LIMITS.message)).toHaveLength(LIMITS.message);
  });
});

describe("composition du message", () => {
  it("assemble un texte lisible", () => {
    expect(composeText({ name: " Awa ", type: "Site vitrine", message: "Un site." }, t))
      .toBe("Bonjour Yves,\nje m'appelle Awa.\nProjet : Site vitrine.\n\nUn site.");
  });
  it("encode le texte dans les liens (pas d'injection de paramètres)", () => {
    const url = whatsappLink("+225 01 02 03 04 05", "a&text=pirate#x");
    expect(url).toBe("https://wa.me/2250102030405?text=a%26text%3Dpirate%23x");
    const mail = mailtoLink("yves@example.com", "Sujet", "a&cc=autre@x.com");
    expect(mail).toBe("mailto:yves@example.com?subject=Sujet&body=a%26cc%3Dautre%40x.com");
  });
  it("refuse un numéro ou une adresse invalide", () => {
    expect(() => whatsappLink("12", "x")).toThrow();
    expect(() => mailtoLink("javascript:alert(1)", "s", "b")).toThrow();
  });
});

describe("obfuscation des coordonnées", () => {
  it("est réversible et ne laisse pas la valeur en clair", () => {
    const value = "exemple@domaine.ci";
    const codes = encode(value);
    expect(JSON.stringify(codes)).not.toContain("exemple");
    expect(decode(codes)).toBe(value);
  });
  it("renvoie une chaîne vide pour une entrée invalide", () => {
    expect(decode(null)).toBe("");
  });
});
