import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";
import llmsTxt from "../public/llms.txt?raw";

// RFC 8288 Link relations advertised on the homepage.
const HOMEPAGE_LINK = [
  '</llms.txt>; rel="llms"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</robots.txt>; rel="describedby"; type="text/plain"',
  '</demo/>; rel="related"; title="Live Demo"',
  '</prompt/>; rel="related"; title="One-shot Prompt"',
].join(", ");

const SECTION_LINK = [
  '</llms.txt>; rel="llms"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(", ");

const startFetch = createStartHandler(defaultStreamHandler);

function linkHeaderFor(pathname: string): string | null {
  if (
    pathname === "/" ||
    pathname === "/index" ||
    pathname === "/index.html"
  ) {
    return HOMEPAGE_LINK;
  }
  if (pathname === "/demo" || pathname === "/demo/" || pathname === "/prompt" || pathname === "/prompt/") {
    return SECTION_LINK;
  }
  return null;
}

function wantsMarkdown(request: Request): boolean {
  const accept = request.headers.get("accept");
  if (!accept) return false;
  return /\btext\/(x-)?markdown\b/i.test(accept);
}

function appendVary(headers: Headers, value: string): void {
  const existing = headers.get("Vary");
  if (!existing) {
    headers.set("Vary", value);
    return;
  }
  const present = existing
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .includes(value.toLowerCase());
  if (!present) headers.set("Vary", `${existing}, ${value}`);
}

export default {
  async fetch(request: Request, ...rest: unknown[]): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const isHomepage =
      pathname === "/" ||
      pathname === "/index" ||
      pathname === "/index.html";

    // Markdown content negotiation: agents that ask for markdown on the
    // homepage get the structured llms.txt overview.
    if (isHomepage && wantsMarkdown(request)) {
      return new Response(llmsTxt, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          Vary: "Accept",
          Link: HOMEPAGE_LINK,
        },
      });
    }

    // Downgrade Accept for non-homepage markdown requests to avoid TanStack
    // Start returning a 500 on unsupported Accept headers.
    let forwarded = request;
    if (!isHomepage && wantsMarkdown(request)) {
      const downgraded = new Headers(request.headers);
      downgraded.set("Accept", "text/html");
      forwarded = new Request(request.url, {
        method: request.method,
        headers: downgraded,
        body: request.body,
        redirect: request.redirect,
      });
    }

    const response = await (startFetch as (
      ...args: [Request, ...unknown[]]
    ) => Promise<Response> | Response)(forwarded, ...rest);

    const linkHeader = linkHeaderFor(pathname);
    const contentType = response.headers.get("Content-Type") ?? "";
    const isHtml = contentType.includes("text/html");
    const downgraded = !isHomepage && wantsMarkdown(request);

    if ((linkHeader && isHtml) || downgraded) {
      const headers = new Headers(response.headers);
      if (linkHeader && isHtml) headers.set("Link", linkHeader);
      if (downgraded || (linkHeader && isHtml)) appendVary(headers, "Accept");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    return response;
  },
};
