import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  const base = isProduction ? '/Shopify-Social/' : '/'
  
  return {
    plugins: [react()],
    define: {
      global: 'globalThis',
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
            if (assetInfo.name === 'vite.svg') {
              return '[name][extname]'
            }
            return 'assets/[name]-[hash][extname]'
          },
        },
      },
    },
    base,
    publicDir: 'public',
  }
})
