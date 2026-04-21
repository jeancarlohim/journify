/* journify.ai — Footer (shared across all pages) */

function Footer() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/footer.json').then(r => r.json()).then(setData);
  }, []);

  if (!data) return null;

  const link = { color: 'var(--text-2)', fontFamily: 'var(--sans)', fontSize: 14, textDecoration: 'none', transition: 'color 120ms var(--ease)' };
  const onEnter = (e) => { e.currentTarget.style.color = 'var(--text)'; };
  const onLeave = (e) => { e.currentTarget.style.color = 'var(--text-2)'; };
  const L = (props) => <a {...props} style={link} onMouseEnter={onEnter} onMouseLeave={onLeave} />;

  return (
    <footer style={{ borderTop: '0.5px solid var(--border)', padding: '48px 48px 64px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        <div>
          <div className="j-nav-brand">{data.brand}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {data.navLinks.map((l, i) => <L key={i} href={l.href}>{l.label}</L>)}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {data.legalLinks.map((l, i) => <L key={i} href={l.href}>{l.label}</L>)}
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {data.contactLinks.map((l, i) => <L key={i} href={l.href}>{l.label}</L>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '32px auto 0', fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--text-2)' }}>
        {data.copyright}
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
