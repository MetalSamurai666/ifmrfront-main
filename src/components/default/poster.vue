<script setup>
defineProps(['poster'])
import { url } from '@/helpers/api'
import { computed } from 'vue'

const getImageUrl = (path) => {
  return new URL(`/src/assets/img/${path}`, import.meta.url)
}
</script>

<template>
  <div
    :class="poster?.alt ? 'poster alt' : 'poster'"
    :style="{
      backgroundImage:
        poster?.head?.length > 0
          ? `url('${getImageUrl(poster.head)}')`
          : 'url(' + url + '/' + poster?.img + ')'
    }"
  >
    <div class="container">
      <div class="poster__box">
        <div class="poster__title">{{ poster?.title }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/style/component/poster';
</style>
