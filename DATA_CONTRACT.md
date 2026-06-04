# Data contract — `window.FIN`

`public/dashboard.html` is a complete, self-contained renderer (Apache ECharts inlined). It draws
**everything** from a single object inlined near the bottom of the file:

```html
<script>window.FIN = { /* the object documented below */ };</script>
```

To build your own dashboard, produce this exact shape from your statements, then **copy
`public/dashboard.html` and replace the `window.FIN = {…}` block with yours** (and strip the demo
branding — see the prompt). Every chart, table, and the audit section render off these keys. Sections
with empty/zero data simply render empty, so it degrades gracefully if you have fewer accounts.

All amounts are numbers (CAD-style, 2 decimals). Months are `"YYYY-MM"`, dates `"YYYY-MM-DD"`.

## Top-level keys

```jsonc
{
  "meta":   { /* headline figures + accounts */ },
  "monthly":   [ /* one row per month */ ],
  "quarterly": [ /* one row per quarter */ ],
  "yearly":    [ /* one row per year */ ],
  "categories":     [ /* spend by category */ ],
  "income_sources": [ /* income by source */ ],
  "subscriptions":  [ /* recurring-charge catalog */ ],
  "sub_groups":     [ /* subscription rollup by group */ ],
  "recurring_monthly": [ /* recurring cost over time */ ],
  "top_merchants":  [ /* biggest merchants */ ],
  "txns":        [ /* every transaction, compact tuples */ ],
  "daily_spend": [ /* per-day spend, for the calendar heatmap */ ],
  "yoy":           { /* year-over-year monthly matrices */ },
  "quarter_matrix":{ /* spend per quarter, keyed by year */ },
  "counterparties":[ /* per-person money in/out */ ],
  "flow_summary":  { /* totals by flow type */ },
  "audit":         { /* computed audit-risk metrics */ },
  "audit_findings":{ /* the written audit (overall + flags) */ }
}
```

## Shapes (with real examples from the demo)

**`meta`** — headline KPIs + per-account summary.
```jsonc
{
  "generated": "2026-06-02", "first": "2019-06-03", "last": "2026-06-01",
  "n_txns": 7110, "months": 85, "years": ["2019", …, "2026"],
  "total_income": 564125.70, "total_spend": 629948.27,
  "total_money_in": 3031477.97, "total_money_out": 3033089.20,
  "loc_paydown": 51720.11, "loc_paydown_n": 3,
  "active_sub_count": 18, "active_digital_monthly": 324.37, "active_all_monthly": 1043.26,
  "accounts": [
    { "name": "Everyday Chequing", "type": "chequing", "txns": 2436,
      "inf": 2644927.03, "out": 2549831.34, "net": 95095.69,
      "first": "2019-06-03", "last": "2026-05-29" }
  ]
}
```

**`monthly[]`** — one row per month. `by_cat`/`by_income`/`rec_groups` are objects keyed by name → amount.
```jsonc
{ "ym": "2019-06", "income": 5104.27, "spend": 2967.03, "net": 2137.24,
  "invest": 0, "person_in": 2108.95, "person_out": 1763.93, "cash": 54.51,
  "recurring": 1836.53,
  "rec_groups": { "Housing & Utilities": 1763.75, "Software & Digital": 72.78 },
  "by_cat":     { "Groceries": 223.58, "Housing": 1763.75, "Dining": 144.02, … },
  "by_income":  { "Employment (Northwind Labs)": 5104.27 } }
```

**`quarterly[]` / `yearly[]`** — `{ "period": "2024-Q1" | "2024", "income", "spend", "net", "recurring" }`

**`categories[]` / `income_sources[]`** — `{ "name", "total", "n" }` (n = transaction count)

**`top_merchants[]`** — `{ "name", "total", "n", "category" }`

**`subscriptions[]`** — the recurring catalog. `series` is a monthly timeline `[[ "YYYY-MM", amount ], …]`.
```jsonc
{ "name": "InvestEasy", "group": "Investments", "sub_type": "Investment",
  "category": "Investments", "count": 216, "total": 57530.45,
  "first": "2020-03-31", "last": "2026-05-19", "cadence": "frequent",
  "current": 93.72, "median_amt": 93.93, "min_amt": 77.30, "max_amt": 4641.80,
  "monthly_equiv": 415.62, "active": true, "status": "Active",
  "series": [ ["2020-03", 3813.79], ["2021-02", 77.30], … ] }
```

**`sub_groups[]`** — `{ "group", "active": <bool>, "count", "monthly", "total_paid" }`

**`recurring_monthly[]`** — `{ "ym": "2019-06", "by_group": { "<group>": amount }, "total": 1836.53 }`

**`txns[]`** — every transaction as a compact 7-tuple (keep it positional, in date order):
```jsonc
[ "2019-06-03", "CHQ", "Condo Corp 2", "Housing", "spend", -561.02, 1 ]
//  date          acct   description     category   flow_type  amount  recurring(0|1)
```
`flow_type` ∈ `spend | income | transfer_internal | card_payment | transfer_person | investment | interest | fee | cash | refund | fx`. `amount` is signed (negative = outflow).

**`daily_spend[]`** — `[ "YYYY-MM-DD", spendTotal ]` per day with spend (for the GitHub-style heatmap).

**`yoy`** — `{ "spend": { "2024": [ jan…dec (12 numbers) ] }, "income": { "2024": [12 numbers] } }`

**`quarter_matrix`** — `{ "2024": [q1, q2, q3, q4], … }` (spend per quarter)

**`counterparties[]`** — per named person; `series` is `[[ "YYYY-MM", in, out ], …]`.
```jsonc
{ "name": "Jordan Avery", "in": 96672.28, "out": 353776.17, "net": -257103.89,
  "n": 28, "first": "2019-08-06", "last": "2026-04-22", "vol": 450448.45,
  "series": [ ["2019-08", 0, 4110.63], ["2019-11", 0, 8306.65], … ] }
```

**`flow_summary`** — total dollars by flow type:
```jsonc
{ "spend": …, "transfer_internal": …, "transfer_person": …, "card_payment": …,
  "income": …, "fee": …, "cash": …, "refund": …, "investment": …, "interest": …, "fx": … }
```

**`audit`** — computed metrics: `{ cash_total, cash_n, cash_largest, cash_by_year, foreign_n,
foreign_total, foreign_currencies, big_txns, big_n, big_total, round_n, round_total, … }`.

**`audit_findings`** — the written risk read (generate this from `audit` + the flows):
```jsonc
{ "overall": { "risk_level": "High", "score": 82, "summary": "…" },
  "flags": [ { "id", "severity": "Critical|High|Medium|Low", "category", "title",
               "finding", "evidence", "exposure", "recommendation" } ],
  "disclaimer": "Informational only — not tax advice." }
```
