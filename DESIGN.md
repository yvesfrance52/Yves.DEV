# Direction artistique — Yves.DEV v2

## L'idée

> **Chaque site commence par un wireframe.**

Un wireframe, c'est le squelette d'une page avant le design et le code. C'est le premier geste du métier d'Yves, et c'est ce que ce portfolio met en scène : la page passe du **trait** (wireframe) au **plein** (construit), comme sa devise passe de *j'apprends* à *je crée* puis à *je développe*.

- Dans l'accueil, une page web en **wireframe 3D** éclatée en couches s'assemble quand on fait défiler et suit le pointeur. En même temps, le mot **DEV**, dessiné au trait, se remplit de bleu.
- La devise est en **typographie cinétique** : *J'apprends* reste au trait, *Je crée* se remplit, *Je développe* devient un bloc bleu. La police s'étire (axe de largeur variable) à chaque étape.
- Le **Neo-Brutalism** est le langage du chantier : traits épais, ombres dures décalées, aplats francs, autocollants, ruban « en construction » sur les informations encore manquantes.

## Palette (tirée du logo et des couleurs demandées)

| Rôle | Jour | Nuit |
|------|------|------|
| Fond (papier) | `#F4F6FB` papier bleuté | `#0B1236` outremer nuit |
| Surface | `#FFFFFF` | `#141E52` |
| Encre | `#000000` noir pur | `#FFFFFF` |
| Bleu cobalt (logo) | `#2041FF` | `#2041FF` (aplats), `#9DB0FF` (texte) |
| Or | `#FFC21A` | `#FFC21A` |
| Ciel (plan, blueprint) | `#BFD0FF` | `#1B2A78` |
| Ombre dure | `#000000` | `#FFC21A` |

Choix volontaires : un papier **froid** plutôt que crème, un **outremer** plutôt qu'un quasi-noir en mode nuit, et l'or réservé aux ombres, autocollants et états actifs.

## Typographie

- **Anybody** (variable : graisse 100–900, largeur 50–150 %) pour les titres et toute la typographie cinétique. Sa largeur variable permet d'étirer les lettres en direct (pointeur, défilement, survol).
- **Instrument Sans** pour le texte courant : sobre et lisible, elle laisse Anybody s'exprimer.
- Les deux sont auto-hébergées.

Échelle : texte 17–19 px · chapeau 22–26 px · intertitre 32–40 px · titre de section 56–110 px · nom d'accueil 15–19 vw.

## Composition

```
ACCUEIL (bureau)
┌──────────────────────────────────────────────────────────────┐
│ [YD Yves.DEV]   Travaux  À propos  Compétences  Contact  ⌘K ☀ EN │  barre flottante, trait 3 px
├──────────────────────────────┬───────────────────────────────┤
│ YVES.                        │ ┌ plan bleu ciel ─────────────┐│
│ (lettres qui s'étirent       │ │  wireframe 3D d'une page    ││
│  sous le pointeur)           │ │  éclatée en 5 couches       ││
│ DEV  ← trait → se remplit    │ │  qui s'assemblent au scroll ││
│                              │ └─────────────────────────────┘│
│ [autocollant] phrase         [Voir mes projets]  ombre or    │
└──────────────────────────────────────────────────────────────┘
╲╲ ruban bleu incliné : J'APPRENDS ★ JE CRÉE ★ JE DÉVELOPPE ╲╲

TRAVAUX (asymétrique, jamais deux blocs identiques)
┌ fenêtre navigateur, col. 1–8 ───────┐
│ ▢▢▢  adresse à ajouter              │
│ ⇠ captures qui défilent seules ⇠    │      ┌ fiche, col. 8–12, chevauche ┐
└─────────────────────────────────────┘      │ MJ Deco  [Décoration]        │
                                             └──────────────────────────────┘
          ┌ fiche, col. 1–5 ┐  ┌ fenêtre, col. 5–12, défile dans l'autre sens ┐
```

- Alignement à gauche partout, sauf la fiche du projet 2, en miroir.
- Aucune grille de cartes identiques : chaque projet a sa largeur, son sens de défilement et son angle.
- Les compétences sont un **clavier** dont on presse les touches, et un écran affiche la description.
- Le contact est un **grand aplat bleu** : vérification anti-robot, puis coordonnées et composeur de message.

## Principes

1. Une seule chose spectaculaire par écran (le wireframe à l'accueil, le ruban, la devise).
2. Le mouvement raconte la construction (trait → plein) ou répond à un geste. Aucune animation décorative au hasard.
3. Les bordures, ombres et autocollants portent une information (état, catégorie, élément cliquable, contenu manquant).
4. `prefers-reduced-motion` : tout reste lisible et immobile.
