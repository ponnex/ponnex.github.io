<template>
	<section id="about" class="sec shell">
		<h2 class="sec-head">
			<span class="h">//</span> about
			<span class="rule"></span>
			<span>readme.md</span>
		</h2>
		<div class="about">
			<div class="about__blk">
				<h3># background</h3>
				<p>Frontend engineer with <b>{{ yearsExperience }}+ years</b> turning complex requirements into interfaces that feel effortless. I own features end-to-end — from discovery to design system to ship.</p>
			</div>
			<div class="about__blk">
				<h3># now</h3>
				<p>Building in the <b>crypto / Internet Computer</b> space. Available for select <b>freelance</b> and <b>full-time</b> work.</p>
			</div>
		</div>

		<h2 id="services" class="sec-head sec-head--offset">
			<span class="h">//</span> services
			<span class="rule"></span>
			<span>what i offer</span>
		</h2>
		<div ref="servicesEl" class="services" :class="{ 'services--in': servicesVisible }">
			<div v-for="(s, i) in services" :key="s.title" class="services__item" :style="{ '--reveal-i': i }">
				<div class="n">/{{ (i + 1).toString().padStart(2, '0') }}</div>
				<h3>{{ s.title }}</h3>
				<p>{{ s.description }}</p>
				<a class="services__cta" href="#contact">discuss →</a>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { services } from '~/data/skills'

const CAREER_START_YEAR = 2017
const yearsExperience = computed(() => new Date().getFullYear() - CAREER_START_YEAR)

const { el: servicesEl, visible: servicesVisible } = useReveal()
</script>
