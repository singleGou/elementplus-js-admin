import { usePermissionStore, useUserStore } from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import { getToken } from './utils/auth'
import { filterRoute } from './utils/filterRouters'

NProgress.configure({
  showSpinner: false,
})

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const userStore = useUserStore()
      // // determine whether the user has obtained his permission roles through getUserInfo
      // const hasRole = userStore.roles?.length
      // if (hasRole) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     // await userStore.getUserInfo()

      //     // generate routes
      //     const permissionStore = usePermissionStore()
      //     await permissionStore.getInfo()

      //     const routers = filterRoute(permissionStore.menuList)
      //     routers.forEach((item) => {
      //       router.addRoute(item)
      //     })

      //     // 添加完路由需要重新执行一次路由跳转，否则会出现空白页面
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     console.error(error)
      //     // remove token and go to login page to re-login
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }

      const permissionStore = usePermissionStore()

      // 已经获取菜单路由直接放行
      if (permissionStore.menuList.length) {
        next()
        return
      }

      try {
        // 获取菜单路由
        await permissionStore.getInfo()
        // 处理成符合 vue 路由格式的路由
        const routers = filterRoute(permissionStore.menuList)
        // 循环添加路由到父路由下
        routers.forEach((route) => {
          router.addRoute('Index', route)
        })
        console.log(routers)
        // 添加完路由需要重新执行一次路由跳转，否则会出现空白页面
        next({ ...to, replace: true })
      } catch (error) {
        console.error(error)
        // remove token and go to login page to re-login
        const userStore = useUserStore()
        await userStore.resetToken()
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    /** has no token */

    if (whiteList.includes(to.path)) {
      // in the free login whiteList, go directly
      next()
    } else {
      // other pages that do no have permission to access are redireted to the login page
      next({ path: `/login?redirect=${to.path}` })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
