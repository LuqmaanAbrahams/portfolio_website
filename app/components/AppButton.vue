<script setup lang="ts">
import { NuxtLink } from "#components";

type ButtonVariant = "primary" | "secondary" | "ghost" | "quiet";

/**
 * The site's one button. Renders a <NuxtLink> when given `to`, an <a> when
 * given `href`, and a <button> otherwise — so the same styling covers
 * navigation and form actions.
 */
const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    to?: string;
    href?: string;
    type?: "button" | "submit" | "reset";
  }>(),
  { variant: "primary", to: undefined, href: undefined, type: "button" }
);

/* Every variant sets its own border colour. Keep it that way: two
   border-colour utilities on one element resolve by stylesheet order, not by
   the order they are written here, so a shared `border-transparent` in the
   base class would silently erase the outlined variants' borders. */
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-blurple px-2.5 text-blurple hover:bg-blurple/12 active:bg-blurple/22",
  secondary: "border-text/16 px-2.5 hover:bg-text/8 active:bg-text/14",
  ghost:
    "border-transparent px-1 text-blurple hover:bg-blurple/10 active:bg-blurple/18",
  quiet:
    "border-transparent px-1 text-neutral-300 hover:bg-text/8 hover:text-neutral-100",
};

const is = computed(() => (props.to ? NuxtLink : props.href ? "a" : "button"));

const linkOrTypeAttrs = computed(() =>
  props.to
    ? { to: props.to }
    : props.href
      ? { href: props.href }
      : { type: props.type }
);
</script>

<template>
  <component
    :is="is"
    v-bind="linkOrTypeAttrs"
    class="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md border py-1.5 text-center font-body font-500 text-button leading-tight transition-colors duration-200 ease-entrance"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
