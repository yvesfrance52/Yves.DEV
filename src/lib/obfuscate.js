// Obfuscation légère : empêche la collecte des coordonnées par les robots
// qui lisent le HTML/JS sans l'exécuter. La vraie barrière reste la
// vérification anti-robot (HumanCheck) qui conditionne le décodage.
const key = (i) => (i * 7 + 13) & 0x3f;

export function encode(value) {
  return [...String(value)].map((c, i) => c.codePointAt(0) ^ key(i));
}

export function decode(codes) {
  if (!Array.isArray(codes)) return "";
  return codes.map((n, i) => String.fromCodePoint(n ^ key(i))).join("");
}
