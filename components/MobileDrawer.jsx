/* journify.ai — MobileDrawer (shared across all pages)
   Props:
     open     — bool
     onClose  — callback
     ctaHref  — href for the primary CTA button (differs per page)
*/

function MobileDrawer({ open, onClose, ctaHref }) {
  const [navData, setNavData] = React.useState(null);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  React.useEffect(() => {
    fetch('/content/nav.json').then(r => r.json()).then(setNavData);
  }, []);

  return (
    <div className={`j-page-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="j-overlay" style={{ position: 'absolute', inset: 0 }} onClick={onClose} />
      <aside className="j-drawer">
        <button className="j-drawer-close" aria-label="Close menu" onClick={onClose}>×</button>
        <div className="j-drawer-links">
          {navData && navData.links.map((l, i) => (
            <a key={i} className="j-drawer-link" href={l.href} onClick={onClose}>{l.label}</a>
          ))}
        </div>
        <div className="j-drawer-cta">
          <a className="j-cta j-cta--hot" href={ctaHref} onClick={onClose}>Apply for the sprint →</a>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { MobileDrawer });
