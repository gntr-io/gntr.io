# gntr.io

Business website for GNTR — a digital solutions company offering web development, e-commerce, mobile apps, MCP servers, and AI integration.

## Stack

- **Framework:** Astro 5 (static output)
- **Styles:** SCSS with variables and mixins
- **Hosting:** Cloudflare Pages
- **Forms:** Web3Forms
- **Analytics:** PostHog

## Structure

```
src/
├── components/       # Navigation, Footer, PostHog
├── content/blog/     # Blog posts as markdown files
├── layouts/          # MainLayout (wraps all pages)
├── pages/            # Routes: index, about, portfolio, contact, blog, 404
├── styles/           # _variables.scss, _mixins.scss, global.scss
└── utils/            # Shared utilities (formSubmit.ts)
```
