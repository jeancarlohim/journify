/* journify.ai — S6Diagram + S6Mobile (scroll-animated system diagram) */
/* Phases: 0 nodes, 1 red arrows, 2 desaturate, 3 green arcs+labels, F final, R reduced-motion (=F) */

function S6Diagram({ phase = 'F', scale = 1, mobile = false }) {
  const W = 760, H = 560;
  const cx = 260;
  const nodes = [
    { id: 'offer',    label: 'Offer',     y:  20, w: 180, h: 55, hero: false },
    { id: 'outreach', label: 'Outreach',  y: 140, w: 180, h: 55, hero: false },
    { id: 'posts',    label: 'Posts',     y: 260, w: 180, h: 55, hero: false },
    { id: 'sales',    label: 'Sales calls', sub: 'DMs + calls', y: 400, w: 220, h: 78, hero: true },
  ];

  const fwdColor = (phase === '0' || phase === '1') ? '#A84438'
                  : (phase === '2' || phase === '3' || phase === 'F') ? '#C9C3B8'
                  : '#A84438';

  const fwdVisible = phase !== '0' && phase !== 'init';
  const greenVisible = phase === '3' || phase === 'F';

  const fwdLine = (fromY, toY, key, color) => {
    const x = cx;
    return (
      <g key={key}>
        <line x1={x} y1={fromY} x2={x} y2={toY - 8} stroke={color} strokeWidth="1.75" />
        <polyline
          points={`${x - 4},${toY - 12} ${x},${toY - 4} ${x + 4},${toY - 12}`}
          fill="none" stroke={color} strokeWidth="1.75" strokeLinejoin="miter" strokeLinecap="butt"
        />
      </g>
    );
  };

  const nodeBot = nodes.map(n => n.y + n.h);
  const salesTopY = nodes[3].y;
  const salesCenterX = cx;

  const targets = [
    { i: 2, label: 'sharper posts',   labelY: 290 },
    { i: 1, label: 'sharper hooks',   labelY: 170 },
    { i: 0, label: 'sharper offer',   labelY:  50 },
  ];

  const arcFor = (n) => {
    const tgt = nodes[n.i];
    const startX = salesCenterX + 30;
    const startY = salesTopY;
    const endX = cx + tgt.w / 2;
    const endY = tgt.y + tgt.h / 2;
    const cpX = cx + tgt.w / 2 + 90 + (n.i === 0 ? 30 : n.i === 1 ? 20 : 10);
    const cpY = (startY + endY) / 2;
    return { d: `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX + 6} ${endY}`,
             arrowAt: { x: endX + 6, y: endY, dx: -1, dy: 0 },
             labelX: cpX + 4, labelY: cpY };
  };

  const greenArcs = targets.map(t => ({ ...t, ...arcFor(t) }));

  return (
    <div className="j-s6" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
        {fwdVisible && (
          <g style={{ transition: 'stroke 360ms cubic-bezier(0.2,0.8,0.3,1)' }}>
            {fwdLine(nodeBot[0], nodes[1].y, 'a1', fwdColor)}
            {fwdLine(nodeBot[1], nodes[2].y, 'a2', fwdColor)}
            {fwdLine(nodeBot[2], nodes[3].y, 'a3', fwdColor)}
          </g>
        )}

        {greenVisible && (
          <g>
            {greenArcs.map((a, i) => (
              <g key={i}>
                <path d={a.d} fill="none" stroke="#1F5D3A" strokeWidth="1.75" />
                <polyline
                  points={`${a.arrowAt.x + 4},${a.arrowAt.y - 4} ${a.arrowAt.x - 4},${a.arrowAt.y} ${a.arrowAt.x + 4},${a.arrowAt.y + 4}`}
                  fill="none" stroke="#1F5D3A" strokeWidth="1.75" strokeLinejoin="miter"
                />
                <g transform={`translate(${a.labelX}, ${a.labelY - 12})`}>
                  <rect x="0" y="0" width={a.label.length * 7.2 + 16} height="24"
                        fill="#FAF8F5" stroke="#1F5D3A" strokeWidth="0.5" rx="0" />
                  <text x="8" y="16" fontFamily="Inter, sans-serif" fontSize="13"
                        fontWeight="500" fill="#1F5D3A">{a.label}</text>
                </g>
              </g>
            ))}
          </g>
        )}

        {nodes.map((n, i) => {
          const x = cx - n.w / 2;
          const fill = n.hero ? '#7A1A2A' : '#FAF8F5';
          const txt = n.hero ? '#FAF8F5' : '#1A1714';
          return (
            <g key={n.id}>
              <rect x={x} y={n.y} width={n.w} height={n.h}
                    fill={fill} stroke="#E8E3DB" strokeWidth="0.5" rx="0" />
              <text x={cx} y={n.y + (n.sub ? 30 : n.h / 2 + 6)}
                    textAnchor="middle"
                    fontFamily="Fraunces, serif" fontWeight="600"
                    fontSize={n.hero ? 19 : 17}
                    style={{ fontVariationSettings: "'opsz' 72" }}
                    fill={txt}>
                {n.label}
              </text>
              {n.sub && (
                <text x={cx} y={n.y + 52} textAnchor="middle"
                      fontFamily="Inter, sans-serif" fontSize="11" fontWeight="400"
                      fill="#E8D4D8">{n.sub}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function S6Mobile() {
  const W = 400, H = 520;
  const colX = 30;
  const nodes = [
    { id: 'offer',    label: 'Offer',     y:  20, w: 120, h: 55, hero: false },
    { id: 'outreach', label: 'Outreach',  y: 130, w: 120, h: 55, hero: false },
    { id: 'posts',    label: 'Posts',     y: 240, w: 120, h: 55, hero: false },
    { id: 'sales',    label: 'Sales calls', sub: 'DMs + calls', y: 380, w: 160, h: 78, hero: true },
  ];
  const arrowX = colX + 60;

  const fwdLine = (fromY, toY, key) => (
    <g key={key}>
      <line x1={arrowX} y1={fromY} x2={arrowX} y2={toY - 8} stroke="#C9C3B8" strokeWidth="1.75" />
      <polyline points={`${arrowX-4},${toY-12} ${arrowX},${toY-4} ${arrowX+4},${toY-12}`} fill="none" stroke="#C9C3B8" strokeWidth="1.75" />
    </g>
  );

  const salesTopY = nodes[3].y;
  const salesRightX = colX + nodes[3].w;

  const targets = [
    { i: 2, label: 'sharper posts' },
    { i: 1, label: 'sharper hooks' },
    { i: 0, label: 'sharper offer' },
  ];

  return (
    <div className="j-s6">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
        {fwdLine(nodes[0].y + nodes[0].h, nodes[1].y, 'a1')}
        {fwdLine(nodes[1].y + nodes[1].h, nodes[2].y, 'a2')}
        {fwdLine(nodes[2].y + nodes[2].h, nodes[3].y, 'a3')}

        {targets.map((t, i) => {
          const tgt = nodes[t.i];
          const endX = colX + tgt.w + 6;
          const endY = tgt.y + tgt.h / 2;
          const startX = salesRightX - 30;
          const startY = salesTopY;
          const cpX = W - 30 - i * 8;
          const cpY = (startY + endY) / 2;
          const labelX = cpX - (t.label.length * 7.2 + 16) / 2 + 4;
          const labelY = cpY;
          return (
            <g key={i}>
              <path d={`M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`} fill="none" stroke="#1F5D3A" strokeWidth="1.75" />
              <polyline points={`${endX+4},${endY-4} ${endX-4},${endY} ${endX+4},${endY+4}`} fill="none" stroke="#1F5D3A" strokeWidth="1.75" />
              <g transform={`translate(${labelX}, ${labelY - 12})`}>
                <rect x="0" y="0" width={t.label.length * 7.2 + 16} height="22" fill="#FAF8F5" stroke="#1F5D3A" strokeWidth="0.5" />
                <text x="8" y="15" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="500" fill="#1F5D3A">{t.label}</text>
              </g>
            </g>
          );
        })}

        {nodes.map((n, i) => {
          const fill = n.hero ? '#7A1A2A' : '#FAF8F5';
          const txt = n.hero ? '#FAF8F5' : '#1A1714';
          return (
            <g key={n.id}>
              <rect x={colX} y={n.y} width={n.w} height={n.h} fill={fill} stroke="#E8E3DB" strokeWidth="0.5" />
              <text x={colX + n.w / 2} y={n.y + (n.sub ? 30 : n.h / 2 + 6)} textAnchor="middle"
                    fontFamily="Fraunces, serif" fontWeight="600"
                    fontSize={n.hero ? 17 : 15}
                    style={{ fontVariationSettings: "'opsz' 72" }}
                    fill={txt}>{n.label}</text>
              {n.sub && (
                <text x={colX + n.w / 2} y={n.y + 52} textAnchor="middle"
                      fontFamily="Inter, sans-serif" fontSize="10" fill="#E8D4D8">{n.sub}</text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

Object.assign(window, { S6Diagram, S6Mobile });
