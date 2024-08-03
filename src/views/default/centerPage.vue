<script setup>
import Rating from '@/components/default/rating.vue'
import poster from '@/components/default/poster.vue'
import { useCenterStore } from '@/stores/data/center'
import { ref } from 'vue'
// import { useI18n } from 'vue-i18n'
// import { url } from '@/helpers/api'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'

// const { locale } = useI18n()
const route = useRoute()
const data = ref({})
const centerStore = useCenterStore()


onMounted(async () => {
  console.log(route?.params.id)
  let res = await centerStore.bySlug(route?.params.id)
  data.value = { ...res }
  console.log(res)
})
</script>

<template>
  <poster
    :poster="{
      title: $t('blocks.center.title') || '',
      head: 'center.jpg'
    }"
  />
  <div class="logi">
    <div class="container">
      <div class="logi__head">
        <img v-if="data.img?.length > 0" :src="`${url}/${data.img.at(0)?.response}`" alt="" />
        {{ data.translate?.title }}
      </div>
      <div class="logi__list">
        <div class="logi__item">
          <div class="name">{{ $t('block.site') }}</div>
          <div class="value">{{ data.site }}</div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.address') }}</div>
          <div class="value">{{ data.translate?.address }}</div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.square') }}</div>
          <div class="value">{{ data.square }} m<sup>2</sup></div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.freesquare') }}</div>
          <div class="value">{{ data.freesquare }} m<sup>2</sup></div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.spec') }}</div>
          <div class="value">{{ data.spec?.translates?.at(0)?.title }}</div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.rating') }}</div>
          <div class="value">{{ data.rating }} балл</div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.type') }}</div>
          <div class="value">{{ data.type?.translates?.at(0)?.title }}</div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.room') }}</div>
          <div class="value">
            <span v-for="room of data.room" :key="room._id">
              {{ room?.translates?.at(0)?.title }}
            </span>
          </div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.safe') }}</div>
          <div class="value">
            <span v-for="room of data.safe" :key="room._id">
              {{ room?.translates?.at(0)?.title }}
            </span>
          </div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.storage') }}</div>
          <div class="value">{{ data.storage?.translates?.at(0)?.title }}</div>
        </div>
        <div class="logi__item">
          <div class="name">{{ $t('block.service') }}</div>
          <div class="value">
            <span v-for="room of data.service" :key="room._id">
              {{ room?.translates?.at(0)?.title }}
            </span>
          </div>
        </div>
        <div class="logi__item col">
          <div class="name">{{ $t('block.text') }}</div>
          <div class="value" v-html="data.translate?.text" />
        </div>
        <div class="logi__item col">
          <div class="name">{{ $t('block.gallery') }}</div>
          <div class="photos">
            <img
              v-for="photo of data.img"
              :key="photo.uid"
              :src="`${url}/${photo.response}`"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Rating />
</template>

<style lang="scss" scoped>
@import '@/assets/style/component/centerpage';
</style>
