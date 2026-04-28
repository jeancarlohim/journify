/* journify.ai — S4 The Work (3 columns, multi-paragraph + section closer) */

function S4({ data }) {
  if (!data) return null;
  return (
    <Section id="s4" label="S4 The Work" width={1080}>
      <h2 className="j-h2">{data.headline}</h2>
      <div className="j-s4-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 48 }}>
        {data.cols.map((c, i) => (
          <div key={i}>
            <h3 className="j-h3">{c.h}</h3>
            {c.bodies.map((b, j) => (
              <p key={j} className="j-body" style={{ marginTop: j === 0 ? 24 : 16 }}>{b}</p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 64, maxWidth: 900 }}>
        {data.closer.map((p, i) => (
          <p key={i} className="j-body" style={{ marginTop: i === 0 ? 0 : 24 }}>{p}</p>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { S4 });
