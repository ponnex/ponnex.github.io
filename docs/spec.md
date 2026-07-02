# Feature Specification: Swiss Editorial Portfolio Redesign

**Created**: 2026-07-02
**Status**: Draft

## Overview

Redesign the ponnex.dev portfolio from the current terminal/engineer theme to the approved "Swiss Editorial" direction (giant outline+solid headline, off-white paper palette, editorial layout — per approved demo `_temp/design-demos/demo-a2-francis.html`), across all pages, without regressing the site's existing search/AI discoverability (SEO/GEO/AIO) scores.

## User Stories

### Story 1 — Visitor sees the new editorial hero (Priority: P1)

A visitor (recruiter or prospective client) lands on the homepage and immediately sees a bold editorial hero: "FRANCIS" in outline type and "RAMOS" in solid type on an off-white paper background, with role title, short pitch, primary CTA, and a social-link rail using the site's real platform icons. A reserved portrait area (transparent, dashed border) sits centered under the headline until the owner's portrait is supplied.

**Why this priority**: The hero is the first impression and the core of the approved redesign.

**Acceptance Criteria**:

1. **Given** the homepage loads on desktop, **When** the hero renders, **Then** the headline shows "FRANCIS" (outline) and "RAMOS" (solid) on one line, with role title, pitch copy, CTA button, and social rail with real platform icons (LinkedIn, GitHub, Instagram, Buy Me a Coffee).
2. **Given** the portrait image has not yet been provided, **When** the hero renders, **Then** the portrait slot appears as a transparent area with a dashed border (no solid gray fill).
3. **Given** the hero renders, **Then** no "Available for new projects" status pill is present in the navigation.
4. **Given** any assistive technology or search crawler reads the page, **Then** the page's primary heading semantics still expose the full name "Emmanuel Francis Ramos" in machine-readable form.

### Story 2 — All sections and pages match the new design (Priority: P1)

A visitor scrolling the homepage sees every section (about, services, client work, solo work, skills, FAQ, contact) re-skinned in the Swiss Editorial system: paper palette, editorial typography, stat strip, work cards with rounded thumbnails and metadata rows. Subpages (projects, resume, thank-you) adopt the same system.

**Why this priority**: A partial re-skin reads as broken; brand consistency is the point of the redesign.

**Acceptance Criteria**:

1. **Given** any homepage section renders, **Then** its palette, typography, and component styling follow the Swiss Editorial system (no leftover terminal-theme visuals such as grid-paper texture, code-window chrome, or typewriter effects unless intentionally retained as accents).
2. **Given** the projects, resume, or thank-you page renders, **Then** it uses the same design system as the homepage.
3. **Given** the site's theme toggle is used, **Then** a dark counterpart of the Swiss Editorial palette applies consistently to all sections and pages (toggle and system-preference behavior preserved).

### Story 3 — Responsive behavior on all viewports (Priority: P1)

A visitor on a phone, tablet, or desktop sees a layout adapted to their viewport: the giant headline scales without overflow, the three-column hero collapses gracefully, cards and lists reflow to a single column, and navigation remains usable on small screens.

**Why this priority**: The majority of first-time recruiter visits may be mobile; an overflowing display headline breaks the design instantly.

**Acceptance Criteria**:

1. **Given** viewport widths from 320px to 1920px, **When** any page renders, **Then** there is no horizontal overflow and all text remains legible.
2. **Given** a mobile viewport, **When** the hero renders, **Then** the headline, portrait slot, intro, and social rail stack in a sensible order without clipped content.
3. **Given** a mobile viewport, **When** the navigation renders, **Then** all nav destinations and the primary CTA remain reachable.

### Story 4 — Section-by-section scrolling (Priority: P2)

A visitor scrolling the homepage experiences each major section as a distinct full section; when scrolling ends near a section boundary the viewport settles to align with that section (proximity snap), while sections taller than the viewport still scroll freely inside.

**Why this priority**: Adds the presentation feel of the reference design; secondary to visual redesign itself.

**Acceptance Criteria**:

1. **Given** the homepage, **When** the user scrolls and stops near a section boundary, **Then** the viewport settles aligned to that section.
2. **Given** a section taller than the viewport (e.g., client work, FAQ), **When** the user scrolls within it, **Then** scrolling is not hijacked and all content is reachable.
3. **Given** a user with reduced-motion preference, **When** they scroll or navigate, **Then** no forced smooth-scrolling or snap animation causes motion discomfort (instant or gentle settling).

### Story 5 — Animations with orchestrated page load (Priority: P2)

On first load, hero elements animate in as one orchestrated sequence (headline, portrait slot, intro, rail). As the visitor scrolls, sections reveal with subtle entrance animations. Users with reduced-motion preference see content immediately with no animation.

**Why this priority**: Polish layer; enhances the redesign but must never block content or accessibility.

**Acceptance Criteria**:

1. **Given** first page load with motion allowed, **Then** hero elements animate in one coordinated sequence rather than scattered micro-animations.
2. **Given** scrolling with motion allowed, **When** a section enters the viewport, **Then** it reveals with a subtle entrance animation exactly once.
3. **Given** reduced-motion preference, **Then** all content renders immediately in final position with no entrance animations.
4. **Given** animations run, **Then** page content is never permanently hidden if scripting fails (content visible without JavaScript).

