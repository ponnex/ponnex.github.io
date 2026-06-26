<template>
  <div class="theme" :class="`theme--${theme}`">
    <div class="base">
      <div class="base__page">
        <div>
          <nav class="header navbar">
            <NavBar @theme-changed="onThemeChanged" />
          </nav>
          <main class="body">
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

const theme = ref('default')

function onThemeChanged(next: string) {
  theme.value = next
}
</script>
