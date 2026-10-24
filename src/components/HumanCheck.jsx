import { useId, useRef, useState } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { fill } from "../content/index.js";

const MIN_DELAY = 1200; // un humain met plus d'une seconde à lire et répondre
const makeSum = () => {
  const a = new Uint8Array(2);
  crypto.getRandomValues(a);
  return { a: 2 + (a[0] % 8), b: 2 + (a[1] % 8) };
};

// Vérification anti-robot locale : calcul + champ piège + délai minimal. Aucun service tiers.
export default function HumanCheck({ onPass }) {
  const { t } = usePrefs();
  const g = t.contact.gate;
  const id = useId();
  const [q, setQ] = useState(makeSum);
  const [answer, setAnswer] = useState("");
  const [trap, setTrap] = useState("");
  const [msg, setMsg] = useState("");
  const [shake, setShake] = useState(0);
  const since = useRef(Date.now());
  const input = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (trap) return; // un robot remplit le champ caché
    if (Date.now() - since.current < MIN_DELAY) { setMsg(g.tooFast); return; }
    if (Number(answer.trim()) === q.a + q.b) { onPass(); return; }
    setMsg(g.wrong); setAnswer(""); setQ(makeSum()); setShake((s) => s + 1);
    since.current = Date.now();
    input.current?.focus();
  };

  return (
    <form className="gate card" onSubmit={submit} noValidate data-shake={shake ? (shake % 2 ? "a" : "b") : undefined}>
      <h3 className="card-title">{g.title}</h3>
      <p>{g.text}</p>
      <div className="gate-row">
        <label htmlFor={`${id}-a`} className="gate-q">{fill(g.question, q)}</label>
        <input ref={input} id={`${id}-a`} className="field" inputMode="numeric" autoComplete="off" maxLength={3}
          placeholder={g.placeholder} value={answer} onChange={(e) => setAnswer(e.target.value.replace(/[^\d]/g, ""))}
          aria-describedby={`${id}-m`} />
        <div className="hp" aria-hidden="true">
          <label htmlFor={`${id}-w`}>Website</label>
          <input id={`${id}-w`} type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </div>
        <button className="btn btn--ink" type="submit">{g.submit}</button>
      </div>
      <p id={`${id}-m`} className="gate-msg" role="status" aria-live="polite">{msg}</p>
    </form>
  );
}
