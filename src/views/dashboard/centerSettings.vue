<template>
  <el-row :gutter="30">
    <el-col :span="4">
      <div class="head mb-20">
        <div class="d-flex align-items-center justify-content-between">
          <h1>Настройки</h1>
        </div>
      </div>
      <router-link
        v-for="item of centerMenu"
        :key="item.name"
        :to="`/dashboard/center-settings/${item.path}`"
        class="settings__box"
        :class="{
          active: route.name == item.name
        }"
      >
        {{ item?.meta?.title }}
      </router-link>
    </el-col>
    <el-col :span="20">
      <router-view />
    </el-col>
  </el-row>
</template>
<script setup>
const route = useRoute()

import { centerMenu } from '@/helpers/menu/center'
import { useRoute } from 'vue-router'
</script>
<style lang="scss">
.settings {
  &__box {
    border: 1px solid #e4e4e4;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    background: #fff;
    &.active {
      background-color: #277a35;
      color: #fff;
    }
  }
}
</style>
