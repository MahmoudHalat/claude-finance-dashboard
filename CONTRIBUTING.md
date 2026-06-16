# Contributing

Thanks for being here. This project is free and open-source, and it gets better every time someone who
actually uses it sends a fix, a sharper prompt, or a new bank's quirks. **PRs are genuinely welcome** —
small ones especially.

The product here is the one-shot **prompt** ([`PROMPT.md`](PROMPT.md)) that builds a finance dashboard
from your statements, plus the **renderer** ([`public/dashboard.html`](public/dashboard.html)) and the
**data contract** ([`DATA_CONTRACT.md`](DATA_CONTRACT.md)) it scaffolds against.

> The marketing site (finance.mahmoudhalat.com) lives in a **separate** repo and isn't part of this one.

## 🔒 One hard rule: never commit real financial data

This is the only thing that will get a PR closed on sight. The [`.gitignore`](.gitignore) already blocks
`*.csv`, `*.xls`, `*.xlsx`, `data/`, and pipeline output — but **double-check `git status` before you
commit.** The demo data in `public/dashboard.html` is **fictional**; keep it that way. If you report a
bank's format in an issue, **redact the numbers** (share column headers and date formats, not balances).

## Ways to contribute (highest-leverage first)

1. **Improve the prompt.** [`PROMPT.md`](PROMPT.md) is the heart of the project. Better classification
   rules, clearer steps, a new dashboard section, or an edge case you hit — improving the prompt makes
   *everyone's* generated dashboard better. This is the most valuable thing you can send.
2. **Add your bank's quirks.** Banks export wildly different CSV/XLS layouts. If you got a bank or card
   to parse cleanly (or hit a gotcha), add a short note to `PROMPT.md`, or open an issue describing the
   format — column headers, date format, how debits/credits are signed — **with the numbers redacted**.
   Crowd-sourced bank coverage helps the next person.
3. **Extend the renderer or the contract.** Got an idea for a chart or section? Sketch it into
   `PROMPT.md` and `DATA_CONTRACT.md`, and (if you can) wire it into `public/dashboard.html`. Keep
   `DATA_CONTRACT.md` and the renderer in sync — the contract is what makes scaffolding reliable.
4. **Fix a bug / improve docs.** Typos count. So do broken links and unclear instructions.

## How to test a change

There's no build step — this repo is the prompt, the renderer, and the docs.

- **Prompt changes:** run `PROMPT.md` in Claude Code against a folder of (your own, real *or* fictional)
  exports and confirm the dashboard still builds end to end and opens cleanly in a browser.
- **Renderer changes:** open `public/dashboard.html` directly in a browser, check the console for
  errors, and confirm every section still renders with the inlined demo data.

## PR process

1. Fork, then branch: `git checkout -b improve-the-thing`.
2. Make the change. Keep PRs focused — one idea per PR is easier to review and merge.
3. Confirm the dashboard still opens and the console is clean.
4. Open the PR with a short "what and why." Screenshots help for visual changes.

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE). Be kind in
issues and reviews — assume good faith, keep it useful.
