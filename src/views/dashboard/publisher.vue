<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import publisherDialog from '@/components/publisher/publisher-dialog.vue'
import publisherTable from '@/components/publisher/publisher-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { usePublisherStore } from '@/stores/data/publisher'
const store = usePublisherStore()
const { publishers, publishersCount } = storeToRefs(store)

import { useCategoryStore } from '@/stores/data/category'
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore)

const toggle = ref(false)
const type = ref(false)
const publisher = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
    category: value.category,
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
    await store.savePublisher({
      _id: value._id,
      ...data
    })
  } else {
    await store.addPublisher({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  publisher.value = await store.getTranslatePublisher({ id, language })
  let { key, ...translate } = publisher.value
  console.log(publisher.value)
  publisher.value = {
    ...key,
    resslug: key?.slug?.slice() || '',
    category: key?.category,
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
  await store.deletePublisher(id)
}

const handleStatus = async (val) => {
  await store.statusPublisher(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  publisher.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/publisher',
    query: { publisher: page.value }
  })
  await store.getAllPublishers({
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

  await categoryStore.getAllCategorys({
    limit: 0
  })
})
</script>

<template>
  <div class="head mb-20">
    <div class="df align-item-center">
      <h1>Публикации</h1>
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
  <publisher-table
    :data="publishers"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="publishersCount > limit">
    <el-pagination
      :current-publisher="publisher"
      background
      @current-change="handleCurrentChange"
      :publisher-size="limit"
      :total="publishersCount"
    >
    </el-pagination>
  </div>
  <publisher-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="publisher"
    :categorys="categorys"
  />
</template>

<style></style>
