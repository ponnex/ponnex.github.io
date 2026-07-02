# Implementation Plan: Swiss Editorial Portfolio Redesign

**Date**: 2026-07-02
**Spec**: docs/spec.md
**Status**: Draft

## Summary

Re-skin ponnex.dev from the terminal/engineer theme to the approved Swiss Editorial system (demo: `_temp/design-demos/demo-a2-francis.html`) by replacing the design-token layer and section styling in SCSS, rewriting the hero component, and adding proximity scroll-snap + orchestrated animations — while leaving all structured data, meta, sitemap, and content data untouched. Work happens on branch `redesign/swiss-editorial`.

## Technical Context

**Stack**: Nuxt 4 (Vue 3, TypeScript), SCSS, SSR prerender (`nuxt generate`), Netlify
**Primary Dependencies**: no new runtime packages; one new self-hosted variable font (Archivo, woff2)
**Storage**: none (static site; content in `app/data/*.ts`)
**Target Layer(s)**: frontend only
**Performance Goals**: meet/exceed current Lighthouse scores; self-hosted fonts only (no CDN requests)
**Constraints**: SEO/GEO/AIO zero-regression (spec FR-008); existing theme-toggle mechanics preserved (`useTheme`); reduced-motion support mandatory (FR-007); no content/copy changes (FR-009)

## Data Model

No changes. `app/data/projects.ts` and `app/data/skills.ts` remain the single content source. Stat-strip numbers derive from existing values (career start 2017 → computed years; project counts from `projects.ts` length; reply-time copy already in contact section).

## API Contracts

None. Contact form keeps existing Web3Forms submission flow untouched.

## Component / Module Breakdown

| File | Action |
|---|---|
| `app/assets/style/_editorial.scss` | **New** — single source of truth: Swiss Editorial tokens (light `.theme--light` paper / dark `.theme--default` ink counterpart), type scale, shell, buttons, cards, section styles. Same custom-property names as terminal (`--bg`, `--ink`, `--accent`, `--line`, `--panel`) so components need minimal churn |
| `app/assets/style/_terminal.scss` | **Retire** — remove from `main.scss` once `_editorial.scss` covers all selectors; delete file at the end |
| `app/assets/style/_fonts.scss` | **Modify** — add `@font-face` for Archivo variable (weight+width axes, `font-display: swap`); keep JetBrains Mono for meta labels; drop unused CarmenSans faces if nothing references them |
| `app/assets/fonts/Archivo.woff2` | **New** — self-hosted variable font (Google Fonts download, OFL license) |
| `app/components/template/landing/landing.vue` | **Rewrite** — outline FRANCIS + solid RAMOS headline (visible text aria-hidden; sr-only full name "Emmanuel Francis Ramos — Frontend Engineer" keeps h1 semantics), role title, pitch (keeps `.hero__blurb` class for speakable), CTA pair, social rail (reuse `social-icons.vue`), dashed transparent portrait slot (aspect-ratio box, `<picture>`-ready). Remove code window + both typewriter loops |
| `app/components/navbar/navbar.vue` | **Modify** — editorial nav: wordmark left, links with mono superscript counts, pill CTA right; remove status pill; keep mobile drawer + scroll-spy + theme toggle |
| `app/components/sections/about.vue` | **Restyle** — editorial two-column intro |
| `app/components/sections/work.vue` + `project-card-content.vue` | **Restyle** — rounded card, image thumb, meta row + circular arrow chip (per demo) |
| `app/components/sections/skills.vue` | **Restyle** — editorial list/columns, no terminal bars |
| `app/components/sections/faq.vue` | **Restyle** — keep `.faq__a` class (speakable selector) and FAQPage schema untouched |
| `app/components/sections/contact.vue` | **Restyle** — dark CTA banner per demo; form fields editorial |
| `app/components/footer/*` | **Restyle** — editorial footer |
| `app/pages/index.vue` | **Modify** — add stat-strip placement if implemented as its own component (`app/components/sections/stats.vue`, new); JSON-LD block untouched except verified speakable selectors |
| `app/pages/projects/index.vue`, `app/pages/projects/[slug].vue` | **Restyle** — same card/detail system |
| `app/pages/resume/index.vue` | **Restyle** — chrome only; PDF embed unchanged |
| `app/pages/thankyou/index.vue` + `app/layouts/thankyou.vue` | **Restyle** |
| `app/layouts/default.vue` | **Modify** — snap container semantics if needed; skip-link preserved |
| `app/composables/useReveal.ts` | **Reuse** — scroll-reveal IntersectionObserver (once-per-section) |
| `app/composables/useReducedMotion.ts` | **Reuse** — gates hero orchestration + reveals + smooth scroll |

## Scroll & Motion Design

