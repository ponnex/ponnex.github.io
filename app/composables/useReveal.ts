// Reveals an element (and its staggered children) once it scrolls into view.
// Mirrors the IntersectionObserver pattern in sections/skills.vue so work and
// services share one implementation. Respects prefers-reduced-motion: when set,
// content is shown immediately with no transition.
export function useReveal(threshold = 0.12) {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  const { reducedMotion } = useReducedMotion()
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (reducedMotion.value) {
      visible.value = true
      return
    }
    if (!el.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          visible.value = true
          observer?.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { el, visible }
}
