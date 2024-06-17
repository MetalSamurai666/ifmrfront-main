<script setup>
defineProps(['poster'])
import { url } from '@/helpers/api'
</script>

<template>
  <div
    :class="poster?.alt ? 'poster alt' : 'poster'"
    :style="{ backgroundImage: 'url(' + url + '/' + poster?.img + ')' }"
  >
    <div class="container">
      <div class="poster__box">
        <div class="poster__title">{{ poster?.title }}</div>

        <div class="poster__info" v-html="poster?.info" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 760px;
  background-color: $blue;
  background-size: 100%;
  background-position: 0 100%;
  background-repeat: no-repeat;
  &.alt {
    background-position: 100% 100%;
    .poster__box {
      margin-right: auto;
      margin-left: unset;
      align-items: flex-start;
    }
    .poster__info {
      text-align: left;
    }
  }
  .container {
    height: 100%;
  }
  &__box {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 50px;
    max-width: 45%;
    height: 100%;
    text-align: right;
    margin-left: auto;
    color: #fff;
    padding-top: 150px;
  }
  &__title {
    font-size: 36px;
    font-weight: 700;
    line-height: 100%;
    text-transform: uppercase;
  }
  &__info {
    font-family: 'Roboto Slab';
    font-size: 18px;
    line-height: 140%;
  }

  @media (max-width: 1024px) {
    height: auto;
    background-size: 70%;
    &__box {
      gap: 15px;
      padding-bottom: 20px;
    }
    &__title {
      font-size: 30px;
    }
    &__info {
      font-size: 14px;
    }
  }

  @media (max-width: 600px) {
    height: auto;
    background-size: 0;
    &__box {
      max-width: 100%;
      padding: 120px 0px 40px;
      gap: 20px;
    }
    &__title {
      font-size: 28px;
    }
    &__info {
      font-size: 14px;
    }
  }
}
</style>