### Story 6 — Discoverability preserved at 10/10 (Priority: P1)

Search engines, AI assistants, and answer engines continue to read the site's structured data, metadata, sitemap, and semantic content exactly as before (or better). The redesign is purely presentational from a crawler's perspective.

**Why this priority**: Existing SEO/GEO/AIO investment is a stated hard constraint; regression is unacceptable.

**Acceptance Criteria**:

1. **Given** the redesigned pages, **Then** all existing structured data (person/profile/website/FAQ/project schemas), meta tags, canonical URLs, OG images, and sitemap entries remain present and valid.
2. **Given** the redesigned pages, **Then** heading hierarchy remains semantically correct (single h1 containing the full name, ordered h2/h3 sections).
3. **Given** the redesigned pages, **Then** the sections previously marked as voice-assistant speakable (hero blurb, FAQ answers) still exist with equivalent selectors or updated structured-data references.
4. **Given** a post-redesign audit of SEO/GEO/AIO readiness, **Then** scores meet or exceed pre-redesign baseline (target 10/10; no new failures introduced by the redesign).

### Edge Cases

- What happens when the portrait image is later provided? The dashed placeholder must be swappable for the real image without layout shift or design rework.
- What happens on very narrow viewports (<360px) where even scaled display type may wrap? Headline may wrap to two lines but must never overflow.
- What happens when JavaScript is disabled? All content visible; snap and animations degrade to plain scrolling.
- What happens with keyboard-only navigation? Snap behavior must not trap focus or prevent tabbing through sections.
- What happens to in-page anchor links (e.g., contact) with snapping active? Anchor navigation must land correctly aligned.
- What happens in the dark variant to outline-style headline text? Outline stroke must remain visible against the dark background.

## Functional Requirements

- **FR-001**: All redesign work MUST occur on a new dedicated branch, leaving the main branch untouched until review.
- **FR-002**: The homepage hero MUST display the outline "FRANCIS" + solid "RAMOS" headline, role title, pitch, primary CTA, and social rail with the site's real platform icons; the "Available for new projects" status pill MUST be removed.
- **FR-003**: The portrait slot MUST render as a transparent area with a dashed border until a portrait image is provided, and MUST accept a real image later without layout change.
- **FR-004**: All homepage sections and all subpages MUST adopt the Swiss Editorial design system in both light and dark theme variants, preserving the existing theme toggle behavior.
- **FR-005**: All pages MUST be responsive from 320px to 1920px with no horizontal overflow.
- **FR-006**: The homepage MUST structure each major content area as a distinct full section with proximity-based scroll settling; sections taller than the viewport MUST remain freely scrollable.
- **FR-007**: The site MUST present an orchestrated hero load animation and once-per-section scroll reveal animations, fully disabled under reduced-motion preference.
- **FR-008**: The redesign MUST NOT remove or invalidate any existing structured data, metadata, canonical/OG configuration, or sitemap behavior; the full name "Emmanuel Francis Ramos" MUST remain in the page's primary heading semantics.
- **FR-009**: Real content MUST be preserved: existing project data, stats (years of experience, industries, projects, reply time), FAQ content, and contact functionality.

## Out of Scope

- Producing or editing the portrait photograph (provided later by owner).
- New written content, copywriting changes, or new projects/case studies.
- Backend/contact-form provider changes (existing form submission flow stays).
- New pages beyond the existing four (home, projects, resume, thank-you).
- Blog, services detail pages, or testimonials (present in reference designs but not in scope).

## Success Criteria

- **SC-001**: Redesigned site visually matches the approved demo direction (hero composition, palette, typography, cards) as judged by the owner on desktop and mobile.
- **SC-002**: Zero horizontal overflow at 320px, 375px, 768px, 1024px, 1440px, and 1920px widths on every page.
- **SC-003**: Post-redesign SEO/GEO/AIO audit shows no regression versus pre-redesign baseline; all previously passing checks still pass (target 10/10). Baseline = the existing audit reports in `ponnex.dev-audit/` (2026-06-30); the same audit process is re-run after the redesign for comparison.
- **SC-004**: With reduced-motion enabled, no entrance animations or forced smooth scrolling occur anywhere.
- **SC-005**: All existing routes remain reachable and render the new design in both theme variants.
- **SC-006**: Lighthouse (or equivalent) performance and accessibility scores meet or exceed pre-redesign baseline.

## Clarifications

### Session 2026-07-02

- Q: Which section-scrolling behavior, given some sections exceed one viewport? → A: CSS proximity-based scroll snap — settle at boundaries when near, free scroll inside tall sections, no JS scroll-jacking.
- Q: Redesign scope: index only or subpages too? → A: All pages (home, projects, resume, thank-you).
- Q: Fate of existing dark/light theme toggle given the light-paper design? → A: Keep toggle; create a dark counterpart of the Swiss Editorial palette (inverted ink/paper), preserving system-preference behavior.
