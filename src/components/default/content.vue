<script setup>
defineProps(['content'])
</script>

<template>
  <div class="content pt-80 pb-80 md-pt-40 md-pb-40">
    <div class="container">
      <div class="content__text" v-html="content?.text" />
    </div>
  </div>
</template>

<style lang="scss">
.content {
  &__text {
    font-family: 'Roboto Slab';
    line-height: 140%;
    font-size: 18px;
    p {
      line-height: 140%;
    }
    h3 {
      font-family: 'Fira Sans';
    }
  }
  @media (max-width: 600px) {
    p {
      font-size: 14px;
    }
    h3 {
      font-size: 22px;
    }
  }
  .ql-size-large {
    font-size: 24px;
    font-weight: 600;
  }
  .ql-align-center {
    text-align: center;
  }
  p {
    margin-bottom: 15px;
  }
}
</style>
