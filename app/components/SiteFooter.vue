<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-text/16 px-6 py-7 md:px-10">
    <div
      class="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 text-meta text-neutral-500"
    >
      <span>© {{ year }} Luqmaan Abrahams · Website Developer</span>
      <nav class="flex gap-[18px]">
        <a
          class="text-blurple transition-colors duration-200 hover:text-accent-purple-300"
          href="mailto:Luqmaan78600@gmail.com"
          >Email</a
        >
        <a
          class="text-blurple transition-colors duration-200 hover:text-accent-purple-300"
          href="https://github.com/LuqmaanAbrahams"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >
      </nav>
    </div>
  </footer>
</template>
