export interface ProjectSpec {
  /** Row label, e.g. "Frontend". */
  label: string;
  value: string;
}

export interface ProjectLink {
  /** Absolute URL — the live site for client work, the repo for the rest. */
  href: string;
  /** Button copy, e.g. "Visit site" or "View on GitHub". */
  label: string;
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
  /** Where to send a reader who wants more: the deployed site where one
   *  exists, otherwise the source. Opens in a new tab. */
  link?: ProjectLink;

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
    link: { href: "https://zafariafrica.co.za/", label: "Visit site" },
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
    link: { href: "https://ventrox.co.za/", label: "Visit site" },
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
  {
    slug: "sunshine-sparkle",
    name: "Sunshine Sparkle",
    kicker: "Marketing site",
    summary:
      "A marketing website for a fictional solar panel cleaning company, built early on with plain HTML, CSS and JavaScript on top of Bootstrap.",
    tags: ["HTML / CSS", "JavaScript", "Bootstrap"],
    image: "/sunSparkleScreenShot.png",
    imageAlt:
      "The Sunshine Sparkle homepage: a \"Solar panel cleaning\" headline over a photo of a technician washing a solar array, a green Contact Us And Get A Quote button, and an About Us section beside a line illustration of panels and a sun.",
    tint: "accent",
    link: { href: "https://github.com/LuqmaanAbrahams/Sunshine_Site", label: "View on GitHub" },
    year: "2023",
    description:
      "One of my earliest builds: a multi-section marketing site for Sunshine Sparkle, a fictional solar panel cleaning company. Static HTML and CSS with vanilla JavaScript, laid out on Bootstrap's grid and components — no framework, no build step.",
    specs: [
      { label: "Frontend", value: "HTML / CSS, JavaScript" },
      { label: "Styling", value: "Bootstrap" },
    ],
    traits: ["Static site", "Early work", "Fictional brand"],
  },
  {
    slug: "weathersense",
    name: "WeatherSense",
    kicker: "Weather app · API",
    summary:
      "A small weather app that looks up the current conditions for any city, with a Node backend proxying the weather API so the key stays off the client.",
    tags: ["HTML / CSS", "JavaScript", "Express"],
    image: "/weatherSenseScreenshot.png",
    imageAlt:
      "The WeatherSense search screen: a WeatherSense banner, an Enter a City Name field and a Search button centred over a photo of a mountain peak rising above a sea of cloud.",
    tint: "violet",
    link: { href: "https://github.com/LuqmaanAbrahams/Weather_App", label: "View on GitHub" },
    year: "2023",
    description:
      "An early full-stack exercise: a city weather lookup with a plain HTML, CSS and JavaScript frontend and a small Express server behind it. The server makes the weather API calls, with dotenv keeping the API key in environment variables and cors letting the frontend talk to it.",
    specs: [
      { label: "Frontend", value: "HTML / CSS, JavaScript" },
      { label: "Backend", value: "Node.js, Express, cors" },
      { label: "Config", value: "dotenv for API keys" },
    ],
    traits: ["Full-stack", "Third-party API", "Early work"],
  },
];
