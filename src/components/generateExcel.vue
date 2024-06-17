<template>
  <el-dialog
    v-model="excelToggle"
    :title="`${route.meta?.title || ''} uchun excel generatsiya`"
    @close="closeToggle"
    :width="600"
  >
    <h4 class="mb-2">Excel maydonlari</h4>
    <el-checkbox
      border
      v-model="checkAll"
      class="mb-2"
      :indeterminate="isIndeterminate"
      @change="handleCheckAllChange"
    >
      Barcha maydon
    </el-checkbox>
    <el-checkbox-group v-model="data" @change="handleCheckedCitiesChange" class="group">
      <el-checkbox
        v-for="setting in settings"
        :key="setting"
        :label="setting.label"
        :value="setting"
        border
      />
    </el-checkbox-group>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeToggle">Bekor qilish</el-button>
        <el-button type="primary" @click="send"> Jo'natish </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const props = defineProps(['settings'])
const route = useRoute()
const data = ref([])
const checkAll = ref(false)
const isIndeterminate = ref(false)

import { generateExcel } from '@/helpers/api'

import { useFullStore } from '@/stores/usefull'
const useFull = useFullStore()
const { excelToggle, params } = storeToRefs(useFull)

const handleCheckAllChange = (val) => {
  data.value = val ? props.settings : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === props.settings.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < props.settings.length
}

const closeToggle = () => {
  useFull.setExcelToggle(false)
  data.value = []
}

const send = async () => {
  await generateExcel(route.name, [...data.value], { ...params.value })
  closeToggle()
}
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-wrap: wrap;
  .el-checkbox {
    margin-bottom: 10px;
    margin-right: 10px;
    flex: 1;
  }
}
</style>
