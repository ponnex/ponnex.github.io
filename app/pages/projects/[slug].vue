<template>
	<div v-if="project" class="case-study shell">
		<header class="page-head">
			<div class="page-head__tag">
				<NuxtLink to="/projects" class="case-study__back">← projects</NuxtLink>
			</div>
			<h1 class="page-head__title">{{ project.title }}</h1>
			<p class="page-head__sub">{{ project.category }} · {{ project.year }}</p>
		</header>

		<div
			class="case-study__hero"
			:style="{ '--thumb-hue': projectThumbHue(project.id) }"
		>
			<img
				v-if="project.image"
				:src="project.image"
				:alt="`${project.title} preview`"
			/>
			<span v-else class="case-study__initials" aria-hidden="true">{{ initials }}</span>
		</div>

		<div class="case-study__grid">
			<div class="case-study__panel">
				<h2 class="case-study__label"># overview</h2>
				<p>{{ project.description }}</p>
			</div>
			<div v-if="project.role" class="case-study__panel">
				<h2 class="case-study__label"># role</h2>
				<p>{{ project.role }}</p>
			</div>
			<div v-if="project.outcome" class="case-study__panel">
				<h2 class="case-study__label"># outcome</h2>
				<p>{{ project.outcome }}</p>
			</div>
			<div class="case-study__panel">
				<h2 class="case-study__label"># stack</h2>
				<p class="case-study__stack">{{ project.stack.join(' · ') }}</p>
			</div>
		</div>

		<div class="case-study__actions">
			<a
				v-if="project.link"
				class="btn btn--primary"
				:href="project.link"
				target="_blank"
				rel="noopener noreferrer"
				:aria-label="`${isRepo ? `View ${project.title} source repo` : `Visit ${project.title} live site`} (opens in new tab)`"
			>{{ isRepo ? 'visit repo ↗' : 'visit live ↗' }}</a>
			<NuxtLink class="btn btn--ghost" to="/projects">all projects</NuxtLink>
			<NuxtLink class="btn btn--ghost" to="/#contact">get in touch →</NuxtLink>
		</div>
	</div>
	<div v-else class="shell sec">
		<p class="c-dim">Project not found.</p>
		<NuxtLink to="/projects" class="btn btn--ghost">← back to projects</NuxtLink>
	</div>
</template>

<script setup lang="ts">
import { getProjectById, projectThumbHue } from '~/data/projects'

const route = useRoute()
const project = computed(() => getProjectById(String(route.params.slug)))

// GitHub links open the source repo, not a live demo — label the button accordingly.
const isRepo = computed(() => /github\.com/i.test(project.value?.link ?? ''))

const initials = computed(() => {
	const title = project.value?.title ?? ''
	return title
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0])
		.join('')
		.toUpperCase()
})

// Canonical + og:url come from app.vue (per-route, trailing-slash form).
const SITE = 'https://ponnex.dev'

// Per-project meta: a crawler/recruiter landing on a case-study URL gets a
// title, summary and preview describing that specific project — not the
// homepage defaults.
useSeoMeta({
	title: () =>
		project.value
			? `${project.value.title} — Emmanuel Francis Ramos`
			: 'Project — Emmanuel Francis Ramos',
	description: () =>
		project.value
			? `${project.value.role ? project.value.role + ' · ' : ''}${project.value.description}`
			: 'Frontend engineering case study by Emmanuel Francis Ramos.',
	ogTitle: () =>
		project.value
			? `${project.value.title} — Emmanuel Francis Ramos`
			: 'Project — Emmanuel Francis Ramos',
	ogDescription: () => project.value?.description ?? '',
	ogImage: () =>
		project.value?.image ? `${SITE}${project.value.image}` : `${SITE}/og.png`,
})
</script>
