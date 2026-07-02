# SEO Audit — ponnex.dev

**Site:** https://ponnex.dev/
**Type:** Personal portfolio / freelance frontend engineer (personal brand)
**Stack:** Nuxt 3 (SSR prerender → static), deployed on Netlify
**Audit date:** 2026-06-30
**Method:** Ground-truth from prerendered build (`.output/public`) + live production parity checks (curl)

---

## SEO Health Score: 90 → 92 / 100 — Grade A− → A

> **Update 2026-06-30 — fixes applied & verified in a clean build:** WebP images (−54% image weight, 1458→670KB), `/llms.txt`, sitemap `<lastmod>`, `og:site_name` + `apple-touch-icon`, `width`/`height` on thumbnails, and Netlify security + asset-cache headers. Findings **L3** (per-project OG dims) and **L5** (crawlable résumé HTML) were found to be **already implemented in source** — the original grep missed them. Remaining open items are off-page only (links/mentions, monitoring).

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 22% | 96 | Prerendered HTML, 301 canonicalization, real 404, clean robots + sitemap |
| Content Quality (E-E-A-T) | 23% | 88 | Real named work, contact, FAQ; project narratives could go deeper |
| On-Page SEO | 20% | 94 | Unique title/description/H1/canonical per route; strong internal links |
| Schema / Structured Data | 10% | 95 | Person + WebSite + ProfilePage @graph, FAQPage, per-project Breadcrumb + CreativeWork |
| Performance (CWV — inferred) | 10% | 84 | Static + no hero image (text LCP); image weight is the gap |
| AI Search Readiness (GEO) | 10% | 87 | speakable + FAQ + Person schema; missing llms.txt |
| Images | 5% | 72 | alt present but generic; JPG not next-gen; no width/height |

> Performance is **inferred**, not measured — no field data (no Search Console / PageSpeed access in this audit). See the leading indicators per recommendation.

**Bottom line:** This is a top-decile portfolio for technical SEO. The deliberate work in recent commits (per-project schema, ProfilePage, sitemap integration, OG dimensions, tri-state theme without hydration flash) shows. There are **no Critical or High issues**. Everything below is optimization — the meaningful wins are WebP images, llms.txt, and sitemap lastmod.

---

## What's already done right (verified, not assumed)

- **Prerendered static HTML per route** (`ssr: true` + Nitro prerender). Crawlers and social bots get full markup, not an empty SPA shell. Confirmed: live `/` ships the complete `<head>` + body content.
- **Canonicalization is airtight.** Single canonical domain, trailing-slash form enforced. `https://ponnex.dev/projects` → **301** → `/projects/`. Every `<loc>` matches the 200 URL.
- **Real 404s, no soft-404.** `netlify.toml` serves `/404.html` with a genuine `404` status. Verified live: a random dead URL returns `404`, not a 200 duplicate of the homepage. (This was a deliberate fix — the config comment documents it.)
- **Full structured-data graph.** Homepage: `Person` + `WebSite` + `ProfilePage` in one `@graph`, plus a separate `FAQPage`. Project pages: `BreadcrumbList` + `CreativeWork`. `Person` carries `knowsAbout`, `hasOccupation`, `sameAs` (LinkedIn/GitHub/Instagram) — strong entity signal.
- **Unique metadata per route.** Home, `/projects/`, `/resume/`, and each `/projects/{slug}/` have distinct titles + descriptions + canonical + `og:url`. No templating collisions.
- **Social cards complete.** OG + Twitter `summary_large_image`; `og.png` is a correct **1200×630**; per-route `og:url`.
- **robots.txt is clean and AI-friendly.** `Allow: /` for all agents (AI crawlers welcome), `/thankyou` disallowed, sitemap referenced. `/thankyou` also carries `noindex, follow`.
- **sitemap.xml auto-generated** (@nuxtjs/sitemap), 24 URLs incl. the résumé PDF and image entries.
- **Accessibility/semantics that help SEO:** single `<h1>`, skip-link, aria-labels on icon links, `loading="lazy"` on project thumbs, `rel="noopener noreferrer"` on external links.
- **GEO-ready:** `speakable` schema (`.hero__blurb`, `.faq__a`), Q&A content in natural language, named entities (Singapore Airlines, Odin.fun, Bioniq, Toniq, Internet Computer) — highly citable by ChatGPT/Perplexity/AI Overviews.

---

## Findings & recommendations

Each carries: **Observation** (first principle) · **Fix** · **Depends on / unblocks** · **How we'd know it failed** (falsifiability) · **Leading indicator** (monitor without re-auditing).

### MEDIUM — fix within a month

#### M1. Project images are JPG, not next-gen (WebP/AVIF)
- **Observation:** 15 project thumbnails are baseline JPEG; several are heavy (odin 177KB, edvan 179KB, bioniq 152KB, restosearch 148KB). The site already ships WebP for the avatar, so the tooling exists. This is the single largest real performance lever.
- **Fix:** Convert thumbnails to WebP (or AVIF) — typically 30–50% smaller at equal quality. Keep JPG fallback via `<picture>` if you want belt-and-suspenders. Update `sitemap` image locs only if filenames change.
- **Depends on / unblocks:** Independent. Unblocks a higher Performance + Images score.
- **How we'd know it failed:** If converted images still total ~1.5MB or LCP doesn't improve on the `/projects/` grid, the conversion quality setting is too high.
- **Leading indicator:** Total image bytes on `/projects/` in DevTools Network; PageSpeed "Serve images in next-gen formats" audit clears.

