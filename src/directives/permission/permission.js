import { usePermissionStore } from '@/store'

export function permission(el, binding) {
  const permissionStore = usePermissionStore()
  const { value } = binding

  if (!value) {
    throw new Error(`请传入权限标识`)
  }
  // 字符串权限标识
  if (typeof value === 'string') {
    // 没有权限标识，移除元素
    if (!permissionStore.permissions.includes(value)) {
      el.parentNode?.removeChild(el)
    }
    return
  }
  // 数组权限标识
  if (Array.isArray(value)) {
    // 没有权限标识，移除元素
    if (!value.some((item) => permissionStore.permissions.includes(item))) {
      el.parentNode?.removeChild(el)
    }
    return
  }

  throw new Error(`权限标识必须是字符串或数组`)
}
