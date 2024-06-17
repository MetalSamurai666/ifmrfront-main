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
import headerPart from '@/components/layout/header-part.vue'
import asidePart from '@/components/layout/aside-part.vue'
import { authStore } from '@/stores/user/auth'
import { onMounted } from 'vue'
const store = authStore()

onMounted(async () => {
  await store.checkUser()
})
</script>

<style lang="scss">
@import '@/assets/style/layout/main.scss';
</style>
