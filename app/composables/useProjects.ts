export interface ProjectSpec {
  /** Row label, e.g. "Frontend". */
  label: string;
  value: string;
}

export interface Project {
  /** Stable key, and the slug a future case-study route would use. */
  slug: string;
  name: string;
  /** Short classification line, e.g. "Ecommerce · CMS". */
  kicker: string;
  summary: string;
  tags: string[];
  /** Screenshot path under /public. Required: every project on the site
   *  shows its media panel, so a project without one would render an empty
   *  block rather than degrade gracefully. */
  image: string;
  /** Alt text for `image`, describing what the screenshot actually shows.
   *  Never rendered as visible copy. */
  imageAlt: string;
  /** Which accent ramp tints the project's media panel. */
  tint: "accent" | "violet";

  /* ── Portfolio-page detail. The home strip shows none of this. ────── */
  /** Year shipped, appended to `kicker` on the portfolio page. */
  year: string;
  /** Longer write-up, in place of `summary` where there is room for it. */
  description: string;
  /** The build, as label/value rows. */
  specs: ProjectSpec[];
  /** What the project *is*, as opposed to `tags`, which is what it's built
   *  with. Rendered as filled pills next to the write-up. */
  traits: string[];
}

/**
 * The portfolio, in display order — the single source for the project list, so
 * every surface that shows it stays in sync. The home page's "Selected work"
 * strip uses the summary fields; the portfolio page adds the detail ones.
 */
export const useProjects = (): Project[] => [
  {
    slug: "zafari-africa",
    name: "Zafari Africa",
    kicker: "Ecommerce · CMS",
    summary:
      "A photography ecommerce site with a CMS behind it, so the shop's imagery and listings stay in the owner's hands.",
    tags: ["Nuxt.js", "Vue.js", "TypeScript", "Firebase"],
    image: "/zafariScreenShot.png",
    imageAlt:
      "The Zafari Africa storefront: a \"Premium African Wildlife Prints\" hero over a photo of a rolled print, with a Browse Collection button and cards for sizing, print quality and shipping.",
    tint: "accent",
    year: "2025",
    description:
      "A photography ecommerce website with a CMS. The frontend is Vue with Nuxt modules; the backend is TypeScript on Nuxt, with Firebase for database storage and backend hosting.",
    specs: [
      { label: "Frontend", value: "HTML / CSS, Vue.js, Nuxt.js modules" },
      { label: "Backend", value: "TypeScript, Nuxt.js" },
      { label: "Data / host", value: "Firebase storage & hosting" },
    ],
    traits: ["Storefront", "CMS", "Image-heavy"],
  },
  {
    slug: "ventrox",
    name: "Ventrox",
    kicker: "Marketing site",
    summary:
      "A marketing website for a deep cleaning business specialising in surface disinfection and odour removal and control.",
    tags: ["Nuxt.js", "Vue.js", "TypeScript", "Firebase"],
    image: "/ventroxScreenShot.png",
    imageAlt:
      "The Ventrox homepage: the headline \"Hygiene engineered at the molecular source\" above a summary of its chlorine dioxide services, with Get in touch and Explore services buttons.",
    tint: "violet",
    year: "2025",
    description:
      "A business marketing website for a deep cleaning company specialising in surface disinfection and odour removal and control. Vue and Nuxt on the frontend, TypeScript and Nuxt on the backend, hosted on Firebase.",
    specs: [
      { label: "Frontend", value: "HTML / CSS, Vue.js, Nuxt.js modules" },
      { label: "Backend", value: "TypeScript, Nuxt.js" },
      { label: "Host", value: "Firebase hosting" },
    ],
    traits: ["Service pages", "Lead capture", "Local business"],
  },
];
