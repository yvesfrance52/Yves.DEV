import { useEffect, useId, useRef, useState } from "react";
import { usePrefs } from "../context/Prefs.jsx";
import { fill } from "../content/index.js";
import { revealContacts } from "../data/contact.js";
import { session, KEYS } from "../lib/storage.js";
import { LIMITS, clean, composeText, mailtoLink, whatsappLink } from "../lib/message.js";
import { useReveal } from "../hooks/useReveal.js";
import KineticWord from "../components/KineticWord.jsx";
import HumanCheck from "../components/HumanCheck.jsx";
import { ArrowIcon, CopyIcon } from "../components/Icons.jsx";

const COOLDOWN = 8000;

function Composer({ contacts }) {
  const { t } = usePrefs();
  const c = t.contact.composer;
  const id = useId();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [locked, setLocked] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const send = (channel) => {
    if (locked) return;
    if (clean(message, LIMITS.message).length < 3) { setStatus(c.empty); return; }
    const body = composeText({ name, type, message }, c);
    const href = channel === "whatsapp" ? whatsappLink(contacts.whatsapp, body) : mailtoLink(contacts.email, c.subject, body);
    // Ouvre l'application choisie ; rien n'est envoyé par ce site.
    if (channel === "whatsapp") window.open(href, "_blank", "noopener,noreferrer");
    else window.location.href = href;
    setLocked(true);
    setStatus(c.cooldown);
    timer.current = setTimeout(() => { setLocked(false); setStatus(""); }, COOLDOWN);
  };

  return (
    <form className="composer card" onSubmit={(e) => { e.preventDefault(); send("whatsapp"); }} noValidate>
      <h3 className="card-title">{c.title}</h3>
      <p className="composer-intro">{c.text}</p>
      <label className="field-label" htmlFor={`${id}-n`}>{c.name}</label>
      <input id={`${id}-n`} className="field" type="text" autoComplete="name" maxLength={LIMITS.name} value={name} onChange={(e) => setName(e.target.value)} />
      <fieldset className="composer-types">
        <legend className="field-label">{c.type}</legend>
        {c.types.map((ty) => (
          <label key={ty} className="chip chip--radio">
            <input type="radio" name={`${id}-t`} value={ty} checked={type === ty} onChange={() => setType(ty)} />
            <span>{ty}</span>
          </label>
        ))}
      </fieldset>
      <label className="field-label" htmlFor={`${id}-m`}>{c.message}</label>
      <textarea id={`${id}-m`} className="field field--area" rows={5} maxLength={LIMITS.message} value={message}
        onChange={(e) => setMessage(e.target.value)} aria-describedby={`${id}-c ${id}-s`} />
      <p className="composer-count" id={`${id}-c`}>{fill(c.counter, { n: message.length, max: LIMITS.message })}</p>
      <div className="composer-actions">
        <button type="submit" className="btn btn--ink" disabled={locked}>{c.sendWhatsapp}<ArrowIcon dir="ne" /></button>
        <button type="button" className="btn btn--paper" disabled={locked} onClick={() => send("email")}>{c.sendEmail}<ArrowIcon dir="ne" /></button>
      </div>
      <p className="composer-status" id={`${id}-s`} role="status" aria-live="polite">{status}</p>
    </form>
  );
}

export default function Contact() {
  const { t } = usePrefs();
  const ct = t.contact;
  const ref = useReveal();
  const [contacts, setContacts] = useState(() => (session.get(KEYS.human) === "1" ? revealContacts() : null));
  const [copied, setCopied] = useState("");

  const pass = () => { session.set(KEYS.human, "1"); setContacts(revealContacts()); };
  const copy = async () => {
    try { await navigator.clipboard.writeText(contacts.email); setCopied(ct.copied); }
    catch { setCopied(ct.copyFailed); }
    setTimeout(() => setCopied(""), 2500);
  };

  return (
    <section className="contact" id="contact" ref={ref} tabIndex={-1} aria-labelledby="contact-title">
      <div className="contact-inner">
      <h2 id="contact-title" className="contact-title">
        <KineticWord text={ct.title} as="span" reach={220} boost={30} />
      </h2>
      <p className="contact-intro" data-reveal>{ct.intro}</p>

      {!contacts ? (
        <div className="contact-gate" data-reveal><HumanCheck onPass={pass} /></div>
      ) : (
        <div className="contact-grid">
          <ul className="contact-rows">
            <li>
              <a className="contact-row" href={`https://wa.me/${contacts.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <span className="contact-label">{ct.rows.whatsapp}</span>
                <span className="contact-value">{contacts.whatsappLabel}</span>
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </li>
            <li className="contact-row-wrap">
              <a className="contact-row" href={`mailto:${contacts.email}`}>
                <span className="contact-label">{ct.rows.email}</span>
                <span className="contact-value contact-value--mail">{contacts.email}</span>
              </a>
              <button type="button" className="btn-square btn-square--gold contact-copy" onClick={copy} aria-label={`${ct.copy} ${contacts.email}`}><CopyIcon /></button>
              <span className="contact-copied" role="status" aria-live="polite">{copied}</span>
            </li>
            <li>
              <a className="contact-row" href={contacts.tiktok.url} target="_blank" rel="noopener noreferrer">
                <span className="contact-label">{ct.rows.tiktok}</span>
                <span className="contact-value">{contacts.tiktok.handle}</span>
                <span className="sr-only">{t.a11y.newTab}</span>
              </a>
            </li>
          </ul>
          <Composer contacts={contacts} />
        </div>
      )}
      </div>
    </section>
  );
}
