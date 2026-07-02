<template>
	<section id="skills" ref="sectionEl" class="sec shell">
		<h2 class="sec-head">
			<span class="h">//</span> Skills
			<span class="rule"></span>
			<span>tools in production</span>
		</h2>
		<div class="skills" :class="{ 'skills--visible': visible }">
			<div
				v-for="(g, gi) in skillGroups"
				:key="g.group"
				class="skillgrp"
				:style="{ '--stagger': gi }"
			>
				<div class="skillgrp__head"><span class="h">#</span> {{ g.group }}</div>
				<div v-for="s in g.items" :key="s.name" class="skillgrp__r">
					<span class="skillgrp__name">{{ s.name }}</span>
					<span
						class="skillgrp__tag"
						:class="`skillgrp__tag--${s.context}`"
					>[ {{ skillContextLabels[s.context] }} ]</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { skillGroups, skillContextLabels } from '~/data/skills'

const sectionEl = ref<HTMLElement | null>(null)
const visible = ref(false)
const { reducedMotion } = useReducedMotion()

onMounted(() => {
	if (reducedMotion.value) {
		visible.value = true
		return
	}
	if (!sectionEl.value) return
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry?.isIntersecting) {
				visible.value = true
				observer.disconnect()
			}
		},
		{ threshold: 0.12 },
	)
	observer.observe(sectionEl.value)
})
</script>
