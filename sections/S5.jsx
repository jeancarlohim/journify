/* journify.ai — S5 Teardowns library
   Not rendered on the homepage until teardown content exists.
   Preserved here so it can be wired in when ready.
*/

function S5() {
  const cards = [
    { tag: 'AGENCY',     title: 'Northbeam Studio — three leaks',
      desc: 'Homepage promises "growth through brand and performance." The offer never names what a client actually buys. Three booked calls a week, zero signed.' },
    { tag: 'CONSULTING', title: 'Marlow & Reed — three leaks',
      desc: 'Seven service lines on the nav. The right-fit buyer arrives with a specific problem and leaves because the menu reads like a holding company.' },
    { tag: 'TRAINING',   title: 'Kessel Partners — three leaks',
      desc: 'Proposal deck answers a question the prospect had stopped asking by slide three. We rewrote slide three. The deal closed in eight days.' },
  ];
  return (
    <Section id="s5" label="S5 Teardowns" width={1080}>
      <h2 className="j-h2">Real sites. Named leaks. No solutions.</h2>
      <p className="j-body" style={{ maxWidth: 520, marginTop: 24 }}>
        Every teardown names three to five places a specific B2B service site is losing
        qualified prospects before the call. Published with the founder's permission.
        Nothing redacted.
      </p>

      <div className="j-s5-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 48, borderTop: '0.5px solid var(--border)', borderBottom: '0.5px solid var(--border)' }}>
        {cards.map((c, i) => (
          <a key={i} href="#" className="j-card" style={{
            textDecoration: 'none',
            borderLeft: i === 0 ? '0.5px solid var(--border)' : '0',
            borderRight: '0.5px solid var(--border)',
            borderTop: 0, borderBottom: 0,
          }}>
            <div className="j-meta">Teardown · 0{i + 1} · {c.tag.toLowerCase()}</div>
            <h4 className="j-card-title">{c.title}</h4>
            <p className="j-card-desc">{c.desc}</p>
            <span className="j-card-foot">Read the teardown →</span>
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <a className="j-link j-small" href="#" style={{ fontFamily: 'var(--sans)' }}>See all teardowns →</a>
      </div>

      <div id="s5-submit" style={{ marginTop: 96, maxWidth: 720 }}>
        <h3 className="j-h3">Submit your site.</h3>
        <p className="j-body" style={{ maxWidth: 520, marginTop: 16 }}>
          If the teardown gets published, it gets published under your name. No paywall,
          no lead magnet, no call required to read it.
        </p>

        <form style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 560 }}
              onSubmit={(e) => e.preventDefault()}>
          <div className="j-field">
            <label className="j-field-label">Your site</label>
            <input className="j-input" type="url" placeholder="https://" />
          </div>
          <div className="j-field">
            <label className="j-field-label">Your email</label>
            <input className="j-input" type="email" placeholder="you@domain.com" />
          </div>
          <div className="j-field">
            <label className="j-field-label">What you sell, in one sentence</label>
            <textarea className="j-textarea" rows="2" />
          </div>
          <div style={{ marginTop: 8 }}>
            <button className="j-cta j-cta--warm" type="submit">Submit for teardown →</button>
          </div>
        </form>
      </div>
    </Section>
  );
}

Object.assign(window, { S5 });
