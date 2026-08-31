<script setup lang="ts">
const projects = useProjects();

useSeoMeta({
  title: "Portfolio — Luqmaan Abrahams",
  description:
    "Two live client sites built end to end: a photography ecommerce store with a CMS, and a marketing site for a deep cleaning business.",
});
</script>

<template>
  <main class="mx-auto max-w-page px-6 pt-16 pb-24 md:px-10 md:pt-[72px]">
    <PageHeader
      kicker="Portfolio"
      heading="Two client sites, built end to end."
      lede="Both are live client work — frontend, backend and hosting."
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
