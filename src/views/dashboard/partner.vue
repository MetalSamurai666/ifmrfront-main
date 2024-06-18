<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import partnerDialog from '@/components/partner/partner-dialog.vue'
import partnerTable from '@/components/partner/partner-table.vue'

import { useRoute } from 'vue-router'
import { url } from '@/helpers/api'
import router from '@/router'
import { usePartnerStore } from '@/stores/data/partner'
const store = usePartnerStore()
const { partners, partnersCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const partner = ref({})
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
        language: value.language || 'ru'
      }
    ]
  }
  if (type.value) {
    await store.savePartner({
      _id: value._id,
      ...data
    })
  } else {
    await store.addPartner({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  partner.value = await store.getTranslatePartner({ id, language })
  let { key, ...translate } = partner.value
  console.log(partner.value)
  partner.value = {
    ...key,
    resslug: key.slug?.slice() || '',
    links: key.link?.slice() || '',
    img:
      key.img?.map((img) => {
        return {
          ...img,
          url: `${url}/${img.response}`
        }
      }) || [],
    language: translate.language,
    title: translate.title
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deletePartner(id)
}

const handleStatus = async (val) => {
  await store.statusPartner(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  partner.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/partner',
    query: { page: page.value }
  })
  await store.getAllPartners({
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
      <h1>Партнеры</h1>
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
  <partner-table
    :data="partners"
    :partner="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="partnersCount > limit">
    <el-pagination
      :current-partner="partner"
      background
      @current-change="handleCurrentChange"
      :partner-size="limit"
      :total="partnersCount"
    >
    </el-pagination>
  </div>
  <partner-dialog
    @close="handleClose"
    @save="handleSave"
    :toggle="toggle"
    :type="type"
    :data="partner"
  />
</template>

<style></style>
