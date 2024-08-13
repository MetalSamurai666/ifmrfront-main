<template>
  <div class="app">
    <aside-part />
    <div class="wrapper">
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import cookies from 'vue-cookies'
import asidePart from '@/components/layout/aside-part.vue'
import { authStore } from '@/stores/user/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const store = authStore()
const router = useRouter()
onMounted(async () => {
  if (cookies.get('sitetoken')) {
    return await store.checkUser()
  }
  router.push({ name: 'login' })
})
</script>

<style lang="scss">
@import '@/assets/style/layout/main.scss';
</style>
