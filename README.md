# Yves.DEV — Portfolio v2

Portfolio de **Tahou Laizao Jean Yves Helory (Yves.DEV)**, développeur web junior.
Direction **Neo-Brutalism** : wireframe 3D qui s'assemble, typographie cinétique, traits épais et ombres dures. Voir `DESIGN.md`.

## Voir le site tout de suite (sans rien installer)

Ouvrez **`site-pret/index.html`** : double-clic, ou dans VS Code clic droit → *Open with Live Server* (ou le bouton **Go Live**, réglé pour ouvrir ce dossier). C'est le site complet dans un seul fichier.

> Décompressez d'abord l'archive (clic droit → *Extraire tout*), puis dans VS Code faites *Fichier → Ouvrir le dossier…* sur `yves-dev`. « Open with Live Server » n'apparaît que si l'extension **Live Server** (Ritwick Dey) est installée : VS Code la propose automatiquement à l'ouverture du dossier.

`index.html` (à la racine) ne fonctionne **ni par double-clic ni avec Live Server** : le site est écrit en React (`.jsx`), que le navigateur ne sait pas lire tel quel. C'est Vite qui le transforme, d'où `npm run dev`.

## Travailler dans VS Code (remplace Live Server)

1. Installez **Node.js LTS** depuis https://nodejs.org (une seule fois), puis redémarrez VS Code.
2. *Fichier → Ouvrir le dossier…* → choisissez le dossier `yves-dev` (celui qui contient `package.json`).
3. *Terminal → Exécuter la tâche…* → **Lancer le site** (ou, dans le terminal : `npm install` puis `npm run dev`).
4. Le navigateur s'ouvre tout seul sur http://127.0.0.1:5173 et se met à jour à chaque enregistrement, comme avec Live Server (et même sans recharger la page).

Si le terminal affiche « npm n'est pas reconnu », Node.js n'est pas installé ou VS Code n'a pas été redémarré.
Après une modification, `npm run local` régénère `site-pret/index.html`.

## Lancer le projet

```bash
npm install
npm run dev       # http://127.0.0.1:5173
npm test          # tests unitaires (Vitest)
npm run build     # production → dist/
npm run check     # tests + build (utilisé par Render)
npm run preview   # tester le build
npm run e2e       # après un build : 137 vérifications dans Chromium (erreurs, CSP, débordements, axe-core, parcours) + captures dans .checks/
npm run verify    # tests + build + e2e, en une commande
npm run preview:single   # aperçu pour un Artifact claude.ai → preview/yves-dev-apercu.html
npm run local            # site à ouvrir par double-clic ou Live Server → site-pret/index.html
```

