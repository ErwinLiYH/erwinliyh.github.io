import { defineConfig } from 'astro/config';

// GitHub Actions supplies the actual Pages origin and repository prefix.
export default defineConfig({
  site: process.env.SITE_URL || 'https://erwinliyh.github.io',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  build: { format: 'directory' },
});
