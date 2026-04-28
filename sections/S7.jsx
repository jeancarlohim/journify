/* journify.ai — S7 Sprint ask (two phases, closing block, CTA + secondary link) */

function S7({ data }) {
  if (!data) return null;
  return (
    <Section id="s7" label="S7 Sprint ask" width={720}>
      <h2 className="j-h2">{data.headline}</h2>

      <h4 className="j-h4" style={{ marginTop: 32 }}>{data.phase1Heading}</h4>
      <p className="j-body" style={{ marginTop: 16 }}>{data.phase1Body}</p>

      <h4 className="j-h4" style={{ marginTop: 32 }}>{data.phase2Heading}</h4>
      <p className="j-body" style={{ marginTop: 16 }}>{data.phase2Body}</p>

      <p className="j-body" style={{ marginTop: 40 }}>
        {data.closingLine1}<br />
        {data.closingLine2}
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
