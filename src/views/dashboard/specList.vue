<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import specDialog from '@/components/spec/spec-dialog.vue'
import specTable from '@/components/spec/spec-table.vue'

import router from '@/router'
import { useSpecStore } from '@/stores/data/spec'
const store = useSpecStore()
const { specs, specsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const spec = ref({})
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
    await store.saveSpec({
      _id: value._id,
      ...data
    })
  } else {
    await store.addSpec({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  spec.value = await store.getTranslateSpec({ id, language })
  let { key, ...translate } = spec.value
  console.log(spec.value)
  spec.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteSpec(id)
}

const handleStatus = async (val) => {
  await store.statusSpec(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  spec.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    name: 'spec',
    query: { page: page.value }
  })
  await store.getAllSpecs({
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
      <h1>Тип специализации</h1>
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
  <spec-table
    :data="specs"
    :spec="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="specsCount > limit">
    <el-pagination
      :current-spec="spec"
      background
      @current-change="handleCurrentChange"
      :spec-size="limit"
      :total="specsCount"
    >
    </el-pagination>
  </div>
  <spec-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :spec="spec" />
</template>

<style></style>
