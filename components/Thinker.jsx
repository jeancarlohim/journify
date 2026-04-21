/* journify.ai — Thinker illustration (S2 geometric figure) */

function Thinker() {
  return (
    <div className="j-think" aria-label="Hand-on-chin figure with a thought bubble">
      {/* Thought bubble */}
      <svg className="j-think-bub" width="190" height="78" viewBox="0 0 190 78"
           style={{ position: 'absolute', top: 0, left: 30 }}>
        <circle cx="14" cy="60" r="2.5"  fill="none" stroke="#1A1714" strokeWidth="1" />
        <circle cx="22" cy="50" r="3.5"  fill="none" stroke="#1A1714" strokeWidth="1" />
        <circle cx="34" cy="38" r="5"    fill="none" stroke="#1A1714" strokeWidth="1" />
        <rect x="50" y="6" width="135" height="44" rx="2" fill="#FAF8F5" stroke="#1A1714" strokeWidth="1" />
        <text x="58" y="33"
              fontFamily="Fraunces, serif" fontStyle="italic" fontWeight="400"
              fontSize="14" fill="#1A1714">
          I need to think about it…
        </text>
      </svg>

      {/* Figure — geometric line-art pictogram */}
      <div className="j-think-bob" style={{ position: 'absolute', left: 0, bottom: 0, width: 200, height: 200 }}>
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="98" cy="58" r="22" stroke="#1A1714" strokeWidth="1" />
          <line x1="98" y1="80" x2="98" y2="92" stroke="#1A1714" strokeWidth="1" />
          <path d="M62 130 L82 92 L114 92 L138 130 Z" stroke="#1A1714" strokeWidth="1" />
          <line x1="62" y1="130" x2="58" y2="190" stroke="#1A1714" strokeWidth="1" />
          <line x1="138" y1="130" x2="142" y2="190" stroke="#1A1714" strokeWidth="1" />
          <line x1="114" y1="96" x2="146" y2="118" stroke="#1A1714" strokeWidth="1" />
          <line x1="146" y1="118" x2="118" y2="78" stroke="#1A1714" strokeWidth="1" />
          <circle cx="116" cy="76" r="6" stroke="#1A1714" strokeWidth="1" />
          <line x1="76" y1="108" x2="68" y2="156" stroke="#1A1714" strokeWidth="1" />
          <line x1="20" y1="190" x2="180" y2="190" stroke="#E8E3DB" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

Object.assign(window, { Thinker });
