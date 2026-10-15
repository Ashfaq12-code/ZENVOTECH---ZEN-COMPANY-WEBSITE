import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Long-lived vendor chunks. Function form only names a chunk for matching
// node_modules, so a vendor that is reached only through a dynamic import
// (supabase-js) stays out of the entry and loads on first use.
const vendorChunks: Array<[RegExp, string]> = [
  // Vite's dynamic-import helper is shared by the entry and supabase-js; pin it to an
  // always-loaded chunk or Rollup hoists it into the lazy supabase chunk and the entry
  // ends up importing supabase statically.
  [/vite\/preload-helper/, 'react'],
  [/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/, 'react'],
  [/[\\/]node_modules[\\/]@supabase[\\/]/, 'supabase'],
  [/[\\/]node_modules[\\/]@emailjs[\\/]/, 'emailjs'],
  [/[\\/]node_modules[\\/]lucide-react[\\/]/, 'lucide'],
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          return vendorChunks.find(([pattern]) => pattern.test(id))?.[1];
        },
      },
    },
  },
});
