/* journify.ai — S2 Scene (single column, no Thinker)
   The four lines appear the way a call recorder shows a transcript: one line at a time,
   character by character, when the section scrolls into view. Reduced motion, or a browser
   without IntersectionObserver, shows everything at once. Copy is untouched (homepage.json). */

const S2_MS_PER_CHAR = 18;
const S2_GAP_MS = 550;

const S2_CSS = `
  .j-q-rest { color: transparent; }
  .j-q-caret { display: inline-block; width: 2px; height: 0.85em; margin-left: 3px; vertical-align: -0.08em;
    background: var(--ox); animation: j-q-blink 900ms steps(2, start) infinite; }
  .j-q-attr.is-pending { opacity: 0; }
  .j-q-attr { transition: opacity 420ms var(--ease); }
  @keyframes j-q-blink { to { visibility: hidden; } }
  @media (prefers-reduced-motion: reduce) { .j-q-caret { animation: none; } .j-q-attr { transition: none; } }
`;

function S2({ data }) {
  const ref = React.useRef(null);
  const [elapsed, setElapsed] = React.useState(-1);   // ms since the reveal started; -1 = not started
  const reduced = React.useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  // one schedule for all lines: line i starts after every earlier line has finished, plus a pause
  const plan = React.useMemo(() => {
    if (!data) return [];
    let at = 0;
    return data.quotes.map((x) => {
      const plain = x.q.replace(/\*/g, '');
      const start = at, end = at + plain.length * S2_MS_PER_CHAR;
      at = end + S2_GAP_MS;
      return { plain, start, end };
    });
  }, [data]);
  const total = plan.length ? plan[plan.length - 1].end : 0;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !data) return undefined;
    if (reduced || !('IntersectionObserver' in window)) { setElapsed(total); return undefined; }
    let raf = 0, t0 = 0;
    const tick = (now) => {
      if (!t0) t0 = now;
      const e = now - t0;
      setElapsed(e);
      if (e < total) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { io.disconnect(); raf = requestAnimationFrame(tick); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [data, reduced, total]);

  if (!data) return null;
  return (
    <Section id="s2" label="S2 Scene" width={720}>
      <style>{S2_CSS}</style>
      <div ref={ref}>
        <h2 className="j-h2">{data.headline}</h2>
        {data.lead && <p className="j-body" style={{ marginTop: 16, color: 'var(--text-2)', maxWidth: 560 }}>{data.lead}</p>}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {data.quotes.map((x, i) => {
            const { plain, start, end } = plan[i];
            const done = elapsed >= end;
            const streaming = elapsed >= start && !done;
            const shown = streaming ? Math.floor((elapsed - start) / S2_MS_PER_CHAR) : 0;
            return (
              <div key={i} className="j-q">
                {done ? (
                  <p className="j-q-line">{parseInline(x.q)}</p>
                ) : (
                  <p className="j-q-line" aria-label={plain}>
                    <span aria-hidden="true">{plain.slice(0, shown)}</span>
                    {streaming && <span className="j-q-caret" aria-hidden="true" />}
                    <span className="j-q-rest" aria-hidden="true">{plain.slice(shown)}</span>
                  </p>
                )}
                <p className={'j-q-attr' + (done ? '' : ' is-pending')}>{x.a}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { S2 });
