import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import devServer from "@hono/vite-dev-server";
import nodeAdapter from "@hono/vite-dev-server/node";
import build from "@hono/vite-build/node";
import { inertiaPages } from "@hono/inertia/vite";

const entry = "src/index.ts";

export default defineConfig(({ mode }) => ({
  base: mode === "client" ? "/static/" : "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  plugins:
    mode === "client"
      ? [tailwindcss()]
      : [
          tailwindcss(),
          inertiaPages({
            pagesDir: "src/pages",
            outFile: "src/pages.gen.ts",
            serverModule: "./index",
          }),
          devServer({ entry, adapter: nodeAdapter }),
          build({ entry, port: 3000, staticRoot: "./dist" }),
        ],
  build:
    mode === "client"
      ? {
          outDir: "dist/static",
          rollupOptions: {
            input: "src/inertia/client.tsx",
            output: {
              entryFileNames: "client.js",
              assetFileNames: "[name][extname]",
            },
          },
        }
      : undefined,
}));
