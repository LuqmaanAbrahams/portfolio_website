export interface Project {
  /** Stable key, and the slug a future case-study route would use. */
  slug: string;
  name: string;
  /** Short classification line, e.g. "Ecommerce · CMS". */
  kicker: string;
  summary: string;
  tags: string[];
  /** Path under /public once a screenshot exists; the card shows a labelled
   *  placeholder panel until then. */
  image?: string;
  imageAlt: string;
  /** Which accent ramp tints the project's media panel. */
  tint: "accent" | "violet";
}

/**
 * The portfolio, in display order. Shared by the home page's "Selected work"
 * strip and the portfolio page so the two can never drift apart.
 */
export const useProjects = (): Project[] => [
  {
    slug: "zafari-africa",
    name: "Zafari Africa",
    kicker: "Ecommerce · CMS",
    summary:
      "A photography ecommerce site with a CMS behind it, so the shop's imagery and listings stay in the owner's hands.",
    tags: ["Nuxt.js", "Vue.js", "TypeScript", "Firebase"],
    imageAlt: "Zafari Africa — store screenshot",
    tint: "accent",
  },
  {
    slug: "ventrox",
    name: "Ventrox",
    kicker: "Marketing site",
    summary:
      "A marketing website for a deep cleaning business specialising in surface disinfection and odour removal and control.",
    tags: ["Nuxt.js", "Vue.js", "TypeScript", "Firebase"],
    imageAlt: "Ventrox — homepage screenshot",
    tint: "violet",
  },
];
