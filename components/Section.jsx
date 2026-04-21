/* journify.ai — Section wrapper + parseInline utility */

function parseInline(str) {
  if (!str) return null;
  const parts = str.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return React.createElement('strong', { key: i }, p.slice(2, -2));
    if (p.startsWith('*') && p.endsWith('*')) return React.createElement('em', { key: i }, p.slice(1, -1));
    return p;
  });
}

function Section({ id, label, children, width = 720, pt = 120, pb = 120 }) {
  return (
    <section id={id} data-screen-label={label} style={{ padding: `${pt}px 48px ${pb}px` }}>
      <div style={{ maxWidth: width, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

Object.assign(window, { Section, parseInline });
