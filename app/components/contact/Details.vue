<script setup lang="ts">
/** `href` absent means the value is not something to click — the location. */
const details = [
  {
    label: "Email",
    value: "Luqmaan78600@gmail.com",
    href: "mailto:Luqmaan78600@gmail.com",
  },
  { label: "Phone", value: "+27 81 766 0257", href: "tel:+27817660257" },
  {
    label: "GitHub",
    value: "github.com/LuqmaanAbrahams",
    href: "https://github.com/LuqmaanAbrahams",
  },
  { label: "Based in", value: "Roodepoort, Gauteng, South Africa" },
];
</script>

<template>
  <ul class="flex list-none flex-col gap-6 p-0">
    <li v-for="detail in details" :key="detail.label">
      <p class="text-kicker tracking-[0.14em] text-neutral-500 uppercase">
        {{ detail.label }}
      </p>
      <a
        v-if="detail.href"
        class="mt-1.5 inline-block font-display text-contact-link text-blurple transition-colors duration-200 ease-entrance hover:text-accent-purple-300"
        :href="detail.href"
        :target="detail.href.startsWith('http') ? '_blank' : undefined"
        :rel="detail.href.startsWith('http') ? 'noopener noreferrer' : undefined"
        >{{ detail.value }}</a
      >
      <p v-else class="mt-1.5 font-display text-contact-link">
        {{ detail.value }}
      </p>
    </li>
  </ul>
</template>
