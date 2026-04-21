/* journify.ai — S1 Hero */

function S1({ data }) {
  if (!data) return null;
  return (
    <Section id="s1" label="S1 Hero" width={1200} pt={140} pb={140}>
      <h1 className="j-h1" style={{ maxWidth: 900 }}>
        {data.headline}
      </h1>
      <p className="j-body" style={{ maxWidth: 520, marginTop: 24, color: 'var(--text)' }}>
        {data.body}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 40 }}>
        <a className="j-cta j-cta--warm" href={data.ctaWarm.href}>{data.ctaWarm.label}</a>
        {/* TODO: restore "Download the 1-pager" cold CTA when 1-pager PDF is ready */}
      </div>
    </Section>
  );
}

Object.assign(window, { S1 });
