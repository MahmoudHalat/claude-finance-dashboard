import { createFileRoute, Link } from "@tanstack/react-router";
import { buildRouteHead } from "@/lib/route-head";
import { homePageSchemas, howToSchema, faqSchema } from "@/utils/structuredData";
import {
  GITHUB_URL,
  PROPERTIES,
  TICKER,
  QUESTIONS,
  FEATURES,
  FAQS,
} from "@/data/site";
import { allPosts } from "@/data/posts";

export const Route = createFileRoute("/")({
  head: () =>
    buildRouteHead({
      title:
        "Turn your bank statements into a finance dashboard | Finance Dashboard",
      description:
        "Drop your bank exports into Claude Code, paste one prompt, and get a free offline dashboard that finds every subscription and where your money really went.",
      path: "/",
      ogTitle: "Claude Opus 4.8 built me a finance dashboard in almost one shot",
      ogDescription:
        "It started as a hunt for the subscriptions I forgot I was paying for. Now a folder of bank statements becomes one offline dashboard — every subscription, real spending, money-flow, and an audit read. Free & open-source.",
      keywords:
        "finance dashboard from bank statements, personal finance dashboard, bank statement analyzer, Claude Code finance tool, subscription tracker, offline finance dashboard, CSV bank statement analysis",
      jsonLd: [
        ...homePageSchemas,
        howToSchema([
          {
            name: "Export your statements",
            text: "Download CSV or XLS exports from your bank and credit-card portals into one empty folder. No cleanup needed.",
          },
          {
            name: "Paste the prompt into Claude Code",
            text: "Open Claude Code in that folder and paste the one-shot prompt. Claude reads every file and builds a four-stage local pipeline.",
          },
          {
            name: "Open your dashboard",
            text: "Claude produces a single self-contained HTML file. Open it in any browser. It works offline, forever.",
          },
        ]),
        faqSchema(FAQS),
      ],
    }),
  component: HomePage,
});

