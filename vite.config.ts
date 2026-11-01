import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { profile, site } from './src/data/content.ts'

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Fills %TOKENS% in index.html from src/data/content.ts so SEO tags stay in sync with the content.
function seoMeta(): Plugin {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    url: site.url,
    image: site.url + profile.photo,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: profile.location },
    sameAs: [profile.github, profile.linkedin],
  }).replace(/</g, '\u003c')
  const tokens: Record<string, string> = {
    TITLE: escape(site.title),
    DESCRIPTION: escape(site.description),
    URL: site.url + '/',
    OG_IMAGE: site.url + site.ogImage,
    OG_IMAGE_ALT: escape(`${profile.name}, ${profile.title}`),
    NAME: escape(profile.name),
    LOCALE: site.locale,
    JSON_LD: jsonLd,
  }
  return {
    name: 'seo-meta',
    transformIndexHtml: (html) => html.replace(/%(\w+)%/g, (m, key: string) => tokens[key] ?? m),
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoMeta()],
})
