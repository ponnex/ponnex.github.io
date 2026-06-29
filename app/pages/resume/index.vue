<template>
  <div ref="resumeRef" class="resume">
    <!--
      Readable, crawlable résumé. The PDF below renders in a client-only canvas
      that search engines and recruiters' parsers can't read — so the substance
      (summary, skills, experience) also lives here as real HTML. Built from the
      same project/skill data the rest of the site uses, so it never drifts.
    -->
    <article class="resume__doc">
      <p class="resume__kicker"><span class="c-accent">$</span> cat resume.md</p>
      <h1 class="resume__name">Emmanuel Francis Ramos</h1>
      <p class="resume__role">Frontend Engineer · Remote · Open to work</p>
      <p class="resume__summary">
        Frontend engineer with 9+ years building production web applications
        across airlines, banking, e-commerce and crypto. I work day-to-day in
        Vue, Nuxt, React, Next.js and TypeScript — owning features end-to-end,
        from design system to shipped, real-time, on-chain interfaces.
        Available for remote roles.
      </p>

      <section class="resume__block">
        <h2 class="resume__h"># skills</h2>
        <p class="resume__skills">{{ skills }}</p>
      </section>

      <section class="resume__block">
        <h2 class="resume__h"># experience</h2>
        <ul class="resume__xp">
          <li v-for="p in experience" :key="p.id" class="resume__xp-item">
            <div class="resume__xp-head">
              <strong>{{ p.title }}</strong>
              <span class="c-dim"
                >{{ p.role }}<template v-if="p.year"> · {{ p.year }}</template></span
              >
            </div>
            <p class="resume__xp-desc">{{ p.outcome || p.description }}</p>
            <p class="resume__xp-stack c-dim">{{ p.stack.join(' · ') }}</p>
          </li>
        </ul>
      </section>
    </article>

    <ClientOnly>
      <VuePdfEmbed :source="source" :width="pdfWidth" />
      <template #fallback>
        <span class="loading">Loading pdf...</span>
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
  </div>
</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { projects } from '~/data/projects'
import { skillGroups } from '~/data/skills'

const source = '/ramos_resume.pdf'
const MAX_WIDTH = 1600
// Mirrors `$maxw` for the `.resume` container in _terminal.scss — the page is
// centered and capped at this width, so the PDF can never be wider than this.
const CONTENT_MAX = 1160

// Crawlable résumé content, derived from the shared data so it stays in sync.
const experience = projects.filter((p) => p.group !== 'personal')
const skills = skillGroups.flatMap((g) => g.items.map((i) => i.name)).join(' · ')

// Canonical + og:url come from app.vue (per-route, trailing-slash form).
useSeoMeta({
  title: 'Résumé — Emmanuel Francis Ramos, Frontend Engineer',
  description:
    'Résumé of Emmanuel Francis Ramos — frontend engineer with 9+ years in Vue, Nuxt, React, Next.js and TypeScript. Experience across airlines, banking, e-commerce and crypto. Open to remote roles.',
  ogTitle: 'Résumé — Emmanuel Francis Ramos, Frontend Engineer',
  ogDescription:
    'Frontend engineer, 9+ years. Vue, Nuxt, React, Next.js, TypeScript. Open to remote roles.',
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
// Scoped to the readable résumé block; uses the same theme tokens as the rest
// of the terminal UI so it tracks light/dark and the accent colour.
.resume__doc {
  // Matches $mono in _terminal.scss (SCSS vars aren't in scope here).
  font-family: 'JetBrains Mono', 'Menlo-Regular', ui-monospace, monospace;
  max-width: 760px;
  margin-bottom: 40px;
}
.resume__kicker {
  font-size: 13px;
  color: var(--ink-2);
  margin: 0 0 10px;
}
.resume__name {
  font-size: clamp(28px, 6vw, 44px);
  line-height: 1.05;
  margin: 0;
  color: var(--ink);
}
.resume__role {
  font-size: 15px;
  color: var(--accent-text);
  margin: 8px 0 18px;
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
}
.resume__skills {
  font-size: 14px;
  line-height: 1.7;
  color: var(--ink);
  margin: 0;
}
.resume__xp {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 20px;
}
.resume__xp-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 12px;
  font-size: 15px;
  color: var(--ink);
}
.resume__xp-head span {
  font-size: 13px;
}
.resume__xp-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
  margin: 4px 0 0;
  max-width: 64ch;
}
.resume__xp-stack {
  font-size: 12.5px;
  margin: 4px 0 0;
}
</style>
