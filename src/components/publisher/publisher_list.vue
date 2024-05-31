<template>
  <div class="publishers">
    <div class="container">
      <h2 class="mb-30">
        <img src="@/assets/img/icons/publisher.svg" alt="" />
        Публикации
      </h2>
      <el-row :gutter="30">
        <el-col :md="md" :xs="12" v-for="i of 4" :key="i">
          <publisher-item />
        </el-col>
      </el-row>
      <div class="d-flex justify-content-center mb-80 mt-30">
        <router-link to="/" class="more">
          Больше публикаций
          <img src="@/assets/img/icons/links.svg" alt="" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import publisherItem from '@/components/publisher/publisher_item.vue'
defineProps({
  title: {
    type: String
  },
  md: {
    type: Number,
    default: 6
  },
  more: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.more {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-bottom: 1px solid #000;
}
</style>
