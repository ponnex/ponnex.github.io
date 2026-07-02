<template>
	<section class="hero shell">
		<!--
			The visible headline is the short display form; the full name stays in
			the h1 for crawlers/AT via the sr-only span (FR-008 — SEO guard). The
			display spans are aria-hidden so screen readers never read "FRANCIS
			RAMOS" twice.
		-->
		<h1 class="hero__headline">
			<span class="sr-only">Emmanuel Francis Ramos — Frontend Engineer</span>
			<span aria-hidden="true"><span class="hero__word--outline">Francis</span> Ramos</span>
		</h1>

		<div class="hero__grid">
			<div class="hero__intro">
				<p class="hero__role">Frontend Engineer</p>
				<p class="hero__blurb">I build <b>fast, polished web applications</b> for ambitious teams — airlines, banks, e-commerce, crypto and more. Nine industries shipped, and counting.</p>
				<div class="hero__actions">
					<a class="btn btn--primary" href="#contact">start a project ↗</a>
					<NuxtLink class="btn btn--ghost" to="/resume">view resume</NuxtLink>
				</div>
			</div>

			<!--
				Portrait slot (FR-003): transparent with dashed frame until the real
				b/w cut-out arrives. Drop a <picture>/<img> inside .hero__portrait —
				the frame owns the aspect ratio, so the swap causes no layout shift.
			-->
			<div class="hero__portrait" aria-hidden="true">
				<span class="hero__portrait-tag">portrait</span>
			</div>

			<div class="hero__rail">
				<SocialIcons />
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'
</script>
