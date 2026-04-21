/* journify.ai — StickyNav (shared across all pages)
   Props:
     onOpenDrawer — callback to open mobile drawer
     ctaHref      — href for the primary CTA button (differs per page)
     brandHref    — href for the brand logo (null = plain div, "/" = link back home)
*/

function StickyNav({ onOpenDrawer, ctaHref, brandHref }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [navData, setNavData] = React.useState(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    fetch('/content/nav.json').then(r => r.json()).then(setNavData);
  }, []);

  const brand = brandHref
    ? <a href={brandHref} className="j-nav-brand" style={{ textDecoration: 'none' }}>journify</a>
    : <div className="j-nav-brand">journify</div>;

  return (
    <div className={`j-nav-sticky ${scrolled ? 'is-scrolled' : ''}`}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <nav className="j-nav">
          {brand}
          <div className="j-nav-links">
            {navData && navData.links.map((l, i) => (
              <a key={i} className="j-nav-link" href={l.href}>{l.label}</a>
            ))}
            <a className="j-cta j-cta--hot" href={ctaHref}>Apply for the sprint →</a>
          </div>
          <button className="j-hamb" onClick={onOpenDrawer} aria-label="Open menu">
            <span className="j-hamb-glyph"><span /></span>
          </button>
        </nav>
      </div>
    </div>
  );
}

Object.assign(window, { StickyNav });
