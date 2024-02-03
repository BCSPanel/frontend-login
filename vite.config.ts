import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 监听所有地址，包括局域网与公网
    host: '0.0.0.0',
  },
  base: './',
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      threshold: 1024,
      verbose: false,
      deleteOriginFile: false
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
