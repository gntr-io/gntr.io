# GNTR Website

Professional business website built with Astro.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open http://localhost:4321
```

## 📦 What's Included

### Pages

- **Home** - Hero, services, contact form
- **Portfolio** - Project showcase
- **Blog** - Articles & posts
- **About** - Company info & values
- **Contact** - Extended contact form
- **404** - Custom error page

### Features

- ✅ Terminal-inspired design aesthetic
- ✅ Fully responsive (mobile → tablet → desktop)
- ✅ PostHog analytics integration
- ✅ Working contact forms (Web3Forms)
- ✅ SEO optimized with Open Graph tags
- ✅ Custom favicon & brand assets
- ✅ TypeScript strict mode
- ✅ SCSS with variables & mixins

### Tech Stack

- **Framework**: Astro 5.1
- **Styling**: SCSS
- **Analytics**: PostHog
- **Forms**: Web3Forms
- **Hosting**: Cloudflare Pages
- **Package Manager**: pnpm

## 🌐 Deployment

### Cloudflare Pages (Recommended)

**Quick Deploy:**
See [CLOUDFLARE.md](./CLOUDFLARE.md) for complete step-by-step guide.

1. Push to GitHub
2. Connect repo in Cloudflare Dashboard
3. Build settings: Framework = Astro, Output = dist
4. Add environment variables
5. Deploy!

**Detailed Guides:**

- [CLOUDFLARE.md](./CLOUDFLARE.md) - Complete Cloudflare Pages guide
- [SETUP.md](./SETUP.md) - Quick setup instructions
- [DEPLOYMENT.md](./DEPLOYMENT.md) - All deployment options

## 🔐 Environment Variables

Create `.env` file (copy from `.env.example`):

```env
# PostHog Analytics
PUBLIC_POSTHOG_KEY=phc_your_key_here
PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Web3Forms (Contact Forms)
PUBLIC_WEB3FORMS_KEY=your_access_key_here
```

**Get your keys:**

- PostHog: https://posthog.com/
- Web3Forms: https://web3forms.com/

## 🧞 Commands

| Command          | Action                               |
| ---------------- | ------------------------------------ |
| `pnpm install`   | Install dependencies                 |
| `pnpm dev`       | Start dev server at `localhost:4321` |
| `pnpm build`     | Build production site to `./dist/`   |
| `pnpm preview`   | Preview production build locally     |
| `pnpm astro ...` | Run Astro CLI commands               |

## 📁 Project Structure

```
gntr.io/
├── public/                 # Static assets
│   ├── favicon.svg        # Custom favicon
│   ├── logo.png          # Brand logo
│   └── og-image.svg      # Social sharing image
├── src/
│   ├── components/        # Reusable components
│   │   ├── Navigation.astro
│   │   ├── Footer.astro
│   │   └── PostHog.astro
│   ├── layouts/          # Page layouts
│   │   └── MainLayout.astro
│   ├── pages/            # File-based routing
│   │   ├── index.astro      # Home page
│   │   ├── portfolio.astro  # Portfolio
│   │   ├── about.astro      # About
│   │   ├── contact.astro    # Contact
│   │   ├── 404.astro        # Error page
│   │   └── blog/
│   │       ├── index.astro         # Blog listing
│   │       └── [slug].astro        # Blog post
│   ├── styles/           # Global styles
│   │   ├── _variables.scss  # Color palette
│   │   ├── _mixins.scss     # Breakpoints
│   │   └── global.scss      # Base styles
│   └── env.d.ts         # TypeScript declarations
├── .env.example         # Environment template
├── astro.config.mjs     # Astro configuration
├── BUILD_PLAN.md        # Development roadmap
├── CLOUDFLARE.md        # Cloudflare deployment guide
├── DEPLOYMENT.md        # All deployment options
└── SETUP.md            # Quick setup guide
```

## 🎨 Design System

### Colors

- **Carbon** (#1A1F1E) - Primary background
- **Slate** (#2D3936) - Cards, secondary backgrounds
- **Deep Green** (#0A3D2C) - Code blocks
- **Mist** (#E8F5F0) - Body text
- **White** (#FFFFFF) - Headings
- **GNTR Green** (#00FF88) - Primary CTAs, accents
- **Lime** (#C8FF00) - Hover states, highlights

### Breakpoints

- Mobile: < 768px
- Tablet: 768px+
- Desktop: 1024px+
- Wide: 1280px+

## 📊 Analytics & Forms

### PostHog

Automatically tracks:

- Page views
- Button clicks
- Form submissions
- Custom events

### Web3Forms

Contact forms send emails directly. Features:

- Spam protection
- No backend required
- Works on any hosting
- Free tier available

## 🔧 Customization

### Update Site URL

Edit `astro.config.mjs`:

```js
export default defineConfig({
  site: "https://gntr.io",
});
```

### Modify Colors

Edit `src/styles/_variables.scss`

### Add New Pages

Create `.astro` files in `src/pages/`

## 📝 License

Private - GNTR © 2025

## 🆘 Need Help?

- Check [CLOUDFLARE.md](./CLOUDFLARE.md) for deployment
- See [SETUP.md](./SETUP.md) for quick setup
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for all options
- Review [BUILD_PLAN.md](./BUILD_PLAN.md) for project details
