<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import districtDialog from '@/components/district/dialog-part.vue'
import districtTable from '@/components/district/table-part.vue'

import router from '@/router'
import { useDistrictStore } from '@/stores/data/district'
const store = useDistrictStore()
const { districts, districtsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const district = ref({})
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
    await store.saveDistrict({
      _id: value._id,
      ...data
    })
  } else {
    await store.addDistrict({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  district.value = await store.getTranslateDistrict({ id, language })
  let { key, ...translate } = district.value
  console.log(district.value)
  district.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteDistrict(id)
}

const handleStatus = async (val) => {
  await store.statusDistrict(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  district.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'district',
    query: { page: page.value }
  })
  await store.getAllDistricts({
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
      <h1>Район/город</h1>
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
  <district-table
    :data="districts"
    :district="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="districtsCount > limit">
    <el-pagination
      :current-district="district"
      background
      @current-change="handleCurrentChange"
      :district-size="limit"
      :total="districtsCount"
    >
    </el-pagination>
  </div>
  <district-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :district="district" />
</template>

<style></style>
