<template>
  <section class="relative overflow-hidden px-6 pt-16 pb-14 md:px-10 md:pt-24 md:pb-22">
    <AmbientGlow />
    <div class="relative mx-auto max-w-page">
      <SectionKicker class="animate-rise">
        Website Developer · Roodepoort, Gauteng
      </SectionKicker>

      <h1
        class="mt-7 font-display font-500 text-hero tracking-hero leading-hero"
      >
        <span class="block animate-rise [animation-delay:80ms]">Luqmaan</span>
        <span class="block animate-rise text-blurple [animation-delay:200ms]">
          Abrahams
        </span>
      </h1>

      <!-- The lede wipes in, with a light sweep passing over it once. -->
      <div class="relative mt-[34px] max-w-[620px] overflow-hidden">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-2/5 animate-sweep bg-linear-to-r from-transparent via-blurple/22 to-transparent [animation-delay:1.1s]"
          aria-hidden="true"
        />
        <p
          class="animate-wipe text-hero-body leading-normal text-neutral-300 text-pretty [animation-delay:500ms]"
        >
          You tell me what your site needs to do. I build it, and I'll say so if
          there's a better way.
        </p>
      </div>

      <div class="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:750ms]">
        <AppButton to="/portfolio">See the work</AppButton>
        <AppButton to="/contact" variant="quiet">Start a project</AppButton>
      </div>
    </div>
  </section>
</template>
