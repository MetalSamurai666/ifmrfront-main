<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import storageDialog from '@/components/storage/storage-dialog.vue'
import storageTable from '@/components/storage/storage-table.vue'

import router from '@/router'
import { useStorageStore } from '@/stores/data/storage'
const store = useStorageStore()
const { storages, storagesCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const storage = ref({})
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
    await store.saveStorage({
      _id: value._id,
      ...data
    })
  } else {
    await store.addStorage({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  storage.value = await store.getTranslateStorage({ id, language })
  let { key, ...translate } = storage.value
  console.log(storage.value)
  storage.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteStorage(id)
}

const handleStatus = async (val) => {
  await store.statusStorage(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  storage.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/storage',
    query: { page: page.value }
  })
  await store.getAllStorages({
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
      <h1>Тип хранения</h1>
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
  <storage-table
    :data="storages"
    :storage="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="storagesCount > limit">
    <el-pagination
      :current-storage="storage"
      background
      @current-change="handleCurrentChange"
      :storage-size="limit"
      :total="storagesCount"
    >
    </el-pagination>
  </div>
  <storage-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :storage="storage" />
</template>

<style></style>
