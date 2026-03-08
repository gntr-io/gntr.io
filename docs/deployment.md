# Deployment

The site deploys automatically to Cloudflare Pages on push to `main`.

- Build command: `pnpm build`
- Output directory: `dist/`
- Config: `wrangler.toml`

Environment variables must be set in the Cloudflare Pages dashboard under **Settings → Environment Variables**.

## Git Workflow

- Branch from `main` for all changes
- Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`
- Open a PR — do not push directly to `main`
- Bump `version` in `package.json` and `src/pages/about.astro` together when merging significant changes
