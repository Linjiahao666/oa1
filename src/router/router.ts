import { createWebHashHistory, createRouter } from 'vue-router'
import { routerModule } from '../types/router'
// 动态导入所有 routes.ts 文件
let rs = import.meta.glob('@/pages/**/routes.ts', { eager: true })

const routes = [
  { path: '/404', component: () => import('@/pages/404/NotFound.vue') }
]

for (const i in rs) {
  routes.push(...(rs[i] as routerModule).routes)
}
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const routeExists = routes.some(route => route.path === to.path)
  if (!routeExists) {
    next({ path: '/404', replace: true })
  } else {
    next()
  }
})

export {
  router
}