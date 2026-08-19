<template>
  <div class="border-b border-text/16 text-nav">
    <ul class="flex justify-between items-center pt-5 pb-[10px]">
      <li class="px-10 ml-[-10px]">
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
      <li class="px-15">
        <ul id="navButtons" class="mt-[-10px] gap-4 flex text-text/80">
          <li class="" v-for="link in navLinks" :key="link.label">
            <NuxtLink
              class="hover:text-accent-purple-100 px-[10px] py-[8px]"
              :to="link.to"
              >{{ link.label }}</NuxtLink
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
li {
  list-style: none;
  display: inline-block;
}

.router-link-active {
  color: var(--color-accent-purple-500);
  background-color: var(--color-accent-purple-900);
  border-radius: 5px;
  transition: background-color ease-in 0.2s;
}
</style>
<script setup lang="ts">
const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/About" },
  { label: "Portfolio", to: "/Portfolio" },
  { label: "Contact", to: "/Contact" },
];
</script>
