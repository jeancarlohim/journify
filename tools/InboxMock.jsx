/* /tools — DM 2 Call App inbox mock.

   A hand-built HTML replica of app.journify.ai's Inbox, not a screenshot, so the
   text stays selectable and sharp at any zoom. Laid out at a fixed 1000px and
   then scaled down to whatever width its column has (the design's behaviour).
   Below 860px it is NOT scaled: it renders full size inside a horizontally
   scrollable box, because a 0.37 scale on a phone is illegible.

   All strings come from content/tools.json (dmApp.mock). Prospect names are
   blurred with a CSS filter, the same way the design ships them.
*/

const MOCK_W = 1000;

const TAG_TONE = {
  ox:      { background: 'var(--ox)',          color: 'var(--ox-text)' },
  warm:    { background: 'var(--tools-warm)',  color: 'var(--ox-text)' },
  hot:     { background: 'var(--tools-hot)',   color: 'var(--ox-text)' },
  cold:    { background: 'var(--tools-cold)',  color: 'var(--ox-text)' },
  outline: { border: '0.5px solid var(--border)', color: 'var(--text-2)' },
};

const BLUR = { filter: 'blur(4px)', userSelect: 'none' };

function MockChrome({ label }) {
  return (
    <div style={{ height: 34, display: 'flex', alignItems: 'center', padding: '0 14px',
                  borderBottom: '0.5px solid var(--border)', background: 'var(--panel)' }}>
      <span style={{ fontSize: 11, color: 'var(--placeholder)', letterSpacing: '0.04em' }}>{label}</span>
    </div>
  );
}

function MockTag({ tag }) {
  const outline = tag.tone === 'outline';
  return (
    <span style={{ fontSize: 9, letterSpacing: outline ? '0.08em' : '0.1em', textTransform: 'uppercase',
                   padding: outline ? '2px 6px' : '3px 6px', ...TAG_TONE[tag.tone] }}>
      {tag.text}
    </span>
  );
}

function MockAvatar({ initials, blur }) {
  return (
    <div style={{ flex: '0 0 34px', width: 34, height: 34, borderRadius: '50%',
                  background: 'var(--border)', color: 'var(--text-2)', fontSize: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  ...(blur ? BLUR : null) }}>
      {initials}
    </div>
  );
}

/* "You: Juan José, that persistence shows…" — blur only the name, keep the rest legible.
   previewBlurFrom is the character index where the name starts. */
function MockPreview({ thread }) {
  const base = { fontSize: 13, color: 'var(--text-2)', margin: '3px 0 8px',
                 overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
  if (thread.previewBlurFrom == null) return <p style={base}>{thread.preview}</p>;
  const i = thread.previewBlurFrom;
  const name = thread.preview.slice(i, thread.preview.indexOf(',', i));
  return (
    <p style={base}>
      {thread.preview.slice(0, i)}
      <span style={BLUR}>{name}</span>
      {thread.preview.slice(i + name.length)}
    </p>
  );
}

function MockThread({ thread }) {
  const row = {
    display: 'flex', gap: 12, padding: '12px 16px',
    borderBottom: '0.5px solid var(--border)',
  };
  if (thread.selected) { row.background = 'var(--tools-sel)'; row.boxShadow = 'inset 3px 0 0 var(--ox)'; }
  if (thread.flagged)  { row.background = 'var(--tools-flag)'; }

  return (
    <div style={row}>
      <MockAvatar initials={thread.initials} blur={thread.blur} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: thread.selected ? 500 : 400,
                         ...(thread.blur ? BLUR : null) }}>
            {thread.name}
          </span>
          <span style={{ fontSize: 11, color: 'var(--placeholder)', whiteSpace: 'nowrap' }}>{thread.age}</span>
        </div>
        <MockPreview thread={thread} />
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          {thread.tags.map((t, i) => <MockTag key={i} tag={t} />)}
        </div>
      </div>
    </div>
  );
}

/* Blur named words inside a message bubble (the prospect's first name). */
function MockBubbleText({ text, blurWords }) {
  if (!blurWords || !blurWords.length) return text;
  const re = new RegExp('(' + blurWords.join('|') + ')', 'g');
  return text.split(re).map((part, i) =>
    blurWords.indexOf(part) > -1
      ? <span key={i} style={BLUR}>{part}</span>
      : part
  );
}

function MockMessage({ msg }) {
  const out = msg.side === 'out';
  const bubble = out
    ? { alignSelf: 'flex-end', background: 'var(--text)', color: 'var(--ox-text)' }
    : { alignSelf: 'flex-start', background: 'var(--bg)', border: '0.5px solid var(--border)', color: 'var(--text)' };
  return (
    <React.Fragment>
      {msg.author && (
        <span style={{ fontSize: 11, alignSelf: out ? 'flex-end' : 'flex-start',
                       color: out ? 'var(--ox)' : 'var(--text-2)',
                       ...(msg.authorBlur ? BLUR : null) }}>
          {msg.author}
        </span>
      )}
      <div style={{ maxWidth: '78%', padding: '12px 14px', ...bubble }}>
        <p style={{ fontSize: 13, lineHeight: 1.55, overflowWrap: 'anywhere', margin: 0 }}>
          <MockBubbleText text={msg.text} blurWords={msg.blurWords} />
        </p>
        <span style={{ fontSize: 10, color: 'var(--placeholder)', display: 'block', marginTop: 8 }}>{msg.age}</span>
      </div>
    </React.Fragment>
  );
}

