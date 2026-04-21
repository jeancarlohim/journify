/* journify.ai — S1 Hero */

function S1({ data }) {
  if (!data) return null;
  return (
    <Section id="s1" label="S1 Hero" width={1200} pt={140} pb={140}>
      <div style={{ maxWidth: 900 }}>
        <h1 className="j-h1" style={{ fontSize: 72, lineHeight: 1.02, letterSpacing: '-0.03em' }}>
          "I need to think about it"
        </h1>
        <p className="j-h2" style={{ marginTop: 16, color: 'var(--text-2)', fontWeight: 400, letterSpacing: '-0.015em' }}>
          is not an objection.
        </p>
      </div>
      <p className="j-body" style={{ maxWidth: 520, marginTop: 32, color: 'var(--text)' }}>
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