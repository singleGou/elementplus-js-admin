import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}

export const getUserList = () => {
  return request({
    url: '/api/user/list',
    method: 'get',
  })
}
