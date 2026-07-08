const STORAGE_KEY = 'ponnex-theme'

// What the user picks. 'system' is the unstored first-visit default — it
// follows the OS and live-updates when it flips. The first click of the
// toggle replaces it with an explicit 'light' / 'dark' that pins the theme.
export type ThemeMode = 'system' | 'light' | 'dark'
// What actually gets painted. 'default' is the dark theme (legacy class name —
// the CSS classes are `theme--default` / `theme--light` and stay as-is).
export type SiteTheme = 'default' | 'light'

function readMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    if (stored === 'default') return 'dark' // legacy value written before tristate
  } catch {
    /* SSR / privacy mode — fall through */
  }
  return 'system'
}

function resolveTheme(mode: ThemeMode, prefersDark: boolean): SiteTheme {
  if (mode === 'light') return 'light'
  if (mode === 'dark') return 'default'
  return prefersDark ? 'default' : 'light' // system
}

function applyTheme(theme: SiteTheme) {
  const el = document.documentElement
  el.classList.remove('theme--default', 'theme--light')
  el.classList.add(`theme--${theme}`)
}

// The site is statically prerendered (ssr: true). The theme class lives on
// <html> and is painted before hydration by the inline script in nuxt.config,
// so there is no flash and no hydration mismatch (Vue never renders the class).
// On the server `mode` is always 'system'; onMounted reconciles it to the
// stored value, and in system mode `prefersDark` keeps it following the OS live.
export function useTheme() {
  const mode = useState<ThemeMode>('theme-mode', () => 'system')
  const theme = useState<SiteTheme>('site-theme', () => 'default')
  const prefersDark = usePreferredDark()

  function reconcile() {
    const resolved = resolveTheme(mode.value, prefersDark.value)
    theme.value = resolved
    applyTheme(resolved)
  }

  onMounted(() => {
    mode.value = readMode()
    reconcile()
  })

  // Re-paint when the user changes mode, or — in system mode — when the OS
  // theme flips. resolveTheme ignores prefersDark for explicit modes, so an OS
  // flip is a no-op once the user has picked light/dark.
  watch([mode, prefersDark], () => {
    if (import.meta.client) reconcile()
  })

  function setMode(next: ThemeMode) {
    if (import.meta.client) {
      try {
        if (next === 'system') localStorage.removeItem(STORAGE_KEY)
        else localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* ignore persistence failures */
      }
    }
    mode.value = next // the watch reconciles `theme` + the <html> class
  }

  // Flip against the *resolved* theme, so the first click out of the unstored
  // 'system' default pins the opposite of whatever is currently showing.
  function toggleTheme() {
    setMode(theme.value === 'light' ? 'dark' : 'light')
  }

  return { mode, theme, setMode, toggleTheme }
}
