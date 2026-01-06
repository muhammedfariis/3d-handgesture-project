// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './index.html', // Crucial for GitHub Pages
  build: {
    outDir: 'dist',
  }
});