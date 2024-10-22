import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import { viteMockServe } from "vite-plugin-mock";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ElementPlus({ resolver: [ElementPlusResolver()] }),
    AutoImport({
      imports: ["vue"],
      resolvers: [ElementPlusResolver() /*IconsResolver({ prefix: 'Icon' })*/],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(/*{ importStyle: 'sass' }*/) /*IconsResolver({ enabledCollections: ['ep'] })*/,
      ],
    }),
    // Icons({
    //   autoInstall: true,
    // }),
    viteMockServe({
      mockPath: "./src/mock", // mock 文件夹路径
      localEnabled: true, // 是否启用本地 mock
    } as any),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
});
