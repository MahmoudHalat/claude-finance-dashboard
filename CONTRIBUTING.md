# Contributing

Thanks for being here. This project is free and open-source, and it gets better every time someone
who actually uses it sends a fix, a better prompt, or a new bank's quirks. **PRs are genuinely
welcome** — small ones especially.

The product here is really two things: a one-shot **prompt** that builds a finance dashboard from your
statements, and the **site** that explains and demos it. You can improve either.

## 🔒 One hard rule: never commit real financial data

This is the only thing that will get a PR closed on sight. The `.gitignore` already blocks `*.csv`,
`*.xls`, `data/`, and pipeline output, but double-check `git status` before you commit. The demo data
in `public/dashboard.html` is **fictional** — keep it that way.

## Ways to contribute (highest-leverage first)

1. **Improve the prompt.** [`PROMPT.md`](PROMPT.md) is the heart of the project. Better classification
   rules, clearer steps, a new dashboard section, or an edge case you hit — improving the prompt makes
   *everyone's* generated dashboard better. This is the most valuable thing you can send.
2. **Add your bank's quirks.** Different banks export wildly different CSV/XLS layouts. If you got a
   bank or card to parse cleanly (or found a gotcha), add a short note to `PROMPT.md` under a "bank
   notes" section, or open an issue describing the format (column headers, date format, how debits/
   credits are signed — **with the numbers redacted**). Crowd-sourced bank coverage helps the next person.
3. **Write a guide.** The `/blog` guides live in [`src/data/posts.ts`](src/data/posts.ts) as structured
   objects (semantic-HTML `bodyHtml`). Add a comparison, a how-to, or a bank-specific walkthrough.
   Keep it first-hand and honest; no AI slop, no fake numbers.
4. **Polish the site.** Design, accessibility, performance, SEO, mobile, a new comparison page — all
   fair game. Match the existing quant-terminal style (IBM Plex Mono/Sans, neon-green on near-black,
   zero rounded corners).
5. **Propose a new visualization.** Got an idea for a chart or section the dashboard should have?
   Open an issue, or sketch it into `PROMPT.md` and `DATA_CONTRACT.md`.
6. **Fix a bug / improve docs.** Typos count. So do broken links and unclear instructions.

## Dev setup

```bash
git clone https://github.com/MahmoudHalat/claude-finance-dashboard
cd claude-finance-dashboard
npm install
npm run dev        # http://localhost:5180
npm run build      # production build (also typechecks the routes)
```

Stack: TanStack Start + React 19 + Vite + Tailwind 4, server-rendered on Cloudflare Workers. Routes
live in `src/routes/`, shared content in `src/data/`, SEO helpers in `src/lib/route-head.ts` and
`src/utils/structuredData.ts`.

## PR process

1. Fork, then branch: `git checkout -b improve-the-thing`.
2. Make the change. Keep PRs focused — one idea per PR is easier to review and merge.
3. Run `npm run build` and confirm it passes.
4. Open the PR with a short "what and why." Screenshots help for visual changes.

## Good first issues

- Add a "bank notes" section to `PROMPT.md` for a bank we don't cover well.
- Add a new guide to `src/data/posts.ts` (comparison or how-to).
- Improve mobile spacing or contrast on any page.
- Tighten any meta description over 155 characters.
- Add an `og:` image per guide instead of the shared default.

## License

By contributing, you agree your contributions are licensed under the [MIT License](LICENSE). Be kind in
issues and reviews — assume good faith, keep it useful.
