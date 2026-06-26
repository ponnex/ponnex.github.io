<template>
	<div class="portfolio">
		<LandingTemplate />
		<WorkSection featured-only show-more />
		<SkillsSection />
		<AboutSection />
		<ContactSection />
	</div>
</template>

<script setup lang="ts">
import LandingTemplate from '~/components/template/landing/landing.vue'
import WorkSection from '~/components/sections/work.vue'
import SkillsSection from '~/components/sections/skills.vue'
import AboutSection from '~/components/sections/about.vue'
import ContactSection from '~/components/sections/contact.vue'
</script>
