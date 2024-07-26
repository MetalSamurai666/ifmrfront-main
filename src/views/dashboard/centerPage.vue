<template>
  <div class="head mb-20">
    <div class="d-flex align-items-center justify-content-between">
      <h1>Центры</h1>
    </div>
    <div class="d-flex gap-10">
      <router-link v-for="item of centerMenu" :key="item.name" :to="{ name: item.name }">
        {{ item?.meta?.title }}
      </router-link>
    </div>
  </div>
  <router-view />
</template>
<script setup>
import { centerMenu } from '@/helpers/menu/center'
</script>
<style lang=""></style>
