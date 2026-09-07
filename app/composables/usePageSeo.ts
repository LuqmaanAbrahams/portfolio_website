// Absolute, because Open Graph scrapers ignore relative image and URL paths.
const SITE_URL = "https://luqmaanabrahams.github.io/portfolio_website";
const SOCIAL_IMAGE = `${SITE_URL}/zafariScreenShot.png`;

/**
 * Sets a page's title and description along with the Open Graph and Twitter
 * equivalents, so a shared link renders as a card rather than a bare URL.
 */
export function usePageSeo(options: { title: string; description: string }) {
  const route = useRoute();

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: "website",
    ogSiteName: "Luqmaan Abrahams",
    ogUrl: () => `${SITE_URL}${route.path}`,
    ogImage: SOCIAL_IMAGE,
    twitterCard: "summary_large_image",
    twitterImage: SOCIAL_IMAGE,
  });
}
