import { createFileRoute, Link } from "@tanstack/react-router";
import { buildRouteHead, SITE_URL } from "@/lib/route-head";
import { breadcrumbSchema } from "@/utils/structuredData";
import promptRaw from "../../PROMPT.md?raw";
import { useState } from "react";

// PROMPT.md wraps the actual prompt in a fenced code block, surrounded by tips.
// Show and copy only the prompt itself.
const fence = promptRaw.match(/```(?:\w*)\n([\s\S]*?)```/);
const PROMPT = (fence ? fence[1] : promptRaw).trim();

export const Route = createFileRoute("/prompt")({
  head: () =>
    buildRouteHead({
      title: "The one-shot prompt that builds the dashboard",
      description:
        "The exact Claude Code prompt that turns your bank statements into a finance dashboard. Copy it, paste it, and Claude builds the whole thing locally.",
      path: "/prompt",
      keywords:
        "Claude Code finance prompt, bank statement dashboard prompt, one-shot prompt, finance dashboard prompt",
      jsonLd: [
        breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "The prompt", url: `${SITE_URL}/prompt` },
        ]),
      ],
    }),
  component: PromptPage,
});

function PromptPage() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PROMPT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="wrap-narrow" style={{ paddingBottom: 64 }}>
      <div className="pageintro">
        <div className="eyebrow">Scaffold from the repo · or paste anywhere</div>
        <h1 className="display" style={{ fontSize: "clamp(28px,4.4vw,42px)" }}>
          The one-shot prompt.
        </h1>
        <p className="hero-lede" style={{ maxWidth: "62ch" }}>
          For the closest match to the demo, clone this repo, drop your exports
          (CSV, XLS, or XLSX) into the folder, and paste this into{" "}
          <a href="https://claude.com/claude-code" target="_blank" rel="noopener noreferrer">
            Claude Code
          </a>
          . It reuses the finished dashboard as the template and just builds the
          pipeline for your numbers. No clone? Paste the same prompt into an empty
          folder and it builds everything from scratch. Either way, it runs on
          your machine.
        </p>
        <p className="mono" style={{ marginTop: 14, fontSize: "12.5px", color: "var(--faint)" }}>
          <span style={{ color: "var(--dim)" }}>scaffold:</span> git clone
          github.com/MahmoudHalat/claude-finance-dashboard
        </p>
      </div>

      <div className="codeblock">
        <div className="codeblock-bar">
          <span className="t">Prompt — paste into Claude Code</span>
          <button
            onClick={handleCopy}
            className="btn btn-sm"
            style={
              copied
                ? { color: "var(--green)", borderColor: "var(--green)" }
                : undefined
            }
          >
            {copied ? "✓ Copied" : "⧉ Copy prompt"}
          </button>
        </div>
        <pre>{PROMPT}</pre>
      </div>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Link to="/demo" className="btn btn-primary">
          ▶ See what it builds
        </Link>
        <Link to="/" className="btn">
          ← Back to overview
        </Link>
      </div>
    </div>
  );
}
