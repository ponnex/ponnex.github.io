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
      routes: ['/'],
    },
  },

  modules: ['@vueuse/nuxt'],

  app: {
    head: {
      title: 'Emmanuel Francis Ramos — Frontend Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Frontend developer — Vue, Nuxt, React, TypeScript. Shipped work for Singapore Airlines, Toniq, Odin.fun, and more.',
        },
        { property: 'og:title', content: 'Emmanuel Francis Ramos — Frontend Developer' },
        {
          property: 'og:description',
          content:
            'Frontend developer — Vue, Nuxt, React, TypeScript. Shipped work for Singapore Airlines, Toniq, Odin.fun, and more.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://ponnex.dev/' },
        { property: 'og:image', content: 'https://ponnex.dev/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'Emmanuel Francis Ramos — Frontend Developer',
        },
        // Large image card so the preview is a banner, not a tiny thumbnail.
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Emmanuel Francis Ramos — Frontend Developer' },
        {
          name: 'twitter:description',
          content:
            'Frontend developer — Vue, Nuxt, React, TypeScript. Shipped work for Singapore Airlines, Toniq, Odin.fun, and more.',
        },
        { name: 'twitter:image', content: 'https://ponnex.dev/og.png' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          // Pre-paint theme: sets the theme class on <html> before hydration so
          // there is no light/dark flash and no hydration mismatch (Vue never
          // owns this class — see useTheme.ts).
          innerHTML:
            "(function(){try{var k='ponnex-theme',s=localStorage.getItem(k),t=(s==='light'||s==='default')?s:(window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'default');document.documentElement.classList.add('theme--'+t)}catch(e){document.documentElement.classList.add('theme--default')}})();",
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
