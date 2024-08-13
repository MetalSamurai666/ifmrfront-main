import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDistrictStore = defineStore('useDistrictStore', () => {
  const districts = ref([])
  const districtsCount = ref(0)
  const district = ref({})

  const addDistrict = async (data) => {
    let newDistrict = await api({
      url: 'api/district',
      method: 'post',
      data
    })
    districts.value = [newDistrict.data, ...districts.value]
    districtsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllDistricts = async (params) => {
    districts.value = []
    districtsCount.value = 0
    let { data } = await api({
      url: `api/district`,
      params
    })
    console.log(data.data)
    districts.value = [...data.data]
    districtsCount.value = data.count
  }

  const getDistricts = async (params) => {
    districts.value = []
    districtsCount.value = 0
    let { data } = await api({
      url: `v1/district`,
      params
    })
    districts.value = [...data]
  }

  const deleteDistrict = async (id) => {
    await api({
      url: `api/district/${id}`,
      method: 'delete'
    })
    districts.value = districts.value.filter((district) => district._id !== id)
    districtsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusDistrict = async (data) => {
    await api({
      url: `api/district/${data._id}/${data.status}`
    })
    districts.value = [
      ...districts.value.map((district) => {
        return { ...district, status: district._id == data._id ? data.status : district.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveDistrict = async (data) => {
    let res = await api({
      url: `api/district`,
      method: 'put',
      data
    })
    districts.value = [
      ...districts.value.map((district) => {
        if (district._id == res.data._id) return { ...res.data }
        return { ...district }
      })
    ]
    ElMessage.success('Сохранено')
  }

  return {
    districts,
    district,
    districtsCount,
    getDistricts,
    addDistrict,
    getAllDistricts,
    deleteDistrict,
    statusDistrict,
    saveDistrict
  }
})
