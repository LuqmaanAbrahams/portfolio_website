import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import PageHeader from "~/components/PageHeader.vue";

describe("PageHeader", () => {
  it("renders the kicker and heading", async () => {
    const header = await mountSuspended(PageHeader, {
      props: { kicker: "About", heading: "A developer who'd rather your site just worked." },
    });

    expect(header.text()).toContain("About");
    expect(header.find("h1").text()).toBe(
      "A developer who'd rather your site just worked."
    );
  });

  it("omits the lede when there isn't one", async () => {
    const header = await mountSuspended(PageHeader, {
      props: { kicker: "About", heading: "Heading" },
    });

    expect(header.findAll("p")).toHaveLength(1); // the kicker only
  });

  it("renders the lede when given one", async () => {
    const header = await mountSuspended(PageHeader, {
      props: { kicker: "Portfolio", heading: "Heading", lede: "Both are live client work." },
    });

    expect(header.text()).toContain("Both are live client work.");
  });

  /**
   * The measure is an inline style rather than a `max-w-[NNch]` class on
   * purpose: a class built from a prop is never seen by Tailwind's scanner,
   * so the utility would not be generated and the cap would silently vanish.
   */
  it("applies the heading measure as an inline style", async () => {
    const header = await mountSuspended(PageHeader, {
      props: { kicker: "About", heading: "Heading", headingCh: 22 },
    });

    expect(header.find("h1").attributes("style")).toContain("max-width: 22ch");
  });

  it("defaults the measure to 20ch", async () => {
    const header = await mountSuspended(PageHeader, {
      props: { kicker: "Contact", heading: "Heading" },
    });

    expect(header.find("h1").attributes("style")).toContain("max-width: 20ch");
  });

  it("has exactly one h1", async () => {
    const header = await mountSuspended(PageHeader, {
      props: { kicker: "About", heading: "Heading" },
    });

    expect(header.findAll("h1")).toHaveLength(1);
  });
});
