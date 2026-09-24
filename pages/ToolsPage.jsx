/* /tools — "The sprint runs on software we built ourselves."
   All copy comes from content/tools.json. The inbox replica is tools/InboxMock.jsx.
   Sections, in order: Hero, The loop, Lead Finder, DM 2 Call App, Sally, Proof,
   Free diagnostic, Trust, FAQ, Close.
*/

const TOOLS_APPLY = "https://cal.com/jeancarlohim/apply-for-thesprint";

/* Full-bleed band; inner column capped at 1200px like the rest of the site.
   The vertical padding sits on the inner column, not the section, so the
   1200px cap includes it — same as the design file. */
function TBand({ id, label, children, tone, width = 1200, pad = '', style }) {
  const bg = tone === 'panel' ? 'var(--panel)' : (tone === 'ox' ? 'var(--ox)' : 'var(--bg)');
  return (
    <section id={id} data-screen-label={label} className="j-tools-band" style={{ background: bg, ...style }}>
      <div className={`j-tools-inner ${pad}`} style={{ maxWidth: width }}>{children}</div>
    </section>
  );
}

/* Browser/app title bar above a screenshot. */
function TChrome({ label }) {
  return (
    <div style={{ height: 34, display: 'flex', alignItems: 'center', padding: '0 14px',
                  borderBottom: '0.5px solid var(--border)', background: 'var(--panel)' }}>
      <span style={{ fontSize: 11, color: 'var(--placeholder)', letterSpacing: '0.04em' }}>{label}</span>
    </div>
  );
}

function TShot({ fig }) {
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ border: '0.5px solid var(--border)' }}>
        <TChrome label={fig.chrome} />
        <img src={fig.src} alt={fig.alt} loading="lazy"
             style={{ width: '100%', aspectRatio: fig.ratio, objectFit: 'cover',
                      objectPosition: 'top', display: 'block' }} />
      </div>
      <figcaption className="j-cap" style={{ marginTop: 12 }}>{fig.caption}</figcaption>
    </figure>
  );
}

/* Shared two-column tool block: sticky copy on one side, visual on the other. */
function TToolCopy({ h2, lead, body, closer, link }) {
  return (
    <div className="j-tools-copy">
      <h2 className="j-h2 j-tools-h2">{h2}</h2>
      <p className="j-tools-lead">{lead}</p>
      {body.map((t, i) => <p key={i} className="j-tools-p">{t}</p>)}
      {closer && <p className="j-tools-p" style={{ color: 'var(--text)', marginBottom: 0 }}>{closer}</p>}
      {link && <a className="j-link" style={{ fontSize: 14 }} href={link.href} target="_blank" rel="noopener">{link.label}</a>}
    </div>
  );
}

