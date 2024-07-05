<script setup>
import poster from '@/components/default/poster.vue'
import documentList from '@/components/document/documentList.vue'
import { onMounted, ref, watch } from 'vue'
import { usePageStore } from '@/stores/data/page'
const store = usePageStore()
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
let data = ref({})

const getData = async () => {
  let res = await store.bySlug('document', locale.value)

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
  <div class="pubs">
    <poster
      :poster="{
        title: data.title || '',
        info: data.description || '',
        img: data?.img?.at(0)?.response
      }"
    />
    <documentList />
  </div>
</template>

<style lang="scss" scoped></style>
