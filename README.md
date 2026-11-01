# Ido Weissman · Portfolio

My personal portfolio: a fast, accessible, one-page static site.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · deployed on Vercel

- Light and dark mode (follows the system setting, with a manual toggle that is remembered)
- Fully responsive, from 320px phones up to wide desktops
- Lighthouse (mobile): 100 performance · 100 accessibility · 100 best practices · 100 SEO
- SEO meta tags, Open Graph / Twitter card, JSON-LD `Person` schema
- All content in **one data file**

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build locally
```

## Updating content

Everything on the page comes from [`src/data/content.ts`](src/data/content.ts):

| Export       | What it controls                                                     |
| ------------ | -------------------------------------------------------------------- |
| `site`       | Production URL, page title, meta description, OG image path         |
| `profile`    | Name, title, pitch, location, availability badge, photo, CV, links  |
| `about`      | About paragraphs, stat tiles, education, languages                  |
| `experience` | Roles (title, company, period, bullets)                              |
| `projects`   | Project cards (description, tags, screenshot, repo + demo links)     |
| `skills`     | Skill groups                                                         |
| `contact`    | Contact heading and text                                             |

Wrap text in `**double asterisks**` to make it bold.

The `<title>`, description, canonical URL, Open Graph tags and JSON-LD in `index.html` are filled in at build time from `site` and `profile` (see the `seoMeta` plugin in [`vite.config.ts`](vite.config.ts)), so they stay in sync with the content.

### Adding a project

1. Save a screenshot in `public/projects/`. A 16:9 `.webp` around 1280×720 works best.
2. Add an entry to `projects`:

   ```ts
   {
     name: 'My App',
     description: 'What it does and what I built.',
     tags: ['React', 'Firebase'],
     image: '/projects/my-app.webp',
     repo: 'https://github.com/IdoWeissman/my-app',
     demo: 'https://my-app.vercel.app',
   }
   ```

   `image`, `repo` and `demo` are all optional. Cards without an image show a styled placeholder.

### Updating the CV

Replace `public/Ido_Weissman_CV.pdf`. If you change the file name, update `profile.cv` too.

### Photo, Open Graph image and icons

These are generated from `assets-src/profile.jpg` by [`scripts/generate-assets.mjs`](scripts/generate-assets.mjs):

```bash
npm run assets
```

This writes `public/profile.webp`, `public/profile-sm.webp`, `public/og-image.png` (1200×630) and `public/apple-touch-icon.png`. Re-run it after you replace the photo or change your name or title (the OG image text is set at the top of the script). If you use a new photo, adjust the crop coordinates in the script.

## Deploying to Vercel

1. Push the repo to GitHub.
2. In Vercel, go to **Add New → Project**, import the repo and keep the detected **Vite** preset (build command `npm run build`, output directory `dist`).
3. Deploy.
4. Set `site.url` in `content.ts` to the real production URL (for example `https://ido-weissman.vercel.app`, or your custom domain later) and push again. Open Graph previews need this URL to be absolute and correct.

`vercel.json` adds long-term caching headers for the hashed files in `/assets`.

To check link previews after deploying, use [opengraph.xyz](https://www.opengraph.xyz/) or LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/).

## Project structure

```
├── assets-src/profile.jpg     # source photo (not served)
├── public/                    # static files served as-is (CV, images, favicon)
├── scripts/generate-assets.mjs
├── src/
│   ├── data/content.ts        # ← all site content
│   ├── components/            # Header, Hero, About, Experience, Projects, Skills, Contact
│   ├── App.tsx
│   ├── index.css              # Tailwind + theme tokens (accent color, dark mode)
│   └── main.tsx
├── index.html                 # meta tags filled from content.ts at build time
└── vite.config.ts
```

## Customizing the theme

The accent color is defined in `src/index.css` as CSS variables: `#2E7D5B` in light mode, and a lighter `#5FB88F` in dark mode so text keeps WCAG AA contrast. Use the `accent`, `accent-soft` and `on-accent` Tailwind colors in components.
