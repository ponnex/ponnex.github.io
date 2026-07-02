<template>
  <div class="ty">
    <div class="ty__card">
      <div class="ty__body">
        <p class="ty__status"><span class="ty__ok">✓</span> message sent — reply within 24h</p>

        <h1 class="ty__title">Thanks — talk soon.</h1>
        <p class="ty__sub">Your message is on its way. In the meantime:</p>

        <div class="ty__email">
          <a class="ty__addr" :href="`mailto:${email}`">{{ email }}</a>
          <button
            type="button"
            class="theme-toggle ty__copy"
            :aria-label="copied ? 'Email copied' : 'Copy email address'"
            @click="copy(email)"
          >
            <span class="theme-toggle__bracket">[</span>
            <span class="theme-toggle__label">{{ copied ? 'copied' : 'copy' }}</span>
            <span class="theme-toggle__bracket">]</span>
          </button>
        </div>

        <SocialIcons />

        <NuxtLink to="/" class="btn btn--ghost ty__back">← back to portfolio</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'

definePageMeta({ layout: 'thankyou' })

const email = 'hello@ponnex.dev'
const { copied, copy } = useCopyText()

useHead({ title: 'Thank you — Ponnex Portfolio' })
// Post-submit confirmation page — keep it out of the index.
useSeoMeta({ robots: 'noindex, follow' })
</script>
