<template>
	<div class="pcard__inner">
		<div class="pcard__top">
			<span class="pcard__file">{{ project.file }}</span>
			<span class="pcard__meta">
				<span class="pcard__year">{{ project.year }}</span>
				<span class="cat">{{ project.category }}</span>
			</span>
		</div>
		<div class="pcard__media" :style="{ '--thumb-hue': projectThumbHue(project.id) }">
			<img
				v-if="project.image"
				:src="project.image"
				:alt="`${project.title} preview`"
				loading="lazy"
			/>
			<span v-else class="pcard__initials" aria-hidden="true">{{ initials }}</span>
			<span class="pcard__overlay" aria-hidden="true">
				{{ project.link ? 'view project →' : 'case study →' }}
			</span>
		</div>
		<div class="pcard__body">
			<h3>{{ project.title }}</h3>
			<p>{{ project.description }}</p>
			<div class="pcard__stack"><span>stack:</span> {{ project.stack.join(' · ') }}</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { projectThumbHue, type Project } from '~/data/projects'

const props = defineProps<{ project: Project }>()

const initials = computed(() =>
	props.project.title
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0])
		.join('')
		.toUpperCase(),
)
</script>
