// Work shown on the home page (preview) and the /projects page (full list).
// Two groups: client work I'm part of (omit `group`) and projects I built myself (`group: 'personal'`).
export interface Project {
  id: string;
  file: string; // shown in the card's top bar, e.g. "toniq.vue"
  title: string;
  category: string; // industry / type label
  year: string;
  description: string;
  stack: string[];
  link?: string; // external URL; omit if none yet
  image?: string; // optional preview image path
  featured?: boolean; // featured items appear in the home preview
  group?: 'professional' | 'personal'; // omit/'professional' = client work; 'personal' = built solo
  /** Extra detail for the /projects/[slug] case study page */
  outcome?: string;
  role?: string;
}

/** Parse category string into filter tags, e.g. "crypto / bitcoin / trading" → ["crypto", "bitcoin", "trading"] */
export function projectTags(project: Project): string[] {
  return project.category
    .split('/')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

/** Unique tags across all projects, sorted for the filter bar */
export function allProjectFilterTags(list: Project[] = projects): string[] {
  const set = new Set<string>();
  list.forEach((p) => projectTags(p).forEach((t) => set.add(t)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

// Curated industry filters for the /projects filter bar. One chip per raw
// category tag produced 30+ chips (most matching a single project), so we group
// the raw tags into a handful of meaningful buckets. Every project falls into
// at least one bucket — verify with `npm run dev` if you add/retag projects.
export const projectFilters: { label: string; tags: string[] }[] = [
  { label: 'web3', tags: ['crypto', 'bitcoin', 'trading', 'nft', 'web3'] },
  { label: 'banking', tags: ['banking', 'kyc', 'fintech'] },
  { label: 'e-commerce', tags: ['e-commerce', 'marketplace', 'booking'] },
  { label: 'automotive', tags: ['automotive'] },
  { label: 'iot', tags: ['iot', 'monitoring'] },
  { label: 'mobile', tags: ['mobile'] },
  { label: 'pwa', tags: ['pwa', 'game'] },
  {
    label: 'web',
    tags: [
      're-design', 'arts', 'events', 'concept', 'spa', 'food', 'food delivery',
      'invitation', 'wedding', 'photos', 'pokéapi', 'safety',
    ],
  },
];

export function projectMatchesFilter(project: Project, filter: string): boolean {
  if (!filter || filter === 'all') return true;
  const bucket = projectFilters.find((b) => b.label === filter);
  const wanted = bucket ? bucket.tags : [filter.toLowerCase()];
  const tags = projectTags(project);
  return wanted.some((t) => tags.includes(t));
}

/** Stable hue (0–360) for gradient thumbnails when no image is set */
export function projectThumbHue(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % 360;
}

export const projects: Project[] = [
  {
    id: 'sia',
    file: 'singapore-airlines.vue',
    title: 'Singapore Airlines',
    category: 'airlines / re-design / booking',
    year: '2020',
    description:
      'Revamped the official website and migrated a legacy JavaScript codebase to Vue.js and TypeScript.',
    stack: ['Vue', 'TypeScript', 'SCSS'],
    link: 'https://www.singaporeair.com/',
    image: '/images/projects/sia.jpg',
    featured: true,
    role: 'Frontend developer',
    outcome: 'Migrated legacy booking flows to Vue + TypeScript without disrupting live traffic.',
  },
  {
    id: 'odin',
    file: 'odin.tsx',
    title: 'Odin.fun',
    category: 'crypto / bitcoin / trading',
    year: '2025',
    description:
      'A trading and blockchain-data platform on the Internet Computer and Bitcoin — the frontend trades directly against ICP canisters, with a Kafka CDC pipeline streaming real-time on-chain updates.',
    stack: ['React', 'Tailwind', 'NestJS', 'Bitcoin', 'Web3'],
    link: 'https://odin.fun/',
    image: '/images/projects/odin.jpg',
    featured: true,
    role: 'Frontend lead',
    outcome: 'Shipped real-time trading UI against on-chain canisters with sub-second market updates.',
  },
  {
    id: 'biennale',
    file: 'sg-biennale.vue',
    title: 'Singapore Biennale 2019',
    category: 'arts / events',
    year: '2019',
    description:
      'Redesigned the website and content for the Singapore Biennale 2019 contemporary art event.',
    stack: ['Vue', 'Nuxt', 'JavaScript', 'SCSS'],
    // Thumbnail is the current (2025) edition's banner — the 2019 site is gone.
    link: 'https://singaporebiennale.org/',
    image: '/images/projects/biennale.jpg',
    featured: true,
    role: 'Frontend developer',
  },
  {
    id: 'bioniq',
    file: 'bioniq.vue',
    title: 'Bioniq',
    category: 'nft / marketplace / web3',
    year: '2023',
    description:
      'A fast BTC inscription marketplace with secure token bridging, no trade or gas fees, and near-instant finality.',
    stack: ['Vue', 'Tailwind', 'TypeScript', 'ICP', 'Web3'],
    link: 'https://bioniq.io/',
    image: '/images/projects/bioniq.jpg',
    featured: true,
    role: 'Frontend developer',
    outcome: 'Delivered inscription trading flows with near-instant settlement UX.',
  },
  {
    id: 'caltex',
    file: 'caltex-oil-finder.vue',
    title: 'Caltex Oil Finder',
    category: 'automotive / e-commerce',
    year: '2018',
    description:
      'Built and shipped new functionality for the Caltex Oil Finder website.',
    stack: ['JavaScript', 'XML', 'Maps API'],
    link: 'https://www.caltex.com/ph/oil-finder.html',
    image: '/images/projects/caltex.jpg',
    featured: true,
    role: 'Frontend developer',
  },
  {
    id: 'toniq',
    file: 'toniq.vue',
    title: 'Toniq',
    category: 'nft / marketplace / web3',
    year: '2022',
    description:
      'A decentralized, non-custodial marketplace to create, store, and exchange digital assets — built on the Internet Computer.',
    stack: ['Vue', 'Nuxt', 'Tailwind', 'TypeScript', 'Web3'],
    link: 'https://toniq.io/',
    image: '/images/projects/toniq.jpg',
    role: 'Core frontend',
    outcome: 'Launched a full NFT marketplace with wallet flows and collection management.',
  },
  {
    id: 'i2d2',
    file: 'i2d2.vue',
    title: 'I2D2 Platform',
    category: 'banking / kyc',
    year: '2019',
    description:
      'In-house KYC / AML (Intelligent Integrity Due Diligence) web application built for a bank.',
    stack: ['Vue', 'Nuxt', 'Vuex', 'REST'],
    role: 'Frontend developer',
    outcome: 'Built compliance workflows used daily by bank operations teams.',
  },
  {
    id: 'palantir',
    file: 'palantir.vue',
    title: 'Employee Portal',
    category: 'banking / fintech',
    year: '2019',
    description:
      'In-house employee portal web application built for a bank with the Nuxt.js framework.',
    stack: ['Nuxt', 'Vuex', 'REST'],
    role: 'Frontend developer',
  },
  {
    id: 'hardhat',
    file: 'hard-hat-asia.vue',
    title: 'Hard Hat Asia',
    category: 'marketplace / e-commerce',
    year: '2021',
    description:
      'Designed, built, and launched a marketplace for local hardware stores with an efficient shopping and delivery flow.',
    stack: ['Vue', 'Nuxt', 'Tailwind', 'API'],
    role: 'Full-stack frontend',
    outcome: 'Launched end-to-end marketplace from catalog browse to checkout.',
  },
  {
    id: 'art',
    file: 'all-range-trucks.vue',
    title: 'All Range Trucks',
    category: 'automotive / e-commerce',
    year: '2018',
    description:
      'Created and launched a website offering trucking equipment — tractor heads, dump trucks, wing vans, mixers, trailers and more.',
    stack: ['Vue', 'Nuxt', 'SCSS'],
    // No live link: allrangetrucks.com currently serves an expired SSL cert.
    image: '/images/projects/art.jpg',
    role: 'Frontend developer',
  },
  {
    id: 'xerkit',
    file: 'xerkit.app',
    title: 'Xerkit',
    category: 'automotive / iot',
    year: '2017',
    description:
      'A NativeScript app integrating with the Xerkit IoT car product — automatic ignition, climate, and lock/unlock control.',
    stack: ['NativeScript', 'Vue', 'IoT'],
    role: 'Mobile developer',
  },

  // ── Projects I did myself ───────────────────────────────────────────────
  {
    id: 'pokedex',
    file: 'pokedex.vue',
    title: 'Pokédex',
    category: 'pwa / pokéapi',
    year: '2021',
    group: 'personal',
    description:
      'A Pokédex Progressive Web App powered by the PokéAPI, built with Nuxt.js and Tailwind CSS.',
    stack: ['Nuxt', 'Vue', 'Tailwind', 'PWA'],
    // Netlify demo is offline; link to the repo instead.
    link: 'https://github.com/ponnex/pokedex',
    image: '/images/projects/pokedex.jpg',
    featured: true,
    role: 'Developer',
    outcome: 'Installable PWA with offline-friendly browsing of 800+ Pokémon.',
  },
  {
    id: 'edvan',
    file: 'edspeciallyforvan.vue',
    title: 'EDspecially for VAN',
    category: 'wedding / invitation',
    year: '2022',
    group: 'personal',
    description:
      'A tailor-made digital wedding invitation website built for a couple to share their day online.',
    stack: ['Vue', 'Nuxt', 'SCSS'],
    link: 'https://edspeciallyforvan.netlify.app/',
    image: '/images/projects/edvan.jpg',
    featured: true,
    role: 'Developer',
  },
  {
    id: 'flappy',
    file: 'flappy-bird.js',
    title: 'PWA Flappy Bird',
    category: 'pwa / game',
    year: '2017',
    group: 'personal',
    description:
      'A Flappy Bird clone built as a Progressive Web App to demo offline play and installability — first shown at GDG DevFest \'17.',
    stack: ['JavaScript', 'PWA', 'Canvas'],
    link: 'https://floppy-bird-pwa.web.app/',
    image: '/images/projects/flappy.jpg',
    featured: true,
    role: 'Developer',
    outcome: 'Demoed at GDG DevFest \'17 — offline-first game installable from the browser.',
  },
  {
    id: 'restosearch',
    file: 'restosearch.java',
    title: 'RestoSearch',
    category: 'food delivery / mobile',
    year: '2015',
    group: 'personal',
    description:
      'A food-delivery app built back in 2015 in the spirit of DoorDash, Uber Eats and Foodpanda — browse restaurants, order and track delivery.',
    stack: ['Java', 'Android'],
    link: 'https://github.com/ponnex/RestoSearch',
    image: '/images/projects/restosearch.jpg',
    featured: true,
    role: 'Developer',
  },
  {
    id: 'finefoods',
    file: 'fine-foods.vue',
    title: "Ponnex's Fine Foods",
    category: 'food / concept / spa',
    year: '2020',
    group: 'personal',
    description:
      'A Nuxt + TypeScript single-page web app for a fine-foods concept, designed from a Dribbble shot.',
    stack: ['Nuxt', 'Vue', 'TypeScript'],
    // Netlify demo is offline; link to the repo instead.
    link: 'https://github.com/ponnex/ponnexs-fine-foods',
    image: '/images/projects/finefoods.jpg',
    role: 'Developer',
  },
  {
    id: 'waterbill',
    file: 'waterbill.java',
    title: 'WaterBill',
    category: 'iot / mobile',
    year: '2016',
    group: 'personal',
    description:
      'An Android companion app for an IoT device that tracks and measures household water consumption and billing.',
    stack: ['Java', 'Android', 'IoT'],
    link: 'https://github.com/ponnex/WaterBill',
    image: '/images/projects/waterbill.jpg',
    featured: true,
    role: 'Developer',
  },
  {
    id: 'rrsdas',
    file: 'rrsdas.html',
    title: 'Remote Rain & Stream Monitoring',
    category: 'iot / monitoring / pwa',
    year: '2016',
    group: 'personal',
    description:
      'A Progressive Web App for remote rain and stream monitoring — an early-warning system for flash floods and micro-hydro site surveys, fed by SMS-relayed sensor data.',
    stack: ['PWA', 'Raspberry Pi', 'IoT', 'SMS'],
    link: 'https://github.com/ponnex/Remote-Rain-and-Stream-Data-Acquisition-System-Progressive-Web-App',
    image: '/images/projects/rrsdas.jpg',
    role: 'Developer',
  },
  {
    id: 'justdrive',
    file: 'just-drive.java',
    title: 'Just Drive',
    category: 'safety / mobile',
    year: '2015',
    group: 'personal',
    description:
      'An Android app that curbs distracted driving — "no text, tweet, or email is worth your life. Put the phone down and just drive."',
    stack: ['Java', 'Android'],
    link: 'https://github.com/ponnex/Just-Drive',
    image: '/images/projects/justdrive.jpg',
    role: 'Developer',
  },
  {
    id: 'snapforus',
    file: 'snapforus.tsx',
    title: 'SnapForUs',
    category: 'events / photos',
    year: '2025',
    group: 'personal',
    description:
      'A QR-based event photo-sharing app — guests scan a code to join an event and share moments to a shared gallery.',
    stack: ['React', 'Tailwind', 'QR'],
    role: 'Developer',
  },
];
