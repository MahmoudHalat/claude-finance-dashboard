import { Link } from "@tanstack/react-router";
import { GITHUB_URL } from "@/data/site";

export function SiteHeader() {
  return (
    <header className="nav">
      <div className="nav-in">
        <Link to="/" className="brand">
          <span className="brand-logo" aria-hidden="true">💸</span>
          FINANCE DASHBOARD
        </Link>
        <nav className="nav-links">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/blog"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            Guides
          </Link>
          <Link
            to="/prompt"
            className="nav-link"
            activeProps={{ className: "nav-link is-active" }}
          >
            The prompt
          </Link>
          <Link
            to="/demo"
            className="nav-link keep"
            activeProps={{ className: "nav-link keep is-active" }}
          >
            Live demo
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="star keep"
            aria-label="Star this project on GitHub"
          >
            <span className="st">★</span> Star
          </a>
        </nav>
      </div>
    </header>
  );
}
