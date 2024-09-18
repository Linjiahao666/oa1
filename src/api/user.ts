import { req } from './request'
export function login(phone: string, pwd: string): Promise<any> {
  return req.request({
    url: '/auth/login',
    method: 'post',
    data: {
      phone,
      pwd
    }
  })
}

export function getUserInfo(id: number): Promise<any> {
  return req.request({
    url: `/user/${id}`,
    method: 'get'
  })
}