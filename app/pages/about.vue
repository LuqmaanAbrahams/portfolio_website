<script setup lang="ts">
usePageSeo({
  title: "About — Luqmaan Abrahams",
  description:
    "Website developer in Roodepoort, Gauteng. BSc in computer and information sciences from Monash South Africa, freelancing since December 2024.",
});
</script>

<template>
  <main class="mx-auto max-w-page px-6 pt-16 pb-24 md:px-10 md:pt-[72px]">
    <PageHeader
      kicker="About"
      heading="A developer who'd rather your site just worked."
      :heading-ch="22"
      class="mb-12"
    />
    <AboutStory />
    <AboutSkills />
  </main>
</template>
