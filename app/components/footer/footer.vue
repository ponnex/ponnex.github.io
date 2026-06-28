<template>
  <div class="footer__container">
    <nav class="footer__nav" aria-label="Footer">
      <NuxtLink to="/">portfolio</NuxtLink>
      <NuxtLink to="/projects">projects</NuxtLink>
      <NuxtLink to="/resume">resume</NuxtLink>
      <a href="/#contact">contact</a>
    </nav>
    <SocialIcons />
    <div class="salutation">
      <a
        href="https://floppy-bird-pwa.web.app/"
        target="_blank"
        rel="noopener noreferrer"
        class="easegg"
        aria-label="Play PWA Flappy Bird easter egg (opens in new tab)"
      ><span>&lt;/&gt;</span></a>
      <span>with love by Emmanuel Francis Ramos ©{{ year }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'

const year = new Date().getFullYear()
</script>
