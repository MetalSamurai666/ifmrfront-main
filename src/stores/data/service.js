import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useServiceStore = defineStore('useServiceStore', () => {
  const services = ref([])
  const servicesCount = ref(0)
  const service = ref({})

  const addService = async (data) => {
    let newService = await api({
      url: 'api/service',
      method: 'post',
      data
    })
    services.value = [newService.data, ...services.value]
    servicesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllServices = async (params) => {
    services.value = []
    servicesCount.value = 0
    let { data } = await api({
      url: `api/service`,
      params
    })

    services.value = [...data.data]
    servicesCount.value = data.count
  }

  const getServices = async (params) => {
    services.value = []
    servicesCount.value = 0
    let { data } = await api({
      url: `v1/service`,
      params
    })
    services.value = [...data]
  }

  const deleteService = async (id) => {
    await api({
      url: `api/service/${id}`,
      method: 'delete'
    })
    services.value = services.value.filter((service) => service._id !== id)
    servicesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusService = async (data) => {
    await api({
      url: `api/service/${data._id}/${data.status}`
    })
    services.value = [
      ...services.value.map((service) => {
        return {
          ...service,
          status: service._id == data._id ? data.status : service.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveService = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/service`,
      method: 'put',
      data
    })
    console.log(res.data)
    services.value = [
      ...services.value.map((service) => {
        if (service._id == res.data._id) return { ...res.data }
        return { ...service }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getService = async ({ id }) => {
    let { data } = await api({
      url: `api/service/${id}`
    })
    return data
  }

  const getTranslateService = async ({ id, language }) => {
    let { data } = await api({
      url: `api/service/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `service/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    services,
    service,
    servicesCount,
    getServices,
    bySlug,
    getTranslateService,
    getService,
    addService,
    getAllServices,
    deleteService,
    statusService,
    saveService
  }
})
