<script setup lang="ts">
useSeoMeta({
  title: "Contact — Luqmaan Abrahams",
  description:
    "Get in touch about a freelance project or a full-time role. Website developer based in Roodepoort, Gauteng, South Africa.",
});
</script>

<template>
  <main class="mx-auto max-w-page px-6 pt-16 pb-24 md:px-10 md:pt-[72px]">
    <PageHeader
      kicker="Contact"
      heading="Let's talk about your site."
      lede="Freelance projects and full-time roles both welcome. I usually reply within a day."
      class="mb-14"
    />

    <div
      class="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-16"
    >
      <ContactDetails />
      <ContactForm />
    </div>
  </main>
</template>
