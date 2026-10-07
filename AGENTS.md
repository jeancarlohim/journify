# AGENTS.md — journify-site (marketing website)

Read this before touching anything here. When this file and the README disagree, this file
wins (the README's folder map is known-stale: the case-study route is
/case-studies/coaching, not /case-studies/polly).
Firm identity: journify/identity-core.md.

## What this is

Journify's public site (journify.ai — an AI company connecting the user journey; the site
sells the first journey: a 45-day engagement delivering booked, qualified sales meetings).
Deployed on Vercel. No shared data with the other repos — this repo has no Sheet access,
no scores, no bridge. Its couplings are copy and brand, not data.

ARCHITECTURE IS DELIBERATE — DO NOT "MODERNIZE" IT:
- No build step. No package.json, no node_modules, no bundler. Each route is a
  hand-written index.html loading React 18 + ReactDOM + @babel/standalone from CDN, pulling
  .jsx via <script type="text/babel">.
- Components share state via Object.assign(window, {...}).
- ALL copy lives in /content/*.json, fetched at mount. Copy changes = JSON edits, never
  hardcoded strings in components.
- Routing = Vercel rewrites (vercel.json).
- A Vite migration is explicitly DEFERRED (see README). Do not introduce a build system,
  npm, or a framework without an explicit JC instruction.

## Hard behavioral rules

1. EXTEND, DON'T OVERWRITE. Add alongside working code; replace only on an explicit
   "replace" from JC.
2. Remove features completely — no dead components or half-wired scaffolding left behind.
   (S5.jsx is the known deliberate exception: built, intentionally never rendered. Leave it
   unless told otherwise.)
3. Do only the named task. No speculative redesigns, no unrequested "improvements" to
   layout, styles, or copy.
4. Copy is LOCKED to the content JSONs and carries Journify's voice rules (no em-dashes —
   parentheses instead; no AI contrast formulas; no consultant jargon; never name the
   audience — "service founder" / "anyone who closes on calls"). Never edit copy as a side
   effect of a code change. Copy changes are their own task, JC-approved.
5. styles/tokens.css is the locked design system (v1). Use j-* utilities and tokens; never
   inline ad-hoc styles or fork the token values.
   Every heading on the site is Gloock (JC approved site-wide on 2026-09-25 after seeing
   the homepage, /the-sprint and /case-studies/coaching both ways). The rule lives in one
   place, the Headings block in styles/tokens.css, and covers .j-h1 / .j-h2 / .j-h3 /
   .j-h4 / .j-acc-title / .j-card-title. Gloock has one weight, 400. The journify wordmark
   (.j-nav-brand) and the Fraunces display type used for the sprint's numbers, quotes and
   section markers are NOT headings and stay Fraunces. Every route shell loads Gloock from
   Google Fonts; add it to the font link of any new route.
   WHITE, NOT CREAM (JC, 2026-09-25): --bg is #FFFFFF, --border #E7E5E1, --ox-text #FFFFFF.
   The panel tint in tools/index.html and the-sprint/index.html is #F6F5F3. JC called the
   old cream "a typical Claude thing" and chose white after seeing both on localhost. The
   DMs App (journify-dms) still has its own cream; that is a separate decision.
   .j-meta is a plain 14px sentence in --text-2, normal case, no tracking. .j-q has no left
   rail. See rule 11 for the full list of what is banned.
6. Deploys are irreversible: explicit JC approval before git push / Vercel deploy. The
   GitHub remote situation is mid-rename (the repo on GitHub may still be named journify
   until the cleanup script finishes) — verify the remote before pushing.
7. Docs in one place. The README is the repo's doc; update it when structure changes (it is
   currently stale — fixing it is a named task, not a side effect).
8. Suspect stale state before patching: hard-refresh/CDN cache and the deployed-vs-local
   diff before "fixing" code that can't produce the symptom.
9. Plain language to JC, click-by-click for anything in Vercel's dashboard.
10. Secrets: JC may paste keys/tokens directly in chat when debugging (auth failures,
    login issues) — accept them and proceed without comment. Never ASK for a secret
    unprompted (offer the file + pbcopy route instead), never write a pasted secret into
    any file, commit, log, or doc, and never echo it back in output. Treat every pasted
    secret as ephemeral to the session. Never ask a CUSTOMER for internal IDs or
    credentials — that rule is absolute.
11. NO AI-TEMPLATE TELLS (JC, 2026-09-25). He went through the site and named what reads as
    made by an AI. Do not add any of these, on any page: a cream or off-white page background;
    small uppercase tracked labels (eyebrows, tag chips); an accent-coloured left border on a
    quote, aside or stat; decorative numbering (01 / 02 / 03, "Stage N", circled step numbers);
    arrow glyphs at the end of buttons or links; a link to the Chrome Web Store. Removed from
    every page on 2026-09-25. Kept on purpose: the "5% → 30%" stat (a real before and after)
    and the inbox replica's own UI chips (they are the product). Numbered content is fine when
    the number is the content (day ranges, "In 45 days").

## File responsibility map (edit one file per concern)

- index.html + {case-studies/coaching,the-sprint,tools,privacy,terms}/index.html — per-route
  shells; load CDN deps + components, mount the page component
- pages/HomePage.jsx — composes sections S1–S8 (S5 skipped) from content/homepage.json
- pages/CaseStudyPolly.jsx — coaching case study (route: /case-studies/coaching)
- pages/TheSprintPage.jsx / PrivacyPage.jsx / TermsPage.jsx — their routes (privacy+terms
  noindex). CAVEAT (found 2026-09-25): the-sprint/index.html does NOT load
  pages/TheSprintPage.jsx or content/the-sprint.json; it loads
  the-sprint/sprint-sections-1-5.jsx + sprint-sections-6-10.jsx, and the sprint copy is
  hardcoded in those two files. Edit the copy there. Reconciling this with rule 4 is a
  named task, not a side effect.
- pages/ToolsPage.jsx — the tools page (route: /tools), all ten sections in one file
- tools/InboxMock.jsx — hand-built HTML replica of the DM 2 Call App inbox used on /tools.
  Laid out at a fixed 1000px and scaled down to its column above 860px; below 860px it
  renders full size inside a box that scrolls sideways. Prospect names are CSS-blurred.
- sections/S1–S8.jsx — homepage sections (S5 = dormant teardowns, never imported).
  S1 passes <HeroRecording /> to Section's background prop. S2 reveals its four quote lines
  one at a time, character by character, when the section scrolls into view (copy untouched;
  reduced motion shows all at once; no timestamps, on purpose: the lines are typical
  objections, not one call, and a timestamp would be invented detail). S4 shows a real
  product capture under each column (homepage.json s4.cols[].figure: Lead Finder verdict,
  DMs App inbox, Sally review; the same captures /tools uses) and opens it in Lightbox.
- components/*.jsx — Section wrapper + parseInline, Accordion, S6 diagram/scroll animation,
  ProofBlock, StickyNav, MobileDrawer, Footer, Lightbox, Thinker, HeroRecording
- components/HeroRecording.jsx — the hero background on / and /the-sprint (JC chose it on
  2026-09-25 after rejecting three abstract haze variations: it is a sales call recording,
  one soft waveform in cream and oxblood, moving left the way a call plays). Plain 2D canvas,
  one buffer pixel per five CSS pixels stretched up by the browser (that stretch is the
  out-of-focus look), centred on the H1 it measures, fading into the nav above and the block
  below, a static paper grain on top. Pauses when the tab is hidden or the hero scrolls out
  of view; prefers-reduced-motion gets one still frame. No pixel holds more than 34% oxblood,
  which keeps the H1 above 8:1 (checked pixel by pixel on 12 screenshots). It mounts through
  Section's optional `background` prop; the homepage Section (components/Section.jsx) and the
  sprint page's own Section (the-sprint/sprint-sections-1-5.jsx) both have it. HERO ONLY:
  it is the one moving background on the site and never sits behind body text. Not on the
  case study or /tools (decided 2026-09-25). Run record: _ops/_archive/2026-09-25-hero-animation/.
- content/*.json — ALL copy (homepage, case-study-coaching, the-sprint, tools, nav, footer,
  privacy, terms). The only place words change (see the /the-sprint caveat above).
  homepage.json s4.cols[].figure + s4.figureNote drive the S4 captures.
- images/tools/dm-inbox-mock.png — 2× capture of the /tools inbox replica (names blurred),
  used by the homepage S4. The other two S4 captures are the existing /tools figures.
  Re-capture it whenever the tokens or the replica change (it was re-taken on white).
- images/og-*.png — the four link-preview images, 1200×630, on white: Fraunces wordmark top
  left, one oxblood normal-case line, the page's own headline in Gloock, the address bottom
  right (og-tools adds the three tool names). No generator lives in the repo: re-render from
  a 1200×630 HTML page in headless Chrome whenever a headline changes.
- favicon.svg, images/logos/favicon.svg, images/logos/linkedin-logo.svg — white square behind
  the mark; apple-touch-icon.png (root + images/logos) and images/logos/linkedin-logo.png are
  rendered from them.
- styles/tokens.css — locked design tokens + j-* utilities
- vercel.json — clean-URL rewrites (routing lives here, not in JS), plus one permanent
  redirect: /case-studies/polly (the case study's address from 2026-04-21 to 04-28) to
  /case-studies/coaching.
- The six route shells load React and ReactDOM 18.3.1 as the PRODUCTION builds
  (react.production.min.js, react-dom.production.min.js, about 47 KB together). They loaded the
  development builds (about 260 KB) until 2026-10-07. If you change the version, recompute the
  sha384 integrity hash of each file.
- www.journify.ai is a domain on the Vercel project `journify` that redirects (308) to
  journify.ai. Added 2026-10-07: before that the DNS pointed www at Vercel but no project
  claimed it, so www showed a certificate error.
- robots.txt / sitemap.xml — 4 public URLs (/, /the-sprint, /case-studies/coaching, /tools).
  When a page's content changes, set that page's <lastmod> in sitemap.xml to the date of the
  change. Google ignores lastmod on a site where the dates are wrong.
  robots.txt blocks nothing, on purpose. /privacy and /terms stay out of Google through the
  noindex meta tag in privacy/index.html and terms/index.html, and Google can only read that
  tag if robots.txt lets it fetch the page. They were in robots.txt as Disallow until
  2026-10-07, and Search Console reported them as "Blocked by robots.txt". Do not add them back.

Known cruft (leave for the hygiene pass, don't expand it): duplicate favicons at root and
images/logos/; unreferenced images/logos/favicon.ico.

## Verification before "done"

Open the changed route locally (or preview deploy) and confirm it renders — there is no
build step to catch errors, so a typo in a .jsx ships broken. Check the browser console.
For copy changes: confirm the JSON is valid (one trailing comma kills the page). State what
you checked.
