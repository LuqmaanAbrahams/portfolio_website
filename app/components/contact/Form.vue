<script setup lang="ts">
/**
 * There is no backend yet, so submitting hands the message to the visitor's
 * own mail client with the fields already filled in. That keeps the form
 * honest — nothing is silently dropped — and swapping in a real endpoint
 * later only means replacing `onSubmit`.
 */
const name = ref("");
const email = ref("");
const brief = ref("");
const handedOff = ref(false);

const onSubmit = () => {
  const body = [
    `Name: ${name.value}`,
    `Email: ${email.value}`,
    "",
    brief.value,
  ].join("\n");

  handedOff.value = true;
  window.location.href = `mailto:Luqmaan78600@gmail.com?subject=${encodeURIComponent(
    `Website enquiry from ${name.value || "your site"}`
  )}&body=${encodeURIComponent(body)}`;
};
</script>

<template>
  <form
    class="flex flex-col gap-4 rounded-md bg-surface p-7 shadow-md"
    @submit.prevent="onSubmit"
  >
    <div>
      <label class="block text-kicker text-text/70" for="contact-name">
        Your name
      </label>
      <input
        id="contact-name"
        v-model="name"
        class="field mt-1.5"
        type="text"
        name="name"
        placeholder="Name"
        autocomplete="name"
        required
      >
    </div>

    <div>
      <label class="block text-kicker text-text/70" for="contact-email">
        Email
      </label>
      <input
        id="contact-email"
        v-model="email"
        class="field mt-1.5"
        type="email"
        name="email"
        placeholder="you@company.com"
        autocomplete="email"
        required
      >
    </div>

    <div>
      <label class="block text-kicker text-text/70" for="contact-brief">
        What do you need built?
      </label>
      <textarea
        id="contact-brief"
        v-model="brief"
        class="field mt-1.5 min-h-[90px] resize-y"
        name="brief"
        rows="5"
        placeholder="A short description of the site and what it should do."
        required
      />
    </div>

    <div class="flex flex-wrap items-center gap-3.5">
      <AppButton type="submit">Send message</AppButton>
      <!-- The live region stays mounted so the message is announced when it
           arrives; a region inserted alongside its own text often isn't. -->
      <p class="text-meta text-accent-purple-300" role="status">
        {{ handedOff ? "Opening your mail app — send it and I'll be in touch." : "" }}
      </p>
    </div>
  </form>
</template>

<style scoped>
/* Placeholder colour and the caret can't be reached from the template, so the
   whole input skin lives here. Scoped to a class, never to `input`, so it
   can't outrank the utilities on these same elements. */
.field {
  width: 100%;
  min-height: 36px;
  padding: 6px 10px;
  font: inherit;
  font-size: var(--text-button);
  color: var(--color-text);
  caret-color: var(--color-blurple);
  background: var(--color-ground);
  border: 1px solid color-mix(in srgb, var(--color-text) 16%, transparent);
  border-radius: var(--radius-md);
  transition: border-color 0.2s var(--ease-entrance);
}

.field::placeholder {
  color: var(--color-neutral-600);
}

.field:hover {
  border-color: color-mix(in srgb, var(--color-text) 45%, transparent);
}

.field:focus-visible {
  border-color: var(--color-blurple);
  outline-offset: 0;
}
</style>
