<div align="center">

# 💸 Finance Dashboard

**Drop a folder of bank statements into [Claude Code](https://claude.com/claude-code), paste one prompt, and get a single offline dashboard that finds every subscription, separates real spending from transfers, and flags audit risk.**

Free · open-source · runs 100% on your machine.

[![MIT License](https://img.shields.io/badge/license-MIT-2bf58e.svg)](LICENSE)
[![Built with Claude Code](https://img.shields.io/badge/built%20with-Claude%20Code-8a6cff.svg)](https://claude.com/claude-code)
[![Star on GitHub](https://img.shields.io/github/stars/MahmoudHalat/claude-finance-dashboard?style=social)](https://github.com/MahmoudHalat/claude-finance-dashboard)

[**▶ See the live dashboard**](https://mahmoudhalat.github.io/claude-finance-dashboard/dashboard.html) · [**⌘ Get the one-shot prompt**](PROMPT.md) · [**Build your own**](#-build-your-own)

</div>

<br>

![Finance Dashboard overview](public/screenshots/overview.png)

> **This repo is the shareable demo + the marketing site around it.** Every name and figure in the
> demo is **fictional** — synthetic sample data. It exists to show you what you can build for yourself.
> Your real version stays on your own computer.

---

## The story

I built this to track down the subscriptions I'd forgotten I was paying for — the trials that quietly
converted, the apps I stopped opening, the price creep nobody emails you about. Finding them meant
parsing years of statements, so it grew: real spending vs. transfers, where the money actually goes,
who's been paying me and when, and what an auditor would flag.

The dashboard — the pipeline, eleven visualizations, and the audit read — was built by **Claude Opus
4.8** with a **1M-token context window**, almost in a single shot.

## What it does

- **Consolidates every account** — chequing, savings, USD, line of credit, every credit card — into one
  normalized ledger, reconciled against statement totals where they're stated.
- **Counts spending honestly.** Every transaction is *flow-typed*, so transfers between your own
  accounts and credit-card bill payments are **never** miscounted as spending.
- **Finds every subscription** with a curated catalog plus a recurrence detector: true monthly run-rate,
  active-or-lapsed status, and a per-service timeline.
- **Shows where the money goes** — stacked spend-by-category, a drill-down treemap, a GitHub-style daily
  calendar heatmap, a money-flow Sankey, and a per-counterparty timeline.
- **Self-audits.** A defensive "if you got audited, what would be flagged?" risk read, ranked by
  severity with the evidence. *(Informational, not tax advice.)*
- **Looks like a quant terminal** and runs as **one offline HTML file** — IBM Plex Mono/Sans,
  neon-on-black, zero rounded corners, fully responsive.

<table>
  <tr>
    <td width="50%"><img src="public/screenshots/spending-treemap.png" alt="Spending treemap"></td>
    <td width="50%"><img src="public/screenshots/patterns-calendar.png" alt="Daily spending calendar heatmap"></td>
  </tr>
  <tr>
    <td width="50%"><img src="public/screenshots/transfers-sankey.png" alt="Money-flow Sankey"></td>
    <td width="50%"><img src="public/screenshots/audit.png" alt="Audit-risk assessment"></td>
  </tr>
</table>

## 🛠 Build your own

The same prompt works two ways.

**Best results — scaffold from this repo.** Clone it, drop your exports into the folder, and paste
[`PROMPT.md`](PROMPT.md) into [Claude Code](https://claude.com/claude-code). Claude reuses
[`public/dashboard.html`](public/dashboard.html) as the renderer and
[`DATA_CONTRACT.md`](DATA_CONTRACT.md) as the target data shape — so it only builds the pipeline that
fills it with your numbers, and you get the demo's exact dashboard with your data.

```bash
git clone https://github.com/MahmoudHalat/claude-finance-dashboard
cd claude-finance-dashboard
# drop your CSV / XLS exports in, open Claude Code, and paste PROMPT.md
```

**No setup.** Paste the same prompt into an empty folder and it builds the renderer from scratch too.

Claude reads whatever column layout your bank uses and adapts. One bank or seven, it works the same way.
The pipeline scripts are deliberately **not** in this repo (they'd carry the original author's real
merchant rules) — Claude writes them fresh for your files. What it reuses is the finished renderer and
the documented data contract.

## 💻 The site (this repo)

This repo is also the marketing site around the tool, built to mirror the
[Space & Story](https://spaceandstory.co) stack: **TanStack Start + React 19 + Vite + Tailwind 4**,
server-rendered on **Cloudflare Workers**, with full SEO/AEO plumbing (per-route metadata, JSON-LD,
`sitemap.xml`, `robots.txt` with AI-crawler allowances, and `llms.txt`).

### Develop

```bash
npm install
npm run dev        # http://localhost:5180
```

Routes: `/` (home), `/prompt` (the one-shot prompt), `/demo` (the live dashboard).

### Deploy

This is a server-rendered Cloudflare **Worker**, not a static site — deploy it as a **Worker**, not a
Pages project. `npm run build` emits the Worker (`dist/server`) plus the static assets (`dist/client` —
the demo `dashboard.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, and the OG images), and
`wrangler deploy` ships both.

**Before first deploy** (optional but recommended): set `SITE_URL` in
[`src/lib/route-head.ts`](src/lib/route-head.ts) and the matching domain in
[`public/robots.txt`](public/robots.txt) + [`public/sitemap.xml`](public/sitemap.xml). It deploys fine
without this; canonical and OG URLs just use the placeholder until you set it.

**From the GitHub repo (recommended).** In the Cloudflare dashboard:
*Workers & Pages → Create → Workers → Import a repository*, pick this repo, then set:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Cloudflare rebuilds and redeploys on every push to `main`.

**Or via GitHub Actions.** [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) deploys on
every push once you add two repo secrets: `CLOUDFLARE_API_TOKEN` (an "Edit Cloudflare Workers" token)
and `CLOUDFLARE_ACCOUNT_ID`.

**Or from your machine.**

```bash
npm install
npm run build
npm run deploy     # = wrangler deploy
```

### Structure

```
src/
  routes/        __root.tsx · index.tsx · prompt.tsx · demo.tsx
  components/    SiteHeader · SiteFooter
  data/site.ts   nav, properties, copy, FAQ (single source of truth)
  lib/route-head.ts        per-route <head> + OG + canonical
  utils/structuredData.ts  JSON-LD: Organization, WebSite, SoftwareApplication, HowTo, FAQ, Breadcrumb
public/
  dashboard.html           the fictional demo build
  screenshots/ · og/ · robots.txt · sitemap.xml · llms.txt · manifest.json
PROMPT.md        the one-shot prompt
DATA_CONTRACT.md the window.FIN data shape the dashboard renders from (for scaffolding)
```

## 🔒 Privacy
<a id="privacy"></a>

Everything runs locally. The prompt explicitly instructs Claude never to send your financial data to any
external service, the generated dashboard inlines its chart library and data into one offline file, and
the demo published here is entirely synthetic. Your numbers never leave your machine unless *you* choose
to share an anonymized copy.

## Built by · sponsored by

This tool is free because it's a demonstration. It's built and maintained by:

| | |
|---|---|
| **[Space & Story](https://spaceandstory.co)** | An AEO-first web studio. We build sites and tools designed to get found by Google **and** AI search. This dashboard is a working sample — [get one for your business](https://spaceandstory.co). |
| **[GiveFeedback](https://givefeedback.dev)** | A lightweight way to collect, triage, and act on product feedback. |
| **[Mahmoud Halat](https://mahmoudhalat.com)** | Everything else I build, write, and ship. |

## ⭐ Star it, or make it better

It's free and open-source. A [star](https://github.com/MahmoudHalat/claude-finance-dashboard) helps
other people find it. Even better: **send a PR.** The [one-shot prompt](PROMPT.md) gets sharper every
time someone adds their bank's quirks, and new guides, fixes, and design polish are all welcome — see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Built with [Claude Code](https://claude.com/claude-code). Not financial or tax advice.
