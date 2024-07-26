<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import centerDialog from '@/components/center/center-dialog.vue'
import centerTable from '@/components/center/center-table.vue'
import { url } from '@/helpers/api'
import router from '@/router'
import { useCenterStore } from '@/stores/data/center'
const store = useCenterStore()
const { centers, centersCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const center = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const handleSave = async (value) => {
  let data = {
    ...value,
    translates: [
      {
        title: value.title,
        text: value.text,
        address: value.address,
        language: value.language || 'ru'
      }
    ]
  }
  console.log(data)
  if (type.value) {
    await store.saveCenter({
      _id: value._id,
      ...data
    })
  } else {
    await store.addCenter({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  center.value = await store.getTranslateCenter({ id, language })
  let { key, ...translate } = center.value
  console.log(center.value)
  center.value = {
    ...key,
    language: translate.language,
    title: translate.title,
    address: translate.address,
    text: translate.text,
    img: key?.img.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    }),
    logo: key?.logo.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    })
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteCenter(id)
}

const handleStatus = async (val) => {
  await store.statusCenter(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  center.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'centers',
    query: { page: page.value }
  })
  await store.getAllCenters({
    page: page.value,
    limit: limit.value,
    search: search.value || {}
  })
}

const handleCurrentChange = async (val) => {
  page.value = val
  await getDate()
}

import { useStorageStore } from '@/stores/data/storage'
const storage_store = useStorageStore()

import { useTypeStore } from '@/stores/data/type'
const type_store = useTypeStore()

import { useRoomStore } from '@/stores/data/room'
const room_store = useRoomStore()

import { useServiceStore } from '@/stores/data/service'
const service_store = useServiceStore()

import { useSafeStore } from '@/stores/data/safe'
const safe_store = useSafeStore()

import { useConnectStore } from '@/stores/data/connect'
const connect_store = useConnectStore()

import { useClassificationStore } from '@/stores/data/classification'
const classification_store = useClassificationStore()

import { useSpecStore } from '@/stores/data/spec'
const spec_store = useSpecStore()

onMounted(async () => {
  await getDate()

  await spec_store.getAllSpecs({
    limit: 0
  })

  await classification_store.getAllClassifications({
    limit: 0
  })

  await storage_store.getAllStorages({
    limit: 0,
    language: 'ru'
  })
  await type_store.getAllTypes({
    limit: 0
  })
  await room_store.getAllRooms({
    limit: 0
  })
  await service_store.getAllServices({
    limit: 0
  })
  await safe_store.getAllSafes({
    limit: 0
  })
  await connect_store.getAllConnects({
    limit: 0
  })
})
</script>

<template>
  <div class="head mb-20">
    <div class="df align-item-center">
      <h1>Все центры</h1>
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
  <center-table
    :data="centers"
    :center="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="centersCount > limit">
    <el-pagination
      :current-center="center"
      background
      @current-change="handleCurrentChange"
      :center-size="limit"
      :total="centersCount"
    >
    </el-pagination>
  </div>
  <center-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :center="center"
  />
</template>

<style></style>
