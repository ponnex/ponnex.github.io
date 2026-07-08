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
        <!-- Native validation: name/email/message are `required`, so the
             browser blocks empty submits (and bad emails) before onSubmit. -->
        <form class="cform__body" @submit.prevent="onSubmit">
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
                ><span class="c-accent">#</span> name
                <span class="cform__req" aria-hidden="true">*</span></span
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
                ><span class="c-accent">#</span> email
                <span class="cform__req" aria-hidden="true">*</span></span
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
              ><span class="c-accent">#</span> message
              <span class="cform__req" aria-hidden="true">*</span></span
            >
            <textarea
              id="cf-message"
              v-model.trim="formData.message"
              rows="6"
              required
              :disabled="sending"
            ></textarea>
          </label>

          <!-- reCAPTCHA v2 invisible mount point — the widget executes on
               submit; Google's script loads on first modal open. -->
          <div ref="captchaEl" class="cform__captcha"></div>

          <p class="cform__note c-dim">
            <span class="cform__req" aria-hidden="true">*</span> required
            fields
          </p>

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

// Google reCAPTCHA v2 invisible — same key + size as the old Nuxt 2 site
// (~/Documents/ponnex-portfolio, commits a128091/ed5ed28, @nuxtjs/recaptcha
// with size:'invisible'). Executes on submit and gates it client-side; the
// token also goes to Web3Forms as recaptcha_response (verified on their Pro
// plan).
const RECAPTCHA_SITEKEY = '6Le_-6sZAAAAALqOWrY7810jQZkpHec3xkj4wgt4';

const email = 'hello@ponnex.dev';
const { copied, copy } = useCopyText();
const { theme } = useTheme();

// message.txt lives in a native <dialog>: showModal() gives us the focus
// trap, Esc-to-close and ::backdrop for free. Backdrop clicks hit the
// dialog element itself (click.self) — content clicks hit its children.
const dialogEl = ref<HTMLDialogElement | null>(null);

function openModal() {
  dialogEl.value?.showModal();
  document.body.classList.add('no-scroll');
  renderCaptcha().catch(() => {
    /* captcha unavailable (offline/blocked) — onSubmit still requires a token */
  });
}

// ---- Google reCAPTCHA v2 invisible (script loads on first modal open) ----
type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  execute: (id: number) => void;
  reset: (id: number) => void;
};
const getGrecaptcha = () =>
  (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;

const captchaEl = ref<HTMLElement | null>(null);
let captchaWidgetId: number | null = null;
let captchaScript: Promise<void> | null = null;
let pendingToken: {
  resolve: (token: string) => void;
  reject: (err: Error) => void;
} | null = null;

function loadCaptchaScript() {
  captchaScript ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    s.async = true;
    s.onload = () => getGrecaptcha()!.ready(resolve);
    s.onerror = () => {
      captchaScript = null;
      reject(new Error('captcha script failed to load'));
    };
    document.head.appendChild(s);
  });
  return captchaScript;
}

async function renderCaptcha() {
  await loadCaptchaScript();
  const grecaptcha = getGrecaptcha();
  if (!grecaptcha || !captchaEl.value || captchaWidgetId !== null) return;
  captchaWidgetId = grecaptcha.render(captchaEl.value, {
    sitekey: RECAPTCHA_SITEKEY,
    size: 'invisible',
    theme: theme.value === 'light' ? 'light' : 'dark',
    callback: (token: string) => {
      pendingToken?.resolve(token);
      pendingToken = null;
    },
    'error-callback': () => {
      pendingToken?.reject(new Error('captcha failed'));
      pendingToken = null;
    },
  });
}

// Runs the invisible challenge and resolves with a fresh single-use token.
// Google pops a visual challenge only when the interaction looks suspicious.
async function executeCaptcha(): Promise<string> {
  await renderCaptcha();
  const grecaptcha = getGrecaptcha();
  if (!grecaptcha || captchaWidgetId === null)
    throw new Error('captcha unavailable');
  grecaptcha.reset(captchaWidgetId);
  return new Promise((resolve, reject) => {
    pendingToken = { resolve, reject };
    grecaptcha.execute(captchaWidgetId!);
  });
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
    const captchaToken = await executeCaptcha();
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
        'g-recaptcha-response': captchaToken,
        recaptcha_response: captchaToken,
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
