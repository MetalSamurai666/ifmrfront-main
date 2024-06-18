<template>
  <section class="usefull pt-80 md-pt-40 pb-80 md-pb-40">
    <div class="container">
      <h2 class="mb-30 md-mb-10">
        <img src="@/assets/img/icons/link.svg" alt="" />
        {{ $t('message.useful.title') }}
      </h2>
      <el-row :gutter="30">
        <el-col :md="12" :xs="24" v-for="item of links" :key="item._id">
          <a :href="item.link" target="_blank" class="link">
            <img
              v-if="item.img?.at(0)?.response"
              :src="`${url}/${item.img?.at(0)?.response}`"
              :alt="
                item?.translates?.find((item) => item?.language == locale)?.title ||
                item?.translates?.find((item) => item?.language == 'ru')?.title ||
                ''
              "
            />
            <img v-else src="@/assets/img/icons/gerb.svg" alt="" />
            {{
              item?.translates?.find((item) => item?.language == locale)?.title ||
              item?.translates?.find((item) => item?.language == 'ru')?.title ||
              ''
            }}
          </a>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { url } from '@/helpers/api'
import { useLinkStore } from '@/stores/data/link'
const store = useLinkStore()
const { links } = storeToRefs(store)

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const getData = async () => {
  await store.getAllLinks({
    search: {
      status: 0
    }
  })
}

onMounted(async () => {
  await getData()
})
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #aaaaaa;
  img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 0;
  }
}
</style>
