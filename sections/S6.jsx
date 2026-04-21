/* journify.ai — S6 System diagram (scroll-triggered animation) */

function S6({ devPhase, data }) {
  const [phase, setPhase] = React.useState('init');
  const ref = React.useRef(null);
  const firedRef = React.useRef(false);

  React.useEffect(() => {
    if (devPhase) { setPhase(devPhase === 'R' ? 'F' : devPhase); return; }
    const el = ref.current;
    if (!el) return;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          if (prefersReduce) { setPhase('F'); return; }
          setPhase('0');
          const t1 = setTimeout(() => setPhase('1'), 900);
          const t2 = setTimeout(() => setPhase('2'), 2600);
          const t3 = setTimeout(() => setPhase('3'), 3400);
          const t4 = setTimeout(() => setPhase('F'), 6800);
          return () => { [t1,t2,t3,t4].forEach(clearTimeout); };
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [devPhase]);

  if (!data) return null;

  return (
    <Section id="s6" label="S6 System" width={1080}>
      <h2 className="j-h2" style={{ maxWidth: 900 }}>
        {data.headline}
      </h2>
      <div ref={ref} style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
        <S6Diagram phase={phase === 'init' ? '0' : phase} />
      </div>
      <p className="j-payoff" style={{ textAlign: 'center', maxWidth: 580, margin: '20px auto 0' }}>
        {data.payoff}
      </p>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <a className="j-link" href={data.link.href}>{data.link.label}</a>
      </div>
    </Section>
  );
}

Object.assign(window, { S6 });
