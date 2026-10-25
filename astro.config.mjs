import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Production site: https://permitdrills.com/ (GitHub Pages + custom domain)
export default defineConfig({
  site: 'https://permitdrills.com',
  base: '/',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
