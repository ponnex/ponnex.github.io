import MobileDetect from 'mobile-detect'
import browser from 'browser-detect'

export interface BrowserDetails {
  isTablet: boolean
  isMobile: boolean
  browser: string
}

// Provides `$util.browserDetails()` (ported from the Nuxt 2 helpers plugin).
export default defineNuxtPlugin(() => {
  return {
    provide: {
      util: {
        browserDetails(): BrowserDetails {
          const md = new MobileDetect(window.navigator.userAgent)
          const browserDetails = browser()
          return {
            isTablet: !!md.tablet(),
            isMobile: !!md.mobile() && !md.tablet(),
            browser: (md.userAgent() || browserDetails.name || '').toLowerCase(),
          }
        },
      },
    },
  }
})