`npm run e2e` utilise Playwright (`npm i -D playwright && npx playwright install chromium` hors de l'environnement Claude).

Node 20.19 ou plus récent (`.node-version` : 22).

## Fonctionnalités

| | |
|---|---|
| **Wireframe 3D** | Page web en fil de fer, éclatée en 5 couches, qui s'assemble au défilement et suit la souris. Moteur de projection maison sur `<canvas>`, sans bibliothèque. Se met en pause hors écran. |
| **Typographie cinétique** | Police variable *Anybody* : lettres qui s'étirent à l'arrivée et sous le pointeur ; « DEV » dessiné au trait se remplit pendant l'assemblage ; devise trait → plein → bloc ; rubans dont la largeur des lettres suit la vitesse de défilement. |
| **Travaux** | Captures qui défilent seules (pause au survol, au focus ou par bouton), filtres par secteur, visionneuse (flèches, Échap). |
| **Études de cas** | `/projets/mj-deco`, `/projets/fabrice-pro-elec` : fiche projet, captures, liste de ce que montre le site. Seules les informations renseignées s'affichent. |
| **Compétences** | Clavier interactif : chaque touche affiche la description sur un écran (effet machine à écrire). |
| **Contact** | Vérification anti-robot locale, coordonnées révélées ensuite, copie de l'e-mail, **composeur de message** qui ouvre WhatsApp ou la messagerie avec un texte prérempli. |
| **Palette de commandes** | `Ctrl K` / `⌘ K` : navigation, projets, thème, langue, cookies. |
| **Jour / nuit** | Suit le système par défaut ; transition en cercle depuis le bouton (View Transitions API). |
| **FR / EN** | Tout le site, langue du navigateur détectée au premier passage. |
| **Cookies** | Bannière Accepter / Refuser / Personnaliser ; préférences mémorisées seulement après accord. |
| **Accessibilité** | Lien d'évitement, focus visible, pièges de focus, `aria-live`, `prefers-reduced-motion`, 0 violation axe-core (WCAG 2.2 AA). |
| **Divers** | Page 404 (le wireframe reste éclaté), page Paramètres, titre et description par page, données structurées `Person`, manifeste web. |

## Structure

```
src/
  main.jsx              point d'entrée (routeur, polices, styles)
  App.jsx               routes, en-tête, pied de page, bannière, palette
  content/fr.js en.js   TOUS les textes (mêmes clés, vérifié par les tests)
  data/                 projets (images), clavier de compétences, contacts encodés
  context/Prefs.jsx     langue, thème, consentement, palette
  lib/                  stockage sûr, messages, obfuscation, mouvement
  hooks/                apparition, progression de défilement, piège de focus…
  components/           WireframeCanvas, KineticWord, Strip, Lightbox, CommandMenu…
  sections/             Hero, Ribbon, Work, Motto, About, Skills, Contact
  pages/                Home, ProjectPage, LegalPage, SettingsPage, NotFound
  styles/               tokens.css (couleurs), base, components, sections, pages
tests/                  i18n.test.js, message.test.js, e2e/smoke.mjs (navigateur)
scripts/                encode-contact.mjs, build-preview.mjs
public/img/             logo détouré, photo, captures (760 et 1400 px)
```

## Modifier le contenu

- **Textes** : `src/content/fr.js` **et** `src/content/en.js` (même clé des deux côtés, sinon `npm test` échoue).
- **Fiche d'une étude de cas** (rôle, technologies, résultats) : ajoutez `details: { role, stack, results }` au projet dans `src/content/fr.js` **et** `en.js` ; l'adresse du site va dans `url` (`src/data/projects.js`, en https). Tant qu'une ligne est vide, elle n'apparaît pas.
- **Ajouter un projet** : une entrée dans `src/data/projects.js` (images dans `public/img/`), ses textes dans `projects.items` (FR et EN).
- **Compétences** : `src/data/skills.js` + descriptions dans `skills.items`.
- **Coordonnées** : `node scripts/encode-contact.mjs "nouvelle valeur"` puis collez le résultat dans `src/data/contact.js`.
- **Couleurs** : `src/styles/tokens.css` (thèmes jour et nuit).

## Mise en ligne (Netlify, le plus simple)

1. Créez un fichier `.env` à la racine avec `VITE_SITE_URL=https://votre-site.netlify.app` (dès que vous connaissez l'adresse ; sans lui, le site marche mais les aperçus de lien WhatsApp/TikTok n'ont pas d'image).
2. `npm run build`, puis glissez le dossier **`dist`** sur https://app.netlify.com/drop.
3. `public/_redirects` et `public/_headers` gèrent déjà les routes et les en-têtes de sécurité. L'image de partage est `public/og-image.jpg`.

## Mise en ligne (Render)

1. Créez un dépôt GitHub et envoyez-y ce dossier (sans `node_modules` ni `dist`).
2. Sur [render.com](https://render.com) : **New → Blueprint** et choisissez le dépôt : `render.yaml` configure tout (build, dossier `dist`, réécriture des routes, en-têtes de sécurité).
   À défaut, créez un **Static Site** : build `npm ci && npm run check`, dossier `dist`, règle de réécriture `/*` → `/index.html`.
3. Une fois l'adresse connue, ajoutez la variable `VITE_SITE_URL` (ex. `https://yves-dev.onrender.com`) pour les balises de partage, et complétez `public/robots.txt`.

Netlify et Cloudflare Pages fonctionnent aussi (`public/_headers` contient les en-têtes).
