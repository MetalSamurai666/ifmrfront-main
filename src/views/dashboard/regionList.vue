<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import regionDialog from '@/components/region/region-dialog.vue'
import regionTable from '@/components/region/region-table.vue'

import router from '@/router'
import { useRegionStore } from '@/stores/data/region'
const store = useRegionStore()
const { regions, regionsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const region = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const handleSave = async (value) => {
  let data = {    
    translates: [
      {
        title: value.title,
        language: value.language || 'ru',        
      }
    ]
  }
  if (type.value) {
    await store.saveRegion({
      _id: value._id,
      ...data
    })
  } else {
    await store.addRegion({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  region.value = await store.getTranslateRegion({ id, language })
  let { key, ...translate } = region.value
  console.log(region.value)
  region.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteRegion(id)
}

const handleStatus = async (val) => {
  await store.statusRegion(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  region.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'region',
    query: { page: page.value }
  })
  await store.getAllRegions({
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
      <h1>Тип помещений</h1>
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
  <region-table
    :data="regions"
    :region="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="regionsCount > limit">
    <el-pagination
      :current-region="region"
      background
      @current-change="handleCurrentChange"
      :region-size="limit"
      :total="regionsCount"
    >
    </el-pagination>
  </div>
  <region-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :region="region" />
</template>

<style></style>
