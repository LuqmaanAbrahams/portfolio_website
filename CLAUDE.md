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
pnpm lint          # eslint . (pnpm lint:fix to autofix)
pnpm typecheck     # nuxt typecheck, via vue-tsc
```

**Lint and typecheck both need `.nuxt/` to exist** — `eslint.config.mjs` re-exports the generated `./.nuxt/eslint.config.mjs`. `pnpm install` handles this via its `postinstall`; run `pnpm exec nuxt prepare` if the directory is missing.

**`typescript` is a direct devDependency on purpose.** It was previously present only as a transitive dep, unhoisted, so `@nuxt/eslint-config` could not resolve it and silently skipped its TypeScript parser — every `<script setup lang="ts">` block failed with `Parsing error` and was effectively unlinted. Keep it pinned to the 5.x line: `typescript-eslint` does not support TS 7 yet, and installing it breaks `pnpm lint` outright.

**Tests:** Vitest, via `pnpm test` (`pnpm test:watch` to iterate). Specs live in `test/*.spec.ts`.

`vitest.config.ts` sets `environment: "nuxt"` for the whole suite, because the components under test rely on Nuxt auto-imports and globally-registered components (`<AppTag>` inside `<ProjectCard>`, `NuxtLink` inside `AppButton`). Mount with `mountSuspended` from `@nuxt/test-utils/runtime`, not `@vue/test-utils`'s `mount`.

Two traps that environment brings:

- `import.meta.url` is an **http** URL, not a `file://` one, so `fileURLToPath` throws. A spec that only reads source files should opt out with a `// @vitest-environment node` docblock and resolve paths from `process.cwd()` — see `test/reducedMotion.spec.ts`.
- Asserting on raw `wrapper.html()` for a class name matches substrings across unrelated utilities: `order-` is inside `border-`. Tokenise the class attributes instead.

## Architecture

Nuxt 4 SPA/SSR site. Application source lives under `app/` (Nuxt 4's default `srcDir`), not at the repo root.

- `app/app.vue` — root shell. Holds the global chrome: background/text color classes, `<NavBar />`, and `<NuxtPage />`. Site-wide layout belongs here, not in individual pages.
- `app/pages/` — file-based routing. Filenames map directly to URLs and **route paths are case-sensitive**, so `pages/about.vue` serves `/about` and will not match a link to `/About`.
- `app/components/` — auto-imported. Components are used in templates without an `import` statement. Shared primitives sit at the top level (`AppButton`, `AppTag`, `SectionKicker`, `PageHeader`, `StatItem`, `ProjectCard`, `AmbientGlow`, `SiteFooter`); page-specific sections live in a subfolder that becomes their prefix, so `components/home/Hero.vue` is used as `<HomeHero />`. A page file should read as a list of its sections.
- `app/composables/` — auto-imported too. `useProjects()` is the single source for the portfolio list, so every surface that shows a project stays in sync. Both the home page's "Selected work" strip and the portfolio page consume it — the strip uses the summary fields, the portfolio page adds the detail ones (`year`, `description`, `specs`, `traits`).

### Styling: Tailwind v4 with no config file

Tailwind comes in through `@nuxt/ui` and is configured **entirely in CSS** — there is deliberately no `tailwind.config.js` (an earlier one was removed). The single source of truth is `app/assets/css/main.css`, registered via the `css` array in `nuxt.config.ts`.

**Keep `@nuxt/ui` in `modules` even though nothing renders a `<U…>` component.** `main.css` opens with `@import "@nuxt/ui"`, and that import is how Tailwind enters the build — dropping the module costs every utility class on the site, not just the components. (`@nuxt/content` and `@nuxt/icon` were genuinely unused and have been removed.)

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

## Deployment (GitHub Pages)

The site is a GitHub Pages **project** site, served from `/portfolio_website/`, not a domain root. Three things follow from that:

- **`app.baseURL: "/portfolio_website/"`** in `nuxt.config.ts`. Nuxt rewrites router links and image URLs from this one value. Without it the generated HTML asks for `/_nuxt/…`, one directory above where the files land. Set it back to `"/"` if a custom domain is ever pointed here. It also means `pnpm preview` serves at `localhost:3000/portfolio_website/`, not the root.
- **`public/.nojekyll`** (empty). Pages runs Jekyll by default, and Jekyll skips every directory starting with an underscore — which is `_nuxt/`, `_ipx/`, `_fonts/` and `_payload.json`, i.e. essentially the whole site. The HTML still loads, so the symptom is unstyled text rather than an obvious 404.
- **`nitro.prerender.concurrency: 1`.** With a `baseURL` the crawler reaches every page twice, at `/about` and at `/portfolio_website/about`. Both render the same route and write the same prerender cache file; on Windows the concurrent rename fails with `EPERM` and the build aborts. Serialising costs nothing measurable here.

Deploy `.output/public` as-is — Nitro strips the `baseURL` prefix when writing files, so the output stays flat.

### SEO and images

`usePageSeo()` (in `app/composables/`) is what pages call, not `useSeoMeta()` directly. It sets title/description plus the Open Graph and Twitter equivalents, so a shared link renders as a card. `og:image` and `og:url` must be **absolute** — scrapers ignore relative paths — so the composable holds the deployed origin as a constant.

`<NuxtImg>` needs `format="webp"` **on the tag**. The `image: { format: [...] }` config key only orders `<source>` types for `<NuxtPicture>` and is a no-op for `<NuxtImg>`; the project screenshots are photographic, and PNG at eight widths each was 4.6 MB of a 7.3 MB build against 332 KB as WebP.

## Git

This will explain the conventions of commit,pr,push messages and anything requiring a discription.
`git commit -m ` messages must refrain from adding `authoured by claude` or the like to the messages. this also goes for PR reviews and merges

When doing PR reviews please attach the review findingss to the respective PR as a comment