#### M2. No `llms.txt` for AI/GEO discovery
- **Observation:** Content is already Q&A-structured and entity-rich — ideal for AI citation — but there's no `/llms.txt` to give LLM crawlers a curated map (who you are, stack, key projects, contact, résumé link).
- **Fix:** Add `public/llms.txt`: a short markdown summary + links to `/projects/`, `/resume/`, the PDF, and contact. Cheap, high-leverage for AI search visibility.
- **Depends on / unblocks:** Independent. Complements existing speakable/FAQ schema.
- **How we'd know it failed:** If `curl https://ponnex.dev/llms.txt` 404s after deploy, the file wasn't placed in `public/`.
- **Leading indicator:** Mentions/citations in ChatGPT/Perplexity when asked "frontend engineer with Internet Computer + Singapore Airlines experience"; referral hits from AI engines in analytics.

### LOW — backlog

#### L1. Sitemap entries have no `<lastmod>`
- **Observation:** No `lastmod` on any URL. Crawlers use it to prioritize re-crawls; absence isn't harmful but is a missed signal.
- **Fix:** Enable `lastmod` in `@nuxtjs/sitemap` (or set per-route via build time).
- **Falsifiability:** If `<lastmod>` is present but identical/stale across all URLs, the source date is wrong.
- **Leading indicator:** Search Console → Sitemaps → "Last read"; crawl frequency in server logs.

#### L2. `<img>` thumbnails lack explicit `width`/`height` (defensive only — **not** a CLS bug)
- **Observation:** Thumbs omit intrinsic dimensions. **Verified there is no layout shift:** `.pcard__media` reserves space (`position:relative; min-height:140–200px`) and `img{position:absolute; inset:0; object-fit:cover}`. The container holds layout regardless. So this is best-practice hardening, not a CWV defect.
- **Fix (optional):** Add `width`/`height` (or `aspect-ratio` on the media box) so the reservation survives future CSS refactors.
- **Falsifiability:** Lighthouse CLS already ≈0 here; if it isn't, the cause is elsewhere (fonts/late CSS), not these images.
- **Leading indicator:** CLS in PageSpeed field/lab data stays ~0.

#### L3. Per-project `og:image` not 1.91:1 and lacks dimension meta
- **Observation:** Project pages set `og:image` to the thumbnail (e.g. `sia.jpg` is 1200×671 ≈ 1.79:1) with no `og:image:width/height`. Social platforms crop slightly; homepage `og.png` (1200×630) is correct.
- **Fix:** Either generate per-project 1200×630 OG cards, or accept the minor crop. Add `og:image:width/height` if you keep the thumbs.
- **Leading indicator:** LinkedIn Post Inspector / X card validator preview for a project URL.

#### L4. Missing `og:site_name` and `apple-touch-icon`
- **Observation:** No `og:site_name` (minor social polish). Only `favicon.ico` is linked; `icon.png` exists in `public/` but is unreferenced, so iOS home-screen saves get a default icon.
- **Fix:** Add `{ property: 'og:site_name', content: 'ponnex.dev' }` and `<link rel="apple-touch-icon" href="/icon.png">` to `app.head`.
- **Leading indicator:** Card validators show site name; iOS "Add to Home Screen" uses the custom icon.

#### L5. `/resume` route HTML is thin (PDF rendered client-side)
- **Observation:** The route is a `vue-pdf-embed` viewer — little crawlable text in the HTML body. The PDF itself **is** indexed (listed in sitemap + reachable at `/ramos_resume.pdf` → 200), so this isn't a gap, but the HTML page contributes little text/AI-citable content.
- **Fix (optional):** Add a short HTML summary of experience above/below the embed (also helps users with the PDF disabled).
- **Leading indicator:** `/resume/` showing impressions for skill/experience queries in Search Console.

### INFO — awareness, no action

#### I1. FAQPage no longer earns Google rich results (but keep it)
- Google **retired FAQ rich results for all sites on 2026-05-07**. The existing `FAQPage` markup will no longer render an expandable SERP feature. **Do not remove it** — it still feeds AI Overviews / ChatGPT / Perplexity citations and the on-page FAQ remains good UX. No change needed; just don't expect the SERP feature.

#### I2. No custom security headers in `netlify.toml`
- No HSTS / `X-Content-Type-Options` / `Referrer-Policy` / CSP. This is **hygiene, not an SEO ranking factor** (HTTPS is already enforced by Netlify). Add a `[[headers]]` block if you want the polish; it won't move rankings.

#### I3. Off-page / domain authority
- `ponnex.dev` is a young domain. Technical foundation is maxed; visibility now scales with **backlinks and brand mentions** (GitHub profile, LinkedIn, dev communities, project repos linking back). Not measurable in this audit (no backlink API).
- **Leading indicator:** Referring domains over time (Search Console → Links, or a free tool like Moz/Bing Webmaster).

---

## Synthesis (PERCEIVE → ANALYZE → VALIDATE → ACT)

The technical and on-page layers are essentially solved — the dependency chain that usually blocks portfolios (crawlability → canonical → schema → social) is fully unblocked here. The remaining score gap is concentrated in **two leaf nodes with no dependencies**: image delivery (M1) and AI-discovery surface (M2). Both can ship independently this week. Everything else is cosmetic. The honest read: don't over-engineer further — the next real growth lever is **off-page (links/mentions)**, which is content-and-outreach work, not code.
