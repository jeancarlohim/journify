/* /the-sprint — sections 1-5 */

const APPLY = "https://cal.com/jeancarlohim/apply-for-thesprint";

function Section({ id, label, children, width = 720, pt = 120, pb = 120, tone = "bg" }) {
  return (
    <section id={id} data-screen-label={label}
             style={{ padding: `${pt}px 48px ${pb}px`,
                      background: tone === "panel" ? "var(--panel)" : "var(--bg)" }}>
      <div style={{ maxWidth: width, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

/* ── S1 · Hero ───────────────────────────────────────── */
function S1() {
  return (
    <Section id="s1" label="S1 Hero" width={1040} pt={120} pb={108}>
      <p className="j-meta" style={{ marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 12 }}>
        For founders who sell their service on a call.
      </p>
      <p style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 13, letterSpacing: "0.10em",
                  textTransform: "uppercase", color: "var(--ox)", margin: "0 0 24px",
                  fontVariationSettings: "'opsz' 72" }}>
        The Sales Call Sprint
      </p>
      <h1 className="j-h1" style={{ maxWidth: 820, lineHeight: 1.08 }}>
        Most founders think they need more booked meetings.
      </h1>
      <p className="j-h2" style={{ marginTop: 20, maxWidth: 600, color: "var(--text-2)", fontWeight: 400 }}>
        Usually they need fewer guesses.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 48, flexWrap: "wrap" }}>
        <a className="j-cta j-cta--warm" href={APPLY}>Apply for the Sprint →</a>
        <span className="j-small" style={{ color: "var(--text-2)" }}>
          1/2 open slots. Application only.
        </span>
      </div>
    </Section>
  );
}

