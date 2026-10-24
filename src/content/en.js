// English copy. Every key must also exist in fr.js (checked by tests/i18n.test.js).
export default {
  meta: {
    lang: "en",
    siteName: "Yves.DEV",
    homeTitle: "Yves.DEV — Junior web developer",
    description: "Portfolio of Tahou Laizao Jean Yves Helory (Yves.DEV), junior web developer: websites for MJ Deco and Fabrice Pro Elec, skills and contact.",
    notFoundTitle: "Page not found — Yves.DEV"
  },
  a11y: {
    skip: "Skip to content",
    mainNav: "Main navigation",
    home: "Yves.DEV, home",
    newTab: "(new tab)"
  },
  nav: { work: "Work", about: "About", skills: "Skills", contact: "Contact" },
  header: {
    menu: "Menu",
    closeMenu: "Close",
    toLight: "Switch to day mode",
    toDark: "Switch to night mode",
    switchLang: "Lire en français",
    switchLangShort: "FR",
    settings: "Settings"
  },
  hero: {
    sticker: "Junior developer",
    lead: "I turn ideas into real websites, from the first sketch to going live.",
    cta: "See my work",
    wireframeLabel: "3D wireframe of a web page that assembles as you scroll"
  },
  ribbon: ["I learn", "I create", "I develop"],
  work: {
    title: "Work",
    intro: "Two websites built for businesses in Côte d'Ivoire. The screenshots scroll on their own: hover to stop them, click to enlarge.",
    filters: { all: "All", deco: "Interior design", elec: "Electrical" },
    filterLabel: "Filter projects",
    openCase: "Read the case study",
    pause: "Pause",
    play: "Play",
    stripLabel: "Screenshots of the {name} website",
    zoom: "Enlarge",
    count: { one: "{n} project", other: "{n} projects" }
  },
  projects: {
    // Optional, per project (also in fr.js): details: { role: "...", stack: "...", results: "..." }
    items: {
      "mj-deco": {
        name: "MJ Deco",
        sector: "Interior design",
        place: "Abidjan, Côte d'Ivoire",
        type: "Showcase site with shop",
        summary: "MJ Deco designs tailor-made spaces and follows each project from A to Z. The site presents its services, method, work and an accessories shop.",
        shows: [
          "A complete journey: services, shop, method, projects, about",
          "A shop with cart and colour choice (curtain tie-backs, 3,500 FCFA)",
          "Clear calls to action: Book, Request a quote, Configure my project",
          "A client area, a FR/EN version and a day/night switch",
          "An elegant identity: serif typography, plum and cream"
        ],
        stripAlts: [
          "MJ Deco home page: “Spaces that look like you”",
          "MJ Deco home page headline over a living room",
          "Shop product card: curtain tie-backs",
          "Detail of a living room with lit shelves, MJ Deco home page",
          "MJ Deco shop: “Small touches that change everything”",
          "“Something in mind?” block of the shop"
        ],
        shotAlts: {
          home: "Full home page of the MJ Deco website",
          second: "Full shop page of the MJ Deco website"
        }
      },
      "fabrice-pro-elec": {
        name: "Fabrice Pro Elec",
        sector: "Electrical",
        place: "Côte d'Ivoire",
        type: "Showcase site",
        summary: "Fabrice Pro Elec presents itself as a trusted electrical partner. The site highlights the founder, a strong tagline and instant contact.",
        shows: [
          "A memorable tagline: “Energy you can trust.”",
          "Simple navigation and a “Let's talk about your project” button",
          "A FR/EN version with theme switch",
          "A contact section: WhatsApp and email in one click",
          "Privacy, Terms and Cookies pages"
        ],
        stripAlts: [
          "Fabrice Pro Elec home page with the founder's portrait",
          "“Energy you can trust” headline",
          "Portrait of the founder, Blé Nda Fabrice, on the home page",
          "Contact section (client details blurred)",
          "Call to write on WhatsApp (details blurred)"
        ],
        shotAlts: {
          home: "Full home page of the Fabrice Pro Elec website",
          second: "Contact section of the Fabrice Pro Elec website, client details blurred"
        }
      }
    }
  },
  caseStudy: {
    back: "All work",
    specTitle: "Project sheet",
    spec: { client: "Client", sector: "Sector", place: "Location", type: "Type", role: "My role", stack: "Technologies", url: "Address", results: "Results" },
    showsTitle: "What the site shows",
    summaryTitle: "The project",
    next: "Next project",
    zoom: "Enlarge screenshot"
  },
  motto: {
    title: "My motto",
    lines: ["I learn.", "I create.", "I develop."],
    notes: [
      "Every day, one more technology, mistake or idea.",
      "Looking for an original idea and the right solution.",
      "Bringing the project to life, all the way to launch."
    ],
    portraitAlt: "Portrait of Yves, wearing glasses and a white t-shirt, playing a keyboard in front of a red and white wall",
    portraitCaption: "Tahou Laizao Jean Yves Helory"
  },
  about: {
    title: "About",
    text: [
      ["p", "I am "], ["n", "Tahou Laizao Jean Yves Helory"], ["p", ", known as "], ["n", "Yves.DEV"],
      ["p", " in my digital world. A junior developer, I am driven by "], ["g", "curiosity"],
      ["p", ", creativity and the desire to turn ideas into concrete solutions. I am interested in "], ["b", "web development"],
      ["p", ", in designing "], ["g", "modern interfaces"],
      ["p", " and in digital experiences that are useful, intuitive and aesthetic. For me, developing is not only about writing code: it is understanding a need, imagining a solution and bringing a project to life. I learn every day, try new approaches and grow through "], ["g", "real projects"],
      ["p", ". My ambition: to keep growing, collaborate with inspiring people and take part in projects that matter. "],
      ["cta", "Let's talk about your project."]
    ],
    visionTitle: "My vision",
    vision: "Creating digital experiences that combine functionality, simplicity and creativity.",
    traitsTitle: "What defines me",
    traits: [
      ["Curiosity", "Always ready to learn and explore new technologies."],
      ["Creativity", "Looking for original ideas and fitting solutions."],
      ["Perseverance", "Learning from my mistakes and improving with every project."],
      ["Passion", "Designing, experimenting and bringing my ideas to life."]
    ]
  },
  skills: {
    title: "Skills",
    intro: "The languages and tools I work with. Press a key to find out more.",
    keyboardLabel: "Skills keyboard",
    screenIdle: "Press a key",
    groups: { web: "Web", lang: "Language", deploy: "Going live" },
    items: {
      html: "The structure of every page: headings, text, images, forms.",
      css: "Styling: colour, typography, layout, animation, mobile adaptation.",
      javascript: "Interactivity in the browser: menus, filters, animation, interface logic.",
      react: "Interfaces built from reusable components. This portfolio is made with React.",
      php: "Server-side logic: forms, dynamic pages, talking to a database.",
      python: "Scripts and logic: automating, processing data, prototyping.",
      java: "Structured, object-oriented applications.",
      c: "Close-to-the-machine programming: memory, pointers, rigour.",
      cpp: "Object-oriented, high-performance programming.",
      render: "Hosting and putting websites and applications online."
    }
  },
  contact: {
    title: "Have a project in mind?",
    intro: "An idea, a website, a collaboration: write to me directly.",
    gate: {
      title: "Anti-bot check",
      text: "To protect my contact details from bots, solve this quick sum. Nothing is sent to any outside service.",
      question: "What is {a} + {b}?",
      placeholder: "Your answer",
      submit: "Show my contact details",
      wrong: "That's not the right result. Here is a new sum.",
      tooFast: "Take a second, then submit again."
    },
    rows: { whatsapp: "WhatsApp", email: "Email", tiktok: "TikTok" },
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Couldn't copy: select the address by hand.",
    composer: {
      title: "Prepare a message",
      text: "The message opens in WhatsApp or your email app so you can read it before sending. Nothing is stored on this site.",
      name: "Your name",
      type: "Project type",
      types: ["Showcase site", "Online shop", "Web app", "Other"],
      message: "Your message",
      counter: "{n} / {max}",
      sendWhatsapp: "Open in WhatsApp",
      sendEmail: "Open in my email app",
      empty: "Write a few words before sending.",
      cooldown: "Message prepared. You can prepare another one in a few seconds.",
      greeting: "Hello Yves,",
      intro: "my name is {name}.",
      projectLine: "Project: {type}.",
      subject: "Project — from your portfolio"
    }
  },
  commands: {
    title: "Command palette",
    placeholder: "Search for an action…",
    empty: "No action matches.",
    hint: "Enter to run, Esc to close",
    groups: { go: "Go to", projects: "Projects", prefs: "Settings" },
    theme: "Toggle theme",
    lang: "Passer en français",
    cookies: "Manage cookies",
    settings: "Settings",
    motionOn: "Turn animations on",
    motionOff: "Reduce animations",
    home: "Home"
  },
  footer: {
    tagline: "I learn, I create, I develop.",
    cols: { nav: "Navigation", legal: "Legal", prefs: "Settings", social: "Elsewhere" },
    rights: "© {year} Yves.DEV. All rights reserved.",
    built: "Designed and built with React, with no trackers.",
    top: "Back to top"
  },
  legal: {
    privacy: "Privacy",
    terms: "Terms of use",
    cookies: "Cookies",
    manageCookies: "Manage cookies",
    updated: "Last updated: October 2026",
    back: "Back to portfolio",
    pages: {
      confidentialite: {
        title: "Privacy policy",
        intro: "This portfolio collects as little data as possible. Here is exactly what happens.",
        sections: [
          ["Data collected", "The site has no user accounts, no database and no form sent to a server. The message composer prepares text in your browser and opens it in WhatsApp or your email app: you are the one who sends it."],
          ["Anti-bot check", "The check that protects my contact details runs entirely in your browser. Your answer is sent to no server or third-party service (no reCAPTCHA)."],
          ["Purpose", "Messages are used only to answer the contact, project or information requests you start."],
          ["Sharing", "No data is sold or shared. WhatsApp, Gmail and TikTok handle messages under their own rules."],
          ["Your rights", "For any request about data you sent me, write to me through the Contact section. For data held by WhatsApp, Google or TikTok, use those platforms' own tools."]
        ]
      },
      termes: {
        title: "Terms of use",
        intro: "By browsing this portfolio, you accept these simple rules.",
        sections: [
          ["Content", "The text, visuals and code of this site are provided for information and may change. Project screenshots belong to their respective clients and are shown as references."],
          ["Permitted use", "You may browse and share the pages. Mass copying, misleading republication or any unlawful use is not permitted."],
          ["External links", "WhatsApp, Gmail and TikTok are external services: their availability and rules don't depend on this site."],
          ["Availability", "The site may be changed, interrupted or moved for maintenance or improvements."],
          ["Contact", "For any question about the site, use the Contact section."]
        ]
      },
      cookies: {
        title: "Cookie policy",
        intro: "This site uses no tracking, advertising or profiling cookies, and no Google service.",
        sections: [
          ["Trackers", "No analytics, advertising or profiling tool. No font, script or image is loaded from a third-party service."],
          ["Essential", "Your consent choice and the success of the anti-bot check are kept in your browser (local and session storage). They are not used for tracking."],
          ["Preferences", "If you accept them, the day/night theme and language are remembered on your device. If you decline, nothing is saved and the site starts from default settings."],
          ["External services", "When you open WhatsApp, Gmail or TikTok, you leave this site; those services may use their own cookies."],
          ["Changing your mind", "Use “Manage cookies” at the bottom of every page, or clear the site's data from your browser."]
        ]
      }
    }
  },
  cookies: {
    title: "Cookies",
    text: "No trackers here. I can only remember your theme and language on this device.",
    learn: "Learn more",
    accept: "Accept",
    refuse: "Decline",
    customize: "Customise",
    save: "Save",
    essential: ["Essential", "Security and anti-bot check. Always on, no tracking."],
    prefs: ["Preferences", "Remember theme and language."],
    always: "Always on"
  },
  settings: {
    title: "Settings",
    theme: ["Theme", "Choose the visual mood."],
    light: "Day",
    dark: "Night",
    system: "System",
    language: ["Language", "Change the language of the whole site."],
    motion: ["Animation", "Ribbons, scrolling screenshots, 3D wireframe. “System” follows your device setting."],
    motionSystem: "System",
    motionFull: "On",
    motionReduce: "Reduced",
    motionDeviceOn: "Your device asks to reduce motion: choose “On” to see the animations.",
    motionDeviceOff: "Your device allows animation.",
    cookies: ["Cookies", "Review or change your choice."]
  },
  notFound: {
    code: "404",
    title: "This page hasn't been built yet.",
    text: "The address doesn't match any page. It may have changed, or a letter is missing.",
    home: "Back to home",
    work: "See the work"
  },
  lightbox: { close: "Close", prev: "Previous image", next: "Next image", counter: "{i} of {n}" }
};
