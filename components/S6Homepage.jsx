/* journify.ai — S6Homepage (scroll-triggered Before → During → After diagram).
   Port of s6-final_2.html. Self-contained section: includes headline, frame, bottom lines, link. */

function S6Homepage() {
  const frameRef = React.useRef(null);
  const tagRef = React.useRef(null);
  const bottomWrapRef = React.useRef(null);
  const phasesRef = React.useRef(null);

  React.useEffect(() => {
    const frame = frameRef.current;
    const tag = tagRef.current;
    const bottomWrap = bottomWrapRef.current;
    const phasesEl = phasesRef.current;
    if (!frame || !tag || !bottomWrap || !phasesEl) return;

    const phases = phasesEl.querySelectorAll('.s6h-phase');
    const tagText = {
      before: 'Too many offers. None of them doing the work.',
      during: 'Testing one offer',
      after: 'One offer, validated'
    };

    let played = false;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setActivePhase(phase) {
      phases.forEach(p => p.classList.toggle('is-active', p.dataset.phase === phase));
      tag.style.opacity = '0';
      setTimeout(() => {
        tag.textContent = tagText[phase];
        tag.style.opacity = '1';
      }, 200);
      setBottomVisibility(phase);
    }

    function setBottomVisibility(phase) {
      const before = bottomWrap.querySelector('.s6h-bottom-before');
      const during = bottomWrap.querySelector('.s6h-bottom-during');
      const after = bottomWrap.querySelector('.s6h-bottom-after');
      if (before) before.style.opacity = phase === 'before' ? '1' : '0';
      if (during) during.style.opacity = phase === 'during' ? '1' : '0';
      if (after) after.style.opacity = phase === 'after' ? '1' : '0';
    }

    function setState(state) {
      frame.classList.remove('is-before', 'is-during', 'is-after');
      void frame.offsetWidth;
      frame.classList.add('is-' + state);
      setActivePhase(state);
    }

    const timeouts = [];
    function play() {
      if (played) return;
      played = true;
      if (prefersReduce) {
        setState('after');
        return;
      }
      // Add is-before NOW so Before-state CSS animations fire when user actually sees the section.
      // (Frame mounts without a state class so the keyframes don't burn off-screen.)
      frame.classList.add('is-before');
      setActivePhase('before');
      setBottomVisibility('before');
      timeouts.push(setTimeout(() => setState('during'), 6000));
      timeouts.push(setTimeout(() => setState('after'), 14000));
    }

    setBottomVisibility('before');

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            play();
            io.disconnect();
          }
        });
      }, { threshold: 0.3 });
      io.observe(frame);
    } else {
      play();
    }

    return () => {
      timeouts.forEach(clearTimeout);
      if (io) io.disconnect();
    };
  }, []);

  return (
    <section className="s6h">
      <style>{`
        .s6h {
          --s6h-border: #E8E3DB;
          --s6h-border-2: #D9D3C7;
          --s6h-text-2: #5A544C;
          --s6h-ox: #7A1A2A;
          --s6h-ox-text: #FAF8F5;
          --s6h-ox-text-2: #E8D5D9;
          --s6h-green: #1F5D3A;
          --s6h-green-mid: #3A8A5C;
          --s6h-ease: cubic-bezier(0.2, 0.8, 0.3, 1);
          padding: 64px 20px;
          max-width: 1080px;
          margin: 0 auto;
          font-family: var(--sans);
          color: var(--text);
        }
        @media (min-width: 720px) { .s6h { padding: 96px 32px; } }

        .s6h-head h2 {
          font-family: var(--serif); font-weight: 500; font-size: 26px;
          line-height: 1.12; letter-spacing: -0.015em;
          margin: 0; max-width: 720px;
        }
        .s6h-head p {
          font-family: var(--sans); font-size: 14.5px; line-height: 1.5;
          color: var(--s6h-text-2); margin: 12px 0 0; max-width: 540px;
        }
        @media (min-width: 720px) {
          .s6h-head h2 { font-size: 34px; }
          .s6h-head p { font-size: 15.5px; }
        }

        .s6h-frame {
          margin-top: 32px;
          background: var(--bg);
          border: 0.5px solid var(--s6h-border);
          border-radius: 8px;
          padding: 48px 20px;
          position: relative;
        }
        @media (min-width: 720px) { .s6h-frame { padding: 72px 40px; margin-top: 48px; } }

        .s6h-inner { max-width: 680px; margin: 0 auto; position: relative; }

        .s6h-phases { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 40px; }
        .s6h-phase { display: flex; align-items: center; gap: 8px; }
        .s6h-phase-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #C0BBB0;
          transition: background 400ms var(--s6h-ease), transform 400ms var(--s6h-ease);
        }
        .s6h-phase-label {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--s6h-text-2);
          transition: color 400ms var(--s6h-ease);
        }
        .s6h-phase-line { width: 24px; height: 0.5px; background: var(--s6h-border-2); }
        @media (min-width: 480px) {
          .s6h-phases { gap: 14px; }
          .s6h-phase-line { width: 40px; }
        }
        .s6h-phase.is-active .s6h-phase-dot { background: var(--s6h-ox); transform: scale(1.3); }
        .s6h-phase.is-active .s6h-phase-label { color: var(--text); }

        .s6h-tag {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--s6h-text-2); text-align: center; margin-bottom: 16px;
          transition: opacity 500ms var(--s6h-ease);
        }

        .s6h-offers-3 {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;
          margin-bottom: 24px;
          transition: opacity 500ms var(--s6h-ease);
        }
        @media (min-width: 480px) { .s6h-offers-3 { gap: 12px; } }

        .s6h-offer {
          background: var(--bg); border: 0.5px solid var(--s6h-border-2);
          border-radius: 4px; padding: 14px 10px; text-align: center;
          min-width: 0;
          transition: opacity 500ms var(--s6h-ease), border 500ms var(--s6h-ease);
        }
        @media (min-width: 480px) { .s6h-offer { padding: 18px 14px; } }

        .s6h-offer-num {
          font-family: var(--sans); font-size: 10px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--s6h-text-2); margin-bottom: 6px;
        }
        .s6h-offer-name {
          font-family: var(--serif); font-weight: 500; font-size: 14px;
          line-height: 1.2; color: var(--text); word-break: break-word;
        }
        @media (min-width: 480px) { .s6h-offer-name { font-size: 16px; } }
        @media (min-width: 720px) {
          .s6h-offer-name { font-size: 18px; }
          .s6h-offer-num { font-size: 11px; }
        }

        .s6h-frame.is-before .s6h-offer {
          opacity: 0;
          transform: translateY(8px);
          animation: s6hOfferIn 700ms var(--s6h-ease) forwards;
        }
        .s6h-frame.is-before .s6h-offer-1 { animation-delay: 0ms; }
        .s6h-frame.is-before .s6h-offer-2 { animation-delay: 400ms; }
        .s6h-frame.is-before .s6h-offer-3 { animation-delay: 800ms; }
        @keyframes s6hOfferIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        .s6h-frame.is-during .s6h-offer-1,
        .s6h-frame.is-during .s6h-offer-3 {
          opacity: 0.45;
          border: 0.5px dashed var(--s6h-border-2);
        }
        .s6h-frame.is-during .s6h-offer-2 {
          border: 1.5px solid var(--s6h-ox);
          animation: s6hOfferGlow 1500ms var(--s6h-ease) forwards;
        }
        @keyframes s6hOfferGlow {
          0% { border: 0.5px solid var(--s6h-border-2); }
          100% { border: 1.5px solid var(--s6h-ox); }
        }
        .s6h-offer-suffix {
          color: var(--s6h-ox); font-family: var(--serif);
          font-style: italic; font-weight: 400;
          opacity: 0;
          transition: opacity 600ms var(--s6h-ease);
        }
        .s6h-frame.is-during .s6h-offer-suffix {
          animation: s6hSuffixFade 800ms var(--s6h-ease) 1100ms forwards;
        }
        @keyframes s6hSuffixFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .s6h-offers-1 {
          display: none;
          background: var(--bg);
          border: 1.5px solid var(--s6h-ox);
          border-radius: 4px;
          padding: 22px 20px;
          margin-bottom: 24px;
          text-align: center;
          opacity: 0;
          transition: opacity 500ms var(--s6h-ease);
        }
        @media (min-width: 480px) { .s6h-offers-1 { padding: 26px 24px; } }
        .s6h-frame.is-after .s6h-offers-1 { display: block; opacity: 1; }
        .s6h-frame.is-after .s6h-offers-3 { display: none; }

        .s6h-offers-1-meta {
          font-family: var(--sans); font-size: 10px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--s6h-text-2); margin-bottom: 8px;
        }
        @media (min-width: 720px) { .s6h-offers-1-meta { font-size: 11px; } }
        .s6h-offers-1-name {
          font-family: var(--serif); font-weight: 500; font-size: 18px;
          line-height: 1.2; color: var(--text); margin-bottom: 6px;
        }
        @media (min-width: 720px) { .s6h-offers-1-name { font-size: 22px; } }
        .s6h-offers-1-sub {
          font-family: var(--sans); font-size: 13px; line-height: 1.4;
          color: var(--s6h-text-2); font-style: italic;
        }
        @media (min-width: 720px) { .s6h-offers-1-sub { font-size: 14px; } }

        .s6h-arrow {
          display: flex; justify-content: center; align-items: center;
          height: 28px; color: var(--s6h-border-2);
          transition: color 500ms var(--s6h-ease);
        }
        .s6h-arrow svg { display: block; }

        .s6h-frame.is-before .s6h-arrow-bottom {
          animation: s6hArrowFail 4000ms var(--s6h-ease) 3500ms forwards;
        }
        @keyframes s6hArrowFail {
          0% { color: var(--s6h-border-2); opacity: 1; }
          20% { color: #C99099; opacity: 0.7; }
          40% { color: var(--s6h-border-2); opacity: 1; }
          60% { color: #C99099; opacity: 0.7; }
          80% { color: var(--s6h-border-2); opacity: 1; }
          100% { color: var(--s6h-border-2); opacity: 1; }
        }

        .s6h-frame.is-during .s6h-arrow-bottom {
          animation: s6hArrowGlow 1000ms var(--s6h-ease) 3000ms forwards;
        }
        @keyframes s6hArrowGlow {
          0% { color: var(--s6h-border-2); }
          50% { color: var(--s6h-ox); }
          100% { color: var(--s6h-ox); }
        }

        .s6h-frame.is-after .s6h-arrow { color: var(--s6h-ox); }

        .s6h-marketing { margin: 4px 0; }

        .s6h-marketing-label {
          font-family: var(--sans); font-size: 11px; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--s6h-text-2); margin-bottom: 14px; text-align: center;
          position: relative; min-height: 1.4em;
        }
        .s6h-marketing-label-text {
          position: absolute; top: 0; left: 0; right: 0;
          opacity: 0;
          transition: opacity 400ms var(--s6h-ease);
        }
        .s6h-marketing-label-text.before-text { opacity: 1; }
        .s6h-frame.is-during .before-text,
        .s6h-frame.is-after .before-text { opacity: 0; }
        .s6h-frame.is-during .integrated-text,
        .s6h-frame.is-after .integrated-text { opacity: 1; }

        .s6h-rows {
          display: flex; flex-direction: column; gap: 12px;
          border: 0.5px dashed transparent;
          border-radius: 8px;
          padding: 0;
          transition: border-color 500ms var(--s6h-ease), padding 500ms var(--s6h-ease);
        }
        .s6h-frame.is-during .s6h-rows {
          animation: s6hFrameAppearM 600ms var(--s6h-ease) 1500ms forwards;
        }
        @keyframes s6hFrameAppearM {
          0% { border-color: transparent; padding: 0; }
          100% { border-color: #C0BBB0; padding: 16px 14px; }
        }
        @media (min-width: 480px) {
          .s6h-frame.is-during .s6h-rows {
            animation: s6hFrameAppearD 600ms var(--s6h-ease) 1500ms forwards;
          }
          @keyframes s6hFrameAppearD {
            0% { border-color: transparent; padding: 0; }
            100% { border-color: #C0BBB0; padding: 16px 18px; }
          }
        }
        .s6h-frame.is-after .s6h-rows {
          border-style: solid;
          border-width: 1.5px;
          border-color: var(--s6h-ox);
          padding: 16px 14px;
        }
        @media (min-width: 480px) {
          .s6h-frame.is-after .s6h-rows { padding: 16px 18px; }
        }

        .s6h-row {
          background: var(--bg); border: 0.5px solid var(--s6h-border-2);
          border-radius: 4px; padding: 14px 16px;
          display: grid; grid-template-columns: 90px 1fr;
          gap: 12px; align-items: center;
          transition: width 500ms var(--s6h-ease), margin-left 500ms var(--s6h-ease),
                      border-color 400ms var(--s6h-ease);
        }
        @media (min-width: 480px) {
          .s6h-row { padding: 16px 20px; grid-template-columns: 140px 1fr; gap: 16px; }
        }
        .s6h-row-label {
          font-family: var(--serif); font-weight: 500; font-size: 14px;
          color: var(--text); line-height: 1.2;
        }
        @media (min-width: 480px) { .s6h-row-label { font-size: 16px; } }
        @media (min-width: 720px) { .s6h-row-label { font-size: 18px; } }
        .s6h-row-state {
          font-family: var(--sans); font-size: 13px; line-height: 1.4;
          color: var(--s6h-text-2);
          transition: opacity 400ms var(--s6h-ease);
        }
        @media (min-width: 720px) { .s6h-row-state { font-size: 14px; } }

        .s6h-row-state-text { display: none; }
        .s6h-frame.is-before .s6h-row-state-text.is-before-text,
        .s6h-frame.is-during .s6h-row-state-text.is-during-text,
        .s6h-frame.is-after  .s6h-row-state-text.is-after-text { display: inline; }

        .s6h-frame.is-before .s6h-row--website {
          animation: s6hDriftW 2000ms cubic-bezier(0.3, 0.7, 0.4, 1) 1500ms forwards;
        }
        .s6h-frame.is-before .s6h-row--outreach {
          animation: s6hDriftO 2000ms cubic-bezier(0.5, 0.2, 0.6, 1) 1700ms forwards;
        }
        .s6h-frame.is-before .s6h-row--linkedin {
          animation: s6hDriftL 2000ms cubic-bezier(0.4, 0.6, 0.5, 1) 1900ms forwards;
        }
        @keyframes s6hDriftW { 0%,100% { width: 100%; margin-left: 0%; } }
        @keyframes s6hDriftO { 0% { width: 100%; margin-left: 0%; } 100% { width: 85%; margin-left: 15%; } }
        @keyframes s6hDriftL { 0% { width: 100%; margin-left: 0%; } 100% { width: 92%; margin-left: 5%; } }

        .s6h-frame.is-during .s6h-row,
        .s6h-frame.is-after .s6h-row { width: 100%; margin-left: 0%; }

        .s6h-frame.is-during .s6h-row--website  { animation: s6hRowGlow 500ms var(--s6h-ease) 2100ms forwards; }
        .s6h-frame.is-during .s6h-row--outreach { animation: s6hRowGlow 500ms var(--s6h-ease) 2400ms forwards; }
        .s6h-frame.is-during .s6h-row--linkedin { animation: s6hRowGlow 500ms var(--s6h-ease) 2700ms forwards; }
        @keyframes s6hRowGlow {
          0% { border-color: var(--s6h-border-2); }
          50% { border-color: var(--s6h-ox); }
          100% { border-color: var(--s6h-border-2); }
        }
        .s6h-frame.is-during .s6h-row--website,
        .s6h-frame.is-during .s6h-row--outreach,
        .s6h-frame.is-during .s6h-row--linkedin { width: 100%; margin-left: 0; }

        .s6h-sales {
          background: #A86675; color: var(--s6h-ox-text);
          border-radius: 4px; padding: 18px 20px;
          display: grid; grid-template-columns: 90px 1fr;
          gap: 12px; align-items: center; position: relative;
          transition: background 600ms var(--s6h-ease);
        }
        @media (min-width: 480px) {
          .s6h-sales { padding: 20px 24px; grid-template-columns: 140px 1fr; gap: 16px; }
        }
        .s6h-frame.is-during .s6h-sales {
          animation: s6hSalesIgnite 1000ms var(--s6h-ease) 3000ms forwards;
        }
        .s6h-frame.is-after .s6h-sales { background: var(--s6h-ox); }
        @keyframes s6hSalesIgnite {
          0% { background: #A86675; }
          100% { background: var(--s6h-ox); }
        }
        .s6h-sales-label {
          font-family: var(--serif); font-weight: 500; font-size: 14px;
          color: var(--s6h-ox-text); line-height: 1.2;
        }
        @media (min-width: 480px) { .s6h-sales-label { font-size: 16px; } }
        @media (min-width: 720px) { .s6h-sales-label { font-size: 18px; } }
        .s6h-sales-state {
          font-family: var(--sans); font-size: 13px; line-height: 1.4;
          color: var(--s6h-ox-text-2);
        }
        @media (min-width: 720px) { .s6h-sales-state { font-size: 14px; } }

        .s6h-sales-state-text { display: none; }
        .s6h-frame.is-before .s6h-sales-state-text.is-before-text { display: inline; }
        .s6h-frame.is-during .s6h-sales-state-text.is-during-text { display: inline; }
        .s6h-frame.is-after  .s6h-sales-state-text.is-after-text  { display: inline; }

        .s6h-arc {
          position: absolute;
          top: 0; right: -8px;
          width: 60px; height: 100%;
          pointer-events: none; overflow: visible;
          opacity: 0;
          transition: opacity 400ms var(--s6h-ease);
        }
        @media (min-width: 480px) { .s6h-arc { right: -16px; width: 80px; } }
        @media (min-width: 720px) { .s6h-arc { right: -24px; width: 100px; } }
        .s6h-frame.is-during .s6h-arc-during,
        .s6h-frame.is-after  .s6h-arc-after { opacity: 1; }
        .s6h-arc-path {
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        .s6h-arc-during .s6h-arc-path { stroke: var(--s6h-green-mid); stroke-width: 1.25; }
        .s6h-arc-after  .s6h-arc-path { stroke: var(--s6h-green); stroke-width: 1.75; }
        .s6h-frame.is-during .s6h-arc-during .s6h-arc-path {
          animation: s6hArcDraw 4000ms var(--s6h-ease) 2500ms forwards;
        }
        .s6h-frame.is-after .s6h-arc-after .s6h-arc-path {
          animation: s6hArcDraw 3500ms var(--s6h-ease) 600ms forwards;
        }
        @keyframes s6hArcDraw {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .s6h-arc-marker { opacity: 0; }
        .s6h-frame.is-during .s6h-arc-during .s6h-arc-marker {
          animation: s6hMarkerFade 300ms var(--s6h-ease) 6200ms forwards;
        }
        .s6h-frame.is-after .s6h-arc-after .s6h-arc-marker {
          animation: s6hMarkerFade 300ms var(--s6h-ease) 3800ms forwards;
        }
        @keyframes s6hMarkerFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        .s6h-bottom-wrap {
          position: relative;
          margin-top: 32px;
          min-height: 80px;
        }
        @media (min-width: 720px) { .s6h-bottom-wrap { margin-top: 40px; } }
        .s6h-bottom {
          font-family: var(--serif); font-weight: 400; font-style: italic;
          font-size: 15px; line-height: 1.5;
          color: var(--text); text-align: center;
          margin: 0 auto; max-width: 580px;
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 500ms var(--s6h-ease);
        }
        @media (min-width: 720px) { .s6h-bottom { font-size: 18px; } }

        .s6h-link-wrap { text-align: center; margin-top: 16px; position: relative; z-index: 2; }
        .s6h-link {
          font-family: var(--sans); font-size: 14px;
          color: var(--s6h-ox); text-decoration: underline;
          text-decoration-thickness: 0.5px; text-underline-offset: 4px;
        }
        .s6h-link:hover { color: #5A1220; }

        @media (prefers-reduced-motion: reduce) {
          .s6h-frame, .s6h-frame *, .s6h-bottom { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="s6h-head">
        <h2>This is how the Journify Sprint works.</h2>
        <p>Here's what changes across 45 days.</p>
      </div>

      <div className="s6h-frame" ref={frameRef}>
        <div className="s6h-inner">

          <div className="s6h-phases" ref={phasesRef} role="tablist" aria-label="Sprint phases">
            <div className="s6h-phase" data-phase="before">
              <span className="s6h-phase-dot"></span>
              <span className="s6h-phase-label">Before</span>
            </div>
            <div className="s6h-phase-line"></div>
            <div className="s6h-phase" data-phase="during">
              <span className="s6h-phase-dot"></span>
              <span className="s6h-phase-label">During</span>
            </div>
            <div className="s6h-phase-line"></div>
            <div className="s6h-phase" data-phase="after">
              <span className="s6h-phase-dot"></span>
              <span className="s6h-phase-label">After</span>
            </div>
          </div>

          <div className="s6h-tag" ref={tagRef}>Too many offers. None of them doing the work.</div>

          <div className="s6h-offers-3">
            <div className="s6h-offer s6h-offer-1">
              <div className="s6h-offer-num">Offer 1</div>
              <div className="s6h-offer-name">Coaching</div>
            </div>
            <div className="s6h-offer s6h-offer-2">
              <div className="s6h-offer-num">Offer 2</div>
              <div className="s6h-offer-name">Lead gen <span className="s6h-offer-suffix">— rebuilt</span></div>
            </div>
            <div className="s6h-offer s6h-offer-3">
              <div className="s6h-offer-num">Offer 3</div>
              <div className="s6h-offer-name">Events</div>
            </div>
          </div>

          <div className="s6h-offers-1">
            <div className="s6h-offers-1-meta">The offer</div>
            <div className="s6h-offers-1-name">One offer</div>
            <div className="s6h-offers-1-sub">Validated in 10+ calls.</div>
          </div>

          <div className="s6h-arrow s6h-arrow-top" aria-hidden="true">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <line x1="6" y1="0" x2="6" y2="14" stroke="currentColor" strokeWidth="1"/>
              <polyline points="2,12 6,18 10,12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter"/>
            </svg>
          </div>

          <div className="s6h-marketing">
            <div className="s6h-marketing-label">
              <span className="s6h-marketing-label-text before-text">Disconnected marketing</span>
              <span className="s6h-marketing-label-text integrated-text">Integrated marketing</span>
            </div>
            <div className="s6h-rows">
              <div className="s6h-row s6h-row--website">
                <div className="s6h-row-label">Website</div>
                <div className="s6h-row-state">
                  <span className="s6h-row-state-text is-before-text">12 services listed.</span>
                  <span className="s6h-row-state-text is-during-text">Landing page, 1 offer.</span>
                  <span className="s6h-row-state-text is-after-text">Homepage, 1 offer.</span>
                </div>
              </div>
              <div className="s6h-row s6h-row--outreach">
                <div className="s6h-row-label">Outreach</div>
                <div className="s6h-row-state">
                  <span className="s6h-row-state-text is-before-text">Dinners, events.</span>
                  <span className="s6h-row-state-text is-during-text">LinkedIn, 20/week.</span>
                  <span className="s6h-row-state-text is-after-text">LinkedIn, 100/week, tracked.</span>
                </div>
              </div>
              <div className="s6h-row s6h-row--linkedin">
                <div className="s6h-row-label">LinkedIn</div>
                <div className="s6h-row-state">
                  <span className="s6h-row-state-text is-before-text">Last post, 1 month ago.</span>
                  <span className="s6h-row-state-text is-during-text">2-3 posts/week.</span>
                  <span className="s6h-row-state-text is-after-text">5 posts/week, inbound.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="s6h-arrow s6h-arrow-bottom" aria-hidden="true">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
              <line x1="6" y1="0" x2="6" y2="14" stroke="currentColor" strokeWidth="1"/>
              <polyline points="2,12 6,18 10,12" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter"/>
            </svg>
          </div>

          <div className="s6h-sales">
            <div className="s6h-sales-label">Sales calls</div>
            <div className="s6h-sales-state">
              <span className="s6h-sales-state-text is-before-text">"I need to think about it."</span>
              <span className="s6h-sales-state-text is-during-text">2-3 booked calls.</span>
              <span className="s6h-sales-state-text is-after-text">Warm leads, booked.</span>
            </div>
          </div>

          <svg className="s6h-arc s6h-arc-during" viewBox="0 0 100 800" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="s6h-arc-arrow-during" className="s6h-arc-marker" viewBox="0 0 10 10" refX="8" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3A8A5C" />
              </marker>
            </defs>
            <path className="s6h-arc-path"
                  d="M 10 720 C 80 720, 95 500, 95 360 C 95 240, 80 200, 10 200"
                  pathLength="100"
                  vectorEffect="non-scaling-stroke"
                  markerEnd="url(#s6h-arc-arrow-during)" />
          </svg>

          <svg className="s6h-arc s6h-arc-after" viewBox="0 0 100 800" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="s6h-arc-arrow-after" className="s6h-arc-marker" viewBox="0 0 10 10" refX="8" refY="5"
                      markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#1F5D3A" />
              </marker>
            </defs>
            <path className="s6h-arc-path"
                  d="M 10 720 C 80 720, 95 500, 95 360 C 95 240, 80 200, 10 200"
                  pathLength="100"
                  vectorEffect="non-scaling-stroke"
                  markerEnd="url(#s6h-arc-arrow-after)" />
          </svg>

        </div>
      </div>

      <div className="s6h-bottom-wrap" ref={bottomWrapRef}>
        <p className="s6h-bottom s6h-bottom-before">The companies who would sign fast never see you.<br />The ones who do see you take three weeks to decide.</p>
        <p className="s6h-bottom s6h-bottom-during">The first replies come in. The first meetings land.<br />The system learns from every call while it's still running.</p>
        <p className="s6h-bottom s6h-bottom-after">Every sales call updates the offer, filters out the wrong leads, and puts the right ones on next week's calendar.</p>
      </div>

      <div className="s6h-link-wrap">
        <a className="s6h-link" href="/case-studies/coaching">Read how it actually ran →</a>
      </div>

    </section>
  );
}

Object.assign(window, { S6Homepage });
