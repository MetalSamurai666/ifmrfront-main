import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTypeStore = defineStore('useTypeStore', () => {
  const types = ref([])
  const typesCount = ref(0)
  const type = ref({})

  const addType = async (data) => {
    let newType = await api({
      url: 'api/type',
      method: 'post',
      data
    })
    types.value = [newType.data, ...types.value]
    typesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllTypes = async (params) => {
    types.value = []
    typesCount.value = 0
    let { data } = await api({
      url: `api/type`,
      params
    })

    types.value = [...data.data]
    typesCount.value = data.count
  }

  const getTypes = async (params) => {
    types.value = []
    typesCount.value = 0
    let { data } = await api({
      url: `v1/type`,
      params
    })
    types.value = [...data]
  }

  const deleteType = async (id) => {
    await api({
      url: `api/type/${id}`,
      method: 'delete'
    })
    types.value = types.value.filter((type) => type._id !== id)
    typesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusType = async (data) => {
    await api({
      url: `api/type/${data._id}/${data.status}`
    })
    types.value = [
      ...types.value.map((type) => {
        return {
          ...type,
          status: type._id == data._id ? data.status : type.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveType = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/type`,
      method: 'put',
      data
    })
    console.log(res.data)
    types.value = [
      ...types.value.map((type) => {
        if (type._id == res.data._id) return { ...res.data }
        return { ...type }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getType = async ({ id }) => {
    let { data } = await api({
      url: `api/type/${id}`
    })
    return data
  }

  const getTranslateType = async ({ id, language }) => {
    let { data } = await api({
      url: `api/type/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `type/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    types,
    type,
    typesCount,
    getTypes,
    bySlug,
    getTranslateType,
    getType,
    addType,
    getAllTypes,
    deleteType,
    statusType,
    saveType
  }
})
