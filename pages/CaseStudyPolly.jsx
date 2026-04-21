/* journify.ai — CaseStudyPolly page component */

function CaseStudyPolly() {
  const [d, setD] = React.useState(null);

  React.useEffect(() => {
    fetch('/content/case-study-polly.json').then(r => r.json()).then(setD);
  }, []);

  if (!d) return null;

  return (
    <>
      {/* cs-s1: Header block */}
      <Section id="cs-s1" label="CS S1 Header" width={1080} pt={140} pb={80}>
        <p className="j-meta">{d.meta}</p>
        <h1 className="j-h1" style={{ maxWidth: 900, marginTop: 16 }}>
          {d.headline}
        </h1>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 32 }}>
          {parseInline(d.intro.body1)}
        </p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 24 }}>
          {d.intro.body2}
        </p>
        <p className="j-body" style={{ maxWidth: 600, marginTop: 24 }}>
          {d.intro.body3}
        </p>
      </Section>

      {/* cs-s2: Honest note */}
      <Section id="cs-s2" label="CS S2 Honest note" width={720} pt={80} pb={80}>
        <h3 className="j-h3">{d.honestNote.heading}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 32 }}>
          {d.honestNote.paragraphs.map((p, i) => (
            <div key={i} className="j-q">
              <p className="j-body">{parseInline(p)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* cs-s3: What was broken */}
      <Section id="cs-s3" label="CS S3 What was broken" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.whatWasBroken.heading}</h2>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>
          {d.whatWasBroken.intro}
        </p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>
          {d.whatWasBroken.body1}
        </p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>
          {d.whatWasBroken.body2}
        </p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>
          {d.whatWasBroken.body3}
        </p>
        <div style={{ marginTop: 64, border: '0.5px solid var(--border)', padding: 24, background: 'var(--bg)' }}>
          <img src={d.whatWasBroken.image.src} alt={d.whatWasBroken.image.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          <p className="j-cap" style={{ marginTop: 12 }}>{d.whatWasBroken.image.caption}</p>
        </div>
      </Section>

      {/* cs-s4: What we actually did */}
      <Section id="cs-s4" label="CS S4 What we did" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.whatWeActuallyDid.heading}</h2>

        <div style={{ marginTop: 48 }}>
          <h3 className="j-h3">{d.whatWeActuallyDid.offerRebuild.heading}</h3>
          {d.whatWeActuallyDid.offerRebuild.paragraphs.map((p, i) => (
            <p key={i} className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{p}</p>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="j-h3">{d.whatWeActuallyDid.contentEngine.heading}</h3>
          {d.whatWeActuallyDid.contentEngine.paragraphs.map((p, i) => (
            <p key={i} className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{p}</p>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="j-h3">{d.whatWeActuallyDid.outreachMotion.heading}</h3>
          {d.whatWeActuallyDid.outreachMotion.paragraphs.map((p, i) => (
            <p key={i} className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{p}</p>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 className="j-h3">{d.whatWeActuallyDid.feedbackLoop.heading}</h3>
          {d.whatWeActuallyDid.feedbackLoop.paragraphs.map((p, i) => (
            <p key={i} className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{p}</p>
          ))}
        </div>

        <div style={{ marginTop: 64, border: '0.5px solid var(--border)', padding: 24, background: 'var(--bg)' }}>
          <img src={d.whatWeActuallyDid.image.src} alt={d.whatWeActuallyDid.image.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          <p className="j-cap" style={{ marginTop: 12 }}>{d.whatWeActuallyDid.image.caption}</p>
        </div>
      </Section>

      {/* cs-s5: The numbers */}
      <Section id="cs-s5" label="CS S5 Numbers" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.numbers.heading}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginTop: 48 }}>
          <p className="j-meta">Before</p>
          <p className="j-meta">After (21 days)</p>
          {d.numbers.rows.map((row, i) => (
            <React.Fragment key={i}>
              <p className="j-body">{row.before}</p>
              <p className="j-body">{row.after}</p>
            </React.Fragment>
          ))}
        </div>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 48 }}>
          {d.numbers.body}
        </p>
        <div style={{ marginTop: 64 }}>
          <div style={{ border: '0.5px solid var(--border)' }}>
            <img src={d.numbers.trackerImage.src} alt={d.numbers.trackerImage.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <p className="j-cap" style={{ marginTop: 12 }}>{d.numbers.trackerImage.caption}</p>
        </div>
      </Section>

      {/* cs-s6: What transferred */}
      <Section id="cs-s6" label="CS S6 What transferred" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.whatTransferred.heading}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginTop: 48 }}>
          <div>
            <h3 className="j-h3">{d.whatTransferred.transferHeading}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
              {d.whatTransferred.transferItems.map((item, i) => (
                <li key={i} className="j-body" style={{ marginBottom: 12 }}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="j-h3">{d.whatTransferred.adaptedHeading}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0' }}>
              {d.whatTransferred.adaptedItems.map((item, i) => (
                <li key={i} className="j-body" style={{ marginBottom: 12 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 48 }}>
          {d.whatTransferred.body}
        </p>
      </Section>

      {/* cs-s7: What this means for you */}
      <Section id="cs-s7" label="CS S7 What this means" width={720} pt={80} pb={80}>
        <h2 className="j-h2">{d.whatThisMeansForYou.heading}</h2>
        <p className="j-body" style={{ marginTop: 32 }}>
          {d.whatThisMeansForYou.body1}
        </p>
        <p className="j-body" style={{ marginTop: 32 }}>
          {d.whatThisMeansForYou.body2}
        </p>
        <div style={{ marginTop: 64, border: '0.5px solid var(--border)', padding: 24, background: 'var(--bg)' }}>
          <img src={d.whatThisMeansForYou.image.src} alt={d.whatThisMeansForYou.image.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          <p className="j-cap" style={{ marginTop: 12 }}>{d.whatThisMeansForYou.image.caption}</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <a className="j-cta j-cta--hot" href={d.whatThisMeansForYou.cta.href}>{d.whatThisMeansForYou.cta.label}</a>
        </div>
      </Section>

      {/* cs-s8: Footer meta */}
      <Section id="cs-s8" label="CS S8 Footer meta" width={720} pt={40} pb={120}>
        <p className="j-cap"><em>{d.footerMeta}</em></p>
      </Section>
    </>
  );
}

Object.assign(window, { CaseStudyPolly });
