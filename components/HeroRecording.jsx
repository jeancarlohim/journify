/* journify.ai — S1 hero background: a sales call recording, drawn as one soft waveform.
   Plain 2D canvas, no library. One buffer pixel per five CSS pixels, stretched up by the
   browser (that stretch is the out-of-focus look). No pixel ever holds more than 34% oxblood,
   which keeps the H1 (#1A1714) at 8.7:1 or better. Pauses when the tab is hidden or the hero
   scrolls out of view; prefers-reduced-motion gets one still frame. */

function HeroRecording({ h1Selector = '.j-s1-h1' }) {
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    const canvas = document.createElement('canvas');
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return () => { host.removeChild(canvas); };

    const MAX = 0.34;        // hard cap on the oxblood share of any pixel = the contrast guarantee
    const SCALE = 0.2;       // one buffer pixel per 5 CSS pixels
    const HSCALE = 0.26;     // half-height of the band at full loudness, as a share of the wave's unit length (below)
    const FLOOR = 0.32;      // loudness in the pauses, so the band never goes thin
    const BASE = 0.14;       // a faint tint over the whole hero so no part of it is bare cream
    const TAU = Math.PI * 2;
    let img = null, W = 0, H = 0, env = null, mid = null, hz = null, win = null;
    let center = 0.40;       // where the band sits: the vertical middle of the H1, measured below

    function measure() {
      const sec = host.parentElement;
      const h1 = sec ? sec.querySelector(h1Selector) : null;
      if (sec && h1) {
        const a = sec.getBoundingClientRect(), b = h1.getBoundingClientRect();
        if (a.height > 0) center = (b.top + b.height / 2 - a.top) / a.height;
      }
    }
    function resize() {
      const w = Math.max(2, Math.round(host.clientWidth * SCALE));
      const h = Math.max(2, Math.round(host.clientHeight * SCALE));
      if (w !== W || h !== H) {
        W = w; H = h; canvas.width = w; canvas.height = h;
        img = ctx.createImageData(w, h); env = new Float32Array(w); mid = new Float32Array(w); hz = new Float32Array(w);
        // fade the tint out into the nav above and the next block below, so the hero has no hard edge
        win = new Float32Array(h);
        for (let y = 0; y < h; y++) {
          const v = y / (h - 1);
          const a = Math.min(1, Math.max(0, v / 0.20)), b = Math.min(1, Math.max(0, (1 - v) / 0.32));
          win[y] = (a * a * (3 - 2 * a)) * (b * b * (3 - 2 * b));
        }
      }
    }
    function draw(t) {
      resize();
      const d = img.data;
      // the wave's unit length: the hero width, but never more than 2.2 heights. Distances along the wave
      // and the band's height both scale with it, so desktop fills the hero and a phone still shows ~3 bursts.
      const U = Math.min(W, 2.2 * H);
      const perU = W / U;
      const HMAX = HSCALE * U / H;
      const scroll = t * 0.03;     // the recording plays: the wave moves left, 3% of the unit length per second
      const breathe = 0.80 + 0.10 * Math.sin(TAU * t / 9) + 0.10 * Math.sin(TAU * t / 14 + 1.3);
      for (let x = 0; x < W; x++) {
        const u = (x / (W - 1)) * perU;
        const s = u + scroll;
        // the loudness of a voice: bursts of words with quieter gaps, from three waves that never line up
        const g = 0.5 + 0.5 * (0.50 * Math.sin(TAU * (4.0 * s + t / 41))
                             + 0.30 * Math.sin(TAU * (6.3 * s - t / 23) + 1.1)
                             + 0.20 * Math.sin(TAU * (9.7 * s + t / 17) + 2.4));
        env[x] = FLOOR + (1 - FLOOR) * Math.pow(g, 1.8);
        mid[x] = center + HMAX * (0.06 * Math.sin(TAU * (0.6 * u + t / 31)) + 0.035 * Math.sin(TAU * (1.35 * u - t / 19) + 0.8));
        hz[x] = 0.6 + 0.4 * (0.5 + 0.5 * Math.sin(TAU * (1.3 * u + t / 37)));
      }
      let i = 0;
      for (let y = 0; y < H; y++) {
        const v = y / (H - 1);
        for (let x = 0; x < W; x++) {
          const e = env[x];
          const dd = (v - mid[x]) / (HMAX * e * 1.5);
          let wave = 0;
          if (dd > -1 && dd < 1) {
            const q = 1 - dd * dd;
            wave = q * q * q * (0.45 + 0.55 * e);
          }
          let amt = (BASE * hz[x] + wave * 0.92) * breathe * MAX * win[y];
          if (amt > MAX) amt = MAX;
          d[i]     = 250 + (122 - 250) * amt;
          d[i + 1] = 248 + (26  - 248) * amt;
          d[i + 2] = 245 + (42  - 245) * amt;
          d[i + 3] = 255;
          i += 4;
        }
      }
      ctx.putImageData(img, 0, 0);
    }

    // run/pause: tab hidden, hero out of view, or reduced motion each stop the loop
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = !document.hidden, inView = true, reduced = mq.matches;
    let raf = 0, last = 0, clock = 0;
    const running = () => visible && inView && !reduced;
    function frame(now) {
      raf = 0;
      if (!running()) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now; clock += dt;
      draw(clock);
      raf = requestAnimationFrame(frame);
    }
    function update() {
      if (running()) { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }
      else { if (raf) { cancelAnimationFrame(raf); raf = 0; } draw(clock); }
    }
    const onVis = () => { visible = !document.hidden; update(); };
    const onMq = (e) => { reduced = e.matches; update(); };
    document.addEventListener('visibilitychange', onVis);
    if (mq.addEventListener) mq.addEventListener('change', onMq);
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => { inView = entries[0].isIntersecting; update(); }, { threshold: 0 })
      : null;
    if (io) io.observe(host);
    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => { measure(); draw(clock); }) : null;
    if (ro) ro.observe(host);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); draw(clock); });

    measure(); draw(clock); update();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      if (mq.removeEventListener) mq.removeEventListener('change', onMq);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, [h1Selector]);

  return (
    <div ref={hostRef} className="j-s1-bg" aria-hidden="true">
      <style>{HERO_RECORDING_CSS}</style>
      <div className="j-s1-grain" />
    </div>
  );
}

/* A fine paper grain over the tint (one static SVG noise tile, no motion), so the gradient reads as
   printed rather than digital. 7% multiply: the headline stays above 8:1 under it. */
const HERO_RECORDING_GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const HERO_RECORDING_CSS = `
  .j-s1-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .j-s1-bg canvas { position: absolute; inset: 0; display: block; width: 100%; height: 100%; }
  .j-s1-grain { position: absolute; inset: 0; z-index: 1; opacity: 0.07; mix-blend-mode: multiply;
    background-image: ${HERO_RECORDING_GRAIN}; background-size: 200px 200px; }
`;

Object.assign(window, { HeroRecording });
