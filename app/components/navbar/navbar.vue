<template>
  <div class="tnav">
    <div class="tnav__in">
      <NuxtLink to="/" class="tnav__logo"
        ><span class="c-accent">~/</span>ponnex</NuxtLink
      >

      <ul
        class="tnav__links"
        :class="{ 'tnav__links--open': menuOpen }"
        id="tnav-drawer"
      >
        <li :class="{ active: isRouteActive('/') }" role="presentation">
          <NuxtLink to="/" @click="closeMenu">portfolio</NuxtLink>
        </li>
        <li :class="{ active: isRouteActive('/projects') }" role="presentation">
          <NuxtLink to="/projects" @click="closeMenu">projects</NuxtLink>
        </li>
        <li :class="{ active: isRouteActive('/resume') }" role="presentation">
          <NuxtLink to="/resume" @click="closeMenu">resume</NuxtLink>
        </li>

        <template v-if="isHome">
          <li class="tnav__sep" aria-hidden="true" role="presentation"></li>
          <li
            v-for="s in homeSections"
            :key="s.id"
            class="tnav__section"
            :class="{ active: activeId === s.id }"
          >
            <a :href="`#${s.id}`" @click="closeMenu">{{ s.label }}</a>
          </li>
        </template>

        <li class="tnav__status" role="presentation">
          <span class="tnav__dot"></span>open to work
        </li>
      </ul>

      <!-- Outside the drawer so the toggle stays reachable in the header on
           mobile instead of hiding behind [menu]. -->
      <div class="tnav__controls">
        <!-- Label text comes from CSS (::before keyed off the theme--* class
             on <html>), so the prerendered HTML shows the right action from
             the first paint — no label flip on hydration. -->
        <button
          type="button"
          class="theme-toggle"
          :aria-label="`switch to ${themeLabel} theme`"
          @click="toggleTheme()"
        >
          <span class="theme-toggle__bracket">[</span>
          <span class="theme-toggle__label"></span>
          <span class="theme-toggle__bracket">]</span>
        </button>
        <button
          type="button"
          class="tnav__menu-btn"
          :aria-expanded="menuOpen"
          aria-controls="tnav-drawer"
          @click="menuOpen = !menuOpen"
        >
          <span class="theme-toggle__bracket">[</span>
          <span class="theme-toggle__label">{{
            menuOpen ? 'close' : 'menu'
          }}</span>
          <span class="theme-toggle__bracket">]</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { theme, toggleTheme } = useTheme();

// the theme a click switches TO (action-labeled like [menu]/[copy]) — feeds
// the aria-label only; visible text is CSS-driven off the <html> theme class
// so it can't flash a stale value pre-hydration
const themeLabel = computed(() => (theme.value === 'light' ? 'dark' : 'light'));

const menuOpen = ref(false);
const isHome = computed(() => route.path === '/');

const homeSections = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'skills', label: 'skills' },
  { id: 'contact', label: 'contact' },
] as const;

const sectionIds = computed(() =>
  isHome.value ? homeSections.map((s) => s.id) : [],
);
const { activeId } = useScrollSpy(sectionIds);

function isRouteActive(path: string) {
  if (path === '/') return route.path === '/';
  return route.path.startsWith(path);
}

function closeMenu() {
  menuOpen.value = false;
}

watch(
  () => route.path,
  () => {
    menuOpen.value = false;
  },
);

// Mobile drawer is a full-bleed overlay. When open: lock body scroll so the
// page behind doesn't move, and `inert` the rest of the page so keyboard/AT
// focus can't escape into the content hidden underneath the drawer.
function setDrawerState(open: boolean) {
  if (!import.meta.client) return;
  document.body.classList.toggle('no-scroll', open);
  document.getElementById('main')?.toggleAttribute('inert', open);
  document.querySelector('footer')?.toggleAttribute('inert', open);
}

watch(menuOpen, setDrawerState);

onKeyStroke('Escape', () => {
  if (menuOpen.value) menuOpen.value = false;
});

onBeforeUnmount(() => setDrawerState(false));
</script>
