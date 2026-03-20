import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(true)
  const tagViews = ref([])
  const cachedViews = ref(['Role', 'Menu'])
  const refreshKeys = ref({})
  console.log(refreshKeys.value)

  return { isCollapse, tagViews, cachedViews, refreshKeys }
})
