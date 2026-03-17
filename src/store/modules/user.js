import { resetRouter } from '@/router'
import { removeToken } from '@/utils/auth'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref('')
  const avatar = ref('')
  const username = ref('')
  const roles = ref([])

  async function getUserInfo() {
    return new Promise((resolve, reject) => {
      getUserInfo({ username: username.value })
        .then((response) => {
          const { data } = response

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { roles, username, avatar } = data

          // roles must be a non-empty array
          if (!roles || !roles?.length) {
            reject('getInfo: roles must be a non-null array!')
          }

          roles.value = roles
          username.value = username
          avatar.value = avatar
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async function resetToken() {
    return new Promise((resolve) => {
      token.value = ''
      roles.value = []
      removeToken(token)
      resetRouter()
      resolve()
    })
  }

  return { token, avatar, username, roles, getUserInfo, resetToken }
})
