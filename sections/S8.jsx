/* journify.ai — S8 Founder block + FAQ + final CTA */

function S8({ data }) {
  if (!data) return null;
  return (
    <Section id="s8" label="S8 Founder + FAQ" width={1080} pb={160}>
      {/* Founder */}
      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48, alignItems: 'start', maxWidth: 720 }}>
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
          <div className="j-founder-logos" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            marginTop: 24,
            marginBottom: 32,
            flexWrap: 'wrap'
          }}>
            {data.founder.logos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                height="24"
                style={{ display: 'block', height: 24, width: 'auto', opacity: 0.8 }}
              />
            ))}
          </div>
          <p className="j-body" style={{ maxWidth: 520 }}>{data.founderBody1}</p>
          <p className="j-body" style={{ maxWidth: 520, marginTop: 16 }}>{data.founderBody2}</p>
        </div>
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
