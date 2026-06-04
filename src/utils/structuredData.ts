import { SITE_URL, SITE_NAME } from "@/lib/route-head";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": SITE_NAME,
  "url": SITE_URL,
  "logo": `${SITE_URL}/icon-512.png`,
  "description": "A free, offline personal finance dashboard built with Claude Code. Paste your bank and credit card CSV exports and get an interactive intelligence report — nothing leaves your machine.",
  "founder": {
    "@type": "Person",
    "name": "Mahmoud Halat",
    "url": "https://mahmoudhalat.com",
    "sameAs": [
      "https://x.com/mahmoudhalat",
      "https://www.linkedin.com/in/mahmoudhalat/"
    ]
  },
  "sameAs": [
    "https://spaceandstory.co",
    "https://givefeedback.dev",
    "https://mahmoudhalat.com"
  ]
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": `${SITE_URL}/`,
  "description": "A free, offline personal finance dashboard built with Claude Code.",
  "inLanguage": "en",
  "publisher": {
    "@type": "Person",
    "name": "Mahmoud Halat",
    "url": "https://mahmoudhalat.com"
  }
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Finance Dashboard",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "description": "A single self-contained offline HTML dashboard that consolidates bank and credit card statement exports into a personal-finance intelligence report. Built with Claude Code. Nothing leaves your machine.",
  "url": `${SITE_URL}/demo`,
  "author": {
    "@type": "Person",
    "name": "Mahmoud Halat",
    "url": "https://mahmoudhalat.com"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "featureList": [
    "Runs fully offline — no data leaves your machine",
    "Multi-account import (CSV, XLS, XLSX)",
    "Subscription and recurring-charge detection",
    "Spending by category over months, quarters and years",
    "GitHub-style daily spending calendar heatmap",
    "Money-flow Sankey and per-counterparty timelines",
    "Tax-audit risk assessment"
  ]
};

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function faqSchema(qaPairs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": qaPairs.map((qa) => ({
      "@type": "Question",
      "name": qa.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": qa.answer
      }
    }))
  };
}

export function howToSchema(steps: Array<{ name: string; text: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use the Finance Dashboard",
    "description": "Generate a personal finance intelligence report from your bank exports using Claude Code.",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };
}

export const homePageSchemas = [organizationSchema, webSiteSchema, softwareApplicationSchema];

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  metaDescription: string;
  datePublished: string;
  dateModified: string;
  keywords?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "url": `${SITE_URL}/blog/${post.slug}`,
    "mainEntityOfPage": `${SITE_URL}/blog/${post.slug}`,
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "image": `${SITE_URL}/og/default.png`,
    "keywords": post.keywords,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Person",
      "name": "Mahmoud Halat",
      "url": "https://mahmoudhalat.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/icon-512.png` },
    },
  };
}
