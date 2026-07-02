# Action Plan — ponnex.dev SEO

Score **90 → 92/100 (A)**. No Critical/High. All in-code findings fixed 2026-06-30 and verified in a clean `npm run generate` build.

## ✅ Done (this session)
- [x] **WebP project images** (M1) — `<picture>` with WebP `<source>` + JPG fallback. 15 images **1458KB → 670KB (−54%)**. JPG kept as og:image source for max social compat.
- [x] **`/llms.txt`** (M2) — who/stack/key-projects/contact + links. In output, 200.
- [x] **Sitemap `<lastmod>`** (L1) — `autoLastmod: true`; 24 URLs stamped.
- [x] **`width`/`height` on thumbnails** (L2) — from `projectImageDims`, cards + case-study. Defensive (no CLS existed).
- [x] **`og:site_name` + `apple-touch-icon`** (L4) — both in `<head>`.
- [x] **Security + cache headers** (I2) — netlify.toml: HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy + immutable cache on `/_nuxt/*`. Applies on next deploy.

## ✅ Already implemented in source (audit false alarms — verified)
- [x] **Per-project OG dimensions** (L3) — `[slug].vue` already emits `og:image:width/height` from `projectImageDims`.
- [x] **Crawlable résumé HTML** (L5) — `/resume` already renders summary + skills + experience as real HTML above the PDF embed.

## Won't do (correct as-is)
- ❌ Remove FAQPage schema — Google retired FAQ rich results (2026-05-07) but it still feeds AI citations + good UX. Keep. (I1)
- ❌ Strict CSP — would break the Web3Forms POST + inline theme script. Skipped deliberately.

## Deploy + verify
- [ ] Deploy (push → Netlify build). Then confirm live:
  - `curl -sI https://ponnex.dev/ | grep -i strict-transport` → HSTS present
  - `curl -s https://ponnex.dev/llms.txt` → 200
  - WebP served: DevTools Network on `/projects/` shows `.webp`, image bytes ↓
  - `curl -s https://ponnex.dev/sitemap.xml | grep -c lastmod` → 24

## Ongoing — the real growth lever now is off-page
- [ ] Connect **Google Search Console** → CWV field data, indexation, query impressions (this audit inferred perf; GSC measures it).
- [ ] Run **PageSpeed Insights** on `/` and `/projects/` → confirm LCP/CLS/INP + the WebP win.
- [ ] Build **backlinks/mentions** — GitHub profile README, LinkedIn, project repos linking to ponnex.dev. Young domain; visibility now scales with links, not code.

### Leading indicators (no re-audit needed)
- Image bytes on `/projects/` ↓ (already −54% at source)
- GSC: "Good" CWV URLs, indexed pages, sitemap Last-read
- Referring domains over time
- AI-engine citations for your niche
