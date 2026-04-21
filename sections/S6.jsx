/* journify.ai — S6 System diagram (self-running animation, no scroll trigger) */

function S6({ data }) {
  if (!data) return null;
  return (
    <Section id="s6" label="S6 System" width={1080}>
      <h2 className="j-h2" style={{ maxWidth: 900, marginBottom: 48 }}>
        {data.headline}
      </h2>
      <S6Diagram data={data} />
    </Section>
  );
}

Object.assign(window, { S6 });