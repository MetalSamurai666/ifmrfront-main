<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import documentDialog from '@/components/document/document-dialog.vue'
import documentTable from '@/components/document/document-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { useDocumentStore } from '@/stores/data/document'
const store = useDocumentStore()
const { documents, documentsCount } = storeToRefs(store)

import { useDoccategoryStore } from '@/stores/data/doccategory'
const doccategoryStore = useDoccategoryStore()
const { doccategorys } = storeToRefs(doccategoryStore)

const toggle = ref(false)
const type = ref(false)
const document = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
    doccategory: value.doccategory,
    translates: [
      {
        title: value.title,
        language: value.language || 'ru',
        description: value.description,
        text: value.text
      }
    ]
  }
  console.log(data)
  if (type.value) {
    await store.saveDocument({
      _id: value._id,
      ...data
    })
  } else {
    await store.addDocument({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  document.value = await store.getTranslateDocument({ id, language })
  let { key, ...translate } = document.value
  console.log(document.value)
  document.value = {
    ...key,
    resslug: key?.slug?.slice() || '',
    doccategory: key?.doccategory,
    img: key?.img.map((img) => {
      return {
        ...img,
        url: `${url}/${img.response}`
      }
    }),
    language: translate.language,
    title: translate.title,
    text: translate.text,
    description: translate.description
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteDocument(id)
}

const handleStatus = async (val) => {
  await store.statusDocument(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  document.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/document',
    query: { page: page.value }
  })
  await store.getAllDocuments({
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

  await doccategoryStore.getAllDoccategorys({
    limit: 0
  })
})
</script>

<template>
  <div class="head mb-20">
    <div class="df align-item-center">
      <h1>Документы/законы</h1>
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
  <document-table
    :data="documents"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="documentsCount > limit">
    <el-pagination
      :current-page="page"
      background
      @current-change="handleCurrentChange"
      :document-size="limit"
      :total="documentsCount"
    >
    </el-pagination>
  </div>
  <document-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="document"
    :doccategorys="doccategorys"
  />
</template>

<style></style>
