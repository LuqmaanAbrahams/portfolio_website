<script setup lang="ts">
const stats = [
  { value: "2", label: "Client sites shipped" },
  { value: "Dec 2024", label: "Freelancing since" },
  { value: "BSc, distinction", label: "Monash South Africa" },
  { value: "Vue · Nuxt", label: "Everyday stack" },
];
</script>

<template>
  <section
    class="border-y border-indigo-band-edge/60 bg-linear-to-b from-indigo-band-base to-indigo-band-fade"
  >
    <div
      class="mx-auto grid max-w-page grid-cols-1 gap-7 px-6 py-8 sm:grid-cols-2 md:px-10 lg:grid-cols-4"
    >
      <StatItem
        v-for="stat in stats"
        :key="stat.label"
        :value="stat.value"
        :label="stat.label"
      />
    </div>
  </section>
</template>
