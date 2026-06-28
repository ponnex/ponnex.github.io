<template>
	<section v-if="items.length" :id="sectionId" ref="el" class="sec shell">
		<h2 class="sec-head">
			<span class="h">//</span> {{ heading }}
			<span class="rule"></span>
			<span>{{ total.toString().padStart(2, '0') }} projects</span>
		</h2>
		<div class="work" :class="{ 'work--featured': featuredOnly, 'work--in': visible }">
			<NuxtLink
				v-for="(p, index) in items"
				:key="p.id"
				class="pcard"
				:class="{ 'pcard--featured': featuredOnly && index === 0 }"
				:style="{ '--thumb-hue': projectThumbHue(p.id), '--reveal-i': Math.min(index, 8) }"
				:to="`/projects/${p.id}`"
				:aria-label="`${p.title} — ${p.link ? 'view project' : 'read case study'}`"
			>
				<ProjectCardContent :project="p" />
			</NuxtLink>
		</div>
		<div v-if="showMore" class="work-more">
			<NuxtLink to="/projects">view all projects →</NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
import ProjectCardContent from '~/components/sections/project-card-content.vue'
import {
	projects as allProjects,
	projectMatchesFilter,
	projectThumbHue,
	type Project,
} from '~/data/projects'

const props = withDefaults(
	defineProps<{
		heading?: string
		featuredOnly?: boolean
		showMore?: boolean
		sectionId?: string
		group?: 'professional' | 'personal'
		filter?: string
	}>(),
	{ heading: 'selected_work', featuredOnly: false, showMore: false, sectionId: 'work', filter: 'all' },
)

const { el, visible } = useReveal()

const grouped = computed<Project[]>(() => {
	let list = allProjects
	if (props.group === 'personal') list = list.filter((p) => p.group === 'personal')
	else if (props.group === 'professional') list = list.filter((p) => p.group !== 'personal')
	if (props.filter && props.filter !== 'all') {
		list = list.filter((p) => projectMatchesFilter(p, props.filter!))
	}
	return list
})

const items = computed<Project[]>(() =>
	props.featuredOnly ? grouped.value.filter((p) => p.featured) : grouped.value,
)

const total = computed(() => grouped.value.length)
</script>
