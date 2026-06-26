// Skill proficiency table. Adjust names / levels / labels to your real strengths.
export interface Skill {
  name: string
  level: number // 0-100, drives the bar width
  label: string // short proficiency word
}

// Grounded in the resume stack (Vue/Nuxt/React/Next, Vuex/Pinia/Redux,
// SCSS/Tailwind/MUI, Jest). Levels are subjective — tune to taste before publishing.
export const skills: Skill[] = [
  { name: 'Vue · Nuxt', level: 95, label: 'expert' },
  { name: 'TypeScript · JS', level: 88, label: 'strong' },
  { name: 'React · Next.js', level: 80, label: 'strong' },
  { name: 'SCSS · Tailwind · MUI', level: 92, label: 'expert' },
  { name: 'State (Pinia · Vuex · Redux)', level: 86, label: 'strong' },
  { name: 'Web3 · Internet Computer', level: 78, label: 'strong' },
]

// What you offer clients — shown in the About / Services section.
export interface Service {
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Web app development',
    description: 'End-to-end front-of-app builds — from booking flows to dashboards to dapps.',
  },
  {
    title: 'Frontend architecture',
    description: 'Scalable component systems, state, and tooling for teams that need to move fast.',
  },
  {
    title: 'Design systems & UI',
    description: 'Reusable, accessible component libraries with the polish most builds skip.',
  },
  {
    title: 'Performance & motion',
    description: 'Fast, smooth interfaces — Core Web Vitals, animation, and interaction detail.',
  },
]
