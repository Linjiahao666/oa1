import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteMockServe({
      mockPath: './src/mock', // mock 文件夹路径
      localEnabled: true, // 是否启用本地 mock
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  // server: {
  //   proxy: {
  //     '/user': {
  //       target: 'http://localhost:3000/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/user/, '')
  //     }
  //   }
  // }
})
