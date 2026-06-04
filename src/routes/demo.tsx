import { createFileRoute, Link } from "@tanstack/react-router";
import { buildRouteHead } from "@/lib/route-head";
import { softwareApplicationSchema } from "@/utils/structuredData";

export const Route = createFileRoute("/demo")({
  head: () =>
    buildRouteHead({
      title: "Live demo — Finance Dashboard",
      description:
        "Explore the free offline finance dashboard built from bank statements: spending, subscriptions, money-flow, and a tax-audit risk read. Fictional sample data.",
      path: "/demo",
      keywords:
        "finance dashboard demo, bank statement dashboard, offline finance dashboard, personal finance tool demo",
      jsonLd: [softwareApplicationSchema],
    }),
  component: DemoPage,
});

function DemoPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100dvh - 58px)",
        minHeight: 560,
      }}
    >
      <div className="wrap" style={{ paddingTop: 20, paddingBottom: 14 }}>
        <div className="kicker">
          <b>Live demo</b> fictional sample data
        </div>
        <h1
          style={{
            fontFamily: "var(--mono)",
            fontSize: "clamp(20px, 3vw, 26px)",
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            margin: "8px 0",
            color: "var(--txt)",
          }}
        >
          A finance dashboard, built from bank statements
        </h1>
        <p style={{ color: "var(--dim)", fontSize: "14.5px", lineHeight: 1.6, margin: 0, maxWidth: "80ch" }}>
          This is the exact dashboard the <Link to="/prompt">one-shot prompt</Link> produces, here on
          fictional sample data (7 accounts, 7,110 transactions, 85 months). Explore cash flow, spending
          by category, every subscription, the money-flow Sankey, per-person timelines, and the
          audit-risk read.{" "}
          <a href="/dashboard.html" target="_blank" rel="noopener noreferrer">
            Open it standalone ↗
          </a>
        </p>
      </div>
      <iframe
        src="/dashboard.html"
        title="Finance Dashboard live demo"
        style={{
          flex: "1 1 auto",
          width: "100%",
          border: "none",
          borderTop: "1px solid var(--grid)",
          display: "block",
        }}
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
}
