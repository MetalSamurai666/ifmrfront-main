<template>
  <div class="publish">
    <router-link to="/publish" class="img">
      <img src="@/assets/img/photos/publish.jpg" alt="" />
    </router-link>
    <div class="date">05.06.2024</div>
    <router-link to="/publish" class="title">{{ $t('message.card.title') }}</router-link>
    <div class="text">
      {{ $t('message.card.info') }}
    </div>
    <div class="category">
      <router-link to="/" class="link"> Рубрика </router-link>
      <router-link to="/" class="link"> Рубрика </router-link>
    </div>
  </div>
</template>

<script setup>
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
  .publish{
    margin-bottom: 20px;
  }
  img{
    margin-bottom: 10px;
  }
  .title{
    font-size: 20px;
  }
  .text{
    font-size: 14px;
    text-align: justify;
  }
  .category{
    margin-top: 10px;
  }
}
</style>
