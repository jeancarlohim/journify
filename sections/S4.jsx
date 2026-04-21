/* journify.ai — S4 Three columns */

function S4({ data }) {
  if (!data) return null;
  return (
    <Section id="s4" label="S4 Three columns" width={1080}>
      <h2 className="j-h2">{data.headline}</h2>
      <div className="j-s4-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 48 }}>
        {data.cols.map((c, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 className="j-h3">{c.h}</h3>
            <p className="j-body">{c.body}</p>
            <div style={{ marginTop: 8 }}>
              <p className="j-small" style={{ color: 'var(--text-2)', fontStyle: 'italic', marginBottom: 6 }}>Fixes:</p>
              {c.fixes.map((f, j) => (
                <p key={j} className="j-small" style={{ color: 'var(--text-2)', fontStyle: 'italic', marginBottom: 4 }}>
                  {c.fixes.length > 1 ? '— ' : ''}{f}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { S4 });
