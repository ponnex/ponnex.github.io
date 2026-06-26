<template>
  <div class="thankyou">
    <span class="thankyou__heading">Thank you!</span>
    <span class="thankyou__info">The form was submitted successfully, don't forget to check your email.</span>
    <div class="thankyou__contact">
      <span class="thankyou__email">hello@ponnex.dev</span>
      <div class="social-icons">
        <a href="https://www.instagram.com/ponnnnex/" target="_blank" class="icon ico-instagram"></a>
        <a href="https://www.linkedin.com/in/ponnex/" target="_blank" class="icon ico-linkedin"></a>
        <a href="https://github.com/ponnex/" target="_blank" class="icon ico-github"></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'thankyou',
})
</script>
