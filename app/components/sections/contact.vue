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
          <span class="theme-toggle__label">{{
            copied ? 'copied' : 'copy'
          }}</span>
          <span class="theme-toggle__bracket">]</span>
        </button>
      </div>
      <div class="cta__actions">
        <button
          type="button"
          class="btn btn--primary cta__btn"
          @click="openModal"
        >
          email me →
        </button>
        <NuxtLink class="btn btn--ghost cta__btn-secondary" to="/resume"
          >view resume</NuxtLink
        >
      </div>
    </div>

    <!--
      Prefer-a-form path, opened as a modal from the "email me" button.
      Submits directly to Web3Forms, which emails the message to the inbox
      tied to the access key below. On success we route to /thankyou.
      No backend / Netlify Forms involved.
    -->
    <dialog
      ref="dialogEl"
      class="cform-modal"
      aria-label="Send me a message"
      @click.self="closeModal"
      @close="onDialogClose"
    >
      <div class="cform">
        <div class="cform__bar">
          <i style="background: #ff5f56" aria-hidden="true"></i
          ><i style="background: #ffbd2e" aria-hidden="true"></i
          ><i style="background: #27c93f" aria-hidden="true"></i>
          <span class="fn" aria-hidden="true">message.txt</span>
          <button
            type="button"
            class="theme-toggle cform__close"
            aria-label="Close message form"
            @click="closeModal"
          >
            <span class="theme-toggle__bracket">[</span>
            <span class="theme-toggle__label">close</span>
            <span class="theme-toggle__bracket">]</span>
          </button>
        </div>
        <form class="cform__body" novalidate @submit.prevent="onSubmit">
          <!-- Honeypot: real users never see or fill this; bots do. -->
          <input
            v-model="honeypot"
            type="checkbox"
            name="botcheck"
            class="cform__hp"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />

          <div class="cform__row">
            <label class="cform__field">
              <span class="cform__label"
                ><span class="c-accent">#</span> name</span
              >
              <input
                id="cf-name"
                v-model.trim="formData.name"
                type="text"
                required
                autocomplete="name"
                :disabled="sending"
              />
            </label>
            <label class="cform__field">
              <span class="cform__label"
                ><span class="c-accent">#</span> email</span
              >
              <input
                id="cf-email"
                v-model.trim="formData.email"
                type="email"
                required
                autocomplete="email"
                :disabled="sending"
              />
            </label>
          </div>
          <label class="cform__field">
            <span class="cform__label"
              ><span class="c-accent">#</span> message</span
            >
            <textarea
              id="cf-message"
              v-model.trim="formData.message"
              rows="6"
              required
              :disabled="sending"
            ></textarea>
          </label>

          <p v-if="error" class="cform__error" role="alert">{{ error }}</p>

          <button
            type="submit"
            class="btn btn--primary cform__submit"
            :disabled="sending"
          >
            {{ sending ? 'sending…' : 'send message →' }}
          </button>
        </form>
      </div>
    </dialog>
  </section>
</template>

<script setup lang="ts">
// Web3Forms access key — SAFE to expose in client code (it only allows
// submitting to the inbox you configured; it grants no read access). Get a free
// key at https://web3forms.com (enter hello@ponnex.dev — the key is emailed
// instantly), then paste it here.
const WEB3FORMS_ACCESS_KEY = 'f24d2260-a575-405a-a9a1-9b2e55a55ec3';

const email = 'hello@ponnex.dev';
const { copied, copy } = useCopyText();

// message.txt lives in a native <dialog>: showModal() gives us the focus
// trap, Esc-to-close and ::backdrop for free. Backdrop clicks hit the
// dialog element itself (click.self) — content clicks hit its children.
const dialogEl = ref<HTMLDialogElement | null>(null);

function openModal() {
  dialogEl.value?.showModal();
  document.body.classList.add('no-scroll');
}

function closeModal() {
  dialogEl.value?.close();
}

// fires for every close path (close button, backdrop, Esc)
function onDialogClose() {
  document.body.classList.remove('no-scroll');
}

onBeforeUnmount(() => document.body.classList.remove('no-scroll'));

const formData = reactive({ name: '', email: '', message: '' });
const honeypot = ref(false);
const sending = ref(false);
const error = ref('');

async function onSubmit() {
  // Bot tripped the honeypot — pretend success, send nothing.
  if (honeypot.value) {
    await navigateTo('/thankyou');
    return;
  }

  error.value = '';
  sending.value = true;
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New message from ${formData.name || 'ponnex.dev'}`,
        from_name: 'ponnex.dev contact form',
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });
    const data = await res.json();
    if (data.success) {
      await navigateTo('/thankyou');
    } else {
      throw new Error(data.message || 'submit failed');
    }
  } catch {
    error.value = `Couldn't send — please email me directly at ${email}.`;
  } finally {
    sending.value = false;
  }
}
</script>
