<script setup lang="ts">
/** Three honest tiers. The top rule and the label colour carry how current
 *  each group is, so the list itself needs no extra annotation. */
const groups = [
  {
    label: "Everyday",
    ruleClass: "border-accent-purple-700",
    labelClass: "text-accent-purple-300",
    items: ["HTML / CSS", "Vue.js", "Nuxt.js", "Node.js"],
  },
  {
    label: "In the build",
    ruleClass: "border-neutral-700",
    labelClass: "text-neutral-400",
    items: ["TypeScript", "Firebase — database & hosting", "CMS integration"],
  },
  {
    label: "Studied, not recent",
    ruleClass: "border-neutral-800",
    labelClass: "text-neutral-500",
    items: ["C#", "Java"],
    note: "From my degree — happy to pick either back up.",
  },
] as const;
</script>

<template>
  <section class="mt-20 md:mt-[84px]">
    <h2 class="font-display text-stat tracking-heading">Skills</h2>
    <p class="mt-2 text-meta text-neutral-500">
      Honest about where each one sits.
    </p>

    <div
      class="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5"
    >
      <div
        v-for="group in groups"
        :key="group.label"
        class="border-t pt-4"
        :class="group.ruleClass"
      >
        <p
          class="text-kicker tracking-[0.14em] uppercase"
          :class="group.labelClass"
        >
          {{ group.label }}
        </p>
        <ul class="mt-3 flex list-none flex-col gap-2.5 p-0">
          <li
            v-for="item in group.items"
            :key="item"
            class="font-display text-body"
            :class="group.note ? 'text-neutral-400' : undefined"
          >
            {{ item }}
          </li>
        </ul>
        <p v-if="group.note" class="mt-3 text-meta text-neutral-500">
          {{ group.note }}
        </p>
      </div>
    </div>
  </section>
</template>
