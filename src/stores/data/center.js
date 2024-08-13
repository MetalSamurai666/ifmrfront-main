import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCenterStore = defineStore('useCenterStore', () => {
  const centers = ref([])
  const centersCount = ref(0)
  const center = ref({})

  const addCenter = async (data) => {
    let newCenter = await api({
      url: 'api/center',
      method: 'post',
      data
    })
    centers.value = [newCenter.data, ...centers.value]
    centersCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllCenters = async (params) => {
    centers.value = []
    centersCount.value = 0
    let { data } = await api({
      url: `api/center`,
      params
    })
    console.log(data.data)
    centers.value = [...data.data]
    centersCount.value = data.count
  }

  const searchingCenters = async (params) => {
    console.log(params)
    centers.value = []
    centersCount.value = 0
    let { data } = await api({
      url: `api/center/searching`,
      params: {
        title: params.title || '',
        search: params.params
      }
    })
    console.log(data)
    centers.value = [...data]
  }

  const getCenters = async (params) => {
    centers.value = []
    centersCount.value = 0
    let { data } = await api({
      url: `v1/center`,
      params
    })
    centers.value = [...data]
  }

  const deleteCenter = async (id) => {
    await api({
      url: `api/center/${id}`,
      method: 'delete'
    })
    centers.value = centers.value.filter((center) => center._id !== id)
    centersCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusCenter = async (data) => {
    await api({
      url: `api/center/${data._id}/${data.status}`
    })
    centers.value = [
      ...centers.value.map((center) => {
        return {
          ...center,
          status: center._id == data._id ? data.status : center.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveCenter = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/center`,
      method: 'put',
      data
    })
    console.log(res.data)
    centers.value = [
      ...centers.value.map((center) => {
        if (center._id == res.data._id) return { ...res.data }
        return { ...center }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getCenter = async ({ id }) => {
    console.log(id)
    let { data } = await api({
      url: `api/center/${id}`
    })
    return data
  }

  const getTranslateCenter = async ({ id, language }) => {
    let { data } = await api({
      url: `api/center/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (id, language) => {
    let { data } = await api({
      url: `api/center/byid/${id}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    centers,
    center,
    centersCount,
    getCenters,
    bySlug,
    searchingCenters,
    getTranslateCenter,
    getCenter,
    addCenter,
    getAllCenters,
    deleteCenter,
    statusCenter,
    saveCenter
  }
})
