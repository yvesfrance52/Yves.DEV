# Sécurité — Yves.DEV

Site statique, sans serveur applicatif, sans base de données, sans traceur. La surface d'attaque est donc réduite : les mesures ci-dessous protègent les visiteurs (XSS, clickjacking, pistage) et les coordonnées d'Yves (collecte par des robots).

## Mesures en place

| Domaine | Mesure | Où |
|---|---|---|
| Dépendances | Vite 8, React 19, React Router 7.18 — `npm audit` : **0 vulnérabilité** | `package.json` |
| Scripts | CSP stricte : `script-src 'self'` + **hash SHA-256** du seul script en ligne, calculé au build. Aucun `'unsafe-inline'`, aucun `eval` | `vite.config.js` |
| Injection DOM | **Trusted Types** imposés (`require-trusted-types-for 'script'`) : toute écriture HTML brute est refusée par le navigateur. Aucun `dangerouslySetInnerHTML` dans le code | CSP |
| Ressources tierces | Aucune : polices, images et scripts sont servis par le site (`default-src 'self'`) | CSP |
| Clickjacking | `frame-ancestors 'none'` + `X-Frame-Options: DENY` | `render.yaml`, `public/_headers` |
| Transport | HSTS 2 ans + `upgrade-insecure-requests` | idem |
| En-têtes | `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (caméra, micro, géolocalisation… désactivés), COOP / CORP `same-origin` | idem |
| Coordonnées | Encodées dans le bundle, décodées seulement après la **vérification anti-robot** (calcul aléatoire via `crypto.getRandomValues`, champ piège, délai minimal) | `src/data/contact.js`, `HumanCheck.jsx` |
| Formulaire | Aucun envoi vers un serveur. Saisies nettoyées (caractères de contrôle et bidirectionnels retirés, longueurs limitées), encodées dans les liens `wa.me` / `mailto:` (pas d'injection de paramètres), adresse et numéro validés, délai anti-répétition de 8 s | `src/lib/message.js` (+ tests) |
| Liens externes | `rel="noopener noreferrer"` ; lien TikTok sans paramètre de suivi | composants |
| Stockage | Accès protégé par `try/catch`, rien d'enregistré sans consentement, aucune donnée personnelle stockée | `src/lib/storage.js` |
| Vie privée | Pas d'analytics ni de publicité ; coordonnées du client floutées sur les captures | `public/img/projects/` |

## Vérifié

- Navigation complète dans Chromium avec la CSP et les Trusted Types actifs : aucune violation.
- `npm test` : nettoyage, encodage des liens, obfuscation, parité FR/EN, absence de coordonnées en clair dans les textes.

## Limites honnêtes

- La vérification anti-robot est locale : elle arrête les robots qui lisent le code sans l'exécuter, pas un attaquant déterminé qui pilote un vrai navigateur. Pour une protection plus forte, un service comme Cloudflare Turnstile peut être ajouté, mais il charge un script tiers et pose ses propres cookies (CSP et politique des cookies à mettre à jour).
- Les en-têtes `frame-ancestors`, HSTS, etc. ne sont actifs **qu'en ligne**, via l'hébergeur. Après le déploiement, contrôlez-les sur https://securityheaders.com ou https://observatory.mozilla.org.
