import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSafeStore = defineStore('useSafeStore', () => {
  const safes = ref([])
  const safesCount = ref(0)
  const safe = ref({})

  const addSafe = async (data) => {
    let newSafe = await api({
      url: 'api/safe',
      method: 'post',
      data
    })
    safes.value = [newSafe.data, ...safes.value]
    safesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllSafes = async (params) => {
    safes.value = []
    safesCount.value = 0
    let { data } = await api({
      url: `api/safe`,
      params
    })

    safes.value = [...data.data]
    safesCount.value = data.count
  }

  const getSafes = async (params) => {
    safes.value = []
    safesCount.value = 0
    let { data } = await api({
      url: `v1/safe`,
      params
    })
    safes.value = [...data]
  }

  const deleteSafe = async (id) => {
    await api({
      url: `api/safe/${id}`,
      method: 'delete'
    })
    safes.value = safes.value.filter((safe) => safe._id !== id)
    safesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusSafe = async (data) => {
    await api({
      url: `api/safe/${data._id}/${data.status}`
    })
    safes.value = [
      ...safes.value.map((safe) => {
        return {
          ...safe,
          status: safe._id == data._id ? data.status : safe.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveSafe = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/safe`,
      method: 'put',
      data
    })
    console.log(res.data)
    safes.value = [
      ...safes.value.map((safe) => {
        if (safe._id == res.data._id) return { ...res.data }
        return { ...safe }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getSafe = async ({ id }) => {
    let { data } = await api({
      url: `api/safe/${id}`
    })
    return data
  }

  const getTranslateSafe = async ({ id, language }) => {
    let { data } = await api({
      url: `api/safe/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `safe/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    safes,
    safe,
    safesCount,
    getSafes,
    bySlug,
    getTranslateSafe,
    getSafe,
    addSafe,
    getAllSafes,
    deleteSafe,
    statusSafe,
    saveSafe
  }
})
