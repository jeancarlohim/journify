/* journify.ai — S6Diagram (Before/During/After cycling animation) */

function S6Diagram({ data }) {
  const linkHref = (data && data.link && data.link.href) ? data.link.href : '/case-studies/polly';
  const linkLabel = (data && data.link && data.link.label) ? data.link.label : 'Read how it works →';

  return (
    <div style={{ background: 'var(--bg)', padding: '4.5rem 2.5rem', border: '0.5px solid var(--border)' }}>
      <style>{`
        @keyframes j-fade1 { 0%, 28% { opacity: 1; } 33%, 94% { opacity: 0; } 100% { opacity: 1; } }
        @keyframes j-fade2 { 0%, 28% { opacity: 0; } 33%, 61% { opacity: 1; } 66%, 100% { opacity: 0; } }
        @keyframes j-fade3 { 0%, 61% { opacity: 0; } 66%, 94% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes j-offerDim { 0%, 28% { opacity: 1; } 33%, 61% { opacity: 0.28; } 66%, 100% { opacity: 0; } }
        @keyframes j-offerOutline { 0%, 28% { outline-color: transparent; } 33%, 61% { outline-color: #7A1A2A; } 66%, 100% { outline-color: transparent; } }
        @keyframes j-arcDraw { 0%, 30% { opacity: 0; stroke-dashoffset: 1600; } 34%, 42% { opacity: 1; stroke-dashoffset: 0; } 46%, 94% { opacity: 0.85; stroke-dashoffset: 0; } 96%, 100% { opacity: 0; } }
        @keyframes j-tag1 { 0%, 28% { opacity: 1; } 33%, 100% { opacity: 0; } }
        @keyframes j-tag2 { 0%, 28% { opacity: 0; } 33%, 61% { opacity: 1; } 66%, 100% { opacity: 0; } }
        @keyframes j-tag3 { 0%, 61% { opacity: 0; } 66%, 94% { opacity: 1; } 100% { opacity: 0; } }
        @keyframes j-dot1 { 0%, 28% { background: #7A1A2A; transform: scale(1.3); } 33%, 100% { background: #C0BBB0; transform: scale(1); } }
        @keyframes j-dot2 { 0%, 28% { background: #C0BBB0; } 33%, 61% { background: #7A1A2A; transform: scale(1.3); } 66%, 100% { background: #C0BBB0; transform: scale(1); } }
        @keyframes j-dot3 { 0%, 61% { background: #C0BBB0; } 66%, 94% { background: #7A1A2A; transform: scale(1.3); } 100% { background: #C0BBB0; transform: scale(1); } }
        @keyframes j-lbl1 { 0%, 28% { color: #1A1714; font-weight: 500; } 33%, 100% { color: #8A8478; font-weight: 400; } }
        @keyframes j-lbl2 { 0%, 28% { color: #8A8478; } 33%, 61% { color: #1A1714; font-weight: 500; } 66%, 100% { color: #8A8478; font-weight: 400; } }
        @keyframes j-lbl3 { 0%, 61% { color: #8A8478; } 66%, 94% { color: #1A1714; font-weight: 500; } 100% { color: #8A8478; font-weight: 400; } }
        .j-s6-st1 { animation: j-fade1 18s ease-in-out infinite; }
        .j-s6-st2 { animation: j-fade2 18s ease-in-out infinite; }
        .j-s6-st3 { animation: j-fade3 18s ease-in-out infinite; }
        .j-s6-offer-dim { animation: j-offerDim 18s ease-in-out infinite; }
        .j-s6-offer-box { animation: j-offerOutline 18s ease-in-out infinite; outline: 1.5px solid transparent; outline-offset: -1.5px; }
        .j-s6-arc { animation: j-arcDraw 18s ease-in-out infinite; stroke-dasharray: 1600; }
        .j-s6-tag1 { animation: j-tag1 18s ease-in-out infinite; }
        .j-s6-tag2 { animation: j-tag2 18s ease-in-out infinite; }
        .j-s6-tag3 { animation: j-tag3 18s ease-in-out infinite; }
        .j-s6-dot1 { animation: j-dot1 18s ease-in-out infinite; }
        .j-s6-dot2 { animation: j-dot2 18s ease-in-out infinite; }
        .j-s6-dot3 { animation: j-dot3 18s ease-in-out infinite; }
        .j-s6-lbl1 { animation: j-lbl1 18s ease-in-out infinite; }
        .j-s6-lbl2 { animation: j-lbl2 18s ease-in-out infinite; }
        .j-s6-lbl3 { animation: j-lbl3 18s ease-in-out infinite; }
        .j-s6-node { background: var(--bg); border: 0.5px solid #D9D3C7; border-radius: 4px; padding: 16px 20px; box-sizing: border-box; }
        .j-s6-node-row { display: grid; grid-template-columns: 140px 1fr; gap: 24px; align-items: center; }
        .j-s6-node-label { font-family: var(--serif); font-size: 18px; font-weight: 500; color: var(--text); line-height: 1; letter-spacing: -0.005em; }
        .j-s6-node-state { font-family: var(--sans); font-size: 14px; color: var(--text-2); line-height: 1.4; }
        .j-s6-state-wrap { position: relative; min-height: 20px; }
        .j-s6-state-wrap > div { position: absolute; top: 0; left: 0; right: 0; }
        .j-s6-offer-mini { background: var(--bg); border: 0.5px solid #D9D3C7; border-radius: 4px; padding: 22px 10px 16px; text-align: center; box-sizing: border-box; position: relative; transition: opacity 0.6s ease; flex: 1; min-width: 0; }
        .j-s6-offer-mini-tag { position: absolute; top: 8px; left: 0; right: 0; font-family: var(--sans); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #8A8478; font-weight: 500; }
        .j-s6-offer-mini-label { font-family: var(--serif); font-size: 15px; color: var(--text); font-weight: 500; margin-top: 4px; letter-spacing: -0.005em; }
        .j-s6-offer-state-tag { font-family: var(--sans); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8A8478; font-weight: 500; margin-bottom: 12px; }
        .j-s6-sales { background: var(--ox); border: none; padding: 22px 24px; border-radius: 4px; box-sizing: border-box; }
        .j-s6-sales .j-s6-node-label { color: var(--ox-text); font-size: 20px; }
        .j-s6-sales .j-s6-node-state { color: var(--ox-text-2); font-size: 15px; }
        .j-s6-channel { border: 0.5px dashed #C0BBB0; border-radius: 8px; padding: 16px 18px; background: transparent; display: flex; flex-direction: column; gap: 12px; }
        .j-s6-channel-label { font-family: var(--sans); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #8A8478; font-weight: 500; padding-bottom: 10px; border-bottom: 0.5px solid var(--border); margin-bottom: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .j-s6-st1, .j-s6-tag1, .j-s6-dot1, .j-s6-lbl1 { animation: none; opacity: 1; }
          .j-s6-st2, .j-s6-st3, .j-s6-tag2, .j-s6-tag3, .j-s6-dot2, .j-s6-dot3, .j-s6-lbl2, .j-s6-lbl3, .j-s6-offer-dim, .j-s6-offer-box, .j-s6-arc { animation: none; opacity: 0; }
          .j-s6-dot1 { background: #7A1A2A !important; }
          .j-s6-lbl1 { color: #1A1714 !important; font-weight: 500 !important; }
          .j-s6-arc { opacity: 0.85 !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Timeline indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 4px 22px', marginBottom: '0.5rem', borderBottom: '0.5px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="j-s6-dot1" style={{ width: 10, height: 10, borderRadius: '50%', transition: 'all 0.4s' }} />
            <div className="j-s6-lbl1" style={{ fontFamily: 'var(--sans)', fontSize: 13.5, transition: 'all 0.4s' }}>Before</div>
          </div>
          <div style={{ flex: 1, height: '0.5px', background: '#D9D3C7', margin: '0 16px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="j-s6-dot2" style={{ width: 10, height: 10, borderRadius: '50%', transition: 'all 0.4s' }} />
            <div className="j-s6-lbl2" style={{ fontFamily: 'var(--sans)', fontSize: 13.5, transition: 'all 0.4s' }}>During</div>
          </div>
          <div style={{ flex: 1, height: '0.5px', background: '#D9D3C7', margin: '0 16px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="j-s6-dot3" style={{ width: 10, height: 10, borderRadius: '50%', transition: 'all 0.4s' }} />
            <div className="j-s6-lbl3" style={{ fontFamily: 'var(--sans)', fontSize: 13.5, transition: 'all 0.4s' }}>After</div>
          </div>
        </div>

        {/* SVG diagram */}
        <div style={{ position: 'relative', paddingTop: 28 }}>
          <svg viewBox="0 0 600 820" style={{ width: '100%', display: 'block', overflow: 'visible' }}>
            <defs>
              <marker id="j-gray-d" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#A8A298" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
              <marker id="j-green-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="#1F5D3A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </marker>
            </defs>

            {/* Offer block */}
            <foreignObject x="40" y="0" width="480" height="160">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ position: 'relative' }}>
                <div className="j-s6-tag1" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                  <div className="j-s6-offer-state-tag">Three disconnected offers</div>
                </div>
                <div className="j-s6-tag2" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                  <div className="j-s6-offer-state-tag">Testing one offer</div>
                </div>
                <div className="j-s6-tag3" style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
                  <div className="j-s6-offer-state-tag">One offer, validated</div>
                </div>

                <div className="j-s6-st1" style={{ position: 'absolute', top: 32, left: 0, right: 0 }}>
                  <div style={{ background: 'var(--bg)', border: '0.5px solid #D9D3C7', borderRadius: 6, padding: '14px 14px', display: 'flex', gap: 10 }}>
                    <div className="j-s6-offer-mini"><div className="j-s6-offer-mini-tag">Offer 1</div><div className="j-s6-offer-mini-label">Coaching</div></div>
                    <div className="j-s6-offer-mini"><div className="j-s6-offer-mini-tag">Offer 2</div><div className="j-s6-offer-mini-label">Lead gen</div></div>
                    <div className="j-s6-offer-mini"><div className="j-s6-offer-mini-tag">Offer 3</div><div className="j-s6-offer-mini-label">Software dev</div></div>
                  </div>
                </div>

                <div className="j-s6-st2" style={{ position: 'absolute', top: 32, left: 0, right: 0 }}>
                  <div style={{ background: 'var(--bg)', border: '0.5px solid #D9D3C7', borderRadius: 6, padding: '14px 14px', display: 'flex', gap: 10 }}>
                    <div className="j-s6-offer-mini j-s6-offer-dim" style={{ borderStyle: 'dashed' }}><div className="j-s6-offer-mini-tag">Offer 1</div><div className="j-s6-offer-mini-label">Coaching</div></div>
                    <div className="j-s6-offer-mini j-s6-offer-box"><div className="j-s6-offer-mini-tag">Offer 2</div><div className="j-s6-offer-mini-label">Lead gen</div></div>
                    <div className="j-s6-offer-mini j-s6-offer-dim" style={{ borderStyle: 'dashed' }}><div className="j-s6-offer-mini-tag">Offer 3</div><div className="j-s6-offer-mini-label">Software dev</div></div>
                  </div>
                </div>

                <div className="j-s6-st3" style={{ position: 'absolute', top: 32, left: 0, right: 0 }}>
                  <div style={{ background: 'var(--bg)', border: '0.5px solid #D9D3C7', borderRadius: 6, padding: '28px 20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--text)', fontWeight: 500, marginBottom: 6, letterSpacing: '-0.005em' }}>One offer</div>
                    <div style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--text-2)' }}>Validated in 10+ calls.</div>
                  </div>
                </div>
              </div>
            </foreignObject>

            {/* Arrow offer → marketing */}
            <line x1="280" y1="165" x2="280" y2="210" stroke="#A8A298" strokeWidth="1" opacity="0.7" markerEnd="url(#j-gray-d)" strokeLinecap="round"/>

            {/* Marketing group */}
            <foreignObject x="40" y="220" width="480" height="340">
              <div xmlns="http://www.w3.org/1999/xhtml">
                <div className="j-s6-channel">
                  <div className="j-s6-channel-label">Marketing</div>
                  <div className="j-s6-node">
                    <div className="j-s6-node-row">
                      <div className="j-s6-node-label">Website</div>
                      <div className="j-s6-state-wrap">
                        <div className="j-s6-st1"><div className="j-s6-node-state">12 services listed.</div></div>
                        <div className="j-s6-st2"><div className="j-s6-node-state">Landing page, 1 offer.</div></div>
                        <div className="j-s6-st3"><div className="j-s6-node-state">Homepage, 1 offer.</div></div>
                      </div>
                    </div>
                  </div>
                  <div className="j-s6-node">
                    <div className="j-s6-node-row">
                      <div className="j-s6-node-label">Outreach</div>
                      <div className="j-s6-state-wrap">
                        <div className="j-s6-st1"><div className="j-s6-node-state">Dinners, events.</div></div>
                        <div className="j-s6-st2"><div className="j-s6-node-state">LinkedIn, 20/week.</div></div>
                        <div className="j-s6-st3"><div className="j-s6-node-state">LinkedIn, 100/week, tracked.</div></div>
                      </div>
                    </div>
                  </div>
                  <div className="j-s6-node">
                    <div className="j-s6-node-row">
                      <div className="j-s6-node-label">LinkedIn</div>
                      <div className="j-s6-state-wrap">
                        <div className="j-s6-st1"><div className="j-s6-node-state">Last post, 1 month ago.</div></div>
                        <div className="j-s6-st2"><div className="j-s6-node-state">2–3 posts/week.</div></div>
                        <div className="j-s6-st3"><div className="j-s6-node-state">5 posts/week, inbound.</div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </foreignObject>

            {/* Arrow marketing → sales */}
            <line x1="280" y1="570" x2="280" y2="615" stroke="#A8A298" strokeWidth="1" opacity="0.7" markerEnd="url(#j-gray-d)" strokeLinecap="round"/>

            {/* Sales calls node */}
            <foreignObject x="80" y="625" width="400" height="130">
              <div xmlns="http://www.w3.org/1999/xhtml" className="j-s6-sales">
                <div className="j-s6-node-row">
                  <div className="j-s6-node-label">Sales calls</div>
                  <div className="j-s6-state-wrap" style={{ minHeight: 22 }}>
                    <div className="j-s6-st1"><div className="j-s6-node-state">&ldquo;I need to think about it.&rdquo;</div></div>
                    <div className="j-s6-st2"><div className="j-s6-node-state">2–3 booked calls.</div></div>
                    <div className="j-s6-st3"><div className="j-s6-node-state">Warm leads, booked.</div></div>
                  </div>
                </div>
              </div>
            </foreignObject>

            {/* Green feedback arc */}
            <path className="j-s6-arc" d="M 480 685 Q 580 685 582 430 Q 582 220 582 100 Q 580 35 530 55" fill="none" stroke="#1F5D3A" strokeWidth="3" markerEnd="url(#j-green-d)" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Cycling payoff line + link */}
        <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '0.5px solid var(--border)' }}>
          <div style={{ position: 'relative', minHeight: 60 }}>
            <p className="j-s6-st1 j-payoff" style={{ position: 'absolute', margin: 0 }}>Nothing changes.</p>
            <p className="j-s6-st2 j-payoff" style={{ position: 'absolute', margin: 0 }}>Each sales call teaches your offer.</p>
            <p className="j-s6-st3 j-payoff" style={{ position: 'absolute', margin: 0 }}>Your marketing learns and your calendar becomes predictable.</p>
          </div>
          <a className="j-link j-small" href={linkHref} style={{ display: 'inline-block', marginTop: '1.5rem', fontFamily: 'var(--sans)' }}>{linkLabel}</a>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { S6Diagram, S6Mobile: S6Diagram });