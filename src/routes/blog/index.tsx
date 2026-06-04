import { createFileRoute, Link } from "@tanstack/react-router";
import { buildRouteHead, SITE_URL } from "@/lib/route-head";
import { breadcrumbSchema } from "@/utils/structuredData";
import { allPosts } from "@/data/posts";

export const Route = createFileRoute("/blog/")({
  head: () =>
    buildRouteHead({
      title: "Guides — Finance Dashboard",
      description:
        "Guides on finding forgotten subscriptions, analyzing your bank statements with AI, and seeing where your money goes — privately, on your own machine.",
      path: "/blog",
      keywords:
        "finance dashboard guides, analyze bank statements, find forgotten subscriptions, private personal finance",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Guides", url: `${SITE_URL}/blog` },
        ]),
      ],
    }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = allPosts();
  return (
    <div className="wrap-narrow">
      <section className="section section--flush">
        <div className="kicker">
          <b>Guides</b> read · learn · build
        </div>
        <h1 className="display" style={{ fontSize: "clamp(30px, 5vw, 46px)" }}>
          Guides.
        </h1>
        <p className="sub" style={{ marginBottom: 30 }}>
          First-hand writing on subscriptions, bank-statement analysis, and keeping your money data
          private — from the person who built the tool.
        </p>
        {posts.length > 0 ? (
          <div className="postgrid">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="postcard"
              >
                <div className="pc-tags">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
                <div className="pc-meta">
                  {p.readingTimeMin} min read · {p.datePublished}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="sub">Guides are on the way.</p>
        )}
      </section>
    </div>
  );
}