function InboxMock({ mock }) {
  const boxRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const [scaled, setScaled] = React.useState(true);

  React.useEffect(() => {
    const box = boxRef.current, inner = innerRef.current;
    if (!box || !inner) return;

    const fit = () => {
      const scaleIt = window.innerWidth >= 860;
      setScaled(scaleIt);
      if (!scaleIt) {
        inner.style.transform = 'none';
        box.style.height = 'auto';
        return;
      }
      const k = Math.min(1, box.clientWidth / MOCK_W);
      inner.style.transform = 'scale(' + k + ')';
      box.style.height = (inner.offsetHeight * k) + 'px';
    };

    fit();
    const t = setTimeout(fit, 300);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    window.addEventListener('resize', fit);
    return () => { clearTimeout(t); ro.disconnect(); window.removeEventListener('resize', fit); };
  }, []);

  const railLabel = { fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: 'var(--placeholder)', margin: '0 0 8px' };
  const railRow = { display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '7px 0', fontSize: 14, color: 'var(--text)' };
  const groupBar = { fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                     color: 'var(--text-2)', background: 'var(--panel)', padding: '7px 16px',
                     borderBottom: '0.5px solid var(--border)' };
  const fraunces = { fontFamily: 'var(--tools-brand)', fontWeight: 600, letterSpacing: '-0.02em',
                     fontVariationSettings: "'opsz' 72" };

  return (
    <div ref={boxRef} style={{ width: '100%', overflowX: scaled ? 'hidden' : 'auto', overflowY: 'hidden' }}>
      <div ref={innerRef} style={{ width: MOCK_W, transformOrigin: 'top left' }}>
        <div style={{ border: '0.5px solid var(--border)', background: 'var(--bg)' }}>
          <MockChrome label={mock.chrome} />

          {/* app header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                        padding: '14px 18px', borderBottom: '0.5px solid var(--border)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ ...fraunces, fontSize: 18 }}>{mock.brand}</span>
              <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{mock.brandNote}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 10,
                             letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-2)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tools-ok)', display: 'block' }} />
                {mock.status}
              </span>
              <span style={{ width: '0.5px', height: 20, background: 'var(--border)', display: 'block' }} />
              <span style={{ fontSize: 13, color: 'var(--text)' }}>
                {mock.account} <span style={{ color: 'var(--text-2)' }}>{mock.accountNote}</span>
              </span>
              <MockAvatar initials={mock.avatar} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            {/* left rail */}
            <div style={{ flex: '0 0 190px', padding: '20px 18px', borderRight: '0.5px solid var(--border)' }}>
              {mock.sidebar.map((group, gi) => (
                <React.Fragment key={gi}>
                  <p style={{ ...railLabel, marginTop: gi === 0 ? 0 : 26 }}>{group.label}</p>
                  {group.items.map((it, ii) => (
                    <div key={ii} style={railRow}>
                      <span style={{ color: it.active ? 'var(--ox)' : (it.muted ? 'var(--text-2)' : 'var(--text)') }}>
                        {it.name}
                      </span>
                      {it.count != null && (
                        <span style={{ fontSize: 11, color: it.accent ? 'var(--ox)' : 'var(--placeholder)' }}>
                          {it.count}
                        </span>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
              <div style={{ marginTop: 26, paddingTop: 14, borderTop: '0.5px solid var(--border)' }}>
                <div style={railRow}>{mock.sidebarFoot}</div>
              </div>
            </div>

            {/* thread list */}
            <div style={{ flex: '1.05 1 310px', minWidth: 0, borderRight: '0.5px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            gap: 12, padding: '16px 16px 12px' }}>
                <span style={{ ...fraunces, fontSize: 22 }}>{mock.listTitle}</span>
                <span style={{ background: 'var(--ox)', color: 'var(--ox-text)', fontSize: 12,
                               padding: '8px 14px', borderRadius: 2 }}>{mock.listCta}</span>
              </div>
              <div style={{ padding: '0 16px 12px' }}>
                <div style={{ fontSize: 12, color: 'var(--placeholder)', paddingBottom: 7,
                              borderBottom: '0.5px solid var(--border)' }}>{mock.search}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, padding: '0 16px 14px', flexWrap: 'wrap' }}>
                {mock.chips.map((c, i) => (
                  <span key={i} style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
                                         color: 'var(--text-2)', border: '0.5px solid var(--border)',
                                         padding: '6px 9px' }}>{c}</span>
                ))}
              </div>
              {mock.groups.map((g, gi) => (
                <React.Fragment key={gi}>
                  <div style={{ ...groupBar, borderTop: gi === 0 ? '0.5px solid var(--border)' : undefined }}>
                    {g.label}
                  </div>
                  {g.threads.map((t, ti) => <MockThread key={ti} thread={t} />)}
                </React.Fragment>
              ))}
            </div>

            {/* open conversation */}
            <div style={{ flex: '1.15 1 330px', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, padding: 18 }}>
                {mock.messages.map((m, i) => <MockMessage key={i} msg={m} />)}
              </div>
              <div style={{ borderTop: '0.5px solid var(--border)', padding: '14px 18px 20px' }}>
                <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
                            color: 'var(--text-2)', margin: '0 0 12px' }}>{mock.composerLabel}</p>
                <div style={{ border: '0.5px solid var(--border)', background: 'var(--panel)',
                              padding: '14px 14px 30px', fontSize: 13, color: 'var(--placeholder)' }}>
                  {mock.composerPlaceholder}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InboxMock });
