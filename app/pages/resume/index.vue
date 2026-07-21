<template>
  <div>
    <header class="page-head shell">
      <div class="page-head__tag"><span class="h">$</span> cat resume.pdf</div>
      <h1 class="page-head__title">{{ profile.name }}</h1>
      <p class="page-head__sub">
        {{ profile.title }} · {{ profile.availability }}
      </p>
    </header>

    <div ref="resumeRef" class="resume">
    <ClientOnly>
      <VuePdfEmbed :source="source" :width="pdfWidth" />
      <template #fallback>
        <span class="loading">Loading PDF…</span>
      </template>
    </ClientOnly>

    <div class="resume__links">
      <a href="ramos_resume.pdf" target="_blank">
        Download in PDF
      </a>
      <a href="https://www.linkedin.com/in/ponnex/" target="_blank">
        View LinkedIn
      </a>
      <a href="mailto:hello@ponnex.dev">
        Email me
      </a>
    </div>

    <!--
      Crawlable résumé below the PDF. Uses native <details> (closed by default)
      so humans see the viewer first, while bots still receive full HTML in the
      prerendered document — no display:none, hidden, or client-only gating.
    -->
    <details class="resume__details">
      <summary class="resume__details-summary">
        <span class="resume__details-prompt" aria-hidden="true">$</span>
        <span class="resume__details-label">cat resume.md</span>
        <span class="resume__details-hint c-dim">plain-text version</span>
        <span class="resume__details-toggle" aria-hidden="true"></span>
      </summary>
      <article class="resume__doc">
        <h1 class="resume__name">{{ profile.name }}</h1>
        <p class="resume__role">{{ profile.title }} · {{ profile.availability }}</p>
        <p class="resume__tagline c-dim">{{ profile.tagline }}</p>
        <p class="resume__summary">{{ profile.summary }}</p>

        <section class="resume__block">
          <h2 class="resume__h"># experience</h2>
          <ul class="resume__xp">
            <li v-for="job in experience" :key="job.id" class="resume__xp-item">
              <div class="resume__xp-head">
                <strong>{{ job.employer }}</strong>
                <span class="c-dim">{{ job.role }} · {{ job.period }}</span>
              </div>
              <p v-if="job.projects?.length" class="resume__xp-projects c-dim">
                Projects: {{ job.projects.join(', ') }}
              </p>
              <ul class="resume__highlights">
                <li v-for="(h, i) in job.highlights" :key="i">{{ h }}</li>
              </ul>
              <p v-if="job.stack?.length" class="resume__xp-stack c-dim">
                {{ job.stack.join(' · ') }}
              </p>
            </li>
          </ul>
        </section>

        <section class="resume__block">
          <h2 class="resume__h"># core expertise</h2>
          <ul class="resume__expertise">
            <li v-for="item in coreExpertise" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section class="resume__block">
          <h2 class="resume__h"># skills</h2>
          <p class="resume__skills">{{ skills }}</p>
        </section>

        <section class="resume__block">
          <h2 class="resume__h"># education</h2>
          <div class="resume__edu">
            <strong>{{ education.institution }}</strong>
            <span class="c-dim">{{ education.degree }} · {{ education.period }}</span>
            <span class="resume__edu-loc c-dim">{{ education.location }}</span>
          </div>
        </section>
      </article>
    </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import {
  resumeProfile as profile,
  resumeCoreExpertise as coreExpertise,
  resumeExperience as experience,
  resumeEducation as education,
} from '~/data/resume'
import { skillGroups } from '~/data/skills'

const source = '/ramos_resume.pdf'
const MAX_WIDTH = 1600
// Mirrors `$maxw` for the `.resume` container in _terminal.scss — the page is
// centered and capped at this width, so the PDF can never be wider than this.
const CONTENT_MAX = 1160

const skills = skillGroups.flatMap((g) => g.items.map((i) => i.name)).join(' · ')

// Canonical + og:url come from app.vue (per-route, trailing-slash form).
useSeoMeta({
  title: 'Résumé — Emmanuel Francis Ramos, Senior Frontend Engineer',
  description:
    'Résumé of Emmanuel Francis Ramos — senior frontend engineer with 9+ years in React, TypeScript, Vue, Nuxt and AI-native engineering. Experience across enterprise, product platforms and design systems. Open to remote roles.',
  ogTitle: 'Résumé — Emmanuel Francis Ramos, Senior Frontend Engineer',
  ogDescription:
    'Senior frontend engineer, 9+ years. React, TypeScript, AI-native workflows, design systems. Open to remote roles.',
})

