<template>
  <div class="tnav">
    <div class="tnav__in">
      <NuxtLink to="/" class="tnav__logo"><span class="c-accent">~/</span>ponnex</NuxtLink>
      <ul class="tnav__links">
        <li :class="{ active: route.path === '/' }" role="presentation">
          <NuxtLink to="/">portfolio</NuxtLink>
        </li>
        <li :class="{ active: route.path === '/projects' }" role="presentation">
          <NuxtLink to="/projects">projects</NuxtLink>
        </li>
        <li :class="{ active: route.path === '/resume' }" role="presentation">
          <NuxtLink to="/resume">resume</NuxtLink>
        </li>
        <li class="tnav__status" role="presentation">
          <span class="tnav__dot"></span>open to work
        </li>
        <li role="presentation">
          <button
            type="button"
            class="theme-toggle"
            :aria-label="`switch to ${theme === 'default' ? 'light' : 'dark'} theme`"
            @click="changeTheme()"
          >
            <span class="theme-toggle__bracket">[</span>
            <span class="theme-toggle__label">{{ theme === 'default' ? 'light' : 'dark' }}</span>
            <span class="theme-toggle__bracket">]</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const emit = defineEmits<{ themeChanged: [theme: string] }>()

const theme = ref('default')

function changeTheme() {
  theme.value = theme.value !== 'default' ? 'default' : 'light'
  emit('themeChanged', theme.value)
}
</script>
