<template>
	<section class="hero shell">
		<div class="hero__tag"><span class="c-accent">$</span> whoami <span class="c-dim">— frontend engineer</span></div>
		<h1 class="hero__name">Emmanuel Francis<br><span class="y">Ramos</span></h1>
		<div class="hero__flex">
			<div>
				<p class="hero__blurb">I build <b>fast, polished web applications</b> for ambitious teams — airlines, banks, e-commerce, crypto and more. Nine industries shipped, and counting.</p>
				<div class="hero__actions">
					<a class="btn btn--primary" href="#contact">start a project →</a>
					<NuxtLink class="btn btn--ghost" to="/resume">view resume</NuxtLink>
				</div>
				<div class="hero__social">
					<SocialIcons />
				</div>
			</div>
			<div class="code hero__code" aria-hidden="true">
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
		</div>
		<a href="#work" class="hero__scroll" aria-label="Scroll to work section">
			<span class="hero__scroll-label">scroll</span>
			<span class="hero__scroll-arrow" aria-hidden="true">↓</span>
		</a>
	</section>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'

type Tok = { t: string; c?: 'a' | 's' | 'k' }

const CAREER_START_YEAR = 2017
const years = computed(() => new Date().getFullYear() - CAREER_START_YEAR)

// Terminal "business card" — typed line by line. The right column is now pure
// signal (real stats), not a competing interaction; the nav handles navigation.
const codeLines = computed<Tok[][]>(() => [
	[{ t: 'const ', c: 'k' }, { t: 'dev' }, { t: ' = {' }],
	[{ t: '  name: ' }, { t: '"Emmanuel Francis Ramos"', c: 's' }, { t: ',' }],
	[{ t: '  role: ' }, { t: '"Frontend Engineer"', c: 's' }, { t: ',' }],
	[{ t: '  stack: [' }, { t: '"React"', c: 's' }, { t: ', ' }, { t: '"Vue"', c: 's' }, { t: ', ' }, { t: '"TS"', c: 's' }, { t: '],' }],
	[{ t: '  experience: ' }, { t: `"${years.value} yrs"`, c: 'a' }, { t: ',' }],
	[{ t: '  industries: ' }, { t: '9', c: 'a' }, { t: ',' }],
	[{ t: '  available: ' }, { t: 'true', c: 'a' }, { t: ',' }],
	[{ t: '}' }],
	[],
	[{ t: '> ', c: 'a' }, { t: 'open to work · replies in < 24h', c: 's' }],
])

const { reducedMotion } = useReducedMotion()
const visibleCount = ref(reducedMotion.value ? codeLines.value.length : 0)
const showCursor = computed(() => !reducedMotion.value && visibleCount.value < codeLines.value.length)

const visibleLines = computed(() => codeLines.value.slice(0, visibleCount.value))

onMounted(() => {
	if (reducedMotion.value) {
		visibleCount.value = codeLines.value.length
		return
	}

	let i = 0
	const tick = () => {
		if (i >= codeLines.value.length) return
		i++
		visibleCount.value = i
		setTimeout(tick, i <= 6 ? 120 : 80)
	}
	tick()
})
</script>
