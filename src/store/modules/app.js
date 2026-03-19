import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isCollapse = ref(true)
  const navTags = ref([])

  return { isCollapse, navTags }
})
