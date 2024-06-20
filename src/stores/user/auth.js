import { ref } from 'vue'
import { defineStore } from 'pinia'
import cookies from 'vue-cookies'

import { api } from '@/helpers/api'
import router from '../../router'
import { useRoute } from 'vue-router'
export const authStore = defineStore('authStore', () => {
  const user = ref({})
  const login = async (data) => {
    let result = await api({
      method: 'post',
      url: 'auth/login',
      data
    })
    console.log(result.data)
    if (result.status == 200) {
      cookies.set('sitetoken', result.data?.token)
      user.value = { ...result.data?.user }
      router.push({ name: 'dashboard' })
    }
  }
  const route = useRoute()
  const checkUser = async () => {
    if (cookies.get('sitetoken')) {
      let res = await api({
        url: 'auth/checkuser'
      }).catch((e) => {
        console.log(e)
      })
      console.log(res.data)
      // console.log(route?.meta)

      user.value = { ...res.data }
      return res
    }
    router.push({ name: 'login' })
  }

  const logout = () => {
    cookies.remove('sitetoken')
    router.push({ name: 'home' })
  }

  return {
    user,
    logout,
    checkUser,
    login
  }
})
