<template>
	<div class="projects">
		<header class="page-head shell">
			<div class="page-head__tag"><span class="h">$</span> ls ~/projects</div>
			<h1 class="page-head__title">Selected Work</h1>
			<p class="page-head__sub">Client work I'm part of — shipped across airlines, banks, e-commerce, crypto and more — plus the projects I've built on my own.</p>
		</header>

		<div class="shell filter-bar">
			<div class="filter-bar__label"><span class="c-accent">$</span> filter --industry</div>
			<div class="filter-bar__tabs" role="group" aria-label="Filter projects by industry">
				<button
					v-for="tag in filterTags"
					:key="tag"
					type="button"
					class="filter-bar__tab"
					:class="{ 'filter-bar__tab--active': activeFilter === tag }"
					:aria-pressed="activeFilter === tag"
					@click="activeFilter = tag"
				>
					{{ tag === 'all' ? 'all' : tag }}
				</button>
			</div>
		</div>

		<WorkSection section-id="work" group="professional" heading="client_work" :filter="activeFilter" />
		<WorkSection section-id="work-personal" group="personal" heading="solo_work" :filter="activeFilter" />
		<ContactSection />
	</div>
</template>

<script setup lang="ts">
import WorkSection from '~/components/sections/work.vue'
import ContactSection from '~/components/sections/contact.vue'
import { projectFilters } from '~/data/projects'

const activeFilter = ref('all')
const filterTags = computed(() => ['all', ...projectFilters.map((b) => b.label)])
</script>
