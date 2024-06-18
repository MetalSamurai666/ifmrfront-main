<template>
  <Splide
    ref="slide"
    :options="{
      type: 'loop',
      perPage: 1,
      pagination: false,
      perSlide: 1,
      autoplay: true,
      interval: 3000,
      arrows: false,
      classes: {
        arrows: 'splide__arrows',
        arrow: 'splide__arrow your-class-arrow',
        prev: 'splide__arrow--prev your-class-prev',
        next: 'splide__arrow--next your-class-next'
      },
      breakpoints: {
        768: {
          perPage: 1
        }
      }
    }"
    aria-label="Инфографика"
  >
    <SplideSlide v-for="item of sliders" :key="item._id">
      <div
        class="home"
        :style="{
          backgroundImage: `url('${url}/${item.img?.at(0)?.response}')`
        }"
      >
        <h1>
          {{
            item?.translates?.find((item) => item?.language == locale)?.title ||
            item?.translates?.find((item) => item?.language == 'ru')?.title ||
            ''
          }}
        </h1>
      </div>
    </SplideSlide>
  </Splide>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { url } from '@/helpers/api'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { useSliderStore } from '@/stores/data/slider'
const store = useSliderStore()
const { sliders } = storeToRefs(store)

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const getData = async () => {
  await store.getAllSliders({
    search: {
      status: 0
    }
  })
}


onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/page/home.scss';
</style>
