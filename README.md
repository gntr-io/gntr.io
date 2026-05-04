# gntr.io

gntr on the web. Built with Astro, deployed to Cloudflare Pages.

## Setup

```bash
pnpm install
pnpm dev       # http://localhost:4321
```

## Commands

| Command        | Action                       |
|----------------|------------------------------|
| `pnpm dev`     | Dev server at localhost:4321 |
| `pnpm build`   | Build to `./dist/`           |
| `pnpm preview` | Preview production build     |

## Environment Variables

```env
PUBLIC_POSTHOG_KEY=
PUBLIC_POSTHOG_HOST=
PUBLIC_WEB3FORMS_KEY=
```

## Deployment

Auto-deploys to Cloudflare Pages on push to `main`. See `docs/deployment.md`.

## Stack

Astro · SCSS · PostHog · Web3Forms · Cloudflare Pages · pnpm

---

Private — gntr © 2026
