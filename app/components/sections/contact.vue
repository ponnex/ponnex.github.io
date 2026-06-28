<template>
  <section id="contact" class="sec shell">
    <div class="cta">
      <h2>Ship something together?</h2>
      <div class="cta__prompt">
        <span class="c-dim">$</span> contact --now
        <span class="c-dim"># reply within 24h</span>
      </div>
      <div class="cta__email">
        <a class="cta__address" :href="`mailto:${email}`">{{ email }}</a>
        <button
          type="button"
          class="theme-toggle cta__copy"
          :aria-label="copied ? 'Email copied' : 'Copy email address'"
          @click="copy(email)"
        >
          <span class="theme-toggle__bracket">[</span>
          <span class="theme-toggle__label">{{ copied ? 'copied' : 'copy' }}</span>
          <span class="theme-toggle__bracket">]</span>
        </button>
      </div>
      <div class="cta__actions">
        <a class="btn btn--primary cta__btn" :href="`mailto:${email}`">email me →</a>
        <NuxtLink class="btn btn--ghost cta__btn-secondary" to="/resume">view resume</NuxtLink>
      </div>
    </div>

    <!--
      Prefer-a-form path. Handled by Netlify Forms: the form is statically
      prerendered (ssr: true), so Netlify's build bot detects it by name and a
      successful POST redirects to /thankyou. The honeypot field traps bots.
    -->
    <div class="cform">
      <div class="cform__bar" aria-hidden="true">
        <i style="background: #ff5f56"></i><i style="background: #ffbd2e"></i><i
          style="background: #27c93f"
        ></i>
        <span class="fn">message.txt</span>
      </div>
      <form
        class="cform__body"
        name="contact"
        method="POST"
        action="/thankyou"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p class="cform__hp" hidden>
          <label>Leave this empty: <input name="bot-field" tabindex="-1" autocomplete="off" /></label>
        </p>

        <div class="cform__row">
          <label class="cform__field">
            <span class="cform__label"><span class="c-accent">#</span> name</span>
            <input id="cf-name" type="text" name="name" required autocomplete="name" />
          </label>
          <label class="cform__field">
            <span class="cform__label"><span class="c-accent">#</span> email</span>
            <input id="cf-email" type="email" name="email" required autocomplete="email" />
          </label>
        </div>
        <label class="cform__field">
          <span class="cform__label"><span class="c-accent">#</span> message</span>
          <textarea id="cf-message" name="message" rows="4" required></textarea>
        </label>
        <button type="submit" class="btn btn--primary cform__submit">send message →</button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = 'hello@ponnex.dev'
const { copied, copy } = useCopyText()
</script>
