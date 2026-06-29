<template>
	<section id="faq" class="sec shell">
		<h2 class="sec-head">
			<span class="h">//</span> faq
			<span class="rule"></span>
			<span>frequently asked</span>
		</h2>

		<!--
			Real, crawlable Q&A. Each answer is a 40–60 word direct answer to a
			natural question — the shape featured snippets, People-Also-Ask and
			voice assistants extract. Rendered with <details> so the text ships in
			the prerendered HTML (not behind JS); the matching FAQPage schema below
			is built from the SAME data, so structured + visible content never drift.
		-->
		<div class="faq">
			<details
				v-for="(item, i) in faqs"
				:key="item.q"
				class="faq__item"
				:open="i === 0"
			>
				<summary class="faq__q">
					<span class="faq__qmark" aria-hidden="true">?</span>
					<h3 class="faq__qtext">{{ item.q }}</h3>
					<span class="faq__chev" aria-hidden="true">›</span>
				</summary>
				<p class="faq__a">{{ item.a }}</p>
			</details>
		</div>
	</section>
</template>

<script setup lang="ts">
// One source of truth for both the visible Q&A and the FAQPage schema. Every
// answer is grounded in facts stated elsewhere on the site (stack, availability,
// projects, contact) — no new claims introduced here.
const faqs = [
	{
		q: 'What does Emmanuel Francis Ramos do?',
		a: 'Emmanuel Francis Ramos is a frontend engineer with 9+ years building production web applications. He works day-to-day in Vue, Nuxt, React, Next.js and TypeScript, owning features end-to-end — from design system to shipped, real-time interfaces — across airlines, banking, e-commerce and crypto.',
	},
	{
		q: 'What is his tech stack?',
		a: 'His daily stack is Vue, Nuxt, TypeScript, JavaScript, SCSS and Tailwind, with Pinia or Vuex for state. He also ships React, Next.js and Redux in production, builds on the Internet Computer and Bitcoin, and works with Vite, Webpack, Jest and Git.',
	},
	{
		q: 'Is he available for freelance or full-time work?',
		a: 'Yes. Emmanuel is open to both select freelance projects and full-time roles, and he works remotely. The fastest way to start a conversation is email at hello@ponnex.dev — he typically replies within 24 hours.',
	},
	{
		q: 'Does he have Web3 or blockchain experience?',
		a: 'Yes. He has shipped production Web3 frontends on the Internet Computer and Bitcoin, including Odin.fun — a real-time trading platform trading against ICP canisters — and the Bioniq and Toniq NFT marketplaces, covering wallet flows, on-chain data and near-instant settlement UX.',
	},
	{
		q: 'Which companies and projects has he worked on?',
		a: 'His client work includes Singapore Airlines, Caltex, the Singapore Biennale, two banking platforms, and the crypto products Odin.fun, Bioniq and Toniq. Alongside that he has built personal projects spanning PWAs, mobile apps and IoT companions since 2015.',
	},
	{
		q: 'How can I contact him?',
		a: 'Email hello@ponnex.dev or use the contact form on this site — both reach his inbox directly, usually with a reply within 24 hours. You can also connect on LinkedIn or browse his code on GitHub.',
	},
	{
		q: 'Where is he based, and does he work remotely?',
		a: 'Emmanuel works remotely and is set up for distributed teams across time zones. His focus is the work and the collaboration rather than a fixed location, so remote engagements — freelance or full-time — are the default.',
	},
]

// FAQPage structured data, built from the same `faqs` array so the markup and
// the on-page text always match (a Google requirement for FAQ rich results).
useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify({
				'@context': 'https://schema.org',
				'@type': 'FAQPage',
				'@id': 'https://ponnex.dev/#faq',
				mainEntity: faqs.map((f) => ({
					'@type': 'Question',
					name: f.q,
					acceptedAnswer: { '@type': 'Answer', text: f.a },
				})),
			}),
		},
	],
})
</script>

<style scoped lang="scss">
.faq {
	display: grid;
	gap: 12px;
	max-width: 820px;
}

.faq__item {
	border: 1px solid var(--line);
	border-radius: 10px;
	background: var(--panel);
	overflow: hidden;
}

.faq__q {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 16px 18px;
	cursor: pointer;
	list-style: none; // hide native marker (Firefox)
	user-select: none;
}
.faq__q::-webkit-details-marker {
	display: none; // hide native marker (Safari/Chrome)
}
.faq__q:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: -2px;
}

.faq__qmark {
	font-family: 'JetBrains Mono', 'Menlo-Regular', ui-monospace, monospace;
	color: var(--accent-text);
	font-weight: 700;
	font-size: 15px;
	flex: none;
}

.faq__qtext {
	margin: 0;
	font-size: 15.5px;
	font-weight: 600;
	color: var(--ink);
	line-height: 1.4;
	flex: 1;
}

.faq__chev {
	flex: none;
	color: var(--ink-2);
	font-size: 20px;
	line-height: 1;
	transition: transform 0.18s ease;
}
.faq__item[open] .faq__chev {
	transform: rotate(90deg);
}

.faq__a {
	margin: 0;
	padding: 0 18px 18px 44px;
	font-size: 14.5px;
	line-height: 1.7;
	color: var(--ink-2);
	max-width: 68ch;
}

@media (prefers-reduced-motion: reduce) {
	.faq__chev {
		transition: none;
	}
}
</style>
