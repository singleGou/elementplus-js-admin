import Layout from '@/layout/index.vue'
import { createRouter, createWebHistory } from 'vue-router'

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页' },
      },
      {
        path: 'user/list',
        name: 'UserList',
        component: () => import('@/views/user/list/index.vue'),
        meta: { title: '用户列表' },
      },
      {
        path: 'user/role',
        name: 'UserRole',
        component: () => import('@/views/user/role/index.vue'),
        meta: { title: '角色权限' },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

/**
 * 重置路由
 */
export function resetRouter() {
  router.replace({ path: '/login' })
  location.reload()
}

export default router
