<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import connectDialog from '@/components/connect/connect-dialog.vue'
import connectTable from '@/components/connect/connect-table.vue'

import router from '@/router'
import { useConnectStore } from '@/stores/data/connect'
const store = useConnectStore()
const { connects, connectsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const connect = ref({})
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
    await store.saveConnect({
      _id: value._id,
      ...data
    })
  } else {
    await store.addConnect({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  connect.value = await store.getTranslateConnect({ id, language })
  let { key, ...translate } = connect.value
  console.log(connect.value)
  connect.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteConnect(id)
}

const handleStatus = async (val) => {
  await store.statusConnect(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  connect.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'connect',
    query: { page: page.value }
  })
  await store.getAllConnects({
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
      <h1>Тип транспортного связи</h1>
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
  <connect-table
    :data="connects"
    :connect="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="connectsCount > limit">
    <el-pagination
      :current-connect="connect"
      background
      @current-change="handleCurrentChange"
      :connect-size="limit"
      :total="connectsCount"
    >
    </el-pagination>
  </div>
  <connect-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :connect="connect" />
</template>

<style></style>
