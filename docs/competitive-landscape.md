# Competitive landscape & comparison-content strategy

Market intelligence that grounds the comparison guides in `/blog`. The goal is to be **fair and
current** — comparison content that names competitors honestly is what ranks and what AI engines cite.
Re-verify prices roughly quarterly; they change. Last verified: **2026-06**.

## The market in one paragraph

Intuit shut down **Mint** on **March 23, 2024** and pushed users to Credit Karma, which dropped Mint's
budgeting. That displaced millions and reset the category. The winners are paid subscription apps
(**Monarch**, **Copilot**, **YNAB**, all ~$95–110/yr) plus freemium **Rocket Money**. The privacy/free
lane is held by **Actual Budget** (open-source, local-first, a budgeting app) and **spreadsheets**.
Almost every cloud app connects through a bank-data aggregator (Plaid/MX/Finicity), so your credentials
and full history live on third-party servers — the convenience-vs-privacy trade is the whole story.

## Comparison (as of 2026 — verify before quoting)

| Tool | Price | Links your bank? | Data leaves your device? | Best for |
|---|---|---|---|---|
| Mint | — (shut down Mar 2024) | Yes | Yes | Nobody now → Credit Karma |
| Rocket Money | Free; Premium $7–14/mo | Yes | Yes | Hands-off subscription cancellation |
| Monarch Money | $14.99/mo · $99.99/yr | Yes | Yes | Households, shared budgeting + goals |
| Copilot Money | $13/mo · ~$95/yr | Yes (Plaid) | Yes | Apple users who want a daily app (no Android) |
| YNAB | $14.99/mo · $109/yr | Optional | Yes (if synced) | Actively changing spending habits |
| Actual Budget | Free, open-source | Optional/import | No (local-first) | Privacy-minded envelope budgeters who self-host |
| Spreadsheet / Tiller | Free / ~$79/yr | DIY: no · Tiller: yes | DIY: no | Tinkerers who want total control |
| **Finance Dashboard** | Free, open-source | **No (you export files)** | **No (100% local)** | A free, private, one-time **deep analysis** |

## How we position (honestly)

Finance Dashboard is not a budgeting app and shouldn't pretend to be. It's a **deep analysis / report**
you generate from statement files: every subscription with a true run-rate, flow-typed spending,
money-flow, counterparties, an audit read. Our lane:

- **Most private + free.** No bank login, no aggregator, nothing uploaded, no subscription. The only
  peers on this axis are Actual Budget (but it's an ongoing budgeting app you self-host) and DIY
  spreadsheets (far more manual).
- **You own the output** — one offline HTML file, no server to retire (the Mint lesson).

**Be upfront about the trade-offs** in every comparison: not real-time (re-export to refresh), no
mobile app, no budgeting/goals/bill-pay automation, and you need Claude Code. The paid apps genuinely
win on live sync, mobile, and active budgeting — say so.

## Comparison-content roadmap

| Angle | Target intent | Status |
|---|---|---|
| "Free, private alternative to Mint/Copilot/Monarch" | our-tool-as-alternative (BoFu) | live |
| "What replaced Mint? Every alternative compared" | market survey (MoFu) — high post-shutdown demand | live |
| "Actual Budget vs Finance Dashboard" | open-source peer comparison | candidate |
| "Best free budgeting tools that don't link your bank" | privacy niche listicle | candidate |
| Per-competitor "X alternative" pages | branded comparison (controls the SERP) | candidate |

## Sources (verified 2026-06)

- Mint shutdown / Credit Karma: [CNBC](https://www.cnbc.com/2023/11/07/budgeting-app-mint-is-shutting-down-users-are-disappointed.html), [Bloomberg](https://www.bloomberg.com/news/articles/2024-04-10/intuit-s-shutdown-of-mint-has-gone-better-than-thought-ceo-says), [Monarch blog](https://www.monarch.com/blog/mint-shutting-down)
- Monarch pricing: [Monarch](https://www.monarch.com/), [PennyHoarder](https://www.thepennyhoarder.com/budgeting/monarch-money-review/)
- Copilot pricing/platforms: [copilot.money/pricing](https://copilot.money/pricing/), [The College Investor](https://thecollegeinvestor.com/41976/copilot-review/)
- YNAB pricing: [ynab.com/pricing](https://www.ynab.com/pricing)
- Rocket Money: [Rocket Money Help](https://help.rocketmoney.com/en/articles/2217739-how-much-does-rocket-money-cost), [FinanceBuzz](https://financebuzz.com/truebill-review)
- Actual Budget: [actualbudget.org](https://actualbudget.org/), [GitHub](https://github.com/actualbudget/actual)
