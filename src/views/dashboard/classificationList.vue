<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import classificationDialog from '@/components/classification/classification-dialog.vue'
import classificationTable from '@/components/classification/classification-table.vue'

import router from '@/router'
import { useClassificationStore } from '@/stores/data/classification'
const store = useClassificationStore()
const { classifications, classificationsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const classification = ref({})
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
    await store.saveClassification({
      _id: value._id,
      ...data
    })
  } else {
    await store.addClassification({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  classification.value = await store.getTranslateClassification({ id, language })
  let { key, ...translate } = classification.value
  console.log(classification.value)
  classification.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteClassification(id)
}

const handleStatus = async (val) => {
  await store.statusClassification(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  classification.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'classification',
    query: { page: page.value }
  })
  await store.getAllClassifications({
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
      <h1>Тип классификации</h1>
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
  <classification-table
    :data="classifications"
    :classification="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="classificationsCount > limit">
    <el-pagination
      :current-classification="classification"
      background
      @current-change="handleCurrentChange"
      :classification-size="limit"
      :total="classificationsCount"
    >
    </el-pagination>
  </div>
  <classification-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :classification="classification" />
</template>

<style></style>
