<template>
  <section class="partners pb-80 md-pb-20">
    <div class="container">
      <h2>
        <img src="@/assets/img/icons/partner.svg" alt="" />
        Наши партнёры

        <div class="splide__arrows arrows ml-auto">
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
    </div>
    <Splide
      ref="slide"
      :options="{
        type: 'loop',
        perPage: 10,
        pagination:false,
        perSlide: 2,
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
            perPage: 4
          }
        }
      }"
      aria-label="Инфографика"
    >
      <SplideSlide v-for="item of 25" :key="item">
        <div class="box">
          <img src="@/assets/img/partners/1.png" alt="Инфографика" />
        </div>
      </SplideSlide>
    </Splide>
  </section>
</template>

<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { ref } from 'vue'

const slide = ref()

const move = (val) => {
  val > 0 ? slide.value.go('>') : slide.value.go('<')
}
</script>

<style lang="scss" scoped>
.box {
  padding: 16px 32px;
  img {
    width: 128px;
    height: 128px;
    object-fit: contain;
  }
}
button.splide__pagination__page {
  border-radius: unset;
  &.is-active {
    background-color: $blue;
  }
}
h2 {
  .splide__arrows.arrows {
    position: relative;
    display: flex;
    align-items: center;
    margin: 0;
    margin-left: auto;
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
@media (max-width: 768px) {
  .box {
    padding: 10px;  
  }
}
</style>
