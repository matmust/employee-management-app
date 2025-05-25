import { defineConfig } from 'vite';

export default defineConfig({
  // Enable HMR for LitElement
  server: {
    port: 3000,
    open: true
  },
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Enable source maps
    sourcemap: true,
    // Configure rollup options (Vite uses Rollup under the hood)
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  }
}); 