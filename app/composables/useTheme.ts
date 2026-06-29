const STORAGE_KEY = 'ponnex-theme'

// What the user picks. 'system' follows the OS and live-updates when it flips;
// 'light' / 'dark' are explicit choices that pin the theme until changed.
export type ThemeMode = 'system' | 'light' | 'dark'
// What actually gets painted. 'default' is the dark theme (legacy class name —
// the CSS classes are `theme--default` / `theme--light` and stay as-is).
export type SiteTheme = 'default' | 'light'

// Toggle order: system -> light -> dark -> system.
const MODE_ORDER: ThemeMode[] = ['system', 'light', 'dark']

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

  function cycleMode() {
    const i = MODE_ORDER.indexOf(mode.value)
    setMode(MODE_ORDER[(i + 1) % MODE_ORDER.length] ?? 'system')
  }

  return { mode, theme, setMode, cycleMode }
}
