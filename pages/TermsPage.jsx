/* journify.ai — TermsPage */

function TermsPage() {
  const [d, setD] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/terms.json').then(r => r.json()).then(setD);
  }, []);

  if (!d) return null;

  return (
    <>
      <Section id="legal-header" label="Header" width={720} pt={140} pb={40}>
        <p className="j-meta">{d.meta}</p>
        <h1 className="j-h1" style={{ marginTop: 16 }}>{d.title}</h1>
        <p className="j-cap" style={{ marginTop: 24 }}>{d.lastUpdated}</p>
      </Section>

      <Section id="legal-intro" label="Intro" width={720} pt={20} pb={40}>
        <p className="j-body">{d.intro.bodyLine1}</p>
        <p className="j-body" style={{ marginTop: 16 }}>{d.intro.bodyLine2}</p>
      </Section>

      {d.sections.map((s, i) => (
        <Section key={i} id={`legal-${i}`} label={s.heading} width={720} pt={40} pb={40}>
          <h2 className="j-h2">{s.heading}</h2>
          {Object.keys(s).filter(k => k.startsWith('bodyLine')).map((key, j) => (
            <p key={j} className="j-body" style={{ marginTop: j === 0 ? 24 : 16 }}>
              {s[key]}
            </p>
          ))}
        </Section>
      ))}
    </>
  );
}

Object.assign(window, { TermsPage });
