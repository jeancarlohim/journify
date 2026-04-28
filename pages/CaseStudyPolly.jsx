/* journify.ai — CaseStudyPolly (cs-s1 through cs-s6) */

function CaseStudyPolly() {
  const [d, setD] = React.useState(null);

  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  React.useEffect(() => {
    fetch('/content/case-study-coaching.json').then(r => r.json()).then(setD);
  }, []);

  if (!d) return null;

  return (
    <>
      {/* cs-s1: Header + intro */}
      <Section id="cs-s1" label="CS S1 Header" width={1080} pt={80} pb={80}>
        <p className="j-meta">{d.meta}</p>
        <h1 className="j-h1" style={{ marginTop: 24 }}>
          6 booked calls in 21 days. From an <span style={{ color: 'var(--ox)' }}>empty</span> LinkedIn profile.
        </h1>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>{parseInline(d.intro.body1)}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{d.intro.body2}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{d.intro.body3}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{d.intro.body4}</p>
      </Section>

      {/* cs-s2: One thing before you read on */}
      <Section id="cs-s2" label="CS S2 Honest note" width={720} pt={80} pb={80}>
        <h3 className="j-h3">{d.honestNote.heading}</h3>
        {d.honestNote.paragraphs.map((p, i) => (
          <p key={i} className="j-body" style={{ marginTop: i === 0 ? 32 : 20 }}>{p}</p>
        ))}
      </Section>

      {/* cs-s3: What was broken */}
      <Section id="cs-s3" label="CS S3 What was broken" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.whatWasBroken.heading}</h2>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 32 }}>{d.whatWasBroken.intro}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 20 }}>{d.whatWasBroken.body1}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 20 }}>{d.whatWasBroken.body2}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 20 }}>{d.whatWasBroken.body3}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 20 }}>{d.whatWasBroken.body4}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 20 }}>{d.whatWasBroken.body5}</p>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 20 }}>{d.whatWasBroken.body6}</p>
        <div style={{ marginTop: 64, border: '0.5px solid var(--border)', padding: 24, background: 'var(--bg)' }}>
          <img src={d.whatWasBroken.image.src} alt={d.whatWasBroken.image.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          <p className="j-cap" style={{ marginTop: 12 }}>{d.whatWasBroken.image.caption}</p>
        </div>
      </Section>

      {/* cs-s4: What we actually did (3 pillars + loop close) */}
      <Section id="cs-s4" label="CS S4 What we did" width={1080} pt={80} pb={80}>
        <h2 className="j-h2">{d.whatWeActuallyDid.heading}</h2>
        <p className="j-body" style={{ maxWidth: 720, marginTop: 24 }}>{d.whatWeActuallyDid.intro}</p>

        {d.whatWeActuallyDid.pillars.map((pillar, i) => (
          <div key={i} style={{ marginTop: 64, maxWidth: 720 }}>
            <h3 className="j-h3">{pillar.heading}</h3>
            {pillar.paragraphs.map((p, j) => (
              <p key={j} className="j-body" style={{ marginTop: j === 0 ? 24 : 16 }}>{p}</p>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 80, maxWidth: 720 }}>
          <h3 className="j-h3">{d.whatWeActuallyDid.loop.heading}</h3>
          {d.whatWeActuallyDid.loop.paragraphs.map((p, j) => (
            <p key={j} className="j-body" style={{ marginTop: j === 0 ? 24 : 16 }}>{p}</p>
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
        <p className="j-body" style={{ maxWidth: 720, marginTop: 48 }}>{d.numbers.body}</p>
        <div style={{ marginTop: 64 }}>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="Enlarge sprint tracker screenshot"
            style={{
              display: 'block',
              width: '100%',
              padding: 0,
              border: '0.5px solid var(--border)',
              background: 'transparent',
              cursor: 'zoom-in'
            }}
          >
            <img
              src={d.numbers.trackerImage.src}
              alt={d.numbers.trackerImage.alt}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </button>
          <p className="j-cap" style={{ marginTop: 12 }}>
            {d.numbers.trackerImage.caption} <span style={{ color: 'var(--text-2)' }}>Click to enlarge.</span>
          </p>
        </div>
      </Section>

      {/* cs-s6: What this means for you */}
      <Section id="cs-s6" label="CS S6 What this means" width={720} pt={80} pb={120}>
        <h2 className="j-h2">{d.whatThisMeansForYou.heading}</h2>
        <p className="j-body" style={{ marginTop: 32 }}>{d.whatThisMeansForYou.body1}</p>
        <p className="j-body" style={{ marginTop: 20 }}>{d.whatThisMeansForYou.body2}</p>
        <p className="j-body" style={{ marginTop: 20 }}>{d.whatThisMeansForYou.body3}</p>
        <p className="j-body" style={{ marginTop: 20 }}>{d.whatThisMeansForYou.body4}</p>
        <div style={{ marginTop: 64, border: '0.5px solid var(--border)', padding: 24, background: 'var(--bg)' }}>
          <img src={d.whatThisMeansForYou.image.src} alt={d.whatThisMeansForYou.image.alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
          <p className="j-cap" style={{ marginTop: 12 }}>{d.whatThisMeansForYou.image.caption}</p>
        </div>
        <div style={{ marginTop: 48 }}>
          <a className="j-cta j-cta--hot" href={d.whatThisMeansForYou.cta.href}>{d.whatThisMeansForYou.cta.label}</a>
        </div>
        <p className="j-cap" style={{ marginTop: 64, fontStyle: 'italic' }}>{d.footerMeta}</p>
      </Section>

      {lightboxOpen && (
        <Lightbox
          src={d.numbers.trackerImage.src}
          alt={d.numbers.trackerImage.alt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}

Object.assign(window, { CaseStudyPolly });
