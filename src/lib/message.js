// Construction sûre des messages du composeur de contact.
export const LIMITS = { name: 60, message: 800 };

// Caractères de contrôle et de direction (sauf retour à la ligne). Construite depuis une chaîne
// d'échappements pour que le code compilé reste en ASCII pur, quel que soit l'encodage de la page.
const CONTROL_CHARS = new RegExp("[\\u0000-\\u0009\\u000B-\\u001F\\u007F-\\u009F\\u200B-\\u200F\\u202A-\\u202E\\u2066-\\u2069]", "g");

// Retire les caractères de contrôle (sauf retour à la ligne), les espaces superflus
// et tronque à la longueur maximale.
export function clean(value, max) {
  return String(value ?? "")
    .normalize("NFC")
    .replace(CONTROL_CHARS, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

export function composeText({ name, type, message }, t) {
  const n = clean(name, LIMITS.name);
  const m = clean(message, LIMITS.message);
  const lines = [t.greeting];
  if (n) lines.push(t.intro.replace("{name}", n));
  if (type) lines.push(t.projectLine.replace("{type}", type));
  if (m) lines.push("", m);
  return lines.join("\n");
}

export function whatsappLink(number, text) {
  const digits = String(number).replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(digits)) throw new Error("Numéro WhatsApp invalide");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(email, subject, body) {
  if (!/^[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}$/i.test(email)) throw new Error("Adresse e-mail invalide");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
