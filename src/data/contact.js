import { decode } from "../lib/obfuscate.js";

// Coordonnées d'Yves, encodées (voir scripts/encode-contact.mjs pour les modifier).
// Elles ne sont décodées qu'après la vérification anti-robot.
const encoded = {
  whatsapp: [63, 38, 46, 18, 28, 8, 2, 13, 51, 58, 42, 46, 18],
  whatsappLabel: [38, 38, 41, 23, 9, 0, 2, 30, 61, 57, 51, 41, 23, 8, 25, 15, 29, 48, 56],
  email: [96, 117, 105, 75, 71, 81, 67, 95, 109, 99, 102, 43, 23, 104, 72, 91, 92, 109, 103, 60, 122, 79, 74]
};

// Profil public : pas besoin de le cacher (il est fait pour être trouvé).
export const tiktok = { url: "https://www.tiktok.com/@yvestm0", handle: "@yvestm0" };

export function revealContacts() {
  return {
    whatsapp: decode(encoded.whatsapp),
    whatsappLabel: decode(encoded.whatsappLabel),
    email: decode(encoded.email),
    tiktok
  };
}
