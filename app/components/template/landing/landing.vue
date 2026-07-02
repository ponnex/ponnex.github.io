<template>
	<section class="hero shell">
		<!--
			The headline IS the full name, so the h1 is real text (uppercased in
			CSS) — no sr-only mirror needed for crawlers/AT (FR-008).
		-->
		<h1 class="hero__headline">
			<span class="hero__word--outline">Emmanuel Francis</span> Ramos
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
