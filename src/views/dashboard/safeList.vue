<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import safeDialog from '@/components/safe/safe-dialog.vue'
import safeTable from '@/components/safe/safe-table.vue'

import router from '@/router'
import { useSafeStore } from '@/stores/data/safe'
const store = useSafeStore()
const { safes, safesCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const safe = ref({})
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
    await store.saveSafe({
      _id: value._id,
      ...data
    })
  } else {
    await store.addSafe({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  safe.value = await store.getTranslateSafe({ id, language })
  let { key, ...translate } = safe.value
  console.log(safe.value)
  safe.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteSafe(id)
}

const handleStatus = async (val) => {
  await store.statusSafe(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  safe.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/safe',
    query: { page: page.value }
  })
  await store.getAllSafes({
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
      <h1>Тип безопасности</h1>
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
  <safe-table
    :data="safes"
    :safe="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="safesCount > limit">
    <el-pagination
      :current-safe="safe"
      background
      @current-change="handleCurrentChange"
      :safe-size="limit"
      :total="safesCount"
    >
    </el-pagination>
  </div>
  <safe-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :safe="safe" />
</template>

<style></style>
