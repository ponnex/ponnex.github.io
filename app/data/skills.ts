// Skill proficiency, grouped by category. `level` is a 1–5 tier (not a fake
// percentage) — 5 = expert, 4 = strong, 3 = working. Tune to your real strengths.
export interface Skill {
  name: string
  level: 1 | 2 | 3 | 4 | 5
  label: 'expert' | 'strong' | 'working'
}

export interface SkillGroup {
  group: string // category label shown as `# frameworks`
  items: Skill[]
}

// Grounded in the resume stack (Vue/Nuxt/React/Next, Vuex/Pinia/Redux,
// SCSS/Tailwind/MUI, Jest) plus the crypto / Internet Computer work.
export const skillGroups: SkillGroup[] = [
  {
    group: 'frameworks',
    items: [
      { name: 'Vue · Nuxt', level: 5, label: 'expert' },
      { name: 'React · Next.js', level: 4, label: 'strong' },
    ],
  },
  {
    group: 'languages',
    items: [
      { name: 'TypeScript', level: 5, label: 'expert' },
      { name: 'JavaScript', level: 5, label: 'expert' },
    ],
  },
  {
    group: 'styling · ui',
    items: [
      { name: 'SCSS · CSS', level: 5, label: 'expert' },
      { name: 'Tailwind', level: 5, label: 'expert' },
      { name: 'Material UI', level: 4, label: 'strong' },
    ],
  },
  {
    group: 'state · data',
    items: [
      { name: 'Pinia · Vuex', level: 5, label: 'expert' },
      { name: 'Redux', level: 4, label: 'strong' },
      { name: 'REST APIs', level: 4, label: 'strong' },
    ],
  },
  {
    group: 'web3',
    items: [
      { name: 'Internet Computer', level: 4, label: 'strong' },
      { name: 'Bitcoin · canisters', level: 4, label: 'strong' },
    ],
  },
  {
    group: 'tooling · test',
    items: [
      { name: 'Vite · Webpack', level: 4, label: 'strong' },
      { name: 'Jest', level: 4, label: 'strong' },
      { name: 'Git', level: 5, label: 'expert' },
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
