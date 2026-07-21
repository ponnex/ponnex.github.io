// Source of truth for the crawlable HTML résumé at /resume/.
// Mirrors the 2026 PDF (public/ramos_resume.pdf); keep in sync when the PDF changes.

export interface ResumeProfile {
  name: string
  title: string
  tagline: string
  summary: string
  availability: string
}

export interface ResumeExperience {
  id: string
  employer: string
  role: string
  period: string
  projects?: string[]
  highlights: string[]
  stack?: string[]
}

export interface ResumeEducation {
  institution: string
  degree: string
  period: string
  location: string
}

export const resumeProfile: ResumeProfile = {
  name: 'Emmanuel Francis Ramos',
  title: 'Senior Frontend Engineer',
  tagline: 'Frontend · AI-Native Development · React · TypeScript · Architecture',
  summary:
    'Senior Frontend Engineer with 9+ years building scalable enterprise, startup, and product applications. Specializes in React, TypeScript, frontend architecture, design systems, and AI-native engineering workflows.',
  availability: 'Remote · Open to work',
}

export const resumeCoreExpertise: string[] = [
  'AI-Native Software Engineering',
  'Frontend Architecture & Design Systems',
  'React, Vue & TypeScript Applications',
  'Performance, Accessibility & i18n',
  'Technical Leadership & Cross-functional Collaboration',
]

export const resumeExperience: ResumeExperience[] = [
  {
    id: 'codev',
    employer: 'CoDev',
    role: 'Senior Frontend Engineer',
    period: 'February 2022 – Present',
    projects: ['Odin.fun', 'Toniq', 'Bioniq'],
    highlights: [
      'Built and maintained large-scale React/TypeScript applications — design systems, application theming, internationalization (i18n), and real-time product integrations from concept through production.',
      'Established AI-native engineering workflows using Claude Code to accelerate feature implementation, refactoring, debugging, testing, documentation, and code reviews.',
      'Designed repository context through CLAUDE.md, ARCHITECTURE.md, and AGENTS.md, enabling AI agents to navigate complex codebases and produce higher-quality, more consistent implementations.',
      'Introduced specification-driven development using SPEC.md, PLAN.md, and TASK.md — standardizing feature planning, reducing implementation ambiguity, and enabling AI-assisted development with minimal supervision.',
      'Developed reusable prompts, custom Claude skills, and MCP integrations to standardize engineering workflows and improve developer productivity across projects.',
      'Partnered with product managers, designers, and backend engineers to deliver scalable, production-ready features while contributing to architecture discussions and long-term maintainability.',
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Claude Code', 'MCP'],
  },
  {
    id: 'freelance',
    employer: 'Freelance (Beyond Bytes, Bennusoft, CodingChief)',
    role: 'Frontend Developer',
    period: 'November 2020 – December 2021',
    highlights: [
      'Built and maintained React and Vue applications, delivering frontend features, API integrations, and UI improvements for multiple clients.',
    ],
    stack: ['Nuxt.js', 'Vue.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'trr',
    employer: 'TRR Technologies / XDevs',
    role: 'Creative Technologist',
    period: 'July 2018 – February 2021',
    projects: [
      'Singapore Airlines',
      'Singapore Biennale',
      'Caltex',
      'I2D2 (KYC/AML)',
      'Palantir',
      'Hard Hat Asia',
      'All Range Trucks',
    ],
    highlights: [
      'Modernized enterprise applications and delivered customer-facing websites, marketplaces, and internal platforms across aviation, banking, logistics, retail, and government sectors.',
      'Collaborated with designers and backend engineers to deliver responsive, production-ready applications using Vue.js, Nuxt.js, and TypeScript.',
    ],
    stack: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'xerkit',
    employer: 'Xerkit',
    role: 'Software Engineer',
    period: 'August 2017 – July 2018',
    highlights: [
      'Developed a NativeScript mobile application for an IoT automotive platform, enabling remote ignition, air-conditioning, and vehicle access control.',
    ],
    stack: ['NativeScript', 'Vue', 'IoT'],
  },
]

export const resumeEducation: ResumeEducation = {
  institution: 'University of Science and Technology of Southern Philippines',
  degree: 'B.S. Computer Engineering',
  period: 'June 2011 – April 2017',
  location: 'C.M. Recto Ave., Lapasan, Cagayan de Oro City, Philippines, 9000',
}
