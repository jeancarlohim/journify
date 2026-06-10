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

## File responsibility map (edit one file per concern)

- index.html + {case-studies/coaching,the-sprint,privacy,terms}/index.html — per-route
  shells; load CDN deps + components, mount the page component
- pages/HomePage.jsx — composes sections S1–S8 (S5 skipped) from content/homepage.json
- pages/CaseStudyPolly.jsx — coaching case study (route: /case-studies/coaching)
- pages/TheSprintPage.jsx / PrivacyPage.jsx / TermsPage.jsx — their routes (privacy+terms
  noindex)
- sections/S1–S8.jsx — homepage sections (S5 = dormant teardowns, never imported)
- components/*.jsx — Section wrapper + parseInline, Accordion, S6 diagram/scroll animation,
  ProofBlock, StickyNav, MobileDrawer, Footer, Lightbox, Thinker
- content/*.json — ALL copy (homepage, case-study-coaching, the-sprint, nav, footer,
  privacy, terms). The only place words change.
- styles/tokens.css — locked design tokens + j-* utilities
- vercel.json — clean-URL rewrites (routing lives here, not in JS)
- robots.txt / sitemap.xml — 3 public URLs

Known cruft (leave for the hygiene pass, don't expand it): duplicate favicons at root and
images/logos/; unreferenced images/logos/favicon.ico.

## Verification before "done"

Open the changed route locally (or preview deploy) and confirm it renders — there is no
build step to catch errors, so a typo in a .jsx ships broken. Check the browser console.
For copy changes: confirm the JSON is valid (one trailing comma kills the page). State what
you checked.
