/* journify.ai — ProofBlock (between S3 diagnosis and S5 diagram) */

function ProofBlock() {
  const stats = [
    { num: '21', label: 'days' },
    { num: '392', label: 'outreach touches' },
    { num: '30%', label: 'acceptance rate' },
    { num: '6', label: 'booked calls' },
  ];

  return (
    <Section id="proof" label="Proof Block" width={1080}>
      <h2 className="j-h2 j-proof-h2">The sprint results on LinkedIn.</h2>
      <div className="j-proof-grid">
        {stats.map((s, i) => (
          <div key={i} className="j-proof-stat">
            <div className="j-proof-num">{s.num}</div>
            <div className="j-proof-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <a className="j-proof-link" href="/case-studies/coaching">See the case study →</a>
      </div>
    </Section>
  );
}

Object.assign(window, { ProofBlock });
