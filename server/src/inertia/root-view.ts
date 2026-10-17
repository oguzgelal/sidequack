import { serializePage, type RootView } from "@hono/inertia";

const assets = import.meta.env.PROD
  ? `<link rel="stylesheet" href="/static/client.css" />
    <script type="module" src="/static/client.js"></script>`
  : `<script type="module" src="/@vite/client"></script>
    <script type="module" src="/src/inertia/client.tsx"></script>`;

export const rootView: RootView = (page) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover"
    />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
    ${assets}
  </head>
  <body>
    <script data-page="app" type="application/json">${serializePage(page)}</script>
    <div id="app"></div>
  </body>
</html>`;
