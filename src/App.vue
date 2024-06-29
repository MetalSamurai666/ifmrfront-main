<script setup>
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { watch, onMounted } from 'vue'

watch(
  () => locale.value,
  () => {
    document.title = t('title')
  }
)

onMounted(() => {
  document.title = t('title')
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import '@/assets/style/app.scss';
</style>
