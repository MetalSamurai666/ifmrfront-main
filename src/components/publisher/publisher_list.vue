<template>
  <div class="publishers">
    <div :class="small ? 'container-m' : 'container'">
      <h2 class="mb-30" v-if="title">
        <img src="@/assets/img/icons/publisher.svg" v-if="!noLogo" />
        {{ $t('message.nav.pubs') }}
      </h2>
      <el-row :gutter="30">
        <el-col :md="md" :xs="12" v-for="item of publishers" :key="item._id">
          <publisher-item :publish="item" />
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
import publisherItem from '@/components/publisher/publisher_item.vue'
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

import { usePublisherStore } from '@/stores/data/publisher'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const store = usePublisherStore()
const { publishers } = storeToRefs(store)

// onMounted(async () => {
//   await store.getAllPublishers({
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
