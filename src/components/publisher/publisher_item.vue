<template>
  <div class="publish">
    <router-link to="/" class="img">
      <img src="@/assets/img/photos/publish.jpg" alt="" />
    </router-link>
    <div class="date">05.06.2024</div>
    <router-link to="/" class="title">Экологическая устойчивость: взгляд в будущее</router-link>
    <div class="text">
      Проблемы экологической устойчивости становятся все более актуальными в контексте развития
      транспортной инфраструктуры. Правительство, осознавая важность уменьшения негативного
      воздействия транспорта на окружающую среду, активно внедряет меры по снижению выбросов и
      оптимизации энергопотребления в транспортной сфере.
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
</style>
