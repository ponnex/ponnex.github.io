<template>
	<section class="hero shell">
		<div class="hero__grid">
			<div class="hero__head">
				<div class="hero__tag"><span class="c-accent">$</span> whoami <span class="c-dim">— frontend engineer</span></div>
				<h1 class="hero__name">Emmanuel Francis<br><span class="y">Ramos</span></h1>
			</div>
			<div class="hero__portrait">
				<img
					src="/portrait.webp"
					alt="Portrait of Emmanuel Francis Ramos"
					width="853"
					height="904"
					fetchpriority="high"
				/>
			</div>
			<div class="hero__body">
				<p class="hero__blurb">I build <b>fast, polished web applications</b> for ambitious teams — airlines, banks, e-commerce, crypto and more. Nine industries shipped, and counting.</p>
				<div class="hero__actions">
					<a class="btn btn--primary" href="#contact">start a project →</a>
					<NuxtLink class="btn btn--ghost" to="/resume">view resume</NuxtLink>
				</div>
				<div class="hero__social">
					<SocialIcons />
				</div>
			</div>
		</div>
		<a href="#work" class="hero__scroll" aria-label="Scroll to work section">
			<span class="hero__scroll-label">scroll</span>
			<span class="hero__scroll-arrow" aria-hidden="true">↓</span>
		</a>
	</section>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'
</script>
