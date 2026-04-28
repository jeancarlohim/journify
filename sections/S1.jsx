/* journify.ai — S1 Hero */

function S1({ data }) {
  if (!data) return null;
  return (
    <Section id="s1" label="S1 Hero" width={1200} pt={140} pb={140}>
      <h1 className="j-h1" style={{ maxWidth: 900 }}>
        {data.headlinePart1}
        <span style={{ color: 'var(--ox)' }}>{data.headlineEmphasis}</span>
        {data.headlinePart2}
        <br />
        {data.headlineLine2}
      </h1>
      <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>{data.bodyLine1}</p>
      <p className="j-body" style={{ maxWidth: 720, marginTop: 8 }}>{data.bodyLine2}</p>
      <p className="j-body" style={{ maxWidth: 720, marginTop: 8 }}>{data.bodyLine3}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 40, flexWrap: 'wrap' }}>
        <a className="j-cta j-cta--warm" href={data.ctaPrimary.href}>{data.ctaPrimary.label}</a>
        <a className="j-cta j-cta--cold" href={data.ctaSecondary.href}>{data.ctaSecondary.label}</a>
      </div>
    </Section>
  );
}

Object.assign(window, { S1 });
