<template>
  <div class="footer__container">
    <SocialIcons />
    <div class="salutation">
      <a href="https://floppy-bird-pwa.web.app/" target="_blank" class="easegg"><span>&lt;/&gt;</span></a>
      <span>with &#x1f496; by Emmanuel Francis Ramos ©{{ year }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'

const year = new Date().getFullYear()
</script>
