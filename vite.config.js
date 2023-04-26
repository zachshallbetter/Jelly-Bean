import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: './',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['electron'],
  },
})