/* ── S2 · Opening scene ──────────────────────────────── */
function S2() {
  return (
    <Section id="s2" label="S2 Opening scene" width={680} pb={72}>
      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <p className="j-body j-measure">
          You know the feeling. One week you are all in on a new avatar. The next you are
          rewriting the offer page. Then a burst of posts and DMs for five days, then
          nothing for two weeks. A few calls come in, most don't close, and by Friday you
          are back to wondering what to change next.
        </p>
        <p className="j-body j-measure">
          The answers to every one of those questions are already sitting in your call recordings.
        </p>
        <p className="j-body j-measure">
          The Sales Call Sprint uses those recordings to stop the cycle in 45 days and
          start booking meetings with the right people. Predictably.
        </p>
        <p className="j-payoff" style={{ fontSize: 22, lineHeight: 1.5, maxWidth: 600 }}>
          And the meetings are not the goal. They are the proof that the guessing is stopping.
        </p>
        <div className="j-proofstrip">
          <span className="j-proofstrip-dot" />
          <p className="j-small" style={{ color: "var(--text-2)", margin: 0 }}>
            A coach booked <strong style={{ color: "var(--text)" }}>6 qualified calls in 21 days</strong>,
            from a LinkedIn profile that had never posted. <a className="j-link" href="#s7">See how it ran →</a>
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ── S3 · How it works ───────────────────────────────── */
function S3() {
  const beats = [
    { n: "01", h: "Your offer, built from your calls",
      b: "We start with your sales calls from your past clients and leads that did not close, then get on a workshop together where we spar over who you are genuinely best at helping and land on one ideal buyer. That session is where your offer, your positioning, and your packaging get set. You will be set to solve one urgent problem for one ideal buyer that can pay for your solution." },
    { n: "02", h: "Your conversations, in the feed and inbox",
      b: "Right now you write your own posts. You start some DMs. Sometimes. In the Sprint, we co-create posts and do DMs for you. The posts come out of your sales calls, so they sound like you and talk to the right person. Every DM we send is there to start a genuine conversation with someone who fits the buyer we defined. You drive it, with our guidance, until it becomes a booked call." },
    { n: "03", h: "Your sales calls, to close without pushing",
      b: "I train you personally to run the call better, to sell without pushing, so the person across from you can actually make a decision: a yes, a no, or a date. You will learn how to handle coffee chats that generate interest, consultative calls that lead to buyers, and a direct sales call when someone is interested in your offer. All without pushing, feeling salesy, or pretending to be someone you are not." },
    { n: "04", h: "Your specialist, running it daily",
      b: "A trained specialist will find your ideal clients in your network and Sales Navigator, score them and connect with them. Then she will start conversations using scripts we have created together. This is 100% done for you so you only show up when someone is interested in your offer. No time wasted on cold conversations that go nowhere. At the end of the Sprint, we hire and train your own specialist so the whole thing keeps running without you having to start over." },
    { n: "05", h: "Your system that learns from every call",
      b: "A booked call is not the end. It is where everything begins. With each call we learn what content resonates and with whom. We learn which conversations created the most meetings. You learn how to ask better questions that lead to better closes. Every call teaches the content, the DMs, and you. The business gets clearer with every call you take." },
  ];
  return (
    <Section id="s3" label="S3 How it works" width={1040} tone="panel">
      <h2 className="j-h2" style={{ maxWidth: 760 }}>Where the guessing stops.</h2>
      <div className="j-beats" style={{ marginTop: 56 }}>
        {beats.map((x) => (
          <div key={x.n} className="j-beat">
            <div className="j-beat-n">{x.n}</div>
            <div className="j-beat-body">
              <h3 className="j-h3">{x.h}</h3>
              <p className="j-body" style={{ marginTop: 12, maxWidth: 640 }}>{x.b}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── S4 · The 45 days ────────────────────────────────── */
function S4() {
  const stages = [
    { range: "Days 1 to 10", h: "Your offer is set",
      b: "We listen to your calls, look at your past clients and leads that did not close, and run a workshop to land on one ideal buyer. By day 10 you have one offer written, a rebuilt LinkedIn profile, and every surface a buyer reads rebuilt around the same message. You stop wondering what to say, who to talk to, and what to offer." },
    { range: "Days 11 to 35", h: "The calendar starts moving",
      b: "We turn it on. You approve pre-written posts, the specialist connects with the right people and sends DMs to them, replies come back. You get the first meetings on your calendar. Every call you take gets reviewed and what the buyer said goes straight into the next week's content and conversations. Each week you learn more about who you serve, what to say, and what you offer." },
    { range: "Days 36 to 45", h: "The right people show up",
      b: "By now we have had three weeks of conversations. The right people show up on your calendar. They fit the buyer we defined. Your dedicated specialist runs the daily work. Posts go up, DMs go out, and you are not spending days writing or wondering what to send. The objections you hear are real ones, budget, timing, fit, not \"I need to think about it.\" You are not wondering what to change. You just take the meetings and we keep learning from every call." },
  ];
  return (
    <Section id="s4" label="S4 The 45 days" width={1100}>
      <h2 className="j-h2">The 45 days, stage by stage.</h2>
      <div className="j-stages" style={{ marginTop: 56 }}>
        {stages.map((s, i) => (
          <div key={i} className="j-stage">
            <div className="j-stage-rule" />
            <p className="j-meta" style={{ color: "var(--ox)" }}>Stage {i + 1}</p>
            <p className="j-stage-range">{s.range}</p>
            <h3 className="j-h3" style={{ marginTop: 14 }}>{s.h}</h3>
            <p className="j-body" style={{ marginTop: 12 }}>{s.b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── S5 · What's included ────────────────────────────── */
function S5() {
  const assets = [
    "Your Journify Offer, written from your best clients' own pains, desires, and goals.",
    "Your positioning, a rewritten LinkedIn profile ready to use on your website.",
    "Your 45-day content library and DM scripts, built to support your offer and positioning.",
    "Your personalized Journify ICP Scorer to find the right people faster on LinkedIn.",
    "Access to the Journify DMs App to run conversations without losing the thread.",
    "Your trained specialist, placed inside your business to handle the daily work that needs to happen.",
    "Feedback on every sales call you took in the 45 days.",
  ];
  const skills = [
    { name: "Content Skill", b: "Turns sales calls into weeks of content." },
    { name: "DM Opener Skill", b: "Creates openers that make them want to talk to you." },
    { name: "DM Discovery Skill", b: "Helps you guide the conversation toward a booked call." },
  ];
  return (
    <Section id="s5" label="S5 What you own" width={1100} tone="panel">
      <h2 className="j-h2">What you own by Day 45.</h2>
      <p className="j-body" style={{ marginTop: 20, maxWidth: 640 }}>
        When the Sprint ends, none of this goes with us.
      </p>

      <ul className="j-dfy" style={{ marginTop: 40 }}>
        {assets.map((a, i) => (
          <li key={i} className="j-dfy-item">
            <span className="j-dfy-mark" />
            <p className="j-body" style={{ margin: 0 }}>{a}</p>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 64, borderTop: "0.5px solid var(--border)", paddingTop: 40 }}>
        <p className="j-meta" style={{ marginBottom: 24 }}>Bonus: Claude Skills</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 680 }}>
          {skills.map((s) => (
            <div key={s.name}>
              <p className="j-body" style={{ margin: 0 }}>
                <strong>{s.name}</strong> — {s.b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 56 }}>
        <a className="j-cta j-cta--warm" href={APPLY}>Apply for the Sprint →</a>
      </div>
    </Section>
  );
}

Object.assign(window, { APPLY, Section, S1, S2, S3, S4, S5 });
