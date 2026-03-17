// 匹配 views 里面所有的 .vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

// 将本地路由与后端路由进行匹配
export const loadView = (view) => {
  let res
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0]
    if (dir === view) {
      // res = () => modules[path]
      // modules[path] 本身就是一个懒加载函数
      return modules[path]
    }
  }
  // return res
  console.warn(`View not found: ${view}`)
  return null
}

export const filterRoute = (data) => {
  // data.forEach((item) => {
  //   if (item.children?.length && item.menu_type === 1) {
  //     delete item.component
  //     filterRoute(item.children)
  //   } else {
  //     item.component = loadView(item.component)
  //     delete item.children
  //   }
  // })
  // return data
  return data.map((item) => {
    const route = {
      path: item.path,
      name: item.name,
      icon: item.icon,
      meta: item.meta || {},
    }

    if (item.children?.length && item.menu_type === 1) {
      route.children = filterRoute(item.children) // 递归处理子路由
    } else if (item.component) {
      route.component = loadView(item.component)
    }

    return route
  })
}
