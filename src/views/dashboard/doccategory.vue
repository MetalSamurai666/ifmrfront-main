<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import doccategoryDialog from '@/components/doccategory/doccategory-dialog.vue'
import doccategoryTable from '@/components/doccategory/doccategory-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { useDoccategoryStore } from '@/stores/data/doccategory'
const store = useDoccategoryStore()
const { doccategorys, doccategorysCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const doccategory = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
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
    await store.saveDoccategory({
      _id: value._id,
      ...data
    })
  } else {
    await store.addDoccategory({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  doccategory.value = await store.getTranslateDoccategory({ id, language })
  let { key, ...translate } = doccategory.value
  console.log(doccategory.value)
  doccategory.value = {
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
  await store.deleteDoccategory(id)
}

const handleStatus = async (val) => {
  await store.statusDoccategory(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  doccategory.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/doccategory',
    query: { page: page.value }
  })
  await store.getAllDoccategorys({
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
      <h1>Тип документов</h1>
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
  <doccategory-table
    :data="doccategorys"
    :doccategory="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="doccategorysCount > limit">
    <el-pagination
      :current-doccategory="doccategory"
      background
      @current-change="handleCurrentChange"
      :doccategory-size="limit"
      :total="doccategorysCount"
    >
    </el-pagination>
  </div>
  <doccategory-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="doccategory"
  />
</template>

<style></style>
