import { configDefaults, defineConfig } from 'vitest/config';
import { ripple } from 'vite-plugin-ripple';
import path from "node:path";

export default defineConfig({
	plugins: [ripple()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		include: [
			'tests/**/*.test.ts',
			'src/**/*.test.js',
			'tests/**/*.test.ripple',
			'tests/**/*.test.js',
		],
		deps: {
			inline: ['ripple'],
		},
		environment: 'jsdom',
		...configDefaults.test,
	},
});
