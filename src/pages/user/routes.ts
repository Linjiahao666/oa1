export const routes = [
  {
    path: '/user/login',
    component: () => import('./pages/UserLogin.vue')
  },
  {
    path: '/user/sign',
    component: () => import('./pages/UserSign.vue')
  },
  {
    path: '/user/auth',
    component: () => import('./pages/Auth.vue')
  }
]