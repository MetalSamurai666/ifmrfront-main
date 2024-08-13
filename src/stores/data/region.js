import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRegionStore = defineStore('useRegionStore', () => {
  const regions = ref([])
  const regionsCount = ref(0)
  const region = ref({})

  const addRegion = async (data) => {
    let newRegion = await api({
      url: 'api/region',
      method: 'post',
      data
    })
    regions.value = [newRegion.data, ...regions.value]
    regionsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllRegions = async (params) => {
    regions.value = []
    regionsCount.value = 0
    let { data } = await api({
      url: `api/region`,
      params
    })
    regions.value = [...data.data]
    regionsCount.value = data.count
  }

  const getRegions = async (params) => {
    regions.value = []
    regionsCount.value = 0
    let { data } = await api({
      url: `v1/region`,
      params
    })
    regions.value = [...data]
  }

  const deleteRegion = async (id) => {
    await api({
      url: `api/region/${id}`,
      method: 'delete'
    })
    regions.value = regions.value.filter((region) => region._id !== id)
    regionsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusRegion = async (data) => {
    await api({
      url: `api/region/${data._id}/${data.status}`
    })
    regions.value = [
      ...regions.value.map((region) => {
        return { ...region, status: region._id == data._id ? data.status : region.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveRegion = async (data) => {
    let res = await api({
      url: `api/region`,
      method: 'put',
      data
    })
    regions.value = [
      ...regions.value.map((region) => {
        if (region._id == res.data._id) return { ...res.data }
        return { ...region }
      })
    ]
    ElMessage.success('Сохранено')
  }

  return {
    regions,
    region,
    regionsCount,
    getRegions,
    addRegion,
    getAllRegions,
    deleteRegion,
    statusRegion,
    saveRegion
  }
})
