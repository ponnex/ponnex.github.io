<template>
	<section class="hero shell">
		<div class="hero__tag"><span class="c-accent">$</span> whoami <span class="c-dim">— frontend developer</span></div>
		<h1 class="hero__name">Emmanuel Francis<br><span class="y">Ramos</span></h1>
		<div class="hero__flex">
			<div>
				<p class="hero__blurb">I build <b>fast, polished web applications</b> for ambitious teams — airlines, banks, e-commerce, crypto and more. Nine industries shipped, and counting.</p>
				<div class="hero__actions">
					<a class="btn btn--primary" href="#contact">get in touch →</a>
					<NuxtLink class="btn btn--ghost" to="/resume">view resume</NuxtLink>
				</div>
				<div class="hero__social">
					<SocialIcons />
				</div>
			</div>
			<div class="code">
				<div class="code__bar">
					<i style="background:#ff5f56"></i><i style="background:#ffbd2e"></i><i style="background:#27c93f"></i>
					<span class="fn">developer.ts</span>
				</div>
				<pre><span class="k">const</span> <span class="a">dev</span> = {
  name: <span class="s">"E. F. Ramos"</span>,
  role: <span class="s">"Frontend Dev"</span>,
  stack: [<span class="s">"Vue"</span>, <span class="s">"Nuxt"</span>, <span class="s">"React"</span>, <span class="s">"TS"</span>],
  available: <span class="a">true</span>,
}</pre>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import SocialIcons from '~/components/social-icons/social-icons.vue'
</script>
