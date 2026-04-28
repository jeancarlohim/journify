/* journify.ai — S2 Scene (single column, no Thinker) */

function S2({ data }) {
  if (!data) return null;
  return (
    <Section id="s2" label="S2 Scene" width={720}>
      <h2 className="j-h2">{data.headline}</h2>
      <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {data.quotes.map((x, i) => (
          <div key={i} className="j-q">
            <p className="j-q-line">{parseInline(x.q)}</p>
            <p className="j-q-attr">{x.a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { S2 });
