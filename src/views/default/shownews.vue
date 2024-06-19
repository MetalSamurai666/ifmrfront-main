<script setup>
import Article from '@/components/default/article.vue'
import newsList from '@/components/news/news-list.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// const articleItem = computed(() => {
//   return {
//     title: publish.value?.translates?.find((tr) => tr.language == locale.value)?.title || '',
//     text: publish.value?.translates?.find((tr) => tr.language == locale.value)?.text || '',
//     date: convertDate(publish.value.createdAt),
//     cats: [...publish.value?.category]
//   }
// })

import { useNewsStore } from '@/stores/data/news'
import { useRoute, useRouter } from 'vue-router'
import { convertDate } from '@/stores/env'
const store = useNewsStore()
const publish = ref({})
const route = useRoute()

const getDate = async () => {
  if (route.params?.slug) {
    let res = await store.bySlug(route.params.slug, locale.value)
    console.log(res)
    publish.value = { ...res }
    await store.getNewss({
      limit: 6,
      language: locale.value,
      search: {
        key: { $ne: res.key?._id }
      }
    })
  }
}
const router = useRouter()
watch(
  () => route.params?.slug,
  async () => {
    await getDate()
  }
)

watch(
  () => locale.value,
  async () => {
    await getDate()
  }
)

onMounted(async () => {
  await getDate()
})
</script>

<template>
  <div class="publish">
    <Article :article="publish" />
    <newsList :title="'Другие материалы по теме'" :noLogo="true" :md="8" :count="6" :small="true" />
  </div>
</template>

<style></style>
