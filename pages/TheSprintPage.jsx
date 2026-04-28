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
        <h1 className="j-h1" style={{ marginTop: 16 }}>
          {d.s1.headlineLine1}<br />
          {d.s1.headlineLine2Pre}
          <span style={{ color: 'var(--ox)' }}>{d.s1.headlineEmphasis}</span>
          {d.s1.headlineLine2Post}
        </h1>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 32 }}>{d.s1.bodyLine1}</p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 8 }}>{d.s1.bodyLine2}</p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 8 }}>{d.s1.bodyLine3}</p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 8 }}>{d.s1.bodyLine4}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 40 }}>
          <a className="j-cta j-cta--hot" href={d.s1.ctaPrimary.href}>{d.s1.ctaPrimary.label}</a>
        </div>
      </Section>

      {/* s2: Diagnosis */}
      <Section id="s2" label="SP S2 Diagnosis" width={720} pt={80} pb={80}>
        <h2 className="j-h2">{d.s2.headlineLine1}</h2>
        <h2 className="j-h2" style={{ marginTop: 4, color: 'var(--ox)' }}>{d.s2.headlineLine2}</h2>
        <p className="j-body" style={{ marginTop: 32 }}>{d.s2.bodyLine1}</p>
        <p className="j-body" style={{ marginTop: 8 }}>{d.s2.bodyLine2}</p>
        <p className="j-body" style={{ marginTop: 8 }}>{d.s2.bodyLine3}</p>
        <p className="j-body" style={{ marginTop: 8 }}>{d.s2.bodyLine4}</p>
        <p className="j-body" style={{ marginTop: 8 }}>{d.s2.bodyLine5}</p>
        <p className="j-body" style={{ marginTop: 8 }}>{d.s2.bodyLine6}</p>
      </Section>

      {/* s3: Three pillars (vertical stack) */}
      <Section id="s3" label="SP S3 Pillars" width={1080} pt={80} pb={80}>
        <h2 className="j-h2" style={{ maxWidth: 900 }}>{d.s3.headline}</h2>
        {d.s3.pillars.map((p, i) => (
          <div key={i} style={{ marginTop: i === 0 ? 64 : 96, maxWidth: 720 }}>
            <h3 className="j-h3">{p.heading}</h3>
            {p.bodies.map((body, j) => (
              <p key={j} className="j-body" style={{ marginTop: j === 0 ? 24 : 16 }}>{body}</p>
            ))}
            <ul style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }}>
              {p.items.map((item, k) => (
                <li key={k} className="j-body" style={{ marginBottom: 8 }}>— {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      {/* s4: How the 45 days run */}
      <Section id="s4" label="SP S4 Stages" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s4.headline}</h2>
        {d.s4.stages.map((stage, i) => (
          <div key={i} style={{ marginTop: i === 0 ? 64 : 80, maxWidth: 720 }}>
            <p className="j-meta">{stage.meta}</p>
            <h3 className="j-h3" style={{ marginTop: 12 }}>{stage.heading}</h3>
            {stage.bodies.map((body, j) => (
              <p key={j} className="j-body" style={{ marginTop: j === 0 ? 24 : 16 }}>{body}</p>
            ))}
            <p className="j-small" style={{ fontStyle: 'italic', color: 'var(--text-2)', marginTop: 32 }}>
              <strong>You:</strong> {stage.youLine}
            </p>
            <p className="j-small" style={{ fontStyle: 'italic', color: 'var(--text-2)', marginTop: 16 }}>
              <strong>Me:</strong> {stage.meLine}
            </p>
          </div>
        ))}
      </Section>

      {/* s5: What's included */}
      <Section id="s5" label="SP S5 Included" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s5.headline}</h2>
        <div className="j-s5-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px 48px', marginTop: 48 }}>
          {d.s5.groups.map((group, i) => (
            <div key={i}>
              <p className="j-meta">{group.heading}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
                {group.items.map((item, j) => (
                  <li key={j} className="j-body" style={{
                    borderTop: j === 0 ? '0.5px solid var(--border)' : '0',
                    borderBottom: '0.5px solid var(--border)',
                    padding: '14px 0',
                    lineHeight: 1.55
                  }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* s6: Rotterdam block (replaces mechanism) */}
      <Section id="s6" label="SP S6 Rotterdam" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s6.headlineLine1}</h2>
        <h2 className="j-h2" style={{ marginTop: 4, color: 'var(--ox)' }}>{d.s6.headlineLine2}</h2>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 32 }}>{d.s6.bodyLine1}</p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 16 }}>{d.s6.bodyLine2}</p>
        <div style={{ marginTop: 24 }}>
          <a className="j-link" href={d.s6.link.href}>{d.s6.link.label}</a>
        </div>
      </Section>

      {/* s7: FAQ */}
      <Section id="s7" label="SP S7 FAQ" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.s7.headline}</h2>
        <div style={{ marginTop: 32 }}>
          <Accordion rows={d.s7.faq} />
        </div>
      </Section>

      {/* s8: Final close */}
      <Section id="s8" label="SP S8 CTA" width={720} pt={80} pb={160}>
        <p className="j-payoff" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
          {d.s8.payoff}
        </p>
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <a className="j-cta j-cta--hot" href={d.s8.cta.href}>{d.s8.cta.label}</a>
        </div>
      </Section>
    </>
  );
}

Object.assign(window, { TheSprintPage });
