<template>
	<div class="projects">
		<header class="page-head shell">
			<div class="page-head__tag"><span class="h">$</span> ls ~/projects</div>
			<h1 class="page-head__title">Selected Work</h1>
			<p class="page-head__sub">Client work I'm part of — shipped across airlines, banks, e-commerce, crypto and more — plus the projects I've built on my own.</p>
		</header>
		<WorkSection section-id="work" group="professional" heading="client_work" />
		<WorkSection section-id="work-personal" group="personal" heading="solo_work" />
		<ContactSection />
	</div>
</template>

<script setup lang="ts">
import WorkSection from '~/components/sections/work.vue'
import ContactSection from '~/components/sections/contact.vue'
</script>
