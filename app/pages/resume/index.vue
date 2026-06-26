<template>
  <div ref="resumeRef" class="resume">
    <ClientOnly>
      <VuePdfEmbed :source="source" :width="pdfWidth" />
      <template #fallback>
        <span class="loading">Loading pdf...</span>
      </template>
    </ClientOnly>
    <div class="resume__links">
      <a href="ramos_resume.pdf" target="_blank">
        Download in PDF
      </a>
      <a href="https://www.linkedin.com/in/ponnex/" target="_blank">
        View LinkedIn
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'

const source = '/ramos_resume.pdf'
const MAX_WIDTH = 1600
// Mirrors `$maxw` for the `.resume` container in _terminal.scss — the page is
// centered and capped at this width, so the PDF can never be wider than this.
const CONTENT_MAX = 1160

const resumeRef = ref<HTMLElement | null>(null)
const pdfWidth = ref(MAX_WIDTH)

const { width: windowWidth } = useWindowSize()

function resizePdf() {
  const el = resumeRef.value
  if (!el) return
  const styles = window.getComputedStyle(el)
  const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
  // Measure against the viewport (capped to the container width), NOT
  // el.clientWidth: the canvas inflates the element, so reading the element's
  // own width feeds the inflated value back in and the PDF never shrinks.
  const viewport = document.documentElement.clientWidth
  const available = Math.min(viewport, CONTENT_MAX) - padding
  pdfWidth.value = Math.max(0, Math.min(available, MAX_WIDTH))
}

// Recompute whenever the viewport width changes.
watch(windowWidth, () => resizePdf())

onMounted(() => {
  nextTick(resizePdf)
})
</script>
