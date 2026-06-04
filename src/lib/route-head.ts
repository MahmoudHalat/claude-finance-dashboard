export const SITE_URL = "https://claude-finance-dashboard.choyin.workers.dev";
export const SITE_NAME = "Finance Dashboard";
export const TWITTER = "@mahmoudhalat";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.png`;

function buildAbsoluteUrl(path: string) {
  let p = path.startsWith("/") ? path : `/${path}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return `${SITE_URL}${p}`;
}

function resolveImageUrl(image: string) {
  return image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

export function buildRouteHead(opts: {
  title: string;
  description: string;
  path: string;
  type?: string;
  image?: string;
  keywords?: string;
  author?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: Array<Record<string, unknown>>;
}) {
  const fullTitle = opts.title.includes(SITE_NAME)
    ? opts.title
    : `${opts.title} | ${SITE_NAME}`;
  const canonicalUrl = buildAbsoluteUrl(opts.path);
  const absoluteImage = resolveImageUrl(opts.image ?? DEFAULT_OG_IMAGE);
  const author = opts.author ?? "Mahmoud Halat";
  // Social cards can carry a punchier hook than the SEO <title>/description.
  const ogTitle = opts.ogTitle ?? fullTitle;
  const ogDescription = opts.ogDescription ?? opts.description;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: opts.description },
      {
        name: "keywords",
        content:
          opts.keywords ??
          "personal finance dashboard, bank statement analysis, Claude Code, AI finance tool, offline finance tracker",
      },
      { name: "author", content: author },
      {
        name: "robots",
        content: opts.noindex
          ? "noindex, nofollow"
          : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      { property: "og:type", content: opts.type ?? "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: absoluteImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: absoluteImage },
      { name: "twitter:creator", content: TWITTER },
      { name: "twitter:site", content: TWITTER },
    ],
    // NOTE: canonical link is emitted once from the root shell (CanonicalLink
    // component) to avoid TanStack Router concatenating duplicate link tags on
    // nested routes.
    links: [],
    scripts: (opts.jsonLd ?? []).map((entry) => ({
      type: "application/ld+json",
      children: JSON.stringify(entry),
    })),
  };
}
