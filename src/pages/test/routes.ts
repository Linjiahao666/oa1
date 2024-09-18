import ApiTest from './ApiTest.vue'
export const routes = [
  {
    path: '/api-test',
    component: ApiTest,
  },
  {
    path: '/svg-test',
    component: () => import('./SvgTest.vue')
  }
]