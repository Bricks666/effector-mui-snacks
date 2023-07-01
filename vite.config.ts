/* eslint-disable import/no-extraneous-dependencies */
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'index',
			formats: ['es'],
			fileName: 'index',
		},
		rollupOptions: {
			external: ['react', '@mui/material', 'effector', 'effector-react'],
		},
	},
	plugins: [
		react(),
		dts({
			exclude: ['*.spec.*'],
		})
	],
});
