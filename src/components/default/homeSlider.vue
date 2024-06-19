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
          backgroundImage: `url('${slides.at(Math.floor(Math.random() * slides.length))}')`
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
import slide1 from '@/assets/home/slide1.jpg'
import slide2 from '@/assets/home/slide2.jpg'
import slide3 from '@/assets/home/slide3.jpg'
import slide4 from '@/assets/home/slide4.jpg'
import slide5 from '@/assets/home/slide5.jpg'

const slides = [slide1, slide2, slide3, slide4, slide5]

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
