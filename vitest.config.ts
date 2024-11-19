import { defineConfig } from 'vitest/config';

/* ========================================================================== */

export default defineConfig({
	test: {
		alias: {
			'@utils': '/utils',
		},
		include: ['**/*.test.ts']
	}
});
