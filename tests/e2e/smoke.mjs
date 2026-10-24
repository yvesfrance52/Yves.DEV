#!/usr/bin/env node
/*
  Vérification de bout en bout dans un vrai navigateur (Chromium via Playwright).
  - lance `vite preview` sur le build (dist/) ;
  - parcourt les pages en jour/nuit, bureau/mobile : erreurs console, violations CSP/Trusted Types,
    débordement horizontal, contenu jamais révélé, accessibilité (axe-core, WCAG 2.2 AA) ;
  - teste les parcours clés (thème, langue, palette Ctrl+K, visionneuse, anti-robot, composeur, 404, cookies) ;
  - enregistre des captures dans .checks/ pour la revue visuelle.
  Usage : npm run build && npm run e2e      (code de sortie ≠ 0 en cas d'échec)
  Prérequis : le paquet `playwright` et Chromium (déjà présents dans l'environnement Claude ;
  ailleurs : npm i -D playwright && npx playwright install chromium).
*/
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { revealContacts } from "../../src/data/contact.js";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch {
  console.error("Playwright introuvable : npm i -D playwright && npx playwright install chromium");
  process.exit(2);
}
const AXE = require.resolve("axe-core/axe.min.js");
const PORT = 4183;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = ".checks";
mkdirSync(OUT, { recursive: true });

const results = [];
const check = (ok, label) => { results.push({ ok, label }); console.log(`${ok ? "OK " : "KO "} ${label}`); };

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { stdio: "ignore", shell: process.platform === "win32" });
const stop = () => { try { server.kill(); } catch { /* déjà arrêté */ } };
process.on("exit", stop);

async function waitServer() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(BASE)).ok) return; } catch { /* pas encore prêt */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error("Le serveur de prévisualisation ne répond pas (avez-vous lancé npm run build ?)");
}

async function scrollAll(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 350) {
    await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
    await page.waitForTimeout(90);
  }
  await page.waitForTimeout(500);
}

const PAGES = ["/", "/projets/mj-deco", "/projets/fabrice-pro-elec", "/confidentialite", "/cookies", "/parametres", "/page-inexistante"];
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };

await waitServer();
const browser = await chromium.launch();

// 1) Balayage : toutes les pages × thèmes × tailles
for (const theme of ["light", "dark"]) {
  for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport, colorScheme: theme, locale: "fr-FR" });
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.text()); });
    page.on("pageerror", (e) => errors.push(String(e)));
    for (const path of PAGES) {
      errors.length = 0;
      await page.goto(BASE + path);
      await page.waitForTimeout(600);
      await scrollAll(page);
      const tag = `${theme}/${vpName} ${path}`;
      check(errors.length === 0, `${tag} : aucune erreur console${errors.length ? " → " + errors[0].slice(0, 120) : ""}`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(overflow <= 0, `${tag} : pas de débordement horizontal (${overflow}px)`);
      const hidden = await page.evaluate(() => document.querySelectorAll("[data-reveal]:not(.is-in)").length);
      check(hidden === 0, `${tag} : tout le contenu est révélé (${hidden} restant)`);
      if (path === "/") await page.screenshot({ path: `${OUT}/home-${theme}-${vpName}.png`, fullPage: true });
    }
    await ctx.close();

    // axe-core : CSP contournée uniquement pour injecter l'outil d'audit
    const actx = await browser.newContext({ viewport, colorScheme: theme, locale: "fr-FR", bypassCSP: true, reducedMotion: "reduce" });
    const apage = await actx.newPage();
    for (const path of PAGES) {
      await apage.goto(BASE + path);
      await apage.waitForTimeout(500);
      await apage.addScriptTag({ path: AXE });
      const violations = await apage.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] } });
        return r.violations.map((v) => `${v.id} (${v.nodes.length})`);
      });
      check(violations.length === 0, `axe ${theme}/${vpName} ${path}${violations.length ? " → " + violations.join(", ") : ""}`);
    }
    await actx.close();
  }
}

