<template>
  <div class="publishers">
    <div :class="small ? 'container-m' : 'container'">
      <h2 class="mb-30" v-if="title">
        <img src="@/assets/img/icons/publisher.svg" v-if="!noLogo"/>
        {{ $t('message.nav.pubs') }}
      </h2>
      <el-row :gutter="30">
        <el-col :md="md" :xs="12" v-for="i of count" :key="i">
          <publisher-item />
        </el-col>
      </el-row>
      <div class="d-flex justify-content-center mb-80 mt-30 md-mb-20 md-mt-10">
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
  noLogo:{
    type: Boolean,
    default: false
  },
  md: {
    type: Number,
    default: 6
  },
  more: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 4
  },
  small: {
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
  @media (max-width: 600px) {
    font-size: 14px;
  }
}
</style>
