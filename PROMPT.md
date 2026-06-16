# The one-shot prompt

Two ways to run it — **the same prompt** handles both:

- **Best results — scaffold from this repo.** Clone it, drop your bank & credit-card exports
  (CSV / XLS / XLSX) into the folder, open [Claude Code](https://claude.com/claude-code) there, and
  paste the prompt. Claude reuses the finished dashboard in `public/dashboard.html` as the renderer
  and [`DATA_CONTRACT.md`](DATA_CONTRACT.md) as its target, so it only has to build the pipeline that
  fills it with your numbers. You get the demo's exact dashboard, with your data.
- **No setup.** Paste the same prompt into an empty folder and it builds the renderer from scratch too.

Either way, the whole thing runs locally — nothing leaves your machine.

---

```
GOAL: one self-contained, OFFLINE interactive HTML dashboard that consolidates my bank and
credit-card statement exports (CSV/XLS/XLSX — several accounts, different column layouts) into a
personal-finance intelligence report. Do it end to end, locally. Nothing leaves my machine. Use
subagents where they help. Verify it in a browser before you tell me it's done.
Assume I am NOT technical: guide me in plain language through anything you need from me (above all,
getting my statement files to you), tell me what you're doing as you go, and never make me guess.

━━ STEP 0 — work out where you are, then get my statements ━━
Do this conversationally, one thing at a time, and do NOT start parsing until you actually have my files.

A) WHERE ARE YOU? Run `ls` on the folder you're running in and tell me, in one line, which case you're in:
   • You see `public/dashboard.html` and `DATA_CONTRACT.md` → you're inside a clone of the
     claude-finance-dashboard repo. SCAFFOLD mode: `public/dashboard.html` is a finished, working,
     self-contained renderer (Apache ECharts inlined) that draws everything from one inlined
     `window.FIN = {…}` object, and `DATA_CONTRACT.md` documents that object's exact shape key by key.
     Reuse them as-is, do NOT redesign. Your only job is to (1) build the pipeline that turns my
     statements into that exact `window.FIN` JSON, and (2) make my dashboard by copying
     `public/dashboard.html`, swapping its `window.FIN = {…}` block for mine, and stripping the demo
     branding ("SAMPLE · FICTIONAL DATA", "// DEMO", the demo <title>). Match the contract precisely so
     every chart, table and the audit just work; drop (don't break) any section I have no data for.
   • You don't see them → you're just in a working folder. FROM-SCRATCH mode: you'll also build the
     renderer yourself, per "FULL SPEC" at the bottom.

B) DO YOU ALREADY HAVE MY FILES? Look in this folder and any subfolder for statement exports
   (.csv / .xls / .xlsx / .ofx / .qfx / .qbo). If you find some, list them back to me as
   "filename → the account I think it is" and ask me to confirm or correct before you touch them.

C) IF YOU FOUND NONE, STOP and walk me through getting them — assume I've never done this before:
   1. For each bank account and credit card I have, open its website or app and look for a button like
      "Export", "Download", "Statements", or "Transactions". Pick the LONGEST date range it offers (a
      few years is ideal). Prefer CSV; if there's no CSV take XLS/XLSX; if neither, OFX/QFX; PDF only as
      a last resort. Download one file per account.
   2. Put every file into a single folder on my computer. Don't rename them or tidy them up — you'll
      read them exactly as they come.
   3. Hand that folder to you. Easiest: move or copy the files into THIS folder you're running in.
      Otherwise tell me where the folder is — drag the folder into this chat to paste its full path, or
      copy the path and send it — and read my files straight from there.
   Then wait for me. When I tell you I'm done, re-check, list back what you found, and confirm with me
   before parsing anything.

Throughout: the more accounts I hand over (chequing, savings, every card) the better the consolidation;
if my bank only gives PDFs, take them but nudge me to export CSV/XLS if that's an option; and remind me
that nothing here ever leaves my machine.

━━ THE DATA MODEL (do this either way — it's the important part) ━━
Build a small Python pipeline (pandas/openpyxl only if a file needs it):

1) PARSE every file into one normalized ledger: [date, account, account_type, description, outflow,
   inflow, currency]. Treat each file as one account (LibreOffice headless or xlrd for .xls). Where a
   statement prints its own totals (e.g. an AMEX "charges/payments" summary), reconcile your parse to
   them. De-dupe overlapping re-exports by (date, description, amount) with max-count semantics so
   nothing is doubled or lost.

2) CLASSIFY every row:
   • flow_type — exactly one of: spend, income, transfer_internal, card_payment, transfer_person,
     investment, interest, fee, cash, refund, fx.
     THE KEY RULE: money moved between my own accounts, and credit-card bill payments, must NEVER
     count as spending. Only itemized card charges + real debits (mortgage/rent, utilities,
     insurance) are "spend".
   • category (Groceries, Dining, Gas, Travel, Shopping, Housing, Utilities, Insurance,
     Subscriptions, Transport, Health, Charity, …) + a cleaned merchant name (strip processor
     prefixes, store numbers, cities, FX strings). Use a subagent for the long tail of merchants.
   • recurring/subscription detection: a curated catalog of known services (Netflix, Spotify, Apple,
     insurers, telecom, utilities, gym, mortgage…) PLUS a recurrence algorithm (same merchant,
     regular cadence, stable amount). For each subscription compute a robust ~$/month run-rate
     (trailing 12 months, trimming one-off lumps), active/lapsed status, and a monthly timeline.

3) AGGREGATE into the dashboard's data object: monthly / quarterly / yearly rollups; spend-by-category
   over time; income by source; the subscriptions catalog; per-counterparty in/out series; daily
   spend; money-in/out totals; the flow-type summary; and audit-risk metrics (large unexplained
   inbound transfers, income-vs-outflow gap, cash withdrawals, foreign transactions, round-number
   transfers). If scaffolding, emit EXACTLY the `window.FIN` shape in DATA_CONTRACT.md.

4) RENDER: scaffold → swap your data into the copied dashboard. From scratch → inline Apache ECharts
   (vendored locally) + your data into ONE .html that opens offline by double-click.

━━ AUDIT ━━
Include a defensive "if I got audited, what would be flagged?" read: an overall risk score + severity-
ranked flags, each with finding, evidence (the real numbers), exposure, and what to do. Mark it
informational, not tax advice.

━━ PRIVACY ━━
Everything runs locally. Do NOT send my financial data to any external API or service.

━━ WHEN DONE ━━
Open it in a browser, check the console for errors, and screenshot it for me.

━━ FULL SPEC (only if building the renderer from scratch — skip if reusing public/dashboard.html) ━━
One page; every section full-width and collapsible; a dark/light toggle that re-themes the charts;
fully mobile-responsive (stacked panels, 2-col KPIs, scrollable short-label legends, heatmap labels
hidden on narrow screens).
  00 Overview — KPI tiles: money in, identified income, total spending, money out, active subs,
     ~$/mo digital subs, ~$/mo all recurring, span.
  01 Cash flow — diverging monthly chart (income up, spending down, net line); month/quarter/year
     toggle; zoom slider.
  02 Income — monthly stacked by source + an all-time donut. (Person-to-person transfers are tracked
     separately, NOT income.)
  03 Spending — monthly stacked bars by category, a full-width nested treemap (category → merchant,
     click to drill, breadcrumb back), and a category × period heatmap.
  04 Patterns — a GitHub-style daily-spend calendar heatmap (one year + a year selector), a month ×
     year heatmap, quarterly grouped bars.
  05 Subscriptions — group cards, a "how recurring cost has grown" stacked chart, and a sortable/
     filterable table with per-service sparklines + active/lapsed badges.
  06 Transfers — a Sankey (sources → accounts → uses), a top-counterparty diverging bar chart, and a
     click-to-chart per-person in/out timeline + a ledger table.
  07 Accounts — per-account summary cards (in / out / net / # records / date range).
  08 Explorer — a searchable, filterable, paginated table over every transaction (capped height,
     inner scroll, sticky headers).
  09 Audit — the risk assessment above.
  10 Report — a short written read of the key findings, from the data.
DESIGN — quant-terminal, not generic: IBM Plex Mono (headings/labels/figures) + IBM Plex Sans (body),
tabular nums; zero rounded corners; 1px hairline borders; grid-separated tiles; a subtle graph-paper
background; a neon-green accent on near-black for dark mode + a clean white "quant report" light mode;
ECharts with crosshair pointers, dashed gridlines, zoom sliders, scrollable legends; charts must
re-theme correctly when the toggle flips.
```

---

### To scaffold (recommended)

    git clone https://github.com/MahmoudHalat/claude-finance-dashboard
    cd claude-finance-dashboard
    # drop your CSV / XLS exports into the folder, open Claude Code here, and paste the prompt above

The pipeline scripts aren't in the repo (they'd carry the original author's real merchant rules) —
Claude writes them fresh for your files. What it reuses is the finished renderer and the data contract.

> Tip: the more accounts you give it (chequing, savings, every card), the better the consolidation.
> Don't rename or pre-clean the files — Claude reads them as-is.

That's it. Scaffolded from the repo you get the demo's exact design; from scratch it adapts to whatever
you've got. The result is a single `.html` you can open offline forever.
