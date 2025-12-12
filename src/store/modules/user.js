import { resetRouter } from '@/router'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const avatar = ref('')
  const username = ref('')
  const roles = ref([])

  async function resetToken() {
    resetRouter()
  }

  return { token, avatar, username, roles, resetToken }
})
