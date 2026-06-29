<template>
	<div class="portfolio">
		<LandingTemplate />
		<AboutSection />
		<WorkSection group="professional" heading="client_work" featured-only show-more />
		<WorkSection section-id="work-personal" group="personal" heading="solo_work" featured-only show-more />
		<SkillsSection />
		<ContactSection />
	</div>
</template>

<script setup lang="ts">
import LandingTemplate from '~/components/template/landing/landing.vue'
import WorkSection from '~/components/sections/work.vue'
import SkillsSection from '~/components/sections/skills.vue'
import AboutSection from '~/components/sections/about.vue'
import ContactSection from '~/components/sections/contact.vue'

// Canonical + og:url are emitted globally per-route in app.vue (trailing-slash
// form), so this page only adds the structured data below.
const SITE = 'https://ponnex.dev'

// JSON-LD: Person + WebSite. This is what lets Google (and AI search) read
// "Emmanuel Francis Ramos = Frontend Engineer, these skills, these profiles" as
// structured facts rather than guessing from prose — the core recruiter-SEO win.
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
      jobTitle: 'Frontend Engineer',
      description:
        'Frontend engineer with 9+ years building production web applications in Vue, Nuxt, React, Next.js and TypeScript. Open to remote roles.',
      knowsAbout: [
        'Frontend Engineering',
        'Web Development',
        'Vue.js',
        'Nuxt',
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'SCSS',
        'CSS',
        'Tailwind CSS',
        'Material UI',
        'Pinia',
        'Vuex',
        'Redux',
        'REST APIs',
        'Internet Computer',
        'Bitcoin',
        'Vite',
        'Webpack',
        'Jest',
        'Git',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Frontend Engineer',
        occupationLocation: { '@type': 'Place', name: 'Remote' },
        skills:
          'Vue, Nuxt, React, Next.js, TypeScript, JavaScript, SCSS, Tailwind, state management, REST APIs, Web3',
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
      name: 'Emmanuel Francis Ramos — Frontend Engineer',
      description:
        'Portfolio of Emmanuel Francis Ramos, a frontend engineer available for remote work.',
      author: { '@id': `${SITE}/#person` },
      inLanguage: 'en',
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
