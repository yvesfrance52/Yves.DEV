// Données non traduites des projets : identifiants, images, recadrages.
// Les textes (FR/EN) sont dans src/content/*.js, sous `projects.items[slug]`.
// Chemins écrits en entier (plus lisibles, et repérables par les outils de build).
const cap = (small, large, h) => ({ src: large, srcSet: `${small} 760w, ${large} 1400w`, w: 1400, h });

export const projects = [
  {
    slug: "mj-deco",
    category: "deco",
    url: "", // adresse publique du site (ex. "https://..."), affichée sur l'étude de cas quand elle est remplie
    shots: {
      home: cap("/img/projects/mj-home-760.webp", "/img/projects/mj-home-1400.webp", 670),
      second: cap("/img/projects/mj-shop-760.webp", "/img/projects/mj-shop-1400.webp", 676)
    },
    // Bande défilante : vignettes recadrées (w/h = dimensions réelles du fichier).
    strip: [
      { src: "/img/projects/mj-home-760.webp", w: 760, h: 364, full: "home" },
      { src: "/img/frames/mj-headline.webp", w: 530, h: 215, full: "home" },
      { src: "/img/frames/mj-card.webp", w: 430, h: 411, full: "second" },
      { src: "/img/frames/mj-interior.webp", w: 386, h: 480, full: "home" },
      { src: "/img/projects/mj-shop-760.webp", w: 760, h: 367, full: "second" },
      { src: "/img/frames/mj-custom.webp", w: 420, h: 411, full: "second" }
    ]
  },
  {
    slug: "fabrice-pro-elec",
    category: "elec",
    url: "",
    shots: {
      home: cap("/img/projects/fpe-home-760.webp", "/img/projects/fpe-home-1400.webp", 677),
      second: cap("/img/projects/fpe-contact-760.webp", "/img/projects/fpe-contact-1400.webp", 680)
    },
    strip: [
      { src: "/img/projects/fpe-home-760.webp", w: 760, h: 368, full: "home" },
      { src: "/img/frames/fpe-headline.webp", w: 480, h: 280, full: "home" },
      { src: "/img/frames/fpe-founder.webp", w: 450, h: 450, full: "home" },
      { src: "/img/projects/fpe-contact-760.webp", w: 760, h: 369, full: "second" },
      { src: "/img/frames/fpe-cta.webp", w: 630, h: 275, full: "second" }
    ]
  }
];

// Nom de domaine lisible pour la barre d'adresse (ou null si l'adresse n'est pas encore connue).
export const hostOf = (p) => {
  try { const u = new URL(p.url); return u.protocol === "https:" ? u.host : null; } catch { return null; }
};

export const findProject = (slug) => projects.find((p) => p.slug === slug);
