// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/test-utils",
    "@nuxt/hints",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/a11y",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});
