import { createWebHashHistory, createRouter } from 'vue-router'
import NotFound from '@/pages/404/NotFound.vue'

import { routerModule } from '../types/router'
// 动态导入所有 routes.ts 文件
let rs = import.meta.glob('@/pages/**/routes.ts', { eager: true })

const routes = [
  { path: '/404', component: NotFound }
]

for (const i in rs) {
  routes.push(...(rs[i] as routerModule).routes)
}
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export {
  router
}