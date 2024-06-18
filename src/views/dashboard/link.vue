<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import linkDialog from '@/components/link/link-dialog.vue'
import linkTable from '@/components/link/link-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { useLinkStore } from '@/stores/data/link'
const store = useLinkStore()
const { links, linksCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const link = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const route = useRoute()
const handleSave = async (value) => {
  let data = {
    link: value.link,
    img: [...value.img],
    translates: [
      {
        title: value.title,
        language: value.language || 'ru',        
      }
    ]
  }
  if (type.value) {
    await store.saveLink({
      _id: value._id,
      ...data
    })
  } else {
    await store.addLink({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  link.value = await store.getTranslateLink({ id, language })
  let { key, ...translate } = link.value
  console.log(link.value)
  link.value = {
    ...key,
    resslug: key.slug?.slice() || '',
	link: key.link?.slice() || '',
    img:
      key.img?.map((img) => {
        return {
          ...img,
          url: `${url}/${img.response}`
        }
      }) || [],
    language: translate.language,
    title: translate.title,
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteLink(id)
}

const handleStatus = async (val) => {
  await store.statusLink(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  link.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/link',
    query: { page: page.value }
  })
  await store.getAllLinks({
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
      <h1>Слайдер</h1>
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
  <link-table
    :data="links"
    :link="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="linksCount > limit">
    <el-pagination
      :current-link="link"
      background
      @current-change="handleCurrentChange"
      :link-size="limit"
      :total="linksCount"
    >
    </el-pagination>
  </div>
  <link-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="link"
  />
</template>

<style></style>
