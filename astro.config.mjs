// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://daedwards06.github.io',
	base: '/Portfolio/',
	integrations: [sitemap()],
});
