import { useUserStore } from '@/store'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const service = axios.create({
  baseURL: '',
  timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    console.log(userStore.token)
    if (userStore.token) {
      config.headers.token = userStore.token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code === 200) {
      return response.data
    }

    ElMessage.error(message || 'Error')
    return Promise.reject(new Error(message || 'Error'))
  },
  (error) => {
    if (error.response.data) {
      const { code, message } = error.response.data
      if (code === 500) {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
          localStorage.clear() // @vueuse/core 自动导入
          window.location.href = '/'
        })
      } else {
        ElMessage.error(message || 'Error')
      }
    }

    return Promise.reject(error.message)
  }
)

export default service
