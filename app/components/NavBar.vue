<template>
  <div class="sticky top-0 z-20 border-b border-text/16 bg-ground/86 text-nav backdrop-blur-[14px]">
    <!-- Same gutter as every section below, so the logo and links line up with
         the content column instead of running to the viewport edges. -->
    <div class="mx-auto max-w-page px-6 md:px-10">
      <ul class="flex flex-wrap justify-between items-center gap-y-1 pt-5 pb-[10px]">
        <li>
          <NuxtLink to="/">
            <ul class="gap-5 flex">
              <li
                class="border p-1 w-7 h-7 translate-y-[-2px] rounded-[30%] border-accent-purple-500 text-accent-purple-500 font-400 text-[13px]"
              >
                LA
              </li>
              <li class="font-bold text-[14px]">Luqmaan Abrahams</li>
            </ul>
          </NuxtLink>
        </li>
        <!-- -10px pulls the last link's own padding back onto the gutter. -->
        <li class="mr-[-10px]">
          <ul id="navButtons" class="mt-[-10px] gap-4 flex text-text/80">
            <li v-for="link in navLinks" :key="link.label">
              <NuxtLink
                class="inline-block hover:text-accent-purple-100 px-[10px] py-[8px]"
                :to="link.to"
                >{{ link.label }}</NuxtLink
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
li {
  list-style: none;
  display: inline-block;
}

#navButtons .router-link-active {
  color: var(--color-accent-purple-500);
  background-color: var(--color-accent-purple-900);
  border-radius: 5px;
  transition: background-color ease-in-out 0.2s;
}
</style>
<script setup lang="ts">
const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];
</script>
