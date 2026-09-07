import { describe, expect, it } from "vitest";
import { useProjects } from "~/composables/useProjects";

/**
 * useProjects() is the single source for the project list, so a malformed
 * entry breaks both the home strip and the portfolio page at once. These
 * guard the shape rather than the copy — the wording is free to change.
 */
describe("useProjects", () => {
  const projects = useProjects();

  it("returns projects", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("gives every project a unique slug", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it.each(useProjects())("$slug is renderable", (project) => {
    for (const field of [
      "name",
      "kicker",
      "summary",
      "image",
      "imageAlt",
      "year",
      "description",
    ] as const) {
      expect(project[field], `${project.slug}.${field}`).toBeTruthy();
    }

    expect(project.tags.length).toBeGreaterThan(0);
    expect(project.specs.length).toBeGreaterThan(0);
    expect(project.traits.length).toBeGreaterThan(0);
    expect(["accent", "violet"]).toContain(project.tint);
  });

  it.each(useProjects())("$slug points at a real screenshot", (project) => {
    // Root-relative so it resolves the same from every route. A bare
    // "zafari.png" would break on /portfolio.
    expect(project.image).toMatch(/^\//);
  });

  it.each(useProjects())("$slug alt text is descriptive, not a label", (project) => {
    // The pre-launch alt text was "Zafari Africa — store screenshot", which
    // tells a screen reader nothing about the page. Keep it substantial.
    expect(project.imageAlt.length).toBeGreaterThan(40);
    expect(project.imageAlt).not.toMatch(/^screenshot|placeholder/i);
  });

  it.each(useProjects())("$slug spec rows are complete", (project) => {
    for (const spec of project.specs) {
      expect(spec.label).toBeTruthy();
      expect(spec.value).toBeTruthy();
    }
  });
});
