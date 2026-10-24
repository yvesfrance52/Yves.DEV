// Icônes au trait carré, cohérentes avec le style Neo-Brutalism.
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "square", strokeLinejoin: "miter", "aria-hidden": true, focusable: "false" };

export const SunIcon = () => <svg {...base}><rect x="8" y="8" width="8" height="8" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
export const MoonIcon = () => <svg {...base}><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>;
export const ArrowIcon = ({ dir = "right" }) => {
  const r = { right: 0, down: 90, left: 180, up: 270, ne: -45 }[dir] || 0;
  return <svg {...base} style={{ transform: `rotate(${r}deg)` }}><path d="M3 12h17M14 6l6 6-6 6" /></svg>;
};
export const PlayIcon = () => <svg {...base}><path d="M7 4l12 8-12 8z" fill="currentColor" /></svg>;
export const PauseIcon = () => <svg {...base}><path d="M7 4v16M17 4v16" /></svg>;
export const CloseIcon = () => <svg {...base}><path d="M5 5l14 14M19 5L5 19" /></svg>;
export const CopyIcon = () => <svg {...base}><rect x="8" y="8" width="12" height="12" /><path d="M4 16V4h12" /></svg>;
export const CommandIcon = () => <svg {...base}><path d="M9 9V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" /></svg>;
export const SettingsIcon = () => <svg {...base} strokeWidth={2.2}><path d="M9.8 4.7L10 1.7h4l.2 3 1.4.6 2.3-2 2.8 2.8-2 2.3.6 1.4 3 .2v4l-3 .2-.6 1.4 2 2.3-2.8 2.8-2.3-2-1.4.6-.2 3h-4l-.2-3-1.4-.6-2.3 2-2.8-2.8 2-2.3-.6-1.4-3-.2v-4l3-.2.6-1.4-2-2.3 2.8-2.8 2.3 2z" /><circle cx="12" cy="12" r="3.2" /></svg>;
export const StarIcon = () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false"><path d="M12 1.5l3.1 7.2 7.9.7-6 5.2 1.8 7.7L12 18.3l-6.8 4 1.8-7.7-6-5.2 7.9-.7z" fill="currentColor" /></svg>;
