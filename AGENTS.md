This is a pnpm workspaces monorepo:

- `client/` — Expo/React Native TV app (react-native-tvos). Prioritize TV/mobile-first patterns, performance, and cross-platform compatibility. All Expo guidance below applies to `client/`; run its commands from there.
- `server/` — Node.js backend on Hono with Prisma + Postgres and Better Auth. Code is layered: `src/routes` → `src/controllers` → `src/services`, zod schemas in `src/schemas`. Server-rendered pages are React via `@hono/inertia` in `src/pages`, built from shadcn/ui components (`src/components/ui`); the server runs under Vite (`pnpm dev`).

Every package script is mirrored in the root `package.json` as `c:<script>` (client) or `s:<script>` (server), e.g. `pnpm s:dev`, `pnpm c:tv`. Add new scripts to the package's `package.json` first, then mirror them at the root.

`react-native` is overridden to the tvOS fork in `pnpm-workspace.yaml`; keep it that way so only one React Native copy is installed.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

This repo uses pnpm (`pnpm-lock.yaml` at the root). Run these from `client/`.

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
