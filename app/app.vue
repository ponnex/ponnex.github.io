<script setup lang="ts">
const route = useRoute()

// Per-route canonical + og:url. The live site serves the trailing-slash form
// (a no-slash URL 301s to the slash one), so every path is normalized to a
// trailing slash; root stays "/". A getter keeps both reactive across
// client-side navigation. Pages set their own title/description/ogImage but
// delegate canonical + og:url here so there is a single source of truth.
const canonicalUrl = () => {
  const p = route.path
  const path = p === '/' ? '/' : p.endsWith('/') ? p : `${p}/`
  return `https://ponnex.dev${path}`
}

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
})
useSeoMeta({
  ogUrl: canonicalUrl,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
