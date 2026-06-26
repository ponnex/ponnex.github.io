<template>
	<section id="about" class="sec shell">
		<div class="sec-head">
			<span class="h">//</span> about
			<span class="rule"></span>
			<span>readme.md</span>
		</div>
		<div class="about">
			<div class="about__blk">
				<h4># background</h4>
				<p>Frontend developer with <b>8+ years</b> turning complex requirements into interfaces that feel effortless. I own features end-to-end — from discovery to design system to ship.</p>
			</div>
			<div class="about__blk">
				<h4># now</h4>
				<p>Building in the <b>crypto / Internet Computer</b> space. Available for select <b>freelance</b> and <b>full-time</b> work.</p>
			</div>
		</div>

		<div class="sec-head" style="margin-top:34px">
			<span class="h">//</span> services
			<span class="rule"></span>
			<span>what i offer</span>
		</div>
		<div class="services">
			<div v-for="(s, i) in services" :key="s.title" class="services__item">
				<div class="n">/{{ (i + 1).toString().padStart(2, '0') }}</div>
				<h4>{{ s.title }}</h4>
				<p>{{ s.description }}</p>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { services } from '~/data/skills'
</script>
