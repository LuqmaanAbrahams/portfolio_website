<script setup lang="ts">
import type { Project } from "~/composables/useProjects";

const props = defineProps<{ project: Project }>();

const tintClass = computed(() =>
  props.project.tint === "violet"
    ? "bg-accent-muted-violet-900"
    : "bg-accent-purple-900"
);
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-md bg-surface shadow-sm">
    <div class="h-[220px] shrink-0" :class="tintClass">
      <NuxtImg
        :src="project.image"
        :alt="project.imageAlt"
        format="webp"
        class="h-full w-full object-cover object-top"
        sizes="sm:100vw md:50vw lg:530px"
        loading="lazy"
      />
    </div>
    <div class="flex flex-1 flex-col p-5 pb-6">
      <p class="text-tag tracking-[0.1em] text-accent-purple-300 uppercase">
        {{ project.kicker }}
      </p>
      <h3 class="mt-1.5 font-display text-card-title leading-tight">
        {{ project.name }}
      </h3>
      <p class="mt-2 flex-1 text-card-body text-neutral-400 text-pretty">
        {{ project.summary }}
      </p>
      <ul class="mt-4 flex list-none flex-wrap gap-1.5 p-0">
        <li v-for="tag in project.tags" :key="tag">
          <AppTag variant="outline">{{ tag }}</AppTag>
        </li>
      </ul>
    </div>
  </article>
</template>
