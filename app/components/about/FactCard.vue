<script setup lang="ts">
/** One card in the About sidebar: a labelled fact, with either a meta line
 *  or a row of tags underneath (the slot). */
defineProps<{ kicker: string; title: string; meta?: string }>();
</script>

<template>
  <div class="rounded-md bg-surface p-5 shadow-sm">
    <p class="text-tag tracking-[0.1em] text-accent-purple-300 uppercase">
      {{ kicker }}
    </p>
    <p class="mt-1.5 font-display text-body">{{ title }}</p>
    <p v-if="meta" class="mt-0.5 text-meta text-neutral-500 text-pretty">
      {{ meta }}
    </p>
    <slot />
  </div>
</template>
