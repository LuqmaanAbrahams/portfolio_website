<script setup lang="ts">
/**
 * The header every interior page opens with: kicker rule, page heading, and
 * an optional lede. The heading's measure is a prop rather than a class so
 * pages can tune it without an arbitrary utility Tailwind would have to see
 * spelled out at the call site.
 */
withDefaults(
  defineProps<{ kicker: string; heading: string; lede?: string; headingCh?: number }>(),
  { lede: undefined, headingCh: 20 }
);
</script>

<template>
  <header>
    <SectionKicker>{{ kicker }}</SectionKicker>
    <h1
      class="mt-[22px] animate-rise font-display font-500 text-page-heading tracking-page-heading leading-page-heading text-balance"
      :style="{ maxWidth: `${headingCh}ch` }"
    >
      {{ heading }}
    </h1>
    <p
      v-if="lede"
      class="mt-3 max-w-[56ch] text-body text-neutral-400 text-pretty"
    >
      {{ lede }}
    </p>
  </header>
</template>
