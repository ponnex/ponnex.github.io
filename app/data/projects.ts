// Selected work shown on the home page (preview) and the /projects page (full list).
// Seeded from the resume. Add `link` URLs and screenshots when you have them.
export interface Project {
  id: string;
  file: string; // shown in the card's top bar, e.g. "toniq.vue"
  title: string;
  category: string; // industry / type label
  year: string;
  description: string;
  stack: string[];
  link?: string; // external URL; omit if none yet
  featured?: boolean; // featured items appear in the home preview
}

export const projects: Project[] = [
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
    featured: true,
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
    featured: true,
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
  },
  {
    id: 'sia',
    file: 'singapore-airlines.vue',
    title: 'Singapore Airlines',
    category: 'airlines / re-design / booking',
    year: '2020',
    description:
      'Revamped the official website and migrated a legacy JavaScript codebase to Vue.js and TypeScript.',
    stack: ['Vue', 'TypeScript', 'SCSS'],
    featured: true,
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
    featured: true,
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
  },
];
