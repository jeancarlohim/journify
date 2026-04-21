/* journify.ai — S6CaseStudyAnchor (homepage link below S6) */

function S6CaseStudyAnchor({ data }) {
  if (!data) return null;
  return (
    <Section id="s6-anchor" label="Case study anchor" width={720} pt={40} pb={40}>
      <div style={{ textAlign: 'center' }}>
        <a className="j-link j-body" href={data.href}>{data.text}</a>
      </div>
    </Section>
  );
}

Object.assign(window, { S6CaseStudyAnchor });
