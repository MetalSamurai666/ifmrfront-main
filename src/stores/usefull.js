import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFullStore = defineStore('useFullStore', () => {
  const toggle = ref(false)
  const editToggle = ref(false)
  const id = ref('')
  const params = ref({})

  const setToggle = (value) => (toggle.value = value)
  const setEditToggle = (value, _id) => {
    editToggle.value = value
    id.value = _id
  }

  const excelToggle = ref(false)
  const setExcelToggle = (value) => (excelToggle.value = value)

  const setParams = (value) => (params.value = { ...value })

  return {
    toggle,
    editToggle,
    id,
    params,
    excelToggle,
    setEditToggle,
    setToggle,
    setExcelToggle,
    setParams
  }
})
