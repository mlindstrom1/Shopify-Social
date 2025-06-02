import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

function htmlPlugin(): Plugin {
  return {
    name: 'html-transform',
    enforce: 'post',
    transformIndexHtml(html, ctx) {
      // Only transform during build
      if (!ctx.bundle) return html

      // Add base URL to asset paths
      return html.replace(
        /(src|href)="\/assets\//g,
        `$1="./assets/`
      )
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), htmlPlugin()],
  base: './',
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    sourcemap: true,
  },
})
