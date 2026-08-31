import { describe, expect, it } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import AppButton from "~/components/AppButton.vue";

describe("AppButton", () => {
  it("renders a link for `to`", async () => {
    const button = await mountSuspended(AppButton, {
      props: { to: "/portfolio" },
      slots: { default: () => "See the work" },
    });

    const anchor = button.find("a");
    expect(anchor.exists()).toBe(true);
    expect(anchor.attributes("href")).toBe("/portfolio");
    expect(button.text()).toBe("See the work");
    expect(button.find("button").exists()).toBe(false);
  });

  it("renders a plain anchor for `href`", async () => {
    const button = await mountSuspended(AppButton, {
      props: { href: "mailto:Luqmaan78600@gmail.com" },
    });

    expect(button.find("a").attributes("href")).toBe(
      "mailto:Luqmaan78600@gmail.com"
    );
  });

  it("renders a button with its type when given neither", async () => {
    const button = await mountSuspended(AppButton, {
      props: { type: "submit" },
    });

    const el = button.find("button");
    expect(el.exists()).toBe(true);
    expect(el.attributes("type")).toBe("submit");
  });

  /**
   * The regression this guards: two border-colour utilities on one element
   * resolve by stylesheet order, not template order, so a shared
   * `border-transparent` in the base class would silently erase the outlined
   * variants' borders. Every variant must set its own border colour.
   */
  it.each(["primary", "secondary", "ghost", "quiet"] as const)(
    "%s sets its own border colour",
    async (variant) => {
      const button = await mountSuspended(AppButton, { props: { variant } });
      const classes = button.attributes("class") ?? "";

      const borderColours = classes
        .split(/\s+/)
        .filter((c) => /^border-(?!\d)/.test(c));

      expect(borderColours.length).toBe(1);
    }
  );
});
