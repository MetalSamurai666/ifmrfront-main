<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
import poster from '@/components/default/poster.vue'
import posterImg from '@/assets/img/poster/about.png'
import content from '@/components/default/content.vue'
import structure from '@/components/default/structure.vue'
import coop from '@/components/default/coop.vue'

import { usePageStore } from '@/stores/data/page'
const store = usePageStore()

let data = ref({})

const getData = async () => {
  let res = await store.bySlug('about', locale.value)
  data.value = { ...res }
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
  <structure />
  <coop />
</template>

<style lang="scss" scoped></style>
