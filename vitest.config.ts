import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    // The components under test lean on Nuxt auto-imports and global
    // components (<AppTag> inside <ProjectCard>, NuxtLink inside AppButton),
    // so they need the Nuxt environment rather than a bare happy-dom one.
    environment: "nuxt",
    include: ["test/**/*.spec.ts"],
  },
});
