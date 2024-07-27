import { createApp } from 'vue'
import App from './App.vue'
import '@/style/index.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { router } from '@/router/router'
import directives from '@/directives/index.ts'
import './index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.use(directives)
app.mount('#app')