import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter, MemoryRouter } from "react-router-dom";
import "@fontsource-variable/anybody/standard.css";
import "@fontsource-variable/instrument-sans/standard.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/pages.css";
import App from "./App.jsx";

// Aperçu autonome : MemoryRouter (VITE_ROUTER=memory) ne touche jamais à l'adresse de la page,
// indispensable dans les cadres isolés qui interdisent history.replaceState et les ancres « #/… ».
const routers = { hash: HashRouter, memory: MemoryRouter };
const Router = routers[import.meta.env.VITE_ROUTER] || BrowserRouter;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
