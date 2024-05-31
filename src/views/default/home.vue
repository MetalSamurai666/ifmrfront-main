<template>
  <div
    class="home"
    :style="{
      backgroundImage: 'url(' + img + ')'
    }"
  >
    <h1>Центр изучения проблем развития транспорта и логистики</h1>
  </div>
  <div class="future pt-80 pb-80">
    <div class="container">
      <el-row :gutter="30" class="aic">
        <el-col :md="12" :xs="24">
          <h2 class="uppercase mb-30">
            Развитие Транспортной Инфраструктуры: Взгляд в Будущее Узбекистана
          </h2>
          <p>
            В этом видео мы погрузимся в мир транспортной инфраструктуры Узбекистана и рассмотрим
            его будущие перспективы. От важных проектов модернизации до инновационных технологий, мы
            расскажем о том, как страна стремится стать лидером в сфере транспортной логистики.
            Присоединяйтесь к нам, чтобы узнать, какие шаги предпринимаются для создания
            эффективной, устойчивой и современной транспортной системы в Узбекистане.
          </p>
        </el-col>
        <el-col :md="12" :xs="24">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/K_6xhsBzhJw?si=HxPzW64fqiWuRIGT"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="container">
    <div class="line"></div>
  </div>
  <home-info />
  <publisherList />
  <usefullLinks />
  <partners />
  <div class="container"><div class="line"></div></div>
  <rating />
</template>

<script setup>
import img from '@/assets/img/photos/home.jpg'
import homeInfo from '@/components/default/homeInfo.vue'
import publisherList from '@/components/publisher/publisher_list.vue'
import usefullLinks from '@/components/default/usefullLinks.vue'
import partners from '@/components/default/partners.vue'
import rating from '@/components/default/rating.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/style/page/home.scss';
</style>
