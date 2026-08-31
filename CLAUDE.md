# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

```bash
pnpm install       # postinstall runs `nuxt prepare`, generating .nuxt/
pnpm dev           # dev server on http://localhost:3000
pnpm build         # production build
pnpm generate      # static site generation
pnpm preview       # serve the production build locally
```

**Lint:** no `lint` script is defined. `@nuxt/eslint` is installed and `eslint.config.mjs` re-exports the generated `./.nuxt/eslint.config.mjs`, so linting requires `.nuxt/` to exist — run `pnpm exec nuxt prepare` first if it's missing, then `pnpm exec eslint .`.

**Tests:** `@nuxt/test-utils` is installed but there is no test script, no test runner configured, and no test files yet. Adding tests means wiring up Vitest first.

## Architecture

Nuxt 4 SPA/SSR site. Application source lives under `app/` (Nuxt 4's default `srcDir`), not at the repo root.

- `app/app.vue` — root shell. Holds the global chrome: background/text color classes, `<NavBar />`, and `<NuxtPage />`. Site-wide layout belongs here, not in individual pages.
- `app/pages/` — file-based routing. Filenames map directly to URLs and **route paths are case-sensitive**, so `pages/about.vue` serves `/about` and will not match a link to `/About`.
- `app/components/` — auto-imported. Components are used in templates without an `import` statement. Shared primitives sit at the top level (`AppButton`, `AppTag`, `SectionKicker`, `PageHeader`, `StatItem`, `ProjectCard`, `AmbientGlow`, `SiteFooter`); page-specific sections live in a subfolder that becomes their prefix, so `components/home/Hero.vue` is used as `<HomeHero />`. A page file should read as a list of its sections.
- `app/composables/` — auto-imported too. `useProjects()` is the single source for the portfolio list, so every surface that shows a project stays in sync. The home page's "Selected work" strip consumes it today; the portfolio page is still a bare heading.

### Styling: Tailwind v4 with no config file

Tailwind comes in through `@nuxt/ui` and is configured **entirely in CSS** — there is deliberately no `tailwind.config.js` (an earlier one was removed). The single source of truth is `app/assets/css/main.css`, registered via the `css` array in `nuxt.config.ts`.

That file's `@theme` block defines design tokens, and **Tailwind v4 generates utilities from them automatically**. This is the main thing to understand before touching styles:

| Token in `@theme`   | Generated utility              |
| ------------------- | ------------------------------ |
| `--color-ground`    | `bg-ground`, `text-ground`     |
| `--text-nav`        | `text-nav` (custom type scale) |
| `--font-body`       | `font-body`                    |
| `--font-weight-400` | `font-400`                     |
| `--container-page`  | `max-w-page` (the 1100px page gutter) |
| `--radius-md`       | `rounded-md`                   |
| `--shadow-md`       | `shadow-md`                    |
| `--tracking-hero`   | `tracking-hero`                |
| `--animate-rise`    | `animate-rise`                 |
| `--ease-entrance`   | `ease-entrance`                |

So new colors, font sizes, or weights are added by declaring a token in `main.css` — never by writing arbitrary values everywhere. The tokens are grouped in that file under **surfaces & brand** (`ground`/`surface`/`text`/`blurple`, the indigo band, and the neutral / accent-purple / muted-violet ramps), **layout** (`--container-page` plus the radius scale), **elevation** (hairline-plus-ambient shadows tuned for a dark ground), **typography** (a semantic scale — `--text-hero`, `--text-page-heading`, `--text-section-heading`, `--text-card-title`, `--text-body`, `--text-kicker`, `--text-nav`, … — where the three headline sizes are `clamp()`ed so they stay fluid without breakpoint overrides), and **motion** (`--ease-entrance`, the `rise`/`wipe`/`sweep` entrance animations and the `drift-*` ambient ones, whose `@keyframes` live inside the same `@theme` block).

Stagger an entrance animation with an `[animation-delay:…]` utility at the call site — Tailwind has no animation-delay scale. Everything is switched off under `prefers-reduced-motion: reduce` by a rule at the bottom of `main.css`.

Note the custom `--font-weight-*` tokens produce `font-400`/`font-500`, which sit alongside Tailwind's built-in `font-bold` etc. Prefer the tokens for consistency.

### Fonts

`@nuxt/fonts` is enabled and resolves web fonts automatically from `font-family` declarations. Changing a `--font-*` token in `main.css` is sufficient — no `<link>` tags, no manual font loading.

### Scoped styles and the cascade

Tailwind utilities live in `@layer utilities`, but a component's `<style scoped>` block is _unlayered_, and unlayered CSS always beats layered CSS regardless of specificity. A broad element selector in a scoped block (e.g. `li { padding: … }`) will therefore silently override every `p-*` utility on that element. Prefer utilities in the template; keep scoped blocks to rules that cannot be expressed as utilities, and scope those to a class rather than an element.

The same ordering trap applies between utilities. Two utilities for one property — `border-transparent` in a component's base class and `border-blurple` in its variant class — have equal specificity, so the winner is whichever Tailwind happens to emit later, not the one written last in the template. Give each variant its own value for the property instead of overriding a shared default (see `AppButton.vue`).

## Git

This will explain the conventions of commit,pr,push messages and anything requiring a discription.
`git commit -m ` messages must refrain from adding `authoured by claude` or the like to the messages. this also goes for PR reviews and merges

When doing PR reviews please attach the review findingss to the respective PR as a comment
