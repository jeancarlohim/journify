/* journify.ai — Accordion component */

function AccordionRow({ q, a, open, onToggle }) {
  const items = Array.isArray(a) ? a : [a];
  return (
    <div className={`j-acc-row ${open ? 'is-open' : ''}`}>
      <button className="j-acc-head" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="j-acc-title">{q}</span>
        <span className="j-acc-ind">{open ? '−' : '+'}</span>
      </button>
      <div className="j-acc-body" style={{ maxHeight: open ? 2400 : 0 }}>
        <div className="j-acc-body-inner">
          {items.map((item, i) => (
            <p key={i} className="j-body" style={{ marginTop: i === 0 ? 0 : 16 }}>
              {parseInline(item)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function Accordion({ rows }) {
  const [open, setOpen] = React.useState(null);
  return (
    <div className="j-acc">
      {rows.map((r, i) => (
        <AccordionRow key={i} q={r.q} a={r.a}
                      open={open === i}
                      onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  );
}

Object.assign(window, { Accordion, AccordionRow });
