# Audit du code existant — Yves.DEV

Périmètre : le modèle fourni par le Skill `yves-dev-portfolio` (`assets/portfolio-template/`) et la version 1 livrée ensuite (même base, modifiée).
Méthode : lecture du code, `npm audit`, calcul des contrastes WCAG, tests dans Chromium (Playwright) et axe-core.

Chaque point indique **ce qui posait problème**, **pourquoi c'est important** et **ce qui a été fait dans la version 2**.

## 1. Sécurité

| # | Constat | Risque | Solution v2 |
|---|---------|--------|-------------|
| S1 | `npm audit` : 4 vulnérabilités (1 haute, 3 modérées) — `vite ≤ 6.4.3` / `esbuild ≤ 0.24.2` (le serveur de dev répond à n'importe quel site) et `react-router ≤ 7.17` (redirection ouverte via `\` dans `<Link>`/`useNavigate`, GHSA-wrjc-x8rr-h8h6). | Exploitation en développement ; redirection ouverte côté client. | Passage à **Vite 8**, **React 19**, **React Router 7.18**. `npm audit` : 0 vulnérabilité. `engines.node >= 20.19` et `.node-version` pour Render. |
| S2 | E-mail et numéro écrits en clair dans le HTML/JS (cartes contact et pages légales). | Collecte automatique par des robots → spam, hameçonnage. | Coordonnées **encodées** dans le bundle (`src/data/contact.js`), décodées seulement après la **vérification anti-robot**. Les pages légales renvoient vers la section Contact au lieu d'afficher l'adresse. |
| S3 | Aucune politique de sécurité du contenu (CSP) ni en-tête HTTP. | XSS, clickjacking, MIME sniffing, fuite du référent. | CSP stricte injectée au build avec **hash SHA-256** du seul script en ligne (pas de `'unsafe-inline'` pour les scripts), **Trusted Types**, `frame-ancestors 'none'`, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP — dans `render.yaml` et `public/_headers`. |
| S4 | Lien TikTok avec paramètres de suivi (`?_r=1&_t=…`). | Traçage inutile des visiteurs. | Lien nettoyé : `https://www.tiktok.com/@yvestm0`. |
| S5 | `localStorage` utilisé sans `try/catch`. | Page blanche en navigation privée stricte ou si le stockage est bloqué. | Module `src/lib/storage.js` sûr ; le thème et la langue ne sont enregistrés **qu'après consentement**. |
| S6 | Liens externes en `rel="noreferrer"` seulement. | — (acceptable) | Uniformisé en `rel="noopener noreferrer"`. |
| S7 | Pas de bannière de consentement alors que des préférences sont stockées. | Non-conformité aux règles cookies. | Bannière Accepter / Refuser / Personnaliser, modifiable à tout moment, politique des cookies à jour. |
| S8 | Aucune dépendance tierce chargée au runtime, mais polices système non maîtrisées. | — | Polices **auto-hébergées** (Fontsource), aucune requête vers Google ni CDN. |

## 2. Accessibilité

| # | Constat | Solution v2 |
|---|---------|-------------|
| A1 | Textes secondaires `#60708a` / `#5e708e` sur `#050912` : contraste **3,97:1** (< 4,5:1 requis). | Palette recalculée : tous les textes ≥ 4,5:1 dans les deux thèmes (vérifié par axe-core). |
| A2 | Le contenu `[data-reveal]` restait invisible si le JavaScript échouait. | Masquage seulement quand la classe `js` est posée ; `prefers-reduced-motion` affiche tout. |
| A3 | Boutons de compétences sans action (des `<button>` qui ne font rien). | Les compétences deviennent un **clavier** : chaque touche affiche réellement sa description (région `aria-live`). |
| A4 | Menu mobile sans gestion du focus ni fermeture par Échap. | Piège de focus, Échap, retour du focus au bouton d'origine (`useFocusTrap`). Idem pour la visionneuse et la palette de commandes. |
| A5 | `aria-label="Toggle language"` en anglais sur une page française. | Libellés traduits dans les deux langues. |
| A6 | Pas de lien d'évitement. | « Aller au contenu » en premier élément focusable. |

## 3. Structure et code

| # | Constat | Solution v2 |
|---|---------|-------------|
| C1 | Tout dans un seul `main.jsx` de 330 lignes (contenu, composants, pages, logique). | Arborescence par responsabilité : `content/`, `data/`, `lib/`, `hooks/`, `context/`, `components/`, `sections/`, `pages/`, `styles/`. |
| C2 | Règle « FR et EN avec les mêmes clés » vérifiée à la main. | **Test automatique** `tests/i18n.test.js` : échoue si une clé manque d'un côté. |
| C3 | `<Route path="*">` déclarée en premier et renvoyant l'accueil : aucune page 404, URL fausses servies comme valides. | Vraie page 404, routes projet `/projets/:slug`. |
| C4 | Imports inutilisés (`useMemo`, `useNavigate`), liens `/home` dupliquant `/`. | Nettoyé. |
| C5 | Variable CSS `--white` qui vaut du noir en thème clair. | Jetons nommés par rôle (`--paper`, `--ink`, `--line`, `--shadow`…). |
| C6 | Couleurs codées en dur dans les règles CSS. | Toutes les couleurs passent par les jetons de `styles/tokens.css`. |
| C7 | Pas de test ni de script de vérification. | `npm test` (Vitest) et `npm run check` (tests + build). |

## 4. Contenu

| # | Constat | Solution v2 |
|---|---------|-------------|
| K1 | Statistiques inventées (« 60fps », « ∞ idées ») et projets fictifs (« Dashboard React »). | Supprimés. Seuls les deux vrais projets (MJ Deco, Fabrice Pro Elec) sont montrés. |
| K2 | JavaScript absent de la liste des compétences. | Liste exacte fournie : HTML, CSS, JavaScript, React, PHP, Python, Java, C, C++, Render. |
| K3 | Informations manquantes présentées comme acquises. | Toutes les zones non fournies (rôle, technologies, adresse des sites, résultats) sont signalées « À compléter ». |
| K4 | Coordonnées du client visibles sur une capture (e-mail et téléphone de Fabrice Pro Elec). | Zones floutées avant publication. |
