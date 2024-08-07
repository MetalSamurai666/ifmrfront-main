<script setup>
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import content from '@/components/default/content.vue'
const { locale } = useI18n()
import poster from '@/components/default/poster.vue'

import { useVacancyStore } from '@/stores/data/vacancy'
const vacancy_store = useVacancyStore()
const { vacancys } = storeToRefs(vacancy_store)

import { usePageStore } from '@/stores/data/page'
import { convertDate } from '@/stores/env'

const store = usePageStore()
const route = useRoute()
let data = ref({})

const getData = async () => {
  console.log('ku')
  await vacancy_store.getVacancys({
    language: locale.value
  })
  let res = await store.bySlug('vacancy', locale.value)
  console.log(res)

  data.value = { ...res }
}

watch(
  () => locale.value,
  async () => await getData()
)

watch(
  () => route?.params?.slug,

  () => {
    getData()
  }
)

onMounted(async () => {
  await getData()
})
</script>

<template>
  <poster
    :poster="{
      title: data.title || '',
      img: data?.img?.at(0)?.response
    }"
  />
  <div class="content pt-80 pb-40 md-pt-40 md-pb-40">
    <div class="container">
      <div class="content__text" v-html="data?.text" />
    </div>
  </div>
  <div class="container">
    <el-divider />

    <div class="list">
      <div v-for="vacancy of vacancys" :key="vacancy._id">
        <div class="title">
          {{ vacancy.title }}
          <a :href="vacancy.key?.link" target="_blank"> ({{ $t('link') }}) </a>
        </div>
        <div class="date">
          {{ $t('date') }}: {{ convertDate(vacancy.key?.from) }} -
          {{ convertDate(vacancy.key?.to) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 54px;
  .title {
    font-size: 20px;
    font-weight: 500;
    a {
      font-weight: 400;
      color: #086fbb;
    }
  }
}
</style>
