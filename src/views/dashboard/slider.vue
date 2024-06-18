<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import sliderDialog from '@/components/slider/slider-dialog.vue'
import sliderTable from '@/components/slider/slider-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { useSliderStore } from '@/stores/data/slider'
const store = useSliderStore()
const { sliders, slidersCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const slider = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    slug: value.slug,
    img: [...value.img],
    translates: [
      {
        title: value.title,
        language: value.language || 'ru',
        description: value.description
      }
    ]
  }
  if (type.value) {
    await store.saveSlider({
      _id: value._id,
      ...data
    })
  } else {
    await store.addSlider({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  slider.value = await store.getTranslateSlider({ id, language })
  let { key, ...translate } = slider.value
  console.log(slider.value)
  slider.value = {
    ...key,
    resslug: key.slug?.slice() || '',
    img:
      key.img?.map((img) => {
        return {
          ...img,
          url: `${url}/${img.response}`
        }
      }) || [],
    language: translate.language,
    title: translate.title,
    description: translate.description
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteSlider(id)
}

const handleStatus = async (val) => {
  await store.statusSlider(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  slider.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/slider',
    query: { page: page.value }
  })
  await store.getAllSliders({
    page: page.value,
    limit: limit.value,
    search: search.value || {}
  })
}

const handleCurrentChange = async (val) => {
  page.value = val
  await getDate()
}

onMounted(async () => {
  await getDate()
})
</script>

<template>
  <div class="head mb-20">
    <div class="df align-item-center">
      <h1>Слайдер</h1>
    </div>

    <div class="df align-item-center">
      <el-button type="primary" @click="handleOpen" class="add__btn">
        <el-icon>
          <plus />
        </el-icon>
        <span class="add__title">Добавить</span>
      </el-button>
    </div>
  </div>
  <slider-table
    :data="sliders"
    :slider="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="slidersCount > limit">
    <el-pagination
      :current-slider="slider"
      background
      @current-change="handleCurrentChange"
      :slider-size="limit"
      :total="slidersCount"
    >
    </el-pagination>
  </div>
  <slider-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="slider"
  />
</template>

<style></style>
