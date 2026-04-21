/* journify.ai — S8 Founder + FAQ */

function S8({ data }) {
  if (!data) return null;
  return (
    <Section id="s8" label="S8 Founder + FAQ" width={1080} pb={160}>
      {/* Founder */}
      <div style={{ maxWidth: 720 }}>
        <h3 className="j-h3">{data.founderHeadline}</h3>
        <p className="j-body" style={{ maxWidth: 520, marginTop: 16 }}>
          {data.founderBody1}
        </p>
        <p className="j-body" style={{ maxWidth: 520, marginTop: 16 }}>
          {data.founderBody2}
        </p>
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
