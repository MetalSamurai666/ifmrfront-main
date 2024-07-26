<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import serviceDialog from '@/components/service/service-dialog.vue'
import serviceTable from '@/components/service/service-table.vue'

import router from '@/router'
import { useServiceStore } from '@/stores/data/service'
const store = useServiceStore()
const { services, servicesCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const service = ref({})
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
    await store.saveService({
      _id: value._id,
      ...data
    })
  } else {
    await store.addService({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  service.value = await store.getTranslateService({ id, language })
  let { key, ...translate } = service.value
  console.log(service.value)
  service.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteService(id)
}

const handleStatus = async (val) => {
  await store.statusService(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  service.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'service',
    query: { page: page.value }
  })
  await store.getAllServices({
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
      <h1>Тип услуг</h1>
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
  <service-table
    :data="services"
    :service="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="servicesCount > limit">
    <el-pagination
      :current-service="service"
      background
      @current-change="handleCurrentChange"
      :service-size="limit"
      :total="servicesCount"
    >
    </el-pagination>
  </div>
  <service-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :service="service" />
</template>

<style></style>
