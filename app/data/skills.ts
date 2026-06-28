// Skills grouped by category. `context` describes how you use each tool in
// production — not a self-rated score.
export type SkillContext = 'daily_driver' | 'production_ready' | 'exploring'

export interface Skill {
  name: string
  context: SkillContext
}

export interface SkillGroup {
  group: string // category label shown as `# frameworks`
  items: Skill[]
}

export const skillContextLabels: Record<SkillContext, string> = {
  daily_driver: 'daily',
  production_ready: 'production',
  exploring: 'exploring',
}

// Grounded in the resume stack (Vue/Nuxt/React/Next, Vuex/Pinia/Redux,
// SCSS/Tailwind/MUI, Jest) plus the crypto / Internet Computer work.
export const skillGroups: SkillGroup[] = [
  {
    group: 'frameworks',
    items: [
      { name: 'Vue · Nuxt', context: 'daily_driver' },
      { name: 'React · Next.js', context: 'production_ready' },
    ],
  },
  {
    group: 'languages',
    items: [
      { name: 'TypeScript', context: 'daily_driver' },
      { name: 'JavaScript', context: 'daily_driver' },
    ],
  },
  {
    group: 'styling · ui',
    items: [
      { name: 'SCSS · CSS', context: 'daily_driver' },
      { name: 'Tailwind', context: 'daily_driver' },
      { name: 'Material UI', context: 'production_ready' },
    ],
  },
  {
    group: 'state · data',
    items: [
      { name: 'Pinia · Vuex', context: 'daily_driver' },
      { name: 'Redux', context: 'production_ready' },
      { name: 'REST APIs', context: 'production_ready' },
    ],
  },
  {
    group: 'web3',
    items: [
      { name: 'Internet Computer', context: 'production_ready' },
      { name: 'Bitcoin · canisters', context: 'production_ready' },
    ],
  },
  {
    group: 'tooling · test',
    items: [
      { name: 'Vite · Webpack', context: 'production_ready' },
      { name: 'Jest', context: 'production_ready' },
      { name: 'Git', context: 'daily_driver' },
    ],
  },
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
