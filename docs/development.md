# Development

## Requirements

- Node.js 20+
- pnpm

## Setup

```bash
pnpm install
cp .env.example .env   # fill in your keys
```

## Environment Variables

| Variable | Description |
|---|---|
| `PUBLIC_POSTHOG_KEY` | PostHog project API key |
| `PUBLIC_POSTHOG_HOST` | PostHog instance URL |
| `PUBLIC_WEB3FORMS_KEY` | Web3Forms access key for contact forms |

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server at `http://localhost:4321` with hot reload |
| `pnpm build` | Build static output to `dist/` |
| `pnpm preview` | Serve the built `dist/` locally (requires build first) |

Use `pnpm dev` for day-to-day development. Run `pnpm build` before pushing to confirm the build passes.

## Adding a Blog Post

Create a markdown file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A short description."
date: "2026-01-01"
readTime: "5 min"
category: "Web Dev"
---

Your content here.
```

The post will be available at `/blog/your-file-name`.