// 2) Parcours clés
{
  const ctx = await browser.newContext({ viewport: VIEWPORTS.desktop, colorScheme: "light", locale: "fr-FR" });
  const page = await ctx.newPage();
  const csp = [];
  page.on("console", (m) => { if (/Content Security|Trusted/i.test(m.text())) csp.push(m.text()); });
  await page.goto(BASE + "/");
  await page.waitForTimeout(1200);
  check(await page.evaluate(() => document.documentElement.lang) === "fr", "langue du navigateur détectée (fr)");
  check(await page.locator('meta[http-equiv="Content-Security-Policy"]').count() === 1, "CSP présente dans le HTML");

  await page.getByRole("button", { name: "Refuser" }).click();
  check(await page.evaluate(() => localStorage.getItem("yd-consent")) === "essential", "cookies : refus enregistré");

  await page.getByRole("button", { name: "Passer en mode nuit" }).first().click();
  await page.waitForTimeout(800);
  check(await page.evaluate(() => document.documentElement.dataset.theme) === "dark", "bascule jour → nuit");
  check(await page.evaluate(() => localStorage.getItem("yd-theme")) === null, "thème non mémorisé sans consentement");

  await page.getByRole("button", { name: "Read in English" }).first().click();
  check(await page.evaluate(() => document.documentElement.lang) === "en", "bascule FR → EN");
  await page.getByRole("button", { name: "Lire en français" }).first().click();

  await page.locator(".site-header").getByRole("link", { name: "Paramètres" }).click();
  await page.waitForTimeout(600);
  check(page.url().endsWith("/parametres"), "en-tête : icône Paramètres → page Paramètres");
  await page.goto(BASE + "/");
  await page.waitForTimeout(800);

  await page.keyboard.press("Control+k");
  check(await page.getByRole("dialog", { name: "Palette de commandes" }).count() === 1, "palette Ctrl+K");
  await page.keyboard.type("fabr");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(900);
  check(page.url().endsWith("/projets/fabrice-pro-elec"), "palette → étude de cas");

  const caseText = await page.locator("main").innerText();
  check(!/À compléter|En construction|à ajouter/i.test(caseText), "étude de cas : aucune mention provisoire visible");

  await page.locator(".shot").first().click();
  check(await page.locator(".lightbox").count() === 1, "visionneuse ouverte");
  await page.keyboard.press("ArrowRight");
  check((await page.locator(".lightbox-count").innerText()).includes("2 sur 2"), "visionneuse : flèche droite");
  await page.keyboard.press("Escape");
  check(await page.locator(".lightbox").count() === 0, "visionneuse : Échap");

  await page.goto(BASE + "/#contact");
  await page.waitForTimeout(1500);
  const c = revealContacts();
  const before = await page.content();
  check(!before.includes(c.email) && !before.includes(c.whatsapp), "coordonnées absentes du DOM avant vérification");
  const q = await page.locator(".gate-q").innerText();
  const [a, b] = q.match(/\d+/g).map(Number);
  await page.locator(".gate .field").fill(String(a + b));
  await page.waitForTimeout(1300);
  await page.locator(".gate button[type=submit]").click();
  await page.waitForTimeout(400);
  const hrefs = await page.$$eval(".contact-row", (els) => els.map((e) => e.href));
  check(hrefs[0] === `https://wa.me/${c.whatsapp}` && hrefs[1] === `mailto:${c.email}` && hrefs[2] === c.tiktok.url, "coordonnées révélées et liens corrects");

  const opened = [];
  ctx.on("request", (r) => { if (r.url().includes("wa.me")) opened.push(r.url()); });
  await page.getByLabel("Votre nom").fill("Awa");
  await page.getByLabel("Votre message").fill("Bonjour, je veux un site.");
  await page.getByRole("button", { name: "Ouvrir dans WhatsApp" }).click();
  await page.waitForTimeout(1200);
  check(opened.some((u) => u.startsWith(`https://wa.me/${c.whatsapp}?text=`)), "composeur : lien WhatsApp prérempli");
  check(await page.getByRole("button", { name: "Ouvrir dans WhatsApp" }).isDisabled(), "composeur : anti-répétition");
  for (const extra of ctx.pages().slice(1)) await extra.close();

  // En-tête masqué au défilement : il revient dès qu'on y arrive au clavier
  await page.goto(BASE + "/");
  await page.waitForTimeout(600);
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: "instant" }));
  await page.mouse.wheel(0, 400);
  await page.waitForTimeout(700);
  const wasHidden = await page.locator(".site-header.is-hidden").count();
  await page.locator(".site-header a.brand").focus();
  await page.waitForTimeout(500);
  const top = await page.locator(".site-header").evaluate((h) => h.getBoundingClientRect().top);
  check(wasHidden === 1 && top >= 0, `en-tête : réapparaît au focus clavier (masqué=${wasHidden}, top=${Math.round(top)})`);

  await page.goto(BASE + "/n-existe-pas");
  await page.waitForTimeout(600);
  check(await page.getByText("Cette page n'est pas encore construite.").count() === 1, "page 404");
  check(csp.length === 0, `aucune violation CSP / Trusted Types${csp.length ? " → " + csp[0] : ""}`);
  await ctx.close();
}

// 3) Animations : rubans et captures défilent ; un appareil « réduire les animations » peut être contourné dans Paramètres
{
  const ribbonShift = async (page) => {
    await page.evaluate(() => document.querySelector(".ribbons").scrollIntoView({ block: "center", behavior: "instant" }));
    await page.waitForTimeout(400);
    const a = await page.evaluate(() => document.querySelector(".ribbon-track").style.transform);
    await page.waitForTimeout(1200);
    const b = await page.evaluate(() => document.querySelector(".ribbon-track").style.transform);
    return a !== b && b !== "";
  };
  const stripRunning = (page) => page.evaluate(() => getComputedStyle(document.querySelector(".strip-track")).animationDuration !== "1e-05s"
    && parseFloat(getComputedStyle(document.querySelector(".strip-track")).animationDuration) > 1);

  const normal = await browser.newPage({ viewport: VIEWPORTS.desktop, locale: "fr-FR", reducedMotion: "no-preference" });
  await normal.goto(BASE + "/"); await normal.waitForTimeout(800);
  check(await ribbonShift(normal), "rubans : défilent seuls");
  check(await stripRunning(normal), "captures : défilent seules");
  await normal.close();

  const reduced = await browser.newPage({ viewport: VIEWPORTS.desktop, locale: "fr-FR", reducedMotion: "reduce" });
  await reduced.goto(BASE + "/"); await reduced.waitForTimeout(800);
  check(!(await ribbonShift(reduced)), "appareil « réduire les animations » : rubans immobiles par défaut");
  await reduced.goto(BASE + "/parametres"); await reduced.waitForTimeout(500);
  await reduced.getByRole("button", { name: "Activées", exact: true }).click();
  await reduced.waitForTimeout(300);
  check(await reduced.evaluate(() => document.documentElement.dataset.motion) === "full", "Paramètres → Animations activées");
  await reduced.getByRole("link", { name: "Retour au portfolio" }).click();
  await reduced.waitForTimeout(900);
  check(await ribbonShift(reduced), "animations forcées : rubans défilent malgré l'appareil");
  check(await stripRunning(reduced), "animations forcées : captures défilent malgré l'appareil");
  await reduced.close();
}

await browser.close();
stop();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} vérifications réussies. Captures : ${OUT}/`);
process.exit(failed.length ? 1 : 0);
