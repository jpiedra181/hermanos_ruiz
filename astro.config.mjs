// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Set your production domain to get absolute canonical/hreflang/og:image URLs.
	// site: 'https://www.example.com',
	build: {
		// One request less on first paint: the whole stylesheet is small once gzipped.
		inlineStylesheets: 'always',
	},
});
