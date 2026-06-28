const STORAGE_KEY = 'ponnex-theme'

export type SiteTheme = 'default' | 'light'

function resolveStored(): SiteTheme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'default') return stored
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  } catch {
    /* SSR / privacy mode — fall through to default */
  }
  return 'default'
}

function applyTheme(theme: SiteTheme) {
  const el = document.documentElement
  el.classList.remove('theme--default', 'theme--light')
  el.classList.add(`theme--${theme}`)
}

// The site is statically prerendered (ssr: true). The theme class lives on
// <html> and is painted before hydration by the inline script in nuxt.config,
// so there is no flash and no hydration mismatch (Vue never renders the class).
// On the server `theme` is always 'default'; onMounted reconciles it to the
// stored/system value, which only updates the toggle's own label.
export function useTheme() {
  const theme = useState<SiteTheme>('site-theme', () => 'default')

  onMounted(() => {
    const resolved = resolveStored()
    if (resolved !== theme.value) theme.value = resolved
    applyTheme(resolved)
  })

  function toggleTheme() {
    const next: SiteTheme = theme.value === 'default' ? 'light' : 'default'
    theme.value = next
    if (import.meta.client) {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore persistence failures */
      }
      applyTheme(next)
    }
  }

  return { theme, toggleTheme }
}
