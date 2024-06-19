<script setup>
import poster from '@/components/default/poster.vue'
import newsList from '@/components/news/news-list.vue'

import { onMounted, ref, watch } from 'vue'
import { usePageStore } from '@/stores/data/page'
const store = usePageStore()
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
let data = ref({})

import { useNewsStore } from '@/stores/data/news'
const newsStore = useNewsStore()

const getData = async () => {
  let res = await store.bySlug('news', locale.value)

  data.value = { ...res }

  await newsStore.getNewss({
    language: locale.value
  })
}

watch(
  () => locale.value,
  async () => await getData()
)

onMounted(async () => {
  await getData()
})
</script>

<template>
  <div class="news">
    <poster
      :poster="{
        title: data.title || '',
        info: data.description || '',
        img: data?.img?.at(0)?.response,
        alt: true
      }"
    />
    <newsList :md="8" :count="1" class="pt-80 pb-80" />
  </div>
</template>

<style></style>