function ToolsPage() {
  const [c, setC] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/tools.json').then(r => r.json()).then(setC);
  }, []);

  if (!c) return null;

  return (
    <React.Fragment>

      {/* ── Hero ───────────────────────────────────────── */}
      <TBand id="hero" label="Hero" pad="j-pad-none">
        <div className="j-tools-hero">
          <h1 className="j-h1 j-tools-h1">{c.hero.h1}</h1>
          <div className="j-tools-hero-cols">
            <div style={{ flex: '1 1 380px', maxWidth: 560 }}>
              {c.hero.body.map((t, i) => (
                <p key={i} className="j-body" style={{ fontSize: 17, marginTop: i === 0 ? 0 : 20 }}>{t}</p>
              ))}
            </div>
            <div className="j-tools-hero-aside">
              {c.hero.aside.map((t, i) => (
                <p key={i} className="j-small" style={{ color: 'var(--text-2)', lineHeight: 1.65,
                                                        marginTop: i === 0 ? 0 : 16 }}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </TBand>

      {/* ── The loop ───────────────────────────────────── */}
      <TBand id="loop" label="The loop" tone="panel" pad="j-pad-loop"
             style={{ borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>
        <h2 className="j-h2 j-tools-h2" style={{ marginBottom: 12 }}>
          {c.loop.h2.pre}<u>{c.loop.h2.underline}</u>{c.loop.h2.post}
        </h2>
        <div style={{ maxWidth: 620, marginBottom: 56 }}>
          {c.loop.intro.map((t, i) => (
            <p key={i} className="j-body" style={{ color: 'var(--text-2)', marginTop: i === 0 ? 0 : 20 }}>{t}</p>
          ))}
        </div>
        <div className="j-tools-stages">
          {c.loop.stages.map((s, i) => (
            <div key={i} className="j-tools-stage">
              <p className="j-meta" style={{ color: 'var(--ox)', marginBottom: 14 }}>
                {s.num}&nbsp;&nbsp;{s.stage}
              </p>
              <p style={{ fontWeight: 500, fontSize: 16, letterSpacing: '-0.005em', margin: '0 0 8px' }}>{s.name}</p>
              <p className="j-small" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{s.line}</p>
            </div>
          ))}
        </div>
        <p className="j-payoff" style={{ marginTop: 28 }}>
          {c.loop.payoff} <span style={{ color: 'var(--text-2)' }}>↺</span>
        </p>
      </TBand>

      {/* ── Lead Finder ────────────────────────────────── */}
      <TBand id="lead-finder" label="Lead Finder" pad="j-pad-none">
        <div className="j-tools-split j-tools-split--first">
          <TToolCopy h2={c.leadFinder.h2} lead={c.leadFinder.lead}
                     body={c.leadFinder.body} link={c.leadFinder.link} />
          <div className="j-tools-visual">
            <TShot fig={c.leadFinder.figure} />
          </div>
        </div>
      </TBand>

      {/* ── DM 2 Call App ──────────────────────────────── */}
      <TBand id="dm-2-call" label="DM 2 Call App" pad="j-pad-none">
        <div className="j-tools-split j-tools-split--flip">
          <TToolCopy h2={c.dmApp.h2} lead={c.dmApp.lead} body={c.dmApp.body} />
          <div className="j-tools-visual j-tools-visual--wide">
            <figure style={{ margin: 0 }}>
              <InboxMock mock={c.dmApp.mock} />
              <figcaption className="j-cap" style={{ marginTop: 12 }}>{c.dmApp.caption}</figcaption>
            </figure>
          </div>
        </div>
      </TBand>

      {/* ── Sally ──────────────────────────────────────── */}
      <TBand id="sally" label="Sally" pad="j-pad-none">
        <div className="j-tools-split j-tools-split--last">
          <TToolCopy h2={c.sally.h2} lead={c.sally.lead} body={c.sally.body} closer={c.sally.closer} />
          <div className="j-tools-visual" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {c.sally.figures.map((f, i) => <TShot key={i} fig={f} />)}
          </div>
        </div>
      </TBand>

      {/* ── Proof ──────────────────────────────────────── */}
      <TBand id="proof" label="Proof" pad="j-pad-proof" style={{ borderTop: '0.5px solid var(--border)' }}>
        <p className="j-meta" style={{ marginBottom: 40 }}>{c.proof.eyebrow}</p>
        <div className="j-tools-proofs">
          {c.proof.items.map((p, i) => (
            <div key={i} style={{ borderLeft: '0.5px solid var(--border)', paddingLeft: 24 }}>
              <p className="j-tools-big">{p.big}</p>
              <p className="j-small" style={{ color: 'var(--text-2)', lineHeight: 1.6 }}>{p.line}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: '44px 0 0' }}>
          <a className="j-link" style={{ fontSize: 14 }} href={c.proof.link.href}>{c.proof.link.label}</a>
        </p>
      </TBand>

      {/* ── Free diagnostic ────────────────────────────── */}
      <TBand id="diagnostic" label="Free diagnostic" tone="ox">
        <div className="j-tools-diag">
          <div style={{ flex: '1 1 380px', maxWidth: 620 }}>
            <p className="j-meta" style={{ color: 'var(--ox-text-2)', marginBottom: 20 }}>{c.diagnostic.eyebrow}</p>
            <h2 className="j-h2 j-tools-h2" style={{ color: 'var(--ox-text)', marginBottom: 22 }}>
              {c.diagnostic.h2}
            </h2>
            <p className="j-body" style={{ color: 'var(--ox-text-2)' }}>{c.diagnostic.body}</p>
          </div>
          <div style={{ flex: '0 1 280px', paddingTop: 8 }}>
            <a className="j-cta j-tools-cta-invert" href={c.diagnostic.cta.href}>{c.diagnostic.cta.label}</a>
            <p className="j-cap" style={{ color: 'var(--ox-text-2)', margin: '16px 0 0' }}>{c.diagnostic.note}</p>
          </div>
        </div>
      </TBand>

      {/* ── Trust ──────────────────────────────────────── */}
      <TBand id="trust" label="Trust">
        <div className="j-tools-trust">
          <div style={{ flex: '0 1 340px' }}>
            <h2 className="j-h2 j-tools-h2" style={{ marginBottom: 16 }}>{c.trust.h2}</h2>
            <p className="j-small" style={{ color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 24 }}>
              {c.trust.lead}{' '}
              <a className="j-link" href={c.trust.privacyLink.href}>{c.trust.privacyLink.label}</a>
            </p>
            <p className="j-meta" style={{ color: 'var(--placeholder)', marginBottom: 14 }}>{c.trust.stackLabel}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px', alignItems: 'center' }}>
              {c.trust.stack.map((s, i) => (
                <span key={i} style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-2)',
                                       letterSpacing: '-0.01em' }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 380px', borderTop: '0.5px solid var(--border)', alignSelf: 'flex-start' }}>
            {c.trust.rows.map((r, i) => (
              <div key={i} style={{ padding: '22px 0', borderBottom: '0.5px solid var(--border)' }}>
                <p style={{ fontWeight: 500, fontSize: 15, letterSpacing: '-0.005em', margin: '0 0 6px' }}>{r.h}</p>
                <p className="j-small" style={{ color: 'var(--text-2)', lineHeight: 1.65 }}>{r.b}</p>
              </div>
            ))}
          </div>
        </div>
      </TBand>

      {/* ── FAQ ────────────────────────────────────────── */}
      <TBand id="faq" label="FAQ" width={820} style={{ borderTop: '0.5px solid var(--border)' }}>
        <h2 className="j-h2 j-tools-h2" style={{ marginBottom: 40 }}>{c.faq.h2}</h2>
        <Accordion rows={c.faq.rows} />
      </TBand>

      {/* ── Close ──────────────────────────────────────── */}
      <TBand id="close" label="Close" pad="j-pad-close" style={{ borderTop: '0.5px solid var(--border)' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="j-h2 j-tools-h2 j-tools-close-h">{c.close.h2}</h2>
          <p className="j-body" style={{ color: 'var(--text-2)', margin: '0 auto 40px', maxWidth: 520 }}>
            {c.close.body}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                        gap: 28, flexWrap: 'wrap' }}>
            <a className="j-cta j-cta--warm" href={c.close.primary.href}>{c.close.primary.label}</a>
            <a className="j-cta j-cta--cold" href={c.close.secondary.href}>{c.close.secondary.label}</a>
          </div>
        </div>
      </TBand>

    </React.Fragment>
  );
}

Object.assign(window, { ToolsPage, TOOLS_APPLY });
