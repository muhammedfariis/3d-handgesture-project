// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Crucial for GitHub Pages
  build: {
    outDir: 'dist',
  }
});