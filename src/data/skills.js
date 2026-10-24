// Disposition du clavier de compétences (rangées) ; descriptions dans content/*.js → skills.items.
// `size` : largeur de la touche en unités. `group` : web | lang | deploy.
export const keyboard = [
  [
    { id: "html", label: "HTML", group: "web", size: 1 },
    { id: "css", label: "CSS", group: "web", size: 1 },
    { id: "javascript", label: "JavaScript", group: "web", size: 2 },
    { id: "react", label: "React", group: "web", size: 1.25 }
  ],
  [
    { id: "php", label: "PHP", group: "web", size: 1 },
    { id: "python", label: "Python", group: "lang", size: 1.5 },
    { id: "java", label: "Java", group: "lang", size: 1.25 },
    { id: "c", label: "C", group: "lang", size: 1 }
  ],
  [
    { id: "cpp", label: "C++", group: "lang", size: 1.25 },
    { id: "render", label: "Render", group: "deploy", size: 3 }
  ]
];

export const allSkills = keyboard.flat();
