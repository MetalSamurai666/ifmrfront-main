import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSpecStore = defineStore('useSpecStore', () => {
  const specs = ref([])
  const specsCount = ref(0)
  const spec = ref({})

  const addSpec = async (data) => {
    let newSpec = await api({
      url: 'api/spec',
      method: 'post',
      data
    })
    specs.value = [newSpec.data, ...specs.value]
    specsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllSpecs = async (params) => {
    specs.value = []
    specsCount.value = 0
    let { data } = await api({
      url: `api/spec`,
      params
    })

    specs.value = [...data.data]
    specsCount.value = data.count
  }

  const getSpecs = async (params) => {
    specs.value = []
    specsCount.value = 0
    let { data } = await api({
      url: `v1/spec`,
      params
    })
    specs.value = [...data]
  }

  const deleteSpec = async (id) => {
    await api({
      url: `api/spec/${id}`,
      method: 'delete'
    })
    specs.value = specs.value.filter((spec) => spec._id !== id)
    specsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusSpec = async (data) => {
    await api({
      url: `api/spec/${data._id}/${data.status}`
    })
    specs.value = [
      ...specs.value.map((spec) => {
        return {
          ...spec,
          status: spec._id == data._id ? data.status : spec.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveSpec = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/spec`,
      method: 'put',
      data
    })
    console.log(res.data)
    specs.value = [
      ...specs.value.map((spec) => {
        if (spec._id == res.data._id) return { ...res.data }
        return { ...spec }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getSpec = async ({ id }) => {
    let { data } = await api({
      url: `api/spec/${id}`
    })
    return data
  }

  const getTranslateSpec = async ({ id, language }) => {
    let { data } = await api({
      url: `api/spec/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `spec/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    specs,
    spec,
    specsCount,
    getSpecs,
    bySlug,
    getTranslateSpec,
    getSpec,
    addSpec,
    getAllSpecs,
    deleteSpec,
    statusSpec,
    saveSpec
  }
})
