// Textes français. Toute clé ajoutée ici doit exister dans en.js (vérifié par tests/i18n.test.js).
export default {
  meta: {
    lang: "fr",
    siteName: "Yves.DEV",
    homeTitle: "Yves.DEV — Développeur web junior",
    description: "Portfolio de Tahou Laizao Jean Yves Helory (Yves.DEV), développeur web junior : sites pour MJ Deco et Fabrice Pro Elec, compétences et contact.",
    notFoundTitle: "Page introuvable — Yves.DEV"
  },
  a11y: {
    skip: "Aller au contenu",
    mainNav: "Navigation principale",
    home: "Yves.DEV, accueil",
    newTab: "(nouvel onglet)"
  },
  nav: { work: "Travaux", about: "À propos", skills: "Compétences", contact: "Contact" },
  header: {
    menu: "Menu",
    closeMenu: "Fermer",
    toLight: "Passer en mode jour",
    toDark: "Passer en mode nuit",
    switchLang: "Read in English",
    switchLangShort: "EN",
    settings: "Paramètres"
  },
  hero: {
    sticker: "Développeur junior",
    lead: "Je transforme des idées en sites web concrets, de la première esquisse à la mise en ligne.",
    cta: "Voir mes projets",
    wireframeLabel: "Wireframe 3D d'une page web qui s'assemble au défilement"
  },
  ribbon: ["J'apprends", "Je crée", "Je développe"],
  work: {
    title: "Travaux",
    intro: "Deux sites conçus pour des entreprises en Côte d'Ivoire. Les captures défilent seules : survolez-les pour les arrêter, cliquez pour les agrandir.",
    filters: { all: "Tout", deco: "Décoration", elec: "Électricité" },
    filterLabel: "Filtrer les projets",
    openCase: "Lire l'étude de cas",
    pause: "Mettre en pause",
    play: "Reprendre",
    stripLabel: "Captures du site {name}",
    zoom: "Agrandir",
    count: { one: "{n} projet", other: "{n} projets" }
  },
  projects: {
    // Pour afficher « Mon rôle », « Technologies » et « Résultats » sur une étude de cas, ajoutez à un projet
    // (ici ET dans en.js) :  details: { role: "...", stack: "...", results: "..." }
    // L'adresse du site se met dans src/data/projects.js (champ url). Une ligne vide n'est jamais affichée.
    items: {
      "mj-deco": {
        name: "MJ Deco",
        sector: "Décoration d'intérieur",
        place: "Abidjan, Côte d'Ivoire",
        type: "Site vitrine avec boutique",
        summary: "MJ Deco conçoit des espaces sur mesure et suit chaque projet de A à Z. Le site présente ses services, sa méthode, ses réalisations et une boutique d'accessoires.",
        shows: [
          "Un parcours complet : services, boutique, méthode, réalisations, à propos",
          "Une boutique avec panier et choix du coloris (embrasses de rideaux, 3 500 FCFA)",
          "Des appels à l'action clairs : Réserver, Demander un devis, Configurer mon projet",
          "Un espace client, une version FR/EN et une bascule jour/nuit",
          "Une identité élégante : typographie à empattements, prune et crème"
        ],
        stripAlts: [
          "Page d'accueil de MJ Deco : « Des espaces qui vous ressemblent »",
          "Titre de la page d'accueil MJ Deco sur fond de salon",
          "Fiche produit de la boutique : embrasses de rideaux",
          "Détail d'un salon avec étagères éclairées, page d'accueil MJ Deco",
          "Boutique MJ Deco : « Les petites touches qui changent tout »",
          "Bloc « Quelque chose en tête ? » de la boutique"
        ],
        shotAlts: {
          home: "Page d'accueil complète du site MJ Deco",
          second: "Page boutique complète du site MJ Deco"
        }
      },
      "fabrice-pro-elec": {
        name: "Fabrice Pro Elec",
        sector: "Électricité",
        place: "Côte d'Ivoire",
        type: "Site vitrine",
        summary: "Fabrice Pro Elec se présente comme un partenaire électrique de confiance. Le site met en avant le fondateur, une accroche forte et un contact immédiat.",
        shows: [
          "Une accroche mémorable : « L'énergie en toute confiance. »",
          "Une navigation simple et un bouton « Parlons de votre projet »",
          "Une version FR/EN avec bascule de thème",
          "Une section contact : WhatsApp et e-mail en un clic",
          "Des pages Confidentialité, Conditions et Cookies"
        ],
        stripAlts: [
          "Page d'accueil de Fabrice Pro Elec avec le portrait du fondateur",
          "Titre « L'énergie en toute confiance »",
          "Portrait du fondateur, Blé Nda Fabrice, sur la page d'accueil",
          "Section contact (coordonnées du client floutées)",
          "Appel à écrire sur WhatsApp (coordonnées floutées)"
        ],
        shotAlts: {
          home: "Page d'accueil complète du site Fabrice Pro Elec",
          second: "Section contact du site Fabrice Pro Elec, coordonnées du client floutées"
        }
      }
    }
  },
  caseStudy: {
    back: "Tous les travaux",
    specTitle: "Fiche du projet",
    spec: { client: "Client", sector: "Secteur", place: "Lieu", type: "Type", role: "Mon rôle", stack: "Technologies", url: "Adresse", results: "Résultats" },
    showsTitle: "Ce que montre le site",
    summaryTitle: "Le projet",
    next: "Projet suivant",
    zoom: "Agrandir la capture"
  },
  motto: {
    title: "Ma devise",
    lines: ["J'apprends.", "Je crée.", "Je développe."],
    notes: [
      "Chaque jour, une technologie, une erreur ou une idée de plus.",
      "Chercher une idée originale et la solution adaptée.",
      "Donner vie au projet, jusqu'à la mise en ligne."
    ],
    portraitAlt: "Portrait d'Yves, lunettes et t-shirt blanc, jouant du clavier devant un mur rouge et blanc",
    portraitCaption: "Tahou Laizao Jean Yves Helory"
  },
  about: {
    title: "À propos",
    // Segments : p = texte, n = nom, g = surligné or, b = surligné bleu, cta = lien vers le contact
    text: [
      ["p", "Je suis "], ["n", "Tahou Laizao Jean Yves Helory"], ["p", ", connu sous le nom de "], ["n", "Yves.DEV"],
      ["p", " dans mon univers numérique. Développeur junior, je suis animé par la "], ["g", "curiosité"],
      ["p", ", la créativité et l'envie de transformer des idées en solutions concrètes. Je m'intéresse au "], ["b", "développement web"],
      ["p", ", à la conception d'"], ["g", "interfaces modernes"],
      ["p", " et à des expériences numériques utiles, intuitives et esthétiques. Pour moi, développer ne consiste pas seulement à écrire du code : c'est comprendre un besoin, imaginer une solution et donner vie à un projet. J'apprends chaque jour, j'expérimente de nouvelles approches et je progresse à travers des "], ["g", "projets concrets"],
      ["p", ". Mon ambition : continuer à évoluer, collaborer avec des personnes inspirantes et participer à des projets qui ont du sens. "],
      ["cta", "Parlons de votre projet."]
    ],
    visionTitle: "Ma vision",
    vision: "Créer des expériences digitales qui allient fonctionnalité, simplicité et créativité.",
    traitsTitle: "Ce qui me définit",
    traits: [
      ["Curiosité", "Toujours prêt à apprendre et à explorer de nouvelles technologies."],
      ["Créativité", "Chercher des idées originales et des solutions adaptées."],
      ["Persévérance", "Apprendre de mes erreurs et progresser à chaque projet."],
      ["Passion", "Concevoir, expérimenter et donner vie à mes idées."]
    ]
  },
  skills: {
    title: "Compétences",
    intro: "Les langages et outils que je maîtrise. Appuyez sur une touche pour la découvrir.",
    keyboardLabel: "Clavier des compétences",
    screenIdle: "Appuyez sur une touche",
    groups: { web: "Web", lang: "Langage", deploy: "Mise en ligne" },
    items: {
      html: "La structure de chaque page : titres, textes, images, formulaires.",
      css: "La mise en forme : couleurs, typographie, mise en page, animations, adaptation mobile.",
      javascript: "L'interactivité dans le navigateur : menus, filtres, animations, logique d'interface.",
      react: "Des interfaces construites en composants réutilisables. Ce portfolio est fait avec React.",
      php: "La logique côté serveur : formulaires, pages dynamiques, échanges avec une base de données.",
      python: "Des scripts et de la logique : automatiser, traiter des données, prototyper.",
      java: "Des applications structurées, orientées objet.",
      c: "La programmation proche de la machine : mémoire, pointeurs, rigueur.",
      cpp: "La programmation orientée objet et performante.",
      render: "L'hébergement et la mise en ligne de sites et d'applications."
    }
  },
  contact: {
    title: "Un projet en tête\u00A0?",
    intro: "Une idée, un site, une collaboration : écrivez-moi directement.",
    gate: {
      title: "Vérification anti-robot",
      text: "Pour protéger mes coordonnées des robots, résolvez ce petit calcul. Rien n'est envoyé à un service extérieur.",
      question: "Combien font {a} + {b} ?",
      placeholder: "Votre réponse",
      submit: "Afficher mes coordonnées",
      wrong: "Ce n'est pas le bon résultat. Voici un nouveau calcul.",
      tooFast: "Prenez une seconde, puis validez à nouveau."
    },
    rows: { whatsapp: "WhatsApp", email: "E-mail", tiktok: "TikTok" },
    copy: "Copier",
    copied: "Copié",
    copyFailed: "Copie impossible : sélectionnez l'adresse à la main.",
    composer: {
      title: "Préparer un message",
      text: "Le message s'ouvre dans WhatsApp ou dans votre messagerie : vous le relisez avant de l'envoyer. Rien n'est enregistré sur ce site.",
      name: "Votre nom",
      type: "Type de projet",
      types: ["Site vitrine", "Boutique en ligne", "Application web", "Autre"],
      message: "Votre message",
      counter: "{n} / {max}",
      sendWhatsapp: "Ouvrir dans WhatsApp",
      sendEmail: "Ouvrir dans ma messagerie",
      empty: "Écrivez au moins quelques mots avant d'envoyer.",
      cooldown: "Message préparé. Vous pourrez en préparer un autre dans quelques secondes.",
      greeting: "Bonjour Yves,",
      intro: "je m'appelle {name}.",
      projectLine: "Projet : {type}.",
      subject: "Projet — depuis votre portfolio"
    }
  },
  commands: {
    title: "Palette de commandes",
    placeholder: "Rechercher une action…",
    empty: "Aucune action ne correspond.",
    hint: "Entrée pour valider, Échap pour fermer",
    groups: { go: "Aller à", projects: "Projets", prefs: "Réglages" },
    theme: "Changer de thème",
    lang: "Switch to English",
    cookies: "Gérer les cookies",
    settings: "Paramètres",
    motionOn: "Activer les animations",
    motionOff: "Réduire les animations",
    home: "Accueil"
  },
  footer: {
    tagline: "J'apprends, je crée, je développe.",
    cols: { nav: "Navigation", legal: "Légal", prefs: "Réglages", social: "Ailleurs" },
    rights: "© {year} Yves.DEV. Tous droits réservés.",
    built: "Site conçu et développé avec React, sans traceur.",
    top: "Revenir en haut"
  },
  legal: {
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    cookies: "Cookies",
    manageCookies: "Gérer les cookies",
    updated: "Dernière mise à jour : octobre 2026",
    back: "Retour au portfolio",
    pages: {
      confidentialite: {
        title: "Politique de confidentialité",
        intro: "Ce portfolio collecte le moins de données possible. Voici exactement ce qui se passe.",
        sections: [
          ["Données collectées", "Le site n'a ni compte utilisateur, ni base de données, ni formulaire envoyé à un serveur. Le composeur de message prépare un texte dans votre navigateur et l'ouvre dans WhatsApp ou votre messagerie : c'est vous qui l'envoyez."],
          ["Vérification anti-robot", "La vérification qui protège mes coordonnées fonctionne entièrement dans votre navigateur. Votre réponse n'est transmise à aucun serveur ni service tiers (pas de reCAPTCHA)."],
          ["Finalité", "Les échanges servent uniquement à répondre aux demandes de contact, de projet ou d'information que vous initiez."],
          ["Partage", "Aucune donnée n'est vendue ni partagée. WhatsApp, Gmail et TikTok traitent les messages selon leurs propres règles."],
          ["Vos droits", "Pour toute demande sur les données que vous m'avez transmises, écrivez-moi via la section Contact. Pour les données détenues par WhatsApp, Google ou TikTok, utilisez les outils de ces plateformes."]
        ]
      },
      termes: {
        title: "Conditions d'utilisation",
        intro: "En consultant ce portfolio, vous acceptez ces règles simples.",
        sections: [
          ["Contenu", "Les textes, visuels et le code de ce site sont fournis à titre informatif et peuvent évoluer. Les captures de projets appartiennent à leurs clients respectifs et sont montrées comme références."],
          ["Utilisation autorisée", "Vous pouvez consulter et partager les pages. La copie massive, la republication trompeuse ou toute utilisation illicite ne sont pas autorisées."],
          ["Liens externes", "WhatsApp, Gmail et TikTok sont des services externes : leur disponibilité et leurs règles ne dépendent pas de ce site."],
          ["Disponibilité", "Le site peut être modifié, interrompu ou déplacé pour maintenance ou amélioration."],
          ["Contact", "Pour toute question sur le site, utilisez la section Contact."]
        ]
      },
      cookies: {
        title: "Politique des cookies",
        intro: "Ce site n'utilise aucun cookie de suivi, de publicité ou de profilage, et aucun service Google.",
        sections: [
          ["Traceurs", "Aucun outil d'analyse, de publicité ou de profilage. Aucune police, aucun script ni aucune image n'est chargé depuis un service tiers."],
          ["Essentiels", "Votre choix de consentement et la réussite de la vérification anti-robot sont gardés dans votre navigateur (stockage local et de session). Ils ne servent pas au suivi."],
          ["Préférences", "Si vous les acceptez, le thème jour/nuit et la langue sont mémorisés sur votre appareil. Si vous refusez, rien n'est enregistré et le site repart des réglages par défaut."],
          ["Services externes", "En ouvrant WhatsApp, Gmail ou TikTok, vous quittez ce site ; ces services peuvent utiliser leurs propres cookies."],
          ["Changer d'avis", "Utilisez « Gérer les cookies » en bas de chaque page, ou effacez les données du site depuis votre navigateur."]
        ]
      }
    }
  },
  cookies: {
    title: "Cookies",
    text: "Aucun traceur ici. Je peux seulement mémoriser votre thème et votre langue sur cet appareil.",
    learn: "En savoir plus",
    accept: "Accepter",
    refuse: "Refuser",
    customize: "Personnaliser",
    save: "Enregistrer",
    essential: ["Essentiels", "Sécurité et vérification anti-robot. Toujours actifs, sans suivi."],
    prefs: ["Préférences", "Mémoriser le thème et la langue."],
    always: "Toujours actifs"
  },
  settings: {
    title: "Paramètres",
    theme: ["Thème", "Choisissez l'ambiance visuelle."],
    light: "Jour",
    dark: "Nuit",
    system: "Système",
    language: ["Langue", "Changez la langue de tout le site."],
    motion: ["Animations", "Rubans, captures qui défilent, wireframe 3D. « Système » suit le réglage de votre appareil."],
    motionSystem: "Système",
    motionFull: "Activées",
    motionReduce: "Réduites",
    motionDeviceOn: "Votre appareil demande de réduire les animations : choisissez « Activées » pour les voir.",
    motionDeviceOff: "Votre appareil autorise les animations.",
    cookies: ["Cookies", "Revoir ou modifier votre choix."]
  },
  notFound: {
    code: "404",
    title: "Cette page n'est pas encore construite.",
    text: "L'adresse ne correspond à aucune page. Elle a peut-être changé, ou il manque une lettre.",
    home: "Retour à l'accueil",
    work: "Voir les travaux"
  },
  lightbox: { close: "Fermer", prev: "Image précédente", next: "Image suivante", counter: "{i} sur {n}" }
};
