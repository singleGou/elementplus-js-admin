import request from '@/utils/request'

export const getCaptcha = () => {
  return request({
    url: '/api/user/captcha',
    method: 'get',
  })
}

export const login = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

export const register = (data) => {
  return request({
    url: '/api/user/register',
    method: 'post',
    data,
  })
}

export const getUserInfo = (username) => {
  return request({
    url: '/api/user',
    method: 'get',
    data: { username },
  })
}

export const getUserList = () => {
  return request({
    url: '/api/user',
    method: 'get',
  })
}
