import { useUserStore } from '@/store'
import { getToken } from '@/utils/auth'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const service = axios.create({
  baseURL: '',
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // const userStore = useUserStore()
    if (getToken()) {
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, description } = response.data
    if (code === 200) {
      return response.data
    }

    ElMessage.error(description || 'Error')
    return Promise.reject(new Error(description || 'Error'))
  },
  (error) => {
    if (error.response.data) {
      const { code, description } = error.response.data
      if (code === 403) {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          const userStore = useUserStore()
          userStore.resetToken()
        })
      } else {
        ElMessage.error(description || 'Error')
      }
    }

    return Promise.reject(error.message)
  }
)

export default service
