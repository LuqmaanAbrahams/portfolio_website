<script setup lang="ts">
import type { Project } from "~/composables/useProjects";

/** A full-width project row. `flipped` puts the media on the right, so a
 *  stack of these alternates down the page. Both orders collapse to
 *  media-then-copy on a narrow screen. */
const props = withDefaults(
  defineProps<{ project: Project; flipped?: boolean }>(),
  { flipped: false }
);

const tintClass = computed(() =>
  props.project.tint === "violet"
    ? "bg-accent-muted-violet-900"
    : "bg-accent-purple-900"
);
</script>

<template>
  <article
    class="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:gap-11"
  >
    <div
      class="h-[240px] overflow-hidden rounded-lg shadow-md md:h-[340px]"
      :class="[tintClass, flipped ? 'md:order-2' : undefined]"
    >
      <NuxtImg
        v-if="project.image"
        :src="project.image"
        :alt="project.imageAlt"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <p
        v-else
        class="grid h-full place-items-center px-6 text-center text-meta text-neutral-500"
      >
        {{ project.placeholder ?? "Screenshot coming soon" }}
      </p>
    </div>

    <div :class="flipped ? 'md:order-1' : undefined">
      <p class="text-kicker tracking-[0.14em] text-accent-purple-300 uppercase">
        {{ project.kicker }} · {{ project.year }}
      </p>
      <h2 class="mt-2 font-display text-section-heading tracking-heading">
        {{ project.name }}
      </h2>
      <p class="mt-3.5 text-body leading-body text-neutral-400 text-pretty">
        {{ project.description }}
      </p>

      <dl class="mt-4.5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-meta">
        <template v-for="spec in project.specs" :key="spec.label">
          <dt class="text-neutral-500">{{ spec.label }}</dt>
          <dd>{{ spec.value }}</dd>
        </template>
      </dl>

      <ul class="mt-5 flex list-none flex-wrap gap-1.5 p-0">
        <li v-for="trait in project.traits" :key="trait">
          <AppTag :variant="project.tint">{{ trait }}</AppTag>
        </li>
      </ul>
    </div>
  </article>
</template>
