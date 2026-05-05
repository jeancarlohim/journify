/* journify.ai — S1 Hero */

function S1({ data }) {
  if (!data) return null;
  return (
    <Section id="s1" label="S1 Hero" width={1200} pt={140} pb={140}>
      <div className="j-s1-block">
        <div className="j-s1-inner">
          <h1 className="j-h1 j-s1-h1">
            {'Book 3-5 sales calls where'}
            <br className="j-s1-br" />
            {' prospects don\'t say'}
            <br className="j-s1-br" />
            <br className="j-s1-br-mobile" />
            {' "I need to '}
            <span style={{ color: 'var(--ox)' }}>think</span>
            {' about it"'}
          </h1>
          <p className="j-body j-s1-sub" style={{ marginTop: 32 }}>{data.subline}</p>
          <div className="j-s1-ctas" style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 40, flexWrap: 'wrap' }}>
            <a className="j-cta j-cta--warm" href={data.ctaPrimary.href}>{data.ctaPrimary.label}</a>
            <a className="j-cta j-cta--cold" href={data.ctaSecondary.href}>{data.ctaSecondary.label}</a>
          </div>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { S1 });
