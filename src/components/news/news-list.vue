<template>
  <div class="newss">
    <div :class="small ? 'container-m' : 'container'">
      <h2 class="mb-30" v-if="title">
        <img src="@/assets/img/icons/news.svg" v-if="!noLogo" />
        {{ $t('message.nav.news') }}
      </h2>
      <el-row :gutter="30">
        <el-col :md="md" :xs="12" v-for="item of newss" :key="item._id">
          <news-item :publish="item" />
        </el-col>
      </el-row>
      <div v-if="more" class="d-flex justify-content-center mb-80 mt-30 md-mb-20 md-mt-10">
        <router-link :to="{ name: 'publishes' }" class="more">
          {{ $t('message.list.more') }}
          <img src="@/assets/img/icons/links.svg" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import newsItem from '@/components/news/news_item.vue'
const props = defineProps({
  limit: {
    type: Number,
    default: 4
  },
  title: {
    type: String
  },
  noLogo: {
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
  },
  search: {
    type: Object,
    default: null
  }
})

import { useNewsStore } from '@/stores/data/news'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const store = useNewsStore()
const { newss } = storeToRefs(store)

// onMounted(async () => {
//   await store.getAllNewss({
//     limit: props.limit,
//     search: props.search
//   })
// })
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
