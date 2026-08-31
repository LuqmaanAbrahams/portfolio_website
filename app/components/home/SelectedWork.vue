<script setup lang="ts">
const projects = useProjects();
</script>

<template>
  <section class="mx-auto max-w-page px-6 pt-16 pb-10 md:px-10 md:pt-21">
    <div
      class="mb-8 flex flex-col items-start gap-3 md:flex-row md:items-baseline md:justify-between md:gap-6"
    >
      <h2 class="font-display text-section-heading tracking-heading">
        Selected work
      </h2>
      <AppButton to="/portfolio" variant="ghost" class="shrink-0">
        All projects →
      </AppButton>
    </div>

    <div
      class="grid grid-cols-[repeat(auto-fit,minmax(min(330px,100%),1fr))] gap-6"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.slug"
        :project="project"
      />
    </div>
  </section>
</template>
