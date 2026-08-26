<template>
  <!-- Decorative background bloom for the hero. Sits behind the section's
       content, is clipped by the section's own `overflow-hidden`, and stops
       drifting under `prefers-reduced-motion`. -->
  <div
    class="pointer-events-none absolute -top-[20%] -right-[10%] -left-[25%] h-[130%]"
    aria-hidden="true"
  >
    <span
      class="orb-accent absolute top-[6%] left-[4%] h-[620px] w-[620px] animate-drift-a rounded-full blur-[50px]"
    />
    <span
      class="orb-indigo absolute top-[22%] left-[34%] h-[700px] w-[700px] animate-drift-b rounded-full blur-[60px]"
    />
    <span
      class="orb-violet absolute top-[44%] left-[12%] h-[420px] w-[420px] animate-drift-c rounded-full blur-[70px]"
    />
  </div>
</template>

<style scoped>
/* Radial gradients can't be expressed as utilities without arbitrary values
   that hide the colour tokens, so they live here. Class selectors only —
   an element selector in a scoped block would silently outrank the
   utilities on these same elements. */
.orb-accent {
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-blurple) 42%, transparent),
    transparent 66%
  );
}

.orb-indigo {
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-indigo-band-glow) 60%, transparent),
    transparent 64%
  );
}

.orb-violet {
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--color-accent-muted-violet-700) 55%, transparent),
    transparent 70%
  );
}
</style>
