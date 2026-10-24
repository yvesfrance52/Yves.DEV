import { createHash } from "node:crypto";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/*
  Sécurité au build :
  - CSP stricte en <meta>, avec le hash SHA-256 du seul script en ligne (#boot) :
    aucun 'unsafe-inline' pour les scripts, Trusted Types activés.
  - Les mêmes règles (plus frame-ancestors, HSTS…) sont envoyées en en-têtes HTTP
    par l'hébergeur : voir render.yaml et public/_headers.
  - VITE_SITE_URL (facultatif) : adresse publique, pour canonical / og:url / og:image.
*/
function cspPlugin(env) {
  return {
    name: "yd-security",
    apply: "build",
    transformIndexHtml(html) {
      const boot = html.match(/<script id="boot">([\s\S]*?)<\/script>/);
      if (!boot) throw new Error("Script #boot introuvable : la CSP ne peut pas être calculée.");
      const hash = createHash("sha256").update(boot[1]).digest("base64");
      const csp = [
        "default-src 'self'",
        `script-src 'self' 'sha256-${hash}'`,
        "style-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "manifest-src 'self'",
        "media-src 'none'",
        "object-src 'none'",
        "frame-src 'none'",
        "worker-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
        "upgrade-insecure-requests",
        "require-trusted-types-for 'script'",
        "trusted-types 'none'"
      ].join("; ");

      let out = env.VITE_NO_CSP === "1" ? html : html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`);
      const site = (env.VITE_SITE_URL || "").replace(/\/$/, "");
      const tags = site && /^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(site)
        ? [
            `<link rel="canonical" href="${site}/" />`,
            `<meta property="og:url" content="${site}/" />`,
            `<meta property="og:image" content="${site}/og-image.jpg" />`,
            `<meta property="og:image:width" content="1200" />`,
            `<meta property="og:image:height" content="630" />`,
            `<meta property="og:image:alt" content="Yves.DEV, développeur web junior : logo, photo et devise J'apprends, je crée, je développe." />`,
            `<meta name="twitter:image" content="${site}/og-image.jpg" />`
          ].join("\n    ")
        : "";
      return out.replace("<!--%SITE_URL_TAGS%-->", tags);
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [react(), cspPlugin(env)],
    build: {
      target: "es2022", sourcemap: false, assetsInlineLimit: 0,
      // Le site en ligne charge les pages secondaires à la demande ; la version « fichier unique »
      // (site-pret, aperçu) a besoin d'un seul script : on y regroupe tout.
      ...(env.VITE_ROUTER === "memory" ? { rollupOptions: { output: { inlineDynamicImports: true } } } : {})
    },
    server: { host: "127.0.0.1", port: 5173, open: true }, // ouvre le navigateur, rechargement à chaud
    preview: { host: "127.0.0.1", open: false },
    test: { environment: "node", include: ["tests/**/*.test.js"] }
  };
});
