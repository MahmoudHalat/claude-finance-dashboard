import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  define: {
    __BUILD_VERSION__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    port: 5180,
    host: "::",
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    // tanstackStart() bundles the TanStack Router plugin internally —
    // don't add TanStackRouterVite separately (duplicate transforms).
    tanstackStart(),
    react(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
  ],
});
