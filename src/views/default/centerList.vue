<script setup>
import { onMounted, ref, watch } from 'vue'
import { useCenterStore } from '@/stores/data/center'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { url } from '@/helpers/api'
import poster from '@/components/default/poster.vue'
const { locale } = useI18n()

const showBox = ref(false)
const centerStore = useCenterStore()
const { centers } = storeToRefs(centerStore)

import { useFullStore } from '@/stores/usefull'
const usefull = useFullStore()

const search = ref({})
const searching = async () => {
  const { title, ...params } = search.value
  await centerStore.searchingCenters({ title, params })
}

import { placeStore } from '@/stores/data/place'
const place_store = placeStore()

const regions = ref([])
const districts = ref([])

const getData = async () => {
  let res = await place_store.getRegions({
    language: locale.value
  })
  console.log(res.data)
  regions.value = [...res.data]

  await connect_store.getAllConnects({
    limit: 0,
    language: locale.value
  })
  await type_store.getAllTypes({
    limit: 0,
    language: locale.value
  })

  await classification_store.getAllClassifications({
    limit: 0,
    language: locale.value
  })
}

import { useConnectStore } from '@/stores/data/connect'
const connect_store = useConnectStore()
const { connects } = storeToRefs(connect_store)

import { useTypeStore } from '@/stores/data/type'
const type_store = useTypeStore()
const { types } = storeToRefs(type_store)

import { useClassificationStore } from '@/stores/data/classification'
const classification_store = useClassificationStore()
const { classifications } = storeToRefs(classification_store)

const getDistricts = async () => {
  if (search.value.region) {
    let res = await place_store.getDistricts({
      region: search.value.region,
      language: locale.value
    })
    console.log(res.data)
    districts.value = [...res.data]
  }
}

watch(
  () => locale.value,
  () => {
    getData()
  }
)

onMounted(() => {
  centerStore.getAllCenters()
  usefull.setNavbarBg(true)

  getData()
})
</script>

<template>
  <div class="search">
    <poster
      :poster="{
        title: $t('blocks.center.title') || '',
        head: 'center.jpg'
      }"
    />
    <div class="filter">
      <div class="container">
        <div class="filter__title">{{ $t('blocks.search_title') }}</div>
        <div class="filter__box">
          <div class="filter__head">
            <div class="filter__search">
              <img src="@/assets/logo/search.svg" />

              <input
                type="text"
                v-model="search.title"
                :placeholder="$t('blocks.search_placeholder')"
              />
              <button @click="searching">{{ $t('blocks.search') }}</button>
            </div>
          </div>

          <div :class="showBox ? 'filter__body show' : 'filter__body'">
            <el-form :label-position="'top'">
              <el-row :gutter="30" class="filter__row">
                <el-col :span="12" class="filter__col">
                  <el-form-item label="Область">
                    <el-select
                      v-model="search.region"
                      placeholder="Выберите область"
                      @change="getDistricts"
                      size="large"
                    >
                      <el-option
                        v-for="region of regions"
                        :key="region"
                        :label="region.title"
                        :value="region.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12" class="filter__col">
                  <el-form-item label="Район/город">
                    <el-select v-model="search.district" placeholder="Выберите район" size="large">
                      <el-option
                        v-for="region of districts"
                        :key="region.key"
                        :label="region.title"
                        :value="region.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

                <!-- <el-col :span="6">
                  <el-form-item label="Тип">
                    <el-select v-model="search.connect" placeholder="Выберите" size="large">
                      <el-option
                        v-for="item of connects"
                        :key="item._id"
                        :label="item.translates?.at(0)?.title"
                        :value="item._id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col> -->
                <el-col :span="6">
                  <el-form-item label="Тип склада">
                    <el-select v-model="search.type" placeholder="Выберите" size="large">
                      <el-option
                        v-for="item of types"
                        :key="item._id"
                        :label="item.translates?.at(0)?.title"
                        :value="item._id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Классификация">
                    <el-select v-model="search.classification" placeholder="Выберите" size="large">
                      <el-option
                        v-for="item of classifications"
                        :key="item._id"
                        :label="item.translates?.at(0)?.title"
                        :value="item._id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="Транспортная связь">
                    <el-select v-model="search.connect" placeholder="Выберите" size="large">
                      <el-option
                        v-for="item of connects"
                        :key="item._id"
                        :label="item.translates?.at(0)?.title"
                        :value="item._id"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>

        <button class="filter__show" @click="showBox = !showBox">Расширенный поиск</button>
      </div>
    </div>
    <div class="list">
      <div class="container">
        <div class="filter__title">
          По заданным Вами параметрам найдены следующие центры транспортной логистики
        </div>

        <div class="list__grid">
          <router-link
            v-for="item of centers"
            :key="item"
            :to="`/centershow/${item._id}`"
            class="item__box"
          >
            <div class="item__top">
              <img :src="url + '/' + item?.img[0]?.response" alt="Item image" class="item__img" />

              <div class="item__title">
                {{
                  item?.translates?.find((item) => item?.language == locale)?.title ||
                  item?.translates?.find((item) => item?.language == 'ru')?.title ||
                  ''
                }}
              </div>
            </div>

            <div class="item__mid">
              <div class="item__rating">{{ item?.rating }} балл</div>

              <div>Подробнее об оценке</div>
            </div>

            <div class="item__address">
              {{
                item?.translates?.find((item) => item?.language == locale)?.address ||
                item?.translates?.find((item) => item?.language == 'ru')?.address ||
                ''
              }}
            </div>

            <div class="item__more">Подробнее</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/style/component/center';
</style>
