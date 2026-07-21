<template>
	<div ref="el" class="code" aria-hidden="true">
		<div class="code__bar">
			<i style="background:#ff5f56"></i><i style="background:#ffbd2e"></i><i style="background:#27c93f"></i>
			<span class="fn">developer.ts</span>
		</div>
		<pre><span
			v-for="(line, i) in visibleLines"
			:key="i"
			class="code__line"
		><span
			v-for="(tok, ti) in line"
			:key="ti"
			:class="tok.c"
		>{{ tok.t }}</span></span><span v-if="showCursor" class="code__cursor">█</span></pre>
	</div>
</template>

<script setup lang="ts">
type Tok = { t: string; c?: 'a' | 's' | 'k' }

const CAREER_START_YEAR = 2017
const years = computed(() => new Date().getFullYear() - CAREER_START_YEAR)

// Terminal "business card" — typed line by line once it scrolls into view.
const codeLines = computed<Tok[][]>(() => [
	[{ t: 'const ', c: 'k' }, { t: 'dev' }, { t: ' = {' }],
	[{ t: '  name: ' }, { t: '"Emmanuel Francis Ramos"', c: 's' }, { t: ',' }],
	[{ t: '  role: ' }, { t: '"Senior Frontend Engineer"', c: 's' }, { t: ',' }],
	[{ t: '  stack: [' }, { t: '"React"', c: 's' }, { t: ', ' }, { t: '"Vue"', c: 's' }, { t: ', ' }, { t: '"TS"', c: 's' }, { t: '],' }],
	[{ t: '  focus: ' }, { t: '"AI-native"', c: 's' }, { t: ',' }],
	[{ t: '  experience: ' }, { t: `"${years.value} yrs"`, c: 'a' }, { t: ',' }],
	[{ t: '  industries: ' }, { t: '9', c: 'a' }, { t: ',' }],
	[{ t: '  available: ' }, { t: 'true', c: 'a' }, { t: ',' }],
	[{ t: '}' }],
	[],
	[{ t: '> ', c: 'a' }, { t: 'open to work · replies in < 24h', c: 's' }],
])

// useReducedMotion first so its onMounted runs before useReveal flips
// `visible` on the reduced-motion fast path.
const { reducedMotion } = useReducedMotion()
const { el, visible } = useReveal()

const visibleCount = ref(0)
const showCursor = computed(() => visible.value && !reducedMotion.value && visibleCount.value < codeLines.value.length)
const visibleLines = computed(() => codeLines.value.slice(0, visibleCount.value))

let timer: ReturnType<typeof setTimeout> | undefined

watch(visible, (isVisible) => {
	if (!isVisible) return
	if (reducedMotion.value) {
		visibleCount.value = codeLines.value.length
		return
	}

	let i = 0
	const tick = () => {
		if (i >= codeLines.value.length) return
		i++
		visibleCount.value = i
		timer = setTimeout(tick, i <= 6 ? 120 : 80)
	}
	tick()
})

onUnmounted(() => clearTimeout(timer))
</script>
