import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { buildRouteHead, SITE_URL } from "@/lib/route-head";
import { blogPostingSchema, breadcrumbSchema, faqSchema } from "@/utils/structuredData";
import { getPostBySlug, relatedPosts } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post, related: relatedPosts(params.slug, 2) };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return buildRouteHead({ title: "Guide — Finance Dashboard", description: "", path: "/blog" });
    }
    return buildRouteHead({
      title: post.metaTitle,
      description: post.metaDescription,
      path: `/blog/${post.slug}`,
      type: "article",
      keywords: post.keywords,
      jsonLd: [
        blogPostingSchema(post),
        breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Guides", url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
        ]),
        ...(post.faq && post.faq.length
          ? [faqSchema(post.faq.map((f) => ({ question: f.q, answer: f.a })))]
          : []),
      ],
    });
  },
  component: PostPage,
});

function PostPage() {
  const { post, related } = Route.useLoaderData();
  return (
    <div className="wrap-narrow" style={{ paddingBottom: 72 }}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/blog">Guides</Link>
      </nav>

      <article>
        <div className="post-tags">
          {post.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <h1 className="post-h1">{post.title}</h1>
        <div className="post-meta">
          By Mahmoud Halat · {post.readingTimeMin} min read · Updated {post.dateModified}
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
      </article>

      <div className="post-cta">
        <h2>Try it on your own statements</h2>
        <p>Free and open-source. Nothing leaves your machine.</p>
        <div className="ctarow">
          <Link to="/demo" className="btn btn-primary">
            ▶ See the live demo
          </Link>
          <Link to="/prompt" className="btn">
            Get the one-shot prompt
          </Link>
        </div>
      </div>

      <div className="post-author">
        <p>
          <strong>Mahmoud Halat</strong> builds AEO-first sites and tools at{" "}
          <a href="https://spaceandstory.co" target="_blank" rel="noopener noreferrer">
            Space &amp; Story
          </a>
          . He built this finance dashboard with Claude Opus 4.8, and also makes{" "}
          <a href="https://givefeedback.dev" target="_blank" rel="noopener noreferrer">
            GiveFeedback
          </a>
          . More at{" "}
          <a href="https://mahmoudhalat.com" target="_blank" rel="noopener noreferrer">
            mahmoudhalat.com
          </a>
          .
        </p>
      </div>

      {related.length > 0 && (
        <div className="post-related">
          <div className="kicker">
            <b>Keep reading</b>
          </div>
          <div className="postgrid">
            {related.map((r) => (
              <Link key={r.slug} to="/blog/$slug" params={{ slug: r.slug }} className="postcard">
                <h2>{r.title}</h2>
                <p>{r.excerpt}</p>
                <div className="pc-meta">{r.readingTimeMin} min read</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
