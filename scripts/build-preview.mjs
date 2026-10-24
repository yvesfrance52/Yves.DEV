#!/usr/bin/env node
/*
  Aperçu autonome en UN fichier (images et polices intégrées) pour un Artifact claude.ai.
  Contraintes de l'hébergeur prises en compte :
  - la page est insérée dans le <body> d'un squelette fourni par l'hôte : on produit un FRAGMENT
    (pas de <!doctype>, <html>, <head>, <body>) ;
  - le cadre est verrouillé : pas d'ancres « #/… » ni de history.replaceState → routeur en mémoire
    (VITE_ROUTER=memory) ;
  - l'encodage de la page ne doit pas pouvoir casser le script → sortie 100 % ASCII
    (caractères non ASCII échappés en \uXXXX dans le JS, \HEX dans le CSS, &#x…; dans le HTML).
  Usage : npm run preview:single  →  preview/yves-dev-apercu.html
*/
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";

const tmp = ".preview-build";
const args = process.argv.slice(2);
const standalone = args.includes("--standalone"); // document complet, pour l'ouvrir par double-clic
const out = args.find((a) => !a.startsWith("--")) || "preview/yves-dev-apercu.html";
rmSync(tmp, { recursive: true, force: true });
execSync(`npx vite build --outDir ${tmp} --emptyOutDir`, {
  stdio: "inherit",
  env: { ...process.env, VITE_ROUTER: "memory", VITE_NO_CSP: "1" }
});

const mime = { ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".woff": "font/woff" };
const uri = (p) => `data:${mime[extname(p)]};base64,${readFileSync(p).toString("base64")}`;

// Échappements ASCII
const hex4 = (n) => n.toString(16).toUpperCase().padStart(4, "0");
const jsAscii = (s) => s.replace(/[^\x00-\x7F]/g, (c) => `\\u${hex4(c.charCodeAt(0))}`); // par unité UTF-16
const cssAscii = (s) => s.replace(/[^\x00-\x7F]/gu, (c) => `\\${c.codePointAt(0).toString(16)} `);
const htmlAscii = (s) => s.replace(/[^\x00-\x7F]/gu, (c) => `&#x${c.codePointAt(0).toString(16)};`);

const assets = readdirSync(join(tmp, "assets"));
let js = readFileSync(join(tmp, "assets", assets.find((f) => f.endsWith(".js"))), "utf8");
let css = readFileSync(join(tmp, "assets", assets.find((f) => f.endsWith(".css"))), "utf8");
const index = readFileSync(join(tmp, "index.html"), "utf8");

css = css.replace(/@font-face\{[^}]*(vietnamese|latin-ext)[^}]*\}/g, ""); // FR/EN : le sous-ensemble latin suffit
css = css.replace(/url\(\/assets\/([^)]+)\)/g, (_, f) => `url(${uri(join(tmp, "assets", f))})`);
css = cssAscii(css).replaceAll("</style", "<\\/style");
js = js.replace(/\/img\/[A-Za-z0-9_/.-]+\.(?:webp|png)/g, (p) => uri(join(tmp, p)));
js = jsAscii(js).replaceAll("</script", "<\\/script");

// Fragment : contenu du <head> utile + contenu du <body>, sans les balises de document.
// (Avec --standalone, le fragment est ensuite enveloppé dans un document HTML complet.)
const head = index.match(/<head>([\s\S]*?)<\/head>/)[1]
  .replace(/<meta charset="UTF-8" \/>\s*/, "")
  .replace(/<meta name="viewport"[^>]*>\s*/, "")
  .replace(/<meta name="theme-color"[^>]*>\s*/, "")
  .replace(/<title>[^<]*<\/title>/, "<title>Yves.DEV</title>") // nom de l'aperçu dans la galerie
  .replace(/<link rel="manifest"[^>]*>\s*/, "")
  .replace(/<script type="module" crossorigin src="[^"]+"><\/script>\s*/, "")
  .replace(/<link rel="stylesheet" crossorigin href="[^"]+">\s*/, "")
  .replace('href="/favicon.png"', `href="${uri(join(tmp, "favicon.png"))}"`)
  .replace('href="/apple-touch-icon.png"', `href="${uri(join(tmp, "apple-touch-icon.png"))}"`)
  // Données structurées : échappements JSON (les entités HTML ne sont pas décodées dans un <script>)
  .replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, a, b, c) => a + jsAscii(b) + c);
const body = index.match(/<body>([\s\S]*?)<\/body>/)[1]
  .replace(/<div id="root">[\s\S]*?<\/div><\/div>/, '<div id="root"></div>')
  .replace(/<script type="module" crossorigin src="[^"]+"><\/script>\s*/, "");

// Le texte HTML (titre, descriptions, noscript) passe en entités ; JS et CSS sont insérés après.
const fragment = htmlAscii(head.trim() + "\n" + body.trim())
  .replace("</title>", () => `</title>\n<style>${css}</style>`)
  .replace('<div id="root"></div>', () => `<div id="root"></div>\n<script type="module">${js}</script>`);

const page = standalone
  ? `<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n</head>\n<body>\n${fragment}\n</body>\n</html>\n`
  : fragment;
const left = fragment.match(/"\/img\/[^"]+"/g) || [];
const nonAscii = /[^\x00-\x7F]/.test(fragment);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, page);
rmSync(tmp, { recursive: true, force: true });
console.log(`${out} : ${Math.round(fragment.length / 1024)} Ko, références locales restantes : ${left.length}, ASCII pur : ${!nonAscii}`);
if (left.length || nonAscii) process.exit(1);
