import request from '@/utils/request'

// 获取路由及权限
export const getInfo = () => {
  return request({
    url: '/api/menu/getInfo',
    method: 'post',
  })
}
