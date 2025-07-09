import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/style.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src/'
    },
  },
  build: {
    outDir: '../server/dist',
    emptyOutDir: true
  },
  server:{
    proxy:{
      '/api': {
        target: 'http://127.0.0.1:42000',
        changeOrigin: true
      }
    },
  }
})
