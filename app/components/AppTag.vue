<script setup lang="ts">
type TagVariant = "accent" | "violet" | "neutral" | "outline";

/**
 * Small pill used for tech stacks and project labels. `outline` carries a
 * visible border; the filled variants keep a transparent one so a mixed row
 * of tags stays on a single baseline.
 */
withDefaults(defineProps<{ variant?: TagVariant }>(), { variant: "outline" });

const variantClasses: Record<TagVariant, string> = {
  accent: "border-transparent bg-accent-purple-800 text-accent-purple-100",
  violet:
    "border-transparent bg-accent-muted-violet-800 text-accent-muted-violet-100",
  neutral: "border-transparent bg-neutral-800 text-neutral-100",
  outline: "border-blurple text-blurple",
};
</script>

<template>
  <span
    class="inline-flex items-center rounded-md border px-2.5 py-[3px] text-tag tracking-[0.02em]"
    :class="variantClasses[variant]"
  >
    <slot />
  </span>
</template>
