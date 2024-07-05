<script setup>
import publisherList from '@/components/publisher/publisher_list.vue'
import { usePublisherStore } from '@/stores/data/publisher'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'

const storePublisher = usePublisherStore()
const { publishers } = storeToRefs(storePublisher)

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

watch(
  () => locale.value,
  async () => {
    await getDate()
  }
)
const route = useRoute()

watch(
  () => route.query?.id,
  async () => {
    await getDate()
  }
)

const getDate = async () => {
  await categoryStore.getCategorys({
    language: locale.value || 'ru'
  })
  await storePublisher.getPublishers({
    limit: 6,
    language: locale.value || 'ru'
  })
}

import { useCategoryStore } from '@/stores/data/category'
import { useRoute } from 'vue-router'
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore)

onMounted(async () => {
  await getDate()
})
</script>

<template>
  <div class="content">
    <div class="container">
      <div class="content__box pt-80 pb-80 md-pt-40 md-pb-40">
        <div class="content__list">
          <publisherList :md="8" :count="6" />
        </div>

        <ul class="content__cats">
          <li class="item">
            <router-link :to="{ name: 'publishes' }" class="item__box">
              Всё
              <img src="@/assets/img/icons/arrow-right.svg" />
            </router-link>
          </li>
          <li class="item" v-for="cat of categorys" :key="cat._id">
            <router-link :to="{ name: 'publishes', query: { id: cat?.key?._id } }" class="item__box">
              {{ cat?.title }}

              <img src="@/assets/img/icons/arrow-right.svg" />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.content {
  &__box {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;
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
