<template>
	<section :id="sectionId" class="sec shell">
		<div class="sec-head">
			<span class="h">//</span> {{ heading }}
			<span class="rule"></span>
			<span>{{ total.toString().padStart(2, '0') }} projects</span>
		</div>
		<div class="work">
			<component
				:is="p.link ? 'a' : 'div'"
				v-for="p in items"
				:key="p.id"
				class="pcard"
				:href="p.link"
				:target="p.link ? '_blank' : undefined"
				:rel="p.link ? 'noopener' : undefined"
			>
				<div class="pcard__top">
					<span>{{ p.file }}</span>
					<span class="cat">{{ p.category }}</span>
				</div>
				<div class="pcard__body">
					<h3>{{ p.title }}</h3>
					<p>{{ p.description }}</p>
					<div class="pcard__stack"><span>stack:</span> {{ p.stack.join(' · ') }}</div>
				</div>
			</component>
		</div>
		<div v-if="showMore" class="work-more">
			<NuxtLink to="/projects">view all projects →</NuxtLink>
		</div>
	</section>
</template>

<script setup lang="ts">
import { projects as allProjects, type Project } from '~/data/projects'

const props = withDefaults(
	defineProps<{
		heading?: string
		featuredOnly?: boolean
		showMore?: boolean
		sectionId?: string
		group?: 'professional' | 'personal'
	}>(),
	{ heading: 'selected_work', featuredOnly: false, showMore: false, sectionId: 'work' },
)

const grouped = computed<Project[]>(() => {
	if (props.group === 'personal') return allProjects.filter((p) => p.group === 'personal')
	if (props.group === 'professional') return allProjects.filter((p) => p.group !== 'personal')
	return allProjects
})

// Cards shown — the featured subset when previewing, otherwise the whole group.
const items = computed<Project[]>(() =>
	props.featuredOnly ? grouped.value.filter((p) => p.featured) : grouped.value,
)

// Badge count always reflects the full group, even when previewing fewer cards.
const total = computed(() => grouped.value.length)
</script>
