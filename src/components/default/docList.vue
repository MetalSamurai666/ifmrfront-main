<script setup>
import { url } from '@/helpers/api'

defineProps(['list'])
</script>

<template>
  <ul class="docList">
    <li class="item" v-for="item of list" :key="item?._id">
      <a :href="url + '/' + item?.key.img[0].response" target="_blank" class="item__title">
        {{ item.title }}
      </a>

      <!-- <img :src="item?.key.img.url" alt=""> -->
    </li>
  </ul>
</template>

<style lang="scss">
.docList {
  display: flex;
  flex-direction: column;
  gap: 15px;
  list-style-type: disc;
  .item {
    &__title {
      font-size: 20px;
      font-weight: 700;
      color: #000;
      line-height: 32px;
    }
  }
}
</style>
