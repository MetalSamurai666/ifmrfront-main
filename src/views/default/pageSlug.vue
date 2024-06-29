<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
import poster from '@/components/default/poster.vue'
import content from '@/components/default/content.vue'

import { usePageStore } from '@/stores/data/page'
import { useRoute } from 'vue-router'
const store = usePageStore()
const route = useRoute()
let data = ref({})

const getData = async () => {
  let res = await store.bySlug(route.params?.slug, locale.value)
  console.log(res.data);
  data.value = { ...res }
}

watch(
  () => locale.value,
  async () => await getData()
)

watch(()=>route?.params?.slug,

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
      info: data.description || '',
      img: data?.img?.at(0)?.response
    }"
  />
  <content
    :content="{
      text: data.text
    }"
  />
</template>

<style lang="scss" scoped></style>
