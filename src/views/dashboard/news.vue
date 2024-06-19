<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import newsDialog from '@/components/news/news-dialog.vue'
import newsTable from '@/components/news/news-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { useNewsStore } from '@/stores/data/news'
const store = useNewsStore()
const { newss, newssCount } = storeToRefs(store)


const toggle = ref(false)
const type = ref(false)
const news = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    img: [...value.img],
    slug: value.slug,
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
    await store.saveNews({
      _id: value._id,
      ...data
    })
  } else {
    await store.addNews({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  news.value = await store.getTranslateNews({ id, language })
  let { key, ...translate } = news.value
  console.log(news.value)
  news.value = {
    ...key,
    resslug: key?.slug?.slice() || '',
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
  await store.deleteNews(id)
}

const handleStatus = async (val) => {
  await store.statusNews(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  news.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/news',
    query: { news: page.value }
  })
  await store.getAllNewss({
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
      <h1>Новости</h1>
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
  <news-table
    :data="newss"
    :page="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="newssCount > limit">
    <el-pagination
      :current-news="news"
      background
      @current-change="handleCurrentChange"
      :news-size="limit"
      :total="newssCount"
    >
    </el-pagination>
  </div>
  <news-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="news"
    :categorys="categorys"
  />
</template>

<style></style>
