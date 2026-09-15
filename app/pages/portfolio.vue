<script setup lang="ts">
const projects = useProjects();

usePageSeo({
  title: "Portfolio — Luqmaan Abrahams",
  description:
    "Two live client sites built end to end — a photography ecommerce store with a CMS and a marketing site for a deep cleaning business — plus the early HTML, CSS and JavaScript projects that came before them.",
});
</script>

<template>
  <main class="mx-auto max-w-page px-6 pt-16 pb-24 md:px-10 md:pt-[72px]">
    <PageHeader
      kicker="Portfolio"
      heading="Client work, and where it started."
      lede="Two live client sites built end to end — frontend, backend and hosting — followed by two early projects in plain HTML, CSS and JavaScript."
      class="mb-14"
    />

    <div class="flex flex-col">
      <PortfolioProjectFeature
        v-for="(project, index) in projects"
        :key="project.slug"
        :project="project"
        :flipped="index % 2 === 1"
        class="border-text/16 py-14 first:pt-0 not-last:border-b last:pb-0"
      />
    </div>

    <PortfolioCtaBanner class="mt-[76px]" />
  </main>
</template>
