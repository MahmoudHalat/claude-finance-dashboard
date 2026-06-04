import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/route-head";

function NotFoundComponent() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "480px" }}>
        <div
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            color: "var(--faint)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          404
        </div>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "var(--txt)",
            marginBottom: "0.75rem",
            fontFamily: "IBM Plex Mono, monospace",
          }}
        >
          Page not found
        </h1>
        <p style={{ color: "var(--dim)", marginBottom: "1.5rem" }}>
          This URL doesn't exist. Head back home.
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            border: "1px solid var(--green)",
            padding: "0.5rem 1.25rem",
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--green)",
            textDecoration: "none",
          }}
        >
          Return home
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "theme-color", content: "#07080a" },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1",
      },
      // AI bot allowlist
      { name: "GPTBot", content: "index, follow" },
      { name: "ChatGPT-User", content: "index, follow" },
      { name: "PerplexityBot", content: "index, follow" },
      { name: "ClaudeBot", content: "index, follow" },
      { name: "Google-Extended", content: "index, follow" },
      {
        title: "Finance Dashboard — AI-Built Personal Finance Tool",
      },
      {
        name: "description",
        content:
          "A free, offline personal finance dashboard built with Claude Code. Paste your bank and credit card CSV exports and get an interactive intelligence report — nothing leaves your machine.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "llms", href: "/llms.txt", type: "text/plain" },
      { rel: "sitemap", href: "/sitemap.xml", type: "application/xml" },
      { rel: "describedby", href: "/robots.txt", type: "text/plain" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function CanonicalLink() {
  const { pathname } = useLocation();
  const raw = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const path = raw.length > 1 && raw.endsWith("/") ? raw.slice(0, -1) : raw;
  const href = `${SITE_URL}${path}`;
  return (
    <>
      <link rel="canonical" href={href} />
      <link rel="alternate" hrefLang="en" href={href} />
      <link rel="alternate" hrefLang="x-default" href={href} />
    </>
  );
}

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        <CanonicalLink />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <SiteHeader />
      <main style={{ flex: "1 1 auto" }}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
