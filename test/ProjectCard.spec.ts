import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ProjectCard from "~/components/ProjectCard.vue";
import ProjectFeature from "~/components/portfolio/ProjectFeature.vue";
import { useProjects } from "~/composables/useProjects";

const [zafari, ventrox] = useProjects();

/**
 * Every class token on the wrapper and its descendants. Matching against the
 * raw HTML instead would be wrong: "order-" is a substring of "border-".
 */
const classTokens = (wrapper: { attributes: (k: string) => string | undefined; findAll: (s: string) => Array<{ attributes: (k: string) => string | undefined }> }) =>
  (wrapper.attributes("class") ?? "")
    .split(/\s+/)
    .concat(
      wrapper
        .findAll("[class]")
        .flatMap((el) => (el.attributes("class") ?? "").split(/\s+/))
    )
    .filter(Boolean);

describe("ProjectCard", () => {
  it("renders the screenshot with its alt text", async () => {
    const card = await mountSuspended(ProjectCard, {
      props: { project: zafari! },
    });

    const img = card.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("alt")).toBe(zafari!.imageAlt);
  });

  it("never renders alt text as visible copy", async () => {
    const card = await mountSuspended(ProjectCard, {
      props: { project: zafari! },
    });

    // The placeholder branch used to print imageAlt into the card body, so
    // visitors read "Zafari Africa — store screenshot" as a caption.
    expect(card.text()).not.toContain(zafari!.imageAlt);
    expect(card.text()).not.toMatch(/coming soon/i);
  });

  it("shows the summary, kicker and every tag", async () => {
    const card = await mountSuspended(ProjectCard, {
      props: { project: zafari! },
    });

    expect(card.text()).toContain(zafari!.name);
    expect(card.text()).toContain(zafari!.kicker);
    expect(card.text()).toContain(zafari!.summary);
    for (const tag of zafari!.tags) {
      expect(card.text()).toContain(tag);
    }
  });
});

describe("ProjectFeature", () => {
  it("renders the write-up, specs and traits", async () => {
    const feature = await mountSuspended(ProjectFeature, {
      props: { project: zafari! },
    });

    expect(feature.text()).toContain(zafari!.description);
    expect(feature.text()).toContain(zafari!.year);
    for (const spec of zafari!.specs) {
      expect(feature.text()).toContain(spec.label);
      expect(feature.text()).toContain(spec.value);
    }
    for (const trait of zafari!.traits) {
      expect(feature.text()).toContain(trait);
    }
  });

  /**
   * `flipped` is what makes a stack of these alternate. It must reorder only
   * at the md breakpoint — on a narrow screen every row has to stay
   * media-then-copy, or the second project reads out of order.
   */
  it("only reorders at the md breakpoint", async () => {
    const flipped = await mountSuspended(ProjectFeature, {
      props: { project: ventrox!, flipped: true },
    });

    const orderClasses = classTokens(flipped).filter((c) =>
      /(^|:)order-/.test(c)
    );

    expect(orderClasses.length).toBeGreaterThan(0);
    for (const cls of orderClasses) {
      expect(cls).toMatch(/^md:order-/);
    }
  });

  it("does not reorder when not flipped", async () => {
    const plain = await mountSuspended(ProjectFeature, {
      props: { project: zafari!, flipped: false },
    });

    expect(classTokens(plain).filter((c) => /(^|:)order-/.test(c))).toEqual([]);
  });
});