function HomePage() {
  const posts = allPosts().slice(0, 3);
  return (
    <>
      {/* ── ticker ───────────────────────────────────────── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span className="tick" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── hero ─────────────────────────────────────────── */}
      <section className="wrap hero">
        <div>
          <div className="eyebrow">Free · Open source · Runs on your machine</div>
          <h1 className="display">
            Know exactly where
            <br />
            your <span className="accent">money went.</span>
          </h1>
          <p className="hero-lede">
            Give Claude Code a folder of bank and credit-card exports. It builds
            one offline dashboard that consolidates every account, catches every
            subscription, and surfaces the trends your banking app hides.{" "}
            <b>No spreadsheets. No uploads.</b>
          </p>
          <div className="hero-cta">
            <Link to="/demo" className="btn btn-primary">
              ▶ See the live demo
            </Link>
            <Link to="/prompt" className="btn">
              Get the one-shot prompt
            </Link>
          </div>
          <div className="hero-note">
            Open-source &amp; free.{" "}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              ★ Star it on GitHub
            </a>
          </div>
        </div>

        <div className="framed hero-frame">
          <div className="framed-bar">
            <i />
            <i />
            <i />
            <span className="lbl mono">finance-dashboard · demo (sample data)</span>
            <Link to="/demo" className="lnk">
              open ↗
            </Link>
          </div>
          <img
            src="/screenshots/overview.png"
            alt="Finance Dashboard overview: money in, identified income, total spending and cash flow"
            loading="eager"
            width={1600}
            height={1000}
          />
        </div>
      </section>

      {/* ── origin ───────────────────────────────────────── */}
      <section className="wrap section section--flush">
        <div className="kicker">
          <b>§00</b> Origin
        </div>
        <h2 className="h2">It started with the subscriptions I forgot about.</h2>
        <p className="sub">
          I built this to track down the recurring charges I&rsquo;d stopped
          noticing &mdash; the trials that quietly converted, the apps I no longer
          open, the price creep nobody emails you about. Finding them meant
          parsing years of statements, so it kept growing. Now it separates real
          spending from transfers, maps where the money actually goes, shows
          who&rsquo;s been paying me and when, and flags what an auditor would.
        </p>
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 10,
            marginTop: 24,
            border: "1px solid var(--grid)",
            background: "var(--panel)",
            padding: "11px 16px",
            fontFamily: "var(--mono)",
            fontSize: "12.5px",
            color: "var(--dim)",
            letterSpacing: "0.02em",
          }}
        >
          <span style={{ color: "var(--green)" }}>▸ built by</span>
          Claude&nbsp;Opus&nbsp;4.8
          <span style={{ color: "var(--faint)" }}>·</span>
          1M-token&nbsp;context
          <span style={{ color: "var(--faint)" }}>·</span>
          almost&nbsp;one&nbsp;shot
        </div>
      </section>

      {/* ── questions (AEO) ──────────────────────────────── */}
      <section className="wrap section">
        <div className="kicker">
          <b>§01</b> What it answers
        </div>
        <h2 className="h2">The questions your banking app won&rsquo;t answer.</h2>
        <p className="sub">
          Your statements already hold the answers. They&rsquo;re just buried in
          thousands of rows. The dashboard pulls them out.
        </p>
        <div className="qlist">
          {QUESTIONS.map((item) => (
            <Link to="/demo" className="qrow" key={item.q}>
              <span className="q">{item.q}</span>
              <span className="a">{item.a}</span>
              <span className="qgo">See it →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── how it works ─────────────────────────────────── */}
      <section className="wrap section">
        <div className="kicker">
          <b>§02</b> From a folder to a dashboard
        </div>
        <h2 className="h2">Three steps. One prompt.</h2>
        <div className="pipe">
          <div className="pstep">
            <div className="pn">STEP 01</div>
            <h3>Export your statements</h3>
            <p>
              Download <code>CSV</code> or <code>XLS</code> files from your bank
              and cards into one folder. Don&rsquo;t clean them up.
            </p>
          </div>
          <div className="pstep">
            <div className="pn">STEP 02</div>
            <h3>Paste the prompt</h3>
            <p>
              Open Claude Code in that folder and paste{" "}
              <Link to="/prompt">the prompt</Link>. Claude reads every file and
              works out each format on its own.
            </p>
          </div>
          <div className="pstep">
            <div className="pn">STEP 03</div>
            <h3>Open the dashboard</h3>
            <p>
              You get one HTML file. Double-click it. It works offline, with no
              server and no internet.
            </p>
          </div>
        </div>
        <div className="pipe-note">
          Under the hood, Claude writes a four-stage local pipeline:{" "}
          <b>parse → classify → aggregate → render.</b>
        </div>

        <div className="term" style={{ marginTop: 22 }}>
          <div className="term-bar">
            <i />
            <i />
            <i />
            <span className="lbl">claude-code — ~/statements</span>
          </div>
          <div className="term-body">
            <div>
              <span className="pr">$</span>{" "}
              <span className="cmd">ls</span>
            </div>
            <div className="mut">
              cibc_chequing.csv amex.xls visa.csv savings.csv …
            </div>
            <div style={{ marginTop: 8 }}>
              <span className="pr">$</span>{" "}
              <span className="cmd">claude</span>{" "}
              <span className="mut">“build a finance dashboard from these”</span>
            </div>
            <div>
              <span className="ok">▸</span> parsing 7 files{" "}
              <span className="mut">…… 7,110 rows</span>
            </div>
            <div>
              <span className="ok">▸</span> classifying{" "}
              <span className="mut">…… spend · income · transfer · fee</span>
            </div>
            <div>
              <span className="ok">▸</span> writing dashboard.html{" "}
              <span className="mut">…… done</span>
            </div>
            <div style={{ marginTop: 6 }}>
              <span className="pr">$</span>{" "}
              <span className="cmd">open dashboard.html</span>
              <span className="cursor" />
            </div>
          </div>
        </div>
      </section>

      {/* ── features ─────────────────────────────────────── */}
      <section className="wrap section">
        <div className="kicker">
          <b>§03</b> Inside the dashboard
        </div>
        <h2 className="h2">Five views your bank app doesn&rsquo;t give you.</h2>
        <p className="sub" style={{ marginBottom: 28 }}>
          Eleven sections in all, every chart interactive. Here are the ones
          people open first.
        </p>
        <div className="features">
          {FEATURES.map((f) => (
            <div className="feature" key={f.num}>
              <div className="fcopy">
                <div className="fnum">/ {f.num}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
              <div className="fmedia">
                <img src={f.img} alt={f.alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── privacy ──────────────────────────────────────── */}
      <section className="wrap section">
        <div className="kicker">
          <b>§04</b> Privacy
        </div>
        <h2 className="h2">Your numbers never leave your machine.</h2>
        <p className="sub">
          The pipeline runs locally. The dashboard inlines its own chart library
          and your data into a single file, so it opens with no internet. The
          prompt tells Claude, in writing, never to transmit your data. And the
          demo on this site is fictional: every name and figure is invented.
        </p>
      </section>

      {/* ── built by / sponsors ──────────────────────────── */}
      <section className="wrap section">
        <div className="kicker">
          <b>§05</b> Built by
        </div>
        <h2 className="h2">Made by Space &amp; Story.</h2>
        <p className="sub" style={{ marginBottom: 28 }}>
          This tool is free because it&rsquo;s a demonstration. It shows what an
          AEO-first studio can build, and where to find the rest of the work.
        </p>
        <div className="sponsors">
          {PROPERTIES.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={"sponsor" + (p.lead ? " sponsor--lead" : "")}
            >
              <span className="srole">{p.role}</span>
              <span className="sname">{p.name}</span>
              <p>{p.blurb}</p>
              <span className="slink">{p.cta} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── github star band ─────────────────────────────── */}
      <section className="wrap section">
        <div className="gh">
          <div>
            <h2>Star it, or make it better.</h2>
            <p>
              Free and open-source under the MIT license. A star helps people find
              it; a pull request makes it better. The prompt gets sharper every time
              someone adds their bank&rsquo;s quirks.
            </p>
          </div>
          <div className="ghcta">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              ★ Star on GitHub
            </a>
            <a
              href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Contribute →
            </a>
          </div>
        </div>
      </section>

      {/* ── guides ───────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="wrap section">
          <div className="kicker">
            <b>§06</b> Guides
          </div>
          <h2 className="h2">Read before you run it.</h2>
          <p className="sub" style={{ marginBottom: 28 }}>
            Short, first-hand guides on subscriptions, statement analysis, and keeping your money
            data private.
          </p>
          <div className="postgrid">
            {posts.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="postcard">
                <div className="pc-tags">
                  {p.tags.slice(0, 2).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <h2>{p.title}</h2>
                <p>{p.excerpt}</p>
                <div className="pc-meta">{p.readingTimeMin} min read</div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <Link to="/blog" className="btn btn-sm">
              All guides →
            </Link>
          </div>
        </section>
      )}

      {/* ── faq ──────────────────────────────────────────── */}
      <section className="wrap section">
        <div className="kicker">
          <b>§07</b> FAQ
        </div>
        <h2 className="h2">Questions, answered.</h2>
        <div className="faq">
          {FAQS.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                <span className="mk">+</span>
                {item.question}
              </summary>
              <div className="ans">{item.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* ── final cta ────────────────────────────────────── */}
      <section className="wrap section">
        <div className="cta">
          <h2>See it on your own statements.</h2>
          <p>Open the demo, then grab the prompt. Ten minutes, start to finish.</p>
          <div className="ctarow">
            <Link to="/demo" className="btn btn-primary">
              ▶ Open the live demo
            </Link>
            <Link to="/prompt" className="btn">
              Get the one-shot prompt
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
