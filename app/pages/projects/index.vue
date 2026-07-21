<template>
	<div class="projects">
		<header class="page-head shell">
			<div class="page-head__tag"><span class="h">$</span> ls ~/projects</div>
			<h1 class="page-head__title">Selected Work</h1>
			<p class="page-head__sub">Client work I'm part of — shipped across airlines, banks, e-commerce, marketplaces and more — plus the projects I've built on my own.</p>
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
import { projects, projectFilters } from '~/data/projects'

const activeFilter = ref('all')
const filterTags = computed(() => ['all', ...projectFilters.map((b) => b.label)])

// Canonical + og:url come from app.vue (per-route, trailing-slash form).
useSeoMeta({
	title: 'Selected Work — Emmanuel Francis Ramos, Senior Frontend Engineer',
	description:
		'Frontend engineering work by Emmanuel Francis Ramos across airlines, banking, e-commerce and product platforms — Singapore Airlines, Odin.fun, Toniq, Bioniq and more.',
	ogTitle: 'Selected Work — Emmanuel Francis Ramos, Senior Frontend Engineer',
	ogDescription:
		'Frontend engineering work across airlines, banking, e-commerce and product platforms — Singapore Airlines, Odin.fun, Toniq and more.',
})

// Structured data for the work index: a CollectionPage about the Person, a
// Home › Projects breadcrumb, and an ItemList enumerating every project in
// display order — each ListItem points at its case-study URL, so search and AI
// engines read the portfolio as one ordered set of works by this person. All
// nodes reference the #person / #website entities defined on the home page, so
// the site exposes a single canonical entity rather than competing ones.
const SITE = 'https://ponnex.dev'
const projectsLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'CollectionPage',
			'@id': `${SITE}/projects/#collectionpage`,
			url: `${SITE}/projects/`,
			name: 'Selected Work — Emmanuel Francis Ramos, Senior Frontend Engineer',
			description:
				'Frontend engineering work by Emmanuel Francis Ramos across airlines, banking, e-commerce and product platforms — Singapore Airlines, Odin.fun, Toniq, Bioniq and more.',
			isPartOf: { '@id': `${SITE}/#website` },
			about: { '@id': `${SITE}/#person` },
			inLanguage: 'en',
		},
		{
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
				{ '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/projects/` },
			],
		},
		{
			'@type': 'ItemList',
			'@id': `${SITE}/projects/#itemlist`,
			name: 'Selected Work',
			numberOfItems: projects.length,
			itemListElement: projects.map((p, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				url: `${SITE}/projects/${p.id}/`,
				name: p.title,
			})),
		},
	],
}

useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(projectsLd),
		},
	],
})
</script>
