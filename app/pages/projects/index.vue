<template>
	<div class="projects">
		<header class="page-head shell">
			<div class="page-head__tag"><span class="h">$</span> ls ~/projects</div>
			<h1 class="page-head__title">Selected Work</h1>
			<p class="page-head__sub">Web applications shipped across nine industries — airlines, banks, e-commerce, crypto and more.</p>
		</header>
		<WorkSection heading="all_projects" />
		<ContactSection />
	</div>
</template>

<script setup lang="ts">
import WorkSection from '~/components/sections/work.vue'
import ContactSection from '~/components/sections/contact.vue'
</script>
