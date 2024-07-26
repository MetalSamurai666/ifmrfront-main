import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClassificationStore = defineStore('useClassificationStore', () => {
  const classifications = ref([])
  const classificationsCount = ref(0)
  const classification = ref({})

  const addClassification = async (data) => {
    let newClassification = await api({
      url: 'api/classification',
      method: 'post',
      data
    })
    classifications.value = [newClassification.data, ...classifications.value]
    classificationsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllClassifications = async (params) => {
    classifications.value = []
    classificationsCount.value = 0
    let { data } = await api({
      url: `api/classification`,
      params
    })

    classifications.value = [...data.data]
    classificationsCount.value = data.count
  }

  const getClassifications = async (params) => {
    classifications.value = []
    classificationsCount.value = 0
    let { data } = await api({
      url: `v1/classification`,
      params
    })
    classifications.value = [...data]
  }

  const deleteClassification = async (id) => {
    await api({
      url: `api/classification/${id}`,
      method: 'delete'
    })
    classifications.value = classifications.value.filter((classification) => classification._id !== id)
    classificationsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusClassification = async (data) => {
    await api({
      url: `api/classification/${data._id}/${data.status}`
    })
    classifications.value = [
      ...classifications.value.map((classification) => {
        return {
          ...classification,
          status: classification._id == data._id ? data.status : classification.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveClassification = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/classification`,
      method: 'put',
      data
    })
    console.log(res.data)
    classifications.value = [
      ...classifications.value.map((classification) => {
        if (classification._id == res.data._id) return { ...res.data }
        return { ...classification }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getClassification = async ({ id }) => {
    let { data } = await api({
      url: `api/classification/${id}`
    })
    return data
  }

  const getTranslateClassification = async ({ id, language }) => {
    let { data } = await api({
      url: `api/classification/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `classification/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    classifications,
    classification,
    classificationsCount,
    getClassifications,
    bySlug,
    getTranslateClassification,
    getClassification,
    addClassification,
    getAllClassifications,
    deleteClassification,
    statusClassification,
    saveClassification
  }
})
