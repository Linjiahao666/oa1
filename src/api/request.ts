import axios from 'axios'
import { router } from '@/router/router.ts';
const req = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3000/',
})

// req.interceptors.request.use(config => {

// })

let promise: any = null;

export async function getAccessToken() {
  if (!promise) {
    promise = new Promise(async resolve => {
      const res = await req.request({
        method: 'post',
        url: '/auth/refresh',
        __isRefresh: true
      } as any)
      res && resolve(res.status === 200)
      resolve(false)
    })
  }
  promise.finally(() => {
    promise = null
  })
  return promise
}

req.interceptors.response.use(response => {
  return response
},
  async error => {
    if (error.response.status === 401 && !error.config.__isRefresh) {
      const originnalRequest = error.config;
      const isRefreshSuccess = await getAccessToken();
      let res;
      if (!isRefreshSuccess) {
        router.push('/user/login')
      } else {
        res = await req.request(originnalRequest)
        return res
      }
    }
  }
)

export {
  req,
}