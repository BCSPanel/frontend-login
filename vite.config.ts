import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		// 监听所有地址（包括局域网与公网），方便内网调试
		host: '0.0.0.0',
	},
	base: './',
	build: {
		target: 'es2023',
		minify: 'terser',
		reportCompressedSize: false, // 是否使用vite自带的方式打印压缩后的大小
		rollupOptions: {
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
				manualChunks(id) {
					if (id.includes("/node_modules/")) {
						return "node_modules"
					}
				},
			}
		},
		modulePreload: {
			polyfill: false,
		},
		chunkSizeWarningLimit: Infinity,
		cssCodeSplit: true,
		assetsInlineLimit: 0,
	}
})
