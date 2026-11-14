import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('.'),
    },
  },
  server: {
    port: 5173,
    host: 'localhost',
    watch: {
      ignored: ['**/*.zip', '**/FUR/**', '**/dist/**', '**/.git/**'],
    },
  },
  preview: {
    port: 5173,
    host: 'localhost',
  },
});
