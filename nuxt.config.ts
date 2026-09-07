// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  // GitHub Pages serves this as a project site at /portfolio_website/.
  // Set back to "/" if a custom domain is ever pointed here.
  app: {
    baseURL: "/portfolio_website/",
    head: { htmlAttrs: { lang: "en-ZA" } },
  },
  // With a baseURL the crawler reaches every page twice, once at "/about" and
  // once at "/portfolio_website/about". Both render the same route and write the
  // same prerender cache file, and on Windows the concurrent rename fails with
  // EPERM. Rendering one route at a time avoids the collision.
  nitro: { prerender: { concurrency: 1 } },
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/devtools",
    "@nuxt/eslint",
    "@nuxt/test-utils",
    "@nuxt/hints",
    "@nuxt/ui",
    "@nuxt/a11y",
    "@nuxt/image",
  ],
});
