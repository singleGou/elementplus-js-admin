import { getInfo as getMenuList } from '@/api/menu/index'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePermissionStore = defineStore('permission', () => {
  const menuList = ref([])
  const permissions = ref([])

  async function getInfo() {
    const { data } = await getMenuList()
    menuList.value = data?.routers
    permissions.value = data?.permissions
  }

  return { menuList, getInfo }
})
