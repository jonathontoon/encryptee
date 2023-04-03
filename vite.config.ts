import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// https://github.com/sveltejs/kit/issues/9528#issuecomment-1493912401
	worker: {
		plugins: [
			{
				name: 'remove-manifest',
				configResolved(c) {
					const manifestPlugin = c.worker.plugins.findIndex((p) => p.name === 'vite:manifest');
					c.worker.plugins.splice(manifestPlugin, 1);
					const ssrManifestPlugin = c.worker.plugins.findIndex((p) => p.name === 'vite:ssr-manifest');
					c.plugins?.slice(ssrManifestPlugin, 1);
				}
			}
		]
	}
});
