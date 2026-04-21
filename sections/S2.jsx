/* journify.ai — S2 Scene (quotes + Thinker) */

function S2({ data }) {
  if (!data) return null;
  return (
    <Section id="s2" label="S2 Scene" width={1080}>
      <div style={{ display: 'grid', gridTemplateColumns: '720px 1fr', gap: 48, alignItems: 'start' }}>
        <div style={{ maxWidth: 720 }}>
          <h2 className="j-h2">{data.headline}</h2>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {data.quotes.map((x, i) => (
              <div key={i} className="j-q">
                <p className="j-q-line">{x.q}</p>
                <p className="j-q-attr">{x.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="j-s2-rail" style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
          <Thinker />
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { S2 });
