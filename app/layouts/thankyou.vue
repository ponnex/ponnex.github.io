<template>
  <div class="theme">
    <main class="ty-shell">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
// Standalone confirmation page — no navbar. Theme comes from the <html> class
// (set pre-paint by the inline script in nuxt.config), same as every other page.
</script>
