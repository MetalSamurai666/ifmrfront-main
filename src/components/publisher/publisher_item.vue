<template>
  <div class="publish">
    <router-link
      :to="{ name: 'publish', params: { slug: publish?.slug || publish?.key?.slug || '' } }"
      class="img"
    >
      <img
        v-if="publish?.img?.at(0)?.response || publish?.key?.img?.at(0)?.response"
        :src="`${url}/${publish?.img?.at(0)?.response || publish?.key?.img?.at(0)?.response}`"
        alt=""
      />
      <img v-else src="@/assets/img/photos/publish.jpg" alt="" />
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
    <div class="category">
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

<style lang="scss" scoped>
.publish {
  margin-bottom: 30px;
}
img {
  aspect-ratio: 4/3;
  margin-bottom: 24px;
  width: 100%;
}
.date {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 4px;
}
.title {
  display: block;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  line-height: 100%;
}
.text {
  font-size: 16px;
  line-height: 140%;
  font-family: 'Roboto Slab';
  font-weight: 300;
}
.category {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-top: 24px;
}
.link {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid #000;
  font-size: 12px;
  &:hover {
    background-color: #000;
    color: #fff;
  }
}

@media (max-width: 600px) {
  .publish {
    margin-bottom: 20px;
  }
  img {
    margin-bottom: 10px;
  }
  .title {
    font-size: 20px;
  }
  .text {
    font-size: 14px;
    text-align: justify;
  }
  .category {
    margin-top: 10px;
  }
}
</style>
