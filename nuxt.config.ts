// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // Statically prerendered at build time (`nuxt generate`): real HTML per route
  // for crawlers/social bots, faster LCP, and Netlify form detection — while
  // still hydrating into the same SPA. All browser APIs are guarded behind
  // onMounted/import.meta.client, so prerendering in Node is safe.
  ssr: true,

  nitro: {
    prerender: {
      crawlLinks: true,
      // '/' is the crawl seed — it reaches every project slug via on-page links,
      // which @nuxtjs/sitemap then discovers for /sitemap.xml. See docs/STRUCTURE.md.
      routes: ['/'],
    },
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/sitemap'],

  // Canonical domain + trailing-slash form, consumed by @nuxtjs/sitemap (and
  // nuxt-site-config). The prerendered output is directory-style
  // (/projects/sia/index.html), so the 200 URL is the trailing-slash one and
  // every <loc> must match it — no-slash URLs 301-redirect.
  site: {
    url: 'https://ponnex.dev',
    trailingSlash: true,
  },

  // @nuxtjs/sitemap auto-discovers every prerendered route (crawlLinks reaches
  // all project slugs from '/'), so adding a project to app/data/projects.ts
  // flows into /sitemap.xml automatically. /thankyou is noindex; the résumé PDF
  // is a static file (not a route) so it is added explicitly.
  sitemap: {
    exclude: ['/thankyou', '/thankyou/'],
    urls: ['/ramos_resume.pdf'],
    // Stamp every <loc> with a <lastmod> (build time) so crawlers can prioritize
    // re-crawls. The whole site is regenerated as one unit, so a single build
    // date across URLs is accurate.
    autoLastmod: true,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Emmanuel Francis Ramos — Frontend Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Frontend engineer — Vue, Nuxt, React, Next.js, TypeScript. 9+ years shipping production web apps. Open to remote roles. Past work: Singapore Airlines, Toniq, Odin.fun.',
        },
        { property: 'og:site_name', content: 'ponnex.dev' },
        { property: 'og:title', content: 'Emmanuel Francis Ramos — Frontend Engineer' },
        {
          property: 'og:description',
          content:
            'Frontend engineer — Vue, Nuxt, React, Next.js, TypeScript. 9+ years shipping production web apps. Open to remote roles. Past work: Singapore Airlines, Toniq, Odin.fun.',
        },
        { property: 'og:type', content: 'website' },
        // og:url is set per-route in app.vue (canonical, trailing-slash form),
        // not here — a global value would point every page at the site root.
        { property: 'og:image', content: 'https://ponnex.dev/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'Emmanuel Francis Ramos — Frontend Engineer',
        },
        // Large image card so the preview is a banner, not a tiny thumbnail.
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Emmanuel Francis Ramos — Frontend Engineer' },
        {
          name: 'twitter:description',
          content:
            'Frontend engineer — Vue, Nuxt, React, Next.js, TypeScript. 9+ years shipping production web apps. Open to remote roles. Past work: Singapore Airlines, Toniq, Odin.fun.',
        },
        { name: 'twitter:image', content: 'https://ponnex.dev/og.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // iOS "Add to Home Screen" / Safari pinned-tab icon (icon.png is 512²).
        { rel: 'apple-touch-icon', href: '/icon.png' },
      ],
      script: [
        {
          // Pre-paint theme: sets the theme class on <html> before hydration so
          // there is no light/dark flash and no hydration mismatch (Vue never
          // owns this class — see useTheme.ts).
          innerHTML:
            "(function(){try{var k='ponnex-theme',s=localStorage.getItem(k),t;if(s==='light')t='light';else if(s==='dark'||s==='default')t='default';else t=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'default';document.documentElement.classList.add('theme--'+t)}catch(e){document.documentElement.classList.add('theme--default')}})();",
          tagPosition: 'head',
        },
      ],
    },
  },

  css: ['normalize.css/normalize.css', '~/assets/style/main.scss'],

  vite: {
    optimizeDeps: {
      // Pre-bundle deps Vite discovers at runtime to avoid mid-dev page reloads.
      // `mobile-detect` is CJS; both are pulled in by app/plugins/util.ts.
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'browser-detect',
        'mobile-detect',
        'vue-pdf-embed',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // The legacy stylesheet uses `@import` and a couple of math
          // expressions that Dart Sass now flags; silence the noise.
          silenceDeprecations: ['import', 'global-builtin', 'slash-div'],
        },
      },
    },
    build: {
      // pdfjs (vue-pdf-embed) is a large dependency, but it is code-split and
      // only loaded lazily on the /resume route, so the size is acceptable.
      chunkSizeWarningLimit: 3000,
      // Modern browsers support modulepreload natively; dropping the polyfill
      // avoids the nuxt:module-preload-polyfill sourcemap warning.
      modulePreload: { polyfill: false },
      rollupOptions: {
        // Silence the harmless `/* #__PURE__ */` annotation warnings emitted
        // from @vueuse/core's prebuilt dist; surface everything else.
        onwarn(warning, defaultHandler) {
          if (warning.code === 'INVALID_ANNOTATION' && /@vueuse/.test(warning.message)) {
            return
          }
          defaultHandler(warning)
        },
      },
    },
  },
})
