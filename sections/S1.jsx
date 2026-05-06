/* journify.ai — S1 Hero */

function S1({ data }) {
  if (!data) return null;
  return (
    <Section id="s1" label="S1 Hero" width={1200} pt={140} pb={140}>
      <div className="j-s1-block">
        <div className="j-s1-inner">
          {data.audience && (
            <p className="j-meta j-s1-audience">{data.audience}</p>
          )}
          <h1 className="j-h1 j-s1-h1">
            {'Book '}<span className="j-num">3-5</span>{' qualified meetings'}
            <br className="dt-only" />
            {' without the "I need to '}
            <em className="think">think</em>
            {' about it"'}
            <br className="dt-only" />
            {' using your sales call recordings.'}
          </h1>
          <p className="j-body j-s1-sub" style={{ marginTop: 32 }}>{data.subline}</p>
          <div className="j-s1-ctas" style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 40, flexWrap: 'wrap' }}>
            <a className="j-cta j-cta--warm" href={data.ctaPrimary.href}>{data.ctaPrimary.label}</a>
            <a className="j-cta j-cta--cold" href={data.ctaSecondary.href}>{data.ctaSecondary.label}</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { S1 });
