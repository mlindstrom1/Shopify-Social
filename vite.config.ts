import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  const base = isProduction ? '/Shopify-Social/' : '/'
  
  return {
    plugins: [react()],
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
          entryFileNames: (assetInfo) => {
            return `assets/[name].[hash].js`
          },
          chunkFileNames: (assetInfo) => {
            return `assets/[name].[hash].js`
          },
          assetFileNames: (assetInfo) => {
            return `assets/[name].[hash].[ext]`
          }
        },
      },
      sourcemap: true,
    },
    base,
    experimental: {
      renderBuiltUrl(filename: string, { hostType, type }) {
        if (type === 'public') {
          return `${base}${filename}`
        }
        return `${base}${filename}`
      }
    },
    publicDir: 'public',
  }
})
