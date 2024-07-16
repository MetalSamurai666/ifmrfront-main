<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import newscategoryDialog from '@/components/newscategory/newscategory-dialog.vue'
import newscategoryTable from '@/components/newscategory/newscategory-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { useNewscategoryStore } from '@/stores/data/newscategory'
const store = useNewscategoryStore()
const { newscategorys, newscategorysCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const newscategory = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const handleSave = async (value) => {
  let data = {
    slug: value.slug,
    translates: [
      {
        title: value.title,
        language: value.language || 'ru',
        description: value.description,
      }
    ]
  }
  if (type.value) {
    await store.saveNewscategory({
      _id: value._id,
      ...data
    })
  } else {
    await store.addNewscategory({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  newscategory.value = await store.getTranslateNewscategory({ id, language })
  let { key, ...translate } = newscategory.value
  console.log(newscategory.value)
  newscategory.value = {
    ...key,
    resslug: key.slug?.slice() || '',
    language: translate.language,
    title: translate.title,
    description: translate.description
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteNewscategory(id)
}

const handleStatus = async (val) => {
  await store.statusNewscategory(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  newscategory.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/newscategory',
    query: { page: page.value }
  })
  await store.getAllNewscategorys({
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
      <h1>Тип новостей</h1>
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
  <newscategory-table
    :data="newscategorys"
    :newscategory="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="newscategorysCount > limit">
    <el-pagination
      :current-newscategory="newscategory"
      background
      @current-change="handleCurrentChange"
      :newscategory-size="limit"
      :total="newscategorysCount"
    >
    </el-pagination>
  </div>
  <newscategory-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="newscategory"
  />
</template>

<style></style>
