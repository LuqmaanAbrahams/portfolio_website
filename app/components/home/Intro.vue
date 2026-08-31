<script setup lang="ts">
/** Grouped by how current each one is: filled accent = everyday, filled
 *  neutral = used in the build, outline = studied but not recent. */
const skills = [
  { label: "HTML / CSS", variant: "accent" },
  { label: "Vue.js", variant: "accent" },
  { label: "Nuxt.js", variant: "accent" },
  { label: "Node.js", variant: "accent" },
  { label: "TypeScript", variant: "neutral" },
  { label: "Firebase", variant: "neutral" },
  { label: "C#", variant: "outline" },
  { label: "Java", variant: "outline" },
] as const;
</script>

<template>
  <section class="mx-auto max-w-page px-6 pt-14 pb-20 md:px-10 md:pb-24">
    <div
      class="grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-14"
    >
      <div>
        <h2 class="font-display text-subsection-heading tracking-heading">
          Hello — I'm Luqmaan
        </h2>
        <p class="mt-4 text-body leading-body text-neutral-400 text-pretty">
          I studied for three years at Monash University South Africa and
          graduated with distinction, a bachelor's in computer and information
          sciences specialising in application development. I've been
          freelancing since December 2024, and what I enjoy most is getting a
          client to the website they pictured — built, working, and easy for
          them to run.
        </p>
        <AppButton to="/about" class="mt-5">More about me</AppButton>
      </div>

      <div>
        <p class="text-kicker tracking-kicker text-neutral-500 uppercase">
          Working with
        </p>
        <ul class="mt-3.5 flex list-none flex-wrap gap-2 p-0">
          <li v-for="skill in skills" :key="skill.label">
            <AppTag :variant="skill.variant">{{ skill.label }}</AppTag>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
