<template>
	<section id="skills" class="sec shell">
		<div class="sec-head">
			<span class="h">//</span> skills
			<span class="rule"></span>
			<span>stack proficiency</span>
		</div>
		<div class="skilltbl">
			<div v-for="s in skills" :key="s.name" class="skilltbl__r">
				<span class="skilltbl__name">{{ s.name }}</span>
				<span class="skilltbl__bar"><i :style="{ width: s.level + '%' }"></i></span>
				<span class="skilltbl__lvl">{{ s.label }}</span>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { skills } from '~/data/skills'
</script>
