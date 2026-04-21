/* journify.ai — S7 Sprint ask */

function S7({ data }) {
  if (!data) return null;
  return (
    <Section id="s7" label="S7 Sprint ask" width={720}>
      <h2 className="j-h2">{data.headline}</h2>
      <p className="j-body" style={{ maxWidth: 520, marginTop: 24 }}>
        {data.body1}
      </p>
      <p className="j-body" style={{ maxWidth: 520, marginTop: 24 }}>
        {data.body2}
      </p>
      <div style={{ marginTop: 32 }}>
        <a className="j-cta j-cta--hot" href={data.cta.href}>{data.cta.label}</a>
      </div>
      <div style={{ marginTop: 12 }}>
        <a className="j-link j-small" href={data.link.href} style={{ fontFamily: 'var(--sans)' }}>{data.link.label}</a>
      </div>
    </Section>
  );
}

Object.assign(window, { S7 });
