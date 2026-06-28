<template>
  <div class="theme">
    <a href="#main" class="skip-link">skip to content</a>
    <div class="base">
      <div class="base__page">
        <div>
          <nav class="header navbar" aria-label="Site">
            <NavBar />
          </nav>
          <main id="main" class="body">
            <slot />
          </main>
          <footer>
            <AppFooter />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '~/components/navbar/navbar.vue'
import AppFooter from '~/components/footer/footer.vue'

// Theme is applied to <html> by useTheme()/the inline head script; the layout
// just provides the shell. (NavBar owns the toggle and its onMounted reconcile.)
</script>
