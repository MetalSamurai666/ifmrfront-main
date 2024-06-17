<template>
  <el-table stripe :data="state[route.meta?.api]">
    <el-table-column type="index" :index="indexMethod" width="60" />
    <el-table-column
      v-for="field of inputs.filter((inp) => inp.table >= 0).sort((a, b) => a.table - b.table)"
      :key="field.name"
      :label="field.name !== 'photo' ? field.label : ''"
      :min-width="field.minWidth"
      :width="field.width || null"
    >
      <template #default="scope">
        <el-image
          v-if="['photo'].includes(field.name)"
          :src="`${url}/${scope.row[field.name]?.at(0)?.response}`"
          style="width: 60px; height: 60px"
          fit="cover"
        />
        <div v-else-if="['union'].includes(field.type)">
          <span v-for="(val, index) of field.value" :key="index" class="union__value">
            {{ scope.row[val] }}
          </span>
        </div>
        <div v-else-if="['populate', 'select'].includes(field.type)">
          <span v-for="(val, index) of field.select" :key="index" class="union__value">
            {{ scope.row[field?.name]?.hasOwnProperty(val) ? scope.row[field?.name][val] : '' }}
          </span>
        </div>
        <div v-else-if="['upload', 'file'].includes(field.type)">
          <el-button type="primary" @click="downloadFiles(scope.row[field.name])">
            <el-icon><document /></el-icon>
          </el-button>
        </div>
        <div v-else-if="['date'].includes(field.type)">
          {{ convertDate(scope.row[field.name]) }}
        </div>
        <div v-else-if="field.type == 'checkbox'">
          {{ scope.row[field.name] ? 'Ha' : 'Yo`q' }}
        </div>
        <div v-else-if="field.type == 'list'">
          {{ field.values.find((item) => item.value == scope.row[field.name])?.label }}
        </div>
        <div v-else-if="field.type == 'allow'">
          {{ scope.row[field.name]?.toString() || '' }}
        </div>
        <div v-else>
          {{ scope.row[field.name] }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Holat" width="75">
      <template #default="scope">
        <div>
          <el-button
            :icon="scope.row.status == 1 ? 'check' : 'close'"
            :type="scope.row.status == 1 ? 'success' : 'warning'"
            @click="
              changeStatus({
                _id: scope.row._id,
                status: scope.row.status == 1 ? 0 : 1
              })
            "
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Qo`shilgan vaqti" width="150">
      <template #default="scope">
        <div>
          {{ convertDate(scope.row.createdAt, 'full') }}
        </div>
      </template>
    </el-table-column>
    <el-table-column width="100" align="right">
      <template #default="scope">
        <el-dropdown>
          <el-button class="el-dropdown-link">
            <el-icon>
              <more />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="edit(scope.row._id)">
                <el-icon class="mr-1">
                  <Edit />
                </el-icon>
                Tahrirlash
              </el-dropdown-item>
              <el-dropdown-item @click="remove(scope.row._id)">
                <el-icon class="mr-1">
                  <delete />
                </el-icon>
                O'chirish
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
  <div class="bottom">
    <el-pagination
      v-if="state[`${route.meta?.api}_count`] > limit"
      background
      layout="Oldingi, pager, Keyingi"
      @current-change="handleCurrentChange"
      :page-size="limit"
      :total="state[`${route.meta?.api}_count`]"
    >
    </el-pagination>
    <div class="count">Umumiy soni. {{ state[`${route.meta?.api}_count`] }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { convertDate } from '@/helpers/func'
import { url, download } from '@/helpers/api'

const props = defineProps({
  model: String,
  inputs: Array,
  edit: {
    type: String,
    default: null
  },
  option: {}
})

import { mainStore } from '@/stores/model'
import { storeToRefs } from 'pinia'
const store = mainStore()
const { state } = storeToRefs(store)

const page = ref(1)
const limit = ref(20)

const changeStatus = async (status) => {
  await store.changeStatus(status, route.meta?.api)
}

import { useFullStore } from '@/stores/usefull'
const useFull = useFullStore()
const edit = (id) => {
  if (props.edit) {
    return router.push(`${props.edit}/${id}`)
  }
  useFull.setEditToggle(true, id)
}

const remove = async (id) => {
  if (confirm('Вы уверены?')) await store.deleteData(route.meta?.api, id)
}

const route = useRoute()

const getData = async () => {
  await store.allData({
    model: route.meta?.api,
    page: page.value,
    limit: limit.value,
    sort: JSON.stringify(props.option?.sort || { _id: -1 }),
    ...(props.option?.search || {})
  })
}
const router = useRouter()
const handleCurrentChange = async (val) => {
  window.scrollTo(0, 0)
  page.value = val
  router.push({ name: props.model || route.name, query: { page: val } })
  await getData()
}

const downloadFiles = async (list) => {
  await Promise.all(
    list.map(async (file) => {
      await download(file)
    })
  )
}

onMounted(async () => {
  page.value = route.params?.page || 1
  await getData()
})

const indexMethod = (index) => (page.value - 1) * limit.value + index + 1
</script>

<style lang="scss"></style>
