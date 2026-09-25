/* journify.ai — S4 The Work (3 columns, multi-paragraph + section closer)
   Under each column: a real capture of the product that does that part of the work
   (the same captures /tools shows). Click opens it in the Lightbox. */

function S4Figure({ fig, onOpen }) {
  if (!fig) return null;
  return (
    <figure style={{ margin: '28px 0 0' }}>
      <button
        type="button"
        onClick={() => onOpen(fig)}
        aria-label={'Enlarge: ' + fig.alt}
        style={{ display: 'block', width: '100%', padding: 0, border: '0.5px solid var(--border)',
                 background: 'transparent', cursor: 'zoom-in', textAlign: 'left' }}
      >
        <div style={{ height: 30, display: 'flex', alignItems: 'center', padding: '0 12px', borderBottom: '0.5px solid var(--border)' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--placeholder)', letterSpacing: '0.04em' }}>{fig.chrome}</span>
        </div>
        <img src={fig.src} alt={fig.alt} loading="lazy"
             style={{ width: '100%', aspectRatio: fig.ratio, objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
      </button>
    </figure>
  );
}

function S4({ data }) {
  const [open, setOpen] = React.useState(null);
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
            <S4Figure fig={c.figure} onOpen={setOpen} />
          </div>
        ))}
      </div>
      {data.figureNote && <p className="j-cap" style={{ marginTop: 12, color: 'var(--text-2)' }}>{data.figureNote}</p>}
      <div style={{ marginTop: 64, maxWidth: 900 }}>
        {data.closer.map((p, i) => (
          <p key={i} className="j-body" style={{ marginTop: i === 0 ? 0 : 24 }}>{p}</p>
        ))}
      </div>
      {open && <Lightbox src={open.src} alt={open.alt} onClose={() => setOpen(null)} />}
    </Section>
  );
}

Object.assign(window, { S4 });
