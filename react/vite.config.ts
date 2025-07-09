import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' 
    ? '/'                        // dev server root
    : '/static/',                // production build path
  plugins: [react()],
  optimizeDeps: { exclude: ['lucide-react'] },
  build: {
    outDir: resolve(__dirname, '../django/static'), // Output directory for Django
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        entryFileNames: '[name].js', // Removes hash from entry files
        chunkFileNames: '[name].js', // Removes hash from chunk files
        assetFileNames: '[name].[ext]', // Removes hash from asset files
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Django backend URL
        changeOrigin: true,
        secure: false,
      },
      '/media': {
        target: 'http://127.0.0.1:8000', // Django backend URL
        changeOrigin: true,
      },
      '/static': {
        target: 'http://127.0.0.1:8000', // Django backend URL
        changeOrigin: true,
      },
    },
  },
}));
