<template>
	<div class="portfolio">
		<LandingTemplate />
		<AboutSection />
		<WorkSection group="professional" heading="client_work" featured-only show-more />
		<WorkSection section-id="work-personal" group="personal" heading="solo_work" featured-only show-more />
		<SkillsSection />
		<FaqSection />
		<ContactSection />
	</div>
</template>

<script setup lang="ts">
import LandingTemplate from '~/components/template/landing/landing.vue'
import WorkSection from '~/components/sections/work.vue'
import SkillsSection from '~/components/sections/skills.vue'
import AboutSection from '~/components/sections/about.vue'
import FaqSection from '~/components/sections/faq.vue'
import ContactSection from '~/components/sections/contact.vue'

// Canonical + og:url are emitted globally per-route in app.vue (trailing-slash
// form), so this page only adds the structured data below.
const SITE = 'https://ponnex.dev'

// Last meaningful content update, surfaced as ProfilePage.dateModified — a
// freshness signal for search + AI. Bump when the portfolio's substance changes
// (new project, reworked copy), not on every deploy. ISO date only (no time);
// kept as a literal so it's deterministic at prerender.
const SITE_UPDATED = '2026-07-21'

// JSON-LD: ProfilePage › Person + WebSite. This is what lets Google (and AI
// search) read "Emmanuel Francis Ramos = Frontend Engineer, these skills, these
// profiles" as structured facts rather than guessing from prose — the core
// recruiter-SEO win. ProfilePage wraps it as a person-profile page (the schema
// type Google recommends for "about this person" pages) and exposes a
// SpeakableSpecification so voice assistants know which blocks to read aloud.
const personLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/#person`,
      name: 'Emmanuel Francis Ramos',
      alternateName: 'Ponnex',
      url: `${SITE}/`,
      image: `${SITE}/og.png`,
      email: 'mailto:hello@ponnex.dev',
      jobTitle: 'Senior Frontend Engineer',
      description:
        'Senior frontend engineer with 9+ years building production web applications in React, TypeScript, Vue, Nuxt and AI-native engineering workflows. Open to remote roles.',
      knowsAbout: [
        'Frontend Engineering',
        'Web Development',
        'AI-Native Engineering',
        'Claude Code',
        'MCP Integrations',
        'Specification-Driven Development',
        'React',
        'Next.js',
        'Vue.js',
        'Nuxt',
        'TypeScript',
        'JavaScript',
        'Design Systems',
        'SCSS',
        'CSS',
        'Tailwind CSS',
        'shadcn/ui',
        'TanStack Query',
        'Pinia',
        'Vuex',
        'Redux',
        'REST APIs',
        'Vitest',
        'Playwright',
        'Storybook',
        'Turborepo',
        'GitHub Actions',
        'Vite',
        'Webpack',
        'Jest',
        'Git',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Senior Frontend Engineer',
        occupationLocation: { '@type': 'Place', name: 'Remote' },
        skills:
          'React, Next.js, TypeScript, Vue, Nuxt, design systems, AI-native engineering, Claude Code, MCP',
      },
      sameAs: [
        'https://www.linkedin.com/in/ponnex/',
        'https://github.com/ponnex/',
        'https://www.instagram.com/ponnnnex/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'Emmanuel Francis Ramos — Senior Frontend Engineer',
      description:
        'Portfolio of Emmanuel Francis Ramos, a senior frontend engineer available for remote work.',
      author: { '@id': `${SITE}/#person` },
      inLanguage: 'en',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE}/#profilepage`,
      url: `${SITE}/`,
      name: 'Emmanuel Francis Ramos — Senior Frontend Engineer',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#person` },
      mainEntity: { '@id': `${SITE}/#person` },
      primaryImageOfPage: `${SITE}/og.png`,
      inLanguage: 'en',
      dateModified: SITE_UPDATED,
      // Voice assistants read these sections aloud: the hero blurb (who he is)
      // and the FAQ answers (direct Q&A).
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.hero__blurb', '.faq__a'],
      },
    },
  ],
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      // Stringified so useHead emits it verbatim as the script body.
      innerHTML: JSON.stringify(personLd),
    },
  ],
})
</script>
