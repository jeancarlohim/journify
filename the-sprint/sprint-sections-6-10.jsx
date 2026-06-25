/* /the-sprint — sections 6-10 + footer */

/* ── shared Accordion (FAQ) ─────────────────────────── */
function AccRow({ q, a, open, onToggle }) {
  const ref = React.useRef(null);
  return (
    <div className={`j-acc-row ${open ? "is-open" : ""}`}>
      <button className="j-acc-head" type="button" onClick={onToggle} aria-expanded={open}>
        <span className="j-acc-title">{q}</span>
        <span className="j-acc-ind">{open ? "−" : "+"}</span>
      </button>
      <div className="j-acc-body" ref={ref}
           style={{ maxHeight: open ? (ref.current ? ref.current.scrollHeight : 800) : 0 }}>
        <div className="j-acc-body-inner">
          <p className="j-body">{a}</p>
        </div>
      </div>
    </div>
  );
}
function Acc({ rows }) {
  const [open, setOpen] = React.useState(null);
  return (
    <div className="j-acc">
      {rows.map((r, i) => (
        <AccRow key={i} q={r.q} a={r.a} open={open === i}
                onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  );
}

/* ── S6 · What it costs ──────────────────────────────── */
function S6() {
  return (
    <Section id="s6" label="S6 Commitment" width={860}>
      <h2 className="j-h2">What we commit to.</h2>

      <div className="j-commit" style={{ marginTop: 40 }}>
        <p className="j-commit-lead">
          5 to 10 booked qualified meetings in 45 days if you have a warm network.
          3 to 5 if you are fully cold.
        </p>
        <p className="j-commit-body">
          If we do not hit that by day 45, I keep going. The conversations keep going,
          posts keep going up, and we keep reviewing your calls until the meetings show up.
        </p>
      </div>

      <p className="j-body j-measure" style={{ marginTop: 36 }}>
        I run two Sprints at a time. When they are full, they are full.
      </p>
      <div style={{ marginTop: 36 }}>
        <a className="j-cta j-cta--warm" href={APPLY}>Apply for the Sprint →</a>
      </div>
    </Section>
  );
}

/* ── S7 · Proof (Polly) ──────────────────────────────── */
function S7() {
  const stats = [
    { n: "6", l: "booked qualified calls in 21 days" },
    { n: "28%", l: "reply rate on warm conversations" },
    { n: "5% → 30%", l: "connection acceptance rate" },
    { n: "~16k", l: "impressions from a profile that had never posted" },
  ];
  return (
    <Section id="s7" label="S7 Proof" width={1040} tone="panel">
      <p className="j-meta" style={{ color: "var(--ox)", marginBottom: 18 }}>How it actually ran</p>
      <h2 className="j-h2" style={{ maxWidth: 760 }}>
        A career coach in the Netherlands. Empty profile, no posting history, a
        pipeline that ran on referrals.
      </h2>

      <div className="j-statbar">
        {stats.map((s, i) => (
          <div key={i} className="j-stat">
            <div className="j-stat-n">{s.n}</div>
            <div className="j-stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      <p className="j-body j-measure" style={{ marginTop: 44 }}>
        All of it came from her own sales call recordings, in 21 days. None of the six
        came from the network she already had.
      </p>
      <p className="j-body j-measure" style={{ marginTop: 18, color: "var(--text-2)" }}>
        You are not her. Your numbers will be different. What the numbers show is the
        same: when the guessing stops, the right people start showing up.
      </p>
      <div style={{ marginTop: 24 }}>
        <a className="j-link" href="/case-studies/coaching">Read how it actually ran →</a>
      </div>
    </Section>
  );
}

/* ── S8 · Who is behind it ───────────────────────────── */
function S8() {
  return (
    <Section id="s8" label="S8 Founder" width={1040}>
      <div className="j-founder">
        <img src="/images/founder.png" alt="Jean Carlo Him, founder of Journify" className="j-founder-ph" style={{ objectFit: "cover", objectPosition: "top", display: "block" }} />
        <div className="j-founder-body">
          <h2 className="j-h2">Who is behind it.</h2>
          <p className="j-body j-measure" style={{ marginTop: 24 }}>
            My first job was a call center. I almost got fired two months in.
          </p>
          <p className="j-body j-measure" style={{ marginTop: 18 }}>
            What saved me was sitting down with my own call recordings and listening back. I was not the most talented, but I wanted to get better.
          </p>
          <p className="j-body j-measure" style={{ marginTop: 18 }}>
            So I learned from my own calls until I became the best agent in the account within a year. That is the whole idea behind Journify.
          </p>
          <p className="j-body j-measure" style={{ marginTop: 18 }}>
            Since then: global CRM at adidas, $80M in enterprise B2B closed by my team at Dell, Customer Journey Expert at Heineken. Based in Rotterdam.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 36, marginTop: 32, flexWrap: "wrap" }}>
            <img src="/images/adidas.png" alt="adidas" style={{ height: 36, objectFit: "contain", opacity: 0.75 }} />
            <img src="/images/dell.png" alt="Dell" style={{ height: 36, objectFit: "contain", opacity: 0.75 }} />
            <img src="/images/heineken.jpeg" alt="Heineken" style={{ height: 36, objectFit: "contain", opacity: 0.75 }} />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── S9 · FAQ ────────────────────────────────────────── */
function S9() {
  const faq = [
    { q: "How much of my time does this actually take?",
      a: "Week one is the heavy one: a workshop to land the offer, plus sending me your sales call recordings and what you know about your past clients. After that it is two to three hours a week. You review what I send, take the conversations worth taking, and show up to the calibration calls. Once meetings start booking, you are mostly just taking the meetings." },
    { q: "Who is this for?",
      a: "Founders who sell their service on a call and still close their own deals. Coaches, consultants, and agencies, solo or small teams. If one or two new clients a quarter would change your year, and your buyer pays you around 1,500 euro a month or more, you are in the right place." },
    { q: "Who runs the conversations on my LinkedIn?",
      a: "A trained specialist works on your account, under your name, with your review. Not a Journify account, not a fake profile, yours. The profile and the scripts are set before anything goes out, and the replies come straight to you. Nothing happens in a black box, and by the end you have a trained person inside your business who can keep it running." },
    { q: "What if I don't get the meetings?",
      a: "The promise is 5 to 10 booked qualified meetings if you have a warm network, 3 to 5 if you are fully cold. If we do not hit that by day 45, I keep going. The conversations keep going, I keep writing the posts, and we keep reviewing your calls until the meetings show up." },
    { q: "What do I keep after the 45 days?",
      a: "Everything. The offer, the rewritten profile and site, the content, the Journify tools, the trained specialist placed in your business, and the sales-call learning system that keeps improving your offer and your conversations from every new call. The work does not run itself, so if you want it to keep moving with me there is an option for that. If not, you have a running system in your business and a person to operate it." },
  ];
  return (
    <Section id="s9" label="S9 FAQ" width={860}>
      <h2 className="j-h2">Before you apply.</h2>
      <div style={{ marginTop: 40 }}>
        <Acc rows={faq} />
      </div>
    </Section>
  );
}

/* ── S10 · In a nutshell + how to join ───────────────── */
function S10() {
  const recap = [
    { s: "Stage 1", b: "We listen to your calls and run a workshop to land one offer, then rebuild every surface around it." },
    { s: "Stage 2", b: "Posts go up, DMs go out, the first meetings land. Every call feeds the next week." },
    { s: "Stage 3", b: "The right people show up. Real objections. A calendar that moves on a rhythm you can count on." },
  ];
  const steps = [
    "Click apply and book a fit call.",
    "We look at your current calls, offer, and conversations together.",
    "If it is a fit, we start.",
  ];
  return (
    <Section id="s10" label="S10 Join" width={1040} tone="panel" pb={160}>
      <div className="j-join">
        <h2 className="j-h2" style={{ maxWidth: 640 }}>
          The Sales Call Sprint is application only.
        </h2>
        <ol className="j-steps">
          {steps.map((s, i) => (
            <li key={i} className="j-step">
              <span className="j-step-n">{i + 1}</span>
              <p className="j-body" style={{ margin: 0 }}>{s}</p>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <a className="j-cta j-cta--warm" href={APPLY}>Apply for the Sprint →</a>
          <span className="j-small" style={{ color: "var(--text-2)" }}>
            1/2 open slots. Application only.
          </span>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: "0.5px solid var(--border)", padding: "48px 48px 64px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div className="j-nav-brand">journify</div>
        <div style={{ fontFamily: "var(--sans)", fontSize: 12, color: "var(--text-2)" }}>© 2026 Journify · Rotterdam</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Acc, AccRow, S6, S7, S8, S9, S10, Footer });
