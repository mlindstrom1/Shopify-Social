import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

function htmlPlugin(): Plugin {
  return {
    name: 'html-transform',
    enforce: 'post',
    transformIndexHtml(html) {
      // Add base URL to all asset paths
      return html
        .replace(/(src|href)="\/assets\//g, '$1="/Shopify-Social/assets/')
        .replace(/(src|href)="\/Shopify-Social\/assets\//g, '$1="/Shopify-Social/assets/')
        .replace(/(modulepreload|stylesheet)" crossorigin href="\/assets\//g, '$1" crossorigin href="/Shopify-Social/assets/')
        .replace(/src="\/src\//g, 'src="/Shopify-Social/src/')
        .replace(/from "\/src\//g, 'from "/Shopify-Social/src/"')
        .replace(/import "\/src\//g, 'import "/Shopify-Social/src/"')
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), htmlPlugin()],
  base: '/Shopify-Social/',
  define: {
    global: 'globalThis',
  },
  server: {
    fs: {
      strict: true,
    },
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
        assetFileNames: (assetInfo) => {
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    sourcemap: true,
  },
})
