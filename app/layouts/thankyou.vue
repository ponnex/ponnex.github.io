<template>
  <div class="theme" :class="`theme--${currentTheme}`">
    <div class="base">
      <div class="base__page">
        <div>
          <main class="body">
            <slot />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const currentTheme = computed(() => (route.query.theme as string) || 'light')
</script>
