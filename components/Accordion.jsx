/* journify.ai — Accordion component */

function AccordionRow({ q, a, open, onToggle }) {
  const bodyRef = React.useRef(null);
  return (
    <div className={`j-acc-row ${open ? 'is-open' : ''}`}>
      <button className="j-acc-head" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="j-acc-title">{q}</span>
        <span className="j-acc-ind">{open ? '−' : '+'}</span>
      </button>
      <div className="j-acc-body" ref={bodyRef}
           style={{ maxHeight: open ? (bodyRef.current ? bodyRef.current.scrollHeight : 600) : 0 }}>
        <div className="j-acc-body-inner">
          <p className="j-body">{a}</p>
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
