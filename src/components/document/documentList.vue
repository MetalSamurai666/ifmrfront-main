<template lang="">
  <div class="container">
    <div v-for="doc of documents" :key="doc._id">
      {{ doc }}
    </div>

    {{ doccategorys }}
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
const { locale } = useI18n()
import { useDocumentStore } from '@/stores/data/document'
const store = useDocumentStore()
const { documents } = storeToRefs(store)

import { useDoccategoryStore } from '@/stores/data/doccategory'
const doccategoryStore = useDoccategoryStore()
const { doccategorys } = storeToRefs(doccategoryStore)

watch(
  () => locale.value,
  async () => {
    await getDate()
  }
)

const getDate = async () => {
  await store.getDocuments({
    language: locale.value || 'ru'
  })
  await doccategoryStore.getDoccategorys({
    language: locale.value || 'ru'
  })
}

onMounted(async () => {
  await getDate()
})
</script>
<style lang=""></style>
