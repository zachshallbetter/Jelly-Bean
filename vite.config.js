// vite.config.js
const { resolve } = require('path');
const { createVuePlugin } = require('@vitejs/plugin-vue');

module.exports = {
  plugins: [createVuePlugin()],
  build: {
    rollupOptions: {
      external: ['electron'],
    },
    emptyOutDir: true,
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
};
