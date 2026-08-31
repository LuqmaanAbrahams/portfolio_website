import { afterEach, describe, expect, it, vi } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import ContactForm from "~/components/contact/Form.vue";

/**
 * The form has no backend — submitting hands the message to the visitor's
 * mail client. That handoff is the only real logic on the page, so it is
 * what these cover.
 */
const stubNavigation = () => {
  const assigned: string[] = [];
  const original = Object.getOwnPropertyDescriptor(window, "location");

  Object.defineProperty(window, "location", {
    configurable: true,
    value: {
      ...window.location,
      set href(value: string) {
        assigned.push(value);
      },
      get href() {
        return assigned.at(-1) ?? "";
      },
    },
  });

  return { assigned, restore: () => original && Object.defineProperty(window, "location", original) };
};

describe("contact form", () => {
  let restore: (() => void) | undefined;

  afterEach(() => {
    restore?.();
    vi.restoreAllMocks();
  });

  const fillAndSubmit = async () => {
    const nav = stubNavigation();
    restore = nav.restore;

    const form = await mountSuspended(ContactForm);
    await form.find("#contact-name").setValue("Jordan");
    await form.find("#contact-email").setValue("jordan@example.com");
    await form.find("#contact-brief").setValue("A booking site for a studio.");
    await form.find("form").trigger("submit");

    return { form, assigned: nav.assigned };
  };

  it("hands the message to the mail client with every field", async () => {
    const { assigned } = await fillAndSubmit();

    expect(assigned).toHaveLength(1);
    const url = assigned[0]!;
    expect(url.startsWith("mailto:Luqmaan78600@gmail.com?")).toBe(true);

    const body = decodeURIComponent(
      new URL(url).search.match(/body=([^&]*)/)?.[1] ?? ""
    );
    expect(body).toContain("Jordan");
    expect(body).toContain("jordan@example.com");
    expect(body).toContain("A booking site for a studio.");
  });

  it("escapes field values into the URL rather than injecting them raw", async () => {
    const nav = stubNavigation();
    restore = nav.restore;

    const form = await mountSuspended(ContactForm);
    await form.find("#contact-name").setValue("A & B <script>");
    await form.find("#contact-brief").setValue("Needs #anchors and ?queries");
    await form.find("form").trigger("submit");

    const url = nav.assigned[0]!;
    // Raw &, # or ? in the body would truncate or corrupt the mailto.
    const body = url.split("&body=")[1] ?? "";
    expect(body).not.toMatch(/[<>#?&]/);
    expect(decodeURIComponent(body)).toContain("Needs #anchors and ?queries");
  });

  it("keeps the status region mounted so it is announced", async () => {
    const form = await mountSuspended(ContactForm);

    // A live region inserted at the same moment as its text is frequently
    // missed by screen readers, so it has to exist before submit.
    const status = form.find('[role="status"]');
    expect(status.exists()).toBe(true);
    expect(status.text()).toBe("");
  });

  it("reports the handoff after submitting", async () => {
    const { form } = await fillAndSubmit();

    expect(form.find('[role="status"]').text()).toMatch(/mail app/i);
  });

  it("labels every input", async () => {
    const form = await mountSuspended(ContactForm);

    for (const field of form.findAll("input, textarea")) {
      const id = field.attributes("id");
      expect(id, "every field needs an id to be labelled").toBeTruthy();
      expect(form.find(`label[for="${id}"]`).exists()).toBe(true);
    }
  });
});
