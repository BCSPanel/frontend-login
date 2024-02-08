import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 监听所有地址（包括局域网与公网），方便内网调试
    host: '0.0.0.0',
  },
  base: './',
  plugins: [
    viteCompression({
      algorithm: 'gzip',
      threshold: 0,
      verbose: true,
      deleteOriginFile: false,
      filter: /\.(js|json|css)$/i
    }),
    {
      // script执行前阻止网页渲染
      // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script
      // https://segmentfault.com/q/1010000042185350
      name: "scriptBlockingRender",
      transformIndexHtml(html) {
        return html.replaceAll(
          '<script type="module"',
          '<script type="module" blocking="render" async'
        );
      }
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    reportCompressedSize: false,
  }
})
