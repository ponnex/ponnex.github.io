<template>
  <section id="contact" class="sec shell">
    <div class="cta">
      <h2>Ship something together?</h2>
      <div class="cta__prompt">
        <span class="c-dim">$</span> contact --now
        <span class="c-dim"># reply within 24h</span>
      </div>
      <a class="btn btn--primary cta__btn" :href="`mailto:${email}`"
        >get in touch →</a
      >
    </div>
  </section>
</template>

<script setup lang="ts">
// Update to your preferred contact address.
const email = 'hello@ponnex.dev';
</script>
