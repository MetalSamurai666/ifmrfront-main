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
const store = useNewsStore()
const { newss } = storeToRefs(store)

import { useNewscategoryStore } from '@/stores/data/newscategory'
const storeCat = useNewscategoryStore()
const { newscategorys } = storeToRefs(storeCat)

// onMounted(async () => {
//   await store.getAllNewss({
//     limit: props.limit,
//     search: props.search
//   })
// })
</script>

<template>
  <div class="newss">
    <div :class="small ? 'container-m' : 'container'">
      <div class="newss__box">
        <div class="newss__left">
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

        <div class="newss__right">
          <ul class="newss__cats">
            <li class="item">
              <router-link :to="{ name: 'publishes' }" class="item__box">
                Всё
                <img src="@/assets/img/icons/arrow-right.svg" />
              </router-link>
            </li>
            
            <li class="item" v-for="cat of newscategorys" :key="cat._id">
              <router-link :to="{ name: 'publishes', query: { id: cat?.key?._id } }" class="item__box">
                {{ cat?.title }}

                <img src="@/assets/img/icons/arrow-right.svg" />
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.newss{
  &__box{
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 50px;
  } 
  &__cats{
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
    .item {
      &__box {
        padding: 25px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid #000;
        font-weight: 500;
        line-height: 120%;
        text-transform: uppercase;
        &:hover {
        color: $blue;
        border-color: $blue;
        }
      }
      img {
        width: 20px;
        filter: invert(1);
      }
    }
  }

  @media (max-width: 600px) {
    &__box {
      grid-template-columns: 1fr;
    }
    &__cats{
      .item {
        &__box {
          padding: 15px 0px;
        }
      }
    }
  }
}
</style>
