<script setup>
import { onMounted, ref } from 'vue'
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
  await centerStore.searchingCenters({ ...search.value })
}

onMounted(() => {
  centerStore.getAllCenters()
  usefull.setNavbarBg(true)
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
                    <el-select placeholder="Выберите область" size="large">
                      <el-option label="Zone one" value="shanghai" />
                      <el-option label="Zone two" value="beijing" />
                    </el-select>
                  </el-form-item>

                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="Тип">
                        <el-select placeholder="Выберите" size="large">
                          <el-option label="Zone one" value="shanghai" />
                          <el-option label="Zone two" value="beijing" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Тип склада">
                        <el-select placeholder="Выберите" size="large">
                          <el-option label="Zone one" value="shanghai" />
                          <el-option label="Zone two" value="beijing" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="30">
                    <el-col :span="12">
                      <el-form-item label="Транспортная связь">
                        <el-select placeholder="Выберите" size="large">
                          <el-option label="Zone one" value="shanghai" />
                          <el-option label="Zone two" value="beijing" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col></el-col>
                  </el-row>
                </el-col>

                <el-col :span="12" class="filter__col">
                  <el-form-item label="Район/город">
                    <el-select placeholder="Выберите район" size="large">
                      <el-option label="Zone one" value="shanghai" />
                      <el-option label="Zone two" value="beijing" />
                    </el-select>
                  </el-form-item>

                  <!-- <el-row :gutter="30">
                                        <el-col :span="12"> -->
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="Транспортная связь">
                        <el-select placeholder="Выберите" size="large">
                          <el-option label="Zone one" value="shanghai" />
                          <el-option label="Zone two" value="beijing" />
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="Площадь (от)">
                            <el-input size="large" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="Площадь (до)">
                            <el-input size="large" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>

                  <!-- </el-col>
                                    </el-row> -->
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
