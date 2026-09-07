// @vitest-environment node
// Reads source files and touches no DOM, so it opts out of the Nuxt
// environment — under which `import.meta.url` is an http URL, not a file one.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

/**
 * Regression guard for a bug that shipped twice.
 *
 * The entrance animations use `both` fill and are staggered with
 * `[animation-delay:…]` at the call site. Collapsing only the duration under
 * `prefers-reduced-motion` leaves the delays intact, and backwards fill then
 * holds each element at its `from` frame — `opacity: 0` — for the whole
 * delay. The result is the hero sitting blank and popping in line by line
 * over ~1.1s: the animation the setting asked us to skip, minus the motion.
 *
 * The delay has to be zeroed alongside the duration.
 */
const css = source("app/assets/css/main.css");

const reducedMotionBlock = css.slice(
  css.indexOf("@media (prefers-reduced-motion: reduce)")
);

describe("reduced motion", () => {
  it("has a reduced-motion block at all", () => {
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
  });

  it("zeroes animation delay, not just duration", () => {
    expect(reducedMotionBlock).toMatch(/animation-duration:\s*[^;]+!important/);
    expect(reducedMotionBlock).toMatch(/animation-delay:\s*-?[^;]+!important/);
  });

  it("zeroes transition delay too", () => {
    expect(reducedMotionBlock).toMatch(/transition-duration:\s*[^;]+!important/);
    expect(reducedMotionBlock).toMatch(/transition-delay:\s*[^;]+!important/);
  });

  it("starts animations already finished rather than merely fast", () => {
    // A positive delay would still hold the `from` frame; only a negative
    // one seeks past the animation.
    const delay = reducedMotionBlock.match(/animation-delay:\s*(-?[\d.]+)/)?.[1];
    expect(delay).toBeDefined();
    expect(Number(delay)).toBeLessThanOrEqual(0);
  });

  it("still declares the staggers the block has to defeat", () => {
    // If these ever leave the templates the guard above stops meaning
    // anything, so assert the hazard still exists.
    const hero = source("app/components/home/Hero.vue");
    expect(hero).toMatch(/\[animation-delay:/);
  });
});
