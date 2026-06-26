// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  // Portfolio is a client-rendered single-page app (was Nuxt 2 `mode: 'spa'`).
  ssr: false,

  modules: ['@vueuse/nuxt'],

  app: {
    head: {
      title: 'Ponnex Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Emmanuel Francis Ramos Portfolio',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
