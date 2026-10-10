/* journify.ai — WorkshopConfirmedPage (route: /workshop/confirmed)
   The page Kit sends people to after they click Confirm in the waitlist email.
   Drawn in the new brand (rebrand chunk 2, 2026-10-10): Archivo, white ground, grey block,
   hairline card, oxblood only on links. Its classes (wc-*) and values live in the route shell
   workshop/confirmed/index.html, not in styles/tokens.css, which stays v1 until the site
   rebuild. Copy: content/workshop-confirmed.json. Own header and footer, no site nav.
   The logo is the file /images/logos/journify-wordmark.svg, never typed text (JC, 2026-10-10). */

function WorkshopConfirmedPage() {
  const [d, setD] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/workshop-confirmed.json').then(r => r.json()).then(setD);
  }, []);

  if (!d) return null;

  return (
    <div className="wc-page">
      <header className="wc-wrap wc-head">
        <a className="wc-brand" href={d.brandHref}><img src="/images/logos/journify-wordmark.svg" alt={d.brand} /></a>
        <span className="wc-eyebrow">{d.eyebrow}</span>
      </header>

      <main className="wc-wrap wc-main">
        <div className="wc-intro">
          <p className="wc-meta">{d.meta}</p>
          <h1 className="wc-h1">{d.title}</h1>
          <p className="wc-lead">
            {d.intro.before}<span className="wc-mark">{d.intro.highlight}</span>{d.intro.after}
          </p>
        </div>

        <section className="wc-block">
          <h2 className="wc-h3">{d.next.heading}</h2>
          <dl className="wc-rows">
            {d.next.rows.map((r, i) => (
              <React.Fragment key={i}>
                <dt className="wc-date">{r.date}</dt>
                <dd>{r.text}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        <section className="wc-card">
          <h2 className="wc-h3">{d.bring.heading}</h2>
          <p>{d.bring.body}</p>
        </section>

        <div className="wc-actions">
          <a className="wc-btn" href={d.back.href}>{d.back.label}</a>
          <span className="wc-note">{d.questions}</span>
        </div>
      </main>

      <footer className="wc-foot">
        <div className="wc-wrap wc-foot-in">
          <span>{d.footer.site}</span>
          <span>{d.footer.links.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}</span>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { WorkshopConfirmedPage });
