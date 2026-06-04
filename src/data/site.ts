// Single source of truth for site content (links, copy, schema inputs).

export const GITHUB_URL = "https://github.com/MahmoudHalat/claude-finance-dashboard";

export type Property = {
  name: string;
  role: string;
  href: string;
  blurb: string;
  cta: string;
  lead?: boolean;
};

// Leadgen destinations — the three properties this free tool funnels to.
export const PROPERTIES: Property[] = [
  {
    name: "Space & Story",
    role: "The studio",
    href: "https://spaceandstory.co",
    blurb:
      "An AEO-first web studio. We build sites and tools designed to get found by Google and AI search alike. This dashboard is a working sample of that.",
    cta: "Get a site like this",
    lead: true,
  },
  {
    name: "GiveFeedback",
    role: "The product",
    href: "https://givefeedback.dev",
    blurb:
      "A lightweight way to collect, triage, and act on product feedback, built and run by the same hands.",
    cta: "givefeedback.dev",
  },
  {
    name: "Mahmoud Halat",
    role: "The person",
    href: "https://mahmoudhalat.com",
    blurb:
      "Everything else I build, write, and ship: finance tools, laser-cut art, and the occasional experiment.",
    cta: "mahmoudhalat.com",
  },
];

export const TICKER = [
  "7 ACCOUNTS",
  "7,110 TRANSACTIONS",
  "85 MONTHS",
  "18 SUBSCRIPTIONS TRACKED",
  "11 ANALYSIS SECTIONS",
  "1 OFFLINE FILE",
  "$0 TO RUN",
  "NOTHING UPLOADED",
];

export const QUESTIONS = [
  {
    q: "Which subscriptions am I still paying for?",
    a: "Every recurring charge, with its true monthly cost and whether it is still active.",
  },
  {
    q: "What did I actually spend last year?",
    a: "Real spending, once transfers between your own accounts and card payments are stripped out.",
  },
  {
    q: "Where does the money go?",
    a: "Every category, month over month, as stacked bars and a drill-down treemap.",
  },
  {
    q: "Who keeps sending me money, and when did that change?",
    a: "A per-person timeline of money in and out across the whole period.",
  },
  {
    q: "If I got audited, what would get flagged?",
    a: "A severity-ranked read of unexplained transfers, income gaps, and cash intensity.",
  },
];

export const FEATURES = [
  {
    num: "01",
    title: "See where it really goes",
    img: "/screenshots/spending-treemap.png",
    alt: "Spending treemap and stacked category bars",
    body: "Stacked category bars by month, plus a treemap you can drill from category into individual merchants. Transfers and card payments are typed out, so the totals are honest.",
  },
  {
    num: "02",
    title: "A year of spending at a glance",
    img: "/screenshots/patterns-calendar.png",
    alt: "GitHub-style daily spending calendar heatmap",
    body: "A daily heatmap, like GitHub's contribution graph, makes seasonality and the slow creep of any category obvious in one look.",
  },
  {
    num: "03",
    title: "Follow the money",
    img: "/screenshots/transfers-sankey.png",
    alt: "Sankey diagram of money flow between sources and accounts",
    body: "A flow diagram maps income sources to accounts to where the money ends up, so internal moves never get mistaken for spending.",
  },
  {
    num: "04",
    title: "Every counterparty, over time",
    img: "/screenshots/counterparty.png",
    alt: "Per-counterparty money-in and money-out timeline",
    body: "Pick anyone you pay or get paid by and see their money in and out on one timeline. The answer to 'when did that change?' is one click away.",
  },
  {
    num: "05",
    title: "An auditor's-eye view",
    img: "/screenshots/audit.png",
    alt: "Audit-risk assessment with severity-ranked flags",
    body: "A built-in risk read flags unexplained transfers, income-versus-spending gaps, and cash intensity, ranked by severity with the evidence. Informational, not tax advice.",
  },
];

export const FAQS = [
  {
    question: "Is it really free?",
    answer:
      "Yes. The prompt, the pipeline it generates, and the dashboard are open-source under the MIT license. There is no account and no paywall.",
  },
  {
    question: "Does my financial data leave my machine?",
    answer:
      "No. Everything runs on your computer. The dashboard is a single offline HTML file, and the prompt instructs Claude, in writing, never to send your data anywhere.",
  },
  {
    question: "Which banks and cards does it work with?",
    answer:
      "Any bank or card that lets you export CSV, XLS, or XLSX. Claude reads whatever columns your statements use and adapts the pipeline, so you never have to reformat your files.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "No. You install Claude Code, drop your exports in a folder, and paste one prompt. Claude writes and runs the code for you.",
  },
  {
    question: "What does it actually find?",
    answer:
      "Every subscription and how its price changed, real spending by category over months and years, income by source, transfers by person, and a tax-audit risk read.",
  },
  {
    question: "Can I share my dashboard without exposing my real numbers?",
    answer:
      "Yes — ask Claude to make an anonymized copy. It jitters the amounts and swaps every name for a realistic fake, so the charts stay believable but nothing real shows. The demo on this site was made exactly that way.",
  },
  {
    question: "What is AEO, and why does this site mention it?",
    answer:
      "AEO, or answer engine optimization, is making content easy for AI search engines like ChatGPT and Perplexity to cite. This tool was built by Space & Story, an AEO-first studio, as a demonstration.",
  },
];
