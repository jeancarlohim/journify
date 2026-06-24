/* journify.ai — S8 Founder block + FAQ + final CTA */

function S8({ data }) {
  if (!data) return null;
  return (
    <Section id="s8" label="S8 Founder + FAQ" width={1080} pb={160}>
      {/* Founder */}
      <div style={{ maxWidth: 720 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <img
              src={data.founder.image.src}
              alt={data.founder.image.alt}
              width="200"
              height="200"
              style={{ display: 'block', width: '100%', maxWidth: '200px', height: 'auto' }}
            />
          </div>
          <div>
            <h3 className="j-h3">{data.founderHeadline}</h3>
            {data.founder.story.map((para, i) => (
              <p key={i} className="j-body" style={{ maxWidth: 520, marginTop: i === 0 ? 24 : 16 }}>{para}</p>
            ))}
          </div>
        </div>

        {/* Brand lessons: large logo + lesson beside each */}
        <div className="j-founder-lessons" style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
          {data.founder.logos.map((logo, i) => (
            <div
              key={i}
              style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: 28, alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', height: 40 }}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ display: 'block', height: 36, width: 'auto', maxWidth: 150, objectFit: 'contain' }}
                />
              </div>
              <p className="j-body" style={{ margin: 0, color: 'var(--text-2)' }}>{logo.lesson}</p>
            </div>
          ))}
        </div>

        <p className="j-body" style={{ maxWidth: 640, marginTop: 40 }}>{data.founder.closer}</p>
        <p className="j-meta" style={{ marginTop: 16 }}>{data.founder.location}</p>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 96, maxWidth: 1080 }}>
        <h2 className="j-h2">{data.faqHeadline}</h2>
        <div style={{ marginTop: 32 }}>
          <Accordion rows={data.faq} />
        </div>
      </div>

      {/* Post-FAQ close */}
      <div style={{ marginTop: 96, textAlign: 'center' }}>
        <p className="j-payoff" style={{ maxWidth: 580, margin: '0 auto' }}>
          {data.payoff}
        </p>
        <div style={{ marginTop: 32 }}>
          <a className="j-cta j-cta--hot" href={data.cta.href}>{data.cta.label}</a>
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { S8 });
