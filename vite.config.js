import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/launchlayer-finance-site/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      },
      // SPA fallback for React Router v6 deep links
      input: {
        main: 'index.html'
      }
    },
    // Generate a 404.html file that serves index.html for SPA routing
    generateBundle(options, bundle) {
      const indexHtml = bundle['index.html']
      if (indexHtml && indexHtml.type === 'asset') {
        // Create 404.html with same content as index.html for GitHub Pages SPA support
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: indexHtml.source
        })
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    // SPA fallback for development
    historyApiFallback: true
  },
  preview: {
    port: 3000,
    host: true,
    // SPA fallback for preview
    historyApiFallback: true
  }
})
