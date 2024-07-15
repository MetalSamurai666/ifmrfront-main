<template>
  <div class="publish">
    <router-link
      :to="{ name: 'publish', params: { slug: publish?.slug || publish?.key?.slug || '' } }"
      class="img"
    >
      <img
        class="poster"
        v-if="publish?.img?.at(0)?.response || publish?.key?.img?.at(0)?.response"
        :src="`${url}/${publish?.img?.at(0)?.response || publish?.key?.img?.at(0)?.response}`"
        alt=""
      />
      <img class="poster" v-else src="@/assets/img/photos/publish.jpg" alt="" />
    </router-link>
    <div class="date">{{ convertDate(publish?.createdAt) }}</div>
    <router-link
      :to="{ name: 'publish', params: { slug: publish?.slug || publish?.key?.slug || '' } }"
      class="title"
      >{{
        publish?.title || publish?.translates?.find((tr) => tr.language == locale)?.title || ''
      }}</router-link
    >
    <div
      class="text"
      v-html="
        publish?.description ||
        publish?.translates?.find((tr) => tr.language == locale)?.description ||
        ''
      "
    />
    <div class="category" v-if="publish?.category?.title">
      <router-link to="/" class="link"> {{ publish?.category?.title }} </router-link>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { url } from '@/helpers/api'
import { convertDate } from '@/stores/env'
const { locale } = useI18n()
defineProps(['publish'])
</script>

<style lang="scss">
@import '@/assets/style/component/publish';
</style>
