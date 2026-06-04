import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function DefaultErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backgroundColor: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: "480px", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            color: "var(--green)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          Error
        </div>
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "var(--txt)",
            marginBottom: "0.5rem",
          }}
        >
          Something went wrong
        </h1>
        <p style={{ fontSize: "0.875rem", color: "var(--dim)" }}>
          An unexpected error occurred. Please try again.
        </p>
        {import.meta.env.DEV && error?.message && (
          <pre
            style={{
              marginTop: "1rem",
              maxHeight: "160px",
              overflow: "auto",
              border: "1px solid var(--grid2)",
              backgroundColor: "var(--panel)",
              padding: "0.75rem",
              textAlign: "left",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "12px",
              color: "var(--red)",
            }}
          >
            {error.message}
          </pre>
        )}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            style={{
              border: "1px solid var(--green)",
              padding: "0.5rem 1rem",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--green)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              border: "1px solid var(--grid2)",
              padding: "0.5rem 1rem",
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--txt)",
            }}
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent,
  });
  return router;
};
