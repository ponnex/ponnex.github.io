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
				Portrait (FR-003): b/w cut-out (Vision-masked, transparent) sized to
				the slot's aspect ratio so it causes no layout shift. --filled drops
				the dashed placeholder frame.
			-->
			<div class="hero__portrait hero__portrait--filled">
				<img
					src="/portrait.webp"
					alt="Portrait of Emmanuel Francis Ramos"
					width="760"
					height="920"
					fetchpriority="high"
				/>
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
