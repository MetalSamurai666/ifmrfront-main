<template>
  <aside>
    <router-link to="/dashboard" class="logo">
      <img src="@/assets/logo/ru_light.svg" alt="ru_light.svg" />
    </router-link>
    <div class="links">
      <!-- <router-link
        to="/dashboard"
        :class="{
          link: true,
          active: route.name == 'dashboard'
        }"
      >
        <el-icon>
          <house />
        </el-icon>
        <span>Главная</span>
      </router-link> -->
      <div v-for="(gr, gr_index) of group" :key="gr_index" class="links__group">
        <div class="title">{{ gr.label }}</div>
        <router-link
          v-for="(item, index) of menu.filter((it) => it?.meta?.group == gr.name)"
          :key="index"
          :index="`/${item.name}`"
          :class="{
            link: true,
            active: route.name == item.name
          }"
          :to="{ name: item.name }"
        >
          <el-icon>
            <component :is="item?.meta.icon" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </router-link>
      </div>
      <el-button @click="logout" class="logout" type="danger">
        <el-icon class="mr-10"> <switch-button /> </el-icon>
        Выйти
      </el-button>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
const route = useRoute()
import { authStore } from '@/stores/user/auth'
import menu from '@/helpers/menu/main'
import group from '@/helpers/menu/group'

const auth_Store = authStore()
const { user } = storeToRefs(auth_Store)

const logout = () => {
  if (confirm('Вы уверены?')) {
    auth_Store.logout()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/layout/aside.scss';
</style>
