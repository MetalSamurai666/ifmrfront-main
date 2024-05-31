<template>
  <section class="infografike pt-80 pb-80">
    <div class="container">
      <h2 class="mb-30 uppercase">
        <img src="@/assets/img/icons/infografiya.svg" alt="" />
        Инфографика

        <div class="splide__arrows arrows">
          <button
            class="splide__arrow splide__arrow--prev"
            type="button"
            aria-label="Previous slide"
            aria-controls="splide01-track"
            @click="move(-1)"
          >
            <img src="@/assets/img/icons/left_arrow.svg" alt="" />
          </button>
          <button
            class="splide__arrow splide__arrow--next"
            type="button"
            aria-label="Next slide"
            aria-controls="splide01-track"
            @click="move(1)"
          >
            <img src="@/assets/img/icons/right_arrow.svg" alt="" />
          </button>
        </div>
      </h2>
      <Splide
        ref="slide"
        :options="{
          type: 'loop',
          perPage: 1,

          autoplay: true,
          interval: 3000,
          arrows: false,
          classes: {
            arrows: 'splide__arrows',
            arrow: 'splide__arrow your-class-arrow',
            prev: 'splide__arrow--prev your-class-prev',
            next: 'splide__arrow--next your-class-next'
          }
        }"
        aria-label="Инфографика"
      >
        <SplideSlide>
          <img src="@/assets/img/photos/slide.jpg" alt="Инфографика" />
        </SplideSlide>
        <SplideSlide>
          <img src="@/assets/img/photos/slide.jpg" alt="Инфографика" />
        </SplideSlide>
        <SplideSlide>
          <img src="@/assets/img/photos/slide.jpg" alt="Инфографика" />
        </SplideSlide>
        <SplideSlide>
          <img src="@/assets/img/photos/slide.jpg" alt="Инфографика" />
        </SplideSlide>
        <SplideSlide>
          <img src="@/assets/img/photos/slide.jpg" alt="Инфографика" />
        </SplideSlide>
        <SplideSlide>
          <img src="@/assets/img/photos/slide.jpg" alt="Инфографика" />
        </SplideSlide>
      </Splide>

      <el-row :gutter="30" class="mt-80">
        <el-col :lg="12" :xs="24">
          <div
            class="map"
            :style="{
              backgroundImage: `url(${world})`
            }"
          >
            <div class="title">Транспортные коридоры</div>
            <router-link to="/">
              <img src="@/assets/img/icons/arrow-right.svg" alt="" />
            </router-link>
          </div>
        </el-col>
        <el-col :lg="12" :xs="24">
          <div
            class="map"
            :style="{
              backgroundImage: `url(${uzbekistan})`
            }"
          >
            <div class="title">Сухие порты Узбекистана</div>
            <router-link to="/">
              <img src="@/assets/img/icons/arrow-right.svg" alt="" />
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
  
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { ref } from 'vue'

import world from '@/assets/img/photos/world.jpg'
import uzbekistan from '@/assets/img/photos/uzbekistan.jpg'

const slide = ref()

const move = (val) => {
  val > 0 ? slide.value.go('>') : slide.value.go('<')
}
</script>

<style lang="scss" scoped>
h2 {
  .splide__arrows.arrows {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0;
    button {
      position: relative;
      left: unset;
      right: unset;
      top: unset;
      bottom: unset;
      width: 36px;
      height: 36px;
      border-radius: unset;
      background: unset;
      transform: unset;
      border: 2px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 24px;
      cursor: pointer;
      &:hover {
        background-color: #000;
        img {
          filter: invert(1);
        }
      }
      & + button {
        margin-left: 4px;
      }
    }
  }
}
button.splide__pagination__page {
  border-radius: unset;
  &.is-active {
    background-color: $blue;
  }
}
ul.splide__pagination {
  bottom: -40px;
}
.map {
  height: 331px;
  position: relative;

  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .title {
    padding: 24px;
    color: #fff;
    font-size: 32px;
    font-weight: 600;
    text-align: right;
    max-width: 300px;
    line-height: 100%;
    font-family: 'Fira Sans';
    margin-left: auto;
  }
  a {
    margin-top: auto;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
  }
}
</style>
