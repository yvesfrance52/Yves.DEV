// Cadre de navigateur Neo-Brutalism : barre de titre, trois pastilles, champ d'adresse.
export default function BrowserFrame({ address, children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag className={`browser ${className}`} {...rest}>
      <div className="browser-bar" aria-hidden="true">
        <span className="dot dot-ink" /><span className="dot dot-gold" /><span className="dot dot-blue" />
        <span className="browser-address">{address}</span>
      </div>
      <div className="browser-body">{children}</div>
    </Tag>
  );
}
