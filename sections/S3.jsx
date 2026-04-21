/* journify.ai — S3 Diagnosis (accordion) */

function S3({ data }) {
  if (!data) return null;
  return (
    <Section id="s3" label="S3 Diagnosis" width={1080}>
      <h2 className="j-h2" style={{ maxWidth: 900 }}>{data.headline}</h2>
      <div style={{ marginTop: 32 }}>
        <Accordion rows={data.rows} />
      </div>
    </Section>
  );
}

Object.assign(window, { S3 });
