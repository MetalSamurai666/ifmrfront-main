<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import typeDialog from '@/components/type/type-dialog.vue'
import typeTable from '@/components/type/type-table.vue'

import router from '@/router'
import { useTypeStore } from '@/stores/data/type'
const store = useTypeStore()
const { types, typesCount } = storeToRefs(store)

const toggle = ref(false)
const typeToggle = ref(false)
const type = ref({})
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
  if (typeToggle.value) {
    await store.saveType({
      _id: value._id,
      ...data
    })
  } else {
    await store.addType({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  type.value = await store.getTranslateType({ id, language })
  let { key, ...translate } = type.value
  console.log(type.value)
  type.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  typeToggle.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteType(id)
}

const handleStatus = async (val) => {
  await store.statusType(val)
}

const handleClose = () => {
  toggle.value = false
  typeToggle.value = false
  type.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'type',
    query: { page: page.value }
  })
  await store.getAllTypes({
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
      <h1>Тип склада</h1>
    </div>

    <div class="df align-item-center">
      <el-button typeToggle="primary" @click="handleOpen" class="add__btn">
        <el-icon>
          <plus />
        </el-icon>
        <span class="add__title">Добавить</span>
      </el-button>
    </div>
  </div>
  <type-table
    :data="types"
    :type="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="typesCount > limit">
    <el-pagination
      :current-type="type"
      background
      @current-change="handleCurrentChange"
      :type-size="limit"
      :total="typesCount"
    >
    </el-pagination>
  </div>
  <type-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :typeToggle="typeToggle" :type="type" />
</template>

<style></style>
