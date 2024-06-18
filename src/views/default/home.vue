<template>
  <homeSlider />
  <div class="future pt-80 md-pt-40 pb-80 md-pb-40">
    <div class="container">
      <el-row :gutter="30" class="aic">
        <el-col :md="12" :xs="24">
          <h2 class="uppercase mb-30">
            {{ $t('message.infra.title') }}
          </h2>
          <p>
            {{ $t('message.infra.text') }}
          </p>
        </el-col>
        <el-col :md="12" :xs="24" class="md-pt-20">
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
  <publisherList :title="'Публикации'" :rows="4" :limit="4" :more="true"/>
  <usefullLinks />
  <partners />
  <div class="container"><div class="line"></div></div>
  <rating />
</template>

<script setup>
import { usePublisherStore } from '@/stores/data/publisher'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
const storePublisher = usePublisherStore()
const { publishers } = storeToRefs(storePublisher)

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

watch(
  () => locale.value,
  async () => {
    await getDate()
  }
)

const getDate = async () => {
  await storePublisher.getPublishers({
    limit: 4,
    language: locale.value || 'ru'
  })
}

onMounted(async () => {
  await getDate()
})

import homeInfo from '@/components/default/homeInfo.vue'
import homeSlider from '@/components/default/homeSlider.vue'
import publisherList from '@/components/publisher/publisher_list.vue'
import usefullLinks from '@/components/default/usefullLinks.vue'
import partners from '@/components/default/partners.vue'
import rating from '@/components/default/rating.vue'
</script>