// Structured data: mark the résumé as a ProfilePage about the SAME Person
// entity declared on the home page (@id #person), plus a Home › Résumé
// breadcrumb. Reusing the #person / #website @ids keeps one canonical entity
// across the site instead of spawning a second, competing person node.
const SITE = 'https://ponnex.dev'
const resumeLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/resume/#profilepage`,
      url: `${SITE}/resume/`,
      name: 'Résumé — Emmanuel Francis Ramos, Senior Frontend Engineer',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#person` },
      mainEntity: { '@id': `${SITE}/#person` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Résumé', item: `${SITE}/resume/` },
      ],
    },
  ],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(resumeLd),
    },
  ],
})

const resumeRef = ref<HTMLElement | null>(null)
const pdfWidth = ref(MAX_WIDTH)

const { width: windowWidth } = useWindowSize()

function resizePdf() {
  const el = resumeRef.value
  if (!el) return
  const styles = window.getComputedStyle(el)
  const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
  // Measure against the viewport (capped to the container width), NOT
  // el.clientWidth: the canvas inflates the element, so reading the element's
  // own width feeds the inflated value back in and the PDF never shrinks.
  const viewport = document.documentElement.clientWidth
  const available = Math.min(viewport, CONTENT_MAX) - padding
  pdfWidth.value = Math.max(0, Math.min(available, MAX_WIDTH))
}

// Recompute whenever the viewport width changes.
watch(windowWidth, () => resizePdf())

onMounted(() => {
  nextTick(resizePdf)
})
</script>

<style scoped lang="scss">
// Plain-text résumé inside <details> — crawlable when closed, expandable for humans.
.resume__details {
  margin-top: 36px;
  padding-top: 28px;
  border-top: 1px solid var(--line);
  min-width: 0;
}

.resume__details-summary {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 6px 10px;
  cursor: pointer;
  list-style: none;
  user-select: none;
  font-family: 'JetBrains Mono', 'Menlo-Regular', ui-monospace, monospace;
  font-size: 13px;
  color: var(--ink-2);
  margin-bottom: 0;
}
.resume__details-summary::-webkit-details-marker {
  display: none;
}
.resume__details-summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 4px;
  border-radius: 2px;
}

.resume__details-prompt {
  color: var(--accent-text);
  font-weight: 700;
}
.resume__details-label {
  color: var(--ink);
  font-weight: 600;
}
.resume__details-hint {
  font-size: 12px;
}
.resume__details-toggle {
  margin-left: auto;
  font-size: 12px;
  color: var(--ink-2);
}
.resume__details-toggle::before {
  content: '[+]';
}
.resume__details[open] .resume__details-toggle::before {
  content: '[–]';
}
.resume__details[open] .resume__details-toggle,
.resume__details-summary:hover .resume__details-toggle {
  color: var(--accent-text);
}

.resume__doc {
  font-family: 'JetBrains Mono', 'Menlo-Regular', ui-monospace, monospace;
  max-width: 760px;
  margin-top: 24px;
  min-width: 0;
  overflow-wrap: anywhere;
}
.resume__name {
  font-size: clamp(28px, 6vw, 44px);
  line-height: 1.05;
  margin: 0;
  color: var(--ink);
  font-style: normal;
}
.resume__role {
  font-size: 15px;
  color: var(--accent-text);
  margin: 8px 0 6px;
}
.resume__tagline {
  font-size: 13px;
  margin: 0 0 14px;
  line-height: 1.5;
}
.resume__summary {
  font-size: 15px;
  line-height: 1.65;
  color: var(--ink);
  margin: 0;
  max-width: 64ch;
}
.resume__block {
  margin-top: 30px;
}
.resume__h {
  font-size: 14px;
  color: var(--ink-2);
  margin: 0 0 12px;
  font-weight: 700;
  font-style: normal;
}
.resume__skills {
  font-size: 14px;
  line-height: 1.7;
  color: var(--ink);
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}
.resume__xp {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 24px;
}
.resume__xp-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 12px;
  font-size: 15px;
  color: var(--ink);
  min-width: 0;
}
.resume__xp-head span {
  font-size: 13px;
}
.resume__xp-projects {
  font-size: 12.5px;
  margin: 4px 0 0;
}
.resume__highlights {
  margin: 8px 0 0;
  padding: 0 0 0 18px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
  max-width: 64ch;
}
.resume__highlights li {
  margin-bottom: 6px;
}
.resume__highlights li:last-child {
  margin-bottom: 0;
}
.resume__xp-stack {
  font-size: 12.5px;
  margin: 6px 0 0;
}
.resume__expertise {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink);
}
@media (min-width: 640px) {
  .resume__expertise {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 20px;
  }
}
.resume__expertise li {
  min-width: 0;
  overflow-wrap: anywhere;
}
.resume__edu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink);
  min-width: 0;
}
.resume__edu-loc {
  font-size: 13px;
}
</style>
