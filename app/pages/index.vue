<template>
	<div class="portfolio">
		<LandingTemplate />
		<AboutSection />
		<WorkSection group="professional" heading="client_work" featured-only show-more />
		<WorkSection section-id="work-personal" group="personal" heading="solo_work" featured-only show-more />
		<SkillsSection />
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
