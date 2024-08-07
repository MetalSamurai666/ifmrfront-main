<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import vacancyDialog from '@/components/vacancy/vacancy-dialog.vue'
import vacancyTable from '@/components/vacancy/vacancy-table.vue'

import router from '@/router'
import { useVacancyStore } from '@/stores/data/vacancy'
const store = useVacancyStore()
const { vacancys, vacancysCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const vacancy = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const handleSave = async (value) => {
  let data = {
    link: value.link,
    from: new Date(value.date.at(0)),
    to: new Date(value.date.at(1)),
    translates: [
      {
        title: value.title,
        language: value.language || 'ru'
      }
    ]
  }
  if (type.value) {
    await store.saveVacancy({
      _id: value._id,
      ...data
    })
  } else {
    await store.addVacancy({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  vacancy.value = await store.getTranslateVacancy({ id, language })
  let { key, ...translate } = vacancy.value
  console.log(vacancy.value)
  vacancy.value = {
    ...key,
    language: translate.language,
    title: translate.title,
    link: key.link,
    date: [key.from, key.to]
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteVacancy(id)
}

const handleStatus = async (val) => {
  await store.statusVacancy(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  vacancy.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'vacancies',
    query: { page: page.value }
  })
  await store.getAllVacancys({
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
      <h1>Список вакансии</h1>
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
  <vacancy-table
    :data="vacancys"
    :vacancy="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="vacancysCount > limit">
    <el-pagination
      :current-vacancy="vacancy"
      background
      @current-change="handleCurrentChange"
      :vacancy-size="limit"
      :total="vacancysCount"
    >
    </el-pagination>
  </div>
  <vacancy-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :vacancy="vacancy"
  />
</template>

<style></style>
