<template>
	<section id="skills" class="sec shell">
		<div class="sec-head">
			<span class="h">//</span> skills
			<span class="rule"></span>
			<span>stack proficiency</span>
		</div>
		<div class="skills">
			<div v-for="g in skillGroups" :key="g.group" class="skillgrp">
				<div class="skillgrp__head"><span class="h">#</span> {{ g.group }}</div>
				<div v-for="s in g.items" :key="s.name" class="skillgrp__r">
					<span class="skillgrp__name">{{ s.name }}</span>
					<span
						class="skillgrp__meter"
						role="img"
						:aria-label="`${s.name}: ${s.label}, ${s.level} out of 5`"
					>
						<i v-for="n in 5" :key="n" :class="{ on: n <= s.level }" aria-hidden="true"></i>
					</span>
					<span class="skillgrp__lvl">{{ s.label }}</span>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { skillGroups } from '~/data/skills'
</script>
