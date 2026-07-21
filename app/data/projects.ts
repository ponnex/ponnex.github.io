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
  /**
   * Longer-form case-study narrative (2–3 sentences) rendered as the lead on
   * /projects/[slug]. Grounded strictly in the facts already in `description`,
   * `role`, `outcome`, `stack`, `year` plus public context about each
   * client/product — no invented metrics. Deepens thin case-study copy for
   * ranking + AI citation. Review/extend with first-hand detail where you can.
   */
  body?: string;
  /**
   * Optional search-result meta description (≤160 chars). Only set this when the
   * default `role · description` would exceed ~160 and get truncated in SERPs
   * (see `projectMetaDescription`). Keep it a complete, keyword-rich sentence —
   * never a mid-word cut. `body` is still used for og:description and the
   * on-page lead, where extra length is not penalised.
   */
  seoDescription?: string;
}

/**
 * Real pixel dimensions of each project's preview image (measured from the
 * files in public/images/projects). Case-study pages set og:image to these
 * thumbnails, so they must also emit the matching og:image:width/height —
 * otherwise they inherit the global 1200×630 from nuxt.config and render
 * cropped/mismatched in social + AI previews. All thumbnails are 1200 wide.
 */
export const projectImageDims: Record<string, { w: number; h: number }> = {
  sia: { w: 1200, h: 671 },
  odin: { w: 1200, h: 750 },
  biennale: { w: 1200, h: 630 },
  bioniq: { w: 1200, h: 750 },
  caltex: { w: 1200, h: 745 },
  toniq: { w: 1200, h: 750 },
  art: { w: 1200, h: 700 },
  pokedex: { w: 1200, h: 760 },
  edvan: { w: 1200, h: 750 },
  flappy: { w: 1200, h: 750 },
  restosearch: { w: 1200, h: 760 },
  finefoods: { w: 1200, h: 900 },
  waterbill: { w: 1200, h: 760 },
  rrsdas: { w: 1200, h: 432 },
  justdrive: { w: 1200, h: 760 },
};

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

/**
 * Search-result meta description for a case-study page. Google truncates around
 * 155–160 chars, so this stays tight: an explicit `seoDescription` when set,
 * otherwise `role · description` (the short summary — NOT the longer `body`,
 * which is the on-page/og lead), with a word-boundary clamp as a final safety
 * net so no page ever ships a description cut off mid-word. Keep results ≤160.
 */
export function projectMetaDescription(project: Project): string {
  if (project.seoDescription) return project.seoDescription;
  const base = `${project.role ? project.role + ' · ' : ''}${project.description}`;
  if (base.length <= 160) return base;
  const clamped = base.slice(0, 157);
  const lastSpace = clamped.lastIndexOf(' ');
  return (lastSpace > 0 ? clamped.slice(0, lastSpace) : clamped).trimEnd() + '…';
}

