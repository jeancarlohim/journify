# journify.ai — site package

Three-page static site. Handcrafted React via Babel standalone over a token-based CSS utility system. No build step. No framework. Deploys to Vercel as static files with clean URL routing.

## Folder structure

```
/
├── index.html                     Route /  (homepage)
├── case-studies/
│   └── polly/
│       └── index.html             Route /case-studies/polly
├── the-sprint/
│   └── index.html                 Route /the-sprint
├── styles/
│   └── tokens.css                 Design tokens + utility classes (locked)
├── components/
│   ├── Section.jsx                Section wrapper + parseInline helper
│   ├── Accordion.jsx              Accordion + AccordionRow
│   ├── StickyNav.jsx              Shared sticky nav (fetches /content/nav.json)
│   ├── MobileDrawer.jsx           Shared mobile drawer (fetches /content/nav.json)
│   ├── Footer.jsx                 Shared footer (fetches /content/footer.json)
│   ├── Thinker.jsx                Geometric line-art figure (S2)
│   ├── S6Diagram.jsx              Animated system diagram + S6Mobile variant
│   └── S6CaseStudyAnchor.jsx      Case study link below S6 on homepage
├── sections/
│   ├── S1.jsx                     Hero
│   ├── S2.jsx                     Scene / quotes
│   ├── S3.jsx                     Diagnosis accordion
│   ├── S4.jsx                     Three columns
│   ├── S5.jsx                     Teardowns library (not rendered — see below)
│   ├── S6.jsx                     System diagram with scroll animation
│   ├── S7.jsx                     Sprint ask
│   └── S8.jsx                     Founder + FAQ
├── pages/
│   ├── HomePage.jsx               Fetches /content/homepage.json, composes S1–S8
│   ├── CaseStudyPolly.jsx         Fetches /content/case-study-polly.json
│   └── TheSprintPage.jsx          Fetches /content/the-sprint.json
├── content/
│   ├── homepage.json              All homepage copy
│   ├── case-study-polly.json      All case study copy + image metadata
│   ├── the-sprint.json            All sprint page copy
│   ├── nav.json                   Shared nav links
│   └── footer.json                Shared footer links + copy
├── images/
│   ├── s6-before.png              698×918 — before state diagram
│   ├── s6-during.png              698×918 — mid-sprint diagram
│   ├── s6-after.png               698×918 — after state diagram
│   └── sprint-tracker.png         2378×1362 retina — 21-day daily log
├── vercel.json                    Clean URL rewrites
└── README.md
```

## Architecture

### No build step
Babel-standalone compiles JSX in the browser. Scripts load via `<script type="text/babel" src="...">`. This is deliberate — a Vite migration is a separate future task.

### Content editing
Every headline, body paragraph, CTA label, FAQ item, and list item lives in `/content/*.json`. To change copy, edit the JSON file — no JSX knowledge required. Components fetch their content file at mount time (`fetch()` via React `useEffect`).

### Component sharing
No module system. Components share state via `Object.assign(window, { ... })` at the bottom of each file. Script load order in each HTML shell determines dependency resolution.

### HTML shells
Each route has a thin `index.html` that:
- Loads React, ReactDOM, Babel
- Loads shared components in dependency order
- Loads the page component
- Defines a small inline `App` with `StickyNav`, `<main>`, `Footer`, `MobileDrawer`

The `<main>` wrapper lives in the shell. Page components return fragments. `j-surface` class is on `<body>`.

### Section IDs
- Homepage: `s1`–`s8` (plus `s6-anchor`)
- Case study: `cs-s1`–`cs-s8`
- Sprint: `s1`–`s9` (scoped to route, no clash)

### StickyNav / MobileDrawer props
- `ctaHref` — the primary CTA anchor (differs per page: `#s7` homepage, `/#s7` case study, `#s9` sprint)
- `brandHref` — logo href (`null` = plain div on homepage, `"/"` = link on other pages)

## Routing (Vercel)
`vercel.json` rewrites serve clean URLs. No `.html` in the browser address bar.

## Dev scrubber
Add `?dev=1` to the homepage URL to reveal the S6 phase scrubber. Lets you manually step through the scroll animation phases (0, 1, 2, 3, F).

## S5 — preserved but not rendered
`/sections/S5.jsx` contains the Teardowns library section. It is not imported or rendered on the homepage. Preserved so it can be wired in once teardown content exists.

## Known issues resolved in this restructure

1. **S7 pricing** — Updated from `€3K / €3–8K` to `€4K / €7.5K–10K` to match sprint page.
2. **S6 broken link** — `/the-system` replaced with `/case-studies/polly`.
3. **Dead S5 mobile CSS** — `.j-s5-grid` rules removed from homepage shell (S5 doesn't render).
4. **S1 body copy** — Updated from "21-day sprint" to "45-day sprint" for consistency.
5. **Sprint section IDs** — Simplified from `sp-s1`–`sp-s9` to `s1`–`s9` (scoped to route).
6. **Cal.com CTAs** — All "Apply for the sprint →" and "Book a fit call →" CTAs now point to `https://cal.com/jeancarlohim/conversion-diagnostic`.

## Deferred

- **"Download the 1-pager" CTAs** — Removed from S1 hero (homepage) and sprint page hero. TODO comments left in place.
- **Vite migration** — Build step, hot reload, bundling. Separate future task.
- **S5 teardown content** — Section built, waiting for real teardown cases.
