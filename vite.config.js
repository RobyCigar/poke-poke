import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import path from "path"
// import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    react(), 
    // visualizer({ open: true })
  ],
  server: {
    allowedHosts: ["a3e42e360d21.ngrok-free.app"],
    port: 5173
  },
  test: {
    globals: true, // Membuat API Vitest/Jest global
    environment: 'jsdom', // Lingkungan DOM untuk komponen React
    setupFiles: './src/setupTests.ts', // File setup untuk @testing-library/jest-dom
    css: true, // Memungkinkan pengujian CSS (opsional, tapi bagus untuk RTL)
    coverage: {
      reporter: ['text', 'json', 'html'], // Laporan cakupan kode (opsional)
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React libraries
          'react-core': ['react', 'react-dom', 'react-router'],

          // Map library (Leaflet is HUGE - separate it)
          'leaflet-vendor': ['leaflet', 'react-leaflet'],

          // Validation library
          'zod-vendor': ['zod'],

          // Animation library
          'motion-vendor': ['framer-motion'],

          // Sentry monitoring
          'sentry-vendor': ['@sentry/react'],

          // Other large utilities
          'utils-vendor': ['axios']
        }
      }
    },
    // Reduce chunk size further
    chunkSizeWarningLimit: 600
  },
})
