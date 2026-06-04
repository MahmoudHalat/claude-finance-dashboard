import { Link } from "@tanstack/react-router";
import { GITHUB_URL, PROPERTIES } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="fb-mark">
              <span className="brand-logo" aria-hidden="true">💸</span>
              FINANCE DASHBOARD
            </div>
            <p>
              A personal-finance dashboard you build, own, and run locally — from
              one Claude Code prompt. Free and open-source.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="star"
            >
              <span className="st">★</span> Star on GitHub
            </a>
          </div>

          <div className="footer-col">
            <h4>The tool</h4>
            <Link to="/">Home</Link>
            <Link to="/demo">Live demo</Link>
            <Link to="/prompt">The prompt</Link>
            <Link to="/blog">Guides</Link>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              Source on GitHub
            </a>
          </div>

          <div className="footer-col">
            <h4>Built by</h4>
            {PROPERTIES.map((p) => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>Good to know</h4>
            <a href={`${GITHUB_URL}/blob/main/LICENSE`} target="_blank" rel="noopener noreferrer">
              MIT License
            </a>
            <a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
              Contribute
            </a>
            <Link to="/demo">Demo is fictional data</Link>
            <a href={`${GITHUB_URL}#privacy`} target="_blank" rel="noopener noreferrer">
              Runs 100% locally
            </a>
          </div>
        </div>

        <div className="footer-base">
          <span>© 2026 Mahmoud Halat · Built with Claude Opus 4.8 (1M context)</span>
          <span>Fictional sample data · Not financial or tax advice</span>
        </div>
      </div>
    </footer>
  );
}
