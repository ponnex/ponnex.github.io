[![Netlify Status](https://api.netlify.com/api/v1/badges/5c3677d1-22c9-4b25-b5d6-87da083ff0b6/deploy-status)](https://app.netlify.com/sites/ponnex-portfolio/deploys)

# ponnex-portfolio

> Personal portfolio of **Emmanuel Francis Ramos** — frontend developer. A terminal / engineer-themed single-page site built with Nuxt 4 and Vue 3.

![Home — dark theme](docs/screenshots/home-dark.png)

## Themes

A single switch flips the whole site — nav, sections, and footer — between a dark terminal palette and a light "paper" palette, driven entirely by CSS custom properties.

| Dark | Light |
| --- | --- |
| ![Dark theme](docs/screenshots/home-dark.png) | ![Light theme](docs/screenshots/home-light.png) |

## Responsive

Fully responsive down to ~320px. Content keeps consistent side margins, the nav collapses to a single row, and the résumé PDF scales to the viewport.

<img src="docs/screenshots/mobile.png" alt="Mobile view" width="320" />

## Pages

- **Home** (`/`) — hero, selected work, skills, about, and contact sections.
- **Projects** (`/projects`) — full list of selected work, seeded from [`app/data/projects.ts`](app/data/projects.ts).
- **Résumé** (`/resume`) — embedded PDF (lazy-loaded via `vue-pdf-embed`) with download and LinkedIn links.
- **Thank you** (`/thankyou`) — post-contact-form confirmation.

![Projects page](docs/screenshots/projects.png)

## Tech Stack

- [Nuxt 4](https://nuxt.com) / [Vue 3](https://vuejs.org) (`<script setup>`), client-rendered SPA (`ssr: false`)
- [VueUse](https://vueuse.org) (`@vueuse/nuxt`)
- SCSS with CSS-custom-property theming
- [`vue-pdf-embed`](https://github.com/hrynko/vue-pdf-embed) for the résumé
- Self-hosted fonts: JetBrains Mono, Space Grotesk, Menlo
- TypeScript, deployed on Netlify

## Project Structure

```
app/
  assets/style/      # SCSS — _terminal.scss is the design system; _variables.scss holds tokens
  components/        # navbar, footer, sections (work/skills/about/contact), social-icons
  data/              # projects.ts, skills.ts — content lives here
  layouts/           # default, thankyou
  pages/             # index, projects, resume, thankyou
public/              # favicon, resume PDF, icons
```

To update content, edit the data files in [`app/data/`](app/data/) rather than the components.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and preview the server
$ npm run build
$ npm run preview

# generate static project
$ npm run generate
```

Requires Node — see [`.nvmrc`](.nvmrc) for the pinned version (`nvm use`).

For a detailed explanation of how things work, check out the [Nuxt docs](https://nuxt.com/docs).
