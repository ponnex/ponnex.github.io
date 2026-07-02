<template>
	<!--
		Stat strip between hero and about — full-bleed hairline band (the .stats
		shell handles max-width internally, so this sits outside .shell).
		Numbers derive from real data (FR-009): years from career start, project
		count from projects.ts; industries + reply time mirror existing site copy.
	-->
	<div class="stats" aria-label="Career at a glance">
		<div class="stats__in">
			<div class="stats__item">
				<b>{{ years }}<i>+</i></b>
				<span>years experience</span>
			</div>
			<div class="stats__item">
				<b>9</b>
				<span>industries shipped</span>
			</div>
			<div class="stats__item">
				<b>{{ projectCount }}<i>+</i></b>
				<span>projects delivered</span>
			</div>
			<div class="stats__item">
				<b>&lt;24h</b>
				<span>reply time</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { projects } from '~/data/projects'

const CAREER_START_YEAR = 2017
const years = computed(() => new Date().getFullYear() - CAREER_START_YEAR)
const projectCount = computed(() => projects.length)
</script>
