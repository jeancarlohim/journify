/* journify.ai — TheSprintPage */

function TheSprintPage() {
  const [d, setD] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/the-sprint.json').then(r => r.json()).then(setD);
  }, []);

  if (!d) return null;

  return (
    <>
      {/* s1: Hero */}
      <Section id="s1" label="SP S1 Hero" width={1080} pt={140} pb={80}>
        <p className="j-meta">{d.s1.meta}</p>
        <h1 className="j-h1" style={{ maxWidth: 900, marginTop: 16 }}>
          {d.s1.headline}
        </h1>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 32 }}>
          {d.s1.body1}
        </p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 24 }}>
          {d.s1.body2}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 40 }}>
          <a className="j-cta j-cta--hot" href={d.s1.cta.href}>{d.s1.cta.label}</a>
          {/* TODO: restore "Download the 1-pager" cold CTA when 1-pager PDF is ready */}
        </div>
      </Section>

      {/* s2: The problem */}
      <Section id="s2" label="SP S2 Problem" width={720} pt={80} pb={80}>
        <h2 className="j-h2">{d.s2.headline}</h2>
        <p className="j-body" style={{ marginTop: 32 }}>{d.s2.body1}</p>
        <p className="j-body" style={{ marginTop: 24 }}>{d.s2.body2}</p>
        <p className="j-body" style={{ marginTop: 24 }}>{d.s2.body3}</p>
        <p className="j-payoff" style={{ marginTop: 32 }}>{d.s2.payoff}</p>
      </Section>

      {/* s3: Three components */}
      <Section id="s3" label="SP S3 Components" width={1080} pt={80} pb={80}>
        <h2 className="j-h2" style={{ maxWidth: 900 }}>{d.s3.headline}</h2>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 24 }}>{d.s3.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 64 }}>
          {d.s3.components.map((c, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 className="j-h3">{c.heading}</h3>
              <p className="j-body">{c.body}</p>
              <p className="j-small" style={{ fontStyle: 'italic', marginTop: 16 }}>{c.leaveWith}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {c.items.map((item, j) => (
                  <li key={j} className="j-body" style={{ marginBottom: 8 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* s4: Three stages */}
      <Section id="s4" label="SP S4 Stages" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s4.headline}</h2>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 24 }}>{d.s4.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 64 }}>
          {d.s4.stages.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p className="j-meta">{s.meta}</p>
              <h3 className="j-h3">{s.heading}</h3>
              <p className="j-body">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* s5: What's included */}
      <Section id="s5" label="SP S5 Included" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s5.headline}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 48 }}>
          <div>
            <h3 className="j-h3">{d.s5.strategicHeading}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
              {d.s5.strategicItems.map((item, i) => (
                <li key={i} className="j-body" style={{ marginBottom: 12 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="j-h3">{d.s5.executionHeading}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
              {d.s5.executionItems.map((item, i) => (
                <li key={i} className="j-body" style={{ marginBottom: 12 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <h3 className="j-h3" style={{ marginTop: 64 }}>{d.s5.sessionsHeading}</h3>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 16 }}>{d.s5.sessionsBody}</p>
      </Section>

      {/* s6: Investment */}
      <Section id="s6" label="SP S6 Investment" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s6.headline}</h2>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>{d.s6.body1}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{d.s6.body2}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 64 }}>
          {d.s6.tiers.map((t, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p className="j-meta">{t.meta}</p>
              <h3 className="j-h2">{t.price}</h3>
              <p className="j-body">{t.body}</p>
            </div>
          ))}
        </div>
        <h3 className="j-h3" style={{ marginTop: 64 }}>{d.s6.retainerHeading}</h3>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 16 }}>{d.s6.retainerBody1}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 16 }}>{d.s6.retainerBody2}</p>
      </Section>

      {/* s7: The mechanism */}
      <Section id="s7" label="SP S7 Mechanism" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s7.headline}</h2>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>{d.s7.body1}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{d.s7.body2}</p>
        <div style={{ marginTop: 24 }}>
          <a className="j-link" href={d.s7.link.href}>{d.s7.link.label}</a>
        </div>
      </Section>

      {/* s8: FAQ */}
      <Section id="s8" label="SP S8 FAQ" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s8.headline}</h2>
        <div style={{ marginTop: 32 }}>
          <Accordion rows={d.s8.faq} />
        </div>
      </Section>

      {/* s9: Final CTA */}
      <Section id="s9" label="SP S9 CTA" width={720} pt={80} pb={160}>
        <p className="j-payoff" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
          {d.s9.payoff}
        </p>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a className="j-cta j-cta--hot" href={d.s9.cta.href}>{d.s9.cta.label}</a>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { TheSprintPage });
