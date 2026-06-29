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
			<picture v-if="project.image">
				<source :srcset="webpSrc" type="image/webp" />
				<img
					:src="project.image"
					:alt="`${project.title} preview`"
					:width="ogDims.w"
					:height="ogDims.h"
				/>
			</picture>
			<span v-else class="case-study__initials" aria-hidden="true">{{ initials }}</span>
		</div>

		<div class="case-study__grid">
			<div class="case-study__panel">
				<h2 class="case-study__label"># overview</h2>
				<p>{{ project.body || project.description }}</p>
			</div>
			<div v-if="project.outcome" class="case-study__panel">
				<h2 class="case-study__label"># outcome</h2>
				<p>{{ project.outcome }}</p>
			</div>
			<!--
				Key facts as a real <table>: a scannable, snippet-eligible summary
				(role/year/industry/stack/status) that mirrors the CreativeWork JSON-LD
				below. Replaces the old single-line role/stack panels so the same facts
				aren't repeated twice.
			-->
			<div class="case-study__panel">
				<h2 class="case-study__label"># facts</h2>
				<table class="case-study__facts">
					<tbody>
						<tr v-if="project.role">
							<th scope="row">Role</th>
							<td>{{ project.role }}</td>
						</tr>
						<tr>
							<th scope="row">Year</th>
							<td>{{ project.year }}</td>
						</tr>
						<tr>
							<th scope="row">Industry</th>
							<td>{{ project.category }}</td>
						</tr>
						<tr>
							<th scope="row">Stack</th>
							<td>{{ project.stack.join(', ') }}</td>
						</tr>
						<tr v-if="project.link">
							<th scope="row">Status</th>
							<td>{{ isRepo ? 'Open source · GitHub' : 'Live site' }}</td>
						</tr>
					</tbody>
				</table>
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
import { getProjectById, projectThumbHue, projectTags, projectImageDims, projectMetaDescription } from '~/data/projects'

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

// og:image is set per-project below, but og:image:width/height are declared
// globally as 1200×630 in nuxt.config. Project thumbnails are 1200-wide with
// varying heights, so emit each one's real dimensions here — otherwise the
// inherited 630 makes previews crop/letterbox wrong. Falls back to og.png's
// 1200×630 for projects without a thumbnail.
const ogDims = computed(
	() => projectImageDims[String(route.params.slug)] ?? { w: 1200, h: 630 },
)

// WebP for the on-page hero; the JPG stays the <img> fallback + og:image source.
const webpSrc = computed(() => project.value?.image?.replace(/\.jpe?g$/i, '.webp'))

// Per-project meta: a crawler/recruiter landing on a case-study URL gets a
// title, summary and preview describing that specific project — not the
// homepage defaults.
useSeoMeta({
	title: () =>
		project.value
			? `${project.value.title} — Emmanuel Francis Ramos`
			: 'Project — Emmanuel Francis Ramos',
	// Short, ≤160-char SERP description (role · short summary, clamped). The
	// longer `body` is reserved for og:description and the on-page lead below.
	description: () =>
		project.value
			? projectMetaDescription(project.value)
			: 'Frontend engineering case study by Emmanuel Francis Ramos.',
	ogTitle: () =>
		project.value
			? `${project.value.title} — Emmanuel Francis Ramos`
			: 'Project — Emmanuel Francis Ramos',
	ogDescription: () => project.value?.body || project.value?.description || '',
	ogImage: () =>
		project.value?.image ? `${SITE}${project.value.image}` : `${SITE}/og.png`,
	ogImageWidth: () => ogDims.value.w,
	ogImageHeight: () => ogDims.value.h,
})

// Per-project structured data. BreadcrumbList gives search engines the
// Home › Projects › <project> trail; the CreativeWork (or SoftwareSourceCode
// for repo links) describes the work itself and links its `creator`/`author`
// back to the site's Person entity (@id defined in app/pages/index.vue), so AI
// search reads each case study as a thing this specific person built.
const projectLd = computed(() => {
	const p = project.value
	if (!p) return null
	const url = `${SITE}/projects/${p.id}/`
	const img = p.image ? `${SITE}${p.image}` : `${SITE}/og.png`
	const tags = projectTags(p)
	const work = {
		'@type': isRepo.value ? 'SoftwareSourceCode' : 'CreativeWork',
		'@id': `${url}#project`,
		name: p.title,
		headline: p.title,
		description: p.body || p.description,
		url,
		image: img,
		inLanguage: 'en',
		dateCreated: p.year,
		datePublished: p.year,
		creator: { '@id': `${SITE}/#person` },
		author: { '@id': `${SITE}/#person` },
		about: tags,
		keywords: [...p.stack, ...tags].join(', '),
		isPartOf: { '@id': `${SITE}/#website` },
		...(isRepo.value
			? { codeRepository: p.link, programmingLanguage: p.stack }
			: p.link
				? { sameAs: p.link }
				: {}),
	}
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
					{ '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/projects/` },
					{ '@type': 'ListItem', position: 3, name: p.title, item: url },
				],
			},
			work,
		],
	}
})

useHead({
	script: [
		{
			type: 'application/ld+json',
			// Getter so it re-serializes for the right project on client-side nav.
			innerHTML: () => JSON.stringify(projectLd.value ?? {}),
		},
	],
})
</script>

<style scoped lang="scss">
// Key-facts table: a tight two-column spec block in the terminal palette. Row
// headers (<th scope="row">) keep it accessible and table-snippet eligible.
.case-study__facts {
	width: 100%;
	border-collapse: collapse;
	font-size: 14px;
	line-height: 1.5;
}
.case-study__facts th,
.case-study__facts td {
	text-align: left;
	vertical-align: top;
	padding: 8px 0;
	border-bottom: 1px solid var(--line);
}
.case-study__facts tr:last-child th,
.case-study__facts tr:last-child td {
	border-bottom: 0;
}
.case-study__facts th {
	width: 30%;
	padding-right: 16px;
	font-weight: 600;
	color: var(--ink-2);
	font-family: 'JetBrains Mono', 'Menlo-Regular', ui-monospace, monospace;
	white-space: nowrap;
}
.case-study__facts td {
	color: var(--ink);
}
</style>