- **Snap**: `scroll-snap-type: y proximity` on the document scroll container; each top-level `<section>` gets `scroll-snap-align: start` and `scroll-margin-top` equal to nav height. Tall sections (work, FAQ) snap only at their top edge — free scrolling inside (FR-006). `@media (prefers-reduced-motion: reduce)` keeps snap but drops `scroll-behavior: smooth`.
- **Hero load orchestration**: single CSS keyframe sequence with staggered `animation-delay` (headline → portrait frame → intro → rail), gated by reduced-motion; content visible without JS (CSS-only animation from opacity via `@media (scripting)` not required — animations are pure CSS, safe on prerendered HTML).
- **Scroll reveals**: `useReveal` adds `.is-revealed` once; base state must remain visible when JS never runs (progressive enhancement: hidden state applied only when `html.js` class present, set by an inline head script already at hydration or added minimally).

## Responsive Strategy (FR-005)

- Display headline: `font-size: clamp()` against viewport width plus `font-stretch` narrowing at small sizes; allow two-line wrap under ~480px, overflow forbidden (`overflow-wrap: anywhere` never needed — test at 320px).
- Hero grid: 3-col (intro / portrait / rail) ≥1024px → portrait+intro stacked, rail horizontal row <1024px → single column <640px, order: headline, portrait, role+pitch+CTA, social row.
- Stat strip: 4-col → 2×2 grid <768px.
- Work cards: 2-col → 1-col <840px. Project rows/lists collapse metadata below title.
- Nav: existing mobile drawer retained; pill CTA stays visible in drawer header.
- Verification matrix: 320 / 375 / 768 / 1024 / 1440 / 1920 via Playwright screenshots per page (SC-002).

## Dark Variant Notes

- Dark counterpart tokens: `--bg:#151517`, `--ink:#ececee`, paper cards → `#1c1c20` panels; outline headline uses `-webkit-text-stroke` with `currentColor`-equivalent light ink so stroke stays visible on dark (spec edge case). Accent stays gold family in dark, deepened `#e8b437` in light.

## SEO/GEO/AIO Guard

- JSON-LD graphs (Person/WebSite/ProfilePage on index, FAQPage, per-project schema), canonical/OG config in `app.vue`/`nuxt.config.ts`, sitemap module config: **no edits** beyond verifying `speakable` cssSelectors (`.hero__blurb`, `.faq__a`) still match rendered classes.
- h1 keeps full name via sr-only span; heading order h1 → h2 per section unchanged.
- Prerender + crawlLinks flow untouched; re-run audit process from `ponnex.dev-audit/` after implementation and diff against 2026-06-30 baseline (SC-003).

## Project Structure

New files only: `app/assets/style/_editorial.scss`, `app/assets/fonts/Archivo.woff2`, `app/components/sections/stats.vue`. Everything else is in-place modification. `_temp/design-demos/` stays untracked reference material.

## Dependencies

- Archivo variable font file (self-hosted; downloaded once at build-authoring time, committed to repo). No npm additions.

## Constitution Compliance

No project constitution defined — N/A.

## Known Risks

All five red-team risks accepted for mitigation (2026-07-02):

| # | Risk | Mitigation (binding) |
|---|---|---|
| 1 | Half-migrated UI — terminal selectors bleed through on subpages | Per-section migration checklist in tasks; `_terminal.scss` deleted only after Playwright sweep of every route × both themes shows no terminal visuals |
| 2 | Scroll-snap jank on iOS Safari (sticky nav + address-bar resize) | `scroll-margin-top` bound to nav-height custom property; explicit iOS Safari test; kill-switch: disable snap <768px if settling jitters |
| 3 | Silent SEO breakage (speakable selectors, h1 semantics) | `.hero__blurb` / `.faq__a` class names kept verbatim; post-build check: generated HTML h1 contains "Emmanuel Francis Ramos", JSON-LD identical to baseline; audit re-run is a merge gate |
| 4 | Reveal animations hide content in prerendered HTML (crawler/no-JS/LCP) | Hidden pre-reveal state applied only under `html.js` (class set at hydration); generated HTML inspected for fully visible content |
| 5 | Headline font FOUT/CLS from unsubsetted Archivo | Latin-subset woff2, `<link rel="preload" as="font">`, `size-adjust` fallback metrics; CLS checked against baseline |

**Strengthened position**: the redesign is a token-and-markup re-skin executed section-by-section with three hard gates — (a) visual sweep of all routes/themes before terminal-theme deletion, (b) generated-HTML semantics diff (h1, JSON-LD, speakable) before merge, (c) audit + Lighthouse re-run against the 2026-06-30 baseline. Motion and snap are progressive enhancements that degrade to plain visible content with zero JS.
