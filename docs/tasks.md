# Tasks: Swiss Editorial Portfolio Redesign

**Spec**: docs/spec.md · **Plan**: docs/plan.md · **Date**: 2026-07-02
**Structure**: by user story · **ClickUp**: none

Format: `- [x] [TaskID] [P?] [Story?] Description — path`
`[P]` = parallelizable with siblings (independent files).

## Phase 1: Setup

- [x] T001 Create working branch `redesign/swiss-editorial` from main — git
- [x] T002 [P] Download Archivo variable font (latin subset, weight+width axes, OFL), commit as woff2 — app/assets/fonts/Archivo.woff2
- [x] T003 [P] Create editorial token file skeleton: light (`.theme--light` paper) + dark (`.theme--default` ink) custom-property blocks reusing existing names (`--bg`, `--ink`, `--accent`, `--line`, `--panel`) — app/assets/style/_editorial.scss

## Phase 2: Foundational (blocking prerequisites)

- [x] T004 Add `@font-face` for Archivo (font-display: swap); keep JetBrains Mono; remove CarmenSans faces only if grep shows no references — app/assets/style/_fonts.scss
- [x] T005 Preload Archivo woff2 in head config; add `size-adjust` fallback metrics for CLS guard (risk 5) — nuxt.config.ts, app/assets/style/_fonts.scss
- [x] T006 Import `_editorial.scss` into build after `_terminal.scss` (override order during migration) — app/assets/style/main.scss
- [x] T007 Build editorial primitives in token file: type scale (headline clamp, editorial h2/h3, mono labels), shell/container, buttons (pill dark, ghost), card base, hairline rules — app/assets/style/_editorial.scss
- [x] T008 Add `html.js` class hook at hydration so reveal-hidden states never apply to prerendered/no-JS HTML (risk 4) — app/app.vue

## Phase 3: User Story 1 — Editorial Hero (P1)

- [x] T009 [US1] Rewrite hero markup: h1 with sr-only "Emmanuel Francis Ramos — Frontend Engineer" + aria-hidden visible "FRANCIS"(outline)/"RAMOS"(solid); role title; pitch keeping `.hero__blurb` class; CTA pair; social rail via existing component; transparent dashed portrait slot (aspect-ratio box, picture-ready); delete code window + both typewriter loops — app/components/template/landing/landing.vue
- [x] T010 [US1] Hero styles: outline/solid headline (`-webkit-text-stroke`), 3-col grid (intro/portrait/rail), dashed portrait frame, rail with real icons darkened per theme — app/assets/style/_editorial.scss
- [x] T011 [US1] Navbar restyle: remove status pill; wordmark left, links with mono superscript counts, pill CTA right; preserve mobile drawer, scroll-spy, theme toggle — app/components/navbar/navbar.vue, app/assets/style/molecules/_nav.scss
- [x] T012 [US1] Hero load orchestration: single staggered CSS sequence (headline → portrait → intro → rail), fully disabled under `prefers-reduced-motion` — app/assets/style/_editorial.scss

## Phase 4: User Story 2 — All Sections & Pages (P1)

- [x] T013 [P] [US2] New stat-strip section (years computed from 2017, counts from projects data); wire into homepage after hero — app/components/sections/stats.vue, app/pages/index.vue
- [x] T014 [P] [US2] About section editorial restyle — app/components/sections/about.vue
- [x] T015 [P] [US2] Work cards: rounded card, image thumb, meta row + circular arrow chip — app/components/sections/work.vue, app/components/sections/project-card-content.vue
- [x] T016 [P] [US2] Skills section editorial restyle (no terminal bars) — app/components/sections/skills.vue
- [x] T017 [P] [US2] FAQ restyle; `.faq__a` class and FAQPage JSON-LD untouched — app/components/sections/faq.vue
- [x] T018 [P] [US2] Contact restyle: dark CTA banner + editorial form fields; Web3Forms flow untouched — app/components/sections/contact.vue
- [x] T019 [P] [US2] Footer editorial restyle — app/components/footer/, app/assets/style/molecules/_footer.scss
- [x] T020 [P] [US2] Projects index page restyle — app/pages/projects/index.vue
- [x] T021 [P] [US2] Project detail page restyle; per-project schema untouched — app/pages/projects/[slug].vue
- [x] T022 [P] [US2] Resume page chrome restyle; PDF embed unchanged — app/pages/resume/index.vue, app/assets/style/molecules/_resume.scss
- [x] T023 [P] [US2] Thank-you page + layout restyle — app/pages/thankyou/index.vue, app/layouts/thankyou.vue, app/assets/style/molecules/_thankyou.scss
- [x] T024 [US2] Dark-variant pass: verify every section/page in both themes; outline headline stroke visible on dark — app/assets/style/_editorial.scss
- [x] T025 [US2] GATE (risk 1): Playwright sweep all routes × both themes; zero terminal visuals → remove `_terminal.scss` import and delete file — app/assets/style/main.scss, app/assets/style/_terminal.scss

## Phase 5: User Story 3 — Responsive (P1)

- [x] T026 [US3] Breakpoint pass per plan: headline clamp/wrap ≥320px, hero 3-col→stack→1-col, stats 4→2×2, cards 2→1-col, drawer nav CTA — app/assets/style/_editorial.scss
- [x] T027 [US3] Playwright matrix 320/375/768/1024/1440/1920 × all pages; fix any horizontal overflow (SC-002) — all pages

## Phase 6: User Story 6 — SEO/GEO/AIO Guard (P1)

- [x] T028 [US6] GATE (risk 3): build `nuxt generate`; diff generated HTML vs baseline — h1 contains full name, JSON-LD graphs identical, `.hero__blurb`/`.faq__a` present, headings ordered, canonical/OG/sitemap unchanged — dist/
- [x] T029 [US6] GATE: re-run audit process from `ponnex.dev-audit/` (2026-06-30 baseline); no regression, target 10/10 (SC-003) — ponnex.dev-audit/

## Phase 7: User Story 4 — Section Scroll Snap (P2)

- [x] T030 [US4] Proximity snap: `scroll-snap-type: y proximity` on scroll container; `scroll-snap-align: start` + `scroll-margin-top: var(--nav-h)` on top-level sections; anchors land aligned — app/assets/style/_editorial.scss, app/pages/index.vue
- [x] T031 [US4] iOS Safari jank test (risk 2); if settling jitters, apply <768px kill-switch; keyboard scroll not trapped — app/assets/style/_editorial.scss

## Phase 8: User Story 5 — Animations (P2)

- [x] T032 [US5] Scroll reveals: wire `useReveal` to sections, once-per-section, hidden state gated behind `html.js` — app/pages/index.vue, app/components/sections/*, app/assets/style/_editorial.scss
- [x] T033 [US5] Verify: reduced-motion shows zero animations (SC-004); no-JS/generated HTML fully visible (risk 4) — all pages

## Final Phase: Polish

- [x] T034 Lighthouse perf/a11y/CLS vs pre-redesign baseline (SC-006, risk 5) — all pages
- [x] T035 Cleanup: delete unreferenced CarmenSans font files + dead molecule styles; note redesign in docs/STRUCTURE.md — app/assets/fonts/, app/assets/style/, docs/STRUCTURE.md

## Dependencies

- Phase 2 blocks all later phases; T009/T010 pair before T012; T024→T025 strict order; T025 (theme deletion) before T028/T029 gates; snap (T030) after sections exist (Phase 4); reveals (T032) after T008.
- MVP = Phases 1–3.
