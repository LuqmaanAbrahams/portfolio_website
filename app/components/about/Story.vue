<script setup lang="ts">
const learning = ["Nuxt server routes", "TypeScript", "Firebase"];
</script>

<template>
  <section
    class="grid items-start gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-16"
  >
    <div class="flex flex-col gap-5">
      <p class="text-body leading-body text-neutral-300 text-pretty">
        I studied three years at Monash University South Africa and graduated
        with distinction — a bachelor's in computer and information sciences,
        specialising in application development, from 2020 to 2022.
      </p>
      <p class="text-body leading-body text-neutral-400 text-pretty">
        I'm based in Roodepoort, Gauteng, South Africa, and I've been
        freelancing since December 2024. My work so far has been front to back
        on small business sites: an ecommerce store with a CMS for a
        photographer, and a marketing site for a deep cleaning company. I'm
        motivated by helping clients reach their desired website — built and
        functional.
      </p>
      <p class="text-body leading-body text-neutral-400 text-pretty">
        I take both freelance projects and full-time roles. If you have
        something in mind, tell me what it needs to do and I'll tell you
        honestly how I'd build it.
      </p>
      <div class="mt-2 flex flex-wrap gap-3">
        <AppButton to="/portfolio">See the work</AppButton>
        <AppButton to="/contact" variant="quiet">Get in touch</AppButton>
      </div>
    </div>

    <aside class="flex flex-col gap-3.5">
      <AboutFactCard
        kicker="Education"
        title="BSc Computer & Information Sciences"
        meta="Monash University South Africa · 2020–2022 · Graduated with distinction · Application development"
      />
      <AboutFactCard
        kicker="Based in"
        title="Roodepoort, Gauteng"
        meta="South Africa · Working with clients remotely"
      />
      <AboutFactCard kicker="Currently learning" title="Deepening the Nuxt stack">
        <ul class="mt-2 flex list-none flex-wrap gap-1.5 p-0">
          <li v-for="topic in learning" :key="topic">
            <AppTag variant="outline">{{ topic }}</AppTag>
          </li>
        </ul>
      </AboutFactCard>
    </aside>
  </section>
</template>
