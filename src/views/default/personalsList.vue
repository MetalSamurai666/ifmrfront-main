<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
import poster from '@/components/default/poster.vue'

import { usePageStore } from '@/stores/data/page'
import { useRoute } from 'vue-router'
const store = usePageStore()
const route = useRoute()
let data = ref({})

const getData = async () => {
  let res = await store.bySlug('leadership', locale.value)
  console.log(res)
  data.value = { ...res }
}

watch(
  () => locale.value,
  async () => await getData()
)

watch(
  () => route?.params?.slug,

  () => {
    getData()
  }
)

const personals = {
  ru: [
    {
      id: 1,
      name: 'Холматов Бекзад Нурматович',
      lvl: 'Директор Центра по изучению проблем развития транспорта и логистики',
      phone: '71 202-05-00',
      inphone: '531',
      day: 'вторник',
      time: 'с 14:00 до 16:00',
      email: 'b.xolmatov@mintrans.uz'
    },
    {
      id: 2,
      name: 'Иргашев Голиб Гайратович',
      lvl: 'Заместитель директора Центра по изучению проблем развития транспорта и логистики',
      phone: '71 202-05-00',
      inphone: '175',
      day: 'Среда',
      time: 'с 09:00 до 12:00',
      email: 'prognoz@mintrans.uz'
    }
  ],
  uz: [
    {
      id: 1,
      name: 'Xolmatov Bekzod Nurmatovich',
      lvl: `Transport va logistikani rivojlantirish muammolarini o'rganish markazi direktori`,
      phone: '71 202-05-00',
      inphone: '531',
      day: 'Seshanba',
      time: '14:00 dan 16:00 gacha',
      email: 'b.xolmatov@mintrans.uz'
    },
    {
      id: 2,
      name: 'Irgashev G‘olib G‘ayratovich',
      lvl: `Transport va logistikani rivojlantirish muammolarini o'rganish markazi direktorining o'rinbosari`,
      phone: '71 202-05-00',
      inphone: '175',
      day: 'Chorshanba',
      time: '09:00 dan 12:00 gacha',
      email: 'prognoz@mintrans.uz'
    }
  ]
}

const getImageUrl = (path) => {
  return new URL(`/src/assets/personal/${path}.jpg`, import.meta.url)
}

onMounted(async () => {
  await getData()
})
</script>

<template>
  <poster
    :poster="{
      title: data.title || '',
      img: data?.img?.at(0)?.response
    }"
  />
  <div class="container">
    <div class="list">
      <div class="personal" v-for="personal of personals[locale]" :key="personal.id">
        <img :src="getImageUrl(personal.id)" alt="" />
        <div class="info">
          <div class="name">
            {{ personal.name }}
          </div>
          <div class="lvl">{{ personal.lvl }}</div>
          <div class="gray">
            {{ $t('personal.phone') }}:
            <span class="name">{{ personal.phone }}</span>
            {{ $t('personal.inphone') }}:
            <span class="name">{{ personal.inphone }}</span>
          </div>
          <div class="gray">
            {{ $t('personal.recept') }} <b>{{ personal.day }}</b
            >,
            <b>{{ personal.time }}</b>
          </div>
          <div class="gray">
            {{ $t('personal.email') }} <b>{{ personal.email }}</b>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 54px;
  .personal {
    display: flex;
    font-size: 20px;
    padding: 22px;
    border-radius: 30px;
    box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.1);
    gap: 50px;
    align-items: center;
    color: #666666;
    b {
      font-weight: 500;
    }
    img {
      border-radius: 10px;
      width: 230px;
      object-fit: 1/1;
      object-fit: cover;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .name {
      font-size: 22px;
      color: #0e41a4;
      font-weight: 600;
    }
  }
}
</style>
