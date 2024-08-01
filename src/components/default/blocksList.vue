<template>
  <section class="blocks">
    <div class="container">
      <h2 class="mb-30">
        <img src="@/assets/links/title.svg" />
        {{ $t('blocks.title') }}
      </h2>
      <el-row :gutter="36">
        <el-col :xs="24" :md="8" v-for="(key, index) of blocks" :key="key" class="mb-36">
          <router-link :to="{ name: index == 0 ? key : 'home' }" class="block">
            <img :src="getImageUrl(key)" alt="" />
            <div class="block__flex">
              <div class="block__title">{{ $t(`blocks.${key}.title`) }}</div>
              <div class="block__text">{{ $t(`blocks.${key}.text`) }}</div>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </section>
</template>
<script setup>
const blocks = [
  'center',
  'agro',
  'terminals',
  'parks',
  'econom',
  'terms',
  'hallway',
  'port',
  'info'
]

const getImageUrl = (path) => {
  return new URL(`/src/assets/links/${path}.svg`, import.meta.url)
}
</script>
<style lang="scss" scoped>
.blocks {
  margin-top: 60px;
}
.mb-36 {
  margin-bottom: 36px;
}
.block {
  background: #f3f5f6;
  border-radius: 10px;
  padding: 31px 33px 20px 15px;
  display: flex;
  align-items: flex-start;
  gap: 7px;
  min-height: 152px;
  transition: linear 0.3s;
  &__flex {
    flex-basis: calc(100% - 60px);
  }
  img {
    transition: linear 0.3s;
    width: 100px;
    height: 70px;
    object-fit: contain;
  }
  height: 100%;
  &:hover {
    background-color: #295680;
    color: #fff;
    img {
      filter: brightness(0) invert(1);
    }
  }
  &__title {
    font-size: 23px;
    font-weight: 700;
    margin-bottom: 5px;
    line-height: 24px;
  }
  &__text {
    font-size: 12px;
    line-height: 18px;
  }
}
</style>
