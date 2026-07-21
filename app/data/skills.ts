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

// Grounded in the 2026 resume stack (Vue/Nuxt/React/Next, AI-native workflows,
// design systems, real-time product interfaces).
export const skillGroups: SkillGroup[] = [
  {
    group: 'ai engineering',
    items: [
      { name: 'Claude Code', context: 'daily_driver' },
      { name: 'Cursor', context: 'daily_driver' },
      { name: 'MCP integrations', context: 'production_ready' },
      { name: 'Spec-driven development', context: 'production_ready' },
      { name: 'GitHub Copilot', context: 'production_ready' },
    ],
  },
  {
    group: 'architecture',
    items: [
      { name: 'Design systems', context: 'production_ready' },
      { name: 'Monorepo · Turborepo', context: 'production_ready' },
      { name: 'Offline-first', context: 'production_ready' },
      { name: 'i18n · Accessibility', context: 'production_ready' },
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
    group: 'state · data',
    items: [
      { name: 'TanStack Query', context: 'production_ready' },
      { name: 'Pinia · Vuex', context: 'daily_driver' },
      { name: 'Redux · Zustand', context: 'production_ready' },
      { name: 'REST APIs', context: 'production_ready' },
    ],
  },
  {
    group: 'styling · ui',
    items: [
      { name: 'Tailwind', context: 'daily_driver' },
      { name: 'SCSS · CSS', context: 'daily_driver' },
      { name: 'shadcn/ui', context: 'production_ready' },
      { name: 'Material UI', context: 'production_ready' },
    ],
  },
  {
    group: 'cloud · ci',
    items: [
      { name: 'GitHub Actions', context: 'production_ready' },
      { name: 'Vercel · Netlify', context: 'production_ready' },
      { name: 'Docker', context: 'production_ready' },
      { name: 'pnpm · npm', context: 'production_ready' },
    ],
  },
  {
    group: 'tooling · test',
    items: [
      { name: 'Vitest · Playwright', context: 'production_ready' },
      { name: 'Storybook', context: 'production_ready' },
      { name: 'Vite · Webpack', context: 'production_ready' },
      { name: 'Jest', context: 'production_ready' },
      { name: 'Git', context: 'daily_driver' },
    ],
  },
  {
    group: 'frameworks',
    items: [
      { name: 'React · Next.js', context: 'daily_driver' },
      { name: 'Vue · Nuxt', context: 'daily_driver' },
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
    description: 'End-to-end front-of-app builds — from booking flows to dashboards to real-time product interfaces.',
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
    title: 'AI-native engineering',
    description: 'Spec-driven workflows, repository context (CLAUDE.md, AGENTS.md), and MCP integrations that help teams ship faster with AI assistance.',
  },
  {
    title: 'Performance & motion',
    description: 'Fast, smooth interfaces — Core Web Vitals, animation, and interaction detail.',
  },
]