// Curated industry filters for the /projects filter bar. One chip per raw
// category tag produced 30+ chips (most matching a single project), so we group
// the raw tags into a handful of meaningful buckets. Every project falls into
// at least one bucket — verify with `npm run dev` if you add/retag projects.
export const projectFilters: { label: string; tags: string[] }[] = [
  { label: 'marketplaces', tags: ['crypto', 'bitcoin', 'trading', 'nft', 'web3'] },
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
    body:
      'Singapore Airlines is the flag carrier of Singapore, and its website handles booking for travellers worldwide. I worked on revamping the official site — migrating a large legacy JavaScript codebase to Vue.js and TypeScript and modernizing the booking flows, all without disrupting live production traffic.',
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
    body:
      'Odin.fun is a trading and blockchain-data platform built on the Internet Computer and Bitcoin. As frontend lead I built a UI that trades directly against ICP canisters, wired to a Kafka CDC pipeline streaming real-time on-chain updates — delivering sub-second market data to traders in a React and Tailwind interface.',
    seoDescription:
      'Frontend lead · Odin.fun, a React/Tailwind trading platform on the Internet Computer and Bitcoin — trades directly against ICP canisters with real-time data.',
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
    body:
      'The Singapore Biennale is a major international contemporary-art exhibition. For the 2019 edition I redesigned the website and reworked its content, building a fast, content-rich experience with Vue, Nuxt and SCSS.',
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
    body:
      'Bioniq is a fast Bitcoin inscription marketplace. I worked on the frontend for BTC inscription trading with secure token bridging, no trade or gas fees, and near-instant finality — designing flows that make on-chain settlement feel instant, built in Vue, Tailwind and TypeScript on the Internet Computer.',
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
    body:
      'Caltex is a global fuel and lubricants brand. I built and shipped new functionality for its Oil Finder tool — helping motorists find the right product for their vehicle — using JavaScript, XML and a maps integration.',
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
    body:
      'Toniq is a decentralized, non-custodial marketplace for creating, storing and exchanging digital assets on the Internet Computer. As core frontend I helped launch the full NFT marketplace — wallet connection, collection management and asset trading — using Vue, Nuxt, Tailwind and TypeScript.',
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
    body:
      'I2D2 (Intelligent Integrity Due Diligence) is an in-house KYC / AML web application built for a bank. I developed the frontend for the compliance workflows that operations teams use daily, wiring Vuex-managed state to REST services in a Vue and Nuxt application.',
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
    body:
      'An in-house employee portal built for a bank with the Nuxt.js framework. I implemented the frontend, connecting Vuex-managed state to REST services for day-to-day staff workflows.',
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
    body:
      'Hard Hat Asia is a marketplace for local hardware stores. I designed, built and launched the end-to-end experience — from catalog browse to checkout and delivery — using Vue, Nuxt and Tailwind.',
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
    body:
      'All Range Trucks sells heavy trucking equipment — tractor heads, dump trucks, wing vans, mixers, trailers and more. I created and launched the website with Vue, Nuxt and SCSS.',
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
    body:
      'Xerkit is an IoT car product. I built a NativeScript mobile app that integrates with the hardware for automatic ignition, climate control and remote lock/unlock — pairing a Vue-based mobile UI with the device.',
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
    body:
      'A Pokédex Progressive Web App powered by the PokéAPI. Built with Nuxt and Tailwind, it is installable and offline-friendly, letting you browse 800+ Pokémon directly from the browser.',
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
    body:
      'A tailor-made digital wedding invitation site I built for a couple to share their day online — a small, polished single-purpose site crafted in Vue, Nuxt and SCSS.',
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
    body:
      'A Flappy Bird clone built as a Progressive Web App to demonstrate offline play and installability, rendered on Canvas in vanilla JavaScript. First shown at GDG DevFest \'17.',
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
    body:
      'A food-delivery Android app I built back in 2015, in the spirit of DoorDash, Uber Eats and Foodpanda — browse restaurants, place orders and track delivery, built natively in Java.',
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
    body:
      'A Nuxt + TypeScript single-page web app for a fine-foods concept, designed from a Dribbble shot — a focused exercise in layout, motion and the kind of polish most builds skip.',
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
    body:
      'An Android companion app for an IoT device that tracks and measures household water consumption and billing — pairing a native Java mobile UI with live sensor data.',
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
    body:
      'A Progressive Web App for remote rain and stream monitoring — an early-warning system for flash floods and micro-hydro site surveys, fed by SMS-relayed sensor data from Raspberry Pi hardware.',
    seoDescription:
      'Developer · A Progressive Web App for remote rain and stream monitoring — flash-flood early warning fed by SMS-relayed Raspberry Pi sensor data.',
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
    body:
      'An Android app that curbs distracted driving on the principle that "no text, tweet, or email is worth your life — put the phone down and just drive." A safety-focused concept built natively in Java.',
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
    body:
      'A QR-based event photo-sharing app — guests scan a code to join an event and share moments to a shared gallery. Built with React and Tailwind.',
  },
];
